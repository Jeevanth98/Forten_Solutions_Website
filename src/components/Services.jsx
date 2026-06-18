import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Code2, Brain, Wrench, Globe, Cpu, BarChart3, ChevronRight, Activity, GitBranch } from 'lucide-react';

const services = [
  {
    icon: Code2,
    title: 'Custom Software Systems',
    desc: 'Architecting high-concurrency platforms, microservices, and specialized business logic with complete test coverage and modern CI/CD pipelines.',
    tags: ['Next.js', 'Go/Rust', 'Kubernetes', 'SaaS Architecture'],
    spec: 'Load balance up to 10k req/sec out-of-the-box',
    color: '#2563eb'
  },
  {
    icon: Brain,
    title: 'AI & Workflow Automation',
    desc: 'Integrating cognitive LLM architectures, vector indexing, multi-agent frameworks, and RPA loops to wipe out repetitive human labor.',
    tags: ['LangChain', 'OpenAI', 'RAG Databases', 'Autogen Agents'],
    spec: 'Average processing latency: <320ms',
    color: '#7c3aed'
  },
  {
    icon: Wrench,
    title: 'Operations Maintenance',
    desc: '24/7 telemetry monitoring, database vacuuming, hot patch scheduling, security audits, and continuous performance optimization updates.',
    tags: ['Sentry', 'Datadog', 'Auto-Scaling', 'Patch Rollouts'],
    spec: 'Guaranteed 99.95% platform uptime SLAs',
    color: '#d97706'
  },
  {
    icon: Globe,
    title: 'Next-Gen Platforms',
    desc: 'Pixel-perfect, hyper-optimized web interfaces and native application suites built with React Native and Flutter for multi-platform dominance.',
    tags: ['Next.js', 'Flutter', 'TailwindCSS', 'WebSockets'],
    spec: 'Lighthouse Performance Score: 100/100',
    color: '#2563eb'
  },
  {
    icon: Cpu,
    title: 'API Integrations',
    desc: 'Designing standardized GraphQL/REST schemas, rate-limiting handlers, secure oauth portals, and data synchronization hooks.',
    tags: ['GraphQL', 'RESTful schemas', 'gRPC', 'Webhooks'],
    spec: 'Strict schema validation, 0% drop-off rate',
    color: '#059669'
  },
  {
    icon: BarChart3,
    title: 'Strategy & Architecture',
    desc: 'Deep technical audits, database schema reviews, cloud cost analysis, and strategic roadmap framing for high-growth tech ventures.',
    tags: ['Infrastructure Audit', 'DB Optimization', 'Tech Feasibility'],
    spec: 'Reduces cloud hosting overhead by 30-50%',
    color: '#db2777'
  }
];

