import { ArrowDown, Mail, Github, Phone, MapPin, Terminal, Sparkles, ShieldCheck } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

interface HeroProps {
  onOpenResume: () => void;
  onOpenEmail: () => void;
  onOpenTerminal: () => void;
}

export default function Hero({ onOpenResume, onOpenEmail, onOpenTerminal }: HeroProps) {
  return (
    <section className="relative pt-4 xs:pt-6 sm:pt-10 pb-10 sm:pb-16 overflow-hidden w-full">
      {/* Ambient Cyber Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[340px] xs:w-[500px] sm:w-[800px] h-[350px] cyber-radial-overlay pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Split-Screen Hero Grid (Responsive from 320px up to 4K) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-10 items-stretch">
          {/* Left Column: Typographic Impact */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            {/* Unboxed Metadata Kicker (Zero-Pill Discipline) */}
            <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-[10px] xs:text-[11px] sm:text-xs text-slate-400 font-mono tracking-wide mb-2.5 sm:mb-4">
              <span className="text-cyan-400 font-semibold">DELHI NCR</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span>B.TECH CSE FIRST DIVISION</span>
              <span aria-hidden="true" className="text-slate-600">·</span>
              <span className="text-emerald-400 font-medium">CEH EC-COUNCIL CYBERSECURITY</span>
            </div>

            {/* Display Headline with responsive clamp and break-words */}
            <h1 className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-[1.2] sm:leading-[1.12] [text-wrap:balance] break-words">
              Full-Stack Software Engineer &{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-emerald-400">
                Cybersecurity Developer
              </span>{' '}
              shipping production systems.
            </h1>

            {/* Lead Prose from Aakash Gupta's Profile */}
            <p className="mt-3 sm:mt-5 text-xs xs:text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
              Creator of <strong>WorkMint</strong> (payroll/attendance SaaS) and <strong>Attendly</strong> (PWA tracker). Hands-on background in <strong>Python/Django</strong>, <strong>React/TypeScript</strong>, telecom network operations with <strong>Wireshark</strong> diagnostics at Reliance Jio, and active <strong>CEH (EC-Council)</strong> cybersecurity training.
            </p>

            {/* Contact Verification Strip */}
            <div className="mt-4 sm:mt-5 flex flex-wrap items-center gap-x-3 sm:gap-x-5 gap-y-2 text-[10px] xs:text-[11px] sm:text-xs text-slate-400 font-mono">
              <a
                href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 break-all"
              >
                <Mail className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{PORTFOLIO_DATA.profile.email}</span>
              </a>
              <a
                href={`tel:${PORTFOLIO_DATA.profile.phone}`}
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Phone className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>{PORTFOLIO_DATA.profile.phone}</span>
              </a>
              <a
                href={PORTFOLIO_DATA.profile.github}
                target="_blank"
                rel="noreferrer"
                className="hover:text-cyan-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <Github className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>github.com/{PORTFOLIO_DATA.profile.githubUser}</span>
              </a>
              <a
                href={PORTFOLIO_DATA.profile.instagram}
                target="_blank"
                rel="noreferrer"
                className="hover:text-pink-400 transition-colors flex items-center gap-1.5 whitespace-nowrap"
              >
                <span className="text-pink-400 font-bold shrink-0">@</span>
                <span>{PORTFOLIO_DATA.profile.instagramUser}</span>
              </a>
            </div>

            {/* Primary Action Row (Full width on mobile, inline on desktop) */}
            <div className="mt-5 sm:mt-8 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-2 xs:gap-2.5 sm:gap-3">
              <a
                href="#projects"
                onClick={() => playCyberTone('click')}
                className="w-full sm:w-auto px-4 xs:px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm rounded-lg transition-all shadow-lg shadow-cyan-500/20 flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Explore Deployed Projects</span>
                <ArrowDown className="w-4 h-4 shrink-0" />
              </a>

              <a
                href="#cybersecurity"
                onClick={() => playCyberTone('click')}
                className="w-full sm:w-auto px-3.5 xs:px-4 py-2.5 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 border border-emerald-700/80 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>CEH Cybersecurity Track</span>
              </a>

              <button
                onClick={() => {
                  playCyberTone('click');
                  onOpenEmail();
                }}
                className="w-full sm:w-auto px-3.5 xs:px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700/80 hover:border-cyan-500/50 text-xs sm:text-sm font-medium rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Contact Aakash</span>
              </button>
            </div>
          </div>

          {/* Right Column: Hero Visual Container (Matching Height via items-stretch) */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <div className="relative rounded-2xl border border-cyan-800/60 bg-[#090f1e] overflow-hidden p-1.5 xs:p-2 group shadow-2xl max-w-[290px] xs:max-w-xs sm:max-w-sm lg:max-w-none mx-auto w-full">
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-l-2 border-cyan-400 z-20 pointer-events-none"></div>
              <div className="absolute top-0 right-0 w-5 sm:w-6 h-5 sm:h-6 border-t-2 border-r-2 border-cyan-400 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 left-0 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-l-2 border-cyan-400 z-20 pointer-events-none"></div>
              <div className="absolute bottom-0 right-0 w-5 sm:w-6 h-5 sm:h-6 border-b-2 border-r-2 border-cyan-400 z-20 pointer-events-none"></div>

              {/* Developer Portrait */}
              <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-900">
                <img
                  src={PORTFOLIO_DATA.profile.avatar}
                  alt="Aakash Gupta - Full-Stack Developer & Cybersecurity Practitioner"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-500"
                />

                {/* Subtle scrim overlay with developer identity badge */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-3 xs:p-4 sm:p-5">
                  <div className="text-[10px] xs:text-xs font-mono text-cyan-400 flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
                    <span className="truncate">FULL-STACK & SECURITY ENGINEER</span>
                  </div>
                  <div className="text-base xs:text-lg sm:text-xl font-bold text-white tracking-tight mt-0.5">
                    {PORTFOLIO_DATA.profile.name}
                  </div>
                  <div className="text-[10px] xs:text-[11px] sm:text-xs text-slate-300 mt-1 line-clamp-1">
                    WorkMint · Attendly · CEH Track · Python/Django · Wireshark
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column KPI Strip in Full-Width Row Below Split */}
        <div className="mt-8 sm:mt-14 grid grid-cols-2 lg:grid-cols-4 gap-2 xs:gap-2.5 sm:gap-4">
          {PORTFOLIO_DATA.profile.kpis.map((kpi, idx) => (
            <div
              key={idx}
              className="p-2.5 xs:p-3 sm:p-4 bg-[#0a0f1d] border border-slate-800/80 rounded-xl hover:border-cyan-800/70 transition-colors flex flex-col justify-between"
            >
              <div>
                <div className="text-lg xs:text-xl sm:text-2xl lg:text-3xl font-extrabold text-white font-mono tabular-nums tracking-tight">
                  {kpi.value}
                </div>
                <div className="text-[10px] xs:text-[11px] sm:text-xs font-semibold text-cyan-400 mt-0.5 sm:mt-1 uppercase tracking-wider">
                  {kpi.label}
                </div>
              </div>
              <div className="text-[10px] xs:text-[11px] sm:text-xs text-slate-400 mt-1 sm:mt-0.5 line-clamp-2">
                {kpi.detail}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

