class AudioSystem {
    private bgmAudio: HTMLAudioElement | null = null;
    private soundEffects: Map<string, HTMLAudioElement> = new Map();
    private bgmVolume = 0.4;
    private sfxVolume = 0.7;
    private isEnabled = true;
    initBGM(url: string | null | undefined) {
        if (!url || !this.isEnabled)
            return;
        try {
            this.bgmAudio = new Audio();
            this.bgmAudio.src = url;
            this.bgmAudio.loop = true;
            this.bgmAudio.volume = this.bgmVolume;
            this.bgmAudio.preload = "auto";
            this.bgmAudio.crossOrigin = "anonymous";
        }
        catch (error) {
            console.error("Failed to initialize BGM:", error);
        }
    }
    initSoundEffect(name: string, url: string) {
        try {
            const audio = new Audio();
            audio.src = url;
            audio.volume = this.sfxVolume;
            audio.preload = "auto";
            audio.crossOrigin = "anonymous";
            this.soundEffects.set(name, audio);
        }
        catch (error) {
            console.error(`Failed to initialize SFX '${name}':`, error);
        }
    }
    playBGM() {
        if (this.bgmAudio && this.isEnabled) {
            this.bgmAudio.play().catch((error) => {
                console.warn("BGM playback failed:", error);
            });
        }
    }
    stopBGM() {
        if (this.bgmAudio) {
            this.bgmAudio.pause();
            this.bgmAudio.currentTime = 0;
        }
    }
    playEffect(name: string) {
        const audio = this.soundEffects.get(name);
        if (audio && this.isEnabled) {
            audio.currentTime = 0;
            audio.play().catch((error) => {
                console.warn(`SFX '${name}' playback failed:`, error);
            });
        }
    }
    playSequence(names: string[], delay: number = 200) {
        names.forEach((name, index) => {
            setTimeout(() => this.playEffect(name), delay * index);
        });
    }
    setBGMVolume(vol: number) {
        this.bgmVolume = Math.max(0, Math.min(1, vol));
        if (this.bgmAudio) {
            this.bgmAudio.volume = this.bgmVolume;
        }
    }
    setSFXVolume(vol: number) {
        this.sfxVolume = Math.max(0, Math.min(1, vol));
        this.soundEffects.forEach((audio) => {
            audio.volume = this.sfxVolume;
        });
    }
    setEnabled(enabled: boolean) {
        this.isEnabled = enabled;
        if (!enabled) {
            this.stopBGM();
        }
    }
    dispose() {
        this.stopBGM();
        if (this.bgmAudio) {
            this.bgmAudio.src = "";
            this.bgmAudio = null;
        }
        this.soundEffects.forEach((audio) => {
            audio.src = "";
        });
        this.soundEffects.clear();
    }
}
export const audioSystem = new AudioSystem();
export const AUDIO_PRESETS = {
    romantic: {
        bgm: "https://assets.mixkit.co/active_storage/music/2869/2869-preview.mp3",
        effects: {
            pop: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
            boom: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
        },
    },
    fun: {
        bgm: "https://assets.mixkit.co/active_storage/music/2869/2869-preview.mp3",
        effects: {
            pop: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
            boom: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
        },
    },
    energetic: {
        bgm: "https://assets.mixkit.co/active_storage/music/2869/2869-preview.mp3",
        effects: {
            pop: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
            boom: "https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3",
        },
    },
};
export const FUTURE_AUDIO_FEATURES = {
    BIRTHDAY_SONG: {
        enabled: false,
        url: import.meta.env.VITE_SONG_URL || "",
        startTime: 3,
        fadeOutDuration: 2,
    },
    VOICE_MESSAGE: {
        enabled: false,
        url: import.meta.env.VITE_VOICE_MESSAGE_URL || "",
        autoPlay: true,
        triggerAt: "after-intro",
    },
    PLAYLIST: {
        enabled: false,
        songs: [] as string[],
        shuffle: false,
        repeat: true,
    },
    BEAT_SYNC: {
        enabled: false,
        sensitivity: 0.7,
        animationTypes: ["pulse", "bounce", "rotate"],
    },
};
