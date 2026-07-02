import { useState, useEffect, useMemo, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useBirthdayStore } from "@/features/core/store/useBirthdayStore";
import { useConfetti } from "./Confetti";
import { useSoundManager } from "./SoundManager";
import { SPECIAL_QUOTES } from "@/config/templates";

interface HeartTreeProps {
    delay?: number;
}

// ── Ambient spark particles floating up behind the tree ──────────────────────
const TreeSparks = ({ count, color }: { count: number; color: string }) => {
    const sparks = useMemo(
        () =>
            Array.from({ length: count }, (_, i) => ({
                id: i,
                size: 3 + Math.random() * 5,
                left: 10 + Math.random() * 80,
                bottom: 5 + Math.random() * 60,
                duration: 3 + Math.random() * 4,
                delay: Math.random() * 5,
            })),
        [count]
    );
    return (
        <div
            className="absolute inset-0 pointer-events-none overflow-hidden"
            style={{ zIndex: 0 }}
        >
            {sparks.map((s) => (
                <motion.div
                    key={s.id}
                    initial={{ y: 0, opacity: 0 }}
                    animate={{ y: -120, opacity: [0, 0.8, 0] }}
                    transition={{
                        duration: s.duration,
                        repeat: Infinity,
                        delay: s.delay,
                        ease: "easeOut",
                    }}
                    className="absolute rounded-full"
                    style={{
                        width: s.size,
                        height: s.size,
                        left: `${s.left}%`,
                        bottom: `${s.bottom}%`,
                        background: color,
                        boxShadow: `0 0 12px ${color}`,
                    }}
                />
            ))}
        </div>
    );
};

// ── A single heart that "falls" when clicked ─────────────────────────────────
interface FallingHeartProps {
    startX: number;
    startY: number;
    color: string;
    onDone: () => void;
}
const FallingHeart = ({ startX, startY, color, onDone }: FallingHeartProps) => {
    const driftX = (Math.random() - 0.5) * 80;
    return (
        <motion.div
            initial={{ x: startX, y: startY, opacity: 1, scale: 1.4, rotate: 0 }}
            animate={{
                x: startX + driftX,
                y: startY + 260,
                opacity: 0,
                scale: 0.5,
                rotate: driftX > 0 ? 30 : -30,
            }}
            transition={{ duration: 1.6, ease: "easeIn" }}
            onAnimationComplete={onDone}
            className="absolute pointer-events-none"
            style={{ zIndex: 60 }}
        >
            {/* SVG heart, centred at 0,0 */}
            <svg width="28" height="28" viewBox="-15 -15 30 30" overflow="visible">
                <path
                    d="M0,-3 Q-4,-9 -9,-4 Q-14,1 -4,10 L0,14 L4,10 Q14,1 9,-4 Q4,-9 0,-3 Z"
                    fill={color}
                    style={{ filter: `drop-shadow(0 0 6px ${color})` }}
                />
            </svg>
        </motion.div>
    );
};

