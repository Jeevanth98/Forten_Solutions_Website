import { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import { Shield, Activity, RefreshCw, Cpu } from 'lucide-react';

function useCountUp(end, duration = 1800, trigger = false) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!trigger) return;
    let startTime = null;
    let raf;
    const animate = (ts) => {
      if (!startTime) startTime = ts;
      const elapsed = ts - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Easing out quadratic
      const easeVal = progress * (2 - progress);
      setVal(Math.floor(easeVal * end));

      if (progress < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setVal(end);
      }
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [trigger, end, duration]);
  return val;
}

export default function StatsCounter() {
  const containerRef = useRef(null);
  const inView = useInView(containerRef, { once: true, margin: '-100px' });

  // Custom counts
  const uptimeVal = useCountUp(999, 1500, inView); // will divide by 10
  const queriesVal = useCountUp(428950, 2000, inView);
  const activeAgents = useCountUp(18, 1200, inView);

  // Live fluctuating workloads
  const [cpu, setCpu] = useState(48.2);
  const [ram, setRam] = useState(62.4);

  useEffect(() => {
    if (!inView) return;
    const interval = setInterval(() => {
      setCpu(Number((40 + Math.random() * 15).toFixed(1)));
      setRam(Number((60 + Math.random() * 5).toFixed(1)));
    }, 2800);
    return () => clearInterval(interval);
  }, [inView]);

  // Client-centric metrics derived from fluctuations
  const qoService = (96.5 + (cpu % 3.5)).toFixed(1);
  const resRate = (97.8 + (ram % 2.1)).toFixed(1);

  return (
    <section 
      ref={containerRef}
      className="relative py-24 px-4 md:px-8 overflow-hidden bg-slate-50/50"
    >
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="section-badge mb-3">
            Key Performance Metrics
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none">
            Enterprise Class Reliability
          </h2>
          <p className="section-subtitle max-w-xl mx-auto text-xs md:text-sm">
            High-performance software systems designed for standard enterprise uptime, throughput, and scalability.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

          {/* Card 1: Network Heartbeat & Uptime */}
          <div className="bento-tile p-6 flex flex-col justify-between min-h-[200px] bg-white border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Shield size={12} className="text-blue-600" />
                Service Availability
              </span>
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            </div>

            <div className="my-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tighter block tabular-nums">
                {(uptimeVal / 10).toFixed(2)}%
              </span>
              <span className="text-[10.5px] text-slate-500 block mt-1">Average Platform Uptime SLA</span>
            </div>

            {/* Heartbeat path SVG */}
            <div className="h-8 w-full mt-3 opacity-80">
              <svg width="100%" height="100%" viewBox="0 0 160 30" preserveAspectRatio="none">
                <path
                  d="M0 15 L 40 15 L 45 5 L 50 25 L 55 15 L 90 15 L 95 0 L 100 30 L 105 15 L 160 15"
                  fill="none"
                  stroke="#2563eb"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </div>

          {/* Card 2: Transactions / Query throughput */}
          <div className="bento-tile p-6 flex flex-col justify-between min-h-[200px] bg-white border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Activity size={12} className="text-indigo-600" />
                API Operations
              </span>
            </div>

            <div className="my-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tighter block tabular-nums">
                {queriesVal.toLocaleString()}+
              </span>
              <span className="text-[10.5px] text-slate-500 block mt-1">Daily Workflows Executed</span>
            </div>

            <div className="text-[9px] text-slate-400 font-sans font-semibold mt-3">
              Peak rate: <span className="text-indigo-600 font-extrabold">~490 requests / min</span>
            </div>
          </div>

          {/* Card 3: Client Satisfaction */}
          <div className="bento-tile p-6 flex flex-col justify-between min-h-[200px] bg-white border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold flex items-center gap-1.5">
                <Cpu size={12} className="text-emerald-600" />
                Service Satisfaction
              </span>
              <RefreshCw size={10} className="text-slate-400 animate-spin" style={{ animationDuration: '6s' }} />
            </div>

            <div className="space-y-3 my-2">
              <div>
                <div className="flex justify-between text-[9px] mb-1 font-semibold">
                  <span className="text-slate-500">Quality of Service</span>
                  <span className="text-emerald-600">{qoService}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-emerald-500 h-full rounded-full transition-all duration-500" style={{ width: `${qoService}%` }} />
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[9px] mb-1 font-semibold">
                  <span className="text-slate-500">Response Rate (SLA)</span>
                  <span className="text-blue-600">{resRate}%</span>
                </div>
                <div className="w-full bg-slate-100 h-1 rounded-full overflow-hidden">
                  <div className="bg-blue-600 h-full rounded-full transition-all duration-500" style={{ width: `${resRate}%` }} />
                </div>
              </div>
            </div>
          </div>

          {/* Card 4: Dedicated Server Zones */}
          <div className="bento-tile p-6 flex flex-col justify-between min-h-[200px] bg-white border border-slate-200">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <span className="text-[10px] text-slate-400 uppercase tracking-widest font-extrabold">
                Global Edge Nodes
              </span>
            </div>

            <div className="my-2">
              <span className="text-4xl font-extrabold text-slate-900 tracking-tighter block tabular-nums">
                {activeAgents}
              </span>
              <span className="text-[10.5px] text-slate-500 block mt-1">Deployment server zones</span>
            </div>

            <div className="text-[9px] text-slate-400 flex justify-between items-center mt-3 border-t border-slate-100 pt-2 font-semibold">
              <span>Primary CDN Regions:</span>
              <span className="text-emerald-600 font-extrabold">4 Regions</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
