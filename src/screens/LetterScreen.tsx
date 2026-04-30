import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import SkyBackdrop from '../components/SkyBackdrop';

interface Props {
  onBack: () => void;
}

const LETTER = `Happy Birthday to the most amazing person in the world!

You make every day brighter with your smile, every moment sweeter with your love, and my life so much happier just by being in it. I feel so lucky to have you by my side, and I can't wait for all the adventures, laughter, and memories we'll share this year.

I love you more than words can ever express, and I hope your birthday is as incredible as you are. May this year bring you everything you've ever wished for — sunny mornings, cozy evenings, ridiculous inside jokes, and a heart full of joy.

Thank you for being patient, kind, and the best teammate I could ever ask for. Thank you for the late-night talks, the silly dances, the shared snacks, and the warm hugs that fix every bad day.

Today, the whole world should pause to celebrate you. So make a wish, blow out the candles, and know that I'm cheering for every single one of your dreams. I'll be right here, holding your hand, every step of the way.

Happy Birthday, love. You are my favourite human.

Forever yours, 💌`;

function PixelEnvelope({ size = 360 }: { size?: number }) {
  // grid: 32 wide x 22 tall
  const W = 32;
  const H = 22;
  const px = (x: number, y: number, w: number, h: number, c: string) => (
    <rect x={x} y={y} width={w} height={h} fill={c} />
  );
  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      style={{ width: size, height: (size * H) / W }}
      shapeRendering="crispEdges"
    >
      {/* drop shadow */}
      {px(2, 21, 30, 1, '#5e1f3b')}
      {/* envelope body */}
      {px(1, 4, 30, 17, '#fff5f5')}
      {/* outer pink frame */}
      {px(1, 4, 30, 1, '#ff6fa3')}
      {px(1, 20, 30, 1, '#ff6fa3')}
      {px(1, 4, 1, 17, '#ff6fa3')}
      {px(30, 4, 1, 17, '#ff6fa3')}
      {/* darker outline */}
      {px(0, 4, 1, 17, '#5e1f3b')}
      {px(31, 4, 1, 17, '#5e1f3b')}
      {px(1, 3, 30, 1, '#5e1f3b')}
      {px(1, 21, 30, 1, '#5e1f3b')}
      {/* fold lines from corners → center */}
      {[...Array(13)].map((_, i) => (
        <rect key={`l${i}`} x={1 + i} y={4 + i} width={1} height={1} fill="#ffd1e0" />
      ))}
      {[...Array(13)].map((_, i) => (
        <rect key={`r${i}`} x={30 - i} y={4 + i} width={1} height={1} fill="#ffd1e0" />
      ))}
      {/* heart wax seal centered */}
      {px(13, 9, 2, 1, '#c2367c')}
      {px(17, 9, 2, 1, '#c2367c')}
      {px(12, 10, 8, 3, '#c2367c')}
      {px(13, 13, 6, 1, '#c2367c')}
      {px(14, 14, 4, 1, '#c2367c')}
      {px(15, 15, 2, 1, '#c2367c')}
      {/* heart highlight */}
      {px(13, 10, 2, 1, '#ff95ba')}
      {px(14, 11, 1, 1, '#ff95ba')}
    </svg>
  );
}

export default function LetterScreen({ onBack }: Props) {
  const [opened, setOpened] = useState(false);

  return (
    <div className="absolute inset-0 overflow-hidden flex items-center justify-center p-8">
      <SkyBackdrop />

      <AnimatePresence mode="wait">
        {!opened ? (
          <motion.button
            key="envelope"
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.4, y: -40, rotate: -6 }}
            transition={{ duration: 0.4 }}
            whileHover={{ scale: 1.04, y: -4 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => setOpened(true)}
            className="relative z-10 cursor-pointer focus:outline-none"
            aria-label="Open envelope"
          >
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ repeat: Infinity, duration: 2.4, ease: 'easeInOut' }}
            >
              <PixelEnvelope size={520} />
            </motion.div>
            <div className="mt-8 font-pixel text-[14px] text-pinksoft pixel-shadow text-center tracking-widest">
              click to open
            </div>
          </motion.button>
        ) : (
          <motion.div
            key="letter"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            className="relative z-10 w-full max-w-[920px] h-full max-h-[560px] bg-parchment border-[4px] border-[#8a6a3a] shadow-[6px_6px_0_#3d2b1f]"
          >
            {/* paper holes / decorations top */}
            <div className="absolute -top-3 left-1/2 -translate-x-1/2 flex gap-3">
              <div className="w-4 h-4 bg-pinkdeep border-2 border-[#5e1f3b]" />
              <div className="w-4 h-4 bg-pinkmid border-2 border-[#5e1f3b]" />
              <div className="w-4 h-4 bg-pinkdeep border-2 border-[#5e1f3b]" />
            </div>

            <div className="h-full overflow-y-auto pretty-scroll px-12 py-10">
              <div className="font-pixel text-[12px] text-[#3d2b1f] leading-[2] whitespace-pre-line">
                {LETTER}
              </div>
            </div>

            {/* back button */}
            <div className="absolute -bottom-5 right-4">
              <PixelButton variant="pink" size="sm" onClick={onBack}>
                ← BACK
              </PixelButton>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
