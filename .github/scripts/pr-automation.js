import fs from 'fs';
import path from 'path';

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
const eventName = process.env.GITHUB_EVENT_NAME || 'pull_request';

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
  p = p.replace(/\*\*/g, '___GLOBSTAR___');
  p = p.replace(/[.+^${}()|[\]\\]/g, '\\$&');
  p = p.replace(/\*/g, '[^/]*');
  p = p.replace(/___GLOBSTAR___/g, '.*');
  return new RegExp('^' + p + '$');
}

function matchGlob(filePath, pattern) {
  return globToRegex(pattern).test(filePath);
}

function getGreeting() {
  const hour = new Date().getUTCHours();
  if (hour >= 5 && hour < 12) {
    return "morning 🌅";
  } else if (hour >= 12 && hour < 17) {
    return "afternoon ☀️";
  } else if (hour >= 17 && hour < 22) {
    return "evening 🌌";
  } else {
    return "night 🌙";
  }
}

function getTurnaroundEstimate(complexity) {
  switch (complexity) {
    case 'pr-level:trivial':
      return "⚡ **5 - 15 minutes** (Trivial change, quick review)";
    case 'pr-level:beginner':
      return "⏰ **30 minutes - 1 hour** (Minor change, single reviewer)";
    case 'pr-level:intermediate':
      return "📅 **1 - 2 hours** (Standard change, standard review)";
    case 'pr-level:advanced':
      return "🔍 **1 - 2 days** (Thorough review required)";
    case 'pr-level:major':
      return "🚨 **2 - 3 days** (Major architectural update, multiple maintainers)";
    default:
      return "📅 **Standard review time**";
  }
}

