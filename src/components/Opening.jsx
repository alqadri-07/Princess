import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

export default function Opening({ onOpenGift }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    // Memberikan jeda untuk animasi sebelum pindah halaman dan memutar musik
    setTimeout(() => {
      onOpenGift();
    }, 1500);
  };

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-fantasy-gradient overflow-hidden"
        >
          {/* Floating Particles Background (Sederhana) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {[...Array(20)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                initial={{
                  x: Math.random() * window.innerWidth,
                  y: Math.random() * window.innerHeight,
                }}
                animate={{
                  y: [null, Math.random() * -500],
                  opacity: [0.3, 0.8, 0],
                }}
                transition={{
                  duration: Math.random() * 5 + 5,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />
            ))}
          </div>

          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-10 flex flex-col items-center text-center px-6"
          >
            <Sparkles className="w-12 h-12 text-princess-gold mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 drop-shadow-lg">
              For My Princess
            </h1>
            <p className="text-soft-purple text-lg md:text-xl mb-12">
              ✨ A Special Surprise for You ✨
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium text-lg overflow-hidden transition-all hover:bg-white/20 hover:border-white/40 shadow-[0_0_20px_rgba(177,156,217,0.3)]"
            >
              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
              <Gift className="w-6 h-6" />
              <span>Open Your Birthday Gift</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}