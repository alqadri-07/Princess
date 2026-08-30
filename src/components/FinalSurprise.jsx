import React, { useEffect, useState, useRef } from 'react';
import { motion, useInView, AnimatePresence } from 'framer-motion';

// Komponen Kembang Api (Fireworks & Confetti)
const Fireworks = () => {
  const particles = Array.from({ length: 60 }).map((_, i) => ({
    id: i,
    angle: Math.random() * Math.PI * 2,
    velocity: Math.random() * 100 + 50,
    size: Math.random() * 10 + 5,
    color: ['#ffd700', '#b19cd9', '#e6e6fa', '#ff69b4', '#ffffff'][Math.floor(Math.random() * 5)],
    emoji: Math.random() > 0.8 ? ['✨', '🌸', '🎉', '💜'][Math.floor(Math.random() * 4)] : null,
  }));

  return (
    <div className="absolute inset-0 pointer-events-none flex items-center justify-center z-0 overflow-visible">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ x: 0, y: 0, scale: 0, opacity: 1 }}
          animate={{
            x: Math.cos(p.angle) * p.velocity * (Math.random() * 3 + 1),
            y: Math.sin(p.angle) * p.velocity * (Math.random() * 3 + 1) + 200, // Menambah gravitasi ke bawah
            scale: p.emoji ? [0, 1.5, 1] : [0, 1, 0],
            opacity: [1, 1, 0],
          }}
          transition={{ duration: 3, ease: "easeOut" }}
          className="absolute"
          style={{
            backgroundColor: p.emoji ? 'transparent' : p.color,
            width: p.emoji ? 'auto' : `${p.size}px`,
            height: p.emoji ? 'auto' : `${p.size}px`,
            borderRadius: '50%',
            fontSize: p.emoji ? '24px' : 'auto',
            boxShadow: p.emoji ? 'none' : `0 0 10px ${p.color}`,
          }}
        >
          {p.emoji && p.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default function FinalSurprise() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-30%" });
  
  // stage 0: Standby
  // stage 1: Layar Gelap
  // stage 2: "One last thing..."
  // stage 3: Ledakan Surprise!
  // stage 4: Final Message
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (isInView) {
      setTimeout(() => setStage(1), 500);   // Mulai gelap
      setTimeout(() => setStage(2), 2500);  // Muncul teks "One last thing..."
      setTimeout(() => setStage(3), 6000);  // Teks hilang, ledakan kembang api!
      setTimeout(() => setStage(4), 8500);  // Muncul pesan penutup
    }
  }, [isInView]);

  return (
    <section 
      ref={containerRef} 
      className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden"
    >
      {/* Overlay Gelap Dinamis */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: stage >= 1 && stage < 3 ? 1 : 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-[#0a0212] z-10 pointer-events-none"
      />

      <div className="relative z-20 flex flex-col items-center justify-center text-center px-4 w-full h-full min-h-[50vh]">
        
        <AnimatePresence mode="wait">
          {/* Teks Suspense */}
          {stage === 2 && (
            <motion.div
              key="suspense"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, filter: "blur(10px)" }}
              transition={{ duration: 1.5 }}
              className="absolute text-2xl md:text-3xl text-gray-400 font-light italic"
            >
              "One last thing..."
            </motion.div>
          )}

          {/* Klimaks: Happy Birthday & Pesan Penutup */}
          {stage >= 3 && (
            <motion.div
              key="climax"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.5, type: "spring", bounce: 0.4 }}
              className="relative z-30 flex flex-col items-center w-full max-w-3xl"
            >
              <h1 className="text-4xl md:text-6xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-[#fff] to-[#ffd700] mb-8 drop-shadow-[0_0_20px_rgba(255,215,0,0.4)]">
                Happy Birthday, <br />
                Princess Cantik 👑💜
              </h1>

              {stage >= 4 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 2 }}
                  className="bg-black/20 backdrop-blur-md border border-[#b19cd9]/30 p-6 md:p-10 rounded-3xl shadow-2xl"
                >
                  <p className="text-lg md:text-xl text-purple-100 leading-relaxed font-light">
                    May this new chapter of your life be filled with beautiful moments, 
                    unforgettable memories, endless happiness, and everything your heart wishes for.
                  </p>
                  <div className="mt-8 pt-6 border-t border-purple-500/20 text-[#b19cd9] font-medium text-lg">
                    ✨ Welcome to {new Date().getFullYear()} ✨
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Memicu Kembang Api saat Stage 3 */}
        {stage >= 3 && <Fireworks />}
      </div>
    </section>
  );
}