// 4. Scheduled Reminder Mode
async function runReminderMode() {
  console.log("Running in Scheduled PR Inactivity / Reminder Mode...");
  
  let openPRs = [];
  try {
    openPRs = await apiRequest(`/repos/${owner}/${repo}/pulls?state=open&per_page=100`);
  } catch (error) {
    console.error("Failed to fetch open pull requests:", error);
    return;
  }
  
  console.log(`Found ${openPRs.length} open pull requests to analyze.`);
  
  const staleThresholdMs = 72 * 60 * 60 * 1000; // 72 hours (3 days)
  const botCooldownMs = 72 * 60 * 60 * 1000;    // 72 hours to prevent duplicate pings
  
  for (const pr of openPRs) {
    const pullNumber = pr.number;
    const author = pr.user.login;
    const isDraft = pr.draft || false;
    
    if (isDraft) {
      console.log(`PR #${pullNumber} is a draft. Skipping.`);
      continue;
    }
    
    console.log(`Analyzing PR #${pullNumber} by @${author}...`);
    
    let commits = [];
    let comments = [];
    let reviewComments = [];
    let reviews = [];
    
    try {
      commits = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}/commits?per_page=100`);
      comments = await apiRequest(`/repos/${owner}/${repo}/issues/${pullNumber}/comments?per_page=100`);
      reviewComments = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}/comments?per_page=100`);
      reviews = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}/reviews?per_page=100`);
    } catch (error) {
      console.error(`Failed to fetch history for PR #${pullNumber}:`, error.message);
      continue;
    }
    
    const humanActivities = [];
    
    // Add PR creation time
    humanActivities.push({
      type: 'creation',
      user: author,
      date: new Date(pr.created_at)
    });
    
    // Commits
    for (const commit of commits) {
      const commitAuthor = commit.commit.author.name;
      const commitDate = commit.commit.committer.date || commit.commit.author.date;
      if (commitDate) {
        humanActivities.push({
          type: 'commit',
          user: commit.author ? commit.author.login : commitAuthor,
          date: new Date(commitDate)
        });
      }
    }
    
    // Issue Comments
    let lastBotReminderTime = 0;
    for (const comment of comments) {
      const isBot = comment.user && (comment.user.type === 'Bot' || comment.user.login.includes('[bot]') || comment.user.login === 'github-actions');
      if (isBot) {
        if (comment.body && comment.body.includes('<!-- pr-automation-stale-ping -->')) {
          const reminderTime = new Date(comment.created_at).getTime();
          if (reminderTime > lastBotReminderTime) {
            lastBotReminderTime = reminderTime;
          }
        }
        continue;
      }
      humanActivities.push({
        type: 'comment',
        user: comment.user.login,
        date: new Date(comment.created_at)
      });
    }
    
    // Review Comments
    for (const comment of reviewComments) {
      const isBot = comment.user && (comment.user.type === 'Bot' || comment.user.login.includes('[bot]') || comment.user.login === 'github-actions');
      if (isBot) continue;
      humanActivities.push({
        type: 'review_comment',
        user: comment.user.login,
        date: new Date(comment.created_at)
      });
    }
    
    // Reviews
    for (const review of reviews) {
      const isBot = review.user && (review.user.type === 'Bot' || review.user.login.includes('[bot]') || review.user.login === 'github-actions');
      if (isBot) continue;
      humanActivities.push({
        type: 'review',
        user: review.user.login,
        date: new Date(review.submitted_at)
      });
    }
    
    // Sort to find the absolute latest human action
    humanActivities.sort((a, b) => b.date.getTime() - a.date.getTime());
    const latestActivity = humanActivities[0];
    const idleTimeMs = Date.now() - latestActivity.date.getTime();
    
    console.log(`PR #${pullNumber} - Idle time: ${(idleTimeMs / (1000 * 60 * 60)).toFixed(1)} hours. Last human action: '${latestActivity.type}' by @${latestActivity.user} on ${latestActivity.date.toISOString()}.`);
    
    if (idleTimeMs > staleThresholdMs) {
      const cooldownElapsedMs = Date.now() - lastBotReminderTime;
      if (lastBotReminderTime > 0 && cooldownElapsedMs < botCooldownMs) {
        console.log(`PR #${pullNumber} is stale but a reminder was posted recently (${(cooldownElapsedMs / (1000 * 60 * 60)).toFixed(1)} hours ago). Skipping.`);
        continue;
      }
      
      const prLabels = pr.labels.map(l => l.name);
      let reminderMessage = '';
      
      if (prLabels.includes('status:changes-requested')) {
        reminderMessage = `<!-- pr-automation-stale-ping -->
### 😴 Inactivity Notice: Pending Updates

Hi @${author}, it looks like this PR has had changes requested but has not received updates or responses in the last 3 days. 

Could you please address the feedback from reviewers or let us know if you need assistance? We're eager to help get this merged! 🌸`;
      } else if (prLabels.includes('status:needs-review')) {
        reminderMessage = `<!-- pr-automation-stale-ping -->
### 😴 Inactivity Notice: Pending Review

Hi @${author}, and hi maintainers! This pull request has been waiting for review for over 3 days. 

Could a maintainer or designated reviewer please take a look at the changes when you have a moment? Thank you! 🌟`;
      } else {
        reminderMessage = `<!-- pr-automation-stale-ping -->
### 😴 Inactivity Notice

Friendly reminder: this pull request has had no human activity in the last 3 days. Let's work together to complete the review and merge these changes! 💻`;
      }
      
      console.log(`PR #${pullNumber} is stale! Posting reminder comment...`);
      try {
        await apiRequest(`/repos/${owner}/${repo}/issues/${pullNumber}/comments`, 'POST', {
          body: reminderMessage
        });
      } catch (error) {
        console.error(`Failed to post reminder comment for PR #${pullNumber}:`, error.message);
      }
    } else {
      console.log(`PR #${pullNumber} is active. No action required.`);
    }
  }
}

