import { useState } from 'react';
import { Network, Filter, Search, AlertCircle, CheckCircle2, Terminal } from 'lucide-react';
import { playCyberTone } from '../../utils/sound';

interface Packet {
  no: number;
  time: string;
  source: string;
  destination: string;
  protocol: 'TCP' | 'DNS' | 'HTTP' | 'ARP' | 'ICMP';
  length: number;
  info: string;
  status: 'normal' | 'retransmit' | 'dropped';
  details: {
    frame: string;
    ethernet: string;
    ip: string;
    protocolDetail: string;
    payloadPreview: string;
    hex: string;
  };
}

const SAMPLE_PACKETS: Packet[] = [
  {
    no: 1,
    time: '0.000000',
    source: '192.168.29.14',
    destination: '10.140.2.1',
    protocol: 'ARP',
    length: 42,
    info: 'Who has 10.140.2.1? Tell 192.168.29.14',
    status: 'normal',
    details: {
      frame: 'Frame 1: 42 bytes on wire (336 bits)',
      ethernet: 'Ethernet II, Src: 84:d8:1b:22:9a:01, Dst: ff:ff:ff:ff:ff:ff',
      ip: 'ARP Protocol (RFC 826)',
      protocolDetail: 'Opcode: request (1), Sender MAC: 84:d8:1b:22:9a:01, Target IP: 10.140.2.1',
      payloadPreview: 'ARP Request Broadcast for Gateway IP',
      hex: 'ff ff ff ff ff ff 84 d8 1b 22 9a 01 08 06 00 01 08 00 06 04 00 01 84 d8 1b 22 9a 01 c0 a8 1d 0e',
    },
  },
  {
    no: 2,
    time: '0.001420',
    source: '10.140.2.1',
    destination: '192.168.29.14',
    protocol: 'ARP',
    length: 42,
    info: '10.140.2.1 is at b0:c5:54:19:3e:70',
    status: 'normal',
    details: {
      frame: 'Frame 2: 42 bytes on wire (336 bits)',
      ethernet: 'Ethernet II, Src: b0:c5:54:19:3e:70, Dst: 84:d8:1b:22:9a:01',
      ip: 'ARP Protocol (RFC 826)',
      protocolDetail: 'Opcode: reply (2), Sender MAC: b0:c5:54:19:3e:70, Sender IP: 10.140.2.1',
      payloadPreview: 'Gateway ARP reply resolved successfully',
      hex: '84 d8 1b 22 9a 01 b0 c5 54 19 3e 70 08 06 00 01 08 00 06 04 00 02 b0 c5 54 19 3e 70 0a 8c 02 01',
    },
  },
  {
    no: 3,
    time: '0.012580',
    source: '192.168.29.14',
    destination: '49.44.18.30',
    protocol: 'DNS',
    length: 74,
    info: 'Standard query 0x1a2b A jiofiber.portal.in',
    status: 'normal',
    details: {
      frame: 'Frame 3: 74 bytes on wire (592 bits)',
      ethernet: 'Ethernet II, Src: 84:d8:1b:22:9a:01, Dst: b0:c5:54:19:3e:70',
      ip: 'Internet Protocol Version 4, Src: 192.168.29.14, Dst: 49.44.18.30',
      protocolDetail: 'User Datagram Protocol, Src Port: 54120, Dst Port: 53 (DNS)',
      payloadPreview: 'DNS Query: jiofiber.portal.in (Type A, Class IN)',
      hex: '45 00 00 4a 1c 3e 40 00 40 11 ea 70 c0 a8 1d 0e 31 2c 12 1e d3 68 00 35 00 36 29 44 1a 2b 01 00',
    },
  },
  {
    no: 4,
    time: '0.045120',
    source: '192.168.29.14',
    destination: '157.240.22.35',
    protocol: 'TCP',
    length: 66,
    info: '52410 → 443 [SYN] Seq=0 Win=64240 Len=0 MSS=1460',
    status: 'normal',
    details: {
      frame: 'Frame 4: 66 bytes on wire (528 bits)',
      ethernet: 'Ethernet II, Src: 84:d8:1b:22:9a:01, Dst: b0:c5:54:19:3e:70',
      ip: 'Internet Protocol Version 4, Src: 192.168.29.14, Dst: 157.240.22.35',
      protocolDetail: 'Transmission Control Protocol, Src Port: 52410, Dst Port: 443, Flags: 0x002 (SYN)',
      payloadPreview: 'TCP Handshake Initial SYN packet',
      hex: '45 00 00 42 34 1a 40 00 40 06 c2 e8 c0 a8 1d 0e 9d f0 16 23 cc ba 01 bb 92 a4 19 02 00 00 00 00',
    },
  },
  {
    no: 5,
    time: '0.345200',
    source: '192.168.29.14',
    destination: '157.240.22.35',
    protocol: 'TCP',
    length: 66,
    info: '[TCP Retransmission] 52410 → 443 [SYN] Seq=0 Win=64240 Len=0',
    status: 'retransmit',
    details: {
      frame: 'Frame 5: 66 bytes on wire (528 bits)',
      ethernet: 'Ethernet II, Src: 84:d8:1b:22:9a:01, Dst: b0:c5:54:19:3e:70',
      ip: 'Internet Protocol Version 4, Src: 192.168.29.14, Dst: 157.240.22.35',
      protocolDetail: 'Transmission Control Protocol, Src Port: 52410, Dst Port: 443 (RTO = 300ms Retransmit)',
      payloadPreview: 'WARNING: SYN ACK not received from destination within RTO window. Suspected WAN packet drop.',
      hex: '45 00 00 42 34 1b 40 00 40 06 c2 e7 c0 a8 1d 0e 9d f0 16 23 cc ba 01 bb 92 a4 19 02 00 00 00 00',
    },
  },
  {
    no: 6,
    time: '0.412900',
    source: '10.140.2.1',
    destination: '192.168.29.14',
    protocol: 'ICMP',
    length: 98,
    info: 'Destination unreachable (Fragmentation needed and DF set, MTU 1492)',
    status: 'dropped',
    details: {
      frame: 'Frame 6: 98 bytes on wire (784 bits)',
      ethernet: 'Ethernet II, Src: b0:c5:54:19:3e:70, Dst: 84:d8:1b:22:9a:01',
      ip: 'Internet Protocol Version 4, Src: 10.140.2.1, Dst: 192.168.29.14',
      protocolDetail: 'Internet Control Message Protocol: Type 3 (Destination Unreachable), Code 4 (MTU mismatch)',
      payloadPreview: 'Root cause isolated: WAN PPPoE router MTU bottleneck (1492 vs client 1500 MSS).',
      hex: '45 00 00 62 7c 11 00 00 40 01 a4 92 0a 8c 02 01 c0 a8 1d 0e 03 04 de 29 00 00 05 d4 45 00 05 dc',
    },
  },
];

