export const DEVICE_BREAKPOINTS = {
    mobile: 480,
    tablet: 768,
    laptop: 1024,
    desktop: 1280,
    ultrawide: 1920,
};
export type DeviceType = "mobile" | "tablet" | "laptop" | "desktop" | "ultrawide";
export const getDeviceType = (): DeviceType => {
    if (typeof window === "undefined")
        return "desktop";
    const width = window.innerWidth;
    if (width <= DEVICE_BREAKPOINTS.mobile)
        return "mobile";
    if (width <= DEVICE_BREAKPOINTS.tablet)
        return "tablet";
    if (width <= DEVICE_BREAKPOINTS.laptop)
        return "laptop";
    if (width <= DEVICE_BREAKPOINTS.desktop)
        return "desktop";
    return "ultrawide";
};
export const isMobile = (): boolean => {
    if (typeof window === "undefined")
        return false;
    return window.innerWidth <= DEVICE_BREAKPOINTS.mobile;
};
export const isTouchDevice = (): boolean => {
    if (typeof window === "undefined")
        return false;
    return ("ontouchstart" in window ||
        navigator.maxTouchPoints > 0 ||
        (navigator as Navigator & {
            msMaxTouchPoints?: number;
        }).msMaxTouchPoints !== undefined &&
            (navigator as Navigator & {
                msMaxTouchPoints?: number;
            }).msMaxTouchPoints! > 0);
};
export const isLandscape = (): boolean => {
    if (typeof window === "undefined")
        return false;
    return window.innerHeight < window.innerWidth;
};
export const getOptimalAnimationIntensity = (): "low" | "medium" | "high" => {
    const device = getDeviceType();
    if (device === "mobile" || device === "tablet") {
        return "medium";
    }
    return "high";
};
export const getOptimalParticleCount = (): number => {
    const device = getDeviceType();
    switch (device) {
        case "mobile":
            return 10;
        case "tablet":
            return 15;
        case "laptop":
            return 25;
        case "desktop":
            return 40;
        case "ultrawide":
            return 60;
        default:
            return 25;
    }
};
export const getFontSizeMultiplier = (): number => {
    const device = getDeviceType();
    switch (device) {
        case "mobile":
            return 0.85;
        case "tablet":
            return 0.95;
        case "laptop":
            return 1;
        case "desktop":
            return 1.1;
        case "ultrawide":
            return 1.2;
        default:
            return 1;
    }
};
export const generateResponsiveFontSize = (baseSize: number): string => {
    const multiplier = getFontSizeMultiplier();
    return `${baseSize * multiplier}px`;
};
export const prefersReducedMotion = (): boolean => {
    if (typeof window === "undefined")
        return false;
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
};
export const getAnimationDuration = (normalDuration: number): number => {
    return prefersReducedMotion() ? normalDuration * 0.5 : normalDuration;
};
export const getResponsiveSpacing = (baseSpacing: number): number => {
    const device = getDeviceType();
    switch (device) {
        case "mobile":
            return baseSpacing * 0.75;
        case "tablet":
            return baseSpacing * 0.875;
        default:
            return baseSpacing;
    }
};
export const getOptimalContainerWidth = (): string => {
    const device = getDeviceType();
    switch (device) {
        case "mobile":
            return "100%";
        case "tablet":
            return "90%";
        case "laptop":
            return "85%";
        case "desktop":
            return "80%";
        case "ultrawide":
            return "75%";
        default:
            return "85%";
    }
};
export const getResponsiveGridColumns = (): number => {
    const device = getDeviceType();
    switch (device) {
        case "mobile":
            return 1;
        case "tablet":
            return 2;
        case "laptop":
            return 3;
        case "desktop":
            return 4;
        case "ultrawide":
            return 5;
        default:
            return 3;
    }
};
