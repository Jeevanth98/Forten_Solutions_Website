import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Sparkles, Smartphone, Code } from 'lucide-react';
import mob1 from '../images/mob1.png';
import web1 from '../images/web1.png';
import mob2 from '../images/mob2.png';
import web2 from '../images/web2.png';

const mockupImages = [
  { web: web1, mob: mob1, title: 'E-Commerce Marketplace Platform' },
  { web: web2, mob: mob2, title: 'AI Automation SaaS Console' },
];

const highlights = [
  {
    icon: Code,
    title: 'Elite Engineering Standards',
    desc: 'Strict type validation, structured unit testing, and highly scalable database schema layout.',
    color: '#2563eb'
  },
  {
    icon: Smartphone,
    title: 'Cross-Platform Flexibility',
    desc: 'Simultaneous deployment to web, iOS, and Android to guarantee maximum accessibility.',
    color: '#7c3aed'
  },
  {
    icon: Shield,
    title: 'Ironclad Telemetry Security',
    desc: 'Encryption-at-rest, OAuth portals, and continuous monitoring to guard customer databases.',
    color: '#d97706'
  },
  {
    icon: Sparkles,
    title: 'Wow-Factor Interface Design',
    desc: 'Curated color systems, smooth Framer Motion physical layers, and responsive typography.',
    color: '#db2777'
  }
];

export default function MobileShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % mockupImages.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="showcase" className="relative py-28 px-4 md:px-8 overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />
      <div 
        className="absolute bottom-10 right-10 w-[400px] h-[400px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(37,99,235,0.02) 0%, transparent 60%)',
          filter: 'blur(70px)'
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* LEFT: Live Browser & Mobile Frames (col-span-7) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Top Frame tab headers */}
            <div className="flex items-center gap-2 mb-2">
              {mockupImages.map((mock, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveTab(idx)}
                  className={`px-4 py-2 rounded-xl text-[10px] font-extrabold uppercase tracking-wider transition-all duration-300 ${
                    activeTab === idx 
                      ? 'bg-blue-50 border border-blue-200 text-blue-600 shadow-sm' 
                      : 'border border-slate-200 text-slate-500 bg-white hover:text-slate-900 hover:bg-slate-50'
                  }`}
                >
                  {mock.title}
                </button>
              ))}
            </div>

            {/* Container for mockups */}
            <div className="bento-tile p-4 md:p-6 min-h-[380px] md:min-h-[440px] flex items-center justify-center relative bg-slate-100/40 border border-slate-200 shadow-inner rounded-2xl">
              <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.45, ease: 'easeOut' }}
                  className="relative w-full h-full flex flex-col md:flex-row gap-6 items-center justify-center"
                >
                  {/* Browser Mockup */}
                  <div className="w-full md:w-[65%] rounded-xl border border-slate-200 bg-white shadow-lg overflow-hidden self-stretch flex flex-col">
                    {/* Browser chrome */}
                    <div className="flex items-center justify-between px-4 py-2 border-b border-slate-100 bg-slate-50 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-red-400" />
                        <span className="w-2 h-2 rounded-full bg-yellow-400" />
                        <span className="w-2 h-2 rounded-full bg-green-400" />
                      </div>
                      <span className="text-[8px] font-sans font-bold text-slate-400 tracking-wider">HTTPS://CLIENT.FORTENSOLUTIONS.COM</span>
                      <div className="w-8" />
                    </div>
                    {/* Browser page image */}
                    <div className="flex-1 bg-slate-50 overflow-hidden relative min-h-[200px]">
                      <img 
                        src={mockupImages[activeTab].web} 
                        alt="Web Mockup" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                    </div>
                  </div>

                  {/* Mobile Bezel Mockup */}
                  <div className="w-[180px] shrink-0 rounded-[30px] border-[5px] border-slate-800 bg-slate-800 shadow-lg overflow-hidden relative aspect-[9/18]">
                    {/* Notch */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-4 bg-slate-800 rounded-b-xl z-20" />
                    {/* Page image */}
                    <div className="w-full h-full bg-slate-50">
                      <img 
                        src={mockupImages[activeTab].mob} 
                        alt="Mobile Mockup" 
                        className="w-full h-full object-cover transition-transform duration-700 hover:scale-105" 
                      />
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          {/* RIGHT: Feature Descriptions Deck (col-span-5) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div>
              <div className="section-badge mb-3">
                Quality Control
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-none mb-4">
                Systems Built To Endure
              </h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed">
                We assign direct engineering expertise to ensure your database models scale, codebases stay clean, and services execute flawlessly.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item, idx) => {
                const ItemIcon = item.icon;
                return (
                  <div 
                    key={idx} 
                    className="bento-tile p-4 border border-slate-200 hover:border-blue-400/30 bg-white hover:shadow-sm transition-all"
                  >
                    <div 
                      className="w-8 h-8 rounded-lg flex items-center justify-center mb-3"
                      style={{
                        background: `${item.color}12`,
                        border: `1px solid ${item.color}25`
                      }}
                    >
                      <ItemIcon size={16} style={{ color: item.color }} />
                    </div>
                    <h4 className="text-xs font-bold text-slate-800 mb-1">{item.title}</h4>
                    <p className="text-[10px] text-slate-500 leading-relaxed">{item.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
