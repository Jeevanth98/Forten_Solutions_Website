import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Cpu, Database, Globe, Layers, Play } from 'lucide-react';

/* ── Interactive Architecture Sandbox ── */
function ArchitectureSandbox() {
  const [activeNode, setActiveNode] = useState('client');

  const nodes = [
    { id: 'client', label: 'Client UI', icon: Globe, color: '#2563eb', desc: 'React & Next.js frontend interfaces.' },
    { id: 'gateway', label: 'API Gateway', icon: Layers, color: '#10b981', desc: 'Secure REST & GraphQL gateway endpoints.' },
    { id: 'workflow', label: 'Automation Layer', icon: Cpu, color: '#7c3aed', desc: 'Intelligent workflow queues & pipelines.' },
    { id: 'database', label: 'Database & Cloud', icon: Database, color: '#f59e0b', desc: 'High-availability storage & caches.' },
  ];

  const details = {
    client: {
      title: 'Frontend Portal Client',
      latency: '78ms render',
      status: '200 OK',
      json: {
        platform: 'Next.js Web UI',
        rendering: 'Server-Side (SSR)',
        seoOptimized: true,
        authStatus: 'Active Session'
      }
    },
    gateway: {
      title: 'Edge API Gateway Router',
      latency: '14ms dispatch',
      status: '200 OK',
      json: {
        gatewayType: 'FastAPI / Node',
        rateLimiting: '10,000 req/min limit',
        authMethod: 'JWT JWT Bearer',
        corsStatus: 'Headers Configured'
      }
    },
    workflow: {
      title: 'Automation & Workflow Queue',
      latency: '120ms execution',
      status: 'Processed',
      json: {
        runnerType: 'Celery / RabbitMQ',
        activeJobs: 14,
        taskName: 'generate_billing_invoice',
        webHookTrigger: 'payment_success'
      }
    },
    database: {
      title: 'High-Availability Database Cluster',
      latency: '3ms query',
      status: 'Replica Sync',
      json: {
        dbEngine: 'PostgreSQL / Supabase',
        region: 'AP-South-1 (Vellore)',
        activePoolConnections: 84,
        vacuumStatus: 'Optimized'
      }
    }
  };

  const activeInfo = details[activeNode];

  return (
    <div className="w-full h-full flex flex-col justify-between select-none">
      {/* Sandbox Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-3">
        <span className="text-[10px] font-extrabold uppercase tracking-widest text-blue-600 flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
          Interactive Architecture Sandbox
        </span>
        <span className="text-[9px] text-slate-400 font-sans font-semibold uppercase">
          Click layers to trigger flow
        </span>
      </div>

      {/* Nodes list */}
      <div className="grid grid-cols-2 gap-3 my-4">
        {nodes.map((node) => {
          const Icon = node.icon;
          const isActive = activeNode === node.id;

          return (
            <button
              key={node.id}
              onClick={() => setActiveNode(node.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-300 relative overflow-hidden flex flex-col justify-between min-h-[90px] ${
                isActive
                  ? 'bg-blue-50/50 border-blue-200 shadow-sm'
                  : 'bg-slate-50/50 border-slate-100 hover:border-slate-200 hover:bg-slate-50'
              }`}
              style={{
                boxShadow: isActive ? `inset 0 1px 0 rgba(255,255,255,0.8), 0 4px 12px ${node.color}08` : undefined
              }}
            >
              <div 
                className="w-7 h-7 rounded-lg flex items-center justify-center mb-2"
                style={{
                  background: isActive ? `${node.color}15` : '#ffffff',
                  border: `1px solid ${isActive ? `${node.color}30` : '#e2e8f0'}`,
                }}
              >
                <Icon size={14} style={{ color: isActive ? node.color : '#64748b' }} />
              </div>
              <div>
                <p className={`text-[10.5px] font-bold ${isActive ? 'text-slate-900' : 'text-slate-650'}`}>
                  {node.label}
                </p>
                <p className="text-[8.5px] text-slate-400 leading-tight mt-0.5 line-clamp-1">
                  {node.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>

      {/* Connection Flow Canvas (SVG path animations based on selection) */}
      <div className="h-10 w-full bg-slate-50/70 border border-slate-100 rounded-xl relative flex items-center justify-around px-4 overflow-hidden mb-4">
        {/* Animated flow path */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none" xmlns="http://www.w3.org/2000/svg">
          <path 
            d="M 30 20 L 330 20" 
            stroke="#e2e8f0" 
            strokeWidth="2.5" 
            strokeDasharray="5, 5" 
            fill="none" 
          />
          {/* Active Flow Line */}
          <motion.path 
            d="M 30 20 L 330 20" 
            stroke="#2563eb" 
            strokeWidth="2.5" 
            fill="none"
            initial={{ strokeDasharray: "15, 150", strokeDashoffset: 0 }}
            animate={{ strokeDashoffset: [-165, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
          />
        </svg>

        {/* Small floating node lights */}
        {nodes.map((node) => {
          const isActive = activeNode === node.id;
          return (
            <div 
              key={node.id} 
              className={`w-3.5 h-3.5 rounded-full border transition-all duration-500 z-10 flex items-center justify-center ${
                isActive 
                  ? 'bg-blue-600 border-blue-400 shadow-sm scale-110' 
                  : 'bg-white border-slate-200'
              }`}
            >
              {isActive && <div className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />}
            </div>
          );
        })}
      </div>

      {/* Active Node Output Card */}
      <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50/50 flex-1 flex flex-col justify-between min-h-[140px]">
        <div className="flex items-center justify-between border-b border-slate-200/50 pb-2 mb-2">
          <span className="text-[10px] font-bold text-slate-800 tracking-wide uppercase">
            {activeInfo.title}
          </span>
          <div className="flex gap-2">
            <span className="text-[8px] font-semibold text-slate-400 bg-white border border-slate-200 px-1.5 py-0.5 rounded">
              {activeInfo.latency}
            </span>
            <span className="text-[8px] font-semibold text-green-600 bg-green-50 border border-green-200 px-1.5 py-0.5 rounded flex items-center gap-0.5">
              <Play size={6} fill="currentColor" /> {activeInfo.status}
            </span>
          </div>
        </div>

        {/* Mock JSON representation */}
        <pre className="text-[9.5px] font-sans font-medium text-slate-500 overflow-x-auto whitespace-pre-wrap leading-relaxed">
          {Object.entries(activeInfo.json).map(([key, val]) => (
            <div key={key}>
              <span className="text-blue-600 font-semibold">"{key}"</span>: <span className="text-slate-700">"{val}"</span>
            </div>
          ))}
        </pre>
      </div>
    </div>
  );
}

export default function HeroTerminal() {
  const line1 = ['Committed', 'To'];
  const line2 = ['Your', 'Success.'];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen pt-28 pb-16 px-4 md:px-8 flex items-center overflow-hidden"
      style={{ background: '#f8fafc' }}
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />

      {/* Ambient glows */}
      <div 
        className="absolute top-0 right-0 w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.03) 0%, transparent 60%)',
          filter: 'blur(80px)'
        }}
      />

      <div className="relative z-10 w-full max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* LEFT: Branding copy (col-span-7) */}
          <div className="lg:col-span-7 bento-tile p-8 md:p-12 flex flex-col justify-between min-h-[380px] lg:min-h-[460px] bg-white border border-slate-100">
            <div className="absolute inset-0 opacity-5 dot-pattern pointer-events-none" />

            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-blue-100 bg-blue-50/50 text-[10px] font-bold uppercase tracking-widest text-blue-600 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse" />
                Enterprise Software & Automation
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-6xl font-black tracking-tight leading-[1.05] text-slate-900 max-w-xl mb-6">
                {line1.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: i * 0.08 }}
                    className="inline-block mr-3"
                  >
                    {w}
                  </motion.span>
                ))}
                <br />
                {line2.map((w, i) => (
                  <motion.span
                    key={w}
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                    className="inline-block mr-3 text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-650"
                  >
                    {w}
                  </motion.span>
                ))}
              </h1>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.45 }}
                className="text-xs md:text-sm text-slate-500 leading-relaxed max-w-lg mb-8"
              >
                We construct scalable software systems, intelligent automation pipelines, and robust APIs for growth-minded businesses that demand code quality and database performance.
              </motion.p>
            </div>

            {/* CTAs & Trust counters */}
            <div className="space-y-8">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 }}
                className="flex flex-wrap gap-4"
              >
                <a href="#configurator" className="btn-primary flex items-center gap-1.5 py-3 px-6 text-xs">
                  Estimate Project Scope <ArrowRight size={14} />
                </a>
                <a href="#services" className="btn-outline py-3 px-6 text-xs">
                  Services Directory
                </a>
              </motion.div>

              {/* Small metrics labels */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="flex items-center gap-6 pt-6 border-t border-slate-100 w-full max-w-md text-[10px] text-slate-400 font-semibold"
              >
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500" /> 100% On-Time Delivery</span>
                <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-blue-500" /> 24/7 Account Support</span>
              </motion.div>
            </div>
          </div>

          {/* RIGHT: Architecture Sandbox Tile (col-span-5) */}
          <div className="lg:col-span-5 bento-tile p-6 md:p-8 flex flex-col justify-between bg-white border border-slate-100 min-h-[440px]">
            <ArchitectureSandbox />
          </div>

        </div>
      </div>
    </section>
  );
}
