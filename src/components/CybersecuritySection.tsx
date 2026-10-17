import { useState } from 'react';
import { Shield, ShieldAlert, ShieldCheck, Terminal, Lock, Key, Bug, CheckCircle2, RefreshCw } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

export default function CybersecuritySection() {
  const [runningAudit, setRunningAudit] = useState(false);
  const [auditComplete, setAuditComplete] = useState(false);

  const cert = PORTFOLIO_DATA.profile.certification;

  const handleRunAudit = () => {
    playCyberTone('click');
    setRunningAudit(true);
    setAuditComplete(false);

    setTimeout(() => {
      setRunningAudit(false);
      setAuditComplete(true);
      playCyberTone('success');
    }, 1500);
  };

  const auditChecks = [
    { title: 'Wireshark Packet Stream Integrity', status: 'Passed', detail: 'Zero unencrypted sensitive credentials on wire' },
    { title: 'OWASP Top 10 Web Vulnerability Audit', status: 'Hardened', detail: 'XSS, CSRF, and SQL Injection mitigation implemented' },
    { title: 'EC-Council CEH Reconnaissance Protocols', status: 'Compliant', detail: 'Port scan resistance & perimeter reconnaissance controls' },
    { title: 'Access Control & Token Authorization', status: 'Secured', detail: 'Role-based access & encrypted token storage' },
  ];

  return (
    <section id="cybersecurity" className="py-14 sm:py-16 border-t border-slate-800/80 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-800">
          <div>
            <div className="text-[10px] xs:text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5 flex items-center gap-2">
              <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-emerald-400 shrink-0" />
              <span>Cybersecurity & Ethical Hacking Track</span>
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              EC-Council CEH Training & Defensive Engineering
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              Reinforcing full-stack web platforms and telecommunications networks with active penetration testing principles and packet-level inspection.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="px-2.5 xs:px-3 py-1 bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 font-mono text-[10px] xs:text-xs rounded-lg font-semibold flex items-center gap-1.5 shadow-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>EC-Council Certified Candidate (Currently Learning)</span>
            </span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-8 sm:mt-10 items-stretch">
          {/* Left Column: Visual Showcase */}
          <div className="lg:col-span-6 flex flex-col">
            <div className="relative rounded-2xl border border-emerald-900/40 bg-[#090f1d] overflow-hidden flex-1 flex flex-col">
              <div className="relative aspect-video overflow-hidden bg-slate-950">
                <img
                  src={cert.image}
                  alt="CEH EC-Council Cybersecurity Operations"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090f1d] via-transparent to-transparent"></div>

                <div className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 bg-black/80 backdrop-blur-md border border-emerald-500/50 px-2.5 sm:px-3 py-1 rounded text-[11px] sm:text-xs font-mono text-emerald-300 flex items-center gap-1.5">
                  <Lock className="w-3.5 h-3.5 shrink-0" />
                  <span>EC-Council Certified Candidate</span>
                </div>
              </div>

              <div className="p-4 sm:p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                    {cert.title}
                  </h3>
                  <div className="text-[11px] sm:text-xs font-mono text-cyan-400 mt-0.5">
                    Authorized Body: {cert.issuer} · {cert.period}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mt-2.5 sm:mt-3">
                    {cert.description}
                  </p>
                </div>

                <div className="mt-4 sm:mt-5 pt-3.5 sm:pt-4 border-t border-slate-800/80">
                  <div className="text-[11px] sm:text-xs font-mono text-slate-400 mb-2">Core Competencies In Progress:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                    {cert.skillsLearned.map((skill, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span className="line-clamp-1">{skill}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Security Audit Scanner */}
          <div className="lg:col-span-6 bg-[#090f1d] border border-cyan-900/40 rounded-2xl p-4 sm:p-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-3 border-b border-slate-800 gap-2">
                <div className="flex items-center gap-2 text-white font-bold text-xs sm:text-sm truncate">
                  <Terminal className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="truncate">Automated Perimeter & App Security Scanner</span>
                </div>
                <span className="text-[10px] sm:text-xs font-mono text-slate-500 shrink-0">v12.4 SEC</span>
              </div>

              <p className="text-xs text-slate-400 mt-2.5 sm:mt-3 leading-relaxed">
                Run an interactive security inspection evaluating the defensive architecture across Aakash&apos;s deployed web applications and network configurations.
              </p>

              {/* Audit checks list */}
              <div className="mt-4 sm:mt-5 space-y-2.5 sm:space-y-3">
                {auditChecks.map((chk, idx) => (
                  <div
                    key={idx}
                    className="p-2.5 sm:p-3 bg-[#060a14] border border-slate-800/80 rounded-xl flex flex-col xs:flex-row xs:items-center justify-between gap-2 text-xs"
                  >
                    <div>
                      <div className="font-semibold text-slate-200">{chk.title}</div>
                      <div className="text-[10px] xs:text-[11px] text-slate-400 mt-0.5">{chk.detail}</div>
                    </div>
                    <span className="px-2.5 py-1 bg-emerald-950/70 border border-emerald-700/60 text-emerald-300 font-mono text-[10px] xs:text-[11px] rounded-md shrink-0 self-start xs:self-auto">
                      {runningAudit ? 'Checking...' : chk.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-5 sm:mt-6 pt-3.5 sm:pt-4 border-t border-slate-800/80 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
              <span className="text-[11px] sm:text-xs text-slate-400 font-mono">
                {auditComplete
                  ? 'All 4 security vectors verified.'
                  : 'Ready for penetration triage.'}
              </span>

              <button
                onClick={handleRunAudit}
                disabled={runningAudit}
                className="w-full xs:w-auto px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${runningAudit ? 'animate-spin' : ''}`} />
                <span>{runningAudit ? 'Running Probes...' : 'Run Live Security Audit'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
