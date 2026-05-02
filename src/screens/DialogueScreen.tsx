import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from '../components/Typewriter';
import CharacterImage from '../components/CharacterImage';
import SkyBackdrop from '../components/SkyBackdrop';
import { HeartSprite, PixelArrow } from '../components/PixelCharacter';
import { useIsLargeScreen } from '../hooks/useViewport';

interface Props {
  onNext: () => void;
}

export default function DialogueScreen({ onNext }: Props) {
  const [done, setDone] = useState(false);
  const big = useIsLargeScreen();

  return (
    <div className="absolute inset-0 overflow-hidden flex items-end justify-center">
      <SkyBackdrop />

      {/* twinkles */}
      <div className="absolute top-8 right-10 animate-twinkle z-10">
        <HeartSprite size={20} />
      </div>
      <div className="absolute top-24 right-32 animate-twinkle z-10" style={{ animationDelay: '1s' }}>
        <HeartSprite size={16} />
      </div>

      {/* character + bubble grouped and centered */}
      <div className="relative z-10 flex items-end gap-8 mb-12">
        <CharacterImage src="/boy.png" alt="him" height={big ? 640 : 500} crop="full" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="relative bg-pinkblush border-[4px] border-pinkdeep px-7 py-6 mb-48 2xl:mb-64 max-w-md"
        >
          {/* single bordered tail rendered as one SVG so it can't read as a duplicate */}
          <svg
            className="absolute -left-[18px] bottom-10"
            width="20"
            height="22"
            viewBox="0 0 20 22"
            shapeRendering="crispEdges"
          >
            {/* outer pink triangle (forms the border edge) */}
            <polygon points="0,11 20,0 20,22" fill="#ff6fa3" />
            {/* inner cream triangle, inset so the pink edge stays as a 4px border */}
            <polygon points="6,11 20,4 20,18" fill="#ffeaf2" />
          </svg>
          <div className="font-pixel text-[15px] 2xl:text-[18px] text-[#5e1f3b] leading-[1.7]">
            <Typewriter
              text="Hi sayang, I have some gifts for you. Dont worry, these are not your actual birthday gifts hehe."
              speed={45}
              onDone={() => setDone(true)}
            />
          </div>
        </motion.div>
      </div>

      {/* next arrow */}
      <AnimatePresence>
        {done && (
          <motion.button
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0 }}
            onClick={onNext}
            aria-label="next"
            className="absolute bottom-8 right-10 z-10 flex items-center gap-3 px-5 py-3 bg-pinkblush border-[3px] border-pinkdeep shadow-[4px_4px_0_#5e1f3b] hover:translate-x-1 hover:-translate-y-1 active:translate-x-[3px] active:translate-y-[3px] active:shadow-none transition-transform"
          >
            <span className="font-pixel text-[14px] text-[#5e1f3b] tracking-widest">
              NEXT
            </span>
            <motion.div
              animate={{ x: [0, 6, 0] }}
              transition={{ repeat: Infinity, duration: 0.9, ease: 'easeInOut' }}
            >
              <PixelArrow size={56} direction="right" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
}
