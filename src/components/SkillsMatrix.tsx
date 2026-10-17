import { useState } from 'react';
import { Cpu, Database, Network, Wrench, Users, Search, Check, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolioData';
import { playCyberTone } from '../utils/sound';

export default function SkillsMatrix() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');

  const categories = PORTFOLIO_DATA.skillCategories;

  const categoryIcons: Record<string, typeof Cpu> = {
    'Programming & Full-Stack Web': Cpu,
    'Databases & Data Management': Database,
    'Networking & Protocol Diagnostics': Network,
    'CAD & Engineering Modeling': Wrench,
    'Professional Operations & Communication': Users,
  };

  const filteredCategories = categories
    .filter((cat) => (selectedCategory === 'ALL' ? true : cat.title === selectedCategory))
    .map((cat) => ({
      ...cat,
      skills: cat.skills.filter(
        (s) =>
          s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          s.note.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((cat) => cat.skills.length > 0);

  return (
    <section id="skills" className="py-14 sm:py-16 border-t border-slate-800/80 w-full">
      <div className="max-w-7xl mx-auto px-3 xs:px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 sm:pb-8 border-b border-slate-800">
          <div>
            <div className="text-[10px] xs:text-xs font-mono text-cyan-400 uppercase tracking-widest mb-1.5">
              Technical Competencies & Toolchain
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-extrabold text-white tracking-tight [text-wrap:balance]">
              Cross-Discipline Engineering Matrix
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-2 max-w-2xl">
              Spanning software development, network diagnostic protocols, database schemas, and CAD precision modeling.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills (e.g. Django, Wireshark)..."
              className="w-full pl-9 pr-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
          </div>
        </div>

        {/* Category Tabs (Responsive Scrollable) */}
        <div className="mt-5 sm:mt-6 flex items-center gap-1.5 p-1 bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-x-auto no-scrollbar max-w-full">
          <button
            onClick={() => {
              playCyberTone('click');
              setSelectedCategory('ALL');
            }}
            className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              selectedCategory === 'ALL'
                ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            All Categories
          </button>
          {categories.map((cat) => (
            <button
              key={cat.title}
              onClick={() => {
                playCyberTone('click');
                setSelectedCategory(cat.title);
              }}
              className={`px-2.5 xs:px-3 py-1.5 text-[11px] xs:text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === cat.title
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {cat.title}
            </button>
          ))}
        </div>

        {/* Skills Grid */}
        <div className="mt-6 sm:mt-8 space-y-6 sm:space-y-8">
          {filteredCategories.map((catGroup) => {
            const Icon = categoryIcons[catGroup.title] || Cpu;

            return (
              <div key={catGroup.title} className="bg-[#090f1d] border border-slate-800/80 rounded-2xl p-4 sm:p-6">
                <div className="flex items-center gap-2 pb-3.5 sm:pb-4 border-b border-slate-800/80">
                  <Icon className="w-4 h-4 sm:w-5 sm:h-5 text-cyan-400 shrink-0" />
                  <h3 className="text-sm sm:text-base font-bold text-white tracking-tight truncate">
                    {catGroup.title}
                  </h3>
                  <span className="text-[11px] sm:text-xs text-slate-500 font-mono ml-auto shrink-0">
                    {catGroup.skills.length} skills
                  </span>
                </div>

                <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-5">
                  {catGroup.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 sm:p-3.5 bg-[#060a14] border border-slate-800/80 hover:border-cyan-800/60 rounded-xl transition-all group"
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-white text-xs sm:text-sm group-hover:text-cyan-300 transition-colors truncate">
                          {skill.name}
                        </span>
                        <span className="text-[11px] sm:text-xs font-mono text-cyan-400 tabular-nums shrink-0">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Proficiency bar */}
                      <div className="w-full h-1 bg-slate-800 rounded-full mt-2 sm:mt-2.5 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        ></div>
                      </div>

                      <p className="mt-2 sm:mt-2.5 text-[10px] xs:text-[11px] text-slate-400 leading-relaxed">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
