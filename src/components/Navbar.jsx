import { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Activity, Cpu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const navLinks = [
  { label: 'Services', href: '#services' },
  { label: 'Work', href: '#case-studies' },
  { label: 'Tech', href: '#tech' },
  { label: 'Build', href: '#configurator' },
  { label: 'Contact', href: '#contact' },
];

const faqs = [
  {
    q: 'How long does a typical project take?',
    a: 'Depends on scope. A quick MVP takes 2–4 weeks. A small project runs 4–8 weeks. Mid-sized products take 2–5 months. We give you a precise timeline after our initial discovery call.',
  },
  {
    q: 'What is your pricing model?',
    a: 'We work on fixed-price contracts for well-scoped projects, and time & material (T&M) for evolving products. MVPs start from ₹30K–₹80K; full platforms from ₹2L+. We always quote upfront with no surprises.',
  },
  {
    q: 'Do you provide post-launch support?',
    a: 'Yes. We offer monthly maintenance retainers starting from ₹15K/month, covering bug fixes, feature updates, security patches, dependency upgrades, and performance monitoring.',
  },
  {
    q: 'What technologies do you work with?',
    a: 'Our core stack: React/Next.js, Node.js, Python/FastAPI, PostgreSQL, Supabase, OpenAI/LangChain, Docker, AWS/Vercel. We also build mobile with React Native and Flutter.',
  },
  {
    q: 'Can you work with our existing codebase?',
    a: 'Absolutely. We do audits, refactors, and feature additions on existing systems. We review your code, document everything, and propose a clean plan before touching anything.',
  },
  {
    q: 'How do we communicate during the project?',
    a: 'We set up a shared Slack or WhatsApp channel from day one. You get weekly demo calls, a live progress board, and direct access to your developer any time. No black-box development.',
  },
];

/* ── Inline SVG Logo matching provided design ── */
function FortenLogo() {
  return (
    <a href="#hero" data-cursor="link" className="flex items-center gap-3 group" style={{ textDecoration: 'none' }}>
      <svg width="34" height="30" viewBox="0 0 38 34" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Right/Top rounded square outline */}
        <rect x="13" y="1" width="21" height="21" rx="5.5" stroke="#00f0ff" strokeWidth="4" fill="none" />
        {/* Left/Bottom rounded square outline */}
        <rect x="1" y="11" width="21" height="21" rx="5.5" stroke="#00f0ff" strokeWidth="4" fill="none" />
        {/* Overlap fix to make them interlock: redraw the bottom-left corner of the right/top square */}
        <path d="M 13 14 L 13 16.5 A 5.5 5.5 0 0 0 18.5 22 L 25 22" stroke="#00f0ff" strokeWidth="4" strokeLinecap="round" fill="none" />
      </svg>
      <div className="flex flex-col" style={{ gap: '1px' }}>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 900,
          fontSize: '14px',
          letterSpacing: '0.12em',
          color: '#ffffff',
          lineHeight: 1,
          textTransform: 'uppercase',
          display: 'inline-flex',
          alignItems: 'center',
        }}>
          FORT
          <span style={{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '9.5px',
            width: '9px',
            margin: '0 1.5px',
            transform: 'translateY(-0.5px)',
          }}>
            <span style={{ height: '1.8px', backgroundColor: '#ffffff', borderRadius: '9px' }} />
            <span style={{ height: '1.8px', backgroundColor: '#ffffff', borderRadius: '9px' }} />
            <span style={{ height: '1.8px', backgroundColor: '#ffffff', borderRadius: '9px' }} />
          </span>
          N
        </span>
        <span style={{
          fontFamily: 'Inter, sans-serif',
          fontWeight: 300,
          fontSize: '8px',
          letterSpacing: '0.34em',
          color: '#00f0ff',
          lineHeight: 1,
          textTransform: 'uppercase',
        }}>
          SOLUTIONS
        </span>
      </div>
    </a>
  );
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [faqOpen, setFaqOpen] = useState(false);
  const [openFaqIdx, setOpenFaqIdx] = useState(null);
  const [latency, setLatency] = useState(12);
  const [cpuLoad, setCpuLoad] = useState(6.4);
  const faqRef = useRef(null);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Simulate server status changes
  useEffect(() => {
    const interval = setInterval(() => {
      setLatency(Number((10 + Math.random() * 4).toFixed(0)));
      setCpuLoad(Number((4.5 + Math.random() * 3).toFixed(1)));
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (faqRef.current && !faqRef.current.contains(e.target)) {
        setFaqOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    const onScroll = () => setFaqOpen(false);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace('#', ''));
    const observers = [];
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: '-30% 0px -60% 0px' }
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 left-0 right-0 z-[1000] flex justify-center px-4"
        style={{ paddingTop: scrolled ? '14px' : '24px' }}
      >
        <div
          className="bento-tile flex items-center justify-between transition-all duration-500"
          style={{
            width: scrolled ? 'min(1040px, 100%)' : 'min(1240px, 100%)',
            padding: '12px 28px',
            background: scrolled ? 'rgba(5, 5, 8, 0.85)' : 'rgba(10, 10, 15, 0.5)',
            borderColor: scrolled ? 'rgba(0, 240, 255, 0.15)' : 'rgba(255, 255, 255, 0.05)',
            boxShadow: scrolled 
              ? '0 10px 40px rgba(0,0,0,0.8), 0 0 30px rgba(0, 240, 255, 0.05)'
              : '0 8px 30px rgba(0,0,0,0.4)',
          }}
        >
          {/* Logo */}
          <FortenLogo />

          {/* Desktop Nav Links */}
          <ul className="hidden md:flex items-center gap-7">
            {navLinks.map((link) => {
              const id = link.href.replace('#', '');
              const isActive = activeSection === id;
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    data-cursor="link"
                    className="relative text-[13px] font-medium tracking-wide transition-colors duration-300 py-1"
                    style={{ color: isActive ? '#00f0ff' : 'rgba(255,255,255,0.65)' }}
                  >
                    <span className="hover:text-white transition-colors">{link.label}</span>
                    {isActive && (
                      <motion.span
                        layoutId="activeIndicator"
                        className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                  </a>
                </li>
              );
            })}

            {/* FAQ Dropdown inside Nav */}
            <li ref={faqRef} className="relative">
              <button
                onClick={() => setFaqOpen((p) => !p)}
                className="flex items-center gap-1 text-[13px] font-medium tracking-wide transition-colors duration-300 hover:text-white"
                style={{
                  color: faqOpen ? '#00f0ff' : 'rgba(255,255,255,0.65)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: 0,
                }}
              >
                FAQ
                <motion.span animate={{ rotate: faqOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown size={12} className="text-cyan-400" />
                </motion.span>
              </button>

              <AnimatePresence>
                {faqOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 12, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 12, scale: 0.95 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute top-8 right-0 z-50 rounded-2xl overflow-hidden"
                    style={{
                      width: '460px',
                      background: 'rgba(8, 8, 12, 0.95)',
                      backdropFilter: 'blur(24px)',
                      border: '1px solid rgba(0, 240, 255, 0.15)',
                      boxShadow: '0 20px 60px rgba(0,0,0,0.9)',
                    }}
                  >
                    {/* Header */}
                    <div className="flex items-center justify-between px-5 py-3 border-b border-white/5 bg-white/[0.02]">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400">
                        System FAQs
                      </span>
                      <button
                        onClick={() => setFaqOpen(false)}
                        className="text-white/40 hover:text-white transition-colors"
                      >
                        <X size={12} />
                      </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[380px] overflow-y-auto scrollbar-thin">
                      {faqs.map((faq, i) => (
                        <div key={i} className="border-b border-white/5 last:border-b-0">
                          <button
                            onClick={() => setOpenFaqIdx(openFaqIdx === i ? null : i)}
                            className="w-full flex items-center justify-between text-left py-3 px-5 hover:bg-white/[0.02] transition-colors"
                          >
                            <span className="text-xs font-semibold text-white/90 pr-4 leading-relaxed">
                              {faq.q}
                            </span>
                            <ChevronDown
                              size={12}
                              className={`text-cyan-400 transition-transform duration-300 ${
                                openFaqIdx === i ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                          <AnimatePresence initial={false}>
                            {openFaqIdx === i && (
                              <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: 'auto', opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.25 }}
                                className="overflow-hidden"
                              >
                                <p className="text-[11px] text-white/60 px-5 pb-4 pt-1 leading-relaxed">
                                  {faq.a}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </li>
          </ul>

          {/* Right Metrics + Action bar */}
          <div className="hidden lg:flex items-center gap-6">
            {/* Live system load display */}
            <div className="flex items-center gap-4 text-[11px] text-white/40 border-r border-white/10 pr-6">
              <div className="flex items-center gap-1.5">
                <Cpu size={12} className="text-cyan-400 animate-pulse" />
                <span>LOAD: <b className="text-white/80">{cpuLoad}%</b></span>
              </div>
              <div className="flex items-center gap-1.5">
                <Activity size={12} className="text-purple-400" />
                <span>PING: <b className="text-white/80">{latency}ms</b></span>
              </div>
            </div>

            <a href="#contact" data-cursor="link" className="btn-primary py-2 px-5 text-xs">
              Brief Us →
            </a>
          </div>

          {/* Mobile hamburger menu */}
          <button
            className="md:hidden text-white/70 hover:text-white"
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Panel */}
      <AnimatePresence>
        {open && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[998] md:hidden bg-black/80 backdrop-blur-md"
              onClick={() => setOpen(false)}
            />
            {/* Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 bottom-0 z-[999] w-80 py-8 px-6 md:hidden flex flex-col"
              style={{
                background: 'rgba(5, 5, 8, 0.95)',
                borderLeft: '1px solid rgba(0, 240, 255, 0.1)',
                boxShadow: '-10px 0 40px rgba(0,0,0,0.9)',
              }}
            >
              <div className="flex items-center justify-between mb-8">
                <span className="text-[10px] font-black uppercase tracking-widest text-cyan-400">
                  Navigation
                </span>
                <button onClick={() => setOpen(false)} className="text-white/40 hover:text-white">
                  <X size={20} />
                </button>
              </div>

              <nav className="flex flex-col gap-2 mb-8">
                {navLinks.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="py-3 px-4 rounded-xl text-[14px] font-semibold text-white/70 hover:text-white hover:bg-white/5 transition-all"
                  >
                    {link.label}
                  </a>
                ))}
              </nav>

              <div className="border-t border-white/5 pt-6 flex flex-col gap-6">
                {/* Live load details on mobile */}
                <div className="flex items-center justify-between text-xs text-white/50 px-4">
                  <span className="flex items-center gap-1.5"><Cpu size={12} className="text-cyan-400" /> CPU: {cpuLoad}%</span>
                  <span className="flex items-center gap-1.5"><Activity size={12} className="text-purple-400" /> Latency: {latency}ms</span>
                </div>

                <a
                  href="#contact"
                  className="btn-primary justify-center text-xs py-3.5"
                  onClick={() => setOpen(false)}
                >
                  Schedule Consultation →
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
