import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
interface Particle {
    id: number;
    x: number;
    y: number;
    color: string;
    emoji: string;
}
const EMOJIS = ['✨', '🎈', '🎉', '🎊', '💖', '🎂'];
const COLORS = ['#FFD700', '#FF69B4', '#7FFFD4', '#FF4500', '#ADFF2F'];
export const CelebrationOverlay = () => {
    const [particles, setParticles] = useState<Particle[]>([]);
    useEffect(() => {
        const interval = setInterval(() => {
            const newParticle = {
                id: Date.now(),
                x: Math.random() * 100,
                y: 100,
                color: COLORS[Math.floor(Math.random() * COLORS.length)],
                emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
            };
            setParticles(prev => [...prev.slice(-15), newParticle]);
        }, 1500);
        return () => clearInterval(interval);
    }, []);
    return (<div className="fixed inset-0 pointer-events-none z-40 overflow-hidden">
            <AnimatePresence>
                {particles.map(p => (<motion.div key={p.id} initial={{ y: "110%", x: p.x + "%", opacity: 0, scale: 0.5 }} animate={{
                y: "-10%",
                x: (p.x + (Math.random() * 20 - 10)) + "%",
                opacity: [0, 1, 1, 0],
                scale: [0.5, 1.2, 1, 0.8],
                rotate: [0, 180, 360]
            }} exit={{ opacity: 0 }} transition={{ duration: 6, ease: "easeOut" }} className="absolute text-2xl drop-shadow-xl" style={{ color: p.color }}>
                        {p.emoji}
                    </motion.div>))}
            </AnimatePresence>
        </div>);
};
