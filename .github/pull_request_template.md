<!-- 
  Thank you for contributing to Birthday Bloom! 🌸
  
  Before submitting your Pull Request, please ensure you have:
  1. Read the CONTRIBUTING.md (https://github.com/naborajs/birthday-bloom/blob/main/CONTRIBUTING.md)
  2. Read the ARCHITECTURE.md (https://github.com/naborajs/birthday-bloom/blob/main/docs/ARCHITECTURE.md)
  3. Checked that all tests, linting, and type-checks pass.
  4. Followed the Conventional Commits style for your commit messages.
-->

## 📝 Pull Request Summary

<!-- A clear, concise, and detailed description of the changes introduced by this pull request. -->

---

## 🔍 PR Information

| Question | Answer |
| :--- | :--- |
| **Type of Change** | `[ ] Bug Fix 🐛` \| `[ ] New Feature ✨` \| `[ ] Refactoring 🛠️` \| `[ ] Documentation 📚` \| `[ ] Performance ⚡` \| `[ ] CI/CD / Chore ⚙️` \| `[ ] Style/Formatting 🎨` |
| **Target Branch** | `[ ] main` |
| **Related Issue(s)** | Closes #<!-- Issue Number --> |
| **Requires Env Changes?** | `[ ] Yes` / `[ ] No` (If yes, update `.env.example` and `ENV_GUIDE.md`) |
| **Is Breaking Change?** | `[ ] Yes` / `[ ] No` (If yes, describe the breaking impact below) |

---

## 📖 Detailed Description

### 1. Problem / Motivation
<!-- Describe the problem you are solving, or the motivation behind this feature. Provide context for why this change is necessary. -->

### 2. Solution / Implementation
<!-- Explain the approach you took to solve the problem or implement the feature. Highlight key architectural changes, algorithms, or design patterns used. -->

### 3. File-by-File Changes (Key Changes Only)
<!-- Briefly list the primary files modified and the purpose of the change in each. -->
* `path/to/file.tsx`: <!-- Explanation of change -->
* `path/to/file.css`: <!-- Explanation of change -->

---

## 🎨 UI/UX & Visual Changes (if applicable)

> [!IMPORTANT]
> If your changes affect the user interface (UI), user experience (UX), layouts, colors, or animations, you **MUST** provide visual evidence. Please provide side-by-side before/after comparisons using the tables below.

### Visual Comparison Table

#### 🖥️ Desktop View
| Before (Original State) | After (Modified State) |
| :---: | :---: |
| <!-- Drag and drop or link your "Before" image/GIF/video here --> | <!-- Drag and drop or link your "After" image/GIF/video here --> |

#### 📱 Mobile / Responsive View
| Before (Original State) | After (Modified State) |
| :---: | :---: |
| <!-- Drag and drop or link your "Before" image/GIF/video here --> | <!-- Drag and drop or link your "After" image/GIF/video here --> |

### 🎬 Interactive Demos / Screen Recordings
<!-- For animations, transitions, or complex interactive flows, please link a screen recording (GIF/MP4) here. -->

---

## 🧪 Verification & Testing Details

### Step-by-Step Testing Guide
<!--
  Provide detailed instructions so that reviewers can verify your changes locally.
  Include any setup steps, specific environment configurations, or inputs to try.
-->
1. Run `npm install` and ensure all dependencies are resolved.
2. Start the dev server: `npm run dev`
3. Navigate to `http://localhost:5000`
4. [Describe actions to trigger/test the new behavior]
5. Verify that [expected result] occurs.

### Test Environment
* **OS**: <!-- e.g., Windows 11, macOS, Linux -->
* **Browser(s)**: <!-- e.g., Chrome, Safari, Firefox, Edge -->
* **Node Version**: <!-- e.g., v18.16.0 -->

### Automated Quality Checks
- [ ] Checked for TypeScript errors (`npx tsc --noEmit` or `npm run build` succeeds)
- [ ] Ran ESLint and formatting checks (`npm run lint` passes without errors)
- [ ] Ran existing test suites (`npm test` or `npm run test` passes)
- [ ] Tested responsiveness on multiple screen sizes (Mobile, Tablet, Desktop)
- [ ] Checked console logs to verify no unexpected warnings or errors are thrown

### Relationship Types Tested (For UI changes)
<!-- Since features must work across all relationships, check which ones you tested: -->
- [ ] Partner / Spouse
- [ ] Friend
- [ ] Sibling
- [ ] Parent / Grandparent
- [ ] Other: `________`

---

## ⚠️ Breaking Changes & Migration Path

<!-- If yes was selected for breaking changes above, detail them here. Describe the impact and any migration steps required for users/developers. -->

---

## 📚 Documentation Updates

- [ ] I have updated the relevant documentation (e.g., `README.md`, `ARCHITECTURE.md`, `FAQ.md`, `ENV_GUIDE.md`)
- [ ] The change is minor and does not require documentation updates

---

## ✅ Contributor Checklist

- [ ] My code adheres to the project's style guidelines defined in `STYLEGUIDE.md`.
- [ ] I have cleaned up my code (removed unused imports, commented-out code, and temporary debugging console logs).
- [ ] I have added/updated unit tests where applicable.
- [ ] My commit messages follow the Conventional Commits specification.
- [ ] There are no merge conflicts with the `main` branch.

---

## 🛡️ Reviewer & Maintainer Checklist (Admin Use Only)

> [!IMPORTANT]
> **Strict Merge Policy**: Pull requests must **not** be merged automatically or without explicit approval from a repository maintainer or administrator.

- [ ] Approved by repository owner or administrator
- [ ] Code review completed and all discussions resolved
- [ ] Status checks (Lint, TSC type check, Build, Tests) passed
- [ ] Security audit completed (no exposed secrets, safe HTML/JS execution, inputs sanitized)
- [ ] Merged manually by authorized administrator
