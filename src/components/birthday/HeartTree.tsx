import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBirthdayStore } from "@/features/core/store/useBirthdayStore";
import { useConfetti } from "./Confetti";
import { useSoundManager } from "./SoundManager";
import { SPECIAL_QUOTES } from "@/config/templates";

interface HeartTreeProps {
    delay?: number;
}

const TreeSparks = ({ count, color }: { count: number; color: string }) => {
    const sparks = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                size: 3 + Math.random() * 5,
                left: 10 + Math.random() * 80,
                bottom: 10 + Math.random() * 80,
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 5,
            })),
        [count]
    );
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {sparks.map((s) => (
                <motion.div
                    key={s.id}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -100, opacity: [0, 0.7, 0] }}
                    transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
                    className="absolute rounded-full"
                    style={{
                        width: s.size,
                        height: s.size,
                        left: `${s.left}%`,
                        bottom: `${s.bottom}%`,
                        background: color,
                        boxShadow: `0 0 15px ${color}`,
                    }}
                />
            ))}
        </div>
    );
};

/** 12 unique messages — one locked to each heart position.
 *  Falls back gracefully to relationship-based quotes if needed. */
const HEART_MESSAGES = [
    "You are the centrepiece of every memory worth keeping. ✨",
    "In a world full of ordinary moments, you are the extraordinary one. 🌸",
    "Every year you bloom a little brighter — and somehow that still surprises me. 🌟",
    "Even the stars dim a little when you walk in. 🌌",
    "Thank you for being the reason the room always feels warmer. 🧡",
    "Dosti ka naam ho toh tum jaisa — yaar tum jaisa. 🔥",
    "You carry kindness like a superpower, and you don’t even notice. 💕",
    "The quiet ways you show up for people — those are the chapters I remember. 💫",
    "Tumhari muskurahat hi meri khushi ka raaz hai. 🌹",
    "You are proof that the best things in life are never planned. ❤️",
    "Loud in laughter, steady in loyalty — that’s you, always. 🎉",
    "Here’s to another year of you being absolutely, unapologetically you. 💖",
];

