import React from 'react';
import { motion } from 'framer-motion';

// Data sementara (bisa Anda ganti nanti dengan path foto asli di folder public/images/)
const photos = [
  { id: 1, image: "images/photo1.jpeg", caption: "A beautiful memory 💜", date: "" },
  { id: 2, image: "images/photo2.jpeg", caption: "Always smiling 😊", date: "" },
  
  { id: 4, image: "images/photo4.jpeg", caption: "Princess day 👑", date: "" },
  { id: 5, image: "images/photo5.jpeg", caption: "Always Happy 🌸", date: "" },
];

// Menggandakan array agar efek infinite scroll (loop) tidak terputus
const duplicatedPhotos = [...photos, ...photos];

export default function MessageAndGallery() {
  return (
    <section className="py-20 w-full relative z-10 flex flex-col items-center">
      
      {/* --- SECTION 3: Birthday Message --- */}
      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1 }}
        className="max-w-2xl text-center px-6 mb-20"
      >
        <h2 className="text-3xl md:text-4xl font-serif text-white mb-6 drop-shadow-md">
          A Little Message For You 💜
        </h2>
        
        {/* Teks menggunakan efek semi-transparan (glassmorphism) agar mudah dibaca di atas background */}
        <div className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 md:p-8 rounded-3xl shadow-xl leading-relaxed text-lg text-purple-100">
          <p className="mb-4">
            Happy Birthday, Princess Cantik 💜
          </p>
          <p className="mb-4">
            Hari ini adalah hari yang sangat spesial, karena seseorang yang begitu berarti lahir ke dunia.
          </p>
          <p>
            Semoga setiap langkahmu selalu dipenuhi kebahagiaan, cinta, kesehatan, dan hal-hal indah yang pantas kamu dapatkan.
          </p>
        </div>
      </motion.div>

      {/* --- SECTION 4: Horizontal Photo Gallery --- */}
      <div className="w-full overflow-hidden py-10 relative">
        {/* Efek gradasi gelap di kiri dan kanan agar foto terlihat muncul dan menghilang secara halus */}
        <div className="absolute top-0 bottom-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#2a0845] to-transparent z-10 pointer-events-none" />
        <div className="absolute top-0 bottom-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#4a0e4e] to-transparent z-10 pointer-events-none" />

        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            ease: "linear", 
            duration: 30, // Semakin besar angka ini, semakin lambat gerakannya
            repeat: Infinity 
          }}
          className="flex w-max gap-6 px-6"
        >
          {duplicatedPhotos.map((photo, index) => (
            <motion.div
              key={`${photo.id}-${index}`}
              whileHover={{ 
                scale: 1.05, 
                zIndex: 20 
              }}
              className="relative group w-[300px] h-[400px] rounded-2xl overflow-hidden cursor-pointer border-2 border-transparent hover:border-[#b19cd9] transition-all duration-300 shadow-lg flex-shrink-0 bg-white/5"
            >
              <img 
                src={photo.image} 
                alt={`Memory ${photo.date}`} 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              
              {/* Overlay Caption yang muncul saat di-hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6">
                <span className="text-[#ffd700] font-bold text-sm mb-1">{photo.date}</span>
                <p className="text-white text-lg font-medium drop-shadow-md">
                  {photo.caption}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
    </section>
  );
}