export default function Services() {
  const [activeNode, setActiveNode] = useState(0);

  return (
    <section id="services" className="relative py-28 px-4 md:px-8 overflow-hidden bg-slate-50/50">
      {/* Background ambient light */}
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />
      <div 
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.02) 0%, transparent 70%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Title */}
        <div className="text-center mb-16">
          <div className="section-badge mb-3">
            Core Blueprint
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Architecting Automated Operations
          </h2>
          <p className="section-subtitle max-w-xl mx-auto text-xs md:text-sm">
            A comprehensive, node-based representation of the digital engines we deploy for enterprise scale.
          </p>
        </div>

        {/* Bento Node Blueprint layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT: Node Selection Board (col-span-7) */}
          <div className="lg:col-span-7 space-y-4 relative">
            {/* SVG Connecting lines showing flow chart logic */}
            <div className="absolute left-[30px] top-6 bottom-6 w-0.5 bg-slate-100 hidden md:block -z-10">
              <motion.div 
                className="bg-gradient-to-b from-blue-600 via-indigo-650 to-transparent w-full"
                style={{ height: '70%' }}
                animate={{ y: ['0%', '50%', '0%'] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'linear' }}
              />
            </div>

            {services.map((svc, idx) => {
              const Icon = svc.icon;
              const isActive = activeNode === idx;

              return (
                <div
                  key={idx}
                  onClick={() => setActiveNode(idx)}
                  className={`bento-tile p-5 cursor-pointer flex gap-5 items-start transition-all duration-300 ${
                    isActive 
                      ? 'border-blue-200 !bg-blue-50/20 shadow-sm' 
                      : 'hover:border-slate-300'
                  }`}
                >
                  {/* Node icon & connection indicator */}
                  <div className="relative shrink-0">
                    <div 
                      className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300"
                      style={{
                        background: isActive ? `${svc.color}15` : '#ffffff',
                        border: isActive ? `1px solid ${svc.color}30` : '1px solid #e2e8f0',
                        boxShadow: isActive ? `0 0 15px ${svc.color}10` : 'none'
                      }}
                    >
                      <Icon size={20} style={{ color: isActive ? svc.color : '#64748b' }} />
                    </div>
                    {isActive && (
                      <span 
                        className="absolute -right-1.5 -bottom-1.5 w-4.5 h-4.5 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[7px] text-white font-extrabold"
                      >
                        ✓
                      </span>
                    )}
                  </div>

                  {/* Node content summary */}
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="text-sm font-bold text-slate-800 tracking-wide">
                        {svc.title}
                      </h3>
                      <span className="text-[9px] font-sans font-bold uppercase tracking-wider text-slate-400">0{idx+1}</span>
                    </div>
                    <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                      {svc.desc}
                    </p>
                  </div>

                  <ChevronRight 
                    size={16} 
                    className={`shrink-0 transition-transform duration-300 self-center ${
                      isActive ? 'text-blue-600 translate-x-1' : 'text-slate-300'
                    }`} 
                  />
                </div>
              );
            })}
          </div>

          {/* RIGHT: Active Node Inspector Panel (col-span-5) */}
          <div className="lg:col-span-5 bento-tile p-6 lg:p-8 min-h-[380px] lg:sticky lg:top-28 bg-white border border-slate-200">
            <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeNode}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.35, ease: 'easeOut' }}
                className="h-full flex flex-col justify-between"
              >
                <div>
                  {/* Inspector header */}
                  <div className="flex items-center gap-3 border-b border-slate-100 pb-4 mb-6">
                    <div 
                      className="w-10 h-10 rounded-lg flex items-center justify-center"
                      style={{
                        background: `${services[activeNode].color}12`,
                        border: `1px solid ${services[activeNode].color}30`
                      }}
                    >
                      {(() => {
                        const NodeIcon = services[activeNode].icon;
                        return <NodeIcon size={18} style={{ color: services[activeNode].color }} />;
                      })()}
                    </div>
                    <div>
                      <span className="text-[8px] font-sans font-bold uppercase tracking-widest text-blue-600 block">System Overview</span>
                      <h4 className="text-base font-black text-slate-800">{services[activeNode].title}</h4>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-xs text-slate-500 leading-relaxed mb-6">
                    {services[activeNode].desc}
                  </p>

                  {/* Node specifications code mockup */}
                  <div className="bg-slate-50 border border-slate-200 rounded-xl p-4 font-sans text-[10px] mb-6 space-y-2 select-none">
                    <div className="flex items-center gap-1.5 text-blue-600 border-b border-slate-150 pb-2 mb-2">
                      <GitBranch size={10} />
                      <span className="font-semibold">configuration_manifest.json</span>
                    </div>
                    <div className="text-slate-400">{"{"}</div>
                    <div className="pl-4 text-slate-600">
                      "status": <span className="text-emerald-600 font-semibold">"OPERATIONAL"</span>,
                    </div>
                    <div className="pl-4 text-slate-600">
                      "output_metric": <span className="text-amber-600 font-semibold">"{services[activeNode].spec}"</span>,
                    </div>
                    <div className="pl-4 text-slate-600">
                      "load_allocation": <span className="text-blue-600 font-semibold">"AUTOMATIC"</span>
                    </div>
                    <div className="text-slate-400">{"}"}</div>
                  </div>

                  {/* Core tags */}
                  <div className="space-y-2.5">
                    <span className="text-[9px] font-extrabold uppercase tracking-widest text-slate-400 block">Configured Stack</span>
                    <div className="flex flex-wrap gap-1.5">
                      {services[activeNode].tags.map((tag) => (
                        <span 
                          key={tag}
                          className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-660 font-semibold"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Foot action inside inspector */}
                <div className="pt-8 border-t border-slate-100 mt-8 flex items-center justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-slate-400">
                    <Activity size={12} className="text-emerald-500 animate-pulse" />
                    <span>Active Node Sync</span>
                  </div>
                  <a href="#contact" className="btn-primary py-2 px-4 text-[10px] font-bold">
                    Deploy Solution
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