export const HeartTree = ({ delay = 1000 }: HeartTreeProps) => {
    const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);
    const { config } = useBirthdayStore();
    const { name, relationship, gender, photos = [] } = config;
    const primaryColor = config.favoriteColor || 'hsl(330, 90%, 75%)';
    const { fireStars } = useConfetti();
    const { playReveal, playPop } = useSoundManager();

    const quotesPool = useMemo(() => {
        if (relationship === 'partner') return SPECIAL_QUOTES.partner[gender as 'male' | 'female'] || SPECIAL_QUOTES.family;
        if (relationship === 'friend') return (gender === 'male' ? SPECIAL_QUOTES.friend.legend : SPECIAL_QUOTES.friend.friendly) || SPECIAL_QUOTES.family;
        return SPECIAL_QUOTES.family;
    }, [relationship, gender]);

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), delay);
        const t2 = setTimeout(() => setStage(2), delay + 1500);
        const t3 = setTimeout(() => setStage(3), delay + 3000);
        const t4 = setTimeout(() => setStage(4), delay + 4500);
        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            clearTimeout(t3);
            clearTimeout(t4);
        };
    }, [delay]);

    const branchesStage1 = [
        { path: "M 150 180 Q 100 130 80 100", strokeWidth: 10 },
        { path: "M 150 160 Q 200 110 220 80", strokeWidth: 10 },
        { path: "M 150 150 Q 150 100 150 50", strokeWidth: 9 },
    ];

    const branchesStage2 = [
        { path: "M 115 145 Q 80 110 60 120", strokeWidth: 6 },
        { path: "M 90 110 Q 60 70 40 80", strokeWidth: 5 },
        { path: "M 185 130 Q 230 110 250 120", strokeWidth: 6 },
        { path: "M 205 95 Q 240 60 260 50", strokeWidth: 5 },
        { path: "M 150 100 Q 120 70 110 40", strokeWidth: 5 },
        { path: "M 150 80 Q 180 50 190 30", strokeWidth: 4 },
    ];

    const heartLeaves = [
        { cx: 150, cy: 50,  scale: 1.2, delay: 0   },
        { cx: 130, cy: 30,  scale: 0.9, delay: 0.2 },
        { cx: 170, cy: 35,  scale: 0.9, delay: 0.1 },
        { cx: 150, cy: 20,  scale: 0.7, delay: 0.3 },
        { cx: 80,  cy: 100, scale: 1.1, delay: 0.2 },
        { cx: 60,  cy: 80,  scale: 0.8, delay: 0.4 },
        { cx: 100, cy: 80,  scale: 0.8, delay: 0.3 },
        { cx: 40,  cy: 110, scale: 0.6, delay: 0.5 },
        { cx: 220, cy: 80,  scale: 1.1, delay: 0.1 },
        { cx: 200, cy: 60,  scale: 0.8, delay: 0.3 },
        { cx: 240, cy: 70,  scale: 0.9, delay: 0.2 },
        { cx: 260, cy: 90,  scale: 0.7, delay: 0.4 },
    ];

    const heartPath = "M0,-8 Q-4,-14 -10,-10 Q-16,-6 -12,2 L0,16 L12,2 Q16,-6 10,-10 Q4,-14 0,-8 Z";

    return (
        <div
            className="relative w-full max-w-[500px] mx-auto mb-20"
            style={{ perspective: "1000px" }}
        >
            {/* Frosted-glass card */}
            <div
                className="relative rounded-2xl"
                style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.12)",
                    boxShadow: "0 2px 4px rgba(0,0,0,0.15), 0 8px 24px rgba(0,0,0,0.25), 0 24px 64px rgba(0,0,0,0.18)",
                    backdropFilter: "blur(12px)",
                    WebkitBackdropFilter: "blur(12px)",
                    padding: "24px 16px 16px",
                }}
            >
                <motion.div
                    animate={{ rotateX: stage === 4 ? 20 : 0 }}
                    className="relative w-full preserve-3d"
                    style={{ aspectRatio: "1 / 1" }}
                >
                    {/* Ambient bloom — z-0, purely visual */}
                    <div
                        className="absolute inset-0 transition-opacity duration-[2000ms] pointer-events-none rounded-full blur-[80px]"
                        style={{
                            background: `radial-gradient(circle at 50% 40%, ${primaryColor}50, transparent 70%)`,
                            opacity: stage >= 2 ? (stage === 4 ? 1 : 0.5) : 0,
                            zIndex: 0,
                        }}
                    />

                    {stage >= 3 && <TreeSparks count={25} color={primaryColor} />}

                    {/* SVG at z-20 — above vignette so hearts receive pointer events */}
                    <svg
                        viewBox="0 0 300 300"
                        className="w-full h-full relative overflow-visible cursor-pointer"
                        style={{
                            zIndex: 20,
                            filter: "drop-shadow(0 4px 16px rgba(0,0,0,0.4))",
                        }}
                        onClick={() => { if (stage >= 3) { fireStars(); playReveal(); } }}
                    >
                        <defs>
                            <linearGradient id="barkGrad" x1="0" y1="0" x2="1" y2="0">
                                <stop offset="0%"   stopColor="hsl(20,20%,20%)" />
                                <stop offset="40%"  stopColor="hsl(20,30%,38%)" />
                                <stop offset="100%" stopColor="hsl(20,15%,22%)" />
                            </linearGradient>
                            <radialGradient id="leafGrad" cx="40%" cy="30%" r="60%">
                                <stop offset="0%"   stopColor="white" stopOpacity="0.25" />
                                <stop offset="100%" stopColor="black" stopOpacity="0.15" />
                            </radialGradient>
                            <filter id="treeGlow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur stdDeviation="3" result="blur" />
                                <feMerge>
                                    <feMergeNode in="blur" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>

                        {/* Trunk */}
                        <motion.path
                            d="M 147 300 Q 140 220 144 170 Q 148 220 145 300 Z"
                            fill="url(#barkGrad)"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: stage >= 1 ? 1 : 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ originY: "bottom" }}
                        />
                        <motion.path
                            d="M 150 300 Q 152 220 151 170 Q 152 220 151 300 Z"
                            fill="hsl(20,35%,50%)"
                            fillOpacity="0.4"
                            initial={{ scaleY: 0 }}
                            animate={{ scaleY: stage >= 1 ? 1 : 0 }}
                            transition={{ duration: 1.5, ease: "easeOut" }}
                            style={{ originY: "bottom" }}
                        />

                        {/* Main branches */}
                        {branchesStage1.map((b, i) => (
                            <motion.path
                                key={`b1-${i}`}
                                d={b.path}
                                fill="none"
                                stroke="hsl(20, 25%, 32%)"
                                strokeWidth={b.strokeWidth}
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                                transition={{ duration: 1.5, delay: 0.5 + i * 0.2 }}
                            />
                        ))}
                        {branchesStage1.map((b, i) => (
                            <motion.path
                                key={`b1shadow-${i}`}
                                d={b.path}
                                fill="none"
                                stroke="hsl(20,15%,20%)"
                                strokeWidth={b.strokeWidth * 0.45}
                                strokeLinecap="round"
                                strokeDasharray="2 8"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                                transition={{ duration: 1.5, delay: 0.6 + i * 0.2 }}
                            />
                        ))}

                        {/* Sub branches */}
                        {branchesStage2.map((b, i) => (
                            <motion.path
                                key={`b2-${i}`}
                                d={b.path}
                                fill="none"
                                stroke="hsl(20, 22%, 38%)"
                                strokeWidth={b.strokeWidth}
                                strokeLinecap="round"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: stage >= 2 ? 1 : 0 }}
                                transition={{ duration: 1.2, delay: 1.5 + i * 0.1 }}
                            />
                        ))}

                        {/* Heart Leaves */}
                        {heartLeaves.map((leaf, i) => {
                            const hasPhoto = photos.length > 0 && i < photos.length;
                            const message = HEART_MESSAGES[i] ?? quotesPool[i % quotesPool.length];
                            return (
                                <g key={`leaf-${i}`} transform={`translate(${leaf.cx}, ${leaf.cy})`}>
                                    <motion.g
                                        initial={{ scale: 0 }}
                                        animate={{ scale: stage >= 3 ? leaf.scale : 0 }}
                                        whileHover={{ scale: leaf.scale * 1.2 }}
                                        transition={{ type: "spring", stiffness: 200, damping: 10, delay: 3 + leaf.delay }}
                                        style={{ cursor: 'pointer' }}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            setActiveMessage(message);
                                            playPop();
                                            fireStars();
                                            setTimeout(() => setActiveMessage(null), 5000);
                                        }}
                                    >
                                        {hasPhoto ? (
                                            <g>
                                                <rect x="-14" y="-14" width="28" height="32" fill="white" rx="2" />
                                                <image href={photos[i % photos.length]} x="-12" y="-12" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
                                                <rect x="-14" y="-14" width="28" height="32" fill="none" stroke={primaryColor} strokeWidth="0.5" opacity="0.2" rx="2" />
                                                <circle cx="0" cy="15" r="1.5" fill={primaryColor} opacity="0.5" />
                                            </g>
                                        ) : (
                                            <g>
                                                <path
                                                    d={heartPath}
                                                    fill={primaryColor}
                                                    filter={stage === 4 ? "url(#treeGlow)" : ""}
                                                    style={{
                                                        animation: stage === 4 ? `pulse-scale 3s ease-in-out infinite alternate` : "none",
                                                    }}
                                                />
                                                <path d={heartPath} fill="url(#leafGrad)" style={{ pointerEvents: "none" }} />
                                            </g>
                                        )}
                                    </motion.g>
                                </g>
                            );
                        })}
                    </svg>

                    {/* Vignette — AFTER the SVG in DOM so it paints on top visually,
                         but pointer-events-none ensures it never blocks clicks */}
                    <div
                        className="absolute inset-0 pointer-events-none rounded-2xl"
                        style={{
                            background: "radial-gradient(ellipse 80% 80% at 50% 50%, transparent 55%, rgba(0,0,0,0.35) 100%)",
                            zIndex: 25,
                            pointerEvents: "none",
                        }}
                    />

                    {/* Message Bubble — z-[100] floats above everything */}
                    <AnimatePresence>
                        {activeMessage && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.5, y: 20 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                className="absolute left-1/2 top-4 -translate-x-1/2 z-[100] w-[260px]"
                            >
                                <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-5 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center">
                                    <p className="text-white font-display text-base leading-relaxed italic">
                                        &ldquo;{activeMessage}&rdquo;
                                    </p>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 rotate-45 border-r border-b border-white/20" />
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>
            </div>
        </div>
    );
};
