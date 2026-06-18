import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Layers, Database, Shield, Zap, RefreshCw, Check } from 'lucide-react';

const availableNodes = [
  {
    id: 'frontend',
    icon: Layers,
    title: 'Web/Mobile Portal',
    desc: 'Next.js interface or React Native apps',
    complexity: 15,
    baseCost: 40000,
    time: 2,
    color: '#2563eb'
  },
  {
    id: 'backend',
    icon: Cpu,
    title: 'AI Automation Engine',
    desc: 'LLMs, workflow bots, and agent routers',
    complexity: 25,
    baseCost: 60000,
    time: 3,
    color: '#7c3aed'
  },
  {
    id: 'database',
    icon: Database,
    title: 'Postgre/Vector Storage',
    desc: 'Secure schemas, vector stores & syncs',
    complexity: 12,
    baseCost: 20000,
    time: 1.5,
    color: '#d97706'
  },
  {
    id: 'security',
    icon: Shield,
    title: 'Security & Auth OAuth',
    desc: 'Encryption-at-rest & secure tokens',
    complexity: 8,
    baseCost: 15000,
    time: 1,
    color: '#059669'
  },
  {
    id: 'realtime',
    icon: Zap,
    title: 'Real-time WebSocket',
    desc: 'Live telemetry updates & notifications',
    complexity: 10,
    baseCost: 20000,
    time: 1.5,
    color: '#db2777'
  }
];

