import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipForward, SkipBack, Volume2 } from 'lucide-react';
import { motion } from 'framer-motion';

const playlist = [
  {
    id: 1,
    title: "Happy Birthday",
    artist: "Special for Princess",
    src: "/music/birthday.mp3" 
  },
  {
    id: 2,
    title: "My Love",
    artist: "Westlife",
    src: "/music/my-love.mp3"
  }
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(null);

  const currentSong = playlist[currentSongIndex];

  // Auto-play ketika komponen pertama kali muncul atau saat lagu berganti
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch((err) => console.log("Autoplay dicegah oleh browser:", err));
    }
  }, [currentSongIndex]);

  // Update progress bar
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const duration = audioRef.current.duration;
      if (duration) {
        setProgress((current / duration) * 100);
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  const prevSong = () => {
    setCurrentSongIndex((prev) => (prev === 0 ? playlist.length - 1 : prev - 1));
  };

  const handleSongEnd = () => {
    nextSong();
  };

  return (
    <motion.div 
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", bounce: 0.4, duration: 1, delay: 0.5 }}
      // Menggunakan bottom-8 agar tidak bertabrakan dengan bottom navigation bar di HP
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_8px_32px_rgba(42,8,69,0.5)]">
        
        {/* Hidden Audio Element */}
        <audio 
          ref={audioRef}
          src={currentSong.src}
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSongEnd}
        />

        <div className="flex items-center justify-between gap-4">
          {/* Info Lagu */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium text-lg truncate drop-shadow-md">
              {currentSong.title}
            </h3>
            <p className="text-[#b19cd9] text-sm truncate">
              {currentSong.artist}
            </p>
          </div>

          {/* Kontrol Musik (Diperbesar agar mudah di-tap) */}
          <div className="flex items-center gap-3">
            <button 
              onClick={prevSong}
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            
            <button 
              onClick={togglePlay}
              className="p-3.5 bg-white text-royal-purple rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>
            
            <button 
              onClick={nextSong}
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress Bar Sederhana */}
        <div className="mt-4 w-full h-1.5 bg-white/20 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#b19cd9] to-[#ffd700] transition-all duration-100 ease-linear"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
}