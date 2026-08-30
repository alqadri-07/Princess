import React, { useState } from 'react';
import { motion } from 'framer-motion';

// Komponen untuk satu buah lilin
const Candle = ({ wished }) => {
  return (
    <div className="relative flex flex-col items-center">
      {/* Api Lilin */}
      <motion.div
        animate={
          wished 
            ? { opacity: 0, scale: 0, y: -10 } 
            : { opacity: 1, scale: [1, 1.2, 1], rotate: [-3, 3, -3] }
        }
        transition={
          wished 
            ? { duration: 0.5, ease: "easeOut" } 
            : { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
        }
        className="w-4 h-6 bg-gradient-to-t from-[#ffd700] to-orange-500 rounded-full blur-[1px] shadow-[0_0_15px_#ffd700] mb-1 origin-bottom"
        style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} // Bentuk tetesan air
      />
      {/* Sumbu Lilin */}
      <div className="w-0.5 h-2 bg-gray-800" />
      {/* Batang Lilin */}
      <div className="w-4 h-12 bg-gradient-to-b from-white to-pink-100 rounded-sm border-x border-pink-200 overflow-hidden relative">
        {/* Garis hiasan lilin */}
        <div className="absolute w-full h-1 bg-pink-300 top-2" />
        <div className="absolute w-full h-1 bg-pink-300 top-6" />
        <div className="absolute w-full h-1 bg-pink-300 top-10" />
      </div>
    </div>
  );
};

export default function InteractiveCake() {
  const [wished, setWished] = useState(false);

  const handleMakeWish = () => {
    setWished(true);
  };

  return (
    <section className="relative w-full min-h-screen flex flex-col items-center justify-center py-20 overflow-hidden">
      
      {/* Overlay Gelap (Meredupkan ruangan setelah tombol ditekan) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: wished ? 0.85 : 0 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-black pointer-events-none z-0"
      />

      <div className="relative z-10 flex flex-col items-center">
        
        {/* Judul yang akan memudar saat ruangan gelap */}
        <motion.h2 
          animate={{ opacity: wished ? 0 : 1 }}
          transition={{ duration: 1 }}
          className="text-3xl md:text-4xl font-serif text-white mb-16 drop-shadow-lg text-center px-4"
        >
          Time for the Cake, Princess 🎂
        </motion.h2>

        {/* --- KUE ULANG TAHUN (CSS Art) --- */}
        <motion.div 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="relative flex flex-col items-center mt-10"
        >
          {/* Lilin */}
          <div className="flex gap-8 mb-[-2px] z-20">
            <Candle wished={wished} />
            <Candle wished={wished} />
            <Candle wished={wished} />
          </div>

          {/* Kue Tingkat Atas (Lavender) */}
          <div className="w-48 h-20 bg-gradient-to-b from-[#e6e6fa] to-[#d8bfd8] rounded-t-xl border-b-4 border-[#b19cd9] shadow-inner relative z-10 flex justify-center">
            {/* Lelehan Krim */}
            <div className="absolute top-0 w-full flex justify-around px-2">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="w-6 h-8 bg-white rounded-b-full shadow-sm" />
              ))}
            </div>
          </div>

          {/* Kue Tingkat Bawah (Putih/Pink Soft) */}
          <div className="w-64 h-24 bg-gradient-to-b from-white to-pink-50 rounded-t-xl border-b-4 border-pink-200 shadow-xl relative z-0 flex justify-center">
            {/* Hiasan Polkadot/Bunga di kue */}
            <div className="absolute top-8 w-full flex justify-around px-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="w-3 h-3 bg-[#b19cd9] rounded-full opacity-50" />
              ))}
            </div>
          </div>

          {/* Piring Kue */}
          <div className="w-80 h-6 bg-gradient-to-b from-gray-200 to-gray-400 rounded-[50%] mt-[-10px] shadow-[0_10px_20px_rgba(0,0,0,0.3)] z-0" />
        </motion.div>

        {/* --- AREA INTERAKSI --- */}
        <div className="mt-16 h-32 flex flex-col items-center justify-center">
          {!wished ? (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleMakeWish}
              className="px-8 py-4 bg-[#ffd700] text-purple-900 font-bold rounded-full text-lg shadow-[0_0_20px_rgba(255,215,0,0.4)] hover:shadow-[0_0_30px_rgba(255,215,0,0.6)] transition-all"
            >
              Make a Wish ✨
            </motion.button>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 1, type: "spring" }}
              className="text-center"
            >
              <h3 className="text-3xl md:text-4xl font-serif text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)] mb-2">
                May all your wishes come true.
              </h3>
              <p className="text-white text-lg">
                Happy Birthday, Princess 💜
              </p>

              {/* Efek Confetti Bintang setelah harapan diucapkan */}
              <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
                {[...Array(12)].map((_, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ 
                      opacity: [0, 1, 0],
                      scale: [0, 1.5, 0.5],
                      x: (Math.random() - 0.5) * 400,
                      y: (Math.random() - 0.5) * 400 - 100
                    }}
                    transition={{ delay: 1.5 + Math.random(), duration: 2, ease: "easeOut" }}
                    className="absolute text-2xl"
                  >
                    ✨
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}