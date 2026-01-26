import React, { useState, useEffect, useRef } from "react";

interface TerminalCommand {
  command: string;
  output: string;
}

export function InteractiveTerminal() {
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<TerminalCommand[]>([]);
  const [currentPath] = useState("root@prince:~");
  const outputRef = useRef<HTMLDivElement>(null);

  const commands: Record<string, string> = {
    help: "Available commands: help, whoami, skills, projects, education, contact, clear, ls, pwd",
    whoami: "Prince Ofori | Cybersecurity Professional & Backend Engineer",
    skills: "Penetration Testing, Secure Backend Development, Network Security, Python, Django, Linux",
    projects: "Scamornah (Scam Verification), Pentrax (Pentesting Toolkit)",
    education: "BSc Computer Science @ KNUST | ALX Software Engineering (Backend) | ALX Professional Foundations",
    contact: "princeofori1470@gmail.com | LinkedIn: prince-ofori-40a1062aa | GitHub: 0xP4X",
    ls: "skills.md  projects.md  certifications.pdf  contact.txt",
    pwd: "/home/prince",
    clear: "CLEAR_TERMINAL"
  };

  const executeCommand = (cmd: string) => {
    const command = cmd.trim().toLowerCase();

    if (command === "clear") {
      setHistory([]);
      return;
    }

    const output = commands[command] || `Command not found: ${command}. Type 'help' for available commands.`;

    setHistory((prev: TerminalCommand[]) => [...prev, { command: cmd, output }]);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (input.trim()) {
      executeCommand(input);
      setInput("");
    }
  };

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  useEffect(() => {
    // Initial welcome message
    setHistory([
      {
        command: "",
        output: "Welcome to prince Terminal v2.0\nType 'help' for available commands"
      }
    ]);
  }, []);

  return (
    <div className="terminal-window rounded-lg p-6" data-testid="interactive-terminal">
      <div className="text-xs text-text-secondary border-b border-terminal-border pb-2 mb-4">
        Terminal - Interactive Session
      </div>

      {/* Terminal Output */}
      <div
        ref={outputRef}
        className="h-64 overflow-y-auto font-mono text-sm mb-4"
        data-testid="terminal-output"
      >
        {history.map((item: TerminalCommand, index: number) => (
          <div key={index} className="mb-2">
            {item.command && (
              <div className="text-matrix">
                <span className="terminal-prompt"></span>
                {item.command}
              </div>
            )}
            <div className="text-text-secondary whitespace-pre-line" data-testid={`terminal-response-${index}`}>
              {item.output}
            </div>
          </div>
        ))}
      </div>

      {/* Terminal Input */}
      <form onSubmit={handleSubmit} className="flex items-center">
        <span className="terminal-prompt text-matrix mr-2" data-testid="terminal-prompt"></span>
        <input
          type="text"
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
          className="flex-1 bg-transparent border-none outline-none text-matrix font-mono"
          placeholder="Enter command..."
          autoComplete="off"
          data-testid="terminal-input"
        />
      </form>
    </div>
  );
}
