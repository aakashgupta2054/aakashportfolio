import { useState, useEffect } from 'react';
import { Volume2, VolumeX, Menu, X, Terminal, FileText, Phone, Mail, Github, MessageSquare } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { toggleSound, isSoundEnabled, playCyberTone } from '../utils/sound';

interface HeaderProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export default function Header({ onOpenResume, onOpenTerminal }: HeaderProps) {
  const [soundOn, setSoundOn] = useState(isSoundEnabled());
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu on resize to desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleToggleSound = () => {
    const newState = toggleSound();
    setSoundOn(newState);
    if (newState) {
      playCyberTone('blip');
    }
  };

  const navLinks = [
    { label: 'Projects & Apps', href: '#projects' },
    { label: 'CEH Security', href: '#cybersecurity' },
    { label: 'Interactive Labs', href: '#interactive-labs' },
    { label: 'Experience', href: '#experience' },
    { label: 'Skills & Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070b14]/95 backdrop-blur-md border-b border-slate-800/80 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        {/* Strictly compliant Top Bar Contract: Zone 1 (Wordmark) — Zone 2 (Nav Links) — Zone 3 (Primary Action + Controls) */}
        <div className="flex items-center justify-between gap-2 sm:gap-4 lg:gap-8 h-14 sm:h-16">
          {/* Zone 1: Single text element wordmark with responsive size & truncate */}
          <a
            href="#"
            onClick={() => playCyberTone('click')}
            className="text-xs xs:text-sm sm:text-base lg:text-lg font-bold tracking-tight text-white whitespace-nowrap shrink-0 flex items-center gap-1.5 sm:gap-2 group py-2"
          >
            <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-cyan-400 rotate-45 group-hover:rotate-90 transition-transform shrink-0"></span>
            <span className="truncate max-w-[120px] xs:max-w-[170px] sm:max-w-none">{PORTFOLIO_DATA.profile.name}</span>
            <span className="text-slate-500 font-mono text-[11px] lg:text-xs hidden xl:inline">/ Full-Stack & Cyber</span>
          </a>

          {/* Zone 2: Concise single-line text navigation links (desktop) */}
          <nav className="hidden md:flex items-center gap-3.5 lg:gap-6 xl:gap-7 text-xs font-medium text-slate-300">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => playCyberTone('click')}
                className="hover:text-cyan-400 transition-colors whitespace-nowrap shrink-0 py-2"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary Action + Sound utility + Mobile Menu Toggle */}
          <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-2.5 shrink-0">
            {/* Audio Toggle */}
            <button
              onClick={handleToggleSound}
              className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              title={soundOn ? 'Mute cyber audio feedback' : 'Enable cyber audio feedback'}
              aria-label="Toggle Sound"
            >
              {soundOn ? <Volume2 className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 sm:w-4 sm:h-4" />}
            </button>

            {/* Terminal Button (visible on tablet/desktop) */}
            <button
              onClick={() => {
                playCyberTone('click');
                onOpenTerminal();
              }}
              className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono text-slate-300 bg-slate-900 border border-slate-800 hover:border-cyan-700 rounded-lg transition-colors cursor-pointer min-h-[36px]"
              title="Launch cyber terminal CLI"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>Terminal CLI</span>
            </button>

            {/* Resume Button */}
            <button
              onClick={() => {
                playCyberTone('click');
                onOpenResume();
              }}
              className="px-2.5 xs:px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-lg transition-colors whitespace-nowrap shrink-0 font-sans cursor-pointer shadow-sm flex items-center gap-1 sm:gap-1.5 min-h-[36px]"
            >
              <FileText className="w-3.5 h-3.5 shrink-0" />
              <span><span className="hidden xs:inline">Resume </span>CV</span>
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => {
                playCyberTone('click');
                setMobileMenuOpen(!mobileMenuOpen);
              }}
              className="md:hidden p-2 text-slate-300 hover:text-white rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer min-h-[36px] min-w-[36px] flex items-center justify-center"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-4 h-4 sm:w-5 sm:h-5" /> : <Menu className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-slate-800 bg-[#070b14]/98 space-y-1.5">
            <div className="grid grid-cols-2 gap-1 px-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => {
                    playCyberTone('click');
                    setMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-cyan-400 hover:bg-slate-900/80 rounded-lg transition-colors block truncate"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-2 border-t border-slate-800/80 px-2 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenTerminal();
                }}
                className="w-full py-2 bg-slate-900 text-xs font-mono text-cyan-300 border border-slate-800 rounded-lg flex items-center justify-center gap-2 cursor-pointer"
              >
                <Terminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>Open Cyber Terminal CLI</span>
              </button>

              <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 px-1">
                <a
                  href={`tel:${PORTFOLIO_DATA.profile.phone}`}
                  className="flex items-center gap-1 hover:text-cyan-400"
                >
                  <Phone className="w-3 h-3 text-cyan-400" />
                  <span>{PORTFOLIO_DATA.profile.phone}</span>
                </a>
                <a
                  href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                  className="flex items-center gap-1 hover:text-cyan-400"
                >
                  <Mail className="w-3 h-3 text-cyan-400" />
                  <span>Email</span>
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 hover:text-cyan-400"
                >
                  <Github className="w-3 h-3 text-cyan-400" />
                  <span>GitHub</span>
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

