import { useState, useEffect } from "react";
interface TypeWriterProps {
    text: string;
    speed?: number;
    delay?: number;
    className?: string;
    onComplete?: () => void;
    cursor?: boolean;
}
export const TypeWriter = ({ text, speed = 45, delay = 0, className = "", onComplete, cursor = true, }: TypeWriterProps) => {
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);
    const [done, setDone] = useState(false);
    useEffect(() => {
        const delayTimer = setTimeout(() => setStarted(true), delay);
        return () => clearTimeout(delayTimer);
    }, [delay]);
    useEffect(() => {
        if (!started)
            return;
        if (displayed.length < text.length) {
            const timer = setTimeout(() => {
                setDisplayed(text.slice(0, displayed.length + 1));
            }, speed);
            return () => clearTimeout(timer);
        }
        else {
            setDone(true);
            onComplete?.();
        }
    }, [started, displayed, text, speed, onComplete]);
    if (!started)
        return null;
    return (<span className={className}>
      {displayed}
      {cursor && !done && (<span className="inline-block w-[3px] h-[1em] ml-1 bg-primary animate-blink align-middle"/>)}
    </span>);
};
