import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import SkyBackdrop from '../components/SkyBackdrop';
import { GiftSprite, PixelArrow, StarSprite } from '../components/PixelCharacter';
import { useIsLargeScreen } from '../hooks/useViewport';
import type { GiftId } from '../types';

interface Props {
  opened: Set<GiftId>;
  onPick: (id: GiftId) => void;
  onAllOpened: () => void;
}

const gifts: { id: GiftId; color: 'pink' | 'lavender' | 'cream' }[] = [
  { id: 'letter', color: 'pink' },
  { id: 'gallery', color: 'lavender' },
  { id: 'music', color: 'cream' },
];

export default function GiftChoiceScreen({ opened, onPick, onAllOpened }: Props) {
  const [bursting, setBursting] = useState<GiftId | null>(null);
  const allOpened = opened.size === 3;
  const big = useIsLargeScreen();

  const handlePick = (id: GiftId) => {
    if (opened.has(id) || bursting) return;
    setBursting(id);
    window.setTimeout(() => onPick(id), 600);
  };

  return (
    <div className="absolute inset-0 overflow-hidden flex flex-col items-center justify-center">
      <SkyBackdrop />
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative z-10 font-pixel text-pinksoft pixel-shadow text-[32px] 2xl:text-[40px] mb-4"
      >
        Choose Your Gifts
      </motion.div>
      <div className="relative z-10 font-pixel text-[10px] text-[#5e1f3b] mb-14 tracking-widest">
        opened {opened.size} / 3
      </div>

      <div className="relative z-10 flex gap-12 2xl:gap-20 items-end">
        {gifts.map(({ id, color }) => {
          const isOpen = opened.has(id);
          const isBurst = bursting === id;
          return (
            <button
              key={id}
              onClick={() => handlePick(id)}
              className="relative flex flex-col items-center group"
              disabled={isOpen}
            >
              <motion.div
                animate={{ y: isBurst ? -12 : [0, -6, 0] }}
                transition={
                  isBurst
                    ? { duration: 0.4 }
                    : { repeat: Infinity, duration: 2, ease: 'easeInOut' }
                }
                className={isOpen ? 'opacity-50' : ''}
              >
                <GiftSprite color={color} size={big ? 200 : 160} />
              </motion.div>

              {/* burst sparkles */}
              <AnimatePresence>
                {isBurst &&
                  [0, 1, 2, 3, 4, 5].map((i) => {
                    const angle = (i / 6) * Math.PI * 2;
                    const dx = Math.cos(angle) * 100;
                    const dy = Math.sin(angle) * 100;
                    return (
                      <motion.div
                        key={i}
                        initial={{ x: 0, y: 0, opacity: 1, scale: 0.4 }}
                        animate={{ x: dx, y: dy, opacity: 0, scale: 1.2 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.55 }}
                        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                      >
                        <StarSprite size={26} />
                      </motion.div>
                    );
                  })}
              </AnimatePresence>

              {/* opened checkmark */}
              {isOpen && (
                <div className="absolute -top-2 -right-2 w-8 h-8 bg-pinkdeep border-[3px] border-[#5e1f3b] flex items-center justify-center font-pixel text-white text-[12px] shadow-[2px_2px_0_#5e1f3b]">
                  ✓
                </div>
              )}

            </button>
          );
        })}
      </div>

      {/* continue button after all opened */}
      <AnimatePresence>
        {allOpened && (
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="relative z-10 mt-12"
          >
            <PixelButton variant="pink" size="lg" onClick={onAllOpened}>
              <span className="inline-flex items-center gap-3">
                CONTINUE
                <PixelArrow size={36} direction="right" color="#fff5f5" outline="#5e1f3b" />
              </span>
            </PixelButton>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
