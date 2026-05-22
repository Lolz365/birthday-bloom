/**
 * 🌸 BIRTHDAY BLOOM v3.0 - EXAMPLE CONFIGURATION FILE
 * ======================================================================
 * This file demonstrates how to use the enhanced configuration system
 * with all available options for full customization.
 * 
 * Copy and modify this file to match your specific celebration.
 */

import { EnhancedBirthdayConfig, ConfigValidator } from '@/features/core/models/dataModels';
import { createDefaultBrotherProfile, createDefaultSisterProfile } from '@/features/core/models/familyTemplates';

// ============================================================================
// EXAMPLE 1: MINIMAL CONFIGURATION (Use Defaults)
// ============================================================================

export const minimalConfig: Partial<EnhancedBirthdayConfig> = {
  core: {
    name: 'Naboraj',
    dateOfBirth: new Date('2001-05-22'),
    gender: 'male',
    relationship: 'friend',
  },
  personalization: {
    theme: 'fun',
    favoriteColor: '#FF6B6B',
  },
};

// ============================================================================
// EXAMPLE 2: COMPREHENSIVE CONFIGURATION (All Options)
// ============================================================================

export const comprehensiveConfig: EnhancedBirthdayConfig = {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 1: CORE INFORMATION (Required)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  core: {
    name: 'Naboraj Sarkar',
    dateOfBirth: new Date('2001-05-22'),
    gender: 'male',
    relationship: 'friend',
    customRelationship: undefined, // Only used if relationship === 'custom'
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 2: PERSONALIZATION (Recommended)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  personalization: {
    theme: 'energetic', // romantic | fun | energetic | elegant | playful | nostalgic
    favoriteColor: '#FF6B6B', // Hex code
    favoriteEmojis: ['🎉', '✨', '💫', '🚀', '⭐'],
    customMessage: 'Happy Birthday to the legend of our friend group!',
    interests: ['coding', 'gaming', 'music', 'travel'],
    hobbies: ['programming', 'video production', 'digital art', 'gaming'],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 3: MEDIA ASSETS (Optional)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  media: {
    photos: {
      primary: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
      gallery: [
        'https://images.unsplash.com/photo-1530103043960-ef38714abb15',
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3',
        'https://images.unsplash.com/photo-1513151233558-d860c5398176',
      ],
      thumbnails: [
        'https://images.unsplash.com/photo-1530103043960-ef38714abb15?w=300',
        'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?w=300',
      ],
    },
    videos: {
      intro: 'https://example.com/intro.mp4',
      memories: [
        'https://example.com/memory1.mp4',
        'https://example.com/memory2.mp4',
      ],
      outro: 'https://example.com/outro.mp4',
    },
    audio: {
      backgroundMusic: 'https://example.com/bgm.mp3',
      voiceMessage: undefined,
      soundEffects: true,
    },
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 4: EXPERIENCE SETTINGS (Optional)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  experience: {
    animationSpeed: 'moderate', // slow | moderate | fast
    animationIntensity: 'high', // low | medium | high
    particleEffects: true,
    particleCount: 200, // 0-1000
    showSkipButton: true,
    duration: 'normal', // quick | normal | extended
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 5: ACCESSIBILITY (Optional)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  accessibility: {
    reducedMotion: false,
    textSize: 'normal', // small | normal | large
    highContrast: false,
    captions: false,
    screenReaderOptimized: false,
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 6: MESSAGING & LETTERS (Optional)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  messaging: {
    letterTitle: 'A Special Message for You',
    letterContent: `My King, My Strength, My Forever Naboraj,

In a world that often moves too fast, you are the stillness where my heart finds peace. Today isn't just about celebrating the day you were born; it's about celebrating every heartbeat you've shared with me.

You aren't just my friend; you are the architect of memories, the guardian of dreams, and the soul that mirrors my own. Your presence is the sun that breaks through my darkest clouds.

Happy Birthday! Here's to another year of being absolutely legendary.`,
    letterSignature: 'With All My Love',
    senderName: 'Your Best Friend',
    additionalMessages: [
      {
        title: 'From Your Mentor',
        content: 'Congratulations on another year of growth and excellence!',
      },
      {
        title: 'A Team Message',
        content: 'The whole team wishes you an amazing birthday, legend!',
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 7: SPECIAL SECTIONS (Optional)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  sections: {
    showCake: true,
    showPhotos: true,
    showVideos: true,
    showQuiz: true,
    showHeartTree: true,
    showTimeline: false,
    customSections: [
      {
        id: 'milestone-achievements',
        title: 'Your Greatest Achievements',
        content: `
          <div style="padding: 20px;">
            <h3>🏆 Milestones in 2024</h3>
            <ul>
              <li>Launched amazing project</li>
              <li>Reached 10K followers</li>
              <li>Completed certification</li>
            </ul>
          </div>
        `,
        order: 1,
      },
      {
        id: 'message-board',
        title: 'Messages from Friends',
        content: `
          <div style="padding: 20px;">
            <p>"You're the best friend anyone could ask for!" - Friend 1</p>
            <p>"Happy birthday to my favorite person!" - Friend 2</p>
            <p>"Here's to many more adventures!" - Friend 3</p>
          </div>
        `,
        order: 2,
      },
    ],
  },

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // SECTION 8: METADATA (Internal)
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  metadata: {
    createdAt: new Date(),
    updatedAt: new Date(),
    version: '3.0',
    tags: ['birthday', 'friend', 'celebration', 'special'],
    isPublic: false,
  },
};

// ============================================================================
// EXAMPLE 3: BROTHER PROFILE CONFIGURATION
// ============================================================================

export const brotherConfig = createDefaultBrotherProfile('Rajesh', new Date('1998-03-15'));

// Customize the brother profile
brotherConfig.basicInfo.nickname = 'Raj';
brotherConfig.basicInfo.relationshipType = 'younger-brother';

brotherConfig.identity.occupation = 'Software Engineer';
brotherConfig.identity.education = {
  highestDegree: 'Bachelor of Technology',
  field: 'Computer Science',
  institution: 'IIT Bombay',
};
brotherConfig.identity.hometown = 'Mumbai, India';
brotherConfig.identity.currentCity = 'Bangalore, India';

brotherConfig.personality.traits = ['protective', 'humorous', 'ambitious', 'loyal'];
brotherConfig.personality.strengths = ['problem-solving', 'leadership', 'creativity'];
brotherConfig.personality.dominantMood = 'cheerful';
brotherConfig.personality.introversion = 4; // 1-10 scale, leaning extroverted

brotherConfig.interests.hobbies = ['coding', 'gaming', 'photography'];
brotherConfig.interests.favoriteActivities = ['hiking', 'video production', 'sports'];
brotherConfig.interests.music = ['hip-hop', 'electronic', 'indie rock'];
brotherConfig.interests.technology = ['AI', 'web development', 'cybersecurity'];

brotherConfig.skills.professional = ['Full-stack development', 'DevOps', 'Cloud architecture'];
brotherConfig.skills.technical = ['JavaScript', 'Python', 'Kubernetes', 'AWS'];
brotherConfig.skills.creative = ['Video editing', 'UI/UX design'];

brotherConfig.appearance.height = '5\'10"';
brotherConfig.appearance.hairColor = 'black';
brotherConfig.appearance.eyeColor = 'brown';
brotherConfig.appearance.style = 'casual';
brotherConfig.appearance.favoriteColors = ['#000000', '#0047AB', '#FF6B6B'];

brotherConfig.contact.phoneNumber = '+91-XXXXXXXXXX';
brotherConfig.contact.email = 'rajesh@example.com';
brotherConfig.contact.instagram = '@rajesh_codes';

brotherConfig.siblingBond.closenessLevel = 9;
brotherConfig.siblingBond.yearsOfMemories = 25;
brotherConfig.siblingBond.sharedChildhoodMemories = [
  'Playing cricket in the park',
  'Late night coding sessions',
  'Road trips to hill stations',
];
brotherConfig.siblingBond.favoriteMemoryTogether = 'Building our first website together';
brotherConfig.siblingBond.sharedActivities = ['gaming', 'coding', 'sports', 'travel'];
brotherConfig.siblingBond.communicationFrequency = 'daily';

brotherConfig.dreams.shortTermGoals = [
  'Complete AWS certification',
  'Launch side project',
  'Learn new tech stack',
];
brotherConfig.dreams.longTermGoals = ['Become CTO', 'Start tech startup', 'Travel world'];
brotherConfig.dreams.lifeAmbition = 'Build products that impact millions';

brotherConfig.achievements.proudMoments = [
  'Led team to launch major feature',
  'Got promoted to senior engineer',
  'Published technical articles',
];

brotherConfig.media.profilePhotos = [
  'https://example.com/brother-photo1.jpg',
  'https://example.com/brother-photo2.jpg',
];
brotherConfig.media.momentTogether = [
  'https://example.com/memory1.jpg',
  'https://example.com/memory2.jpg',
];

brotherConfig.preferences.favoriteFood = ['pizza', 'sushi', 'biryanisystem'];
brotherConfig.preferences.favoriteColor = '#0047AB';
brotherConfig.preferences.favoriteMusic = ['Lo-fi beats', 'EDM', 'indie rock'];
brotherConfig.preferences.favoriteMovies = ['The Matrix', 'Inception', 'Interstellar'];
brotherConfig.preferences.favoriteDestinations = ['Switzerland', 'Japan', 'Iceland'];

brotherConfig.futurePlans.nextYearPlans = [
  'Get AWS solutions architect certification',
  'Build AI-powered product',
  'Travel to 3 countries',
];
brotherConfig.futurePlans.careerTrajectory = 'VP of Engineering in 5 years';
brotherConfig.futurePlans.familyPlans = 'Get married in 2-3 years';

// ============================================================================
// EXAMPLE 4: SISTER PROFILE CONFIGURATION
// ============================================================================

export const sisterConfig = createDefaultSisterProfile('Priya', new Date('2000-07-22'));

// Customize the sister profile
sisterConfig.coreIdentity.preferredName = 'Pri';
sisterConfig.coreIdentity.nickname = ['Pri', 'Priya Singh'];
sisterConfig.coreIdentity.relationshipType = 'younger-sister';

sisterConfig.professionalLife.currentRole = 'Data Scientist';
sisterConfig.professionalLife.companyOrOrganization = 'Tech Company Inc.';
sisterConfig.professionalLife.industry = 'AI & Machine Learning';
sisterConfig.professionalLife.yearsOfExperience = 3;
sisterConfig.professionalLife.education = {
  degree: 'MS Data Science',
  field: 'Machine Learning',
  university: 'Stanford University',
  graduationYear: 2022,
};

sisterConfig.personalityProfile.coreTraits = ['analytical', 'creative', 'compassionate', 'ambitious'];
sisterConfig.personalityProfile.strengths = {
  intellectual: ['data analysis', 'machine learning', 'research'],
  emotional: ['empathy', 'active listening'],
  social: ['networking', 'collaboration'],
  creative: ['visualization', 'storytelling'],
};
sisterConfig.personalityProfile.emotionalIntelligence = 8;
sisterConfig.personalityProfile.leadershipStyle = 'collaborative';

sisterConfig.lifestyle.typicalDayRoutine = 'Morning yoga → Coffee → Work → Hobby → Evening with friends';
sisterConfig.lifestyle.morningHabits = ['yoga', 'meditation', 'journaling'];
sisterConfig.lifestyle.workLifeBalance = 'balanced';
sisterConfig.lifestyle.exerciseHabits = 'Daily yoga, weekly hiking';

sisterConfig.passions.primaryHobbies = ['data visualization', 'writing', 'photography', 'yoga'];
sisterConfig.passions.artisticInterests = ['digital art', 'design'];
sisterConfig.passions.craftOrMaking = ['handmade jewelry', 'pottery'];
sisterConfig.passions.outdoor = ['hiking', 'travel', 'nature photography'];

sisterConfig.preferences.favoriteColors = ['#FF1493', '#FFB6C1', '#4169E1'];
sisterConfig.preferences.favoriteFood = ['pad thai', 'sushi', 'chocolate', 'pizza'];
sisterConfig.preferences.favoriteMusic = {
  genres: ['indie', 'jazz', 'electronic'],
  artists: ['Billie Eilish', 'Amy Winehouse', 'Daft Punk'],
};
sisterConfig.preferences.favoriteBooks = ['Atomic Habits', 'Educated', 'The Midnight Library'];

sisterConfig.relationshipDynamics.bondStrength = 10;
sisterConfig.relationshipDynamics.yearsOfConnection = 24;
sisterConfig.relationshipDynamics.communicationFrequency = 'daily';
sisterConfig.relationshipDynamics.sharedInterests = ['travel', 'good food', 'movies', 'deep conversations'];

sisterConfig.memories.cherished = [
  'Backpacking through Europe',
  'Late night talks about life',
  'Cooking experiments together',
];
sisterConfig.memories.mostMemorableTime = 'Our trip to Bali';

sisterConfig.dreamsAndInspiration.lifeDreams = [
  'Develop AI for social good',
  'Write a book on data science',
  'Travel to 50 countries',
];
sisterConfig.dreamsAndInspiration.bucketList = [
  'Speak at TED conference',
  'Start own AI company',
  'Learn 5 languages',
];

sisterConfig.achievements.personalWins = [
  'Published research paper',
  'Got dream job at tech company',
  'Completed marathon',
];
sisterConfig.achievements.profesionalAchievements = [
  'Led cross-functional AI project',
  'Mentored junior data scientists',
];

sisterConfig.styleAndAppearance.fashionStyle = 'Modern minimalist with bohemian touches';
sisterConfig.styleAndAppearance.favoriteOutfit = 'Black blazer + white tee + denim';
sisterConfig.styleAndAppearance.accessoryPreferences = ['silver jewelry', 'watches', 'glasses'];

sisterConfig.heartMatters.whatMakesHerHappy = [
  'Meaningful conversations',
  'Creative projects',
  'Time with loved ones',
  'Learning new things',
];
sisterConfig.heartMatters.values = ['integrity', 'growth', 'compassion', 'authenticity'];

sisterConfig.futureAndGrowth.nextYearVision = 'Launch AI for social impact project';
sisterConfig.futureAndGrowth.careerPath = 'Become AI research leader and mentor';
sisterConfig.futureAndGrowth.skillsDeveloping = ['public speaking', 'leadership', 'entrepreneurship'];

// ============================================================================
// EXAMPLE 5: VALIDATION EXAMPLES
// ============================================================================

/**
 * Validate and sanitize configurations before use
 */
export function exampleValidation() {
  // Validate comprehensive config
  const validation = ConfigValidator.validate(comprehensiveConfig);

  if (validation.isValid) {
    console.log('✅ Configuration is valid');
  } else {
    console.error('❌ Configuration errors:', validation.errors);
    console.warn('⚠️ Warnings:', validation.warnings);

    // Sanitize to fix issues
    const cleanConfig = ConfigValidator.sanitize(comprehensiveConfig);
    console.log('🔧 Sanitized config:', cleanConfig);
  }

  // Merge with defaults
  const fullConfig = ConfigValidator.mergeWithDefaults(minimalConfig);
  console.log('✨ Full config with defaults:', fullConfig);
}

// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/**
 * To use these examples in your application:
 * 
 * 1. Import the config you want:
 *    import { comprehensiveConfig } from '@/config.example';
 * 
 * 2. Validate it (optional but recommended):
 *    const result = ConfigValidator.validate(comprehensiveConfig);
 * 
 * 3. Use with Zustand store:
 *    const { setConfig } = useBirthdayStore();
 *    setConfig(comprehensiveConfig);
 * 
 * 4. The configuration will be used throughout the app automatically.
 */

export default comprehensiveConfig;
