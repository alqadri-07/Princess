import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Gift, Sparkles } from 'lucide-react';

import MessageAndGallery from './components/MessageAndGallery';
import InteractiveCake from './components/InteractiveCake';
import FinalSurprise from './components/FinalSurprise';
import MusicPlayer from './components/MusicPlayer';

// --- 1. KOMPONEN OPENING SCREEN (Taman Mawar Ungu Padat) ---
function Opening({ onOpenGift }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleOpen = () => {
    setIsOpening(true);
    setTimeout(() => {
      onOpenGift();
    }, 1500);
  };

  const denseRoseGarden = Array.from({ length: 35 }).map((_, i) => ({
    id: i,
    left: Math.random() * 110 - 5,
    height: Math.random() * 250 + 60,
    delay: Math.random() * 2,
    scale: Math.random() * 0.7 + 0.4,
    swayDuration: Math.random() * 3 + 3,
    swayAngle: Math.random() * 4 + 2,
  }));

  denseRoseGarden.sort((a, b) => b.height - a.height);

  return (
    <AnimatePresence>
      {!isOpening && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
          transition={{ duration: 1 }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-[#2a0845] to-[#4a0e4e] overflow-hidden"
        >
          {/* Partikel Latar Belakang */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
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

          {/* Kebun Mawar Bawah */}
          <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none z-10 flex items-end">
            {denseRoseGarden.map((rose, index) => (
              <motion.div
                key={rose.id}
                className="absolute bottom-0 flex flex-col items-center origin-bottom"
                style={{ 
                  left: `${rose.left}%`, 
                  transform: `scale(${rose.scale})`,
                  zIndex: index 
                }}
                animate={{ rotate: [-rose.swayAngle, rose.swayAngle, -rose.swayAngle] }}
                transition={{
                  duration: rose.swayDuration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: Math.random() * 2,
                }}
              >
                <motion.div
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ delay: rose.delay + 1, duration: 1.5, type: "spring", bounce: 0.4 }}
                  className="relative z-10 -mb-5 flex items-center justify-center"
                >
                  <svg width="90" height="90" viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(177,156,217,0.6)]">
                    <g transform="translate(50, 50)">
                      <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#5c1664" />
                      <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#711c7a" transform="rotate(72)" />
                      <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#882392" transform="rotate(144)" />
                      <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#9f2aaa" transform="rotate(216)" />
                      <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#5c1664" transform="rotate(288)" />
                      <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#a742b7" transform="rotate(36)" />
                      <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#b056c3" transform="rotate(108)" />
                      <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#b869ce" transform="rotate(180)" />
                      <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#c07dd8" transform="rotate(252)" />
                      <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#c991e1" transform="rotate(324)" />
                      <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#d3a7e9" />
                      <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#ddbdf0" transform="rotate(120)" />
                      <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#e6d4f7" transform="rotate(240)" />
                      <circle cx="0" cy="0" r="10" fill="#f0e9fb" />
                    </g>
                  </svg>
                </motion.div>
                <motion.div
                  initial={{ scaleY: 0 }}
                  animate={{ scaleY: 1 }}
                  transition={{ delay: rose.delay, duration: 1.5, ease: "easeOut" }}
                  className="w-2 origin-bottom bg-gradient-to-t from-green-900 via-green-700 to-green-500 rounded-t-full shadow-[0_0_8px_rgba(74,222,128,0.2)]"
                  style={{ height: `${rose.height}px` }}
                />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="relative z-50 flex flex-col items-center text-center px-6 mt-[-10vh]"
          >
            <Sparkles className="w-12 h-12 text-[#ffd700] mb-6 animate-pulse" />
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-2 drop-shadow-lg">
              For My Princess
            </h1>
            <p className="text-[#b19cd9] text-lg md:text-xl mb-12 drop-shadow-md">
              ✨ A Special Surprise for You ✨
            </p>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="group relative flex items-center gap-3 px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-medium text-lg overflow-hidden transition-all hover:bg-white/25 hover:border-white/50 shadow-[0_0_20px_rgba(177,156,217,0.5)] cursor-pointer"
            >
              <Gift className="w-6 h-6 relative z-10" />
              <span className="relative z-10">Open Your Birthday Gift</span>
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

// --- 2. KOMPONEN HERO (Dengan Tema Mawar Ungu yang Sama) ---
function Hero() {
  const floatingRoses = Array.from({ length: 12 }).map((_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    delay: Math.random() * 2,
    size: Math.random() * 30 + 40,
  }));

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen overflow-hidden text-center px-4 py-20 w-full">
      {/* Kelopak Mawar Melayang di Background Hero */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {floatingRoses.map((rose) => (
          <motion.div
            key={rose.id}
            className="absolute opacity-40"
            style={{ left: `${rose.x}%`, top: `${rose.y}%`, width: `${rose.size}px`, height: `${rose.size}px` }}
            initial={{ opacity: 0, scale: 0, y: 50 }}
            animate={{ 
              opacity: [0.2, 0.5, 0.2],
              scale: [0.8, 1.1, 0.8],
              y: [20, -30, 20],
              rotate: [0, 15, -15, 0]
            }}
            transition={{ 
              duration: 8, 
              delay: rose.delay, 
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[0_0_10px_rgba(177,156,217,0.8)]">
              <g transform="translate(50, 50)">
                <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#711c7a" />
                <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#9f2aaa" transform="rotate(90)" />
                <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#b869ce" transform="rotate(45)" />
                <circle cx="0" cy="0" r="10" fill="#f0e9fb" />
              </g>
            </svg>
          </motion.div>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.5 }}
        className="z-10 flex flex-col items-center"
      >
        <motion.div
          animate={{ rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-4xl mb-4"
        >
          👑
        </motion.div>
        
        <h2 className="text-xl text-[#b19cd9] tracking-widest mb-2 font-light">
          HAPPY BIRTHDAY
        </h2>
        
        <h1 className="text-5xl md:text-7xl font-serif font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] via-yellow-100 to-[#ffd700] mb-4 drop-shadow-md">
          SALAMAH PUTRI<br />AL-MADINAH
        </h1>
        
        <p className="text-xl md:text-2xl text-purple-200 italic mt-6 bg-white/5 px-6 py-2 rounded-full backdrop-blur-md border border-white/10 shadow-lg">
          "Today is your special day."
        </p>
      </motion.div>

      <motion.div
        initial={{ y: 200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", bounce: 0.5, duration: 1.2, delay: 1.5 }}
        className="absolute bottom-10 z-20 flex flex-col items-center"
      >
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 2.5, type: "spring" }}
          className="bg-white/20 backdrop-blur-md border border-white/30 text-white px-4 py-2 rounded-2xl rounded-br-none mb-3 shadow-[0_0_15px_rgba(255,255,255,0.2)]"
        >
          Hai Princess Cantik! 💜
        </motion.div>
        
        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="text-7xl drop-shadow-2xl"
        >
          🐉
        </motion.div>
      </motion.div>
    </div>
  );
}

// --- 3. KOMPONEN FLOWER GARDEN (Taman Mawar Ungu di Bagian Bawah) ---
function FlowerGarden() {
  const gardenRoses = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    left: Math.random() * 106 - 3,
    height: Math.random() * 220 + 80,
    delay: Math.random() * 0.5,
    scale: Math.random() * 0.6 + 0.5,
    swayDuration: Math.random() * 3 + 3,
    swayAngle: Math.random() * 4 + 2,
  }));

  gardenRoses.sort((a, b) => b.height - a.height);

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center overflow-hidden py-20 bg-gradient-to-b from-[#4a0e4e] to-[#2a0845]">
      {/* Partikel Kunang-kunang Magis */}
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
          May your life bloom beautifully, just like these roses.
        </p>
      </motion.div>

      {/* Kebun Mawar Interaktif saat di-scroll */}
      <div className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-none flex items-end z-10">
        {gardenRoses.map((rose, index) => (
          <motion.div
            key={rose.id}
            className="absolute bottom-0 flex flex-col items-center origin-bottom"
            style={{ 
              left: `${rose.left}%`, 
              transform: `scale(${rose.scale})`,
              zIndex: index 
            }}
            animate={{ rotate: [-rose.swayAngle, rose.swayAngle, -rose.swayAngle] }}
            transition={{
              duration: rose.swayDuration,
              repeat: Infinity,
              ease: "easeInOut",
              delay: Math.random() * 2,
            }}
          >
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: rose.delay, duration: 1.5, type: "spring", bounce: 0.4 }}
              className="relative z-10 -mb-5 flex items-center justify-center"
            >
              <svg width="90" height="90" viewBox="0 0 100 100" className="drop-shadow-[0_0_12px_rgba(177,156,217,0.6)]">
                <g transform="translate(50, 50)">
                  <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#5c1664" />
                  <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#711c7a" transform="rotate(72)" />
                  <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#882392" transform="rotate(144)" />
                  <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#9f2aaa" transform="rotate(216)" />
                  <ellipse cx="0" cy="-22" rx="25" ry="32" fill="#5c1664" transform="rotate(288)" />
                  <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#a742b7" transform="rotate(36)" />
                  <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#b056c3" transform="rotate(108)" />
                  <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#b869ce" transform="rotate(180)" />
                  <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#c07dd8" transform="rotate(252)" />
                  <ellipse cx="0" cy="-15" rx="20" ry="25" fill="#c991e1" transform="rotate(324)" />
                  <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#d3a7e9" />
                  <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#ddbdf0" transform="rotate(120)" />
                  <ellipse cx="0" cy="-10" rx="15" ry="20" fill="#e6d4f7" transform="rotate(240)" />
                  <circle cx="0" cy="0" r="10" fill="#f0e9fb" />
                </g>
              </svg>
            </motion.div>
            <motion.div
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true, margin: "100px" }}
              transition={{ delay: rose.delay, duration: 1.5, ease: "easeOut" }}
              className="w-2 origin-bottom bg-gradient-to-t from-green-900 via-green-700 to-green-500 rounded-t-full shadow-[0_0_8px_rgba(74,222,128,0.2)]"
              style={{ height: `${rose.height}px` }}
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// --- 4. KOMPONEN UTAMA (PENYATU) ---
export default function App() {
  const [isGiftOpened, setIsGiftOpened] = useState(false);

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#2a0845] to-[#4a0e4e] text-white overflow-x-hidden font-sans pb-40">
      <AnimatePresence mode="wait">
        {!isGiftOpened ? (
          <Opening key="opening" onOpenGift={() => setIsGiftOpened(true)} />
        ) : (
          <motion.div
            key="hero"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="flex flex-col items-center w-full"
          >
            <Hero />
            <MessageAndGallery />
            <FlowerGarden />
            <InteractiveCake />
            <FinalSurprise />
            <MusicPlayer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}