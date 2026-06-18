import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Linkedin } from 'lucide-react';
import emailjs from '@emailjs/browser';
import Toast from './Toast';
import { CONTACT_EMAIL, CONTACT_PHONES, CONTACT_LOCATION, CONTACT_MAPS_URL } from '../constants';

const contactInfo = [
  { icon: Mail, label: 'Email', value: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}`, color: '#2563eb' },
  { icon: Phone, label: 'Phone', value: CONTACT_PHONES[0], href: `tel:${CONTACT_PHONES[0].replace(/\s/g, '')}`, color: '#2563eb', linkedin: 'https://www.linkedin.com/in/monish-k-018b8728a/' },
  { icon: Phone, label: 'Phone', value: CONTACT_PHONES[1], href: `tel:${CONTACT_PHONES[1].replace(/\s/g, '')}`, color: '#2563eb', linkedin: 'https://www.linkedin.com/in/jeevanthsekar93/' },
  { icon: Phone, label: 'Phone', value: CONTACT_PHONES[2], href: `tel:${CONTACT_PHONES[2].replace(/\s/g, '')}`, color: '#2563eb', linkedin: 'https://www.linkedin.com/in/sheldon-chanthiranath/' },
  { icon: MapPin, label: 'Location', value: CONTACT_LOCATION, href: CONTACT_MAPS_URL, color: '#2563eb' },
];

const services = [
  'Custom Software Development',
  'AI & Automation',
  'Web Application',
  'Mobile Application',
  'Project Maintenance',
  'Tech Consulting',
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', service: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [sendError, setSendError] = useState(false);

  const handleChange = (e) => setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSendError(false);

    const templateParams = {
      from_name: form.name,
      from_email: form.email,
      service: form.service || 'Not specified',
      message: form.message,
      to_email: CONTACT_EMAIL,
    };

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        templateParams,
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSubmitted(true);
        setShowToast(true);
      })
      .catch((err) => {
        setLoading(false);
        const msg = err?.text || err?.message || JSON.stringify(err) || 'Unknown error';
        setSendError(`EmailJS error: ${msg}`);
        console.error('EmailJS failed:', err);
      });
  };

  return (
    <section id="contact" className="relative z-10 py-28 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium uppercase tracking-widest mb-5 border"
            style={{ borderColor: 'rgba(59,130,246,0.2)', background: 'rgba(59,130,246,0.05)', color: '#3b82f6' }}>
            Let's Connect
          </div>
          <h2 className="section-title">Start Your Project Today</h2>
          <p className="section-subtitle">
            Got an idea? A problem to solve? Let's talk. We respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact Info Panel */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-2 space-y-4"
          >
            <div className="glass-card p-7">
              <h3 className="text-lg font-bold text-slate-800 mb-6">Get in Touch</h3>
              <div className="space-y-5">
                {contactInfo.map((info, i) => {
                  const Icon = info.icon;
                  return (
                    <div key={i} className="flex items-center gap-4">
                      <a
                        href={info.href}
                        target={info.label === 'Location' ? '_blank' : undefined}
                        rel="noreferrer"
                        data-cursor="link"
                        className="flex items-center gap-4 group flex-1 min-w-0"
                      >
                        <div
                          className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110"
                          style={{ background: `${info.color}15`, border: `1px solid ${info.color}30` }}
                        >
                          <Icon size={16} style={{ color: info.color }} />
                        </div>
                        <div className="min-w-0">
                          <p className="text-xs text-slate-500 uppercase tracking-wider">{info.label}</p>
                          <p className="text-sm text-slate-600 group-hover:text-blue-600 transition-colors font-medium truncate">
                            {info.value}
                          </p>
                        </div>
                      </a>
                      {info.linkedin && (
                        <a
                          href={info.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label="LinkedIn profile"
                          className="w-9 h-9 rounded-lg flex items-center justify-center shrink-0 text-slate-500 hover:text-[#0A66C2] hover:bg-[#0A66C2]/10 transition-all duration-200"
                        >
                          <Linkedin size={16} />
                        </a>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick response promise */}
            <div className="glass-card p-5 flex items-center gap-4"
              style={{ borderColor: 'rgba(34,197,94,0.2)' }}>
              <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse shrink-0" />
              <div>
                <p className="text-sm font-semibold text-slate-800">Available & Ready</p>
                <p className="text-xs text-slate-500">We respond within 24 hours on business days</p>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-3"
          >
            <div className="glass-card p-8 h-full">
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center h-full text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 200, delay: 0.1 }}
                  >
                    <CheckCircle2 size={60} className="text-green-400 mb-5" />
                  </motion.div>
                  <h3 className="text-2xl font-bold text-slate-800 mb-3">Message Sent!</h3>
                  <p className="text-slate-600 mb-6">
                    Thanks for reaching out. We'll get back to you within 24 hours.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setForm({ name: '', email: '', service: '', message: '' }); }}
                    className="btn-outline text-sm"
                    data-cursor="link"
                  >
                    Send Another Message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="Your name"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Email *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="you@company.com"
                        className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 outline-none focus:border-blue-500/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Service Needed</label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-blue-500/50 transition-colors appearance-none"
                      style={{ color: form.service ? '#1e293b' : '#94a3b8' }}
                    >
                      <option value="" style={{ background: '#ffffff', color: '#94a3b8' }}>Select a service...</option>
                      {services.map((s) => (
                        <option key={s} value={s} style={{ background: '#ffffff', color: '#1e293b' }}>{s}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Tell us about your project *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      placeholder="What are you building? What problem are you solving? Any timeline or budget in mind?"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-slate-800 text-sm placeholder:text-slate-400 outline-none focus:border-blue-500/50 transition-colors resize-none"
                    />
                  </div>

                  {sendError && (
                    <div className="flex items-start gap-2 px-4 py-3 rounded-xl text-sm text-red-400 border border-red-500/20 bg-red-500/5">
                      <AlertCircle size={16} className="shrink-0 mt-0.5" />
                      <span>{typeof sendError === 'string' ? sendError : `Failed to send. Please try again or email us directly at ${CONTACT_EMAIL}`}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    data-cursor="link"
                    className="btn-primary w-full justify-center text-sm disabled:opacity-70"
                  >
                    {loading ? (
                      <span className="flex items-center justify-center gap-2">
                        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }}>
                          <Send size={16} />
                        </motion.div>
                        Sending...
                      </span>
                    ) : (
                      <>Send Message <Send size={16} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </div>
      </div>
      <Toast show={showToast} onClose={() => setShowToast(false)} />
    </section>
  );
}
