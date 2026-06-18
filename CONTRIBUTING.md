# 🌸 Contributing to Birthday Bloom

First of all, thank you for taking the time to contribute to Birthday Bloom.

Whether you're fixing a bug, improving performance, enhancing animations, refining accessibility, improving documentation, or building new features, your contribution is appreciated.

Birthday Bloom is more than a birthday website.

It is a **template-driven, family-aware, highly customizable celebration platform** designed to create meaningful experiences for people across different relationships, personalities, and cultures.

---

> 💡 **Before writing code, understand the existing architecture.**
>
> Birthday Bloom already includes templates, family systems, environment-based customization, animation systems, personalization engines, and reusable UI components.
>
> Most contributions should extend existing systems instead of creating new isolated implementations.

---

# 🎯 Project Philosophy

Birthday Bloom follows several important principles:

### Environment First

Whenever possible:

* Use configuration.
* Use templates.
* Use environment variables.
* Reuse existing systems.

Avoid hardcoded values.

Good:

```env
VITE_BIRTHDAY_NAME=Priya
```

Bad:

```ts
const name = "Priya";
```

---

### Build For Everyone

One of the most important rules in this project:

> **Do not build features that only work for one template.**

If you add:

* Animations
* Emojis
* Messages
* Quizzes
* Gifts
* UI sections
* Story elements

They should work across:

* Partner
* Girlfriend
* Boyfriend
* Friend
* Best Friend
* Brother
* Sister
* Father
* Mother
* Grandfather
* Grandmother
* Guardian
* Custom

Avoid relationship-specific hardcoding whenever possible.

Think in systems, not one-off implementations.

---

### Extend Existing Systems

Before creating something new:

Ask yourself:

* Does this already exist?
* Can I extend an existing feature?
* Can I use existing templates?
* Can I use existing environment variables?
* Can I reuse an existing component?

Prefer extension over duplication.

---

# 🏗️ Development Setup

Clone the repository:

```bash
git clone <repository-url>
cd birthday-bloom
```

Install dependencies:

```bash
npm install
```

Run locally:

```bash
npm run dev
```

Create production build:

```bash
npm run build
```

---

# 🧪 Testing Requirements

Before submitting a Pull Request:

### Required

* Run the project locally.
* Verify the application builds successfully.
* Verify there are no TypeScript errors.
* Verify there are no console errors.
* Verify there are no obvious visual issues.

### Template Validation

If your change affects:

* UI
* Animations
* Messages
* Personalization
* Family system
* Templates

Please test with multiple relationship types.

At minimum:

* Friend
* Partner
* Brother or Sister

Do not assume a feature works everywhere because it works in one template.

---

# 📱 Mobile Support

Birthday Bloom supports:

* Desktop
* Tablet
* Mobile

Before submitting:

* Check responsiveness.
* Check touch interactions.
* Check animations on mobile devices.
* Ensure no important content becomes inaccessible.
* If you dont have any spefic mobile device then its okay, Just verify it in your mobile/Laptop

---

# ⚡ Performance Guidelines

Performance matters.

Please avoid:

* Memory leaks
* Infinite loops
* Excessive particle generation
* Unnecessary re-renders
* Large dependencies

New animations should:

* Clean themselves up properly
* Respect reduced motion settings
* Remain smooth on lower-end devices

Target:

> Smooth user experience over visual complexity.

---

# 🔐 Security Guidelines

Please:

* Validate inputs.
* Sanitize user content.
* Treat environment variables as public.
* Follow secure coding practices.

Never:

* Commit secrets.
* Commit API keys.
* Commit credentials.
* Store sensitive data inside client code.

---

# 🎨 Design Guidelines

Birthday Bloom should feel:

* Personal
* Emotional
* Premium
* Elegant
* Memorable

When improving UI:

Prefer:

* Smooth transitions
* Clean layouts
* Readable typography
* Meaningful animations

Avoid:

* Visual clutter
* Excessive effects
* Distracting interactions

```IF YOU WANT TO ADD A NEW FEATURE, DO IT I WILL DEFENTLY SEE IT AND IF ITS GOOD I WILL APPROVE IT.```
---

# 📝 Commit Message Convention

Examples:

```text
feat: add template-aware emoji trail system

fix: resolve mobile fireworks cleanup issue

perf: optimize particle rendering

docs: improve family system documentation

refactor: simplify birthday template configuration
```

Avoid:

```text
update

fixed bug

changes

test
```

---

# 🚀 Pull Request Checklist

Before opening a Pull Request:

* [ ] Project runs locally
* [ ] Production build succeeds
* [ ] No TypeScript errors
* [ ] No console errors
* [ ] No merge conflicts
* [ ] Mobile layout tested
* [ ] Existing functionality preserved
* [ ] Multiple templates tested
* [ ] Documentation updated when required

---

# 💭 Feature Requests

When proposing a feature:

Please explain:

1. What problem it solves.
2. Why it belongs in Birthday Bloom.
3. Which templates it supports.
4. Whether it should be configurable.
5. Whether it impacts performance.

Features that benefit all users are more likely to be accepted.

---

# ❤️ Respect Existing Architecture

Birthday Bloom has evolved through many iterations.

Please avoid:

* Large unnecessary rewrites.
* Massive architectural changes.
* Breaking existing customization systems.
* Replacing stable implementations without strong justification.

Incremental improvements are preferred.

---

> 🌸 "Build features that scale across templates, relationships, and future versions—not just your own use case."

Thank you for helping make Birthday Bloom better for everyone.

— Naboraj Sarkar
Maintainer, Birthday Bloom
