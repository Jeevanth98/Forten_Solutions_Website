import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

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

export default function FAQ() {
  const [open, setOpen] = useState(null);

  return (
    <section id="faq" className="relative z-10 py-28 px-4">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-14"
        >

          <h2 className="section-title">Common Questions</h2>
          <p className="section-subtitle">Everything you need to know before we start.</p>
        </motion.div>

        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="glass-card overflow-hidden transition-all duration-300"
              style={{ borderColor: open === i ? 'rgba(37,99,235,0.3)' : 'rgba(0,0,0,0.08)' }}
            >
              <button
                className="w-full flex items-center justify-between gap-4 p-6 text-left group"
                onClick={() => setOpen(open === i ? null : i)}
                data-cursor="link"
              >
                <span className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors leading-relaxed">
                  {faq.q}
                </span>
                <span
                  className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center transition-all duration-200"
                  style={{
                    background: open === i ? 'rgba(37,99,235,0.1)' : 'rgba(0,0,0,0.04)',
                    border: open === i ? '1px solid rgba(37,99,235,0.2)' : '1px solid rgba(0,0,0,0.08)',
                  }}
                >
                  {open === i
                    ? <Minus size={11} color="#2563eb" />
                    : <Plus size={11} color="#2563eb" />}
                </span>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-6 text-sm text-slate-600 leading-relaxed">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
