import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X, Send, CheckCircle2, AlertCircle } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CONTACT_EMAIL } from '../constants';

const HEAR_OPTIONS = [
  'Google Search', 'LinkedIn', 'Referral from colleague', 'Social Media',
  'Tech conference / Event', 'GitHub', 'Other',
];

export default function ContactCTA() {
  const [formOpen, setFormOpen]   = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading]     = useState(false);
  const [sendError, setSendError] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '', source: '',
  });

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setSendError(null);

    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        {
          from_name:  form.name,
          from_email: form.email,
          phone:      form.phone,
          service:    form.service,
          message:    form.message,
          source:     form.source,
          to_email:   CONTACT_EMAIL,
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY
      )
      .then(() => {
        setLoading(false);
        setSubmitted(true);
      })
      .catch((err) => {
        setLoading(false);
        setSendError(err?.text || 'Failed to send. Please try again.');
      });
  };

  const handleClose = () => {
    setFormOpen(false);
    setSendError(null);
    if (submitted) {
      setTimeout(() => {
        setSubmitted(false);
        setForm({ name: '', email: '', phone: '', service: '', message: '', source: '' });
      }, 400);
    }
  };

  return (
    <section
      id="contact"
      className="relative z-10 overflow-hidden"
      style={{ minHeight: 640 }}
    >
      <div className="flex flex-col lg:flex-row" style={{ minHeight: 640 }}>

        {/* ── LEFT PANEL — always visible blue CTA ── */}
        <div
          className="relative flex flex-col justify-center px-10 md:px-16 py-20 lg:py-24"
          style={{
            background: 'linear-gradient(135deg, #000099 0%, #0000cc 55%, #0018ff 100%)',
            flex: '0 0 44%',
            minHeight: 500,
          }}
        >
          {/* Subtle dot grid overlay */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px)',
              backgroundSize: '28px 28px',
            }}
          />

          {/* Vertical accent line */}
          <div
            className="absolute top-0 bottom-0 right-0 w-px"
            style={{ background: 'rgba(255,255,255,0.08)' }}
          />

          <div className="relative z-10 max-w-md">
            {/* Eyebrow */}
            <div
              className="inline-flex items-center gap-2 mb-5 text-[11px] font-semibold uppercase tracking-widest"
              style={{ color: 'rgba(219,234,254,0.8)' }}
            >
              <span className="w-5 h-px" style={{ background: 'rgba(219,234,254,0.5)' }} />
              Start Your Project Today
            </div>

            {/* Headline */}
            <h2
              className="font-black text-white leading-[1.04] mb-5"
              style={{ fontSize: 'clamp(2.5rem, 4.2vw, 3.8rem)' }}
            >
              Build the future<br />with certainty.
            </h2>

            {/* Sub */}
            <p
              className="text-base md:text-[17px] leading-relaxed mb-12 opacity-90"
              style={{ color: 'rgba(219,234,254,0.75)' }}
            >
              Every outcome starts with a conversation. Tell us what you're building and we'll respond within 24 hours.
            </p>

            {/* CTA button */}
            <motion.button
              onClick={() => setFormOpen(true)}
              className="flex items-center gap-4 group"
              whileHover="hover"
            >
              <span
                className="text-lg md:text-xl font-bold text-white"
                style={{ letterSpacing: '-0.01em' }}
              >
                Let's talk
              </span>
              <motion.div
                variants={{ hover: { scale: 1.12, x: 3 } }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                className="w-11 h-11 rounded-full flex items-center justify-center"
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  border: '1.5px solid rgba(255,255,255,0.4)',
                }}
              >
                <ArrowRight size={18} color="white" />
              </motion.div>
            </motion.button>

            {/* Trust chips */}
            <div className="flex flex-wrap gap-2 mt-12">
              {['< 24h response', 'Fixed-price contracts', 'NDA on request'].map((chip) => (
                <span
                  key={chip}
                  className="px-3 py-1 rounded-full text-[11px] font-medium"
                  style={{
                    background: 'rgba(255,255,255,0.1)',
                    border: '1px solid rgba(255,255,255,0.2)',
                    color: 'rgba(255,255,255,0.8)',
                  }}
                >
                  {chip}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT PANEL — photo base + sliding form overlay ── */}
        <div className="relative flex-1 overflow-hidden" style={{ minHeight: 500 }}>
          {/* Background photo — always present */}
          <img
            src="/team-meeting.png"
            alt="Forten Solutions team"
            className="absolute inset-0 w-full h-full object-cover"
            draggable={false}
          />
          {/* Subtle dark scrim so text is legible when dimmed */}
          <div
            className="absolute inset-0 transition-opacity duration-500"
            style={{ background: 'rgba(11,15,25,0.35)', opacity: formOpen ? 1 : 0 }}
          />

          {/* ── Form slide panel — enters from LEFT ── */}
          <AnimatePresence>
            {formOpen && (
              <motion.div
                key="form-panel"
                initial={{ x: '-100%' }}
                animate={{ x: 0 }}
                exit={{ x: '-100%' }}
                transition={{ type: 'spring', stiffness: 280, damping: 34 }}
                className="absolute inset-0 overflow-y-auto"
                style={{
                  background: '#0D1117',
                  borderLeft: '1px solid #1E293B',
                }}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-5 right-5 w-8 h-8 rounded-full flex items-center justify-center transition-colors z-20"
                  style={{
                    background: 'rgba(255,255,255,0.05)',
                    border: '1px solid #222F43',
                    color: '#64748B',
                  }}
                  aria-label="Close form"
                >
                  <X size={14} />
                </button>

                <div className="px-8 py-10 md:px-12">
                  {submitted ? (
                    /* ── Success state ── */
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="flex flex-col items-center justify-center text-center py-16"
                    >
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: 'spring', stiffness: 250, delay: 0.1 }}
                        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
                        style={{
                          background: 'rgba(6,182,212,0.1)',
                          border: '1px solid rgba(6,182,212,0.3)',
                        }}
                      >
                        <CheckCircle2 size={30} style={{ color: '#06B6D4' }} />
                      </motion.div>
                      <h3 className="text-xl font-bold text-white mb-2">We've got your message!</h3>
                      <p className="text-[14px] mb-8" style={{ color: '#B8C0CC' }}>
                        Our team will reach out within 24 hours to kick off the conversation.
                      </p>
                      <button onClick={handleClose} className="btn-outline text-sm">
                        ← Back
                      </button>
                    </motion.div>
                  ) : (
                    /* ── Form ── */
                    <>
                      <div className="mb-7">
                        <h3 className="text-2xl font-black text-white mb-1">
                          Ready to Pursue Opportunity?
                        </h3>
                        <p className="text-[13px]" style={{ color: '#64748B' }}>
                          Every outcome starts with a conversation
                        </p>
                      </div>

                      <form onSubmit={handleSubmit} className="space-y-3.5">
                        {/* Name */}
                        <input
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Your name *"
                          className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #1E293B',
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'rgba(37,99,235,0.5)')}
                          onBlur={(e) => (e.target.style.borderColor = '#1E293B')}
                        />

                        {/* Email */}
                        <input
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="Email address *"
                          className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #1E293B',
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'rgba(37,99,235,0.5)')}
                          onBlur={(e) => (e.target.style.borderColor = '#1E293B')}
                        />

                        {/* Phone */}
                        <div className="grid grid-cols-[120px_1fr] gap-3">
                          <input
                            placeholder="+91"
                            className="px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid #1E293B',
                              color: '#FFFFFF',
                            }}
                            readOnly
                          />
                          <input
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="Phone number"
                            className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200"
                            style={{
                              background: 'rgba(255,255,255,0.04)',
                              border: '1px solid #1E293B',
                              color: '#FFFFFF',
                            }}
                            onFocus={(e) => (e.target.style.borderColor = 'rgba(37,99,235,0.5)')}
                            onBlur={(e) => (e.target.style.borderColor = '#1E293B')}
                          />
                        </div>

                        {/* Service Needed */}
                        <select
                          name="service"
                          value={form.service}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200 appearance-none"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #1E293B',
                            color: form.service ? '#FFFFFF' : '#475569',
                            cursor: 'pointer',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'rgba(37,99,235,0.5)')}
                          onBlur={(e) => (e.target.style.borderColor = '#1E293B')}
                        >
                          <option value="" style={{ background: '#0D1117' }}>Service needed...</option>
                          {['Custom Software Development', 'AI & Automation', 'Web Application', 'Mobile Application', 'Project Maintenance', 'Tech Consulting'].map((s) => (
                            <option key={s} value={s} style={{ background: '#0D1117', color: '#fff' }}>{s}</option>
                          ))}
                        </select>

                        {/* Message */}
                        <textarea
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          required
                          rows={4}
                          placeholder="Tell us about your project — what are you building? Any timeline or budget in mind? *"
                          className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200 resize-none"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #1E293B',
                            color: '#FFFFFF',
                          }}
                          onFocus={(e) => (e.target.style.borderColor = 'rgba(37,99,235,0.5)')}
                          onBlur={(e) => (e.target.style.borderColor = '#1E293B')}
                        />

                        {/* Source */}
                        <select
                          name="source"
                          value={form.source}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-xl text-[13.5px] outline-none transition-all duration-200 appearance-none"
                          style={{
                            background: 'rgba(255,255,255,0.04)',
                            border: '1px solid #1E293B',
                            color: form.source ? '#FFFFFF' : '#475569',
                            cursor: 'pointer',
                          }}
                        >
                          <option value="" style={{ background: '#0D1117' }}>How did you hear about us?</option>
                          {HEAR_OPTIONS.map((opt) => (
                            <option key={opt} value={opt} style={{ background: '#0D1117', color: '#fff' }}>
                              {opt}
                            </option>
                          ))}
                        </select>

                        {/* Error */}
                        {sendError && (
                          <div
                            className="flex items-start gap-2 px-4 py-3 rounded-xl text-[12.5px]"
                            style={{
                              background: 'rgba(239,68,68,0.05)',
                              border: '1px solid rgba(239,68,68,0.15)',
                              color: '#EF4444',
                            }}
                          >
                            <AlertCircle size={14} className="mt-0.5 shrink-0" />
                            {sendError}
                          </div>
                        )}

                        {/* Submit */}
                        <motion.button
                          type="submit"
                          disabled={loading}
                          className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-[14px] transition-all duration-200 disabled:opacity-60"
                          style={{ background: '#2563EB', color: '#fff' }}
                          whileHover={{ background: '#1D4ED8' }}
                          whileTap={{ scale: 0.98 }}
                        >
                          {loading ? (
                            <>
                              <motion.div
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 0.75, ease: 'linear' }}
                                className="w-4 h-4 rounded-full border-t-transparent border-2 border-white"
                              />
                              Sending...
                            </>
                          ) : (
                            <>
                              Submit Enquiry
                              <Send size={14} />
                            </>
                          )}
                        </motion.button>

                        <p className="text-center text-[11px]" style={{ color: '#334155' }}>
                          By submitting you agree to our privacy policy. We never share your data.
                        </p>
                      </form>
                    </>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
