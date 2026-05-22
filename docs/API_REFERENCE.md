# 🌸 Birthday Bloom v3.0 - API Reference

**Version**: 3.0  
**Last Updated**: May 2026

---

## Table of Contents

1. [Store API](#store-api)
2. [Component API](#component-api)
3. [Utilities API](#utilities-api)
4. [Data Models API](#data-models-api)
5. [Hooks API](#hooks-api)
6. [Type Definitions](#type-definitions)

---

## Store API

### `useBirthdayStore`

The main Zustand store for managing birthday configuration.

```typescript
import { useBirthdayStore } from '@/features/core/store/useBirthdayStore';

interface BirthdayStore {
  config: BirthdayConfig;
  isConfigured: boolean;
  setConfig: (config: Partial<BirthdayConfig>) => void;
  completeConfiguration: () => void;
  getAnimationPacing: () => 'slow' | 'fast' | 'moderate';
  getMood: () => 'romantic' | 'energetic' | 'warm';
}
```

#### Usage Example

```typescript
function MyComponent() {
  const { config, setConfig, getMood } = useBirthdayStore();
  
  const handleColorChange = (newColor: string) => {
    setConfig({ favoriteColor: newColor });
  };
  
  const mood = getMood();
  
  return <div style={{ color: config.favoriteColor }}>{mood}</div>;
}
```

---

## Component API

### `MainBirthday`

Main cinematic birthday experience component that orchestrates all animations and transitions.

```typescript
import { MainBirthday } from '@/components/birthday/MainBirthday';
```

**Props**: None (uses store)

**Features**:
- Cinematic story progression
- Multiple scene transitions
- Interactive elements
- Sound integration
- Confetti effects

**Example**:
```typescript
export default function Page() {
  return <MainBirthday />;
}
```

---

### `PhotoGallery`

Displays photos in an interactive gallery with transitions.

```typescript
import { PhotoGallery } from '@/components/birthday/PhotoGallery';

interface PhotoGalleryProps {
  photos: string[];
  autoPlay?: boolean;
  interval?: number;
  onPhotoChange?: (index: number) => void;
}
```

**Example**:
```typescript
<PhotoGallery
  photos={[
    'https://example.com/photo1.jpg',
    'https://example.com/photo2.jpg',
  ]}
  autoPlay={true}
  interval={3000}
  onPhotoChange={(index) => console.log('Photo changed to:', index)}
/>
```

---

### `VideoGallery`

Displays videos with playback controls and transitions.

```typescript
import { VideoGallery } from '@/components/birthday/VideoGallery';

interface VideoGalleryProps {
  videos: string[];
  onVideoChange?: (index: number) => void;
  muted?: boolean;
  loop?: boolean;
}
```

**Example**:
```typescript
<VideoGallery
  videos={[
    'https://example.com/video1.mp4',
    'https://example.com/video2.mp4',
  ]}
  onVideoChange={(index) => console.log('Video:', index)}
/>
```

---

### `Confetti`

Confetti animation effect component.

```typescript
import { useConfetti } from '@/components/birthday/Confetti';

const { fireConfetti, fireCannon, fireStars } = useConfetti();

// Trigger effects
fireConfetti();      // Standard confetti
fireCannon();        // Cannon explosion
fireStars();         // Star burst
```

---

### `HeartProgression`

Animated heart progression display.

```typescript
import { HeartProgression } from '@/components/birthday/HeartProgression';

<HeartProgression count={5} color="#FF1493" />
```

---

### `SoundManager`

Manages background music and sound effects.

```typescript
import { useSoundManager } from '@/components/birthday/SoundManager';

const {
  playReveal,
  playPop,
  playBoom,
  playWhoosh,
  setBgVolume,
  setEffectsVolume,
} = useSoundManager();

// Play effects
playReveal();        // Reveal sound
playPop();           // Pop sound
playBoom();          // Explosion sound
playWhoosh();        // Whoosh sound

// Set volume (0-1)
setBgVolume(0.5);
setEffectsVolume(0.7);
```

---

### `TypeWriter`

Animated text reveal effect (typewriter style).

```typescript
import { TypeWriter } from '@/components/birthday/TypeWriter';

<TypeWriter text="Happy Birthday!" speed={50} />
```

**Props**:
- `text: string` - Text to display
- `speed: number` - Milliseconds per character (default: 50)
- `onComplete?: () => void` - Callback when finished

---

### Animation Components

#### `Balloons`
Floating balloons animation.
```typescript
<Balloons count={10} />
```

#### `Sparkles`
Sparkle effect particles.
```typescript
<Sparkles intensity="high" />
```

#### `FloatingOrbs`
Floating orb particles.
```typescript
<FloatingOrbs count={20} />
```

#### `ShootingStars`
Shooting stars animation.
```typescript
<ShootingStars speed="moderate" />
```

#### `FireflyEffect`
Firefly-like particles.
```typescript
<FireflyEffect count={30} />
```

#### `GlitchEffect`
Glitch/distortion effect.
```typescript
<GlitchEffect intensity={5} />
```

---

## Utilities API

### `ConfigValidator`

Validates and sanitizes configuration objects.

```typescript
import { ConfigValidator } from '@/features/core/models/dataModels';

// Validate config
const result = ConfigValidator.validate(config);
// Returns: { isValid: boolean; errors: string[]; warnings: string[] }

if (result.isValid) {
  console.log('Config is valid');
} else {
  console.error('Errors:', result.errors);
  console.warn('Warnings:', result.warnings);
}

// Sanitize config (remove invalid data, apply defaults)
const cleanConfig = ConfigValidator.sanitize(userConfig);

// Merge with defaults
const fullConfig = ConfigValidator.mergeWithDefaults(partialConfig);
```

---

### `DataValidator`

Validates individual data fields.

```typescript
import { DataValidator } from '@/features/core/models/dataModels';

// Email validation
DataValidator.isValidEmail("user@example.com");  // true

// Hex color validation
DataValidator.isValidHexColor("#FF6B6B");        // true

// Phone number validation
DataValidator.isValidPhoneNumber("+1-555-123-4567");  // true

// URL validation
DataValidator.isValidURL("https://example.com");  // true

// Date validation
DataValidator.isValidDate(new Date());            // true

// Age validation
DataValidator.isValidAge(25);                     // true

// Closeness level (1-10)
DataValidator.isValidClosenessLevel(7);           // true

// Name validation
DataValidator.isValidName("John Doe");            // true
```

---

### Family Template Factories

Create default family member profiles.

```typescript
import {
  createDefaultBrotherProfile,
  createDefaultSisterProfile,
} from '@/features/core/models/familyTemplates';

const brother = createDefaultBrotherProfile("Raj", new Date('1998-03-15'));
const sister = createDefaultSisterProfile("Priya", new Date('2000-07-22'));

// Customize profiles
brother.personality.traits = ['protective', 'funny'];
brother.siblingBond.closenessLevel = 9;
brother.preferences.favoriteFood = ['pizza', 'tacos'];

sister.professionalLife.currentRole = "Engineer";
sister.relationshipDynamics.bondStrength = 10;
sister.preferences.favoriteColors = ['#FF1493', '#FFB6C1'];
```

---

## Data Models API

### `EnhancedBirthdayConfig`

```typescript
interface EnhancedBirthdayConfig {
  core: {
    name: string;
    dateOfBirth: Date;
    gender: GenderType;
    relationship: RelationshipType;
    customRelationship?: string;
  };
  
  personalization: {
    theme: ThemeType;
    favoriteColor: string;
    favoriteEmojis?: string[];
    customMessage?: string;
    interests?: string[];
    hobbies?: string[];
  };
  
  media: {
    photos?: {
      primary?: string;
      gallery?: string[];
      thumbnails?: string[];
    };
    videos?: {
      intro?: string;
      memories?: string[];
      outro?: string;
    };
    audio?: {
      backgroundMusic?: string;
      voiceMessage?: string;
      soundEffects?: boolean;
    };
  };
  
  experience: {
    animationSpeed?: AnimationSpeed;
    animationIntensity?: 'low' | 'medium' | 'high';
    particleEffects?: boolean;
    particleCount?: number;
    showSkipButton?: boolean;
    duration?: 'quick' | 'normal' | 'extended';
  };
  
  accessibility: {
    reducedMotion?: boolean;
    textSize?: 'small' | 'normal' | 'large';
    highContrast?: boolean;
    captions?: boolean;
    screenReaderOptimized?: boolean;
  };
  
  messaging: {
    letterTitle?: string;
    letterContent?: string;
    letterSignature?: string;
    senderName?: string;
    additionalMessages?: Array<{
      title?: string;
      content?: string;
    }>;
  };
  
  sections: {
    showCake?: boolean;
    showPhotos?: boolean;
    showVideos?: boolean;
    showQuiz?: boolean;
    showHeartTree?: boolean;
    showTimeline?: boolean;
    customSections?: Array<{
      id: string;
      title: string;
      content: string;
      order?: number;
    }>;
  };
  
  metadata?: {
    createdAt?: Date;
    updatedAt?: Date;
    version?: string;
    tags?: string[];
    isPublic?: boolean;
  };
}
```

### `BrotherProfile`

```typescript
interface BrotherProfile {
  basicInfo: {/*...*/};
  identity: {/*...*/};
  personality: {/*...*/};
  interests: {/*...*/};
  skills: {/*...*/};
  appearance: {/*...*/};
  contact: {/*...*/};
  siblingBond: {/*...*/};
  dreams: {/*...*/};
  achievements: {/*...*/};
  media: {/*...*/};
  importantDates: {/*...*/};
  personalNotes: {/*...*/};
  preferences: {/*...*/};
  futurePlans: {/*...*/};
}
```

### `SisterProfile`

```typescript
interface SisterProfile {
  coreIdentity: {/*...*/};
  professionalLife: {/*...*/};
  personalityProfile: {/*...*/};
  lifestyle: {/*...*/};
  passions: {/*...*/};
  preferences: {/*...*/};
  relationshipDynamics: {/*...*/};
  memories: {/*...*/};
  dreamsAndInspiration: {/*...*/};
  achievements: {/*...*/};
  styleAndAppearance: {/*...*/};
  socialAndContact: {/*...*/};
  personalArchive: {/*...*/};
  heartMatters: {/*...*/};
  futureAndGrowth: {/*...*/};
}
```

---

## Hooks API

### `useIsMobile`

Detect if the device is mobile.

```typescript
import { useIsMobile } from '@/hooks/use-mobile';

function MyComponent() {
  const isMobile = useIsMobile();
  
  return <div>{isMobile ? 'Mobile' : 'Desktop'}</div>;
}
```

---

### `useToast`

Display toast notifications.

```typescript
import { useToast } from '@/hooks/use-toast';

function MyComponent() {
  const { toast } = useToast();
  
  const handleClick = () => {
    toast({
      title: "Success",
      description: "Birthday celebration started!",
      duration: 5000,
    });
  };
  
  return <button onClick={handleClick}>Show Toast</button>;
}
```

---

## Type Definitions

### Enumerations

```typescript
// Relationship Types
type RelationshipType = 'partner' | 'friend' | 'family' | 'sibling' | 'colleague' | 'mentor' | 'custom';

// Gender Types
type GenderType = 'male' | 'female' | 'other';

// Theme Types
type ThemeType = 'romantic' | 'fun' | 'energetic' | 'elegant' | 'playful' | 'nostalgic';

// Animation Speed
type AnimationSpeed = 'slow' | 'moderate' | 'fast';

// Age Groups
type AgeGroup = 'teen' | 'young-adult' | 'adult' | 'senior';
```

### Constants

```typescript
export const RELATIONSHIP_TYPES = {
  PARTNER: 'partner',
  FRIEND: 'friend',
  FAMILY: 'family',
  SIBLING: 'sibling',
  COLLEAGUE: 'colleague',
  MENTOR: 'mentor',
  CUSTOM: 'custom',
};

export const GENDER_TYPES = {
  MALE: 'male',
  FEMALE: 'female',
  OTHER: 'other',
};

export const THEME_TYPES = {
  ROMANTIC: 'romantic',
  FUN: 'fun',
  ENERGETIC: 'energetic',
  ELEGANT: 'elegant',
  PLAYFUL: 'playful',
  NOSTALGIC: 'nostalgic',
};

export const ANIMATION_SPEEDS = {
  SLOW: 'slow',
  MODERATE: 'moderate',
  FAST: 'fast',
};

export const AGE_GROUPS = {
  TEEN: 'teen',
  YOUNG_ADULT: 'young-adult',
  ADULT: 'adult',
  SENIOR: 'senior',
};
```

---

## Complete Example

```typescript
import React from 'react';
import { useBirthdayStore } from '@/features/core/store/useBirthdayStore';
import { MainBirthday } from '@/components/birthday/MainBirthday';
import { PhotoGallery } from '@/components/birthday/PhotoGallery';
import { ConfigValidator } from '@/features/core/models/dataModels';

export default function BirthdayPage() {
  const { config, setConfig } = useBirthdayStore();
  
  React.useEffect(() => {
    // Validate and sanitize config on mount
    const validation = ConfigValidator.validate(config);
    
    if (!validation.isValid) {
      console.error('Config errors:', validation.errors);
      // Sanitize and update
      const cleanConfig = ConfigValidator.sanitize(config);
      setConfig(cleanConfig);
    }
    
    if (validation.warnings.length > 0) {
      console.warn('Config warnings:', validation.warnings);
    }
  }, []);
  
  return (
    <div>
      <MainBirthday />
      <PhotoGallery
        photos={config.photos || []}
        autoPlay={true}
        interval={5000}
      />
    </div>
  );
}
```

---

## Migration Guide (v2.5 → v3.0)

### Old API
```typescript
const config: BirthdayConfig = {
  name: "Guest",
  age: 25,
  gender: "male",
  relationship: "friend",
  // ... limited options
};
```

### New API
```typescript
const config: EnhancedBirthdayConfig = {
  core: {
    name: "Guest",
    dateOfBirth: new Date('2001-05-22'),
    gender: 'male',
    relationship: 'friend',
  },
  personalization: {
    theme: 'fun',
    favoriteColor: '#FF6B6B',
    interests: ['coding', 'gaming'],
  },
  // ... 6 more major sections with extensive options
};

// Validate before use
const validation = ConfigValidator.validate(config);
```

---

## Error Handling

```typescript
try {
  const validation = ConfigValidator.validate(config);
  
  if (!validation.isValid) {
    throw new Error(`Invalid config: ${validation.errors.join(', ')}`);
  }
  
  const cleanConfig = ConfigValidator.sanitize(config);
  setConfig(cleanConfig);
} catch (error) {
  console.error('Configuration error:', error);
  // Show error UI
}
```

---

## Performance Tips

1. **Lazy Load Components**
   ```typescript
   const MainBirthday = lazy(() => import('@/components/birthday/MainBirthday'));
   ```

2. **Memoize Expensive Computations**
   ```typescript
   const validConfig = useMemo(() => 
     ConfigValidator.sanitize(config), [config]
   );
   ```

3. **Optimize Images**
   - Keep < 500KB per image
   - Use JPEG for photos, PNG for graphics
   - Lazy load photos outside viewport

4. **Disable Particles on Mobile**
   ```typescript
   experience: {
     particleEffects: !isMobile,
     particleCount: isMobile ? 0 : 200,
   }
   ```

---

**Made with ❤️ by Naboraj Sarkar**  
*In the garden of the internet, may your digital memories always bloom.* 🌸
