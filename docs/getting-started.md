<div align="center">

# 🚀 Getting Started with Birthday Bloom

### Build a cinematic birthday experience in minutes.

From a fresh clone to a fully personalized celebration — this guide will get you running as quickly as possible.

</div>

---

> [!IMPORTANT]
>
> Birthday Bloom is an **Environment-First Platform**.
>
> Before modifying source code, always check whether the customization can be achieved through `.env.local`.

---

## 🏁 The 5-Minute Launch

### Step 1 — Verify Your Environment

Birthday Bloom requires:

| Tool    | Required Version |
| ------- | ---------------- |
| Node.js | 18+              |
| npm     | 9+               |
| Git     | Latest           |

Verify installation:

```bash
node -v
npm -v
git --version
```

---

### Step 2 — Clone & Install

```bash
# Clone repository
git clone https://github.com/naborajs/birthday-bloom.git

# Enter project
cd birthday-bloom

# Install dependencies
npm install
```

---

### Step 3 — Create Your First Bloom

Create:

```text
.env.local
```

Add the minimum configuration:

```env
VITE_BIRTHDAY_NAME="Naboraj"

VITE_BIRTHDAY_RELATIONSHIP="friend"

VITE_BIRTHDAY_COLOR="#FF6B6B"
```

Supported relationship templates include:

```text
friend
brother
sister
father
mother
grandfather
grandmother
guardian
partner
boyfriend
girlfriend
custom
```

---

### Step 4 — Launch Development Server

```bash
npm run dev
```

Open:

```text
http://localhost:5173
```

If everything is configured correctly, Birthday Bloom will automatically generate a personalized experience using your environment variables.

---

## 🎨 Quick Personalization

Change the recipient:

```env
VITE_BIRTHDAY_NAME="Priya"
```

Change the relationship:

```env
VITE_BIRTHDAY_RELATIONSHIP="sister"
```

Change the primary theme color:

```env
VITE_BIRTHDAY_COLOR="#FF69B4"
```

Add a custom message:

```env
VITE_BIRTHDAY_CUSTOM_MESSAGE="You make every day brighter."
```

---

> [!TIP]
>
> Most customizations can be completed without editing source code.
>
> Explore `ENV_GUIDE.md` before modifying components.

---

## 🎂 What Comes Built In?

Birthday Bloom ships with:

```text
✓ Cinematic Intro

✓ Countdown Experience

✓ Interactive Cake Cutting

✓ Fireworks Celebration

✓ Cursor Effects

✓ Music Player

✓ Personalized Letters

✓ Memory Gallery

✓ Birthday Quiz

✓ Hidden Gift System

✓ Heart Tree

✓ Password Protection

✓ Family Templates

✓ Final Surprise Video
```

---

## 🛡️ Pre-Launch Checklist

Before sharing your celebration:

* [ ] Application builds successfully
* [ ] No console errors
* [ ] Photos load correctly
* [ ] Videos play correctly
* [ ] Mobile layout tested
* [ ] Environment variables configured
* [ ] Audio tested
* [ ] Relationship template verified

Production build:

```bash
npm run build
```

Preview production build:

```bash
npm run preview
```

---

## 🛠 Common Issues

### Blank Screen

Check:

```env
VITE_BIRTHDAY_NAME
```

Make sure it exists and restart the development server.

---

### Audio Does Not Play

Modern browsers block autoplay until user interaction.

This is expected behavior.

---

### Images Not Loading

Verify:

* URL is public
* URL is correct
* Image format is supported

Recommended formats:

```text
jpg
png
webp
```

---

### Environment Changes Not Updating

Restart:

```bash
npm run dev
```

after modifying `.env.local`.

---

## 📚 Next Steps

### Configuration

→ ENV_GUIDE.md

### Family Templates

→ family-system.md

### Architecture

→ architecture.md

### Animation Systems

→ animations.md

### Contributing

→ CONTRIBUTING.md

---

<div align="center">

### 🌸 Happy Building

Create something memorable.

</div>
