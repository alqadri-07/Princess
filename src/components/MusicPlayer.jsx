import React, { useState, useRef, useEffect } from 'react';
import {
  Play,
  Pause,
  SkipForward,
  SkipBack,
  Volume2,
} from 'lucide-react';
import { motion } from 'framer-motion';

const playlist = [
  {
    id: 1,
    title: 'Happy Birthday',
    artist: 'Special for Princess',
    file: 'birthday.mp3',
  },
  {
    id: 2,
    title: 'My Love',
    artist: 'Westlife',
    file: 'my-love.mp3',
  },
];

export default function MusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(1);

  const audioRef = useRef(null);

  const currentSong = playlist[currentSongIndex];

  // Aman untuk localhost dan GitHub Pages
  const audioSrc = `${import.meta.env.BASE_URL}music/${currentSong.file}`;

  // Atur volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  // Jalankan lagu baru jika player sedang dalam keadaan play
  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.volume = volume;

    audio
        .play()
        .then(() => {
        setIsPlaying(true);
        })
        .catch(() => {
        // Browser memblokir autoplay.
        // User cukup menekan tombol Play.
        setIsPlaying(false);
        });
    }, []);

  // Update progress
  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (
      audio.duration &&
      Number.isFinite(audio.duration)
    ) {
      const percentage =
        (audio.currentTime / audio.duration) * 100;

      setProgress(percentage);
    }
  };

  // Play / Pause
  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (audio.paused) {
        await audio.play();
        setIsPlaying(true);
      } else {
        audio.pause();
        setIsPlaying(false);
      }
    } catch (error) {
      console.error('Gagal memutar musik:', error);
      setIsPlaying(false);
    }
  };

  // Lagu selesai → otomatis pindah ke lagu berikutnya
  const handleSongEnd = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex + 1) % playlist.length
    );

    // Tetap dalam mode play
    setIsPlaying(true);
  };

  // Lagu berikutnya
  const nextSong = () => {
    setCurrentSongIndex(
      (prevIndex) => (prevIndex + 1) % playlist.length
    );
  };

  // Lagu sebelumnya
  const prevSong = () => {
    setCurrentSongIndex(
      (prevIndex) =>
        prevIndex === 0
          ? playlist.length - 1
          : prevIndex - 1
    );
  };

  return (
    <motion.div
      initial={{
        y: 100,
        opacity: 0,
      }}
      animate={{
        y: 0,
        opacity: 1,
      }}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 1,
        delay: 0.5,
      }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_8px_32px_rgba(42,8,69,0.5)]">

        {/* Audio */}
        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSongEnd}
        />

        <div className="flex items-center justify-between gap-4">

          {/* Informasi lagu */}
          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium text-lg truncate drop-shadow-md">
              {currentSong.title}
            </h3>

            <p className="text-[#b19cd9] text-sm truncate">
              {currentSong.artist}
            </p>
          </div>

          {/* Kontrol */}
          <div className="flex items-center gap-3">

            {/* Previous */}
            <button
              onClick={prevSong}
              aria-label="Previous song"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            {/* Play / Pause */}
            <button
              onClick={togglePlay}
              aria-label={
                isPlaying
                  ? 'Pause music'
                  : 'Play music'
              }
              className="p-3.5 bg-white text-purple-700 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            {/* Next */}
            <button
              onClick={nextSong}
              aria-label="Next song"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Progress + Volume */}
        <div className="mt-4 flex items-center gap-3">

          {/* Progress */}
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#b19cd9] to-[#ffd700] transition-all duration-100 ease-linear"
              style={{
                width: `${progress}%`,
              }}
            />
          </div>

          {/* Volume */}
          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-white/80" />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) =>
                setVolume(Number(e.target.value))
              }
              aria-label="Volume"
              className="w-16"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}