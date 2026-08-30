import React from 'react';
import { motion } from 'framer-motion';

// Komponen untuk satu tangkai bunga
const MagicFlower = ({ left, height, delay, scale, rotate }) => {
  return (
    <div 
      className="absolute bottom-0 flex flex-col items-center origin-bottom"
      style={{ left: `${left}%`, transform: `scale(${scale}) rotate(${rotate}deg)` }}
    >
      {/* Kelopak Bunga (Akan mekar setelah tangkai tumbuh) */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ delay: delay + 1, duration: 1.5, type: "spring", bounce: 0.4 }}
        className="relative z-10 -mb-4 flex items-center justify-center"
      >
        {/* SVG Bunga Ungu */}
        <svg width="80" height="80" viewBox="0 0 100 100" className="drop-shadow-[0_0_15px_rgba(177,156,217,0.8)]">
          {/* Kelopak Belakang */}
          <circle cx="30" cy="30" r="20" fill="#b19cd9" />
          <circle cx="70" cy="30" r="20" fill="#b19cd9" />
          <circle cx="30" cy="70" r="20" fill="#b19cd9" />
          <circle cx="70" cy="70" r="20" fill="#b19cd9" />
          {/* Kelopak Depan */}
          <circle cx="50" cy="20" r="22" fill="#e6e6fa" />
          <circle cx="80" cy="50" r="22" fill="#e6e6fa" />
          <circle cx="50" cy="80" r="22" fill="#e6e6fa" />
          <circle cx="20" cy="50" r="22" fill="#e6e6fa" />
          {/* Pusat Bunga */}
          <circle cx="50" cy="50" r="15" fill="#ffd700" className="animate-pulse" />
        </svg>
      </motion.div>

      {/* Tangkai Bunga (Tumbuh dari bawah ke atas) */}
      <motion.div
        initial={{ scaleY: 0 }}
        whileInView={{ scaleY: 1 }}
        viewport={{ once: true, margin: "100px" }}
        transition={{ delay: delay, duration: 1.5, ease: "easeOut" }}
        className="w-1.5 origin-bottom bg-gradient-to-t from-green-900 via-green-600 to-green-400 rounded-t-full shadow-[0_0_10px_rgba(74,222,128,0.3)]"
        style={{ height: `${height}px` }}
      />
    </div>
  );
};

export default function FlowerGarden() {
  // Data sekumpulan bunga yang akan membentuk taman
  const gardenFlowers = [
    { id: 1, left: 10, height: 180, delay: 0.2, scale: 0.8, rotate: -10 },
    { id: 2, left: 25, height: 250, delay: 0.5, scale: 1.2, rotate: 5 },
    { id: 3, left: 40, height: 160, delay: 0.8, scale: 0.9, rotate: -15 },
    { id: 4, left: 55, height: 300, delay: 0.3, scale: 1.5, rotate: 0 }, // Bunga tertinggi di tengah
    { id: 5, left: 70, height: 220, delay: 0.7, scale: 1.1, rotate: 10 },
    { id: 6, left: 85, height: 190, delay: 0.4, scale: 0.85, rotate: -5 },
  ];

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-[#4a0e4e] to-[#2a0845]">
      
      {/* Partikel Magis (Kunang-kunang ungu/emas) */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(25)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1.5 h-1.5 rounded-full"
            style={{
              backgroundColor: Math.random() > 0.5 ? '#b19cd9' : '#ffd700',
              left: `${Math.random() * 100}%`,
              bottom: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100 - Math.random() * 200],
              x: [0, Math.random() * 50 - 25],
              opacity: [0, 0.8, 0],
              scale: [0, Math.random() * 2 + 1, 0]
            }}
            transition={{
              duration: Math.random() * 5 + 5,
              repeat: Infinity,
              delay: Math.random() * 5,
              ease: "easeInOut"
            }}
          />
        ))}
      </div>

      {/* Judul Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="z-20 text-center px-6 mb-40 mt-[-10vh]"
      >
        <h2 className="text-3xl md:text-5xl font-serif text-white mb-4 drop-shadow-[0_0_15px_rgba(230,230,250,0.5)]">
          A Garden Made Just For You 🌸
        </h2>
        <p className="text-[#b19cd9] text-lg md:text-xl backdrop-blur-sm bg-black/10 inline-block px-6 py-2 rounded-full border border-purple-500/30">
          May your life bloom beautifully, just like these flowers.
        </p>
      </motion.div>

      {/* Render Taman Bunga dari Bawah */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none">
        {gardenFlowers.map((flower) => (
          <MagicFlower 
            key={flower.id}
            left={flower.left}
            height={flower.height}
            delay={flower.delay}
            scale={flower.scale}
            rotate={flower.rotate}
          />
        ))}
      </div>

    </section>
  );
}