// ── Main Component ────────────────────────────────────────────────────────────
export const HeartTree = ({ delay = 1000 }: HeartTreeProps) => {
    const [stage, setStage] = useState<0 | 1 | 2 | 3 | 4>(0);
    const [activeMessage, setActiveMessage] = useState<string | null>(null);
    const [fallingHearts, setFallingHearts] = useState<
        { id: number; x: number; y: number }[]
    >([]);
    const [clickedLeaves, setClickedLeaves] = useState<Set<number>>(new Set());

    const { config } = useBirthdayStore();
    const { name: _name, relationship, gender, photos = [] } = config;
    const primaryColor = config.favoriteColor || "hsl(350, 90%, 62%)";
    const { fireStars } = useConfetti();
    const { playReveal, playPop } = useSoundManager();

    // ── Quote pool from template ────────────────────────────────────────────
    const quotesPool = useMemo(() => {
        if (relationship === "partner")
            return (
                SPECIAL_QUOTES.partner[gender as "male" | "female"] ??
                SPECIAL_QUOTES.family
            );
        if (relationship === "friend")
            return (
                (gender === "male"
                    ? SPECIAL_QUOTES.friend.legend
                    : SPECIAL_QUOTES.friend.friendly) ?? SPECIAL_QUOTES.family
            );
        return SPECIAL_QUOTES.family;
    }, [relationship, gender]);

    // ── Stage progression (tree grows in) ───────────────────────────────────
    useEffect(() => {
        const timers = [
            setTimeout(() => setStage(1), delay),
            setTimeout(() => setStage(2), delay + 1400),
            setTimeout(() => setStage(3), delay + 2800),
            setTimeout(() => setStage(4), delay + 4200),
        ];
        return () => timers.forEach(clearTimeout);
    }, [delay]);

    // ── Tree geometry ────────────────────────────────────────────────────────
    // Trunk: visible, properly sized
    const trunk = "M 148 290 Q 142 230 145 180 Q 150 160 155 180 Q 158 230 152 290 Z";

    // Stage-1 main branches (thicker)
    const mainBranches = [
        "M 150 190 Q 95  140  70  110",
        "M 150 175 Q 205 130 235  95",
        "M 150 168 Q 150 115 150  60",
    ];

    // Stage-2 sub-branches
    const subBranches = [
        "M 105 155 Q 72  120  55  128",
        "M  85 123 Q 56   82  38   90",
        "M 190 143 Q 228 122 248 132",
        "M 212 110 Q 248  74 268  64",
        "M 150 110 Q 122  76 112   48",
        "M 150  88 Q 178  56 188   38",
    ];

    // Heart positions — placed at branch-tip ends that match the SVG paths above
    const heartLeaves = useMemo(
        () => [
            // top-centre cluster
            { cx: 150, cy:  52, scale: 1.3, delay: 0.0 },
            { cx: 132, cy:  36, scale: 1.0, delay: 0.15 },
            { cx: 168, cy:  30, scale: 1.0, delay: 0.10 },
            { cx: 150, cy:  18, scale: 0.75, delay: 0.30 },
            // left cluster
            { cx:  62, cy: 108, scale: 1.15, delay: 0.20 },
            { cx:  40, cy:  88, scale: 0.85, delay: 0.40 },
            { cx:  88, cy:  86, scale: 0.85, delay: 0.25 },
            { cx:  52, cy: 128, scale: 0.65, delay: 0.50 },
            // right cluster
            { cx: 238, cy:  92, scale: 1.15, delay: 0.10 },
            { cx: 216, cy:  72, scale: 0.85, delay: 0.30 },
            { cx: 260, cy:  62, scale: 0.90, delay: 0.20 },
            { cx: 250, cy: 132, scale: 0.70, delay: 0.45 },
        ],
        []
    );

    // Classic heart path centred at origin — correct closed shape
    const heartPath =
        "M0,-3 Q-4,-9 -9,-4 Q-14,1 -4,10 L0,14 L4,10 Q14,1 9,-4 Q4,-9 0,-3 Z";

    // ── Click handler: show falling heart + message, mark leaf as picked ────
    const handleLeafClick = useCallback(
        (
            e: React.MouseEvent<SVGGElement>,
            index: number,
            cx: number,
            cy: number
        ) => {
            e.stopPropagation();
            if (stage < 3) return;

            // Convert SVG coords to container-relative pixel coords
            const svg = (e.currentTarget.closest("svg") as SVGSVGElement | null);
            if (!svg) return;
            const rect = svg.getBoundingClientRect();
            const vb = svg.viewBox.baseVal;
            const scaleX = rect.width / vb.width;
            const scaleY = rect.height / vb.height;
            const pixelX = cx * scaleX;
            const pixelY = cy * scaleY;

            const id = Date.now();
            setFallingHearts((prev) => [...prev, { id, x: pixelX, y: pixelY }]);

            // Mark this leaf as "picked" (hide it temporarily)
            setClickedLeaves((prev) => new Set(prev).add(index));
            setTimeout(() =>
                setClickedLeaves((prev) => {
                    const next = new Set(prev);
                    next.delete(index);
                    return next;
                }),
            2200);

            const quote = quotesPool[index % quotesPool.length];
            setActiveMessage(quote);
            playPop();
            fireStars();
            setTimeout(() => setActiveMessage(null), 5000);
        },
        [stage, quotesPool, playPop, fireStars]
    );

    const removeFallingHeart = useCallback((id: number) => {
        setFallingHearts((prev) => prev.filter((h) => h.id !== id));
    }, []);

    return (
        <section
            aria-label="Heart Tree"
            className="relative w-full max-w-[480px] mx-auto px-4 mb-24"
        >
            {/* Section heading */}
            <h3
                className="text-center font-display text-2xl md:text-3xl font-black mb-6 tracking-wide"
                style={{ color: primaryColor }}
            >
                A Tree Full of Love 🌳❤️
            </h3>

            {/* Main tree container — square aspect, no overflow:hidden so hearts fall visibly */}
            <div
                className="relative w-full"
                style={{ aspectRatio: "1 / 1", perspective: "900px" }}
            >
                {/* Ambient glow backdrop — only after stage 4 */}
                <motion.div
                    className="absolute inset-0 rounded-full blur-[90px] pointer-events-none"
                    animate={{ opacity: stage >= 4 ? 0.35 : 0 }}
                    transition={{ duration: 1.5 }}
                    style={{
                        background: `radial-gradient(circle at 50% 45%, ${primaryColor}, transparent 65%)`,
                        zIndex: 0,
                    }}
                />

                {/* Spark particles */}
                {stage >= 3 && (
                    <TreeSparks count={20} color={primaryColor} />
                )}

                {/* SVG tree */}
                <svg
                    viewBox="0 0 300 300"
                    className="relative w-full h-full cursor-pointer"
                    style={{ zIndex: 10, overflow: "visible" }}
                    onClick={() => {
                        if (stage >= 4) {
                            fireStars();
                            playReveal();
                        }
                    }}
                >
                    <defs>
                        <filter id="heartGlow" x="-50%" y="-50%" width="200%" height="200%">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feMerge>
                                <feMergeNode in="blur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                        <filter id="trunkShadow" x="-20%" y="-5%" width="140%" height="115%">
                            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.3" />
                        </filter>
                    </defs>

                    {/* ── Trunk ── */}
                    <motion.path
                        d={trunk}
                        fill="hsl(20, 35%, 32%)"
                        filter="url(#trunkShadow)"
                        initial={{ scaleY: 0, originY: "100%" }}
                        animate={{ scaleY: stage >= 1 ? 1 : 0 }}
                        transition={{ duration: 1.4, ease: "easeOut" }}
                        style={{ transformOrigin: "150px 290px" }}
                    />

                    {/* ── Main branches ── */}
                    {mainBranches.map((d, i) => (
                        <motion.path
                            key={`mb-${i}`}
                            d={d}
                            fill="none"
                            stroke="hsl(20, 28%, 36%)"
                            strokeWidth="9"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: stage >= 1 ? 1 : 0 }}
                            transition={{ duration: 1.3, delay: 0.4 + i * 0.18 }}
                        />
                    ))}

                    {/* ── Sub-branches ── */}
                    {subBranches.map((d, i) => (
                        <motion.path
                            key={`sb-${i}`}
                            d={d}
                            fill="none"
                            stroke="hsl(20, 22%, 42%)"
                            strokeWidth="4"
                            strokeLinecap="round"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: stage >= 2 ? 1 : 0 }}
                            transition={{ duration: 1.1, delay: 1.2 + i * 0.09 }}
                        />
                    ))}

                    {/* ── Heart leaves / photo ornaments ── */}
                    {heartLeaves.map((leaf, i) => {
                        const hasPhoto = photos.length > 0 && i < photos.length;
                        const isPicked = clickedLeaves.has(i);

                        return (
                            <motion.g
                                key={`leaf-${i}`}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{
                                    scale: stage >= 3 && !isPicked ? leaf.scale : 0,
                                    opacity: stage >= 3 && !isPicked ? 1 : 0,
                                }}
                                whileHover={{
                                    scale: leaf.scale * 1.25,
                                    filter: `drop-shadow(0 0 8px ${primaryColor})`,
                                }}
                                transition={{
                                    type: "spring",
                                    stiffness: 220,
                                    damping: 12,
                                    delay: stage >= 3 ? 2.6 + leaf.delay : 0,
                                }}
                                style={{
                                    transformOrigin: `${leaf.cx}px ${leaf.cy}px`,
                                    cursor: stage >= 3 ? "pointer" : "default",
                                }}
                                onClick={(e) => handleLeafClick(e, i, leaf.cx, leaf.cy)}
                            >
                                {hasPhoto ? (
                                    /* Photo Polaroid ornament */
                                    <g transform={`translate(${leaf.cx}, ${leaf.cy})`}>
                                        <rect
                                            x="-13" y="-13"
                                            width="26" height="30"
                                            fill="white"
                                            rx="2"
                                            style={{ filter: "drop-shadow(0 6px 14px rgba(0,0,0,0.45))" }}
                                        />
                                        <image
                                            href={photos[i % photos.length]}
                                            x="-11" y="-11"
                                            width="22" height="22"
                                            preserveAspectRatio="xMidYMid slice"
                                        />
                                        <rect
                                            x="-13" y="-13"
                                            width="26" height="30"
                                            fill="none"
                                            stroke={primaryColor}
                                            strokeWidth="0.6"
                                            rx="2"
                                        />
                                        <circle cx="0" cy="14" r="1.5" fill={primaryColor} opacity="0.6" />
                                    </g>
                                ) : (
                                    /* Red heart */
                                    <g transform={`translate(${leaf.cx}, ${leaf.cy})`}>
                                        <path
                                            d={heartPath}
                                            fill={primaryColor}
                                            filter={stage >= 4 ? "url(#heartGlow)" : ""}
                                        />
                                    </g>
                                )}
                            </motion.g>
                        );
                    })}
                </svg>

                {/* ── Falling hearts (DOM layer, positioned in container) ── */}
                {fallingHearts.map((fh) => (
                    <FallingHeart
                        key={fh.id}
                        startX={fh.x - 14}
                        startY={fh.y - 14}
                        color={primaryColor}
                        onDone={() => removeFallingHeart(fh.id)}
                    />
                ))}

                {/* ── Message bubble ── */}
                <AnimatePresence>
                    {activeMessage && (
                        <motion.div
                            key="msg"
                            initial={{ opacity: 0, scale: 0.6, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.7, y: -10 }}
                            className="absolute left-1/2 -translate-x-1/2 z-[80] w-[260px] sm:w-[300px]"
                            style={{ top: "8%" }}
                        >
                            <div
                                className="backdrop-blur-2xl border border-white/25 p-5 rounded-3xl text-center"
                                style={{
                                    background: "rgba(15,15,20,0.82)",
                                    boxShadow: `0 20px 50px -10px ${primaryColor}60`,
                                }}
                            >
                                <p className="text-white/95 text-base sm:text-lg leading-relaxed italic">
                                    &ldquo;{activeMessage}&rdquo;
                                </p>
                                {/* Speech-bubble pointer */}
                                <div
                                    className="absolute -bottom-[9px] left-1/2 -translate-x-1/2 w-4 h-4 rotate-45 border-r border-b border-white/25"
                                    style={{ background: "rgba(15,15,20,0.82)" }}
                                />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Hint label — appears only after tree is fully grown */}
                <AnimatePresence>
                    {stage >= 3 && !activeMessage && (
                        <motion.p
                            key="hint"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.55 }}
                            exit={{ opacity: 0 }}
                            className="absolute bottom-2 left-0 right-0 text-center text-xs text-white/50 pointer-events-none"
                        >
                            Tap a heart ❤️ to reveal a message
                        </motion.p>
                    )}
                </AnimatePresence>
            </div>
        </section>
    );
};
