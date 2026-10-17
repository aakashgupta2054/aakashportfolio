import { useState, useRef, useEffect, KeyboardEvent } from 'react';
import { Terminal as TerminalIcon, Sparkles, CornerDownLeft, X, Maximize2, Minimize2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

interface HistoryItem {
  command: string;
  output: string | React.ReactNode;
  time: string;
}

interface CyberTerminalProps {
  onOpenResume?: () => void;
  onOpenEmail?: () => void;
}

export default function CyberTerminal({ onOpenResume, onOpenEmail }: CyberTerminalProps) {
  const [inputVal, setInputVal] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([
    {
      command: 'init --developer "Aakash Gupta"',
      output: (
        <div className="space-y-1 text-slate-300">
          <p className="text-cyan-400 font-bold">AAKASH GUPTA // FULL-STACK DEVELOPER & CYBERSECURITY</p>
          <p className="text-slate-400 text-xs">
            B.Tech CSE · Python/Django & React · EC-Council Candidate (Currently Learning) · WorkMint & Attendly
          </p>
          <p className="text-emerald-400 text-xs mt-1">
            Type <span className="underline font-bold">help</span> to view available system routines, or click the chips below.
          </p>
        </div>
      ),
      time: '14:20:00',
    },
  ]);
  const [isExpanded, setIsExpanded] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const quickCommands = ['help', 'skills', 'experience', 'projects', 'contact', 'resume', 'clear'];

  const handleCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    playCyberTone('terminal');
    const cmd = rawCmd.toLowerCase();
    const nowTime = new Date().toTimeString().slice(0, 8);

    if (cmd === 'clear') {
      setHistory([]);
      setInputVal('');
      return;
    }

    let resultOutput: React.ReactNode = null;

    if (cmd === 'help') {
      resultOutput = (
        <div className="space-y-1 text-xs">
          <div className="text-cyan-300 font-semibold mb-1">Available Terminal Commands:</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-slate-300">
            <div><span className="text-cyan-400 font-mono">apps</span> : View deployed live apps (WorkMint & Attendly)</div>
            <div><span className="text-cyan-400 font-mono">ceh</span> : EC-Council Certified Ethical Hacker progress</div>
            <div><span className="text-cyan-400 font-mono">skills</span> : Full breakdown of tech stack & tools</div>
            <div><span className="text-cyan-400 font-mono">experience</span> : Work timeline (Jio, Saficon, View My Records)</div>
            <div><span className="text-cyan-400 font-mono">projects</span> : Deep dive into engineered applications</div>
            <div><span className="text-cyan-400 font-mono">contact</span> : Phone, email, GitHub & Instagram handles</div>
            <div><span className="text-cyan-400 font-mono">resume</span> : View / download full formal resume</div>
            <div><span className="text-cyan-400 font-mono">clear</span> : Clear console buffer</div>
          </div>
        </div>
      );
    } else if (cmd === 'apps' || cmd === 'workmint' || cmd === 'attendly') {
      resultOutput = (
        <div className="space-y-2 text-xs">
          <div className="p-2 bg-slate-900/80 rounded border border-cyan-800/60">
            <span className="text-cyan-300 font-bold">1. WorkMint (Attendance & Payroll SaaS):</span>
            <div className="text-slate-300">Live URL: <a href="https://workmints.vercel.app/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">https://workmints.vercel.app/</a></div>
            <div className="text-slate-400 text-[11px]">Shift calendars, automated payroll computation, offline caching.</div>
          </div>
          <div className="p-2 bg-slate-900/80 rounded border border-cyan-800/60">
            <span className="text-cyan-300 font-bold">2. Attendly (Attendance Tracker PWA):</span>
            <div className="text-slate-300">Live URL: <a href="https://attendly-bay.vercel.app/" target="_blank" rel="noreferrer" className="text-emerald-400 underline">https://attendly-bay.vercel.app/</a></div>
            <div className="text-slate-400 text-[11px]">Interactive calendar grid, goal target dials, mobile-first PWA.</div>
          </div>
        </div>
      );
    } else if (cmd === 'ceh' || cmd === 'security') {
      resultOutput = (
        <div className="p-2.5 bg-emerald-950/40 border border-emerald-700/60 rounded text-xs space-y-1">
          <div className="text-emerald-300 font-bold">EC-Council Certified Ethical Hacker (CEH v12) - In Progress</div>
          <div className="text-slate-300">Active preparation: Network penetration testing, Wireshark packet stream analysis, OWASP Top 10 vulnerabilities, and perimeter defense hardening.</div>
        </div>
      );
    } else if (cmd === 'skills') {
      resultOutput = (
        <div className="space-y-2 text-xs">
          {PORTFOLIO_DATA.skillCategories.map((cat, idx) => (
            <div key={idx} className="border-l-2 border-cyan-500/50 pl-2">
              <span className="text-cyan-300 font-semibold block">{cat.title}:</span>
              <span className="text-slate-300">{cat.skills.map(s => s.name).join(' · ')}</span>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'experience') {
      resultOutput = (
        <div className="space-y-2 text-xs">
          {PORTFOLIO_DATA.experiences.map((exp, idx) => (
            <div key={idx} className="p-2 bg-slate-900/60 rounded border border-slate-800">
              <div className="font-semibold text-white flex justify-between">
                <span>{exp.role} @ {exp.company}</span>
                <span className="text-cyan-400 font-mono">{exp.period}</span>
              </div>
              <p className="text-slate-400 mt-1">{exp.highlights[0]}</p>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'projects') {
      resultOutput = (
        <div className="space-y-1.5 text-xs">
          {PORTFOLIO_DATA.projects.map((proj, idx) => (
            <div key={idx} className="text-slate-300">
              <span className="text-cyan-400 font-bold">{proj.title}</span> ({proj.organization})
              <div className="text-slate-400">{proj.tags.join(', ')}</div>
            </div>
          ))}
        </div>
      );
    } else if (cmd === 'contact') {
      resultOutput = (
        <div className="space-y-1 text-xs text-slate-300">
          <div><span className="text-cyan-400">Phone:</span> {PORTFOLIO_DATA.profile.phone}</div>
          <div><span className="text-cyan-400">Email:</span> {PORTFOLIO_DATA.profile.email}</div>
          <div><span className="text-cyan-400">GitHub:</span> {PORTFOLIO_DATA.profile.github}</div>
          <div><span className="text-cyan-400">Instagram:</span> @{PORTFOLIO_DATA.profile.instagramUser}</div>
          <div><span className="text-cyan-400">Location:</span> {PORTFOLIO_DATA.profile.location}</div>
        </div>
      );
    } else if (cmd === 'resume') {
      if (onOpenResume) {
        onOpenResume();
        resultOutput = <span className="text-emerald-400 text-xs">Opening resume modal...</span>;
      } else {
        resultOutput = <span className="text-slate-300 text-xs">Resume modal triggered.</span>;
      }
    } else if (cmd === 'email') {
      if (onOpenEmail) {
        onOpenEmail();
        resultOutput = <span className="text-emerald-400 text-xs">Opening email composer...</span>;
      } else {
        resultOutput = <span className="text-slate-300 text-xs">Email composer triggered.</span>;
      }
    } else if (cmd === 'whoami') {
      resultOutput = (
        <p className="text-xs text-slate-300 leading-relaxed">
          {PORTFOLIO_DATA.profile.objective}
        </p>
      );
    } else {
      resultOutput = (
        <span className="text-rose-400 text-xs">
          Command not recognized: &quot;{rawCmd}&quot;. Type <span className="underline font-bold">help</span> for available commands.
        </span>
      );
    }

    setHistory((prev) => [...prev, { command: rawCmd, output: resultOutput, time: nowTime }]);
    setInputVal('');
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(inputVal);
    }
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  return (
    <div
      className={`bg-[#050812] border border-cyan-900/50 rounded-xl overflow-hidden transition-all duration-300 flex flex-col font-mono text-xs w-full shadow-2xl ${
        isExpanded ? 'h-[85dvh] max-h-[580px]' : 'h-[370px] xs:h-[420px] max-h-[78dvh]'
      }`}
    >
      {/* Terminal Title Bar */}
      <div className="bg-[#090e1d] px-3 xs:px-4 py-2 xs:py-2.5 border-b border-slate-800 flex items-center justify-between text-slate-400 select-none shrink-0">
        <div className="flex items-center gap-1.5 xs:gap-2 truncate">
          <TerminalIcon className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
          <span className="text-slate-200 font-semibold font-sans text-xs truncate">
            aakash@cyber-node:~/portfolio
          </span>
          <span className="text-[10px] text-slate-500 hidden sm:inline shrink-0">
            [bash v5.2]
          </span>
        </div>

        <div className="flex items-center gap-1.5 xs:gap-2 shrink-0">
          <button
            onClick={() => {
              playCyberTone('click');
              setIsExpanded(!isExpanded);
            }}
            className="p-1 hover:text-white transition-colors cursor-pointer"
            title={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={() => {
              playCyberTone('click');
              setHistory([]);
            }}
            className="p-1 hover:text-white transition-colors cursor-pointer text-slate-500 hover:text-rose-400"
            title="Clear"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Terminal Output Body */}
      <div
        className="flex-1 p-3 xs:p-4 overflow-y-auto space-y-2.5 sm:space-y-3 font-mono leading-relaxed bg-[#050812]/90"
        onClick={() => inputRef.current?.focus()}
      >
        {history.map((item, idx) => (
          <div key={idx} className="space-y-1">
            <div className="flex items-center gap-1.5 xs:gap-2 text-slate-400 text-xs">
              <span className="text-cyan-400 font-bold shrink-0">aakash@dev-node:~$</span>
              <span className="text-white font-medium break-all">{item.command}</span>
              <span className="text-[10px] text-slate-600 ml-auto shrink-0">{item.time}</span>
            </div>
            <div className="pl-3 xs:pl-4 py-0.5">{item.output}</div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Quick Action Chips */}
      <div className="px-2.5 xs:px-3 py-1.5 bg-[#080d1a] border-t border-slate-800/80 flex items-center gap-1.5 overflow-x-auto no-scrollbar text-[11px] shrink-0">
        <span className="text-slate-500 shrink-0 font-sans hidden xs:inline">Quick Run:</span>
        {quickCommands.map((chip) => (
          <button
            key={chip}
            onClick={() => handleCommand(chip)}
            className="px-2 py-0.5 rounded bg-slate-800/70 hover:bg-cyan-950 hover:text-cyan-300 hover:border-cyan-700/60 text-slate-300 border border-slate-700/70 transition-colors shrink-0 cursor-pointer text-[10px] xs:text-[11px]"
          >
            {chip}
          </button>
        ))}
      </div>

      {/* Input Prompt Row */}
      <div className="p-2 xs:p-2.5 bg-[#090e1d] border-t border-slate-800 flex items-center gap-1.5 xs:gap-2 shrink-0">
        <span className="text-cyan-400 font-bold shrink-0 hidden xs:inline">aakash@dev-node:~$</span>
        <span className="text-cyan-400 font-bold shrink-0 xs:hidden">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputVal}
          onChange={(e) => setInputVal(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="type 'help', 'apps', 'skills'..."
          className="flex-1 bg-transparent text-white focus:outline-none placeholder:text-slate-600 text-xs font-mono"
        />
        <button
          onClick={() => handleCommand(inputVal)}
          className="p-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer shrink-0"
          title="Execute"
        >
          <CornerDownLeft className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
