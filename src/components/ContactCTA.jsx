import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Send, CheckCircle2, AlertCircle, Clock, ShieldCheck, Mail } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { CONTACT_EMAIL } from '../constants';

const HEAR_OPTIONS = [
  'Google Search', 'LinkedIn', 'Referral', 'GitHub', 'Other'
];

const SERVICE_OPTIONS = [
  'Custom Software', 'AI & Automation', 'API Integrations', 'Consulting & Strategy'
];

export default function ContactCTA() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sendError, setSendError] = useState(null);
  const [form, setForm] = useState({
    name: '', email: '', phone: '', service: '', message: '', source: '',
  });

  const [time, setTime] = useState('');

  // Local clock tracker
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) =>
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const selectOption = (field, val) => {
    setForm((prev) => ({ ...prev, [field]: val }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.service) {
      setSendError('Please select a service type.');
      return;
    }
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
        setSendError(err?.text || 'Transmission failure. Please re-try.');
      });
  };

  const resetForm = () => {
    setForm({ name: '', email: '', phone: '', service: '', message: '', source: '' });
    setSubmitted(false);
  };

  return (
    <section id="contact" className="relative py-28 px-4 md:px-8 overflow-hidden bg-slate-50/50">
      <div className="absolute inset-0 pointer-events-none opacity-20 dot-pattern" />

      <div className="relative z-10 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* LEFT: Metadata Briefing panel (col-span-5) */}
          <div className="lg:col-span-5 bento-tile p-8 md:p-10 flex flex-col justify-between min-h-[400px] bg-white border border-slate-200">
            <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

            <div>
              <div className="section-badge mb-3">
                Transmit Inquiry
              </div>
              <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tight leading-[1.05] mb-6">
                Build the future with certainty.
              </h2>
              <p className="text-xs md:text-sm text-slate-500 leading-relaxed mb-8">
                Every enterprise partnership begins with structured requirements. Tell us what modules you require, and we will initiate architectural reviews within 24 hours.
              </p>

              {/* Status metrics */}
              <div className="space-y-4 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <Clock size={14} className="text-blue-600" />
                  <span>HQ Time: <b className="text-slate-800 font-sans">{time} IST</b></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <ShieldCheck size={14} className="text-purple-650" />
                  <span>Security: <b className="text-slate-800">Mutual NDA Active on Request</b></span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-600">
                  <Mail size={14} className="text-amber-600" />
                  <span>Primary: <b className="text-slate-800 font-semibold">{CONTACT_EMAIL}</b></span>
                </div>
              </div>
            </div>

            {/* Chips */}
            <div className="flex flex-wrap gap-2 mt-8">
              {['< 24h SLA Response', 'Fixed-Price Contracts', 'Detailed Estimates'].map((c) => (
                <span key={c} className="px-3 py-1 rounded-full bg-slate-50 border border-slate-200 text-[9px] font-bold text-slate-500 shadow-sm">
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* RIGHT: Console Form Panel (col-span-7) */}
          <div className="lg:col-span-7 bento-tile p-6 md:p-10 relative bg-white border border-slate-200 shadow-sm">
            <div className="absolute inset-0 opacity-10 dot-pattern pointer-events-none" />

            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center py-16"
                >
                  <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-250 flex items-center justify-center mb-5 text-emerald-600">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-lg font-black text-slate-900 mb-2">Transmission Successful</h3>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed mb-8">
                    Your briefing details have been received. Our team will contact you within 24 hours.
                  </p>
                  <button onClick={resetForm} className="btn-outline py-2.5 px-6 text-xs">
                    ← Transmit New Packet
                  </button>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  <div className="border-b border-slate-100 pb-3 mb-4 flex items-center justify-between">
                    <span className="text-[10px] font-sans font-bold text-slate-400 uppercase tracking-widest">Project Inquiry Form</span>
                    <span className="text-[9px] text-blue-600 font-sans font-bold">* Required inputs</span>
                  </div>

                  {/* Name & Email inputs side-by-side */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wide">Your Name *</label>
                      <input
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        placeholder="John Doe"
                        className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wide">Email Address *</label>
                      <input
                        name="email"
                        type="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        placeholder="john@example.com"
                        className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Phone & Hear About Us */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wide">Phone (with country code)</label>
                      <input
                        name="phone"
                        type="tel"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-all"
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wide">How did you hear about us?</label>
                      <div className="flex flex-wrap gap-1.5 mt-1">
                        {HEAR_OPTIONS.map((opt) => (
                          <button
                            type="button"
                            key={opt}
                            onClick={() => selectOption('source', opt)}
                            className={`px-3 py-1.5 rounded-lg text-[10px] font-bold border transition-all duration-300 ${
                              form.source === opt 
                                ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                                : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Service Needed Selection */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wide">Select Service Type *</label>
                    <div className="flex flex-wrap gap-2">
                      {SERVICE_OPTIONS.map((svc) => (
                        <button
                          type="button"
                          key={svc}
                          onClick={() => selectOption('service', svc)}
                          className={`px-3 py-2 rounded-xl text-[10px] font-bold border transition-all duration-300 ${
                            form.service === svc 
                              ? 'bg-blue-50 border-blue-200 text-blue-600 shadow-sm' 
                              : 'border-slate-200 bg-white text-slate-500 hover:text-slate-800 hover:bg-slate-50 hover:border-slate-300'
                          }`}
                        >
                          {svc}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-1.5">
                    <label className="text-[9px] text-slate-400 font-sans font-bold uppercase tracking-wide">Project Brief *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Outline details, features, integration complexity, or timeline specifications..."
                      className="w-full bg-white border border-slate-200 hover:border-slate-350 focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 rounded-xl px-4 py-3 text-xs text-slate-800 outline-none transition-all resize-none"
                    />
                  </div>

                  {/* Error diagnostics */}
                  {sendError && (
                    <div className="flex items-start gap-2 p-3 bg-red-50 border border-red-200 text-red-650 text-xs rounded-xl">
                      <AlertCircle size={14} className="shrink-0 mt-0.5" />
                      <span>{sendError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <div className="pt-4">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full justify-center py-3.5 text-xs font-semibold"
                    >
                      {loading ? (
                        <span className="flex items-center gap-2">
                          <span className="w-3.5 h-3.5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                          Transmitting details...
                        </span>
                      ) : (
                        <span className="flex items-center gap-1.5">
                          Submit Inquiry <Send size={12} />
                        </span>
                      )}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
