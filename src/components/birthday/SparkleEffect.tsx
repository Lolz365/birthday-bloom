import React from 'react';
import { motion } from 'framer-motion';
export const SparkleEffect = () => {
    return (<div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {[...Array(40)].map((_, i) => (<motion.div key={i} className="absolute rounded-full opacity-0" initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                scale: 0,
            }} animate={{
                opacity: [0, 0.4, 0.8, 0.4, 0],
                scale: [0, 1.2, 1, 1.2, 0],
                y: ["0%", "-10%", "5%", "-5%", "0%"],
            }} transition={{
                duration: Math.random() * 5 + 5,
                repeat: Infinity,
                delay: Math.random() * 10,
                ease: "linear"
            }} style={{
                width: Math.random() * 4 + 2 + "px",
                height: Math.random() * 4 + 2 + "px",
                backgroundColor: ["#FFD700", "#FF69B4", "#7FFFD4", "#FFFFFF", "#FF4500"][i % 5],
                boxShadow: `0 0 8px 2px ${["#FFD700", "#FF69B4", "#7FFFD4", "#FFFFFF", "#FF4500"][i % 5]}40`,
            }}/>))}
        </div>);
};
