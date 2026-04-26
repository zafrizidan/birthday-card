import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import SkyBackdrop from '../components/SkyBackdrop';
import { HeartSprite, PixelCat, StarSprite } from '../components/PixelCharacter';

interface Props {
  onBack: () => void;
}

// Drop the .mp3 here at  public/song.mp3  (or change this path).
const SONG_SRC = '/song.mp3';
const SONG_TITLE = 'our song hihi ♥';

// Photos pinned around the player. Drop matching files in /public.
interface PhotoPin {
  src: string;
  caption: string;
  /** absolute position relative to the screen */
  style: React.CSSProperties;
  rotate: number;
  width: number;
  height: number;
  tape?: 'top-left' | 'top-right' | 'top-center';
}

const PHOTOS: PhotoPin[] = [
  {
    src: '/lookbook1.png',
    caption: 'best dressed crew',
    style: { top: '8%', left: '20%' },
    rotate: -8,
    width: 170,
    height: 200,
    tape: 'top-center',
  },
  {
    src: '/lookbook2.png',
    caption: 'looking sharp',
    style: { top: '10%', right: '5%' },
    rotate: 7,
    width: 150,
    height: 210,
    tape: 'top-left',
  },
  {
    src: '/lookbook3.png',
    caption: 'matcha o’clock',
    style: { bottom: '10%', left: '7%' },
    rotate: 5,
    width: 180,
    height: 200,
    tape: 'top-right',
  },
];

