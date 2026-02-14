import * as React from "react";
import { useState, useEffect } from "react";

import { MatrixBackground } from "@/components/matrix-background";
import { TerminalWindow } from "@/components/terminal-window";
import { Typewriter } from "@/components/typewriter";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { Shield, Code, Lock, Terminal, User, Mail, Eye, Github, Play, X } from "lucide-react";

export default function Home() {
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const [showNavCommands, setShowNavCommands] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('welcome');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [sectionStates, setSectionStates] = useState<{ [key: string]: 'normal' | 'minimized' | 'maximized' | 'closed' }>({});
  const [sectionAnimations, setSectionAnimations] = useState<{ [key: string]: string }>({});

  const switchToSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const handleSectionWindowAction = (section: string, action: 'minimize' | 'maximize' | 'close') => {
    if (section === 'welcome' && action === 'close') return;

    setSectionAnimations(prev => ({ ...prev, [section]: `folding-${action}` }));

    setTimeout(() => {
      if (action === 'close') {
        setSectionStates(prev => ({ ...prev, [section]: 'closed' }));
        setTimeout(() => {
          setActiveSection('welcome');
          setSectionStates(prev => ({ ...prev, [section]: 'normal' }));
        }, 1000);
      } else if (action === 'minimize') {
        const currentState = sectionStates[section] || 'normal';
        setSectionStates(prev => ({ ...prev, [section]: currentState === 'minimized' ? 'normal' : 'minimized' }));
      } else if (action === 'maximize') {
        const currentState = sectionStates[section] || 'normal';
        setSectionStates(prev => ({ ...prev, [section]: currentState === 'maximized' ? 'normal' : 'maximized' }));
      }
      setSectionAnimations(prev => ({ ...prev, [section]: '' }));
    }, 150);
  };

  const restoreSection = (sectionId: 'welcome' | 'skills' | 'projects' | 'contact') => {
    setActiveSection(sectionId);
    setSectionStates(prev => ({ ...prev, [sectionId]: 'normal' }));
    setSectionAnimations(prev => ({ ...prev, [sectionId]: 'folding-maximize' }));
    setTimeout(() => setSectionAnimations(prev => ({ ...prev, [sectionId]: '' })), 150);
  };

  const skills = [
    {
      category: "Programming Languages",
      icon: <Code className="w-4 h-4" />,
      items: [
        { name: "Python", level: 90 },
        { name: "JavaScript", level: 85 },
        { name: "SQL", level: 80 },
        { name: "Java", level: 75 },
      ]
    },
    {
      category: "Frameworks & Tools",
      icon: <Terminal className="w-4 h-4" />,
      items: [
        { name: "Django", level: 85 },
        { name: "Node.js", level: 80 },
        { name: "PostgreSQL", level: 75 },
        { name: "Linux", level: 90 },
      ]
    },
    {
      category: "Cybersecurity Focus",
      icon: <Shield className="w-4 h-4" />,
      items: [
        "Penetration Testing",
        "Secure Backend Development",
        "Network & Web Application Security",
        "Security Research"
      ]
    },
    {
      category: "Education & Certifications",
      icon: <Lock className="w-4 h-4" />,
      items: [
        "BSc Computer Science - KNUST (In Progress)",
        "ALX Software Engineering - Back-End (Sept 2025)",
        "ALX Professional Development (April 2025)"
      ]
    }
  ];

  const projects = [
    {
      title: "Scamornah",
      status: "ACTIVE",
      description: "Scam-awareness and verification platform for identifying fraudulent activities.",
      longDescription: "A platform focused on identifying fraudulent activities, suspicious domains, and social engineering threats, especially within the African digital space. Built with Python and Django.",
      technologies: ["Python", "Django", "Web Security", "Security Research"],
      metric: "Scam Detection Platform",
      details: { focus: "Fraud Detection", region: "Africa", tools: "Security Tools" },
      demo: "https://scamornah.com"
    },
    {
      title: "Pentrax",
      status: "ACTIVE",
      description: "Linux-based penetration testing tool for automation and reconnaissance.",
      longDescription: "A Linux-based penetration testing tool designed to assist security testing, automation, and reconnaissance tasks. Actively evolving with new modules.",
      technologies: ["Linux", "Python", "Cybersecurity", "Pentesting"],
      metric: "Modular Pentest Tool",
      details: { platform: "Linux", category: "Cybersecurity", status: "Active" },
      repository: "https://github.com/0xP4X/pentra-x.git"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-text-primary font-mono overflow-x-hidden">
      <MatrixBackground />

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-md border-b border-terminal-border px-4 py-2 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="w-3 h-3 bg-red-500/50 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-500/50 rounded-full"></div>
          <div className="w-3 h-3 bg-matrix/50 rounded-full animate-pulse"></div>
        </div>
        <div className="text-sm text-matrix font-bold">PRINCE OFORI | PROFESSIONAL PORTFOLIO</div>
        <a
          href="/prince_ofori_cv.pdf"
          download="Prince_Ofori_CV.pdf"
          className="bg-matrix/10 hover:bg-matrix/20 text-matrix text-xs font-bold py-1 px-3 border border-matrix/50 rounded transition-all flex items-center gap-2"
        >
          <User className="w-3 h-3" /> CV
        </a>
      </header>

      {/* Main Container */}
      <div className="pt-16 max-w-6xl mx-auto p-4 h-screen flex flex-col">
        {/* Navigation */}
        <div className="mb-6 border-b border-terminal-border pb-4">
          <div className="flex gap-2">
            {(['welcome', 'skills', 'projects', 'contact'] as const).map((id) => (
              <button
                key={id}
                onClick={() => switchToSection(id)}
                className={`px-4 py-1.5 rounded text-sm transition-all flex items-center gap-2 capitalize ${activeSection === id ? 'bg-matrix text-black shadow-lg shadow-matrix/20' : 'text-text-secondary hover:text-matrix'}`}
              >
                {id === 'welcome' && <Terminal className="w-4 h-4" />}
                {id === 'skills' && <User className="w-4 h-4" />}
                {id === 'projects' && <Code className="w-4 h-4" />}
                {id === 'contact' && <Mail className="w-4 h-4" />}
                {id}
              </button>
            ))}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto custom-scrollbar">
          {activeSection === 'welcome' && (
            <section className="animate-in fade-in slide-in-from-bottom-4 duration-500">
              <TerminalWindow>
                <div className="space-y-6 p-2">
                  <div className="terminal-prompt">
                    <Typewriter text="initializing systems..." speed={60} onComplete={() => setShowSystemInfo(true)} />
                  </div>

                  {showSystemInfo && (
                    <div className="space-y-4">
                      <div className="text-cyber-blue text-sm font-bold">
                        <div>&gt; Identity: Prince Ofori</div>
                        <div>&gt; Role: Cybersecurity Professional & Backend Engineer</div>
                        <div>&gt; Status: Online</div>
                      </div>
                      <Typewriter
                        text="I specialize in secure system development, penetration testing, and building production-ready backend solutions. Explore my expertise and projects below."
                        speed={30}
                        delay={1000}
                        onComplete={() => setShowNavCommands(true)}
                      />

                      {showNavCommands && (
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                          <div onClick={() => switchToSection('skills')} className="border border-terminal-border p-4 rounded hover:border-matrix/50 cursor-pointer transition-all hover:bg-matrix/5">
                            <User className="w-6 h-6 text-matrix mb-2" />
                            <div className="font-bold text-sm">Skills & Expertise</div>
                            <div className="text-xs text-text-secondary">Core competencies and credentials.</div>
                          </div>
                          <div onClick={() => switchToSection('projects')} className="border border-terminal-border p-4 rounded hover:border-matrix/50 cursor-pointer transition-all hover:bg-matrix/5">
                            <Code className="w-6 h-6 text-matrix mb-2" />
                            <div className="font-bold text-sm">Projects</div>
                            <div className="text-xs text-text-secondary">Security-focused software.</div>
                          </div>
                          <div onClick={() => switchToSection('contact')} className="border border-terminal-border p-4 rounded hover:border-matrix/50 cursor-pointer transition-all hover:bg-matrix/5">
                            <Mail className="w-6 h-6 text-matrix mb-2" />
                            <div className="font-bold text-sm">Contact</div>
                            <div className="text-xs text-text-secondary">Let's collaborate.</div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TerminalWindow>
            </section>
          )}

          {activeSection === 'skills' && (
            <section className="animate-in fade-in duration-500">
              <TerminalWindow>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {skills.map((skill, i) => (
                    <div key={i} className="border border-terminal-border p-4 rounded hover:border-matrix/30 transition-all">
                      <div className="flex items-center gap-2 text-matrix font-bold mb-4">
                        {skill.icon}
                        {skill.category}
                      </div>
                      <div className="space-y-3">
                        {skill.items.map((item, j) => (
                          <div key={j}>
                            {typeof item === 'object' ? (
                              <div className="flex justify-between text-sm">
                                <span>{item.name}</span>
                                <span className="text-matrix font-mono">
                                  [{'█'.repeat(Math.floor(item.level / 20))}{'░'.repeat(5 - Math.floor(item.level / 20))}] {item.level}%
                                </span>
                              </div>
                            ) : (
                              <div className="text-sm text-text-secondary">• {item}</div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TerminalWindow>
            </section>
          )}

          {activeSection === 'projects' && (
            <section className="animate-in fade-in duration-500">
              <TerminalWindow>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {projects.map((project, i) => (
                    <div key={i} onClick={() => setSelectedProject(i)} className="border border-terminal-border p-5 rounded hover:border-matrix/50 cursor-pointer transition-all group">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-cyber-blue group-hover:text-matrix transition-colors">{project.title}</h3>
                        <span className="text-xs bg-matrix/10 text-matrix px-2 py-0.5 rounded">{project.status}</span>
                      </div>
                      <p className="text-sm text-text-secondary mb-4 line-clamp-2">{project.description}</p>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.slice(0, 3).map((t, k) => (
                          <span key={k} className="text-[10px] bg-terminal-border px-2 py-0.5 rounded uppercase">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </TerminalWindow>

              {selectedProject !== null && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4" onClick={() => setSelectedProject(null)}>
                  <div className="max-w-4xl w-full" onClick={e => e.stopPropagation()}>
                    <TerminalWindow>
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-matrix">{projects[selectedProject].title}</h2>
                        <button onClick={() => setSelectedProject(null)} className="hover:text-red-500 transition-colors"><X /></button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="md:col-span-2 space-y-6">
                          <div>
                            <h3 className="text-cyber-blue font-bold mb-2 uppercase text-xs tracking-widest">Overview</h3>
                            <p className="text-sm text-text-secondary leading-relaxed">{projects[selectedProject].longDescription}</p>
                          </div>
                          <div>
                            <h3 className="text-cyber-blue font-bold mb-2 uppercase text-xs tracking-widest">Stack</h3>
                            <div className="flex flex-wrap gap-2">
                              {projects[selectedProject].technologies.map((t, k) => (
                                <span key={k} className="text-xs bg-terminal-border px-3 py-1 rounded">{t}</span>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="space-y-6">
                          <div>
                            <h3 className="text-cyber-blue font-bold mb-2 uppercase text-xs tracking-widest">Stats</h3>
                            <div className="space-y-2 text-xs">
                              {Object.entries(projects[selectedProject].details).map(([k, v]) => (
                                <div key={k} className="flex justify-between border-b border-terminal-border pb-1">
                                  <span className="text-text-secondary capitalize">{k}</span>
                                  <span className="text-matrix">{v as string}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                          <div className="flex flex-col gap-2">
                            {projects[selectedProject].demo && (
                              <button onClick={() => window.open(projects[selectedProject].demo as string, '_blank')} className="w-full bg-matrix text-black py-2 rounded text-sm font-bold flex items-center justify-center gap-2 hover:bg-matrix/80">
                                <Play className="w-4 h-4" /> View Demo
                              </button>
                            )}
                            {projects[selectedProject].repository && (
                              <button onClick={() => window.open(projects[selectedProject].repository as string, '_blank')} className="w-full border border-terminal-border py-2 rounded text-sm font-bold flex items-center justify-center gap-2 hover:bg-terminal-border">
                                <Github className="w-4 h-4" /> Repository
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </TerminalWindow>
                  </div>
                </div>
              )}
            </section>
          )}

          {activeSection === 'contact' && (
            <section className="animate-in fade-in duration-500">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <TerminalWindow>
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-matrix mb-4">Channels</h2>
                    <div className="space-y-3">
                      <a href="mailto:Princeofori1470@gmail.com" className="flex items-center gap-3 p-3 border border-terminal-border rounded hover:bg-matrix/5 transition-all">
                        <Mail className="text-matrix" />
                        <div>
                          <div className="text-sm font-bold">Email</div>
                          <div className="text-xs text-text-secondary">Princeofori1470@gmail.com</div>
                        </div>
                      </a>
                      <a href="https://scamornah.com" target="_blank" className="flex items-center gap-3 p-3 border border-terminal-border rounded hover:bg-matrix/5 transition-all">
                        <Shield className="text-matrix" />
                        <div>
                          <div className="text-sm font-bold">Platform</div>
                          <div className="text-xs text-text-secondary">scamornah.com</div>
                        </div>
                      </a>
                      <a href="https://github.com/0xP4X" target="_blank" className="flex items-center gap-3 p-3 border border-terminal-border rounded hover:bg-matrix/5 transition-all">
                        <Github className="text-matrix" />
                        <div>
                          <div className="text-sm font-bold">GitHub</div>
                          <div className="text-xs text-text-secondary">0xP4X</div>
                        </div>
                      </a>
                      <a href="https://www.linkedin.com/in/prince-ofori-40a1062aa/" target="_blank" className="flex items-center gap-3 p-3 border border-terminal-border rounded hover:bg-matrix/5 transition-all">
                        <User className="text-matrix" />
                        <div>
                          <div className="text-sm font-bold">LinkedIn</div>
                          <div className="text-xs text-text-secondary">Official Profile</div>
                        </div>
                      </a>
                      <a href="/prince_ofori_cv.pdf" download="Prince_Ofori_CV.pdf" className="flex items-center gap-3 p-3 border border-terminal-border rounded hover:bg-matrix/5 transition-all">
                        <User className="text-matrix" />
                        <div>
                          <div className="text-sm font-bold">Resume / CV</div>
                          <div className="text-xs text-text-secondary">Download PDF</div>
                        </div>
                      </a>
                    </div>
                  </div>
                </TerminalWindow>
                <div className="h-full min-h-[400px]">
                  <InteractiveTerminal />
                </div>
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
