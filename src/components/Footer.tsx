import { ArrowUp, Github, Mail, Phone, FileText, Terminal } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

interface FooterProps {
  onOpenResume: () => void;
  onOpenTerminal: () => void;
}

export default function Footer({ onOpenResume, onOpenTerminal }: FooterProps) {
  const scrollToTop = () => {
    playCyberTone('click');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050811] border-t border-slate-800 text-slate-400 text-xs py-10 sm:py-12 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-5 sm:gap-6 pb-6 sm:pb-8 border-b border-slate-800/80">
          <div>
            <div className="text-white font-bold text-sm sm:text-base flex items-center gap-2">
              <span className="w-2 h-2 bg-cyan-400 rotate-45 shrink-0"></span>
              <span>{PORTFOLIO_DATA.profile.name}</span>
            </div>
            <p className="text-slate-400 text-xs mt-1">
              AI-Assisted Software Developer · Python/Django · Network Operations · Precision CAD
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 text-xs font-mono">
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Github className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>GitHub</span>
            </a>
            <span className="text-slate-700 hidden xs:inline">·</span>
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Email</span>
            </a>
            <span className="text-slate-700 hidden xs:inline">·</span>
            <a
              href={`tel:${PORTFOLIO_DATA.profile.phone}`}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"
            >
              <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Phone</span>
            </a>
            <span className="text-slate-700 hidden xs:inline">·</span>
            <button
              onClick={() => {
                playCyberTone('click');
                onOpenTerminal();
              }}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <Terminal className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>CLI HUD</span>
            </button>
            <span className="text-slate-700 hidden xs:inline">·</span>
            <button
              onClick={() => {
                playCyberTone('click');
                onOpenResume();
              }}
              className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>View Resume</span>
            </button>
          </div>
        </div>

        <div className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4 text-[10px] xs:text-[11px] text-slate-500 text-center sm:text-left">
          <div>
            © {new Date().getFullYear()} Aakash Gupta. Built with modern cyber tech architecture & Google AI Studio.
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1 text-slate-400 hover:text-cyan-400 transition-colors cursor-pointer py-1"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
}
