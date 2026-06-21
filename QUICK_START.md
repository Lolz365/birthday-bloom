# Quick Start

Get Birthday Bloom running locally in 5 minutes.

## Prerequisites

- Node.js 18+ ([.nvmrc](./.nvmrc): 20)
- npm 9+

## Setup

```bash
# 1. Clone the repository
git clone https://github.com/naborajs/birthday-bloom.git
cd birthday-bloom

# 2. Install dependencies
npm install

# 3. Copy the env template
cp .env.example .env.local

# 4. Start the development server
npm run dev
```

The app will be available at `http://localhost:5000`.

## Personalize It

Edit `.env.local` with your own values. Here are common changes:

```env
VITE_BIRTHDAY_NAME=Riya
VITE_BIRTHDAY_RELATIONSHIP=partner
VITE_BIRTHDAY_COLOR=#FF1493
VITE_BIRTHDAY_CUSTOM_MESSAGE=You make every moment magical.
```

Restart the dev server after making changes.

## Verify It Works

- The splash screen should appear
- After clicking "Start", the cinematic intro plays
- After the intro, the main dashboard shows with sections (cake, photos, quiz, etc.)
- All content reflects your env values

## Build for Production

```bash
npm run build
npm run preview
```

The `dist/` folder is ready to deploy to any static hosting.

## Next Steps

- [ENV_GUIDE.md](./docs/ENV_GUIDE.md) — All configuration options
- [Deployment Guide](./docs/deployment.md) — Deploy to Vercel, Netlify, etc.
- [ARCHITECTURE.md](./ARCHITECTURE.md) — Codebase overview
- [FAQ.md](./FAQ.md) — Common questions
