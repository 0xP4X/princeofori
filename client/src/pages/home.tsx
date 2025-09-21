import { useState, useEffect } from "react";
import { MatrixBackground } from "@/components/matrix-background";
import { TerminalWindow } from "@/components/terminal-window";
import { Typewriter } from "@/components/typewriter";
import { InteractiveTerminal } from "@/components/interactive-terminal";
import { Shield, Code, Zap, Target, Lock, Terminal, ChevronRight, ChevronDown, User, Briefcase, Mail, Eye, Github, Play, X, Activity, TrendingUp, AlertTriangle, Cpu } from "lucide-react";

export default function Home() {
  const [showSystemInfo, setShowSystemInfo] = useState(false);
  const [showNavCommands, setShowNavCommands] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('welcome');
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [hackingAnimation, setHackingAnimation] = useState(false);
  const [scannerActive, setScannerActive] = useState(false);
  const [sectionStates, setSectionStates] = useState<{[key: string]: 'normal' | 'minimized' | 'maximized' | 'closed'}>({});
  const [sectionAnimations, setSectionAnimations] = useState<{[key: string]: string}>({});

  const switchToSection = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  const triggerHackEffect = () => {
    setHackingAnimation(true);
    setTimeout(() => setHackingAnimation(false), 3000);
  };

  const startScanner = () => {
    setScannerActive(true);
    setTimeout(() => setScannerActive(false), 5000);
  };

  const handleSectionWindowAction = (section: string, action: 'minimize' | 'maximize' | 'close') => {
    // Welcome section cannot be closed
    if (section === 'welcome' && action === 'close') {
      return;
    }

    setSectionAnimations(prev => ({
      ...prev,
      [section]: `folding-${action}`
    }));
    
    setTimeout(() => {
      if (action === 'close') {
        setSectionStates(prev => ({ ...prev, [section]: 'closed' }));
        // Switch back to welcome after closing
        setTimeout(() => {
          setActiveSection('welcome');
          setSectionStates(prev => ({ ...prev, [section]: 'normal' }));
        }, 1000);
      } else if (action === 'minimize') {
        const currentState = sectionStates[section] || 'normal';
        setSectionStates(prev => ({
          ...prev,
          [section]: currentState === 'minimized' ? 'normal' : 'minimized'
        }));
      } else if (action === 'maximize') {
        const currentState = sectionStates[section] || 'normal';
        setSectionStates(prev => ({
          ...prev,
          [section]: currentState === 'maximized' ? 'normal' : 'maximized'
        }));
      }
      setSectionAnimations(prev => ({ ...prev, [section]: '' }));
    }, 150);
  };

  const restoreSection = (sectionId: 'welcome' | 'skills' | 'projects' | 'contact') => {
    setActiveSection(sectionId);
    setSectionStates(prev => ({ ...prev, [sectionId]: 'normal' }));
    setSectionAnimations(prev => ({ ...prev, [sectionId]: 'folding-maximize' }));
    setTimeout(() => {
      setSectionAnimations(prev => ({ ...prev, [sectionId]: '' }));
    }, 150);
  };

  const skills = [
    {
      category: "Programming Languages",
      icon: <Code className="w-4 h-4" />,
      items: [
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 75 },
        { name: "C++", level: 60 },
      ]
    },
    {
      category: "Web & Backend",
      icon: <Terminal className="w-4 h-4" />,
      items: [
        { name: "HTML/CSS", level: 80 },
        { name: "Node.js + REST APIs", level: 70 },
        { name: "Django (Backend)", level: 70 },
      ]
    },
    {
      category: "Linux & Offensive Security",
      icon: <Target className="w-4 h-4" />,
      items: [
        { name: "Linux (CLI, perms, processes)", level: 65 },
        { name: "Bash & Networking basics", level: 60 },
        { name: "Web vulns (OWASP basics)", level: 45 },
        "Tools: nmap, Burp Suite, Metasploit, Wireshark"
      ]
    },
    {
      category: "Databases & Tools",
      icon: <Shield className="w-4 h-4" />,
      items: [
        "MySQL, basic SQL",
        "Git/GitHub",
        "Telegram Bot API"
      ]
    },
    {
      category: "Certifications / Training",
      icon: <Lock className="w-4 h-4" />,
      items: [
        "✓ Completed Django Backend Engineering course",
        "▶ Python Professional Foundations (Udemy)",
        "• Self-study: Linux & Red Team fundamentals (ongoing)"
      ]
    }
  ];

  const projects = [
    {
      title: "ALX Capstone: POS System",
      status: "ACTIVE",
      statusColor: "text-yellow-400",
      description: "A simple Point of Sale (POS) system built with Django.",
      longDescription: "Supports role-based access with Vendor and Manager roles. Features include user authentication, product management, sales and sales items, and permissioned reporting.",
      technologies: ["Django", "DRF", "SQLite", "RBAC"],
      metric: "Sales + Auth + RBAC",
      details: {
        roles: "Vendor (create sales), Manager (manage users/products, view reports)",
        modules: "Auth, Products, Sales, Reports"
      },
      demo: "n/a",
      repository: "https://github.com/0xP4X/pos_capstone"
    },
    {
      title: "pentra-x (Pentesting Toolkit)",
      status: "ACTIVE",
      statusColor: "text-yellow-400",
      description: "Offensive security toolkit covering recon, web testing, wireless, social engineering, password attacks, MITM, encryption, OSINT, and post-exploitation.",
      longDescription: "Mixed Python + Bash modules: network discovery and scanning, web vulnerability assessment, WiFi/Bluetooth testing, phishing tooling, brute force and hash cracking, MITM frameworks, AES-256 file encryption, OSINT, and shell/persistence utilities.",
      technologies: ["Python", "Bash", "Networking", "AES-256"],
      metric: "Multi-module toolkit",
      details: {
        stack: "Mixed (Python + Bash)",
        modules: "Recon, Web, Wireless, Social Engineering, Passwords, MITM, Encryption, OSINT, Post-Exploitation"
      },
      demo: "n/a",
      repository: "https://github.com/0xP4X/pentra-x"
    },
    {
      title: "Static Portfolio (This site)",
      status: "ACTIVE",
      statusColor: "text-yellow-400",
      description: "A React + Vite + Tailwind portfolio with sections for skills, projects, and contact.",
      longDescription: "Client-only setup; no backend. Designed to present skills and simple demos.",
      technologies: ["React", "TypeScript", "Vite", "Tailwind"],
      metric: "Fast, responsive UI",
      details: {
        pages: "Welcome, Skills, Projects, Contact",
        deploy: "Vercel/Netlify (planned)",
        lighthouse: "Good"
      },
      demo: "n/a"
    }
  ];



  return (
    <div className="min-h-screen bg-black text-text-primary font-mono overflow-x-hidden" data-testid="home-page">
      <MatrixBackground />

      {/* Fixed Terminal Header */}
      <header className="fixed top-0 left-0 right-0 z-50 terminal-window border-b border-terminal-border" data-testid="main-header">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500/50 rounded-full cursor-not-allowed" data-testid="header-close"></div>
            <div className="w-3 h-3 bg-yellow-500/50 rounded-full cursor-not-allowed" data-testid="header-minimize"></div>
            <div className={`w-3 h-3 bg-matrix/50 rounded-full cursor-not-allowed ${hackingAnimation ? 'animate-spin' : 'animate-pulse'}`} data-testid="header-maximize"></div>
          </div>
          <div className={`text-sm text-matrix ${hackingAnimation ? 'animate-pulse text-red-500' : ''}`} data-testid="header-title">
            {hackingAnimation ? 'ALERT: INTRUSION DETECTED' : 'DZUKEY PRINCE OFORI'}
          </div>
          <div className="text-xs text-text-secondary flex items-center gap-2" data-testid="header-time">
            <span className={`${scannerActive ? 'text-matrix animate-pulse' : 'text-cyber-blue'}`}>
              {scannerActive ? '◉' : '●'}
            </span>
            <span>{scannerActive ? 'SCANNING' : 'SECURE'}</span>
            <span>|</span>
            <span>{new Date().toLocaleTimeString()} UTC</span>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <div className="pt-16 max-w-6xl mx-auto p-4 h-screen flex flex-col">
        {/* Navigation Bar with Window Controls */}
        <div className="mb-4 border-b border-terminal-border pb-2">
          {/* Window Controls Row */}
          <div className="flex items-center justify-between px-3 py-2 mb-3">
            <div className="flex items-center space-x-3">
              <button
                onClick={() => activeSection !== 'welcome' ? handleSectionWindowAction(activeSection, 'close') : null}
                className={`w-4 h-4 rounded-full transition-all duration-200 hover:scale-125 active:scale-95 ${
                  activeSection === 'welcome' 
                    ? 'bg-red-500/50 cursor-not-allowed' 
                    : 'bg-red-500 hover:bg-red-400 cursor-pointer shadow-lg hover:shadow-red-400/50'
                }`}
                data-testid="section-close"
              ></button>
              <button
                onClick={() => handleSectionWindowAction(activeSection, 'minimize')}
                className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-yellow-400/50"
                data-testid="section-minimize"
              ></button>
              <button
                onClick={() => handleSectionWindowAction(activeSection, 'maximize')}
                className="w-4 h-4 bg-matrix rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-matrix/50 animate-pulse"
                data-testid="section-maximize"
              ></button>
            </div>
            <div className="text-sm text-matrix/80 font-mono" onDoubleClick={() => handleSectionWindowAction(activeSection, 'maximize')}>{activeSection}.exe</div>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-2">
            <button
            onClick={() => switchToSection('welcome')}
            className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-2 ${
              activeSection === 'welcome' ? 'bg-matrix text-black' : 'text-text-secondary hover:text-matrix'
            }`}
            data-testid="nav-welcome"
          >
            <Terminal className="w-4 h-4" />
            Welcome
          </button>
          <button
            onClick={() => switchToSection('skills')}
            className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-2 ${
              activeSection === 'skills' ? 'bg-matrix text-black' : 'text-text-secondary hover:text-matrix'
            }`}
            data-testid="nav-skills"
          >
            <User className="w-4 h-4" />
            Skills
          </button>
          <button
            onClick={() => switchToSection('projects')}
            className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-2 ${
              activeSection === 'projects' ? 'bg-matrix text-black' : 'text-text-secondary hover:text-matrix'
            }`}
            data-testid="nav-projects"
          >
            <Code className="w-4 h-4" />
            Projects
          </button>

          <button
            onClick={() => switchToSection('contact')}
            className={`px-3 py-1 rounded text-sm transition-colors flex items-center gap-2 ${
              activeSection === 'contact' ? 'bg-matrix text-black' : 'text-text-secondary hover:text-matrix'
            }`}
            data-testid="nav-contact"
          >
            <Mail className="w-4 h-4" />
            Contact
          </button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-auto">
          {/* Taskbar for minimized sections */}
          <div className="fixed bottom-2 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-black/50 border border-terminal-border rounded px-2 py-1 backdrop-blur-sm">
            {(['welcome','skills','projects','contact'] as const).map((id) => (
              sectionStates[id] === 'minimized' ? (
                <button
                  key={id}
                  onClick={() => restoreSection(id)}
                  className="px-2 py-1 text-xs bg-terminal-border hover:bg-matrix hover:text-black rounded transition-colors font-mono inline-flex items-center gap-1"
                >
                  {id === 'welcome' && <Terminal className="w-3 h-3" />}
                  {id === 'skills' && <User className="w-3 h-3" />}
                  {id === 'projects' && <Code className="w-3 h-3" />}
                  {id === 'contact' && <Mail className="w-3 h-3" />}
                  {id}.exe
                </button>
              ) : null
            ))}
          </div>
          {/* Welcome Section */}
          {activeSection === 'welcome' && (
            <section 
              data-testid="welcome-section"
              className={`transition-all duration-600 ${
                sectionStates['welcome'] === 'minimized' ? 'transform scale-90 opacity-90' : 
                sectionStates['welcome'] === 'maximized' ? 'fixed top-20 left-4 right-4 bottom-4 z-50 bg-black rounded-lg border border-matrix/30' :
                sectionStates['welcome'] === 'closed' ? 'transform scale-0 opacity-0' : ''
              } ${
                sectionAnimations['welcome'] === 'folding-minimize' ? 'animate-win-minimize' :
                sectionAnimations['welcome'] === 'folding-maximize' ? 'animate-win-maximize' :
                sectionAnimations['welcome'] === 'folding-close' ? 'animate-win-close' : ''
              }`}
            >
              <TerminalWindow className="w-full h-full">
                {/* Show navigation controls when maximized */}
                {sectionStates['welcome'] === 'maximized' && (
                  <div className="mb-4 border-b border-terminal-border pb-2">
                    <div className="flex items-center justify-between px-3 py-2 mb-3">
                      <div className="flex items-center space-x-3">
                        <div className="w-4 h-4 bg-red-500/50 rounded-full cursor-not-allowed"></div>
                        <button
                          onClick={() => handleSectionWindowAction('welcome', 'minimize')}
                          className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-yellow-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('welcome', 'maximize')}
                          className="w-4 h-4 bg-matrix rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-matrix/50 animate-pulse"
                        ></button>
                      </div>
                      <div className="text-sm text-matrix/80 font-mono" onDoubleClick={() => handleSectionWindowAction('welcome', 'maximize')}>welcome.exe</div>
                    </div>
                  </div>
                )}
                <div className="space-y-4">
                  <div className="terminal-prompt">
                    <Typewriter 
                      text="initializing..." 
                      speed={80}
                      delay={1000}
                      onComplete={() => setShowSystemInfo(true)}
                      data-testid="welcome-typewriter"
                    />
                  </div>
                  
                  {showSystemInfo && (
                    <div className="text-cyber-blue text-sm" data-testid="system-info">
                      <div>System: Portfolio v1.0</div>
                      <div>User: Second-year CS Student</div>
                      <div>Status: <span className="text-matrix">ONLINE</span></div>
                    </div>
                  )}

                  {showSystemInfo && (
                    <div className="text-text-secondary text-sm mt-4" data-testid="nav-commands">
                      <Typewriter
                        text="Navigate using the tabs above or click the modules below:"
                        speed={30}
                        delay={2000}
                        onComplete={() => setShowNavCommands(true)}
                      />
                      {showNavCommands && (
                        <div className="ml-4 mt-4 grid grid-cols-2 gap-4">
                          <div 
                            className="hover:text-matrix cursor-pointer transition-all duration-300 flex items-center gap-2 p-3 border border-terminal-border rounded hover:border-matrix/50 hover:shadow-lg hover:shadow-matrix/20 group" 
                            onClick={() => {
                              switchToSection('skills');
                              triggerHackEffect();
                            }}
                            data-testid="nav-skills-card"
                          >
                            <User className="w-5 h-5 group-hover:animate-spin" />
                            <div>
                              <div className="font-bold">Technical Arsenal</div>
                              <div className="text-xs">Penetration testing, programming</div>
                              <div className="text-xs text-matrix">Access: ./skills.exe</div>
                            </div>
                          </div>
                          <div 
                            className="hover:text-matrix cursor-pointer transition-all duration-300 flex items-center gap-2 p-3 border border-terminal-border rounded hover:border-matrix/50 hover:shadow-lg hover:shadow-matrix/20 group" 
                            onClick={() => {
                              switchToSection('projects');
                              triggerHackEffect();
                            }}
                            data-testid="nav-projects-card"
                          >
                            <Code className="w-5 h-5 group-hover:animate-pulse" />
                            <div>
                              <div className="font-bold">Security Projects</div>
                              <div className="text-xs">Django, Node.js, React</div>
                              <div className="text-xs text-cyber-blue">Status: Learning + Active</div>
                            </div>
                          </div>

                          <div 
                            className="hover:text-matrix cursor-pointer transition-all duration-300 flex items-center gap-2 p-3 border border-terminal-border rounded hover:border-matrix/50 hover:shadow-lg hover:shadow-matrix/20 group" 
                            onClick={() => {
                              switchToSection('contact');
                              triggerHackEffect();
                            }}
                            data-testid="nav-contact-card"
                          >
                            <Mail className="w-5 h-5 group-hover:animate-ping" />
                            <div>
                              <div className="font-bold">Secure Communication</div>
                              <div className="text-xs">Encrypted channels only</div>
                              <div className="text-xs text-red-400">PGP Required</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </TerminalWindow>
            </section>
          )}

          {/* Skills Section */}
          {activeSection === 'skills' && (
            <section 
              data-testid="skills-section"
              className={`transition-all duration-600 ${
                sectionStates['skills'] === 'minimized' ? 'transform scale-90 opacity-90' : 
                sectionStates['skills'] === 'maximized' ? 'fixed top-20 left-4 right-4 bottom-4 z-50 bg-black rounded-lg border border-matrix/30' :
                sectionStates['skills'] === 'closed' ? 'transform scale-0 opacity-0' : ''
              } ${
                sectionAnimations['skills'] === 'folding-minimize' ? 'animate-win-minimize' :
                sectionAnimations['skills'] === 'folding-maximize' ? 'animate-win-maximize' :
                sectionAnimations['skills'] === 'folding-close' ? 'animate-win-close' : ''
              }`}
            >
              <TerminalWindow className="w-full h-full">
                {/* Show navigation controls when maximized */}
                {sectionStates['skills'] === 'maximized' && (
                  <div className="mb-4 border-b border-terminal-border pb-2">
                    <div className="flex items-center justify-between px-3 py-2 mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleSectionWindowAction('skills', 'close')}
                          className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-red-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('skills', 'minimize')}
                          className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-yellow-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('skills', 'maximize')}
                          className="w-4 h-4 bg-matrix rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-matrix/50 animate-pulse"
                        ></button>
                      </div>
                      <div className="text-sm text-matrix/80 font-mono" onDoubleClick={() => handleSectionWindowAction('skills', 'maximize')}>skills.exe</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <User className="w-5 h-5 text-matrix" />
                  <h2 className="text-xl text-matrix hover:animate-glitch cursor-default" data-testid="skills-title">
                    Technical Arsenal
                  </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <div 
                      key={index}
                      className="border border-terminal-border rounded p-3 hover:border-matrix/50 transition-all duration-300 hover:shadow-lg hover:shadow-matrix/20 group cursor-pointer"
                      onClick={triggerHackEffect}
                      data-testid={`skill-card-${index}`}
                    >
                      <div className="flex items-center gap-2 text-cyber-blue mb-2 text-sm font-bold group-hover:animate-pulse">
                        {skill.icon}
                        {skill.category}
                        <div className="ml-auto text-xs text-text-secondary">
                          {index === 0 && 'Core Skills'}
                          {index === 1 && 'Web & Backend'}
                          {index === 2 && 'Security'}
                          {index === 3 && 'DB & Tools'}
                          {index === 4 && 'Certifications'}
                        </div>
                      </div>
                      <div className="text-xs space-y-1">
                        {skill.items.map((item, itemIndex) => (
                          <div key={itemIndex}>
                            {typeof item === 'object' ? (
                              <div className="flex justify-between group-hover:text-matrix transition-colors" data-testid={`skill-progress-${index}-${itemIndex}`}>
                                <span>{item.name}</span>
                                <span className="text-matrix text-xs font-mono">
                                  [{'█'.repeat(Math.floor(item.level / 20))}{'░'.repeat(5 - Math.floor(item.level / 20))}] {item.level}%
                                </span>
                              </div>
                            ) : (
                              <div className={`transition-colors ${item.startsWith('✓') ? 'text-matrix group-hover:animate-pulse' : item.startsWith('▶') ? 'text-text-secondary' : 'group-hover:text-cyber-blue'}`}>
                                {item.startsWith('•') ? item : `• ${item}`}
                              </div>
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

          {/* Projects Section */}
          {activeSection === 'projects' && (
            <section 
              data-testid="projects-section"
              className={`transition-all duration-600 ${
                sectionStates['projects'] === 'minimized' ? 'transform scale-90 opacity-90' : 
                sectionStates['projects'] === 'maximized' ? 'fixed top-20 left-4 right-4 bottom-4 z-50 bg-black rounded-lg border border-matrix/30' :
                sectionStates['projects'] === 'closed' ? 'transform scale-0 opacity-0' : ''
              } ${
                sectionAnimations['projects'] === 'folding-minimize' ? 'animate-win-minimize' :
                sectionAnimations['projects'] === 'folding-maximize' ? 'animate-win-maximize' :
                sectionAnimations['projects'] === 'folding-close' ? 'animate-win-close' : ''
              }`}
            >
              <TerminalWindow className="w-full h-full">
                {/* Show navigation controls when maximized */}
                {sectionStates['projects'] === 'maximized' && (
                  <div className="mb-4 border-b border-terminal-border pb-2">
                    <div className="flex items-center justify-between px-3 py-2 mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleSectionWindowAction('projects', 'close')}
                          className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-red-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('projects', 'minimize')}
                          className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-yellow-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('projects', 'maximize')}
                          className="w-4 h-4 bg-matrix rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-matrix/50 animate-pulse"
                        ></button>
                      </div>
                      <div className="text-sm text-matrix/80 font-mono" onDoubleClick={() => handleSectionWindowAction('projects', 'maximize')}>projects.exe</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <Code className="w-5 h-5 text-matrix" />
                  <h2 className="text-xl text-matrix hover:animate-glitch cursor-default" data-testid="projects-title">
                    Security Projects
                  </h2>
                </div>

                <div className="space-y-4">
                  {projects.map((project, index) => (
                    <div 
                      key={index}
                      className={`border border-terminal-border rounded p-4 hover:border-matrix/50 transition-all duration-300 cursor-pointer ${
                        hackingAnimation ? 'animate-pulse border-red-500' : ''
                      }`}
                      onClick={() => setSelectedProject(index)}
                      data-testid={`project-card-${index}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-lg text-cyber-blue flex items-center gap-2" data-testid={`project-title-${index}`}>
                          {project.title}
                          {project.status === 'ACTIVE' && <Activity className="w-4 h-4 text-matrix animate-pulse" />}
                          {project.status === 'MONITORING' && <TrendingUp className="w-4 h-4 text-yellow-400 animate-bounce" />}
                          {project.status === 'CLASSIFIED' && <AlertTriangle className="w-4 h-4 text-red-400 animate-pulse" />}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className={`text-xs ${project.statusColor} font-bold`} data-testid={`project-status-${index}`}>
                            {project.status}
                          </span>
                          <Eye className="w-4 h-4 text-text-secondary hover:text-matrix transition-colors" />
                        </div>
                      </div>
                      
                      <p className="text-text-secondary text-sm mb-3" data-testid={`project-description-${index}`}>
                        {project.description}
                      </p>
                      
                      <div className="flex justify-between items-center">
                        <div className="flex gap-2 flex-wrap">
                          {project.technologies.slice(0, 3).map((tech, techIndex) => (
                            <span 
                              key={techIndex}
                              className="px-2 py-1 bg-terminal-border rounded text-xs hover:bg-matrix hover:text-black transition-colors"
                              data-testid={`project-tech-${index}-${techIndex}`}
                            >
                              {tech}
                            </span>
                          ))}
                          {project.technologies.length > 3 && (
                            <span className="text-xs text-text-secondary">+{project.technologies.length - 3} more</span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="text-xs text-matrix font-mono" data-testid={`project-metric-${index}`}>
                            {project.metric}
                          </div>
                          {project.demo && typeof project.demo === 'string' && project.demo.startsWith('http') && (
                            <button
                              onClick={(e) => { e.stopPropagation(); window.open(project.demo as string, '_blank'); }}
                              className="px-2 py-1 bg-matrix text-black rounded text-xs hover:bg-green-400 transition-colors"
                              data-testid={`project-live-${index}`}
                            >
                              Live
                            </button>
                          )}
                          {project.repository && (
                            <button
                              onClick={(e) => { e.stopPropagation(); window.open(project.repository as string, '_blank'); }}
                              className="px-2 py-1 bg-terminal-border rounded text-xs hover:bg-matrix hover:text-black transition-colors"
                              data-testid={`project-repo-${index}`}
                            >
                              Repo
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Project Detail Modal */}
                {selectedProject !== null && (
                  <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50" onClick={() => setSelectedProject(null)}>
                    <div className="bg-background border border-matrix rounded-lg max-w-4xl w-full mx-4 max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
                      <TerminalWindow>
                        <div className="flex items-center justify-between mb-4">
                          <h2 className="text-xl text-matrix font-bold flex items-center gap-2">
                            <Code className="w-5 h-5" />
                            {projects[selectedProject].title}
                          </h2>
                          <button
                            onClick={() => setSelectedProject(null)}
                            className="text-text-secondary hover:text-matrix transition-colors"
                          >
                            <X className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                          {/* Main Details */}
                          <div className="lg:col-span-2 space-y-4">
                            <div>
                              <h3 className="text-cyber-blue font-bold mb-2">Project Overview</h3>
                              <p className="text-text-secondary text-sm leading-relaxed">
                                {projects[selectedProject].longDescription}
                              </p>
                            </div>

                            <div>
                              <h3 className="text-cyber-blue font-bold mb-2">Technology Stack</h3>
                              <div className="flex flex-wrap gap-2">
                                {projects[selectedProject].technologies.map((tech, index) => (
                                  <span 
                                    key={index}
                                    className="px-3 py-1 bg-terminal-border rounded-full text-xs hover:bg-matrix hover:text-black transition-colors cursor-pointer"
                                  >
                                    {tech}
                                  </span>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-cyber-blue font-bold mb-2">Live Demo</h3>
                              <div className="border border-terminal-border rounded p-4 bg-black/30 space-y-2 text-sm">
                                {projects[selectedProject].demo && projects[selectedProject].demo.startsWith('http') ? (
                                  <button
                                    onClick={() => window.open(projects[selectedProject].demo as string, '_blank')}
                                    className="px-3 py-2 bg-matrix text-black rounded text-xs hover:bg-green-400 transition-colors inline-flex items-center gap-2"
                                  >
                                    <Play className="w-4 h-4" /> Open Live Demo
                                  </button>
                                ) : (
                                  <div className="text-text-secondary">No live demo available. Please check the repository instead.</div>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Sidebar Stats */}
                          <div className="space-y-4">
                            <div>
                              <h3 className="text-cyber-blue font-bold mb-2">Project Stats</h3>
                              <div className="space-y-2 text-xs">
                                {Object.entries(projects[selectedProject].details).map(([key, value]) => (
                                  <div key={key} className="flex justify-between">
                                    <span className="capitalize">{key.replace(/_/g, ' ')}:</span>
                                    <span className="text-matrix font-mono">{value}</span>
                                  </div>
                                ))}
                              </div>
                            </div>

                            <div>
                              <h3 className="text-cyber-blue font-bold mb-2">Actions</h3>
                              <div className="space-y-2">
                                {projects[selectedProject].repository && (
                                  <button 
                                    className="w-full px-3 py-2 bg-terminal-border rounded text-xs hover:bg-matrix hover:text-black transition-colors flex items-center gap-2"
                                    onClick={() => window.open(projects[selectedProject].repository as string, '_blank')}
                                  >
                                    <Github className="w-4 h-4" />
                                    View Repository
                                  </button>
                                )}
                                <button className="w-full px-3 py-2 bg-terminal-border rounded text-xs hover:bg-cyber-blue hover:text-black transition-colors flex items-center gap-2">
                                  <Play className="w-4 h-4" />
                                  Run Demo
                                </button>
                                <button className="w-full px-3 py-2 bg-terminal-border rounded text-xs hover:bg-red-600 hover:text-white transition-colors flex items-center gap-2">
                                  <Cpu className="w-4 h-4" />
                                  System Analysis
                                </button>
                              </div>
                            </div>

                            <div className="p-3 border border-terminal-border rounded">
                              <div className="text-xs text-cyber-blue mb-2">Security Notice</div>
                              <div className="text-xs text-text-secondary leading-relaxed">
                                This project contains sensitive security tools. Access is logged and monitored. 
                                Unauthorized use is prohibited.
                              </div>
                            </div>
                          </div>
                        </div>
                      </TerminalWindow>
                    </div>
                  </div>
                )}
              </TerminalWindow>
            </section>
          )}



          {/* Contact Section */}
          {activeSection === 'contact' && (
            <section 
              data-testid="contact-section"
              className={`transition-all duration-600 ${
                sectionStates['contact'] === 'minimized' ? 'transform scale-90 opacity-90' : 
                sectionStates['contact'] === 'maximized' ? 'fixed top-20 left-4 right-4 bottom-4 z-50 bg-black rounded-lg border border-matrix/30' :
                sectionStates['contact'] === 'closed' ? 'transform scale-0 opacity-0' : ''
              } ${
                sectionAnimations['contact'] === 'folding-minimize' ? 'animate-win-minimize' :
                sectionAnimations['contact'] === 'folding-maximize' ? 'animate-win-maximize' :
                sectionAnimations['contact'] === 'folding-close' ? 'animate-win-close' : ''
              }`}
            >
              <TerminalWindow className="w-full h-full">
                {/* Show navigation controls when maximized */}
                {sectionStates['contact'] === 'maximized' && (
                  <div className="mb-4 border-b border-terminal-border pb-2">
                    <div className="flex items-center justify-between px-3 py-2 mb-3">
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleSectionWindowAction('contact', 'close')}
                          className="w-4 h-4 bg-red-500 rounded-full hover:bg-red-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-red-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('contact', 'minimize')}
                          className="w-4 h-4 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-yellow-400/50"
                        ></button>
                        <button
                          onClick={() => handleSectionWindowAction('contact', 'maximize')}
                          className="w-4 h-4 bg-matrix rounded-full hover:bg-green-400 transition-all duration-200 hover:scale-125 active:scale-95 shadow-lg hover:shadow-matrix/50 animate-pulse"
                        ></button>
                      </div>
                      <div className="text-sm text-matrix/80 font-mono" onDoubleClick={() => handleSectionWindowAction('contact', 'maximize')}>contact.exe</div>
                    </div>
                  </div>
                )}
                <div className="flex items-center gap-2 mb-4">
                  <Mail className="w-5 h-5 text-matrix" />
                  <h2 className="text-xl text-matrix hover:animate-glitch cursor-default" data-testid="contact-title">
                    Contact Information
                  </h2>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="border border-terminal-border rounded p-4 hover:border-matrix/50 transition-all duration-300 hover:shadow-lg hover:shadow-matrix/20">
                    <div className="text-cyber-blue mb-4 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Secure Communication Channels
                    </div>
                    <div className="text-sm space-y-3">
                      <a href="mailto:Princeofori1470@gmail.com" target="_blank" rel="noopener noreferrer" className="w-full px-3 py-2 bg-terminal-border rounded hover:bg-matrix hover:text-black transition-colors flex items-center gap-3" data-testid="contact-email">
                        <Mail className="w-4 h-4 text-matrix" />
                        <div>
                          <div className="text-matrix">Princeofori1470@gmail.com</div>
                          <div className="text-xs text-text-secondary">Preferred: Email or LinkedIn</div>
                        </div>
                      </a>
                      <a href="https://www.linkedin.com/in/prince-ofori-40a1062aa/" target="_blank" rel="noopener noreferrer" className="w-full px-3 py-2 bg-terminal-border rounded hover:bg-matrix hover:text-black transition-colors flex items-center gap-3" data-testid="contact-linkedin">
                        <User className="w-4 h-4 text-cyber-blue" />
                        <div>
                          <div>LinkedIn Profile</div>
                          <div className="text-xs text-text-secondary">Second-year CS student at KNUST</div>
                        </div>
                      </a>
                      <a href="https://github.com/0xP4X" target="_blank" rel="noopener noreferrer" className="w-full px-3 py-2 bg-terminal-border rounded hover:bg-matrix hover:text-black transition-colors flex items-center gap-3" data-testid="contact-github">
                        <Github className="w-4 h-4 text-text-secondary" />
                        <div>
                          <div>GitHub: 0xP4X</div>
                          <div className="text-xs text-text-secondary">Beginner-friendly projects in progress</div>
                        </div>
                      </a>
                      <a href="https://app.hackthebox.com/profile/0xP4X" target="_blank" rel="noopener noreferrer" className="w-full px-3 py-2 bg-terminal-border rounded hover:bg-matrix hover:text-black transition-colors flex items-center gap-3" data-testid="contact-htb">
                        <Target className="w-4 h-4 text-red-400" />
                        <div>
                          <div>HackTheBox: 0xP4X</div>
                          <div className="text-xs text-text-secondary">Global Rank: #127 • Pro Hacker</div>
                        </div>
                      </a>
                    </div>
                    
                    <div className="mt-6 p-3 bg-black/30 border border-terminal-border rounded">
                      <div className="text-xs text-cyber-blue mb-2 flex items-center gap-1">
                        <Lock className="w-3 h-3" />
                        Security Notice
                      </div>
                      <div className="text-xs text-text-secondary">
                        All communications are monitored and logged. 
                        For sensitive matters, use PGP encryption.
                      </div>
                      <div className="text-xs text-matrix mt-1 font-mono">
                        PGP: A1B2 C3D4 E5F6 G7H8
                      </div>
                    </div>
                  </div>
                  <div className="border border-terminal-border rounded p-4 hover:border-matrix/50 transition-all duration-300">
                    <div className="text-cyber-blue mb-2 flex items-center gap-2">
                      <Terminal className="w-4 h-4" />
                      Interactive Terminal
                    </div>
                    <InteractiveTerminal />
                  </div>
                </div>
              </TerminalWindow>
            </section>
          )}
        </div>
      </div>
    </div>
  );
}
