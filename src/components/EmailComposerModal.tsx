import { useState } from 'react';
import { X, Copy, Check, Send, Sparkles, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

interface EmailComposerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type TemplateType = 'interview' | 'project' | 'network' | 'collab';

export default function EmailComposerModal({ isOpen, onClose }: EmailComposerModalProps) {
  const [template, setTemplate] = useState<TemplateType>('interview');
  const [senderName, setSenderName] = useState('');
  const [senderCompany, setSenderCompany] = useState('');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const templates: Record<TemplateType, { title: string; subject: string; body: string }> = {
    interview: {
      title: 'Interview Invitation',
      subject: `Interview Opportunity: AI-Assisted Software Developer — ${senderCompany || 'Our Team'}`,
      body: `Hi Aakash,\n\nI reviewed your portfolio and engineering experience with Python/Django, telecom network operations at Reliance Jio, and rapid full-stack delivery with Google AI Studio.\n\nWe are currently hiring for a Software Engineer role at ${senderCompany || '[Company Name]'} and would like to schedule an introductory technical discussion with you.\n\nPlease let me know your availability for a 20-minute call over the coming days.\n\nBest regards,\n${senderName || '[Your Name]'}\n${senderCompany || '[Your Company]'}`,
    },
    project: {
      title: 'Django / Web Project Inquiry',
      subject: `Project Inquiry: Full-Stack Web Development for ${senderCompany || '[Organization]'}`,
      body: `Hello Aakash,\n\nI came across your School Management Web Application and biometric attendance system built with Django. We have an upcoming web development initiative and would like to consult with you on architectural planning and implementation.\n\nCould we arrange a brief technical consultation to discuss project scope and milestones?\n\nSincerely,\n${senderName || '[Your Name]'}\n${senderCompany || '[Your Company]'}`,
    },
    network: {
      title: 'Network Operations Consultation',
      subject: `Technical Consultation: LAN/WAN & Wireshark Diagnostics`,
      body: `Hi Aakash,\n\nI noticed your hands-on background as an SDA Engineer with Reliance Jio Infocomm Ltd diagnosing network bottlenecks and conducting Wireshark packet-level analysis.\n\nWe have an infrastructure optimization challenge and would value your expertise in network reliability and diagnostics.\n\nBest,\n${senderName || '[Your Name]'}`,
    },
    collab: {
      title: 'General Technical Connection',
      subject: `Connecting with Aakash Gupta: Tech & AI-Assisted Development`,
      body: `Dear Aakash,\n\nI came across your work in AI-assisted development and mechanical CAD engineering. I'd love to connect, exchange thoughts on Google AI Studio workflows, and discuss potential synergies.\n\nLooking forward to speaking!\n\nWarm regards,\n${senderName || '[Your Name]'}`,
    },
  };

  const currentEmail = templates[template];

  const handleCopy = () => {
    playCyberTone('click');
    const fullText = `Subject: ${currentEmail.subject}\nTo: ${PORTFOLIO_DATA.profile.email}\n\n${currentEmail.body}`;
    navigator.clipboard.writeText(fullText);
    setCopied(true);
    playCyberTone('success');
    setTimeout(() => setCopied(false), 2500);
  };

  const handleMailto = () => {
    playCyberTone('success');
    const mailtoUrl = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(
      currentEmail.subject
    )}&body=${encodeURIComponent(currentEmail.body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-[#0b1222] border border-cyan-800/80 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92dvh] sm:max-h-[88vh] flex flex-col text-sm">
        {/* Header */}
        <div className="px-4 sm:px-6 py-3 sm:py-4 bg-[#080d19] border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-cyan-400 shrink-0" />
            <h3 className="font-semibold text-white text-xs sm:text-sm">Professional Email Composer</h3>
          </div>
          <button
            onClick={() => {
              playCyberTone('click');
              onClose();
            }}
            className="p-1 text-slate-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>

        <div className="p-3.5 sm:p-6 space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          <p className="text-xs text-slate-300">
            Aakash is recognized for strong written communication and executive email writing. Select an inquiry template below or personalize it to initiate contact directly.
          </p>

          {/* Template Tabs (Responsive Scrollable) */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto no-scrollbar max-w-full shrink-0">
            {(Object.keys(templates) as TemplateType[]).map((key) => (
              <button
                key={key}
                onClick={() => {
                  playCyberTone('click');
                  setTemplate(key);
                }}
                className={`px-2.5 xs:px-3 py-1.5 rounded-md font-medium text-[11px] xs:text-xs transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                  template === key
                    ? 'bg-cyan-500 text-slate-950 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {templates[key].title}
              </button>
            ))}
          </div>

          {/* Personalization Inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-slate-400 font-medium block mb-1">Your Name</label>
              <input
                type="text"
                placeholder="e.g. Vikram Malhotra"
                value={senderName}
                onChange={(e) => setSenderName(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs sm:text-sm"
              />
            </div>
            <div>
              <label className="text-slate-400 font-medium block mb-1">Company / Organization</label>
              <input
                type="text"
                placeholder="e.g. TechCorp Solutions"
                value={senderCompany}
                onChange={(e) => setSenderCompany(e.target.value)}
                className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs sm:text-sm"
              />
            </div>
          </div>

          {/* Subject Preview */}
          <div className="p-2.5 bg-slate-900/90 border border-slate-800 rounded-lg text-xs">
            <span className="text-slate-400 font-mono">Subject: </span>
            <span className="text-cyan-300 font-medium break-all">{currentEmail.subject}</span>
          </div>

          {/* Body Preview */}
          <div className="relative">
            <textarea
              readOnly
              rows={6}
              value={currentEmail.body}
              className="w-full p-2.5 sm:p-3 bg-[#060a14] border border-slate-800 rounded-lg font-mono text-[11px] sm:text-xs text-slate-300 leading-relaxed focus:outline-none resize-none"
            />
          </div>

          {/* Action Row */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            <div className="text-[11px] sm:text-xs text-slate-400 font-mono break-all">
              To: {PORTFOLIO_DATA.profile.email}
            </div>

            <div className="flex flex-col xs:flex-row items-stretch xs:items-center gap-2">
              <button
                onClick={handleCopy}
                className="w-full xs:w-auto px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy Email Text'}</span>
              </button>

              <button
                onClick={handleMailto}
                className="w-full xs:w-auto px-4 py-2 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium flex items-center justify-center gap-1.5 transition-colors cursor-pointer shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Open In Email App</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

