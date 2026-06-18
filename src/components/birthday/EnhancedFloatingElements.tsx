import { useMemo } from "react";
import { motion } from "framer-motion";
import { getTemplateEmojiKit } from "@/config/emojiKits";
import { useBirthdayStore } from "@/features/core/store/useBirthdayStore";

interface FloatingElement {
  id: number;
  emoji: string;
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  size: number;
  opacity: number;
}

const slots = [
  { startX: 15, startY: 20, size: 32, opacity: 0.6 },
  { startX: 85, startY: 30, size: 28, opacity: 0.7 },
  { startX: 25, startY: 75, size: 36, opacity: 0.5 },
  { startX: 70, startY: 80, size: 30, opacity: 0.6 },
  { startX: 50, startY: 15, size: 26, opacity: 0.65 },
  { startX: 10, startY: 60, size: 34, opacity: 0.55 },
];

export const EnhancedFloatingElements = () => {
  const config = useBirthdayStore((state) => state.config);
  const emojiKit = useMemo(() => getTemplateEmojiKit(config), [config]);

  const elements: FloatingElement[] = useMemo(() => (
    slots.map((slot, index) => ({
      id: index + 1,
      emoji: emojiKit.accent[index % emojiKit.accent.length],
      delay: index * 0.3,
      duration: 4 + (index % 3) * 0.75,
      ...slot,
    }))
  ), [emojiKit.accent]);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {elements.map((element) => (
        <motion.div
          key={element.id}
          className="absolute"
          style={{
            left: `${element.startX}%`,
            top: `${element.startY}%`,
            fontSize: element.size,
            opacity: element.opacity,
          }}
          animate={{
            y: [-20, -100, -200],
            x: [0, Math.random() * 50 - 25, Math.random() * 50 - 25],
            rotate: [0, 360],
            scale: [1, 1.2, 0.8],
            opacity: [element.opacity, element.opacity * 0.7, 0],
          }}
          transition={{
            duration: element.duration,
            delay: element.delay,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {element.emoji}
        </motion.div>
      ))}
    </div>
  );
};
