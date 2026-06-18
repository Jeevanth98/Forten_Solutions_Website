import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Linkedin, Github, Twitter } from 'lucide-react';
import { CONTACT_EMAIL, CONTACT_PHONES, CONTACT_LOCATION } from '../constants';

const footerLinks = {
  Services: [
    { label: 'Website Development', href: '#services' },
    { label: 'Application Development', href: '#services' },
    { label: 'AI Automation', href: '#services' },
    { label: 'Enterprise Software', href: '#services' },
    { label: 'Project Management', href: '#services' },
    { label: 'Cloud Solutions', href: '#services' },
  ],
  Solutions: [
    { label: 'Business Automation', href: '#services' },
    { label: 'Real-time Analytics', href: '#services' },
    { label: 'AI-Powered Systems', href: '#services' },
    { label: 'Custom APIs', href: '#services' },
    { label: 'Integration Services', href: '#services' },
  ],
  Company: [
    { label: 'About Us', href: '#hero' },
    { label: 'Our Work', href: '#case-studies' },
    { label: 'Technologies', href: '#tech' },
    { label: 'Build a Project', href: '#configurator' },
    { label: 'Contact', href: '#contact' },
  ],
};

/* ── Inline SVG Logo (same as Navbar) ── */
function FooterLogo() {
  return (
    <div className="flex items-center gap-3">
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
          fontWeight: 900,
          fontSize: '13px',
          letterSpacing: '0.14em',
          color: '#ffffff',
          lineHeight: 1,
          display: 'inline-flex',
          alignItems: 'center',
        }}>
          FORT
          <span style={{
            display: 'inline-flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '9px',
            width: '8.5px',
            margin: '0 1.5px',
            transform: 'translateY(-0.5px)',
          }}>
            <span style={{ height: '1.6px', backgroundColor: '#ffffff', borderRadius: '9px' }} />
            <span style={{ height: '1.6px', backgroundColor: '#ffffff', borderRadius: '9px' }} />
            <span style={{ height: '1.6px', backgroundColor: '#ffffff', borderRadius: '9px' }} />
          </span>
          N
        </span>
        <span style={{ fontWeight: 300, fontSize: '7.5px', letterSpacing: '0.38em', color: '#00f0ff', lineHeight: 1 }}>SOLUTIONS</span>
      </div>
    </div>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="relative z-10"
      style={{
        background: '#050508',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Top cyan/violet accent line */}
      <div style={{
        height: '1px',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.4) 30%, rgba(124, 58, 237, 0.4) 50%, rgba(0, 240, 255, 0.4) 70%, transparent 100%)',
      }} />

      {/* Main footer grid */}
      <div className="max-w-7xl mx-auto px-6 py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

          {/* Brand column — 2 cols wide */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <FooterLogo />

            <p className="mt-5 text-xs md:text-sm leading-relaxed text-white/50 max-w-sm">
              We build custom software, AI automations, and digital products that help businesses grow, scale, and lead.
            </p>

            {/* Tagline */}
            <div className="flex items-center gap-2 mt-4">
              <span className="w-4 h-px bg-cyan-400" />
              <span className="text-cyan-400 text-[10px] font-bold tracking-widest uppercase">
                Committed to your success
              </span>
              <span className="w-4 h-px bg-cyan-400" />
            </div>

            {/* Contact info */}
            <div className="mt-8 space-y-3">
              {[
                { Icon: Mail, text: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
                { Icon: Phone, text: CONTACT_PHONES[0], href: `tel:${CONTACT_PHONES[0].replace(/\s/g, '')}` },
                { Icon: MapPin, text: CONTACT_LOCATION, href: '#' },
              ].map(({ Icon, text, href }) => (
                <a
                  key={text}
                  href={href}
                  className="flex items-center gap-2.5 text-xs text-white/50 hover:text-white transition-colors decoration-none"
                  style={{ textDecoration: 'none' }}
                >
                  <Icon size={12} className="text-cyan-400 shrink-0" />
                  <span>{text}</span>
                </a>
              ))}
            </div>

            {/* Social icons */}
            <div className="flex items-center gap-3 mt-8">
              {[
                { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                { Icon: Github, href: '#', label: 'GitHub' },
                { Icon: Twitter, href: '#', label: 'Twitter' },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="flex items-center justify-center w-8 h-8 rounded-lg border border-white/5 hover:border-cyan-400/30 bg-white/5 text-white/50 hover:text-cyan-400 transition-all"
                >
                  <Icon size={14} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([category, links], colIdx) => (
            <motion.div
              key={category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 * (colIdx + 1) }}
            >
              <h4 className="text-[10px] font-extrabold uppercase tracking-widest text-cyan-400 mb-5">
                {category}
              </h4>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1 group"
                      style={{ textDecoration: 'none' }}
                    >
                      <span className="w-0 h-px bg-cyan-400 transition-all duration-300 group-hover:w-2" />
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/5 bg-black/40">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-white/35">
          <p>© {year} Forten Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {['Privacy Policy', 'Terms of Service'].map((item) => (
              <a
                key={item}
                href="#"
                className="hover:text-white transition-colors"
                style={{ textDecoration: 'none' }}
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
