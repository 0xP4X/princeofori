import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children?: ReactNode;
  className?: string;
}

export function TerminalWindow({ title = "root@prince:~", children, className = "" }: TerminalWindowProps) {
  return (
    <div className={`terminal-window rounded-lg ${className}`} data-testid="terminal-window">
      {/* Terminal Content Only - No Header */}
      <div className="p-6">
        {children}
      </div>
    </div>
  );
}
