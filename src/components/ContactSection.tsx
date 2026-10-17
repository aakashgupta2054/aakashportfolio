import { useState, FormEvent } from 'react';
import { Mail, Phone, MapPin, Github, Send, Copy, Check, MessageSquare, ExternalLink, CheckCircle2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

interface ContactSectionProps {
  onOpenEmailModal: () => void;
  onOpenResumeModal: () => void;
}

export default function ContactSection({ onOpenEmailModal, onOpenResumeModal }: ContactSectionProps) {
  const [copiedType, setCopiedType] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, type: string) => {
    playCyberTone('click');
    navigator.clipboard.writeText(text);
    setCopiedType(type);
    playCyberTone('success');
    setTimeout(() => setCopiedType(null), 2500);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    playCyberTone('success');
    setSubmitted(true);

    // Open mailto with the typed content
    const mailto = `mailto:${PORTFOLIO_DATA.profile.email}?subject=${encodeURIComponent(
      formData.subject || `Inquiry from ${formData.name}`
    )}&body=${encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    )}`;
    window.location.href = mailto;

    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 4000);
  };

  return (
    <section id="contact" className="py-14 sm:py-16 border-t border-slate-800/80 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="pb-6 sm:pb-8 border-b border-slate-800">
          <div className="text-[10px] xs:text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
            Direct Communication & Inquiries
          </div>
          <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
            Initiate Contact with Aakash Gupta
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
            Available for software developer roles, technical interviews, and web engineering projects. Reach out via email, phone, or instant professional dispatch.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 mt-8 sm:mt-10">
          {/* Left Column: Direct Contact Cards */}
          <div className="lg:col-span-5 space-y-3 sm:space-y-4">
            {/* Email Card */}
            <div className="p-3.5 sm:p-4 bg-[#090f1d] border border-slate-800/80 rounded-xl hover:border-cyan-800/70 transition-all flex flex-wrap xs:flex-nowrap items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 bg-cyan-950/60 border border-cyan-800/80 rounded-lg text-cyan-400 shrink-0">
                  <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] xs:text-xs text-slate-400 font-mono">Email Address</div>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors break-all"
                  >
                    {PORTFOLIO_DATA.profile.email}
                  </a>
                </div>
              </div>
              <button
                onClick={() => handleCopy(PORTFOLIO_DATA.profile.email, 'email')}
                className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer shrink-0 ml-auto xs:ml-0"
                title="Copy email"
              >
                {copiedType === 'email' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>

            {/* Phone & WhatsApp Card */}
            <div className="p-3.5 sm:p-4 bg-[#090f1d] border border-slate-800/80 rounded-xl hover:border-cyan-800/70 transition-all flex flex-wrap xs:flex-nowrap items-center justify-between gap-2.5 sm:gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 bg-cyan-950/60 border border-cyan-800/80 rounded-lg text-cyan-400 shrink-0">
                  <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] xs:text-xs text-slate-400 font-mono">Phone / WhatsApp</div>
                  <a
                    href={`tel:${PORTFOLIO_DATA.profile.phone}`}
                    className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors"
                  >
                    {PORTFOLIO_DATA.profile.phone}
                  </a>
                </div>
              </div>
              <div className="flex items-center gap-1.5 shrink-0 ml-auto xs:ml-0">
                <a
                  href={`https://wa.me/${PORTFOLIO_DATA.profile.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="px-2 xs:px-2.5 py-1 bg-emerald-950/80 border border-emerald-700/80 text-emerald-300 hover:bg-emerald-900 rounded text-xs transition-colors cursor-pointer"
                  title="Chat on WhatsApp"
                >
                  WhatsApp
                </a>
                <button
                  onClick={() => handleCopy(PORTFOLIO_DATA.profile.phone, 'phone')}
                  className="p-1.5 sm:p-2 text-slate-400 hover:text-cyan-400 rounded-lg border border-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                  title="Copy phone"
                >
                  {copiedType === 'phone' ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* GitHub Card */}
            <div className="p-3.5 sm:p-4 bg-[#090f1d] border border-slate-800/80 rounded-xl hover:border-cyan-800/70 transition-all flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 bg-cyan-950/60 border border-cyan-800/80 rounded-lg text-cyan-400 shrink-0">
                  <Github className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] xs:text-xs text-slate-400 font-mono">GitHub Profile</div>
                  <a
                    href={PORTFOLIO_DATA.profile.github}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-cyan-400 transition-colors flex items-center gap-1 truncate"
                  >
                    <span className="truncate">github.com/{PORTFOLIO_DATA.profile.githubUser}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Instagram Card */}
            <div className="p-3.5 sm:p-4 bg-[#090f1d] border border-slate-800/80 rounded-xl hover:border-pink-800/70 transition-all flex items-center justify-between gap-3">
              <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
                <div className="p-2 sm:p-2.5 bg-pink-950/60 border border-pink-800/80 rounded-lg text-pink-400 shrink-0">
                  <span className="text-sm sm:text-base font-bold font-mono">IG</span>
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] xs:text-xs text-slate-400 font-mono">Instagram</div>
                  <a
                    href={PORTFOLIO_DATA.profile.instagram}
                    target="_blank"
                    rel="noreferrer"
                    className="text-xs sm:text-sm font-semibold text-white hover:text-pink-400 transition-colors flex items-center gap-1 truncate"
                  >
                    <span className="truncate">@{PORTFOLIO_DATA.profile.instagramUser}</span>
                    <ExternalLink className="w-3.5 h-3.5 shrink-0" />
                  </a>
                </div>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-3.5 sm:p-4 bg-[#090f1d] border border-slate-800/80 rounded-xl flex items-center gap-2.5 sm:gap-3">
              <div className="p-2 sm:p-2.5 bg-cyan-950/60 border border-cyan-800/80 rounded-lg text-cyan-400 shrink-0">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <div className="min-w-0">
                <div className="text-[10px] xs:text-xs text-slate-400 font-mono">Current Base</div>
                <div className="text-xs sm:text-sm font-semibold text-white truncate">
                  {PORTFOLIO_DATA.profile.location} (Open to Remote)
                </div>
              </div>
            </div>

            {/* Pre-formatted Email Generator Trigger */}
            <div className="p-3.5 sm:p-4 bg-gradient-to-br from-cyan-950/50 to-slate-900 border border-cyan-800/60 rounded-xl">
              <h4 className="text-xs sm:text-sm font-bold text-white flex items-center gap-2">
                <MessageSquare className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>Need an Interview or Project Brief?</span>
              </h4>
              <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                Use the automated email composer to draft a structured invitation or consultation request with 1 click.
              </p>
              <button
                onClick={() => {
                  playCyberTone('click');
                  onOpenEmailModal();
                }}
                className="mt-3 w-full py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-xs transition-colors cursor-pointer"
              >
                Launch Professional Email Composer
              </button>
            </div>
          </div>

          {/* Right Column: Direct Message Form */}
          <div className="lg:col-span-7 bg-[#0b1222] border border-cyan-900/40 rounded-2xl p-4 sm:p-6 lg:p-8">
            <h3 className="text-base sm:text-xl font-bold text-white mb-1.5">
              Send a Direct Message
            </h3>
            <p className="text-xs text-slate-400 mb-5 sm:mb-6">
              Submissions automatically route to Aakash&apos;s direct mailbox: <span className="font-mono text-cyan-400 break-all">{PORTFOLIO_DATA.profile.email}</span>
            </p>

            {submitted && (
              <div className="mb-4 p-3 bg-emerald-950/60 border border-emerald-700/80 rounded-lg text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                Message prepared. Opening your mail client for delivery confirmation...
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 sm:gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ananya Roy"
                    className="w-full px-3 sm:px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs sm:text-sm"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1.5">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. ananya@company.com"
                    className="w-full px-3 sm:px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs sm:text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Subject / Topic
                </label>
                <input
                  type="text"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  placeholder="e.g. Interview for Python Developer Role / Project Consultation"
                  className="w-full px-3 sm:px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs sm:text-sm"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1.5">
                  Message *
                </label>
                <textarea
                  required
                  rows={4}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Share details about the role, technical requirements, or schedule a quick chat..."
                  className="w-full px-3 sm:px-3.5 py-2.5 bg-slate-900 border border-slate-800 rounded-lg text-white focus:outline-none focus:border-cyan-500 text-xs sm:text-sm resize-none"
                />
              </div>

              <div className="pt-2 flex flex-col xs:flex-row items-stretch xs:items-center justify-between gap-3">
                <span className="text-[10px] xs:text-[11px] text-slate-500 font-mono">
                  Direct dispatch to Aakash Gupta
                </span>

                <button
                  type="submit"
                  className="w-full xs:w-auto px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold rounded-lg text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <Send className="w-4 h-4 shrink-0" />
                  <span>Send Direct Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

