import { useState } from 'react';
import { Calendar, CheckCircle2, XCircle, Target, ExternalLink, Smartphone } from 'lucide-react';
import { playCyberTone } from '../../utils/sound';

export default function AttendlySim() {
  const [days, setDays] = useState([
    { day: 1, status: 'present' },
    { day: 2, status: 'present' },
    { day: 3, status: 'present' },
    { day: 4, status: 'absent' },
    { day: 5, status: 'present' },
    { day: 6, status: 'present' },
    { day: 7, status: 'present' },
    { day: 8, status: 'present' },
    { day: 9, status: 'present' },
    { day: 10, status: 'absent' },
    { day: 11, status: 'present' },
    { day: 12, status: 'present' },
    { day: 13, status: 'present' },
    { day: 14, status: 'present' },
  ]);

  const presentCount = days.filter((d) => d.status === 'present').length;
  const totalCount = days.length;
  const currentPercentage = Math.round((presentCount / totalCount) * 100);
  const targetGoal = 85;

  const toggleDayStatus = (index: number) => {
    playCyberTone('click');
    setDays((prev) =>
      prev.map((item, idx) => {
        if (idx === index) {
          return {
            ...item,
            status: item.status === 'present' ? 'absent' : 'present',
          };
        }
        return item;
      })
    );
  };

  return (
    <div className="bg-[#0b1120] border border-cyan-900/40 rounded-xl overflow-hidden p-3 xs:p-4 sm:p-5 text-sm w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
            <Smartphone className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Attendly — PWA Attendance Matrix & Goal Engine</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Click any calendar day below to toggle Present/Absent and watch the Target Dial update live!
          </p>
        </div>

        <a
          href="https://attendly-bay.vercel.app/"
          target="_blank"
          rel="noreferrer"
          onClick={() => playCyberTone('click')}
          className="px-3 xs:px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm w-full xs:w-auto justify-center"
        >
          <span>Visit Live Attendly PWA</span>
          <ExternalLink className="w-3.5 h-3.5 shrink-0" />
        </a>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 mt-4 sm:mt-5">
        {/* Left: Interactive Calendar Grid */}
        <div className="lg:col-span-8 bg-[#070b14] border border-slate-800 rounded-xl p-3 sm:p-4">
          <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-slate-800 text-xs text-slate-300">
            <span className="font-semibold flex items-center gap-2">
              <Calendar className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
              <span>Attendance Grid</span>
            </span>
            <div className="flex items-center gap-2 sm:gap-3 font-mono text-[10px] sm:text-[11px]">
              <span className="flex items-center gap-1 text-emerald-400">
                <CheckCircle2 className="w-3 h-3" /> Present ({presentCount})
              </span>
              <span className="flex items-center gap-1 text-rose-400">
                <XCircle className="w-3 h-3" /> Absent ({totalCount - presentCount})
              </span>
            </div>
          </div>

          {/* Day Matrix Buttons */}
          <div className="grid grid-cols-7 gap-1 sm:gap-2 mt-3.5 sm:mt-4 text-center">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((dayName) => (
              <span key={dayName} className="text-[9px] xs:text-[10px] sm:text-[11px] font-mono text-slate-500 uppercase pb-1">
                {dayName}
              </span>
            ))}

            {days.map((item, idx) => {
              const isPresent = item.status === 'present';
              return (
                <button
                  key={idx}
                  onClick={() => toggleDayStatus(idx)}
                  className={`p-1 xs:p-1.5 sm:p-2.5 rounded sm:rounded-lg border text-[10px] sm:text-xs font-mono font-medium transition-all cursor-pointer flex flex-col items-center justify-center gap-0.5 sm:gap-1 min-h-[36px] xs:min-h-[40px] sm:min-h-[44px] ${
                    isPresent
                      ? 'bg-emerald-950/40 border-emerald-700/60 text-emerald-300 hover:bg-emerald-900/60'
                      : 'bg-rose-950/40 border-rose-700/60 text-rose-300 hover:bg-rose-900/60'
                  }`}
                  title={`Day ${item.day}: Click to toggle`}
                >
                  <span className="text-[9px] sm:text-[11px] text-slate-400 leading-none">{item.day}</span>
                  {isPresent ? (
                    <CheckCircle2 className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-emerald-400" />
                  ) : (
                    <XCircle className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-rose-400" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800/80 text-xs text-slate-400 flex items-center justify-between">
            <span>Tap any date slot to change state</span>
            <span className="text-cyan-400 font-mono">PWA Offline-Ready</span>
          </div>
        </div>

        {/* Right: Dynamic Goal Target Dial */}
        <div className="lg:col-span-4 bg-[#070b14] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs mb-3">
              <Target className="w-4 h-4" />
              <span>ACADEMIC GOAL DIAL</span>
            </div>

            <div className="text-center py-4">
              <div className="text-4xl font-extrabold font-mono text-white tracking-tight">
                {currentPercentage}%
              </div>
              <div className="text-xs text-slate-400 mt-1">
                Target Threshold: <strong className="text-white">{targetGoal}%</strong>
              </div>

              <div className="w-full bg-slate-800 h-2 rounded-full mt-4 overflow-hidden">
                <div
                  className={`h-full transition-all duration-500 rounded-full ${
                    currentPercentage >= targetGoal ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                  style={{ width: `${Math.min(currentPercentage, 100)}%` }}
                ></div>
              </div>

              <div className="mt-3 text-xs">
                {currentPercentage >= targetGoal ? (
                  <span className="text-emerald-400 font-medium">
                    ✓ Goal Achieved: Safe for Semester Exams!
                  </span>
                ) : (
                  <span className="text-amber-400 font-medium">
                    ⚠ Warning: Need {Math.ceil((targetGoal * totalCount - 100 * presentCount) / (100 - targetGoal))} more consecutive attendances.
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="pt-3 border-t border-slate-800 text-xs text-slate-400">
            Deployed on Vercel: <span className="text-slate-200 font-mono">attendly-bay.vercel.app</span>
          </div>
        </div>
      </div>
    </div>
  );
}
