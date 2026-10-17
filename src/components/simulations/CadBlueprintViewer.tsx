import { useState } from 'react';
import { Layers, ShieldCheck, Ruler, Compass, Sparkles } from 'lucide-react';
import { playCyberTone } from '../../utils/sound';

interface ComponentPart {
  id: string;
  name: string;
  partNo: string;
  material: string;
  tolerance: string;
  standard: string;
  description: string;
  coords: { x: number; y: number };
}

const PARTS: ComponentPart[] = [
  {
    id: 'part-heads',
    name: 'Cylinder Head Assembly (LMD-12V)',
    partNo: 'IR-CH-9142A',
    material: 'High-Tensile Compacted Graphite Iron',
    tolerance: '± 0.015 mm',
    standard: 'RDSO Engine Spec MP.0.2400.43',
    description: 'Precision machined head with reinforced valve seats engineered for high thermal endurance in diesel locomotives.',
    coords: { x: 32, y: 35 },
  },
  {
    id: 'part-crank',
    name: 'Heavy Forged Crankshaft Assembly',
    partNo: 'IR-CS-8820B',
    material: 'Forged Micro-Alloyed Steel (IS 5517)',
    tolerance: '± 0.008 mm (Main Journals)',
    standard: 'Indian Railway IRS: R-19/93',
    description: 'Dynamic balancing inspected with induction-hardened fillets to withstand heavy freight cyclic torsional stresses.',
    coords: { x: 44, y: 72 },
  },
  {
    id: 'part-gear',
    name: 'Planetary Gearset & Housing (HPT-650)',
    partNo: 'IR-PG-7041X',
    material: 'Case-Hardened 20CrMo4 Alloy',
    tolerance: 'DIN Class 5 Gear Precision',
    standard: 'IRS Locomotive Mechanical Standard',
    description: 'Triple-stage planetary reduction providing high torque transfer efficiency for diesel-electric traction motors.',
    coords: { x: 74, y: 48 },
  },
  {
    id: 'part-torque',
    name: 'Hydrodynamic Torque Converter Hub',
    partNo: 'IR-TC-4509M',
    material: 'Cast Structural Steel Grade 230-450',
    tolerance: '± 0.020 mm',
    standard: 'RDSO Traction Transmission Code',
    description: 'Coupling flange with balanced impeller blade contours for seamless power delivery during high-inertia train starts.',
    coords: { x: 86, y: 28 },
  },
];

