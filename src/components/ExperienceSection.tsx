import { useState } from 'react';
import { Briefcase, GraduationCap, MapPin, Calendar, CheckCircle2, Building, Wrench, Globe, ArrowRight } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

export default function ExperienceSection() {
  const [activeExpId, setActiveExpId] = useState<string>(PORTFOLIO_DATA.experiences[0].id);

  const activeExp =
    PORTFOLIO_DATA.experiences.find((e) => e.id === activeExpId) || PORTFOLIO_DATA.experiences[0];

  return (
    <section id="experience" className="py-14 sm:py-16 border-t border-slate-800/80 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="pb-6 sm:pb-8 border-b border-slate-800">
          <div className="text-[10px] xs:text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            Career Timeline & Industrial Experience
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Proven Engineering in Software, Telecom & Mechanical Design
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
            From deploying Django web systems to running tier-1 network operations at Reliance Jio and drafting Indian Railway locomotive parts.
          </p>
        </div>

        {/* Experience Split Architecture */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-8 sm:mt-10">
          {/* Left: Role Navigation Column */}
          <div className="lg:col-span-5 space-y-3">
            {PORTFOLIO_DATA.experiences.map((exp) => {
              const isSelected = exp.id === activeExp.id;

              return (
                <button
                  key={exp.id}
                  onClick={() => {
                    playCyberTone('click');
                    setActiveExpId(exp.id);
                  }}
                  className={`w-full text-left p-3.5 sm:p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'bg-[#0f172a] border-cyan-500 shadow-md ring-1 ring-cyan-500/20'
                      : 'bg-[#090f1d] border-slate-800/80 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="text-xs sm:text-sm font-bold text-white flex items-center gap-1.5">
                        {exp.role}
                      </div>
                      <div className="text-[11px] sm:text-xs text-cyan-400 mt-0.5">
                        {exp.company}
                      </div>
                    </div>
                    <ArrowRight
                      className={`w-4 h-4 mt-1 shrink-0 transition-transform ${
                        isSelected ? 'text-cyan-400 translate-x-1' : 'text-slate-600'
                      }`}
                    />
                  </div>

                  <div className="mt-3 pt-2.5 sm:pt-3 border-t border-slate-800/60 flex items-center justify-between text-[10px] xs:text-[11px] font-mono text-slate-400">
                    <span>{exp.period}</span>
                    <span className="text-slate-500">{exp.location}</span>
                  </div>
                </button>
              );
            })}

            {/* Education Summary Card */}
            <div className="p-3.5 sm:p-4 bg-[#090f1d] border border-slate-800/80 rounded-xl mt-4 sm:mt-6">
              <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-1">
                <GraduationCap className="w-4 h-4 shrink-0" />
                <span>ACADEMIC FOUNDATION</span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-white mt-1">
                {PORTFOLIO_DATA.profile.education.degree}
              </h4>
              <div className="text-xs text-slate-300 mt-0.5">
                {PORTFOLIO_DATA.profile.education.institution}
              </div>
              <div className="mt-2 text-xs font-mono text-emerald-400">
                {PORTFOLIO_DATA.profile.education.period} · {PORTFOLIO_DATA.profile.education.grade}
              </div>
            </div>
          </div>

          {/* Right: Detailed Role Card */}
          <div className="lg:col-span-7 bg-[#0b1222] border border-cyan-900/40 rounded-2xl p-4 sm:p-6 lg:p-8 flex flex-col justify-between">
            <div>
              <div className="flex flex-wrap items-center justify-between gap-2 pb-3.5 sm:pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-base xs:text-lg sm:text-2xl font-bold text-white">
                    {activeExp.role}
                  </h3>
                  <div className="text-xs sm:text-sm font-medium text-cyan-400 mt-0.5 flex flex-wrap items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                    <span>{activeExp.company}</span>
                    <span className="text-slate-600">·</span>
                    <span className="text-slate-400">{activeExp.location}</span>
                  </div>
                </div>

                <div className="text-[11px] sm:text-xs font-mono text-slate-300 px-2.5 sm:px-3 py-1 bg-slate-900 border border-slate-800 rounded-lg">
                  {activeExp.period}
                </div>
              </div>

              {/* Domain Subhead */}
              <div className="mt-3.5 sm:mt-4 text-[11px] sm:text-xs font-mono text-slate-400 flex items-center gap-2">
                <Wrench className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                <span>Primary Domain: <strong className="text-slate-200">{activeExp.domain}</strong></span>
              </div>

              {/* Responsibilities list */}
              <div className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3">
                <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  Key Deliverables & Responsibilities
                </h4>
                <ul className="space-y-2 sm:space-y-2.5 text-xs sm:text-sm text-slate-300">
                  {activeExp.highlights.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 leading-relaxed">
                      <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Technologies Applied Strip */}
            <div className="mt-6 sm:mt-8 pt-4 sm:pt-5 border-t border-slate-800/80">
              <div className="text-xs text-slate-400 mb-2 font-mono">Tools & Technologies Applied:</div>
              <div className="flex flex-wrap gap-1.5 sm:gap-2">
                {activeExp.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 xs:px-2.5 py-1 bg-slate-900 border border-slate-800 rounded text-[11px] sm:text-xs font-mono text-slate-300"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
