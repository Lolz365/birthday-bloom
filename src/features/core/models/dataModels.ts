import type { FamilyMemberProfile, FamilyMemberType, PrivacyLevel, RelationshipDirection, } from './familyTemplates';
export const RELATIONSHIP_TYPES = {
    PARTNER: 'partner',
    FRIEND: 'friend',
    FAMILY: 'family',
    SIBLING: 'sibling',
    BROTHER: 'brother',
    SISTER: 'sister',
    FATHER: 'father',
    MOTHER: 'mother',
    GRANDFATHER: 'grandfather',
    GRANDMOTHER: 'grandmother',
    UNCLE: 'uncle',
    AUNT: 'aunt',
    COUSIN: 'cousin',
    SON: 'son',
    DAUGHTER: 'daughter',
    GUARDIAN: 'guardian',
    COLLEAGUE: 'colleague',
    MENTOR: 'mentor',
    CUSTOM: 'custom',
} as const;
export const GENDER_TYPES = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
} as const;
export const ANIMATION_SPEEDS = {
    SLOW: 'slow',
    MODERATE: 'moderate',
    FAST: 'fast',
} as const;
export const THEME_TYPES = {
    ROMANTIC: 'romantic',
    FUN: 'fun',
    ENERGETIC: 'energetic',
    ELEGANT: 'elegant',
    PLAYFUL: 'playful',
    NOSTALGIC: 'nostalgic',
} as const;
export const AGE_GROUPS = {
    TEEN: 'teen',
    YOUNG_ADULT: 'young-adult',
    ADULT: 'adult',
    SENIOR: 'senior',
} as const;
export class DataValidator {
    static isValidEmail(email: string): boolean {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    static isValidHexColor(color: string): boolean {
        const hexRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
        return hexRegex.test(color);
    }
    static isValidPhoneNumber(phone: string): boolean {
        const phoneRegex = /^\+?[\d\s\-().]{10,}$/;
        return phoneRegex.test(phone.replace(/\s/g, ''));
    }
    static isValidURL(url: string): boolean {
        try {
            new URL(url);
            return true;
        }
        catch {
            return false;
        }
    }
    static isValidDate(date: Date | string): boolean {
        const dateObj = typeof date === 'string' ? new Date(date) : date;
        return dateObj instanceof Date && !isNaN(dateObj.getTime());
    }
    static isValidAge(age: number): boolean {
        return Number.isInteger(age) && age >= 0 && age <= 150;
    }
    static isValidClosenessLevel(level: number): boolean {
        return Number.isInteger(level) && level >= 1 && level <= 10;
    }
    static isValidName(name: string): boolean {
        return name.trim().length > 0 && name.trim().length <= 100;
    }
    static isNonEmptyString(str: string | undefined): boolean {
        return typeof str === 'string' && str.trim().length > 0;
    }
}
export type RelationshipType = (typeof RELATIONSHIP_TYPES)[keyof typeof RELATIONSHIP_TYPES];
export type GenderType = (typeof GENDER_TYPES)[keyof typeof GENDER_TYPES];
export type AnimationSpeed = (typeof ANIMATION_SPEEDS)[keyof typeof ANIMATION_SPEEDS];
export type ThemeType = (typeof THEME_TYPES)[keyof typeof THEME_TYPES];
export type AgeGroup = (typeof AGE_GROUPS)[keyof typeof AGE_GROUPS];
export interface EnhancedBirthdayConfig {
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
        additionalMessages?: {
            title?: string;
            content?: string;
        }[];
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
export interface FamilyMember {
    id: string;
    type: FamilyMemberType;
    name: string;
    dateOfBirth?: Date;
    profile: FamilyMemberProfile;
    relationshipPath?: string[];
    privacy?: PrivacyLevel;
    createdAt: Date;
    updatedAt: Date;
}
export interface FamilyCollection {
    familyName: string;
    version: string;
    members: FamilyMember[];
    relationships?: Array<{
        from: string;
        to: string;
        type: RelationshipDirection | string;
        label?: string;
        closenessLevel?: number;
    }>;
    sharedMemories?: Array<{
        id: string;
        title: string;
        description: string;
        date?: Date;
        participants: string[];
        mediaIds?: string[];
        privacy?: PrivacyLevel;
    }>;
}
export class ConfigValidator {
    static validate(config: Partial<EnhancedBirthdayConfig>): {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    } {
        const errors: string[] = [];
        const warnings: string[] = [];
        if (!config.core) {
            errors.push('core information is required');
        }
        else {
            if (!config.core.name || !DataValidator.isValidName(config.core.name)) {
                errors.push('name must be between 1-100 characters');
            }
            if (!config.core.dateOfBirth || !DataValidator.isValidDate(config.core.dateOfBirth)) {
                errors.push('dateOfBirth must be a valid date');
            }
            if (!Object.values(GENDER_TYPES).includes(config.core.gender)) {
                errors.push(`gender must be one of: ${Object.values(GENDER_TYPES).join(', ')}`);
            }
            if (!Object.values(RELATIONSHIP_TYPES).includes(config.core.relationship)) {
                errors.push(`relationship must be one of: ${Object.values(RELATIONSHIP_TYPES).join(', ')}`);
            }
        }
        if (config.personalization) {
            if (config.personalization.favoriteColor && !DataValidator.isValidHexColor(config.personalization.favoriteColor)) {
                errors.push('favoriteColor must be a valid hex color code');
            }
            if (!Object.values(THEME_TYPES).includes(config.personalization.theme)) {
                errors.push(`theme must be one of: ${Object.values(THEME_TYPES).join(', ')}`);
            }
        }
        else {
            warnings.push('personalization section not provided; defaults will be used');
        }
        if (config.media) {
            if (config.media.audio?.backgroundMusic && !DataValidator.isValidURL(config.media.audio.backgroundMusic)) {
                warnings.push('backgroundMusic URL may not be valid');
            }
            if (config.media.videos?.intro && !DataValidator.isValidURL(config.media.videos.intro)) {
                warnings.push('intro video URL may not be valid');
            }
        }
        if (config.messaging) {
            if (config.messaging.senderName && !DataValidator.isValidName(config.messaging.senderName)) {
                warnings.push('senderName should be a valid name');
            }
        }
        return {
            isValid: errors.length === 0,
            errors,
            warnings,
        };
    }
    static sanitize(config: Partial<EnhancedBirthdayConfig>): EnhancedBirthdayConfig {
        const sanitized = JSON.parse(JSON.stringify(config));
        if (sanitized.core) {
            sanitized.core.name = String(sanitized.core.name || 'Guest').slice(0, 100);
            sanitized.core.gender = Object.values(GENDER_TYPES).includes(sanitized.core.gender) ? sanitized.core.gender : GENDER_TYPES.OTHER;
            sanitized.core.relationship = Object.values(RELATIONSHIP_TYPES).includes(sanitized.core.relationship) ? sanitized.core.relationship : RELATIONSHIP_TYPES.FRIEND;
        }
        if (sanitized.personalization) {
            sanitized.personalization.theme = Object.values(THEME_TYPES).includes(sanitized.personalization.theme) ? sanitized.personalization.theme : THEME_TYPES.FUN;
            if (!DataValidator.isValidHexColor(sanitized.personalization.favoriteColor)) {
                sanitized.personalization.favoriteColor = '#FF6B6B';
            }
        }
        if (sanitized.experience) {
            sanitized.experience.particleCount = Math.min(Math.max(sanitized.experience.particleCount || 100, 0), 1000);
        }
        return sanitized as EnhancedBirthdayConfig;
    }
    static mergeWithDefaults(userConfig: Partial<EnhancedBirthdayConfig>): EnhancedBirthdayConfig {
        return {
            core: {
                name: userConfig.core?.name || 'Guest',
                dateOfBirth: userConfig.core?.dateOfBirth || new Date(),
                gender: userConfig.core?.gender || GENDER_TYPES.OTHER,
                relationship: userConfig.core?.relationship || RELATIONSHIP_TYPES.FRIEND,
            },
            personalization: {
                theme: userConfig.personalization?.theme || THEME_TYPES.FUN,
                favoriteColor: userConfig.personalization?.favoriteColor || '#FF6B6B',
                favoriteEmojis: userConfig.personalization?.favoriteEmojis || ['🎉', '✨', '💕'],
                customMessage: userConfig.personalization?.customMessage || 'Happy Birthday!',
                interests: userConfig.personalization?.interests || [],
                hobbies: userConfig.personalization?.hobbies || [],
            },
            media: {
                photos: userConfig.media?.photos || {},
                videos: userConfig.media?.videos || {},
                audio: userConfig.media?.audio || { soundEffects: true },
            },
            experience: {
                animationSpeed: userConfig.experience?.animationSpeed || ANIMATION_SPEEDS.MODERATE,
                animationIntensity: userConfig.experience?.animationIntensity || 'medium',
                particleEffects: userConfig.experience?.particleEffects !== false,
                particleCount: userConfig.experience?.particleCount || 200,
                showSkipButton: userConfig.experience?.showSkipButton !== false,
                duration: userConfig.experience?.duration || 'normal',
            },
            accessibility: {
                reducedMotion: userConfig.accessibility?.reducedMotion || false,
                textSize: userConfig.accessibility?.textSize || 'normal',
                highContrast: userConfig.accessibility?.highContrast || false,
                captions: userConfig.accessibility?.captions || false,
                screenReaderOptimized: userConfig.accessibility?.screenReaderOptimized || false,
            },
            messaging: {
                letterTitle: userConfig.messaging?.letterTitle || 'A Special Message',
                letterContent: userConfig.messaging?.letterContent || '',
                letterSignature: userConfig.messaging?.letterSignature || 'With Love',
                senderName: userConfig.messaging?.senderName || '',
                additionalMessages: userConfig.messaging?.additionalMessages || [],
            },
            sections: {
                showCake: userConfig.sections?.showCake !== false,
                showPhotos: userConfig.sections?.showPhotos !== false,
                showVideos: userConfig.sections?.showVideos !== false,
                showQuiz: userConfig.sections?.showQuiz !== false,
                showHeartTree: userConfig.sections?.showHeartTree !== false,
                showTimeline: userConfig.sections?.showTimeline !== false,
                customSections: userConfig.sections?.customSections || [],
            },
            metadata: {
                createdAt: userConfig.metadata?.createdAt || new Date(),
                updatedAt: new Date(),
                version: userConfig.metadata?.version || '2.5',
                tags: userConfig.metadata?.tags || [],
                isPublic: userConfig.metadata?.isPublic || false,
            },
        };
    }
}
export const DEFAULT_ENHANCED_CONFIG: EnhancedBirthdayConfig = ConfigValidator.mergeWithDefaults({});
