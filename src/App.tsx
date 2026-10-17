import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import ProjectsSection from './components/ProjectsSection';
import CybersecuritySection from './components/CybersecuritySection';
import ExperienceSection from './components/ExperienceSection';
import SkillsMatrix from './components/SkillsMatrix';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import ResumeModal from './components/ResumeModal';
import EmailComposerModal from './components/EmailComposerModal';
import CyberTerminal from './components/CyberTerminal';
import { Terminal as TerminalIcon, X, Sparkles } from 'lucide-react';
import { playCyberTone } from './utils/sound';

export default function App() {
  const [resumeOpen, setResumeOpen] = useState(false);
  const [emailOpen, setEmailOpen] = useState(false);
  const [terminalOpen, setTerminalOpen] = useState(false);

  // Global keyboard shortcut to open cyber terminal (`~` or `Ctrl+K`)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        playCyberTone('click');
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === '`' && !['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) {
        e.preventDefault();
        playCyberTone('click');
        setTerminalOpen((prev) => !prev);
      }
      if (e.key === 'Escape') {
        setResumeOpen(false);
        setEmailOpen(false);
        setTerminalOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex flex-col cyber-grid relative selection:bg-cyan-500 selection:text-black">
      {/* Top Bar Navigation */}
      <Header
        onOpenResume={() => setResumeOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero
          onOpenResume={() => setResumeOpen(true)}
          onOpenEmail={() => setEmailOpen(true)}
          onOpenTerminal={() => setTerminalOpen(true)}
        />

        {/* Featured Projects & Interactive Sim Testbenches (WorkMint, Attendly, Biometric, Wireshark, CAD) */}
        <ProjectsSection />

        {/* CEH EC-Council Cybersecurity & Ethical Hacking Track */}
        <CybersecuritySection />

        {/* Career Timeline & Industrial Experience */}
        <ExperienceSection />

        {/* Cross-Discipline Technical Skills Matrix */}
        <SkillsMatrix />

        {/* Direct Contact & Inquiry Channels */}
        <ContactSection
          onOpenEmailModal={() => setEmailOpen(true)}
          onOpenResumeModal={() => setResumeOpen(true)}
        />
      </main>

      {/* Footer */}
      <Footer
        onOpenResume={() => setResumeOpen(true)}
        onOpenTerminal={() => setTerminalOpen(true)}
      />

      {/* Floating Cyber Terminal HUD Launcher Button */}
      <div className="fixed bottom-3 right-3 sm:bottom-5 sm:right-5 z-30">
        <button
          onClick={() => {
            playCyberTone('click');
            setTerminalOpen(!terminalOpen);
          }}
          className="group px-3 py-2 sm:px-3.5 sm:py-2.5 bg-slate-900/95 hover:bg-cyan-950 text-cyan-400 hover:text-cyan-300 border border-cyan-800/80 hover:border-cyan-500/80 rounded-xl shadow-2xl backdrop-blur-md text-xs font-mono flex items-center gap-1.5 sm:gap-2 transition-all cursor-pointer"
          title="Toggle Cyber Terminal CLI (~ or Ctrl+K)"
        >
          <TerminalIcon className="w-4 h-4 text-cyan-400 group-hover:rotate-12 transition-transform shrink-0" />
          <span className="hidden sm:inline font-sans font-medium text-slate-200">Cyber Terminal</span>
          <kbd className="hidden md:inline px-1.5 py-0.5 bg-black/60 border border-slate-700 rounded text-[10px] text-slate-400">
            Ctrl+K
          </kbd>
        </button>
      </div>

      {/* Slide-over Cyber Terminal Modal */}
      {terminalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-4 bg-black/85 backdrop-blur-sm overflow-y-auto">
          <div className="relative w-full max-w-3xl shadow-2xl my-auto">
            <CyberTerminal
              onOpenResume={() => {
                setTerminalOpen(false);
                setResumeOpen(true);
              }}
              onOpenEmail={() => {
                setTerminalOpen(false);
                setEmailOpen(true);
              }}
            />
            <button
              onClick={() => {
                playCyberTone('click');
                setTerminalOpen(false);
              }}
              className="absolute -top-3 -right-2 sm:-right-3 p-1.5 bg-slate-900 border border-slate-700 hover:border-rose-500 text-slate-300 hover:text-white rounded-full transition-colors cursor-pointer z-30"
              aria-label="Close Cyber Terminal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Verified Resume Modal with Print / PDF */}
      <ResumeModal
        isOpen={resumeOpen}
        onClose={() => setResumeOpen(false)}
      />

      {/* Professional Email Generator Modal */}
      <EmailComposerModal
        isOpen={emailOpen}
        onClose={() => setEmailOpen(false)}
      />
    </div>
  );
}
