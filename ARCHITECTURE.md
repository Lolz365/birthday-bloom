# Birthday Bloom Architecture

## Overview

Birthday Bloom is a **cinematic finite state machine (CFSM)** — a single-page
React application that orchestrates a timed, multi-scene emotional experience
through environment-driven configuration.

The application is structured around three layers: **data**, **design**, and
**execution** — each independent but feeding into the next.

## Project Structure

```
src/
├── App.tsx                        # App shell, routing, global providers
├── pages/
│   ├── Index.tsx                  # Top-level phase orchestrator
│   └── NotFound.tsx               # 404 page
├── components/
│   ├── birthday/                  # Visual and interactive sections (39 components)
│   │   ├── CinematicIntro.tsx     # Multi-phase intro narrative
│   │   ├── MainBirthday.tsx       # Main dashboard after intro
│   │   ├── CakeCutting.tsx        # Interactive SVG cake with phases
│   │   ├── PhotoGallery.tsx       # 3D-tilting gallery with lightbox
│   │   ├── HeartTree.tsx          # SVG growth animation finale
│   │   ├── TypeWriter.tsx         # Character-by-character typography
│   │   ├── Confetti.tsx           # Canvas-confetti wrapper
│   │   ├── Balloons.tsx           # Physics-based floating balloons
│   │   ├── BirthdayQuiz.tsx       # Interest-aware trivia engine
│   │   ├── VideoGallery.tsx       # Memory video gallery
│   │   ├── FinalSurprise.tsx      # Closing emotional scene
│   │   ├── PasswordUnlock.tsx     # Cinematic password screen
│   │   └── ... (effects layer)
│   └── ui/                        # shadcn/Radix UI primitives
├── features/
│   ├── core/
│   │   ├── store/
│   │   │   └── useBirthdayStore.ts # Zustand store, env parsing, config
│   │   ├── models/
│   │   │   ├── familyTemplates.ts  # Family profile schema & factories
│   │   │   └── dataModels.ts       # Enhanced data models & validators
│   │   └── theme/
│   │       └── useDynamicTheme.ts  # HSL token injection into :root
│   └── cinematic-story/
│       ├── scenes/                 # Narrative scene components
│       └── animations/             # Framer Motion variants
├── config/
│   ├── birthday.ts                 # Env + static config fallback
│   ├── templates.ts                # Emotional letter templates
│   └── emojiKits.ts                # Relationship-based emoji sets
├── hooks/                          # Shared React hooks
├── services/
│   └── audioSystem.ts              # HTML5 audio management
├── utils/                          # Utilities (password, responsive)
└── test/                           # Test setup and scaffolding
```

## Layer 1: Configuration System (Data Layer)

### Env-First Architecture

Birthday Bloom is designed so that **environment variables are the primary
customization layer**, not code edits.

**How env flows into the app:**

1. `.env.local` / hosting dashboard → `import.meta.env.VITE_*`
2. `src/features/core/store/useBirthdayStore.ts` parses env at module load
3. Store exposes a typed `BirthdayConfig` object
4. Components read from the store via `useBirthdayStore()`

**Priority order:**

1. `import.meta.env.VITE_*` (from `.env.local` or hosting secrets)
2. `src/config.ts` static fallback values
3. Built-in defaults in the store

**Adding a new env variable:**

1. Add the key to `.env.example` with a comment explaining its purpose
2. Add parsing logic in `useBirthdayStore.ts`
3. Add documentation in `docs/ENV_GUIDE.md`
4. Wire the value through the `BirthdayConfig` type

### Store Details

- **Library**: Zustand (lightweight, no boilerplate)
- **File**: `src/features/core/store/useBirthdayStore.ts`
- **State**: Single `config: BirthdayConfig` object + `isConfigured` flag
- **Derived**: `getMood()` → `'romantic' | 'energetic' | 'warm'` based on relationship
- **Derived**: `getAnimationPacing()` → `'slow' | 'fast' | 'moderate'`
- **Parsing helpers**: `parseEnvString`, `parseEnvBoolean`, `parseEnvNumber`,
  `parseEnvList`, `parseEnvJson` — all in the store file

### Family Template System

`src/features/core/models/familyTemplates.ts` provides a scalable schema for
relationship profiles. It supports `brother`, `sister`, `father`, `mother`, and
10+ other family member types with shared base fields and type-specific extensions.

## Layer 2: Design System

### Dynamic Theming

