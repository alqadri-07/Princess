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

  // Base URL otomatis menyesuaikan:
  // localhost        -> /
  // GitHub Pages     -> /Princess/
  const audioSrc = `${import.meta.env.BASE_URL}music/${currentSong.file}`;

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) return;

    audio.pause();
    audio.currentTime = 0;
    setProgress(0);

    if (isPlaying) {
      audio
        .play()
        .then(() => {
          setIsPlaying(true);
        })
        .catch((error) => {
          console.error('Gagal memutar musik:', error);
          setIsPlaying(false);
        });
    }
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const handleTimeUpdate = () => {
    const audio = audioRef.current;

    if (!audio) return;

    const current = audio.currentTime;
    const duration = audio.duration;

    if (duration && Number.isFinite(duration)) {
      setProgress((current / duration) * 100);
    }
  };

  const togglePlay = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch (error) {
      console.error('Gagal memutar musik:', error);
      setIsPlaying(false);
    }
  };

  const nextSong = () => {
    setCurrentSongIndex(
      (prev) => (prev + 1) % playlist.length
    );
    setIsPlaying(true);
  };

  const prevSong = () => {
    setCurrentSongIndex(
      (prev) =>
        prev === 0 ? playlist.length - 1 : prev - 1
    );
    setIsPlaying(true);
  };

  const handleSongEnd = () => {
    setCurrentSongIndex(
      (prev) => (prev + 1) % playlist.length
    );
  };

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{
        type: 'spring',
        bounce: 0.4,
        duration: 1,
        delay: 0.5,
      }}
      className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-50"
    >
      <div className="bg-white/10 backdrop-blur-xl border border-white/20 p-4 rounded-2xl shadow-[0_8px_32px_rgba(42,8,69,0.5)]">

        <audio
          ref={audioRef}
          src={audioSrc}
          preload="metadata"
          onTimeUpdate={handleTimeUpdate}
          onEnded={handleSongEnd}
        />

        <div className="flex items-center justify-between gap-4">

          <div className="flex-1 overflow-hidden">
            <h3 className="text-white font-medium text-lg truncate drop-shadow-md">
              {currentSong.title}
            </h3>

            <p className="text-[#b19cd9] text-sm truncate">
              {currentSong.artist}
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={prevSong}
              aria-label="Previous song"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipBack className="w-5 h-5" />
            </button>

            <button
              onClick={togglePlay}
              aria-label={isPlaying ? 'Pause music' : 'Play music'}
              className="p-3.5 bg-white text-purple-700 rounded-full hover:scale-105 active:scale-95 transition-all shadow-lg"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6 fill-current" />
              ) : (
                <Play className="w-6 h-6 fill-current ml-1" />
              )}
            </button>

            <button
              onClick={nextSong}
              aria-label="Next song"
              className="p-2.5 text-white/80 hover:text-white hover:bg-white/10 rounded-full transition-colors"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3">
          <div className="flex-1 h-1.5 bg-white/20 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[#b19cd9] to-[#ffd700]"
              style={{ width: `${progress}%` }}
            />
          </div>

          <div className="flex items-center gap-2">
            <Volume2 className="w-4 h-4 text-white/80" />

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
              aria-label="Volume"
              className="w-16"
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}