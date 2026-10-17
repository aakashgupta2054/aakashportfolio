import { useState } from 'react';
import { Cloud, CloudOff, RefreshCw, DollarSign, Calendar, Users, ExternalLink, CheckCircle2 } from 'lucide-react';
import { playCyberTone } from '../../utils/sound';

export default function WorkmintSim() {
  const [synced, setSynced] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'payroll' | 'shifts'>('overview');
  const [syncing, setSyncing] = useState(false);

  const handleSyncToggle = () => {
    playCyberTone('click');
    setSyncing(true);
    setTimeout(() => {
      setSynced(!synced);
      setSyncing(false);
      playCyberTone('success');
    }, 700);
  };

  return (
    <div className="bg-[#0b1120] border border-cyan-900/40 rounded-xl overflow-hidden p-5 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <span className="w-2.5 h-2.5 bg-emerald-400 rounded-full"></span>
            WorkMint — Workforce Attendance & Payroll Engine
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Production SaaS platform built and deployed on Vercel by Aakash Gupta.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 sm:gap-3 w-full sm:w-auto">
          <button
            onClick={handleSyncToggle}
            className={`px-3 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-colors cursor-pointer ${
              synced
                ? 'bg-emerald-950/70 border-emerald-700/80 text-emerald-300'
                : 'bg-amber-950/70 border-amber-700/80 text-amber-300'
            }`}
          >
            {synced ? <Cloud className="w-3.5 h-3.5" /> : <CloudOff className="w-3.5 h-3.5" />}
            {syncing ? 'Syncing...' : synced ? 'Cloud: Online & Synced' : 'Offline Queue: 4 pending'}
          </button>

          <a
            href="https://workmints.vercel.app/"
            target="_blank"
            rel="noreferrer"
            onClick={() => playCyberTone('click')}
            className="px-3.5 py-1.5 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer shadow-sm ml-auto sm:ml-0"
          >
            <span>Visit Live App</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Interactive Tabs */}
      <div className="mt-4 flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto no-scrollbar max-w-full">
        <button
          onClick={() => {
            playCyberTone('click');
            setActiveTab('overview');
          }}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'overview' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Staff Attendance Overview
        </button>
        <button
          onClick={() => {
            playCyberTone('click');
            setActiveTab('payroll');
          }}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'payroll' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Automated Payroll Engine
        </button>
        <button
          onClick={() => {
            playCyberTone('click');
            setActiveTab('shifts');
          }}
          className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
            activeTab === 'shifts' ? 'bg-cyan-500 text-slate-950 font-semibold' : 'text-slate-400 hover:text-white'
          }`}
        >
          Shift Scheduling Matrix
        </button>
      </div>

      {/* Tab Panels */}
      <div className="mt-4">
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Total Active Staff</span>
                <Users className="w-4 h-4 text-cyan-400" />
              </div>
              <div className="text-2xl font-bold text-white font-mono mt-1">145</div>
              <div className="mt-2 text-xs text-emerald-400 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                132 Checked in today (91%)
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Punctuality Rate</span>
                <RefreshCw className="w-4 h-4 text-emerald-400" />
              </div>
              <div className="text-2xl font-bold text-emerald-400 font-mono mt-1">96.4%</div>
              <div className="mt-2 text-xs text-slate-400">
                Average clock-in delta: +4.2 mins
              </div>
            </div>

            <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>On Approved Leave</span>
                <Calendar className="w-4 h-4 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-amber-400 font-mono mt-1">8 Staff</div>
              <div className="mt-2 text-xs text-slate-400">
                5 Unexcused absences logged
              </div>
            </div>
          </div>
        )}

        {activeTab === 'payroll' && (
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
            <div className="flex flex-wrap items-center justify-between gap-2 pb-2 border-b border-slate-800">
              <span className="font-semibold text-white text-sm">Monthly Payroll Summary (Automated Calculation)</span>
              <span className="text-xs font-mono text-cyan-400">Formula: Base + Shift Allowances - Deductions</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
              <div className="p-3 bg-black/40 rounded-lg">
                <div className="text-xs text-slate-400">Total Gross Payroll</div>
                <div className="text-xl font-bold text-white font-mono mt-0.5">$345,670.80</div>
              </div>
              <div className="p-3 bg-black/40 rounded-lg">
                <div className="text-xs text-slate-400">Disbursed / Paid</div>
                <div className="text-xl font-bold text-emerald-400 font-mono mt-0.5">$321,520.60</div>
              </div>
              <div className="p-3 bg-black/40 rounded-lg">
                <div className="text-xs text-slate-400">Awaiting Approval</div>
                <div className="text-xl font-bold text-amber-400 font-mono mt-0.5">$24,150.20</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'shifts' && (
          <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
            <div className="text-xs text-slate-300 mb-3 font-semibold">
              Live Workforce Shift Slots (Synchronized to Cloud DB):
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="p-3 bg-cyan-950/40 border border-cyan-800/60 rounded-lg">
                <div className="text-xs font-bold text-cyan-300">Day Shift (09:00 - 17:00)</div>
                <div className="text-xs text-slate-300 mt-1">84 Personnel Assigned</div>
                <div className="text-[11px] text-emerald-400 mt-1">Full Coverage</div>
              </div>
              <div className="p-3 bg-indigo-950/40 border border-indigo-800/60 rounded-lg">
                <div className="text-xs font-bold text-indigo-300">Evening Shift (17:00 - 01:00)</div>
                <div className="text-xs text-slate-300 mt-1">42 Personnel Assigned</div>
                <div className="text-[11px] text-emerald-400 mt-1">Full Coverage</div>
              </div>
              <div className="p-3 bg-purple-950/40 border border-purple-800/60 rounded-lg">
                <div className="text-xs font-bold text-purple-300">Night Shift (01:00 - 09:00)</div>
                <div className="text-xs text-slate-300 mt-1">19 Personnel Assigned</div>
                <div className="text-[11px] text-emerald-400 mt-1">Full Coverage</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-4 pt-3 border-t border-slate-800/80 flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
        <span>Engineered with React, TypeScript, Tailwind CSS, offline caching, and Vercel edge deployment.</span>
        <span className="font-mono text-cyan-400">workmints.vercel.app</span>
      </div>
    </div>
  );
}
