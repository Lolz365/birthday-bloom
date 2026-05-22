/**
 * 🌸 BIRTHDAY BLOOM - FAMILY MEMBER TEMPLATES
 * -----------------------------------------
 * Authored by: NABORAJ SARKAR
 * Specialized, detailed templates for family relationships
 * 
 * These templates are designed to capture the unique essence of family bonds,
 * with dedicated sections for brothers and sisters that honor their specific roles.
 */

// ============================================================================
// BROTHER TEMPLATE - Comprehensive Sibling Celebration Profile
// ============================================================================

export interface BrotherProfile {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. BASIC IDENTIFICATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  basicInfo: {
    fullName: string;
    nickname?: string;
    relationshipType: 'older-brother' | 'younger-brother' | 'step-brother' | 'cousin-brother';
    ageGroup: 'teen' | 'young-adult' | 'adult' | 'senior';
    dateOfBirth: Date;
    gender: 'male';
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. PERSONAL IDENTITY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  identity: {
    occupation?: string;
    education?: {
      highestDegree?: string;
      field?: string;
      institution?: string;
    };
    hometown?: string;
    currentCity?: string;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. PERSONALITY & CHARACTER
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  personality: {
    traits: string[]; // e.g., ["protective", "humorous", "ambitious"]
    strengths: string[];
    weaknesses?: string[];
    dominantMood: 'cheerful' | 'serious' | 'balanced' | 'sarcastic' | 'gentle';
    introversion: number; // 1-10 scale
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. PASSIONS & INTERESTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  interests: {
    hobbies: string[];
    favoriteActivities: string[];
    sports?: string[];
    music?: string[];
    art?: string[];
    technology?: string[];
    outdoors?: string[];
    customInterests?: Record<string, any>;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. SKILLS & TALENTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  skills: {
    professional?: string[];
    technical?: string[];
    creative?: string[];
    athletic?: string[];
    language?: string[];
    other?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. PHYSICAL APPEARANCE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  appearance: {
    height?: string;
    weight?: string;
    hairColor?: string;
    eyeColor?: string;
    distinctiveFeatures?: string[];
    style?: 'casual' | 'formal' | 'athletic' | 'artistic' | 'minimal' | 'bold';
    favoriteColors?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. CONTACT & SOCIAL
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  contact: {
    phoneNumber?: string;
    email?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    facebook?: string;
    customSocials?: Record<string, string>;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. SIBLING BOND DYNAMICS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  siblingBond: {
    closenessLevel: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 1=distant, 10=inseparable
    yearsOfMemories: number;
    sharedChildhoodMemories: string[];
    favoriteMemoryTogether?: string;
    lastMeaningfulConversation?: {
      date?: Date;
      topic?: string;
      impact?: string;
    };
    sharedActivities: string[];
    communicationFrequency: 'daily' | 'weekly' | 'monthly' | 'yearly' | 'rare';
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. DREAMS & ASPIRATIONS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  dreams: {
    shortTermGoals: string[];
    longTermGoals: string[];
    lifeAmbition?: string;
    dreamVacation?: string;
    bucketListItems?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 10. ACHIEVEMENTS & MILESTONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  achievements: {
    proudMoments: string[];
    awards?: string[];
    certificates?: string[];
    personalBests?: string[];
    recentSuccesses?: string[];
    professionalWins?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 11. MEDIA COLLECTION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  media: {
    profilePhotos?: string[];
    momentTogether?: string[];
    favoritePhoto?: string;
    videos?: string[];
    documents?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 12. SPECIAL OCCASIONS & DATES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  importantDates: {
    birthday: Date;
    anniversaryOfFirstMemory?: Date;
    graduationDate?: Date;
    weddingDate?: Date;
    otherMilestones?: Record<string, Date>;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 13. PERSONAL NOTES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  personalNotes: {
    whatMakesHimSpecial: string;
    messageToHim?: string;
    privateMemories?: string;
    thoughtsAboutHim?: string;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 14. PREFERENCES & FAVORITES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  preferences: {
    favoriteFood: string[];
    favoriteDrink?: string;
    favoriteColor: string;
    favoriteMusic?: string[];
    favoriteMovies?: string[];
    favoriteBooks?: string[];
    favoriteDestinations?: string[];
    leastFavorite?: Record<string, string>;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 15. FUTURE PLANS & GROWTH
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  futurePlans: {
    nextYearPlans?: string[];
    careerTrajectory?: string;
    familyPlans?: string;
    travelPlans?: string;
    personalGrowth?: string[];
    waysHeCanGrow?: string;
  };
}

// ============================================================================
// SISTER TEMPLATE - Comprehensive Sister Celebration Profile
// ============================================================================

export interface SisterProfile {
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 1. CORE IDENTITY
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  coreIdentity: {
    fullName: string;
    preferredName?: string;
    nickname?: string[];
    relationshipType: 'older-sister' | 'younger-sister' | 'step-sister' | 'cousin-sister';
    ageGroup: 'teen' | 'young-adult' | 'adult' | 'senior';
    dateOfBirth: Date;
    gender: 'female';
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 2. PROFESSIONAL LIFE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  professionalLife: {
    currentRole?: string;
    companyOrOrganization?: string;
    industry?: string;
    yearsOfExperience?: number;
    education: {
      degree?: string;
      field?: string;
      university?: string;
      graduationYear?: number;
    };
    careerAspiration?: string;
    currentProjects?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 3. PERSONALITY PROFILE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  personalityProfile: {
    coreTraits: string[]; // e.g., ["creative", "compassionate", "strong"]
    strengths: {
      emotional?: string[];
      intellectual?: string[];
      social?: string[];
      creative?: string[];
    };
    challengesOrGrowthAreas?: string[];
    emotionalIntelligence: number; // 1-10 scale
    leadershipStyle?: 'collaborative' | 'visionary' | 'supportive' | 'pioneering' | 'balanced';
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 4. LIFESTYLE & DAILY ROUTINE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  lifestyle: {
    typicalDayRoutine?: string;
    morningHabits?: string[];
    eveningHabits?: string[];
    workLifeBalance?: 'high-work' | 'balanced' | 'family-focused' | 'flexible';
    exerciseHabits?: string;
    sleepPattern?: string;
    weekendPreference?: string;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 5. PASSIONS & HOBBIES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  passions: {
    primaryHobbies: string[];
    artisticInterests?: string[];
    athleticInterests?: string[];
    craftOrMaking?: string[];
    outdoor?: string[];
    indoor?: string[];
    digitalOrTech?: string[];
    timeSpentOnHobbies?: string;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 6. PREFERENCES & FAVORITES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  preferences: {
    favoriteColors: string[];
    favoriteFood: string[];
    favoriteDrinks?: string[];
    favoriteMusic?: {
      genres?: string[];
      artists?: string[];
    };
    favoriteMoviesOrShows?: string[];
    favoriteBooks?: string[];
    favoriteAuthor?: string;
    favoriteDestinations?: string[];
    favoriteSeasons?: string;
    favoriteEmojis?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 7. RELATIONSHIP DYNAMICS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  relationshipDynamics: {
    bondStrength: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10; // 1=distant, 10=incredibly close
    yearsOfConnection: number;
    communicationStyle: 'frequent-calls' | 'messages' | 'video-chats' | 'in-person' | 'all-of-above';
    communicationFrequency: 'daily' | 'few-times-week' | 'weekly' | 'monthly' | 'occasional';
    sharedInterests: string[];
    commonGoals?: string[];
    howWeSupport?: string;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 8. SPECIAL MEMORIES & MOMENTS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  memories: {
    cherished: string[];
    mostMemorableTime?: string;
    challengeOvercameTogether?: string;
    laughMoments?: string[];
    touchingMoments?: string[];
    childhoodyRecollections?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 9. DREAMS & INSPIRATION
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  dreamsAndInspiration: {
    lifeDreams: string[];
    bucketList?: string[];
    whoBringsHerInspiration?: string;
    thingsThatMotivate?: string[];
    role_models?: string[];
    aspirationalIdentities?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 10. ACHIEVEMENTS & MILESTONES
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  achievements: {
    personalWins: string[];
    profesionalAchievements?: string[];
    overcomingChallenges?: string[];
    communityContributions?: string[];
    familyMilestones?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 11. APPEARANCE & STYLE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  styleAndAppearance: {
    heightAndBuild?: string;
    hairDescription?: string;
    eyeColor?: string;
    distinctiveFeatures?: string[];
    fashionStyle?: string;
    favoriteOutfit?: string;
    accessoryPreferences?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 12. SOCIAL & CONTACT
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  socialAndContact: {
    phoneNumber?: string;
    email?: string;
    instagram?: string;
    twitter?: string;
    linkedin?: string;
    tiktok?: string;
    facebook?: string;
    customSocials?: Record<string, string>;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 13. PERSONAL ARCHIVE
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  personalArchive: {
    photos?: string[];
    videos?: string[];
    documents?: string[];
    artwork?: string[];
    writings?: string;
    favoritePhoto?: string;
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 14. HEART MATTERS
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  heartMatters: {
    whatMakesHerHappy: string[];
    thingsThatBringJoy?: string[];
    values?: string[];
    familyImportance?: string;
    relationshipStatus?: string;
    importantPeople?: string[];
  };

  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  // 15. FUTURE & GROWTH
  // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
  futureAndGrowth: {
    nextYearVision?: string;
    careerPath?: string;
    personalGrowthFocus?: string[];
    skillsDeveloping?: string[];
    travelPlans?: string;
    familyAspiration?: string;
    wisdomToShare?: string;
  };
}

// ============================================================================
// FACTORY FUNCTIONS FOR CREATING PROFILES
// ============================================================================

export const createDefaultBrotherProfile = (name: string, dob: Date): BrotherProfile => ({
  basicInfo: {
    fullName: name,
    relationshipType: 'younger-brother',
    ageGroup: 'young-adult',
    dateOfBirth: dob,
    gender: 'male',
  },
  identity: {},
  personality: {
    traits: [],
    strengths: [],
    introversion: 5,
    dominantMood: 'balanced',
  },
  interests: { hobbies: [], favoriteActivities: [] },
  skills: {},
  appearance: {},
  contact: {},
  siblingBond: {
    closenessLevel: 5,
    yearsOfMemories: 0,
    sharedChildhoodMemories: [],
    sharedActivities: [],
    communicationFrequency: 'monthly',
  },
  dreams: { shortTermGoals: [], longTermGoals: [] },
  achievements: { proudMoments: [] },
  media: {},
  importantDates: { birthday: dob },
  personalNotes: { whatMakesHimSpecial: '' },
  preferences: { favoriteFood: [], favoriteColor: '#000000' },
  futurePlans: {},
});

export const createDefaultSisterProfile = (name: string, dob: Date): SisterProfile => ({
  coreIdentity: {
    fullName: name,
    relationshipType: 'younger-sister',
    ageGroup: 'young-adult',
    dateOfBirth: dob,
    gender: 'female',
  },
  professionalLife: { education: {} },
  personalityProfile: {
    coreTraits: [],
    strengths: {},
    emotionalIntelligence: 5,
  },
  lifestyle: {},
  passions: { primaryHobbies: [] },
  preferences: { favoriteColors: [], favoriteFood: [] },
  relationshipDynamics: {
    bondStrength: 5,
    yearsOfConnection: 0,
    communicationStyle: 'messages',
    communicationFrequency: 'weekly',
    sharedInterests: [],
  },
  memories: { cherished: [] },
  dreamsAndInspiration: { lifeDreams: [] },
  achievements: { personalWins: [] },
  styleAndAppearance: {},
  socialAndContact: {},
  personalArchive: {},
  heartMatters: { whatMakesHerHappy: [], values: [] },
  futureAndGrowth: {},
});
