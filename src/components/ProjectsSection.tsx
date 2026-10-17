import { useState } from 'react';
import { ExternalLink, CheckCircle2, Play, Layers, X, Sparkles, Globe, Smartphone } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';
import WorkmintSim from './simulations/WorkmintSim';
import AttendlySim from './simulations/AttendlySim';
import BiometricAttendanceSim from './simulations/BiometricAttendanceSim';
import WiresharkInspectorSim from './simulations/WiresharkInspectorSim';
import CadBlueprintViewer from './simulations/CadBlueprintViewer';

interface ProjectsSectionProps {
  onSelectInteractiveLab?: (type: 'workmint' | 'attendly' | 'biometric' | 'wireshark' | 'cad') => void;
}

export default function ProjectsSection({ onSelectInteractiveLab }: ProjectsSectionProps) {
  const [activeFilter, setActiveFilter] = useState<'ALL' | 'DEPLOYED' | 'WEB' | 'TELECOM' | 'CAD'>('ALL');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [activeSimulation, setActiveSimulation] = useState<'workmint' | 'attendly' | 'biometric' | 'wireshark' | 'cad'>('workmint');

  const filteredProjects = PORTFOLIO_DATA.projects.filter((p) => {
    if (activeFilter === 'ALL') return true;
    if (activeFilter === 'DEPLOYED') return !!p.liveUrl;
    if (activeFilter === 'WEB') return p.demoType === 'biometric' || p.demoType === 'workmint' || p.demoType === 'attendly';
    if (activeFilter === 'TELECOM') return p.demoType === 'wireshark';
    if (activeFilter === 'CAD') return p.demoType === 'cad';
    return true;
  });

  const handleLaunchSimulation = (type: 'workmint' | 'attendly' | 'biometric' | 'wireshark' | 'cad') => {
    playCyberTone('click');
    setActiveSimulation(type);
    if (onSelectInteractiveLab) {
      onSelectInteractiveLab(type);
    }
    const elem = document.getElementById('interactive-labs');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="py-16 border-t border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-8 border-b border-slate-800">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              Production Web Systems & Deployed Applications
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Shipped Applications & Engineering Architecture
            </h2>
          </div>

          {/* Functional Filter Tabs (Responsive Scrollable) */}
          <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto no-scrollbar max-w-full self-start md:self-auto shrink-0">
            {(
              [
                { id: 'ALL', label: 'All Projects' },
                { id: 'DEPLOYED', label: 'Live Deployed' },
                { id: 'WEB', label: 'Web & PWAs' },
                { id: 'TELECOM', label: 'Telecom & Wireshark' },
                { id: 'CAD', label: 'Mechanical CAD' },
              ] as const
            ).map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  playCyberTone('click');
                  setActiveFilter(tab.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer ${
                  activeFilter === tab.id
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Dynamic Bento Grid of Projects */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-5 sm:gap-6">
          {filteredProjects.map((project, index) => {
            // First two live projects get 6 cols on desktop, others 4 cols
            const isWide = index === 0 || index === 1;

            return (
              <div
                key={project.id}
                className={`group bg-[#090f1d] border border-slate-800/90 hover:border-cyan-700/80 rounded-2xl overflow-hidden transition-all duration-300 flex flex-col ${
                  isWide ? 'md:col-span-1 lg:col-span-6' : 'md:col-span-1 lg:col-span-4'
                }`}
              >
                {/* Media Container */}
                <div className="relative aspect-video overflow-hidden bg-slate-950">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d] via-transparent to-transparent opacity-90"></div>

                  {/* Top Live Badge */}
                  {project.liveUrl && (
                    <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 flex items-center gap-2">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-2 xs:px-2.5 py-1 bg-emerald-950/90 backdrop-blur-md border border-emerald-500/70 text-emerald-300 rounded text-[11px] sm:text-xs font-mono font-medium flex items-center gap-1.5 hover:bg-emerald-900 transition-colors shadow-lg"
                      >
                        <Globe className="w-3.5 h-3.5" />
                        <span>Live on Vercel</span>
                      </a>
                    </div>
                  )}

                  {/* Interactive Quick Launch Trigger on Media */}
                  <div className="absolute bottom-2.5 right-2.5 sm:bottom-3 sm:right-3 flex items-center gap-2">
                    <button
                      onClick={() => handleLaunchSimulation(project.demoType)}
                      className="px-2.5 xs:px-3 py-1.5 bg-black/80 backdrop-blur-md border border-cyan-500/60 hover:bg-cyan-500 hover:text-slate-950 text-cyan-300 rounded-lg text-[11px] sm:text-xs font-medium transition-all flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Play className="w-3 h-3 fill-current shrink-0" />
                      <span>Live Testbench</span>
                    </button>
                  </div>
                </div>

                {/* Content Container */}
                <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Zero-Pill Unboxed Metadata */}
                    <div className="flex flex-wrap items-center gap-1.5 text-[10px] xs:text-[11px] sm:text-xs text-slate-400 font-mono mb-2">
                      <span className="text-cyan-400">{project.organization}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span>{project.period}</span>
                      <span aria-hidden="true" className="text-slate-600">·</span>
                      <span className="text-slate-300 truncate max-w-[140px] sm:max-w-none">{project.role}</span>
                    </div>

                    <h3 className="text-base sm:text-lg lg:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {project.title}
                    </h3>

                    <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Highlights bullet list */}
                    <ul className="mt-3.5 sm:mt-4 space-y-1.5 text-xs text-slate-400">
                      {project.highlights.slice(0, 2).map((item, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-1.5">
                          <span className="text-cyan-400 font-bold shrink-0">›</span>
                          <span className="line-clamp-2">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer Stats & Actions */}
                  <div className="mt-5 pt-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-2.5">
                    {/* Unboxed Tech Stack */}
                    <div className="text-[11px] sm:text-xs text-slate-400 font-mono truncate max-w-[200px] sm:max-w-none">
                      {project.tags.slice(0, 4).join(' · ')}
                    </div>

                    <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          onClick={() => playCyberTone('click')}
                          className="text-xs text-emerald-400 hover:text-emerald-300 font-medium flex items-center gap-1"
                        >
                          <span>Open App</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      <button
                        onClick={() => {
                          playCyberTone('click');
                          setSelectedProject(project);
                        }}
                        className="text-xs text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1 cursor-pointer"
                      >
                        <span>Details</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Interactive Lab Showcase Section */}
        <div id="interactive-labs" className="mt-14 sm:mt-16 pt-10 sm:pt-12 border-t border-slate-800/80">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
            <div>
              <div className="text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1">
                Live In-Browser Testbenches
              </div>
              <h3 className="text-lg xs:text-xl sm:text-2xl font-bold text-white tracking-tight">
                Interactive Systems & Diagnostic Testbenches
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-xl">
                Test and interact with live simulators modeled after Aakash&apos;s deployed web applications, Wireshark network triage, and CAD models.
              </p>
            </div>

            {/* Testbench Selector Tabs (Responsive Scrollable) */}
            <div className="flex items-center gap-1 p-1 bg-slate-900 border border-slate-800 rounded-lg overflow-x-auto no-scrollbar max-w-full shrink-0">
              <button
                onClick={() => {
                  playCyberTone('click');
                  setActiveSimulation('workmint');
                }}
                className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  activeSimulation === 'workmint'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                1. WorkMint SaaS
              </button>
              <button
                onClick={() => {
                  playCyberTone('click');
                  setActiveSimulation('attendly');
                }}
                className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  activeSimulation === 'attendly'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                2. Attendly PWA
              </button>
              <button
                onClick={() => {
                  playCyberTone('click');
                  setActiveSimulation('biometric');
                }}
                className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  activeSimulation === 'biometric'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                3. Biometric Attendance
              </button>
              <button
                onClick={() => {
                  playCyberTone('click');
                  setActiveSimulation('wireshark');
                }}
                className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  activeSimulation === 'wireshark'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                4. Wireshark Triage
              </button>
              <button
                onClick={() => {
                  playCyberTone('click');
                  setActiveSimulation('cad');
                }}
                className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-md transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                  activeSimulation === 'cad'
                    ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                5. Railway CAD
              </button>
            </div>
          </div>

          {/* Active Testbench Render */}
          <div className="w-full">
            {activeSimulation === 'workmint' && <WorkmintSim />}
            {activeSimulation === 'attendly' && <AttendlySim />}
            {activeSimulation === 'biometric' && <BiometricAttendanceSim />}
            {activeSimulation === 'wireshark' && <WiresharkInspectorSim />}
            {activeSimulation === 'cad' && <CadBlueprintViewer />}
          </div>
        </div>

        {/* Project Detail Lightbox Modal (Fully Responsive with viewport scroll) */}
        {selectedProject && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
            <div className="relative w-full max-w-3xl bg-[#0b1222] border border-cyan-800/80 rounded-2xl shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[88vh] flex flex-col text-sm">
              {/* Sticky Modal Header */}
              <div className="p-4 sm:p-6 border-b border-slate-800 flex items-center justify-between gap-3 shrink-0 bg-[#080d1a]">
                <div className="truncate">
                  <div className="text-[10px] xs:text-xs font-mono text-cyan-400 truncate">
                    {selectedProject.organization} · {selectedProject.period}
                  </div>
                  <h3 className="text-base sm:text-xl font-bold text-white mt-0.5 truncate">
                    {selectedProject.title}
                  </h3>
                </div>
                <button
                  onClick={() => {
                    playCyberTone('click');
                    setSelectedProject(null);
                  }}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer shrink-0"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Modal Content */}
              <div className="p-4 sm:p-6 space-y-4 overflow-y-auto flex-1">
                <div className="aspect-video rounded-xl overflow-hidden bg-slate-950 border border-slate-800">
                  <img
                    src={selectedProject.image}
                    alt={selectedProject.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <p className="text-slate-300 leading-relaxed text-xs sm:text-sm">
                  {selectedProject.description}
                </p>

                <div>
                  <h4 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                    Key Technical Highlights
                  </h4>
                  <ul className="space-y-2 text-xs text-slate-300">
                    {selectedProject.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Metrics */}
                <div className="grid grid-cols-1 xs:grid-cols-3 gap-2.5 sm:gap-3 pt-2">
                  {selectedProject.metrics.map((m, idx) => (
                    <div key={idx} className="p-2.5 sm:p-3 bg-slate-900 border border-slate-800 rounded-lg text-center">
                      <div className="text-base sm:text-lg font-bold text-white font-mono">{m.value}</div>
                      <div className="text-[11px] sm:text-xs text-cyan-400 mt-0.5">{m.label}</div>
                    </div>
                  ))}
                </div>

                {/* Modal Footer Actions */}
                <div className="pt-4 border-t border-slate-800 flex flex-col xs:flex-row items-stretch xs:items-center justify-end gap-2.5 sm:gap-3">
                  {selectedProject.liveUrl && (
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold rounded-lg text-xs flex items-center justify-center gap-2"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                      <span>Open Live Website</span>
                    </a>
                  )}

                  <button
                    onClick={() => {
                      const type = selectedProject.demoType;
                      setSelectedProject(null);
                      handleLaunchSimulation(type);
                    }}
                    className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-xs flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Open Live Simulator</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