// 5. Event-Driven PR Automation Mode
async function runPRMode() {
  let pullNumber = null;
  if (event.pull_request) {
    pullNumber = event.pull_request.number;
  } else if (event.workflow_run) {
    console.log("Triggered by workflow_run event. Locating associated Pull Request...");
    if (event.workflow_run.pull_requests && event.workflow_run.pull_requests.length > 0) {
      pullNumber = event.workflow_run.pull_requests[0].number;
    } else {
      const headBranch = event.workflow_run.head_branch;
      const headOwner = event.workflow_run.head_repository ? event.workflow_run.head_repository.owner.login : owner;
      console.log(`Querying open PRs for head ${headOwner}:${headBranch}...`);
      const prs = await apiRequest(`/repos/${owner}/${repo}/pulls?state=open&head=${headOwner}:${headBranch}`);
      if (prs && prs.length > 0) {
        pullNumber = prs[0].number;
      }
    }
  }

  if (!pullNumber) {
    console.log("Could not resolve pull request number for this event. Exiting gracefully.");
    process.exit(0);
  }

  console.log(`Processing PR #${pullNumber} in ${owner}/${repo}...`);

  // A. Fetch current detailed PR info
  const pr = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
  const additions = pr.additions || 0;
  const deletions = pr.deletions || 0;
  const totalLines = additions + deletions;
  const changedFilesCount = pr.changed_files || 0;
  const title = pr.title || '';
  const headSha = pr.head.sha;
  const draft = pr.draft || false;
  const author = pr.user.login;
  
  let mergeable = pr.mergeable;
  if (mergeable === null) {
    console.log("Mergeability is null. Waiting 3 seconds to check again...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    const prRetry = await apiRequest(`/repos/${owner}/${repo}/pulls/${pullNumber}`);
    mergeable = prRetry.mergeable;
  }

  // B. Fetch changed files
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

  // E. Determine Labels to Apply
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

  // 5. PR Status (CI, Reviews, Conflicts)
  let ciFailing = false;
  let ciRunning = true;
  try {
    const checkRunsObj = await apiRequest(`/repos/${owner}/${repo}/commits/${headSha}/check-runs`);
    const checkRuns = checkRunsObj.check_runs || [];
    
    let completedRuns = 0;
    let relevantRuns = 0;
    
    for (const run of checkRuns) {
      if (run.name === 'Auto Label PR' || run.name === 'PR Automation' || run.name === 'Run PR Automation') {
        continue;
      }
      relevantRuns++;
      if (run.status === 'completed') {
        completedRuns++;
        if (['failure', 'timed_out', 'action_required'].includes(run.conclusion)) {
          ciFailing = true;
        }
      }
    }
    
    const combinedStatus = await apiRequest(`/repos/${owner}/${repo}/commits/${headSha}/status`);
    if (combinedStatus) {
      if (combinedStatus.state === 'failure' || combinedStatus.state === 'error') {
        ciFailing = true;
        ciRunning = false;
      } else if (combinedStatus.state === 'success') {
        // success
      } else {
        // pending
      }
    }
    
    if (relevantRuns > 0 && completedRuns === relevantRuns && !ciFailing) {
      ciRunning = false;
    } else if (relevantRuns === 0) {
      ciRunning = false;
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
    if (hasChangesRequested) {
      labelsToApply.push('status:changes-requested');
    } else if (approvalCount > 0) {
      if (mergeable === false || ciFailing || ciRunning) {
        labelsToApply.push('status:approved');
      } else {
        labelsToApply.push('status:ready-to-merge');
      }
    } else {
      labelsToApply.push('status:needs-review');
    }

    if (mergeable === false) {
      labelsToApply.push('status:merge-conflict');
    }
    if (ciFailing) {
      labelsToApply.push('status:ci-failing');
    }
  }

  // F. Update PR Labels in Github
  console.log("Current labels to apply:", labelsToApply);
  const currentPRLabels = pr.labels.map(l => l.name);

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

  // G. Generate and Post / Update Bot Comment
  console.log("Generating feedback comment...");
  
  const greeting = getGreeting();
  const typeDisplay = detectedType ? `\`${detectedType}\`` : '_None detected_';
  const levelDisplay = `\`${detectedLevel}\``;
  const areaDisplay = detectedAreas.length > 0 ? detectedAreas.map(a => `\`${a}\``).join(', ') : '_None detected_';
  const contributorDisplay = contributorStatus === 'first-time-contributor' ? 'First-Time Contributor 🆕' : 'Returning Contributor 🚀';
  const reviewTimeBinDisplay = getTurnaroundEstimate(detectedLevel);

  // Status Checklist Formatting
  let ciStatusIcon = '🟡 Running...';
  if (ciFailing) {
    ciStatusIcon = '🔴 Failing (Action Required)';
  } else if (!ciRunning) {
    ciStatusIcon = '🟢 Passing';
  }

  let approvalStatusIcon = '🟡 Pending Review';
  if (hasChangesRequested) {
    approvalStatusIcon = '🔴 Changes Requested (Action Required)';
  } else if (approvalCount > 0) {
    approvalStatusIcon = `🟢 Approved (${approvalCount} approval${approvalCount > 1 ? 's' : ''})`;
  }

  let conflictStatusIcon = '🟢 No conflicts';
  if (mergeable === false) {
    conflictStatusIcon = '🔴 Conflict detected (Needs Rebase)';
  } else if (mergeable === null) {
    conflictStatusIcon = '🟡 Calculating...';
  }

  // Warnings Section
  const warnings = [];
  if (detectedLevel === 'pr-level:advanced' || detectedLevel === 'pr-level:major') {
    warnings.push(`⚠️ **Large PR Warning**: This PR contains a large number of changes (${totalLines} lines across ${changedFilesCount} files). Please consider splitting it into smaller PRs to ease reviewing.`);
  }
  if (detectedAreas.length > 2) {
    warnings.push(`⚠️ **Unrelated Areas Warning**: This PR modifies multiple unrelated areas (${detectedAreas.map(a => `\`${a}\``).join(', ')}). We recommend separating unrelated tasks.`);
  }
  if (mergeable === false) {
    warnings.push(`⚠️ **Merge Conflict**: This PR has conflicts with the base branch. Please resolve them and push updates.`);
  }
  if (ciFailing) {
    warnings.push(`⚠️ **CI Checks Failing**: One or more automated quality checks are failing. Please review the build/test logs and fix any errors.`);
  }

  // Next Steps
  let nextSteps = '';
  if (mergeable === false || ciFailing) {
    nextSteps = `👉 **Action Required**: Please resolve the merge conflicts and/or fix the failing CI tests. Once fixed, reviewers will look at it.`;
  } else if (hasChangesRequested) {
    nextSteps = `👉 **Action Required**: Please address reviewer feedback and push updates.`;
  } else if (draft) {
    nextSteps = `👉 **Next Steps**: Mark this PR as **Ready for Review** once you've finished making your changes.`;
  } else if (approvalCount > 0 && !ciRunning) {
    nextSteps = `👉 **Next Steps**: The PR is fully approved and status checks are green. A maintainer will merge this shortly! 🎉`;
  } else {
    nextSteps = `👉 **Next Steps**: The PR is ready for review. A maintainer or reviewer will be assigned shortly.`;
  }

  const warningsSection = warnings.length > 0
    ? `### ⚠️ Warnings\n\n${warnings.map(w => `- ${w}`).join('\n')}\n\n`
    : '';

  const commentMarkdown = `<!-- pr-automation-bot-comment -->
### 🤖 Birthday Bloom PR Assistant

Good ${greeting}, @${author}! Thank you for contributing to Birthday Bloom! 🌸

Here is the automated review and status dashboard for your pull request.

| PR Metadata | Details |
| :--- | :--- |
| 🧑‍💻 **Contributor** | @${author} (${contributorDisplay}) |
| 📁 **Files Changed** | \`${changedFilesCount}\` |
| ➕➖ **Diff Size** | \`+${additions} / -${deletions}\` (\`${totalLines}\` total lines) |
| 🏷️ **Type of Change** | ${typeDisplay} |
| ⚡ **Complexity Level**| ${levelDisplay} |
| 🧩 **Affected Areas** | ${areaDisplay} |
| ⏱️ **Review Turnaround**| ${reviewTimeBinDisplay} |

---

${warningsSection}### 📋 Pull Request Status Checklist
- [x] Contributor checklist completed
- [ ] **CI Quality Checks**: ${ciStatusIcon}
- [ ] **Maintainer Review & Approval**: ${approvalStatusIcon}
- [ ] **Merge Conflict Resolution**: ${conflictStatusIcon}

### 🚀 Next Steps
${nextSteps}

---
*This dashboard updates automatically when you push commits, resolve reviews, or when status checks complete. If you have questions, please comment on this PR.*
`;

  // Find existing bot comment
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

// 6. Main Runner
async function run() {
  if (eventName === 'schedule') {
    await runReminderMode();
  } else {
    await runPRMode();
  }
}

run().catch(error => {
  console.error("Fatal Error running PR automation script:", error);
  process.exit(1);
});
