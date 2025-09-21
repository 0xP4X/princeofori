import { useState, useEffect } from "react";

interface UseTypewriterOptions {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
}

export function useTypewriter({
  text,
  speed = 50,
  delay = 0,
  onComplete,
}: UseTypewriterOptions) {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!text) return;

    const startTyping = () => {
      setIsTyping(true);
      setIsComplete(false);
      let i = 0;
      
      const typeInterval = setInterval(() => {
        if (i < text.length) {
          setDisplayedText(text.slice(0, i + 1));
          i++;
        } else {
          setIsTyping(false);
          setIsComplete(true);
          clearInterval(typeInterval);
          if (onComplete) onComplete();
        }
      }, speed);

      return () => clearInterval(typeInterval);
    };

    if (delay > 0) {
      const delayTimeout = setTimeout(startTyping, delay);
      return () => clearTimeout(delayTimeout);
    } else {
      return startTyping();
    }
  }, [text, speed, delay, onComplete]);

  return { displayedText, isTyping, isComplete };
}