export default function WiresharkInspectorSim() {
  const [filterProtocol, setFilterProtocol] = useState<string>('ALL');
  const [selectedPacket, setSelectedPacket] = useState<Packet>(SAMPLE_PACKETS[4]);
  const [resolved, setResolved] = useState(false);

  const filteredPackets = SAMPLE_PACKETS.filter((p) => {
    if (filterProtocol === 'ALL') return true;
    if (filterProtocol === 'DROPS') return p.status !== 'normal';
    return p.protocol === filterProtocol;
  });

  const handleResolve = () => {
    playCyberTone('success');
    setResolved(true);
  };

  return (
    <div className="bg-[#0b1120] border border-cyan-900/40 rounded-xl overflow-hidden p-3 xs:p-4 sm:p-5 text-sm w-full">
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3.5 sm:pb-4 border-b border-slate-800">
        <div>
          <h4 className="text-sm sm:text-base font-semibold text-white flex items-center gap-2">
            <Network className="w-4 h-4 text-cyan-400 shrink-0" />
            <span>Wireshark Packet Stream & WAN Diagnostic Analyzer</span>
          </h4>
          <p className="text-xs text-slate-400 mt-0.5">
            Interactive trace replay simulating Aakash&apos;s network triage at Reliance Jio Infocomm Ltd.
          </p>
        </div>

        {/* Filter controls */}
        <div className="flex items-center gap-1.5 p-1 bg-slate-900 border border-slate-800 rounded-lg text-xs overflow-x-auto no-scrollbar max-w-full">
          <Filter className="w-3.5 h-3.5 text-slate-400 ml-1.5 shrink-0" />
          {(['ALL', 'TCP', 'DNS', 'ICMP', 'DROPS'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => {
                playCyberTone('click');
                setFilterProtocol(filter);
              }}
              className={`px-2 xs:px-2.5 py-1 rounded text-[11px] xs:text-xs font-medium transition-colors whitespace-nowrap cursor-pointer shrink-0 ${
                filterProtocol === filter
                  ? 'bg-cyan-500 text-slate-950 font-semibold'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile Swipe Hint */}
      <div className="text-[10px] xs:text-[11px] text-slate-500 font-mono flex items-center justify-between mt-3 mb-1 sm:hidden px-1">
        <span>← Swipe table horizontally →</span>
        <span className="text-cyan-400">Tap row to inspect</span>
      </div>

      {/* Packet Table */}
      <div className="overflow-x-auto border border-slate-800 rounded-lg bg-[#060913] w-full">
        <table className="w-full min-w-[540px] text-left font-mono text-xs">
          <thead className="bg-slate-900/80 text-slate-400 border-b border-slate-800">
            <tr>
              <th className="py-2 px-3 font-medium">No.</th>
              <th className="py-2 px-3 font-medium">Time (s)</th>
              <th className="py-2 px-3 font-medium">Source</th>
              <th className="py-2 px-3 font-medium">Destination</th>
              <th className="py-2 px-3 font-medium">Protocol</th>
              <th className="py-2 px-3 font-medium">Length</th>
              <th className="py-2 px-3 font-medium">Summary Info</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredPackets.map((pkt) => {
              const isSelected = pkt.no === selectedPacket.no;
              let rowBg = 'hover:bg-slate-800/40 cursor-pointer';
              if (isSelected) {
                rowBg = 'bg-cyan-950/60 text-cyan-200 border-l-2 border-cyan-400';
              } else if (pkt.status === 'retransmit') {
                rowBg = 'bg-amber-950/20 text-amber-300 hover:bg-amber-950/40 cursor-pointer';
              } else if (pkt.status === 'dropped') {
                rowBg = 'bg-rose-950/20 text-rose-300 hover:bg-rose-950/40 cursor-pointer';
              }

              return (
                <tr
                  key={pkt.no}
                  onClick={() => {
                    playCyberTone('click');
                    setSelectedPacket(pkt);
                  }}
                  className={`transition-colors ${rowBg}`}
                >
                  <td className="py-2 px-3">{pkt.no}</td>
                  <td className="py-2 px-3 text-slate-400">{pkt.time}</td>
                  <td className="py-2 px-3">{pkt.source}</td>
                  <td className="py-2 px-3">{pkt.destination}</td>
                  <td className="py-2 px-3">
                    <span
                      className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                        pkt.protocol === 'TCP'
                          ? 'bg-blue-900/60 text-blue-300'
                          : pkt.protocol === 'DNS'
                          ? 'bg-emerald-900/60 text-emerald-300'
                          : pkt.protocol === 'ICMP'
                          ? 'bg-amber-900/60 text-amber-300'
                          : 'bg-slate-800 text-slate-300'
                      }`}
                    >
                      {pkt.protocol}
                    </span>
                  </td>
                  <td className="py-2 px-3 text-slate-400">{pkt.length}</td>
                  <td className="py-2 px-3 truncate max-w-xs">{pkt.info}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Deep Inspection Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 mt-4">
        {/* Frame tree breakdown */}
        <div className="lg:col-span-7 bg-[#060913] border border-slate-800 rounded-lg p-3.5 space-y-2 text-xs font-mono">
          <div className="flex items-center justify-between pb-2 border-b border-slate-800">
            <span className="text-slate-300 font-semibold flex items-center gap-1.5 font-sans">
              <Search className="w-3.5 h-3.5 text-cyan-400" />
              Packet Header Breakdown (No. {selectedPacket.no})
            </span>
            <span className="text-slate-500 text-[11px]">{selectedPacket.protocol} Protocol</span>
          </div>

          <div className="p-2 bg-slate-900/60 rounded border border-slate-800 text-slate-300">
            <div className="text-cyan-400 font-medium">▸ {selectedPacket.details.frame}</div>
            <div className="text-slate-400 pl-3">▸ {selectedPacket.details.ethernet}</div>
            <div className="text-slate-300 pl-3">▸ {selectedPacket.details.ip}</div>
            <div className="text-emerald-400 pl-3">▸ {selectedPacket.details.protocolDetail}</div>
          </div>

          <div className="mt-2">
            <div className="text-slate-400 text-[11px] mb-1 font-sans">Raw Payload Data & Diagnostic Trace:</div>
            <p className="p-2 bg-slate-900/90 rounded border border-slate-800 text-slate-200">
              {selectedPacket.details.payloadPreview}
            </p>
          </div>

          <div>
            <div className="text-slate-400 text-[11px] mb-1 font-sans">Hex Stream View:</div>
            <div className="p-2 bg-black/60 rounded border border-slate-800/80 text-[11px] text-cyan-300 break-all select-all">
              {selectedPacket.details.hex}
            </div>
          </div>
        </div>

        {/* RCA Resolution / Jio Dispatch Panel */}
        <div className="lg:col-span-5 bg-gradient-to-br from-slate-900/90 to-[#0b1222] border border-slate-800 rounded-lg p-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 font-semibold text-xs uppercase tracking-wider mb-2">
              <Terminal className="w-4 h-4" />
              Root Cause Analysis (RCA)
            </div>
            <h5 className="text-white font-medium text-sm mb-1.5">
              WAN MTU Clamping Bottleneck Identified
            </h5>
            <p className="text-xs text-slate-300 leading-relaxed">
              Wireshark packet #6 reveals an ICMP Type 3 Code 4 notice (Fragmentation needed, MTU 1492).
              Subscriber router attempted 1500 byte payload across PPPoE tunnel, triggering repeated TCP SYN retransmissions and customer dropouts.
            </p>

            <div className="mt-3 p-2.5 bg-slate-950/80 border border-slate-800 rounded text-xs space-y-1">
              <div className="text-slate-400">Action dispatched:</div>
              <div className="text-white font-mono text-[11px]">
                MSS Clamping fix pushed to Gateway + Field Engineer dispatched for ONT firmware update.
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-800">
            {resolved ? (
              <div className="p-2.5 bg-emerald-950/50 border border-emerald-700/60 text-emerald-300 rounded text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>WAN link stabilized. Zero packet loss verified across Mysore cluster.</span>
              </div>
            ) : (
              <button
                onClick={handleResolve}
                className="w-full py-2 px-3 bg-cyan-600 hover:bg-cyan-500 text-white rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-sm"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                Apply Fix & Clear Telecom Bottleneck
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
