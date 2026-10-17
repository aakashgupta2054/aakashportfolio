import { useRef } from 'react';
import { X, Printer, Download, Mail, Phone, MapPin, Github, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  const printRef = useRef<HTMLDivElement>(null);

  if (!isOpen) return null;

  const handlePrint = () => {
    playCyberTone('click');
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-white text-slate-900 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[88vh] flex flex-col">
        {/* Modal Top Control Bar (Hidden when printing) */}
        <div className="print:hidden bg-slate-900 text-white px-3 sm:px-6 py-2.5 sm:py-3.5 flex items-center justify-between border-b border-slate-800 gap-2 shrink-0">
          <div className="flex items-center gap-1.5 sm:gap-2 truncate">
            <span className="font-semibold text-xs sm:text-sm truncate">Aakash Gupta — CV</span>
            <span className="text-[10px] sm:text-xs text-cyan-400 font-mono shrink-0 hidden xs:inline">B.Tech CSE</span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              onClick={handlePrint}
              className="px-2.5 sm:px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span><span className="hidden xs:inline">Print / </span>Save PDF</span>
            </button>
            <button
              onClick={() => {
                playCyberTone('click');
                onClose();
              }}
              className="p-1 sm:p-1.5 text-slate-400 hover:text-white rounded-lg transition-colors cursor-pointer"
              title="Close modal"
            >
              <X className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>

        {/* Resume Document Body */}
        <div ref={printRef} className="p-3 xs:p-5 sm:p-8 md:p-12 overflow-y-auto font-sans leading-relaxed text-slate-800 bg-white flex-1">
          {/* Header */}
          <div className="border-b border-slate-300 pb-3.5 sm:pb-6">
            <h1 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-slate-950 tracking-tight uppercase">
              AAKASH GUPTA
            </h1>
            <p className="text-sm sm:text-base font-semibold text-cyan-700 mt-0.5 sm:mt-1">
              Full-Stack Software Engineer & Cybersecurity Practitioner
            </p>

            <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[11px] sm:text-xs text-slate-600 mt-2.5 sm:mt-3 font-medium">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>Delhi NCR, India</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Phone className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>+91 7303267461</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1 break-all">
                <Mail className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>aakashgupta2054@gmail.com</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <Github className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span>github.com/aakashgupta2054</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1">
                <span className="font-bold text-pink-600">IG:</span>
                <span>@aakashgupta2054</span>
              </span>
            </div>
          </div>

          {/* Career Objective */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              CAREER OBJECTIVE
            </h2>
            <p className="text-xs text-slate-700 leading-relaxed">
              Full-Stack Software Developer with a B.Tech in Computer Science and hands-on experience across Python/Django, modern web architectures, network operations, customer communication, and mechanical design. Actively pursuing Certified Ethical Hacker (CEH) certification from EC-Council to reinforce web and network systems with high-level cybersecurity defenses. Skilled in building reliable production web applications, progressive web apps (PWAs), and scalable automation with Google AI Studio.
            </p>
          </div>

          {/* Key Production Projects */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              KEY PRODUCTION WEB APPLICATIONS & LIVE DEPLOYMENTS
            </h2>
            <div className="space-y-3 text-xs text-slate-700">
              <div>
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>WorkMint — Attendance & Payroll Management SaaS</span>
                  <span className="font-mono text-cyan-700 font-normal">workmints.vercel.app</span>
                </div>
                <p className="mt-0.5 text-slate-600">
                  Engineered workforce platform with shift scheduling (day/evening/night), automated payroll calculation engine, cloud sync with offline fallback, and staff attendance analytics.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between font-bold text-slate-900">
                  <span>Attendly — Modern Attendance Tracker PWA</span>
                  <span className="font-mono text-cyan-700 font-normal">attendly-bay.vercel.app</span>
                </div>
                <p className="mt-0.5 text-slate-600">
                  Developed responsive mobile-first Progressive Web App with interactive calendar matrix, target attendance percentage dials, and subject analytics.
                </p>
              </div>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              SKILLS
            </h2>
            <div className="space-y-1.5 text-xs text-slate-700">
              <div>
                <strong className="text-slate-900">Programming and Web:</strong> Python, Django, HTML, CSS, JavaScript, jQuery, AJAX
              </div>
              <div>
                <strong className="text-slate-900">Databases:</strong> MySQL, SQLite
              </div>
              <div>
                <strong className="text-slate-900">Networking:</strong> LAN/WAN Troubleshooting, Network Connectivity, Wireshark
              </div>
              <div>
                <strong className="text-slate-900">Mechanical Design:</strong> AutoCAD, SolidWorks, 2D/3D Engine Part Modeling
              </div>
              <div>
                <strong className="text-slate-900">Professional:</strong> Email Writing, Customer Call Handling, Effective Communication, Organization, Team Collaboration
              </div>
            </div>
          </div>

          {/* Work Experience */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-3">
              WORK EXPERIENCE
            </h2>

            <div className="space-y-5">
              {/* Role 1 */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Mechanical Design Engineer <span className="font-normal text-slate-600">| Saficon Fab System Pvt Ltd, India</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-600">Sep 2025 - Sep 2026</span>
                </div>
                <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                  <li>Prepared 2D drawings and 3D models of Indian Railway engine parts using AutoCAD and SolidWorks.</li>
                  <li>Developed accurate, manufacturing-ready part drawings meeting railway specifications and standards.</li>
                  <li>Wrote clear professional emails and handled customer calls to share updates and resolve queries.</li>
                </ul>
              </div>

              {/* Role 2 */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Assistant Manager (SDA Engineer) <span className="font-normal text-slate-600">| Reliance Jio Infocomm Ltd, Mysore, India</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-600">Feb 2024 - Aug 2025</span>
                </div>
                <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                  <li>Performed network troubleshooting for LAN/WAN connectivity issues, ensuring stable and reliable internet delivery.</li>
                  <li>Used Wireshark for packet-level analysis to diagnose and resolve network connectivity problems.</li>
                  <li>Coordinated with cross-functional teams to ensure smooth delivery of new internet connections.</li>
                  <li>Conducted site surveys and inspections to assess network readiness before deployment.</li>
                  <li>Maintained accurate daily reports and trackers using Excel and BI tools.</li>
                  <li>Handled customer calls and wrote professional emails to customers, sales teams and internal departments for updates and issue resolution.</li>
                  <li>Dispatched field engineers for technical support and ensured timely closure of issues.</li>
                  <li>Utilized SharePoint for documentation and project status updates; escalated delays and provided progress reports to stakeholders.</li>
                </ul>
              </div>

              {/* Role 3 */}
              <div>
                <div className="flex flex-wrap items-baseline justify-between">
                  <h3 className="text-sm font-bold text-slate-900">
                    Software Engineer <span className="font-normal text-slate-600">| View My Records, Bangalore, India</span>
                  </h3>
                  <span className="text-xs font-semibold text-slate-600">Sep 2023 - Feb 2024</span>
                </div>
                <ul className="mt-1.5 list-disc list-outside pl-4 space-y-1 text-xs text-slate-700">
                  <li>Designed and developed a School Management Web Application using Python, Django, SQLite, HTML, CSS, jQuery and AJAX.</li>
                  <li>Built an Attendance Module with face verification via camera and location tracking to prevent proxy attendance.</li>
                  <li>Implemented Examination and Result Module for marks entry, automated result generation and report cards.</li>
                  <li>Enabled PDF/Excel export of results, attendance and performance reports.</li>
                  <li>Developed an integrated Helpdesk System in Django for support ticket management.</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Education & Certifications */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-2">
              EDUCATION & PROFESSIONAL CERTIFICATIONS
            </h2>
            <div className="space-y-3 text-xs text-slate-800">
              <div className="flex flex-wrap items-baseline justify-between">
                <div>
                  <strong className="text-slate-900">B.Tech, Computer Science and Engineering</strong> | Sanskriti University
                </div>
                <span className="font-semibold text-slate-600">2019 - 2023 | First Division (68%)</span>
              </div>

              <div className="flex flex-wrap items-baseline justify-between pt-1">
                <div>
                  <strong className="text-slate-900">Certified Ethical Hacker (CEH v12)</strong> | EC-Council
                  <span className="text-emerald-700 ml-2 font-medium">(Currently Learning from EC-Council)</span>
                </div>
                <span className="font-semibold text-slate-600">Active Learning Track</span>
              </div>
            </div>
          </div>

          {/* Languages */}
          <div className="mt-6">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1 mb-1">
              LANGUAGES
            </h2>
            <p className="text-xs text-slate-700">
              English, Hindi
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
