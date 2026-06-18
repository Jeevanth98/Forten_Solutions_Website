import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X } from 'lucide-react';

export default function Toast({ show, onClose, message = 'Message sent! We\'ll reply within 24 hours.' }) {
  useEffect(() => {
    if (!show) return;
    const t = setTimeout(onClose, 4500);
    return () => clearTimeout(t);
  }, [show, onClose]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 60, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 240, damping: 22 }}
          role="alert"
          aria-live="polite"
          className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[3000] flex items-center gap-3 px-5 py-3.5 rounded-2xl"
          style={{
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(28px) saturate(180%)',
            WebkitBackdropFilter: 'blur(28px) saturate(180%)',
            border: '1px solid rgba(37, 99, 235, 0.25)',
            boxShadow: '0 8px 40px rgba(37, 99, 235, 0.08), inset 0 1px 0 rgba(255,255,255,0.9)',
            minWidth: '280px',
            maxWidth: 'calc(100vw - 32px)',
          }}
        >
          {/* Progress bar */}
          <motion.div
            className="absolute bottom-0 left-0 h-[2px] rounded-b-2xl"
            initial={{ width: '100%' }}
            animate={{ width: '0%' }}
            transition={{ duration: 4.4, ease: 'linear' }}
            style={{ background: 'linear-gradient(to right, #2563eb, #4f46e5)' }}
          />

          <CheckCircle2 size={18} className="text-green-500 shrink-0" />
          <p className="text-sm text-slate-800 font-medium flex-1">{message}</p>
          <button
            onClick={onClose}
            className="shrink-0 text-slate-400 hover:text-slate-700 transition-colors"
            data-cursor="link"
          >
            <X size={14} />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
