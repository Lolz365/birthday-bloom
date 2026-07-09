import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBirthdayStore } from "@/features/core/store/useBirthdayStore";
import { useConfetti } from "./Confetti";
import { useSoundManager } from "./SoundManager";
import { SPECIAL_QUOTES } from "@/config/templates";

interface HeartTreeProps { delay?: number; }

const HEART_MESSAGES = [
    "You are the centrepiece of every memory worth keeping. ✨",
    "In a world full of ordinary moments, you are the extraordinary one. 🌸",
    "Every year you bloom a little brighter — and somehow that still surprises me. 🌟",
    "Even the stars dim a little when you walk in. 🌌",
    "Thank you for being the reason the room always feels warmer. 🧡",
    "Dosti ka naam ho toh tum jaisa — yaar tum jaisa. 🔥",
    "You carry kindness like a superpower, and you don't even notice. 💕",
    "The quiet ways you show up for people — those are the chapters I remember. 💫",
    "Tumhari muskurahat hi meri khushi ka raaz hai. 🌹",
    "You are proof that the best things in life are never planned. ❤️",
    "Loud in laughter, steady in loyalty — that's you, always. 🎉",
    "Here's to another year of you being absolutely, unapologetically you. 💖",
];

const TreeSparks = ({ count, color }: { count: number; color: string }) => {
    const sparks = useMemo(() => Array.from({ length: count }, (_, i) => ({
        id: i, size: 3 + Math.random() * 5, left: 10 + Math.random() * 80,
        bottom: 10 + Math.random() * 80, duration: 3 + Math.random() * 4, delay: Math.random() * 5,
    })), [count]);
    return (
        <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
            {sparks.map((s) => (
                <motion.div key={s.id} initial={{ y: 0, opacity: 0 }} animate={{ y: -100, opacity: [0, 0.7, 0] }}
                    transition={{ duration: s.duration, repeat: Infinity, delay: s.delay }}
                    className="absolute rounded-full"
                    style={{ width: s.size, height: s.size, left: `${s.left}%`, bottom: `${s.bottom}%`, background: color, boxShadow: `0 0 15px ${color}` }} />
            ))}
        </div>
    );
};

const heartPath = "M0,-8 C-2,-14 -10,-14 -12,-7 C-15,0 -8,8 0,16 C8,8 15,0 12,-7 C10,-14 2,-14 0,-8 Z";

