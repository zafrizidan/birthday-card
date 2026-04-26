import { useState } from 'react';
import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import SkyBackdrop from '../components/SkyBackdrop';
import { HeartSprite, StarSprite } from '../components/PixelCharacter';

interface Props {
  onBack: () => void;
}

interface PolaroidProps {
  src: string;
  caption: string;
  rotate: number;
  width?: number;
  height?: number;
  delay?: number;
}

function Polaroid({
  src,
  caption,
  rotate,
  width = 160,
  height = 160,
  delay = 0,
}: PolaroidProps) {
  const [errored, setErrored] = useState(false);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotate: 0 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{ type: 'spring', stiffness: 140, damping: 14, delay }}
      whileHover={{ scale: 1.08, rotate: rotate * 0.4, zIndex: 30 }}
      className="relative bg-white p-2 pb-7 border-[3px] border-[#5e1f3b] shadow-[5px_5px_0_#5e1f3b] cursor-grab"
      style={{ width, zIndex: 10 }}
    >
      <div
        className="bg-pinksoft flex items-center justify-center overflow-hidden"
        style={{ width: width - 16, height }}
      >
        {errored ? (
          <div className="font-pixel text-[7px] text-[#5e1f3b] text-center px-2 leading-[2]">
            drop a photo at <br />
            <span className="text-pinkdeep">{src}</span>
          </div>
        ) : (
          <img
            src={src}
            alt={caption}
            className="w-full h-full object-cover"
            onError={() => setErrored(true)}
          />
        )}
      </div>
      <div className="mt-1 font-pixel text-[7px] text-[#5e1f3b] tracking-wider text-center">
        {caption}
      </div>
    </motion.div>
  );
}

interface PolaroidPlacement {
  src: string;
  caption: string;
  top: string;
  left: string;
  rotate: number;
  width?: number;
  height?: number;
  delay: number;
}

const PHOTOS: PolaroidPlacement[] = [
  { src: '/photo1.png', caption: 'us :)', top: '14%', left: '6%', rotate: -8, width: 170, height: 170, delay: 0.0 },
  { src: '/photo2.png', caption: 'first date', top: '10%', left: '28%', rotate: 5, width: 150, height: 200, delay: 0.08 },
  { src: '/photo3.png', caption: 'sunset walk', top: '18%', left: '50%', rotate: -4, width: 180, height: 150, delay: 0.16 },
  { src: '/photo4.png', caption: 'movie night', top: '12%', left: '74%', rotate: 7, width: 150, height: 170, delay: 0.24 },
  { src: '/photo5.png', caption: 'silly faces', top: '52%', left: '4%', rotate: 6, width: 160, height: 160, delay: 0.32 },
  { src: '/photo6.png', caption: 'our cafe', top: '58%', left: '24%', rotate: -7, width: 170, height: 150, delay: 0.4 },
  { src: '/photo7.png', caption: 'late drives', top: '54%', left: '46%', rotate: 4, width: 160, height: 180, delay: 0.48 },
  { src: '/photo8.png', caption: 'home ♥', top: '60%', left: '70%', rotate: -5, width: 180, height: 160, delay: 0.56 },
];

export default function GalleryScreen({ onBack }: Props) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      <SkyBackdrop />

      {/* twinkles */}
      <div className="absolute top-6 left-6 animate-twinkle z-10">
        <StarSprite size={22} />
      </div>
      <div className="absolute top-12 right-10 animate-twinkle z-10" style={{ animationDelay: '0.7s' }}>
        <HeartSprite size={20} />
      </div>
      <div className="absolute bottom-12 left-12 animate-twinkle z-10" style={{ animationDelay: '1.3s' }}>
        <HeartSprite size={16} />
      </div>
      <div className="absolute bottom-20 right-16 animate-twinkle z-10" style={{ animationDelay: '0.4s' }}>
        <StarSprite size={18} color="#ffd1e0" />
      </div>

      {/* title strip */}
      <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center">
        <div className="font-pixel text-pinksoft pixel-shadow text-[28px]">
          Museum of Us
        </div>
      </div>

      {/* polaroid scrapboard */}
      <div className="absolute inset-0 z-10">
        {PHOTOS.map((p) => (
          <div
            key={p.src}
            style={{
              position: 'absolute',
              top: p.top,
              left: p.left,
            }}
          >
            <Polaroid
              src={p.src}
              caption={p.caption}
              rotate={p.rotate}
              width={p.width}
              height={p.height}
              delay={p.delay}
            />
          </div>
        ))}
      </div>

      {/* tape decorations on a few corners */}
      <div className="absolute top-[15%] left-[12%] w-12 h-3 bg-yellow-100/70 border border-yellow-300/70 rotate-[-30deg] z-10" />
      <div className="absolute top-[58%] left-[28%] w-14 h-3 bg-yellow-100/70 border border-yellow-300/70 rotate-[20deg] z-10" />

      {/* back button */}
      <div className="absolute bottom-6 right-6 z-30">
        <PixelButton variant="pink" size="sm" onClick={onBack}>
          ← BACK
        </PixelButton>
      </div>
    </div>
  );
}
