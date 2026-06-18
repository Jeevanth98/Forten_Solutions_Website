import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          whileHover={{ scale: 1.12 }}
          whileTap={{ scale: 0.92 }}
          data-cursor="link"
          title="Back to top"
          aria-label="Back to top"
          className="fixed bottom-28 right-6 z-[1998] w-10 h-10 rounded-full flex items-center justify-center"
          style={{
            background: 'rgba(37, 99, 235, 0.12)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(37, 99, 235, 0.3)',
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.14), 0 4px 12px rgba(15,23,42,0.08)',
          }}
        >
          <ArrowUp size={15} color="#2563eb" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