export default function ProjectConfigurator() {
  const [selectedNodes, setSelectedNodes] = useState(['frontend']);
  const [submitted, setSubmitted] = useState(false);

  const toggleNode = (id) => {
    setSelectedNodes((prev) =>
      prev.includes(id)
        ? prev.length > 1 ? prev.filter((n) => n !== id) : prev // force at least 1
        : [...prev, id]
    );
  };

  // Calculations
  const activeConfigs = availableNodes.filter((n) => selectedNodes.includes(n.id));
  const totalComplexity = activeConfigs.reduce((acc, curr) => acc + curr.complexity, 0);
  const totalCost = activeConfigs.reduce((acc, curr) => acc + curr.baseCost, 0);
  const totalWeeks = activeConfigs.reduce((acc, curr) => acc + curr.time, 0);

  const getTimelineString = (weeks) => {
    if (weeks <= 2) return '2–3 weeks (MVP)';
    if (weeks <= 5) return '4–6 weeks (Standard)';
    return `${Math.ceil(weeks - 1.5)}–${Math.ceil(weeks + 1.5)} weeks (Enterprise)`;
  };

  const getComplexityTier = (complexity) => {
    if (complexity <= 20) return { label: 'Optimal Single-tier', color: 'text-emerald-600 font-extrabold' };
    if (complexity <= 40) return { label: 'Multi-service Scale', color: 'text-amber-600 font-extrabold' };
    return { label: 'Full Microservice Grid', color: 'text-purple-650 font-extrabold' };
  };

  const reset = () => {
    setSelectedNodes(['frontend']);
    setSubmitted(false);
  };

  return (
    <section id="configurator" className="relative py-28 px-4 md:px-8 overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />

      <div className="relative z-10 max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-3">
            Blueprint Sandbox
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Interactive Architecture Builder
          </h2>
          <p className="section-subtitle max-w-xl mx-auto text-xs md:text-sm">
            Select modules to connect on our sandbox node array, generating real-time complexity diagnostics and estimates.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Sandbox Canvas Nodes (col-span-7) */}
          <div className="lg:col-span-7 bento-tile p-6 md:p-8 flex flex-col justify-between min-h-[380px] bg-white border border-slate-200">
            <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-slate-400">Select Active Nodes</span>
                <span className="text-[9px] font-sans font-bold text-blue-655">Total nodes: {selectedNodes.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {availableNodes.map((node) => {
                  const NodeIcon = node.icon;
                  const isSelected = selectedNodes.includes(node.id);

                  return (
                    <div
                      key={node.id}
                      onClick={() => toggleNode(node.id)}
                      className={`p-4 rounded-xl border cursor-pointer transition-all duration-300 ${
                        isSelected 
                          ? 'border-blue-300 bg-blue-50/10 shadow-[0_4px_12px_rgba(37,99,235,0.04)]' 
                          : 'border-slate-200 bg-white hover:border-slate-350 hover:shadow-sm'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div 
                          className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                          style={{
                            background: isSelected ? `${node.color}15` : '#ffffff',
                            border: isSelected ? `1px solid ${node.color}35` : '1px solid #e2e8f0'
                          }}
                        >
                          <NodeIcon size={16} style={{ color: isSelected ? node.color : '#64748b' }} />
                        </div>

                        {isSelected && (
                          <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center">
                            <Check size={10} className="text-white stroke-[3px]" />
                          </div>
                        )}
                      </div>
                      <h4 className="text-xs font-bold text-slate-800 mb-1">{node.title}</h4>
                      <p className="text-[9.5px] text-slate-500 leading-normal">{node.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="text-[9px] text-slate-400 font-sans font-semibold mt-6 border-t border-slate-100 pt-4">
              <span>* Configured modules connect automatically via secure API arrays.</span>
            </div>
          </div>

          {/* RIGHT: Real-time Estimates Indicator (col-span-5) */}
          <div className="lg:col-span-5 bento-tile p-6 lg:p-8 flex flex-col justify-between min-h-[380px] bg-white border border-slate-200">
            <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="calc"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-6">
                      <span className="text-[9px] font-sans font-bold uppercase tracking-widest text-slate-400">Diagnostic Output</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                    </div>

                    <div className="space-y-6">
                      {/* Metric 1: Timeline */}
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block">Estimated Delivery</span>
                        <span className="text-2xl font-black text-slate-900 tracking-tight">
                          {getTimelineString(totalWeeks)}
                        </span>
                      </div>

                      {/* Metric 2: Price Bracket */}
                      <div>
                        <span className="text-[9px] text-slate-400 font-bold uppercase block">Project Budget Allocation</span>
                        <span className="text-2xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650 tracking-tight">
                          ₹{(totalCost).toLocaleString()} – ₹{(totalCost + 40000).toLocaleString()}
                        </span>
                      </div>

                      {/* Metric 3: Complexity score */}
                      <div>
                        <div className="flex justify-between items-center text-[9px] mb-1">
                          <span className="text-slate-400 font-bold uppercase">System Complexity Index</span>
                          <span className={`${getComplexityTier(totalComplexity).color}`}>
                            {getComplexityTier(totalComplexity).label}
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                          <motion.div
                            className="bg-blue-600 h-full rounded-full"
                            animate={{ width: `${(totalComplexity / 70) * 100}%` }}
                            transition={{ duration: 0.5 }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-8 mt-8 border-t border-slate-100">
                    <button
                      onClick={() => setSubmitted(true)}
                      className="btn-primary w-full justify-center py-3 text-xs"
                    >
                      Transmit Sandbox Design <ArrowRight size={14} />
                    </button>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="done"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="h-full flex flex-col justify-between text-center py-8"
                >
                  <div className="flex flex-col items-center justify-center flex-1">
                    <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-250 flex items-center justify-center mb-4 text-emerald-600">
                      ✓
                    </div>
                    <h3 className="text-lg font-black text-slate-800 mb-2">Schema Saved</h3>
                    <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                      Your architecture design has been logged. Let's schedule a deployment review brief.
                    </p>
                  </div>

                  <div className="space-y-3 pt-6 border-t border-slate-100">
                    <a href="#contact" className="btn-primary w-full justify-center py-3 text-xs">
                      Consult with Lead Engineer
                    </a>
                    <button
                      onClick={reset}
                      className="btn-outline w-full justify-center py-3 text-xs flex items-center gap-1.5"
                    >
                      <RefreshCw size={12} /> Reset Sandbox
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
