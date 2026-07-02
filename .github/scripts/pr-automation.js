const fs = require('fs');
const path = require('path');

// 1. Validate Environment
const token = process.env.GITHUB_TOKEN;
if (!token) {
  console.error("Error: GITHUB_TOKEN environment variable is required.");
  process.exit(1);
}

const repository = process.env.GITHUB_REPOSITORY;
if (!repository) {
  console.error("Error: GITHUB_REPOSITORY environment variable is required.");
  process.exit(1);
}
const [owner, repo] = repository.split('/');

const eventPath = process.env.GITHUB_EVENT_PATH;
if (!eventPath) {
  console.error("Error: GITHUB_EVENT_PATH environment variable is required.");
  process.exit(1);
}

const event = JSON.parse(fs.readFileSync(eventPath, 'utf8'));
const pullRequest = event.pull_request;
if (!pullRequest) {
  console.error("Error: No pull_request object found in the event payload.");
  process.exit(0); // Exit gracefully if not a PR event
}
const pullNumber = pullRequest.number;

// 2. Load Configuration
const configPath = path.join(process.cwd(), '.github/pr-automation.config.json');
if (!fs.existsSync(configPath)) {
  console.error(`Error: Configuration file not found at ${configPath}`);
  process.exit(1);
}
const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));

// 3. Helper Functions
async function apiRequest(apiPath, method = 'GET', body = null) {
  const url = `https://api.github.com${apiPath}`;
  const options = {
    method,
    headers: {
      'Accept': 'application/vnd.github+json',
      'Authorization': `Bearer ${token}`,
      'User-Agent': 'PR-Automation-Agent',
      'X-GitHub-Api-Version': '2022-11-28'
    }
  };
  if (body) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(body);
  }

  const res = await fetch(url, options);
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`GitHub API request failed: ${method} ${apiPath} -> ${res.status} ${res.statusText}\nResponse: ${text}`);
  }
  if (res.status === 204) return null;
  return res.json();
}

function globToRegex(pattern) {
  let p = pattern;
  // Replace globstar '**' with temporary token
  p = p.replace(/\*\*/g, '___GLOBSTAR___');
  // Escape regex characters except the token and single '*'
  p = p.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  // Replace single star '*' with '[^/]*'
  p = p.replace(/\*/g, '[^/]*');
  // Replace globstar token with '.*' (allow matching slashes)
  p = p.replace(/___GLOBSTAR___/g, '.*');
  return new RegExp('^' + p + '$');
}

function matchGlob(filePath, pattern) {
  return globToRegex(pattern).test(filePath);
}

