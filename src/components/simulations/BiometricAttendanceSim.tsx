import { useState, useEffect } from 'react';
import { Camera, MapPin, CheckCircle2, AlertTriangle, RefreshCw, FileSpreadsheet, FileText, UserCheck, ShieldAlert } from 'lucide-react';
import { playCyberTone } from '../../utils/sound';

interface Student {
  id: string;
  name: string;
  grade: string;
  avatarSeed: string;
  verified: boolean;
  distanceMeters: number;
  confidence: number;
}

export default function BiometricAttendanceSim() {
  const [students, setStudents] = useState<Student[]>([
    { id: 'STU-1042', name: 'Aarav Sharma', grade: 'Class 10-A', avatarSeed: 'Aarav', verified: true, distanceMeters: 14, confidence: 99.4 },
    { id: 'STU-1043', name: 'Priya Patel', grade: 'Class 10-A', avatarSeed: 'Priya', verified: true, distanceMeters: 22, confidence: 98.7 },
    { id: 'STU-1044', name: 'Rohan Verma', grade: 'Class 10-B', avatarSeed: 'Rohan', verified: false, distanceMeters: 380, confidence: 71.2 },
  ]);

  const [activeStudent, setActiveStudent] = useState<Student>(students[0]);
  const [scanning, setScanning] = useState(false);
  const [scanResult, setScanResult] = useState<'success' | 'failed' | null>('success');
  const [exportedStatus, setExportedStatus] = useState<string | null>(null);

  const campusRadiusMeters = 50;

  const handleTriggerScan = () => {
    playCyberTone('click');
    setScanning(true);
    setScanResult(null);

    setTimeout(() => {
      const isWithinGeofence = activeStudent.distanceMeters <= campusRadiusMeters;
      const isBiometricMatch = activeStudent.confidence >= 90;
      const success = isWithinGeofence && isBiometricMatch;

      setScanning(false);
      setScanResult(success ? 'success' : 'failed');
      if (success) {
        playCyberTone('success');
      } else {
        playCyberTone('blip');
      }

      setStudents((prev) =>
        prev.map((s) => (s.id === activeStudent.id ? { ...s, verified: success } : s))
      );
    }, 1200);
  };

  const handleExport = (type: 'pdf' | 'excel') => {
    playCyberTone('click');
    setExportedStatus(`Generating ${type.toUpperCase()} attendance payload...`);
    setTimeout(() => {
      setExportedStatus(`Downloaded: attendance_report_${new Date().toISOString().slice(0, 10)}.${type === 'pdf' ? 'pdf' : 'xlsx'}`);
      playCyberTone('success');
      setTimeout(() => setExportedStatus(null), 3000);
    }, 800);
  };

  useEffect(() => {
    setScanResult(activeStudent.verified ? 'success' : 'failed');
  }, [activeStudent]);

  return (
    <div className="bg-[#0b1120] border border-cyan-900/40 rounded-xl overflow-hidden p-5 text-sm">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-base font-semibold text-white flex items-center gap-2">
            <Camera className="w-4 h-4 text-cyan-400" />
            Biometric Face & Geofence Verification Engine
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Module engineered in Python/Django for View My Records to eliminate proxy attendance.
          </p>
        </div>
        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => handleExport('excel')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
            Export Excel
          </button>
          <button
            onClick={() => handleExport('pdf')}
            className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <FileText className="w-3.5 h-3.5 text-cyan-400" />
            Export PDF
          </button>
        </div>
      </div>

      {exportedStatus && (
        <div className="mt-3 p-2.5 bg-cyan-950/40 border border-cyan-800/60 rounded-lg text-xs text-cyan-300 flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 text-cyan-400 shrink-0" />
          {exportedStatus}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-5">
        {/* Left Column: Viewfinder Simulation */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="relative aspect-video bg-[#050811] rounded-lg border border-slate-800 flex items-center justify-center overflow-hidden">
            {/* Viewfinder crosshairs */}
            <div className="absolute inset-4 pointer-events-none border border-cyan-500/20 rounded-md">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
            </div>

            {/* Central scan subject */}
            <div className="relative text-center z-10 flex flex-col items-center">
              <div className="relative w-28 h-28 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center overflow-hidden">
                <span className="text-3xl font-bold text-cyan-400 font-mono">
                  {activeStudent.name.slice(0, 2).toUpperCase()}
                </span>
                {scanning && (
                  <div className="absolute inset-0 bg-cyan-500/20 animate-pulse flex items-center justify-center">
                    <RefreshCw className="w-8 h-8 text-cyan-300 animate-spin" />
                  </div>
                )}
              </div>
              <p className="mt-2 font-medium text-slate-200">{activeStudent.name}</p>
              <p className="text-xs text-slate-400 font-mono">{activeStudent.id} · {activeStudent.grade}</p>
            </div>

            {/* HUD Scan Line */}
            {scanning && (
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-bounce"></div>
            )}

            {/* Geofence Radar Overlay */}
            <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-slate-900/90 border border-slate-700/80 px-2 py-1 sm:px-2.5 sm:py-1.5 rounded text-[10px] xs:text-[11px] sm:text-xs text-slate-300 flex flex-wrap items-center gap-1 sm:gap-2 max-w-[92%] z-20">
              <MapPin className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-cyan-400 shrink-0" />
              <span>Campus Delta: <strong className="font-mono text-white">{activeStudent.distanceMeters}m</strong></span>
              <span className="text-slate-500 hidden xs:inline">|</span>
              <span className={activeStudent.distanceMeters <= campusRadiusMeters ? 'text-emerald-400' : 'text-rose-400'}>
                {activeStudent.distanceMeters <= campusRadiusMeters ? 'In Boundary' : 'Proxy Alert'}
              </span>
            </div>

            {/* Verification Status Pill alternative: Clean badge */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-20">
              {scanResult === 'success' && (
                <div className="px-2 xs:px-2.5 py-0.5 sm:py-1 bg-emerald-950/80 border border-emerald-600/80 text-emerald-300 rounded text-[10px] xs:text-xs flex items-center gap-1.5 font-medium">
                  <UserCheck className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Verified & Present</span>
                </div>
              )}
              {scanResult === 'failed' && (
                <div className="px-2 xs:px-2.5 py-0.5 sm:py-1 bg-rose-950/80 border border-rose-600/80 text-rose-300 rounded text-[10px] xs:text-xs flex items-center gap-1.5 font-medium">
                  <ShieldAlert className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span>Proxy Flagged</span>
                </div>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div className="flex items-center gap-3">
            <button
              onClick={handleTriggerScan}
              disabled={scanning}
              className="flex-1 py-2 px-3 sm:px-4 bg-cyan-600 hover:bg-cyan-500 disabled:opacity-50 text-white rounded-lg font-medium text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 ${scanning ? 'animate-spin' : ''}`} />
              <span className="truncate">{scanning ? 'Verifying Coordinates...' : 'Simulate Camera & GPS Verification'}</span>
            </button>
          </div>
        </div>

        {/* Right Column: Student Selector & Verification Logs */}
        <div className="lg:col-span-5 flex flex-col gap-3">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Select Student Record
          </label>
          <div className="space-y-2">
            {students.map((student) => {
              const isSelected = student.id === activeStudent.id;
              const isFlagged = student.distanceMeters > campusRadiusMeters;

              return (
                <button
                  key={student.id}
                  onClick={() => {
                    playCyberTone('click');
                    setActiveStudent(student);
                  }}
                  className={`w-full text-left p-3 rounded-lg border transition-all cursor-pointer flex items-center justify-between ${
                    isSelected
                      ? 'bg-slate-800/90 border-cyan-500 shadow-sm'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div>
                    <div className="font-medium text-slate-200 flex items-center gap-2">
                      {student.name}
                      {isFlagged ? (
                        <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                      ) : (
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      )}
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      {student.id} · {student.grade}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-xs text-slate-300 block">
                      {student.confidence}% match
                    </span>
                    <span className={`text-[11px] ${isFlagged ? 'text-rose-400' : 'text-emerald-400'}`}>
                      {student.distanceMeters}m away
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Logic Explanation Box */}
          <div className="mt-2 p-3 bg-slate-900/70 border border-slate-800 rounded-lg text-xs space-y-1.5 text-slate-300">
            <div className="font-semibold text-white">Anti-Proxy Algorithm Logic:</div>
            <p className="text-slate-400 leading-relaxed">
              1. Browser accesses client camera stream via HTML5 WebRTC.
              <br />
              2. GPS coordinates evaluated against campus centroid threshold (under 50 meters).
              <br />
              3. Vector embedding matching marks attendance directly in Django SQLite database.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