export default function CadBlueprintViewer() {
  const [activePart, setActivePart] = useState<ComponentPart>(PARTS[0]);
  const [wireframeMode, setWireframeMode] = useState<'blueprint' | 'render'>('blueprint');
  const [showDimensions, setShowDimensions] = useState(true);

  return (
    <div className="bg-[#0b1120] border border-cyan-900/40 rounded-xl overflow-hidden p-3 xs:p-4 sm:p-5 text-sm w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
            <Compass className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Locomotive Engine 2D/3D CAD Inspector</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            AutoCAD & SolidWorks modeling engineered by Aakash Gupta at Saficon Fab System Pvt Ltd.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs">
          <button
            onClick={() => {
              playCyberTone('click');
              setShowDimensions(!showDimensions);
            }}
            className={`px-2.5 xs:px-3 py-1.5 rounded-lg border transition-colors cursor-pointer flex items-center gap-1.5 text-xs ${
              showDimensions
                ? 'bg-cyan-950/70 text-cyan-300 border-cyan-700/80'
                : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white'
            }`}
          >
            <Ruler className="w-3.5 h-3.5 shrink-0" />
            <span>{showDimensions ? 'Tolerances: On' : 'Tolerances: Off'}</span>
          </button>

          <button
            onClick={() => {
              playCyberTone('click');
              setWireframeMode(wireframeMode === 'blueprint' ? 'render' : 'blueprint');
            }}
            className="px-2.5 xs:px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer text-xs"
          >
            <Layers className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
            <span>{wireframeMode === 'blueprint' ? 'Wireframe' : 'Assembly'}</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 mt-4 sm:mt-5">
        {/* Interactive Visual Canvas Container */}
        <div className="lg:col-span-8 flex flex-col gap-3">
          <div className="relative aspect-video bg-[#050811] rounded-xl border border-slate-800 overflow-hidden group select-none">
            {/* Background CAD Image */}
            <img
              src="/src/assets/images/project_cad_railway_1792272092788.jpg"
              alt="Indian Railway Engine 3D CAD Wireframe"
              className={`w-full h-full object-cover transition-opacity duration-300 ${
                wireframeMode === 'blueprint' ? 'filter contrast-125 brightness-95' : 'filter brightness-80'
              }`}
            />

            {/* Engineering Grid Overlay */}
            <div className="absolute inset-0 pointer-events-none cyber-grid opacity-30"></div>

            {/* Interactive Target Pins */}
            {PARTS.map((part) => {
              const isSelected = part.id === activePart.id;
              return (
                <button
                  key={part.id}
                  onClick={() => {
                    playCyberTone('click');
                    setActivePart(part);
                  }}
                  style={{ top: `${part.coords.y}%`, left: `${part.coords.x}%` }}
                  className={`absolute -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full transition-all cursor-pointer z-20 group/pin ${
                    isSelected
                      ? 'bg-cyan-400 text-slate-950 ring-4 ring-cyan-500/30 scale-110'
                      : 'bg-slate-900/90 text-cyan-400 border border-cyan-500/60 hover:scale-110'
                  }`}
                  title={part.name}
                >
                  <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                  <span className="sr-only">{part.name}</span>

                  {/* Tooltip on pin */}
                  <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-slate-900/95 border border-cyan-500/50 text-[11px] text-white rounded whitespace-nowrap opacity-0 group-hover/pin:opacity-100 pointer-events-none transition-opacity">
                    {part.name}
                  </span>
                </button>
              );
            })}

            {/* Dimension Overlay Badge */}
            {showDimensions && (
              <div className="absolute bottom-2 left-2 sm:bottom-3 sm:left-3 bg-black/85 backdrop-blur-md border border-slate-700/80 rounded-lg p-1.5 xs:p-2 sm:p-2.5 text-[10px] xs:text-[11px] sm:text-xs font-mono text-slate-300 flex flex-wrap items-center gap-1.5 sm:gap-3 max-w-[90%] z-20">
                <span className="text-cyan-400">Scale: 1:20</span>
                <span className="text-slate-600 hidden xs:inline">|</span>
                <span className="hidden xs:inline">Unit: mm</span>
                <span className="text-slate-600 hidden xs:inline">|</span>
                <span className="text-emerald-400">Tolerance: {activePart.tolerance}</span>
              </div>
            )}

            {/* Part Target Box */}
            <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-slate-950/85 backdrop-blur-md border border-slate-700 rounded-lg px-2 xs:px-3 py-1 text-[10px] xs:text-xs text-slate-200 truncate max-w-[65%] z-20">
              <span className="hidden xs:inline">Focus: </span>
              <span className="font-semibold text-cyan-400 truncate">{activePart.name}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between text-xs text-slate-400 gap-2">
            <span>Click any glowing inspection node above to view manufacturing engineering specs.</span>
            <span className="font-mono text-slate-500">ISO 2768-mK / RDSO Locomotive Class</span>
          </div>
        </div>

        {/* Right Column: Active Part Technical Specification */}
        <div className="lg:col-span-4 bg-[#060913] border border-slate-800 rounded-xl p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-2 border-b border-slate-800 mb-3">
              <span className="text-xs uppercase tracking-wider text-slate-400 font-semibold">
                Part Specification Sheet
              </span>
              <span className="text-xs font-mono text-cyan-400 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800">
                {activePart.partNo}
              </span>
            </div>

            <h5 className="text-white font-semibold text-base leading-snug mb-2">
              {activePart.name}
            </h5>

            <p className="text-xs text-slate-300 leading-relaxed mb-4">
              {activePart.description}
            </p>

            <div className="space-y-2.5 text-xs">
              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                <div className="text-slate-400 text-[11px]">Material Composition</div>
                <div className="text-white font-medium mt-0.5">{activePart.material}</div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                <div className="text-slate-400 text-[11px]">Machining Tolerance Limit</div>
                <div className="text-cyan-300 font-mono font-medium mt-0.5">{activePart.tolerance}</div>
              </div>

              <div className="p-2.5 bg-slate-900/60 rounded border border-slate-800/80">
                <div className="text-slate-400 text-[11px]">Compliance Specification</div>
                <div className="text-emerald-300 font-mono text-[11px] mt-0.5">{activePart.standard}</div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800 text-xs text-slate-400 flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>Fabrication standard certified for Indian Railways engine integration.</span>
          </div>
        </div>
      </div>
    </div>
  );
}
