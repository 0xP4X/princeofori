import { useTypewriter } from "@/hooks/use-typewriter";

interface TypewriterProps {
  text: string;
  speed?: number;
  delay?: number;
  onComplete?: () => void;
  className?: string;
}

export function Typewriter({ text, speed = 50, delay = 0, onComplete, className = "" }: TypewriterProps) {
  const { displayedText, isTyping } = useTypewriter({ text, speed, delay, onComplete });

  return (
    <span className={`${className} ${isTyping ? "typing-cursor" : ""}`} data-testid="typewriter-text">
      {displayedText}
    </span>
  );
}
