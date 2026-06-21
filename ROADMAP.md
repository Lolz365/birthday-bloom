# Roadmap

This document outlines the planned direction for Birthday Bloom. It reflects the
maintainer's priorities and community feedback. Timelines are approximate and
may shift based on contributor availability.

## Now — Repository Quality & Community Foundation

- [x] Community health files (CODE_OF_CONDUCT, SECURITY, SUPPORT)
- [x] Issue and PR templates
- [x] CI pipeline (lint, typecheck, build, test)
- [x] Dependabot configuration
- [x] README and docs restructuring
- [x] CHANGELOG and ROADMAP
- [ ] Enable GitHub Discussions for Q&A and feature brainstorming
- [ ] Set up branch protection on `main`

## Next — Near-Term Improvements

### Templates & Personalization
- [ ] More celebration modes (anniversary, graduation, generic celebration)
- [ ] Pre-built theme packs users can drop in
- [ ] Better support for group celebrations (multi-person)

### Content & Media
- [ ] YouTube / Vimeo native embed support for video section
- [ ] Spotify / Apple Music playlist integration
- [ ] GIF and animated sticker support

### Accessibility & Mobile
- [ ] Screen reader pass on all interactive sections
- [ ] Keyboard navigation audit and improvements
- [ ] Offline support via service worker
- [ ] PWA manifest for installable experience

### Developer Experience
- [ ] Add Storybook for component development
- [ ] Test coverage for core store and utilities
- [ ] Contributing documentation for specific component areas
- [ ] Better error messages for misconfigured env values

## Later — Bigger Features

### Ecosystem
- [ ] CLI tool for quick project scaffolding (`npx create-birthday-bloom`)
- [ ] Online configurator / preview tool
- [ ] Community template gallery
- [ ] GitHub template repository for instant forks

### Platform
- [ ] Admin dashboard for non-developer customization
- [ ] Analytics integration option (opt-in)
- [ ] Guest book /留言 system with optional backend

### Performance
- [ ] Lazy-load sections based on scroll position
- [ ] Image optimization pipeline
- [ ] Animation performance regression testing

## Ideas / Explorations

These are not committed but are being explored:

- **i18n / localization framework** — Make it easy to translate the experience
- **Secret message reveal** — Hidden content unlocked by date or interaction
- **AR / camera filters** — Fun overlay effects using the device camera
- **Multi-page narrative** — Branching stories based on user choices
- **Shareable highlight reel** — Auto-generated GIF or video of the experience

## How to Influence the Roadmap

- **Upvote issues** with 👍 reactions on GitHub
- **Open feature requests** describing the problem and use case
- **Submit PRs** — working code speaks loudest
- **Share your use case** in Discussions

We prioritize features that:
1. Benefit the widest range of users
2. Align with the env-first, customization-driven philosophy
3. Maintain performance and accessibility
4. Are maintainable by a small team
