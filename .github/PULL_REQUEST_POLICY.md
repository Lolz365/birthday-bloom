# Pull Request and Merge Policy

This document defines the strict quality gates, review processes, and configuration requirements for merging code into the `main` branch of **Birthday Bloom**.

---

## 1. Strict Merge Requirements

To maintain a professional-grade codebase and prevent accidental or unauthorized code changes:
- **No Automatic Merging**: Under no circumstances should pull requests be automatically merged by bots.
- **Maintainer Approval**: Every pull request requires explicit review and approval from a designated repository owner or administrator.
- **Codeowner Review**: Any changes affecting core directories (like `.github/` or `src/`) must be reviewed and approved by the owner specified in the `.github/CODEOWNERS` file.
- **CI Status Checks**: All automated quality checks, linting, type compilation, and unit tests must pass successfully before a pull request becomes eligible for merge.

---

## 2. GitHub Branch Protection Setup (Required Admin Actions)

Since branch protection rules cannot be configured directly via local codebase files, the repository administrator must apply the following settings in the GitHub repository settings page:

### Step-by-Step Instructions:

1. **Navigate to Settings**:
   Go to the repository homepage on GitHub, and click on the **Settings** tab.

2. **Open Branch Rules**:
   In the left sidebar, locate the **Code and automation** section and click on **Branches**.

3. **Add Protection Rule**:
   Click on the **Add branch protection rule** button. Or, if a rule for the `main` branch already exists, click **Edit**.

4. **Define Branch Pattern**:
   Set the **Branch name pattern** to `main` (or the default branch of the repository).

5. **Configure Pull Request Settings**:
   Check the box **Require a pull request before merging**.
   - Check **Require approvals** and set **Required number of approvals before merging** to at least `1`.
   - Check **Require review from Code Owners** (this ensures the users configured in `.github/CODEOWNERS` must approve).
   - Check **Dismiss stale pull request approvals when new commits are pushed** to ensure modifications are re-reviewed.

6. **Configure Status Checks**:
   Check the box **Require status checks to pass before merging**.
   - Check **Require branches to be up to date before merging**.
   - In the search box, find and select `Quality Checks` (this corresponds to the workflow job defined in `.github/workflows/ci.yml`).

7. **Resolve Conversations**:
   Check the box **Require conversation resolution before merging** to ensure all reviewer comments are addressed.

8. **Ensure Auto-Merge is Disabled**:
   Do **not** enable "Allow auto-merge" in the repository settings page under **Pull Requests** (or ensure it is disabled in the branch protection options).

9. **Save Changes**:
   Click **Create** or **Save changes** at the bottom of the page.

---

## 3. Pull Request Labels and Automation

Bots automatically apply labels to help triage incoming pull requests, but these do **not** bypass the merge rules:
- **Path-Based Labels**: PRs modifying documentation get `documentation`; configuration files get `ci-cd` or `customization`; core refactoring gets `refactor`.
- **Branch-Based Labels**: PRs created from branches prefixed with `feat/` automatically get `enhancement`; `fix/` branches get `bug`; `docs/` get `documentation`.