function fmt(t: number) {
  if (!isFinite(t) || isNaN(t)) return '0:00';
  const m = Math.floor(t / 60);
  const s = Math.floor(t % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

function PolaroidPhoto({ pin }: { pin: PhotoPin }) {
  const [errored, setErrored] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate: pin.rotate }}
      whileHover={{ scale: 1.06, rotate: pin.rotate * 0.4, zIndex: 30 }}
      transition={{ type: 'spring', stiffness: 140, damping: 14 }}
      className="absolute z-10 bg-white p-2 pb-7 border-[3px] border-[#5e1f3b] shadow-[5px_5px_0_#5e1f3b]"
      style={{ width: pin.width, ...pin.style }}
    >
      {/* tape */}
      {pin.tape === 'top-center' && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-12 h-3 bg-yellow-100/80 border border-yellow-300/70 rotate-[-4deg]" />
      )}
      {pin.tape === 'top-left' && (
        <div className="absolute -top-2 left-2 w-12 h-3 bg-yellow-100/80 border border-yellow-300/70 rotate-[-25deg]" />
      )}
      {pin.tape === 'top-right' && (
        <div className="absolute -top-2 right-2 w-12 h-3 bg-yellow-100/80 border border-yellow-300/70 rotate-[20deg]" />
      )}

      <div
        className="bg-pinksoft flex items-center justify-center overflow-hidden"
        style={{ width: pin.width - 16, height: pin.height }}
      >
        {errored ? (
          <div className="font-pixel text-[7px] text-[#5e1f3b] text-center px-2 leading-[2]">
            drop a photo at <br />
            <span className="text-pinkdeep">{pin.src}</span>
          </div>
        ) : (
          <img
            src={pin.src}
            alt={pin.caption}
            className="w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <div className="mt-1 font-pixel text-[7px] text-[#5e1f3b] tracking-wider text-center">
        {pin.caption}
      </div>
    </motion.div>
  );
}

export default function MusicScreen({ onBack }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  const [isPlaying, setIsPlaying] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [scrubbing, setScrubbing] = useState(false);

  // Build the audio element once on mount
  useEffect(() => {
    const audio = new Audio(SONG_SRC);
    audio.preload = 'metadata';
    audioRef.current = audio;

    const onTime = () => setCurrent(audio.currentTime);
    const onMeta = () => setDuration(audio.duration);
    const onEnd = () => {
      setIsPlaying(false);
      setCurrent(0);
      audio.currentTime = 0;
    };
    audio.addEventListener('timeupdate', onTime);
    audio.addEventListener('loadedmetadata', onMeta);
    audio.addEventListener('ended', onEnd);

    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTime);
      audio.removeEventListener('loadedmetadata', onMeta);
      audio.removeEventListener('ended', onEnd);
    };
  }, []);

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (err) {
        console.error('Audio play failed', err);
      }
    }
  };

  const stop = () => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.pause();
    audio.currentTime = 0;
    setIsPlaying(false);
    setCurrent(0);
  };

  const skip = (delta: number) => {
    const audio = audioRef.current;
    if (!audio || !isFinite(audio.duration)) return;
    audio.currentTime = Math.max(0, Math.min(audio.duration, audio.currentTime + delta));
    setCurrent(audio.currentTime);
  };

  const seekToClientX = (clientX: number) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !duration) return;
    const rect = bar.getBoundingClientRect();
    const pct = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
    audio.currentTime = pct * duration;
    setCurrent(audio.currentTime);
  };

  const onBarPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    setScrubbing(true);
    seekToClientX(e.clientX);
  };

  useEffect(() => {
    if (!scrubbing) return;
    const onMove = (e: PointerEvent) => seekToClientX(e.clientX);
    const onUp = () => setScrubbing(false);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);
    return () => {
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scrubbing, duration]);

  const progress = duration > 0 ? (current / duration) * 100 : 0;

  return (
    <div className="absolute inset-0 overflow-hidden">
      <SkyBackdrop />

      {/* twinkles */}
      <div className="absolute top-6 right-12 animate-twinkle z-10">
        <HeartSprite size={18} />
      </div>
      <div className="absolute bottom-8 left-12 animate-twinkle z-10" style={{ animationDelay: '0.9s' }}>
        <HeartSprite size={14} />
      </div>
      <div className="absolute top-1/2 right-6 animate-twinkle z-10" style={{ animationDelay: '1.4s' }}>
        <StarSprite size={18} />
      </div>

      {/* title strip */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 font-pixel text-pinksoft pixel-shadow text-[18px] z-20">
        Song For You
      </div>

      {/* photos pinned around the player */}
      {PHOTOS.map((p) => (
        <PolaroidPhoto key={p.src} pin={p} />
      ))}

      {/* centered player + cat */}
      <div className="absolute inset-0 flex items-center justify-center z-20">
        <div className="flex items-end gap-8">
          <motion.div
            animate={isPlaying ? { y: [0, -10, 0], rotate: [-3, 3, -3] } : { y: 0, rotate: 0 }}
            transition={
              isPlaying
                ? { repeat: Infinity, duration: 0.5, ease: 'easeInOut' }
                : { duration: 0.3 }
            }
            className="origin-bottom"
          >
            <PixelCat size={120} />
          </motion.div>

          {/* player card */}
          <div className="bg-pinkblush border-[4px] border-pinkdeep shadow-[6px_6px_0_#5e1f3b] p-5 w-[440px]">
            {/* title bar */}
            <div className="flex items-center justify-between mb-4 border-b-2 border-pinkmid pb-2">
              <div className="font-pixel text-[8px] text-pinkdeep">♪ Now Playing</div>
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-pinkdeep" />
                <div className="w-2 h-2 bg-pinkmid" />
                <div className="w-2 h-2 bg-pinksoft" />
              </div>
            </div>

            {/* artwork + title */}
            <div className="flex items-center gap-3 mb-4">
              <motion.div
                animate={isPlaying ? { rotate: 360 } : { rotate: 0 }}
                transition={
                  isPlaying
                    ? { repeat: Infinity, duration: 4, ease: 'linear' }
                    : { duration: 0.3 }
                }
                className="w-16 h-16 rounded-full flex items-center justify-center border-[3px] border-[#5e1f3b]"
                style={{
                  background:
                    'radial-gradient(circle, #fff5f5 0 12%, #ff6fa3 13% 65%, #5e1f3b 66% 100%)',
                }}
              >
                <div className="w-3 h-3 bg-[#5e1f3b] rounded-full" />
              </motion.div>
              <div className="flex-1 min-w-0">
                <div className="font-pixel text-[12px] text-[#5e1f3b] truncate">
                  {SONG_TITLE}
                </div>
                <div className="font-pixel text-[7px] text-pinkdeep mt-1 tracking-wider">
                  {duration > 0 ? 'ready' : 'loading…'}
                </div>
              </div>
            </div>

            {/* progress bar — click anywhere or drag the playhead */}
            <div
              ref={progressRef}
              onPointerDown={onBarPointerDown}
              className="relative h-4 bg-pinksoft border-2 border-pinkdeep cursor-pointer touch-none select-none"
            >
              <div
                className="absolute top-0 left-0 h-full bg-pinkdeep"
                style={{ width: `${progress}%` }}
              />
              <div
                className="absolute top-1/2 -translate-y-1/2 w-3 h-5 bg-white border-2 border-pinkdeep shadow-[2px_2px_0_#5e1f3b]"
                style={{ left: `calc(${progress}% - 6px)` }}
              />
            </div>
            <div className="flex justify-between mt-1 font-pixel text-[7px] text-pinkdeep">
              <span>{fmt(current)}</span>
              <span>{fmt(duration)}</span>
            </div>

            {/* transport controls — rewind 10s · play/pause · stop · forward 10s */}
            <div className="flex items-center justify-center gap-3 mt-4">
              <button
                onClick={() => skip(-10)}
                aria-label="rewind 10 seconds"
                className="w-10 h-10 bg-pinksoft border-[3px] border-pinkdeep font-pixel text-[10px] text-pinkdeep shadow-[2px_2px_0_#5e1f3b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                ◀◀
              </button>
              <button
                onClick={togglePlay}
                aria-label={isPlaying ? 'pause' : 'play'}
                className="w-12 h-12 bg-pinkdeep border-[3px] border-[#5e1f3b] font-pixel text-[16px] text-white shadow-[3px_3px_0_#5e1f3b] active:translate-x-[3px] active:translate-y-[3px] active:shadow-none flex items-center justify-center"
              >
                {isPlaying ? '||' : '▶'}
              </button>
              <button
                onClick={stop}
                aria-label="stop"
                className="w-10 h-10 bg-pinksoft border-[3px] border-pinkdeep shadow-[2px_2px_0_#5e1f3b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none flex items-center justify-center"
              >
                <div className="w-3 h-3 bg-pinkdeep" />
              </button>
              <button
                onClick={() => skip(10)}
                aria-label="forward 10 seconds"
                className="w-10 h-10 bg-pinksoft border-[3px] border-pinkdeep font-pixel text-[10px] text-pinkdeep shadow-[2px_2px_0_#5e1f3b] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
              >
                ▶▶
              </button>
            </div>

            <div className="flex justify-center gap-3 mt-2 font-pixel text-[7px] text-pinkdeep tracking-wider opacity-70">
              <span className="w-10 text-center">-10s</span>
              <span className="w-12 text-center">play / pause</span>
              <span className="w-10 text-center">stop</span>
              <span className="w-10 text-center">+10s</span>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 right-6 z-30">
        <PixelButton variant="pink" size="sm" onClick={onBack}>
          ← BACK
        </PixelButton>
      </div>
    </div>
  );
}