// 4. Main execution
async function run() {
  console.log(`Processing PR #${pullNumber} in ${owner}/${repo}...`);

  // A. Fetch current detailed PR info (webhook payload might be partial/stale)
  const pr = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
  const additions = pr.additions || 0;
  const deletions = pr.deletions || 0;
  const totalLines = additions + deletions;
  const changedFilesCount = pr.changed_files || 0;
  const title = pr.title || '';
  const headSha = pr.head.sha;
  const draft = pr.draft || false;
  const author = pr.user.login;
  
  // Note: mergeable can be true, false, or null (if calculations are ongoing)
  let mergeable = pr.mergeable;
  if (mergeable === null) {
    // Retry once after a small delay if mergeable is null
    console.log("Mergeability is null. Waiting 3 seconds to check again...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    const prRetry = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
    mergeable = prRetry.mergeable;
  }

  // B. Fetch changed files to calculate areas and types
  let files = [];
  try {
    files = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}/files?per_page=100`);
  } catch (error) {
    console.error("Failed to fetch changed files:", error);
  }
  const filePaths = files.map(f => f.filename);

  // C. Sync Label definitions in Repo
  console.log("Synchronizing repository labels...");
  let existingLabels = [];
  try {
    let page = 1;
    while (true) {
      const labelsPage = await apiRequest(`/repos/${owner}/${repo}/labels?per_page=100&page=${page}`);
      existingLabels = existingLabels.concat(labelsPage);
      if (labelsPage.length < 100) break;
      page++;
    }
  } catch (error) {
    console.error("Failed to fetch existing labels:", error);
  }

  const existingLabelsMap = new Map(existingLabels.map(l => [l.name, l]));
  for (const labelDef of config.labels) {
    const existing = existingLabelsMap.get(labelDef.name);
    // Normalize color code (strip # if present)
    const targetColor = labelDef.color.replace('#', '').toLowerCase();
    
    if (existing) {
      const existingColor = existing.color.replace('#', '').toLowerCase();
      if (existingColor !== targetColor || existing.description !== labelDef.description) {
        console.log(`Updating label: ${labelDef.name}`);
        await apiRequest(`/repos/${owner}/${repo}/labels/${encodeURIComponent(labelDef.name)}`, 'PATCH', {
          color: targetColor,
          description: labelDef.description
        });
      }
    } else {
      console.log(`Creating label: ${labelDef.name}`);
      await apiRequest(`/repos/${owner}/${repo}/labels`, 'POST', {
        name: labelDef.name,
        color: targetColor,
        description: labelDef.description
      });
    }
  }

  // D. Determine Labels to Apply
  const labelsToApply = [];

  // 1. PR Complexity Level
  const { trivial, beginner, intermediate, advanced } = config.complexityLevels;
  let detectedLevel = 'pr-level:major';
  if (totalLines < trivial.maxLines && changedFilesCount <= trivial.maxFiles) {
    detectedLevel = 'pr-level:trivial';
  } else if (totalLines < beginner.maxLines && changedFilesCount <= beginner.maxFiles) {
    detectedLevel = 'pr-level:beginner';
  } else if (totalLines <= intermediate.maxLines && changedFilesCount <= intermediate.maxFiles) {
    detectedLevel = 'pr-level:intermediate';
  } else if (totalLines <= advanced.maxLines && changedFilesCount <= advanced.maxFiles) {
    detectedLevel = 'pr-level:advanced';
  }
  labelsToApply.push(detectedLevel);

  // 2. PR Type
  let detectedType = null;
  // Parse conventional commit title prefix first
  const ccRegex = /^(\w+)(?:\(.+?\))?!\s*:\s*(.+)$|^(\w+)(?:\(.+?\))?\s*:\s*(.+)$/;
  const titleMatch = title.match(ccRegex);
  if (titleMatch) {
    const rawType = (titleMatch[1] || titleMatch[3]).toLowerCase();
    for (const [typeName, prefixes] of Object.entries(config.typeMapping)) {
      if (prefixes.includes(rawType)) {
        detectedType = typeName;
        break;
      }
    }
  }

  // Fallback to path heuristics
  if (!detectedType) {
    console.log("No conventional commit prefix matched. Falling back to path heuristics...");
    const typeScores = {};
    for (const [typeName, patterns] of Object.entries(config.typePathHeuristics)) {
      typeScores[typeName] = 0;
      for (const pattern of patterns) {
        for (const filePath of filePaths) {
          if (matchGlob(filePath, pattern)) {
            typeScores[typeName]++;
          }
        }
      }
    }

    let maxScore = 0;
    for (const [typeName, score] of Object.entries(typeScores)) {
      if (score > maxScore) {
        maxScore = score;
        detectedType = typeName;
      }
    }
  }

  if (detectedType) {
    labelsToApply.push(detectedType);
  }

  // 3. PR Areas
  const detectedAreas = [];
  for (const [areaName, patterns] of Object.entries(config.areaMapping)) {
    let matched = false;
    for (const pattern of patterns) {
      for (const filePath of filePaths) {
        if (matchGlob(filePath, pattern)) {
          matched = true;
          break;
        }
      }
      if (matched) break;
    }
    if (matched) {
      detectedAreas.push(areaName);
      labelsToApply.push(areaName);
    }
  }

  // 4. Contributor Status
  let contributorStatus = 'first-time-contributor';
  try {
    const searchResult = await apiRequest(`/search/issues?q=is:pr+is:merged+author:${author}+repo:${owner}/${repo}`);
    if (searchResult.total_count > 0) {
      contributorStatus = 'returning-contributor';
    }
  } catch (error) {
    console.error("Failed to query contributor search status:", error);
  }
  labelsToApply.push(contributorStatus);

  // 5. PR Status
  let ciFailing = false;
  try {
    const checkRunsObj = await apiRequest(`/repos/${owner}/${repo}/commits/${headSha}/check-runs`);
    const checkRuns = checkRunsObj.check_runs || [];
    for (const run of checkRuns) {
      if (run.status === 'completed' && ['failure', 'timed_out', 'action_required'].includes(run.conclusion)) {
        if (run.name !== 'Auto Label PR' && run.name !== 'PR Automation') {
          ciFailing = true;
          break;
        }
      }
    }
    const combinedStatus = await apiRequest(`/repos/${owner}/${repo}/commits/${headSha}/status`);
    if (combinedStatus && (combinedStatus.state === 'failure' || combinedStatus.state === 'error')) {
      ciFailing = true;
    }
  } catch (error) {
    console.error("Failed to fetch CI checks or statuses:", error);
  }

  let hasChangesRequested = false;
  let approvalCount = 0;
  try {
    const reviews = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}/reviews`);
    const latestReviews = {};
    for (const r of reviews) {
      const u = r.user.login;
      const date = new Date(r.submitted_at);
      if (!latestReviews[u] || new Date(latestReviews[u].submitted_at) < date) {
        latestReviews[u] = r;
      }
    }
    for (const u in latestReviews) {
      const state = latestReviews[u].state;
      if (state === 'CHANGES_REQUESTED') {
        hasChangesRequested = true;
      } else if (state === 'APPROVED') {
        approvalCount++;
      }
    }
  } catch (error) {
    console.error("Failed to fetch PR reviews:", error);
  }

  if (draft) {
    labelsToApply.push('status:draft');
  } else {
    // Determine base review/mergability status
    if (hasChangesRequested) {
      labelsToApply.push('status:changes-requested');
    } else if (approvalCount > 0) {
      if (mergeable === false || ciFailing) {
        labelsToApply.push('status:approved');
      } else {
        labelsToApply.push('status:ready-to-merge');
      }
    } else {
      labelsToApply.push('status:needs-review');
    }

    // Add extra statuses
    if (mergeable === false) {
      labelsToApply.push('status:merge-conflict');
    }
    if (ciFailing) {
      labelsToApply.push('status:ci-failing');
    }
  }

  // E. Update PR Labels in Github
  console.log("Current labels to apply:", labelsToApply);
  const currentPRLabels = pr.labels.map(l => l.name);

  // We should only touch labels managed by our automation to prevent overwriting manual tags
  const managedLabelNames = config.labels.map(l => l.name);
  const labelsToRemove = currentPRLabels.filter(name => managedLabelNames.includes(name) && !labelsToApply.includes(name));
  const labelsToAdd = labelsToApply.filter(name => !currentPRLabels.includes(name));

  for (const labelToRemove of labelsToRemove) {
    console.log(`Removing label: ${labelToRemove}`);
    try {
      await apiRequest(`/repos/${owner}/${repo}/issues/${pullNumber}/labels/${encodeURIComponent(labelToRemove)}`, 'DELETE');
    } catch (error) {
      console.error(`Failed to remove label ${labelToRemove}:`, error.message);
    }
  }

  if (labelsToAdd.length > 0) {
    console.log(`Adding labels: ${labelsToAdd.join(', ')}`);
    await apiRequest(`/repos/${owner}/${repo}/issues/${pullNumber}/labels`, 'POST', {
      labels: labelsToAdd
    });
  }

  // F. Generate and Post / Update Bot Comment
  console.log("Generating feedback comment...");
  
  const typeDisplay = detectedType ? `\`${detectedType}\`` : '_None detected_';
  const levelDisplay = `\`${detectedLevel}\``;
  const areaDisplay = detectedAreas.length > 0 ? detectedAreas.map(a => `\`${a}\``).join(', ') : '_None detected_';
  const contributorDisplay = `\`${contributorStatus}\``;

  // Build Warnings
  const warnings = [];
  if (detectedLevel === 'pr-level:advanced' || detectedLevel === 'pr-level:major') {
    warnings.push(`⚠️ **Large PR Warning**: This pull request contains a large number of changes (${totalLines} lines across ${changedFilesCount} files). Please consider splitting it into smaller, logical pull requests if possible to make reviews more manageable.`);
  }

  // Detect unrelated areas (more than 2 distinct areas touched)
  if (detectedAreas.length > 2) {
    const areaNames = detectedAreas.map(a => `\`${a}\``).join(', ');
    warnings.push(`⚠️ **Unrelated Areas Warning**: This PR modifies multiple unrelated areas (${areaNames}). To maintain clean git history and ease code reviews, we recommend isolating unrelated changes into separate PRs.`);
  }

  if (mergeable === false) {
    warnings.push(`⚠️ **Merge Conflict**: This pull request has conflicts with the base branch. Please resolve the conflicts and push updates to proceed.`);
  }

  if (ciFailing) {
    warnings.push(`⚠️ **CI Checks Failing**: One or more automated quality checks are failing. Please review the build logs and fix any errors.`);
  }

  // Build Next Steps
  let nextSteps = '';
  if (mergeable === false || ciFailing) {
    nextSteps = `👉 **Next Steps**: Please resolve the conflicts and/or fix the failing CI checks. Once updated, reviews can proceed.`;
  } else if (hasChangesRequested) {
    nextSteps = `👉 **Next Steps**: Please address the feedback from reviewers and push updates.`;
  } else if (draft) {
    nextSteps = `👉 **Next Steps**: Mark this pull request as **Ready for Review** once you've finished making your changes.`;
  } else if (contributorStatus === 'first-time-contributor') {
    nextSteps = `👉 **Next Steps**: Thank you for your first contribution! A maintainer will review your changes shortly.`;
  } else {
    nextSteps = `👉 **Next Steps**: The pull request is ready for review. A maintainer will review your changes shortly.`;
  }

  const warningsSection = warnings.length > 0
    ? `### Warnings\n\n${warnings.join('\n\n')}\n\n`
    : '';

  const commentMarkdown = `<!-- pr-automation-bot-comment -->
### 🤖 PR Automation Summary

| Metric | Details |
| :--- | :--- |
| **Files Changed** | ${changedFilesCount} |
| **Lines Added/Removed** | +${additions} / -${deletions} (${totalLines} total) |
| **Detected Type** | ${typeDisplay} |
| **Complexity Level** | ${levelDisplay} |
| **Affected Areas** | ${areaDisplay} |
| **Contributor Status** | ${contributorDisplay} |

${warningsSection}### Instructions

${nextSteps}
`;

  // Find existing comment
  let existingCommentId = null;
  try {
    const comments = await apiRequest(`/repos/${owner}/${repo}/issues/${pullNumber}/comments?per_page=100`);
    for (const c of comments) {
      if (c.body && c.body.includes('<!-- pr-automation-bot-comment -->')) {
        existingCommentId = c.id;
        break;
      }
    }
  } catch (error) {
    console.error("Failed to fetch existing comments:", error);
  }

  if (existingCommentId) {
    console.log(`Updating comment ${existingCommentId}...`);
    await apiRequest(`/repos/${owner}/${repo}/issues/comments/${existingCommentId}`, 'PATCH', {
      body: commentMarkdown
    });
  } else {
    console.log("Posting new comment...");
    await apiRequest(`/repos/${owner}/${repo}/issues/${pullNumber}/comments`, 'POST', {
      body: commentMarkdown
    });
  }

  console.log("PR automation process completed successfully.");
}

run().catch(error => {
  console.error("Fatal Error running PR automation script:", error);
  process.exit(1);
});