- **File**: `src/features/core/theme/useDynamicTheme.ts`
- What it does: Injects HSL CSS custom properties into `:root` at runtime
- The `useDynamicTheme` hook is called once in `Index.tsx`
- It reads the user's `VITE_BIRTHDAY_COLOR` and relationship mood to generate:
  - Primary, secondary, and accent color tokens
  - Glow effects
  - Gradient backgrounds
  - Theme-aware typography weights

### Styling Approach

- **Tailwind CSS** for utility-first styling
- **CSS custom properties** for dynamic theming (injected by `useDynamicTheme`)
- **Framer Motion** for orchestrated animations
- **shadcn/ui** components for UI primitives (dialog, toast, button, etc.)
- CSS transitions and `translate3d` for GPU-accelerated motion

## Layer 3: Execution (Experience Flow)

### Phase Sequence

The app moves through these phases, orchestrated by `src/pages/Index.tsx`:

```
Splash → [Password Unlock] → Intro → Main Dashboard
```

**1. Splash** (`SplashScreen.tsx`)
- First impression with "Start" button
- Audio context initialization (required for browser autoplay policy)

**2. Password Unlock** (`PasswordUnlock.tsx`) — *optional*
- Cinematic frosted-glass lock screen
- Password from env or auto-generated from birthday date

**3. Intro** (`CinematicIntro.tsx`)
- Multi-phase narrative sequence:
  1. **Storytelling** — Text appears character by character
  2. **Fake Chat** — Simulated messaging interface
  3. **Post-Chat** — Emotional transition
  4. **Reveal Sequence** — Confetti and visual payoff
- Uses a scene state machine: `"storytelling" | "fake-chat" | "post-chat" | "reveal-sequence" | "done"`
- Timer management via `useRef<setTimeout[]>` for cleanup on unmount

**4. Main Dashboard** (`MainBirthday.tsx`)
- Hero section with TypeWriter for personalized greeting
- Section visibility gated by env variables (`VITE_SHOW_*_SECTION`)
- Sections rendered in order:
  1. Cake Cutting (`CakeCutting.tsx`)
  2. Photo Gallery (`PhotoGallery.tsx`)
  3. Birthday Quiz (`BirthdayQuiz.tsx`)
  4. Video Gallery (`VideoGallery.tsx`)
  5. Heart Tree (`HeartTree.tsx`)
  6. Final Surprise (`FinalSurprise.tsx`)

### Effects Layer

Multiple ambient effects run in the background via `Index.tsx`:
- `FloatingElements`, `MorphingElements`, `EnhancedFloatingElements`
- `SparkleRain`, `FireflyEffect`, `FloatingOrbs`, `ShootingStars`
- `AnimatedGradient`, `EmojiCursorTrail`, `PremiumFireworks`
- Intensity and count adapt to mobile vs desktop

## Key Technical Decisions

| Decision | Rationale |
| --- | --- |
| **No Three.js / Matter.js** | Bundle size; CSS + Framer Motion + SVG is sufficient |
| **Zustand over Redux** | Minimal boilerplate, no context providers needed |
| **SVG for cake and tree** | Resolution-independent, animatable with CSS |
| **`stroke-dasharray` animation** | For "growing" the Heart Tree without JS canvas |
| **Env-first over UI configurator** | Zero runtime overhead, works with any hosting platform |
| **`setTimeout` with ref cleanup** | Prevents state updates on unmounted components |

## Adding New Features

### New Visual Section
1. Create component in `src/components/birthday/`
2. Add an env toggle (`VITE_SHOW_*_SECTION`) in `.env.example` and store
3. Wire visibility in `MainBirthday.tsx`
4. Document in `ENV_GUIDE.md`

### New Env Option
1. Add to `.env.example`
2. Parse in `useBirthdayStore.ts` using existing helpers
3. Add to `BirthdayConfig` type
4. Document in `ENV_GUIDE.md`
5. Consume in components via `useBirthdayStore()`

### New Theme / Color
Add to `tailwind.config.ts` `colors.birthday` namespace and update `useDynamicTheme.ts`.

### New Family Relationship
Add the type to `FamilyMemberType` in `familyTemplates.ts`, create a factory function,
and add a template entry.

## Performance Considerations

- Animations use `translate3d` for GPU compositing
- Particle counts scale down on mobile
- `ErrorBoundary` catches render failures without crashing the app
- Code splitting via Vite rollup manual chunks (framer-motion, radix-ui, vendor)
- No heavy physics libraries — animations are CSS + SVG native