export const HeartTree = ({ delay = 1000 }: HeartTreeProps) => {
    const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);
    const [scales, setScales] = useState<number[]>(Array(12).fill(0));
    const [hovered, setHovered] = useState<number | null>(null);
    const { config } = useBirthdayStore();
    const { relationship, gender, photos = [] } = config;
    const primaryColor = config.favoriteColor || 'hsl(330, 90%, 75%)';
    const { playPop } = useSoundManager();

    const quotesPool = useMemo(() => {
        if (relationship === 'partner') return SPECIAL_QUOTES.partner[gender as 'male' | 'female'] || SPECIAL_QUOTES.family;
        if (relationship === 'friend') return (gender === 'male' ? SPECIAL_QUOTES.friend.legend : SPECIAL_QUOTES.friend.friendly) || SPECIAL_QUOTES.family;
        return SPECIAL_QUOTES.family;
    }, [relationship, gender]);

    const heartLeaves = useMemo(() => [
        { cx: 150, cy: 52,  s: 1.2, d: 0   },
        { cx: 128, cy: 32,  s: 0.9, d: 0.2 },
        { cx: 172, cy: 36,  s: 0.9, d: 0.1 },
        { cx: 150, cy: 18,  s: 0.7, d: 0.3 },
        { cx: 78,  cy: 98,  s: 1.1, d: 0.2 },
        { cx: 56,  cy: 78,  s: 0.8, d: 0.4 },
        { cx: 102, cy: 78,  s: 0.8, d: 0.3 },
        { cx: 38,  cy: 112, s: 0.6, d: 0.5 },
        { cx: 222, cy: 78,  s: 1.1, d: 0.1 },
        { cx: 202, cy: 58,  s: 0.8, d: 0.3 },
        { cx: 242, cy: 68,  s: 0.9, d: 0.2 },
        { cx: 262, cy: 92,  s: 0.7, d: 0.4 },
    ], []);

    useEffect(() => {
        const t1 = setTimeout(() => setStage(1), delay);
        const t2 = setTimeout(() => setStage(2), delay + 1500);
        const t3 = setTimeout(() => setStage(3), delay + 3000);
        const t4 = setTimeout(() => setStage(4), delay + 4500);
        return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); };
    }, [delay]);

    // Animate hearts in one by one once stage >= 3
    useEffect(() => {
        if (stage < 3) return;
        heartLeaves.forEach((leaf, i) => {
            const start = performance.now();
            const targetScale = leaf.s;
            const duration = 600;
            const delayMs = leaf.d * 1000;
            const timer = setTimeout(() => {
                const animate = (now: number) => {
                    const t = Math.min((now - start - delayMs) / duration, 1);
                    if (t < 0) { requestAnimationFrame(animate); return; }
                    // spring-like easing
                    const eased = 1 - Math.pow(1 - t, 3) + Math.sin(t * Math.PI) * 0.15;
                    setScales(prev => { const n = [...prev]; n[i] = Math.min(eased * targetScale, targetScale * 1.1); return n; });
                    if (t < 1) requestAnimationFrame(animate);
                    else setScales(prev => { const n = [...prev]; n[i] = targetScale; return n; });
                };
                requestAnimationFrame(animate);
            }, 0);
            return () => clearTimeout(timer);
        });
    }, [stage, heartLeaves]);

    const handleHeartClick = useCallback((e: React.MouseEvent, i: number) => {
        e.stopPropagation();
        if (stage < 3) return;
        const message = HEART_MESSAGES[i] ?? quotesPool[i % quotesPool.length];
        setActiveMessage(message);
        playPop();
        setTimeout(() => setActiveMessage(null), 5000);
    }, [stage, quotesPool, playPop]);

    return (
        <div className="relative w-full max-w-[500px] mx-auto mb-20" style={{ perspective: "1000px" }}>
            <div className="relative rounded-2xl overflow-hidden" style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(255,255,255,0.14)",
                boxShadow: "0 4px 6px rgba(0,0,0,0.1), 0 12px 32px rgba(0,0,0,0.3), 0 32px 80px rgba(0,0,0,0.2)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                padding: "24px 16px 16px",
            }}>
                <div className="relative w-full aspect-square">
                    <motion.div animate={{ rotateX: stage === 4 ? 20 : 0 }} className="relative w-full h-full preserve-3d">
                        <div className="absolute inset-0 pointer-events-none rounded-full blur-[100px] transition-opacity duration-[2000ms]"
                            style={{ background: `radial-gradient(circle at 50% 40%, ${primaryColor}40, transparent 70%)`, opacity: stage === 4 ? 1 : 0 }} />

                        {stage >= 3 && <TreeSparks count={25} color={primaryColor} />}

                        <svg viewBox="0 0 300 300" className="w-full h-full relative z-10 overflow-visible"
                            style={{ filter: "drop-shadow(0 8px 24px rgba(0,0,0,0.5))" }}>
                            <defs>
                                <filter id="treeGlow" x="-50%" y="-50%" width="200%" height="200%">
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <filter id="heartGlow" x="-80%" y="-80%" width="260%" height="260%">
                                    <feGaussianBlur stdDeviation="5" result="blur" />
                                    <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
                                </filter>
                                <linearGradient id="bark" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="hsl(22,35%,18%)" />
                                    <stop offset="30%" stopColor="hsl(22,42%,34%)" />
                                    <stop offset="60%" stopColor="hsl(22,38%,28%)" />
                                    <stop offset="100%" stopColor="hsl(22,30%,20%)" />
                                </linearGradient>
                                <linearGradient id="barkLight" x1="0%" y1="0%" x2="100%" y2="0%">
                                    <stop offset="0%" stopColor="hsl(30,55%,58%)" stopOpacity="0" />
                                    <stop offset="40%" stopColor="hsl(30,55%,58%)" stopOpacity="0.4" />
                                    <stop offset="100%" stopColor="hsl(30,55%,58%)" stopOpacity="0" />
                                </linearGradient>
                                <radialGradient id="heartFill" cx="35%" cy="28%" r="65%">
                                    <stop offset="0%" stopColor="hsl(350,95%,82%)" />
                                    <stop offset="60%" stopColor="hsl(345,88%,68%)" />
                                    <stop offset="100%" stopColor="hsl(340,80%,55%)" />
                                </radialGradient>
                                <radialGradient id="heartShine" cx="30%" cy="25%" r="50%">
                                    <stop offset="0%" stopColor="white" stopOpacity="0.55" />
                                    <stop offset="100%" stopColor="white" stopOpacity="0" />
                                </radialGradient>
                            </defs>

                            {/* Trunk — tapered bezier fill */}
                            <motion.g
                                initial={{ scaleY: 0 }} animate={{ scaleY: stage >= 1 ? 1 : 0 }}
                                transition={{ duration: 1.5, ease: "easeOut" }}
                                transformTemplate={({ scaleY }) => `translate(0,300) scaleY(${scaleY}) translate(0,-300)`}>
                                <path d="M 136 300 C 134 260 138 220 142 180 C 144 160 146 150 150 145 C 154 150 156 160 158 180 C 162 220 166 260 164 300 Z"
                                    fill="url(#bark)" />
                                <path d="M 148 300 C 147 260 148 220 149 180 C 149.5 160 150 150 150 145 C 150 150 150.5 160 151 180 C 152 220 153 260 152 300 Z"
                                    fill="url(#barkLight)" />
                            </motion.g>

                            {/* Main branches */}
                            {[
                                { d: "M 150 175 C 130 155 105 135 80 102",  w: 14, dl: 0.3 },
                                { d: "M 150 162 C 170 145 195 118 222 80",  w: 14, dl: 0.5 },
                                { d: "M 150 148 C 150 128 150 108 150 52",  w: 12, dl: 0.7 },
                            ].map((b, i) => (
                                <g key={`mb-${i}`}>
                                    <motion.path d={b.d} fill="none" stroke="url(#bark)" strokeWidth={b.w} strokeLinecap="round"
                                        initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                                        transition={{ duration: 1.4, delay: b.dl }} />
                                    <motion.path d={b.d} fill="none" stroke="url(#barkLight)" strokeWidth={b.w * 0.35} strokeLinecap="round"
                                        initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                                        transition={{ duration: 1.4, delay: b.dl + 0.05 }} />
                                </g>
                            ))}

                            {/* Sub branches */}
                            {[
                                { d: "M 112 142 C 92 122 70 116 56 120",   w: 7,  dl: 1.4 },
                                { d: "M 92  112 C 72  88  52  78  38  80",  w: 6,  dl: 1.5 },
                                { d: "M 188 128 C 210 112 230 112 248 118", w: 7,  dl: 1.4 },
                                { d: "M 208  94 C 228  72  246  58 262  52", w: 6, dl: 1.5 },
                                { d: "M 150 100 C 136  78  118  58 108  40", w: 6, dl: 1.6 },
                                { d: "M 150  80 C 162  60  174  44 190  32", w: 5, dl: 1.7 },
                            ].map((b, i) => (
                                <g key={`sb-${i}`}>
                                    <motion.path d={b.d} fill="none" stroke="url(#bark)" strokeWidth={b.w} strokeLinecap="round"
                                        initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 2 ? 1 : 0 }}
                                        transition={{ duration: 1.1, delay: b.dl }} />
                                    <motion.path d={b.d} fill="none" stroke="url(#barkLight)" strokeWidth={b.w * 0.3} strokeLinecap="round"
                                        initial={{ pathLength: 0 }} animate={{ pathLength: stage >= 2 ? 1 : 0 }}
                                        transition={{ duration: 1.1, delay: b.dl + 0.05 }} />
                                </g>
                            ))}

                            {/* Hearts — plain SVG <g> with SVG transform attribute, zero framer involvement */}
                            {heartLeaves.map((leaf, i) => {
                                const hasPhoto = photos.length > 0 && i < photos.length;
                                const sc = hovered === i ? scales[i] * 1.28 : scales[i];
                                return (
                                    <g key={`leaf-${i}`}
                                        transform={`translate(${leaf.cx},${leaf.cy}) scale(${sc})`}
                                        style={{ cursor: stage >= 3 ? "pointer" : "default", transition: "transform 0.15s ease" }}
                                        onMouseEnter={() => setHovered(i)}
                                        onMouseLeave={() => setHovered(null)}
                                        onClick={(e) => handleHeartClick(e, i)}
                                    >
                                        <circle r="20" fill="transparent" />
                                        {hasPhoto ? (
                                            <g>
                                                <rect x="-14" y="-14" width="28" height="32" fill="white" rx="2" />
                                                <image href={photos[i % photos.length]} x="-12" y="-12" width="24" height="24" preserveAspectRatio="xMidYMid slice" />
                                                <circle cx="0" cy="15" r="1.5" fill={primaryColor} opacity="0.5" />
                                            </g>
                                        ) : (
                                            <g>
                                                {hovered === i && <path d={heartPath} fill={primaryColor} filter="url(#heartGlow)" opacity="0.7" transform="scale(1.15)" />}
                                                <path d={heartPath} fill="url(#heartFill)" filter={stage === 4 ? "url(#treeGlow)" : ""} />
                                                <path d={heartPath} fill="url(#heartShine)" style={{ pointerEvents: "none" }} />
                                            </g>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        <AnimatePresence>
                            {activeMessage && (
                                <motion.div initial={{ opacity: 0, scale: 0.5, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.5, y: -20 }}
                                    className="absolute left-1/2 bottom-3/4 -translate-x-1/2 z-[100] w-[280px] pointer-events-none">
                                    <div className="bg-white/10 backdrop-blur-2xl border border-white/20 p-6 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] text-center">
                                        <p className="text-white font-display text-lg leading-relaxed italic">"{activeMessage}"</p>
                                        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-4 h-4 bg-white/10 rotate-45 border-r border-b border-white/20" />
                                    </div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>

                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-[hsl(var(--background))] via-transparent to-transparent z-20" />
                </div>
            </div>
        </div>
    );
};
