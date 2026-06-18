import { useState, useEffect, useRef } from 'react';
import { motion, useViewportScroll, useTransform } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import bgImage from '../images/bg_landing page.jpg';

export default function HeroTerminal() {
  const sectionRef = useRef(null);

  const { scrollY } = useViewportScroll();
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <motion.section
      ref={sectionRef}
      id="hero"
      className="relative min-h-screen flex items-center pt-28 pb-20 px-6 overflow-hidden"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
        opacity,
      }}
    >
      {/* Removed dot-grid background for cleaner look */}

      {/* Removed Aurora Orb and all glow effects */}

      <div className="relative z-10 w-full max-w-7xl mx-auto lg:-translate-x-12 xl:-translate-x-20 flex flex-col gap-16 justify-start py-20">

        {/* LEFT COLUMN */}
        <div className="flex flex-col gap-8 max-w-2xl">

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className="inline-flex items-center gap-2 self-start"
          >
            <span className="inline-flex items-center gap-1.5 px-3.5 py.5 rounded-full text-[11px] font-semibold uppercase tracking-widest"
              style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                color: '#ffffff',
              }}>
              <span className="w-1.5 h-1.5 rounded-full bg-[#ffffff] animate-pulse" />
              Software Solutions · Vellore, India
            </span>
          </motion.div>

          {/* Headline — word-by-word blur reveal */}
          <div>
            <h1 className="font-black leading-[1.04] tracking-tight text-white"
              style={{ fontSize: 'clamp(2.8rem, 5.5vw, 4.8rem)' }}>
              {/* Line 1: "We Engineer" */}
              {['We', 'Engineer'].map((w, i) => (
                <motion.span key={w} style={{
                  display: 'inline-block', marginRight: '0.28em',
                  color: '#ffffff',
                }}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: 0.18 + i * 0.12, ease: 'easeOut' }}>
                  {w}
                </motion.span>
              ))}
              <br />
              {/* Line 2: "Digital Future" */}
              {['Digital', 'Future'].map((w, i) => (
                <motion.span key={w} style={{
                  display: 'inline-block', marginRight: '0.28em',
                  color: '#ffffff',
                }}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: 0.42 + i * 0.12, ease: 'easeOut' }}>
                  {w}
                </motion.span>
              ))}
              <br />
              {/* Line 3: "For You." */}
              {['For', 'You.'].map((w, i) => (
                <motion.span key={w} style={{
                  display: 'inline-block', marginRight: '0.28em',
                  color: '#ffffff',
                }}
                  initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  transition={{ duration: 0.55, delay: 0.66 + i * 0.12, ease: 'easeOut' }}>
                  {w}
                </motion.span>
              ))}
            </h1>
          </div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            style={{ color: '#ffffff', lineHeight: 1.75, fontSize: '1.05rem', maxWidth: '44ch' }}
          >
            Custom software, AI automations, and full-stack engineering — delivered by a powerhouse team that turns your ideas into production-grade reality.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.65, delay: 0.45 }}
            className="flex flex-wrap gap-4"
          >
            <a href="#configurator" data-cursor="link" className="btn-primary group">
              Build Your Project
              <ArrowRight size={16} className="transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a href="#services" data-cursor="link" className="btn-outline">
              Explore Services
            </a>
          </motion.div>
        </div>

      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: '#06b6d4' }}
      >
        <span className="text-[10px] tracking-[0.2em] uppercase font-medium">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
          className="w-px h-10 rounded-full"
          style={{ background: 'linear-gradient(to bottom, #06b6d466, transparent)' }}
        />
      </motion.div>
    </motion.section>
  );
}

