import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import CharacterImage from '../components/CharacterImage';
import SkyBackdrop from '../components/SkyBackdrop';
import { HeartSprite, StarSprite } from '../components/PixelCharacter';
import { useIsLargeScreen } from '../hooks/useViewport';

interface Props {
  onReplay: () => void;
}

const HEART_COUNT = 16;

export default function FinalScreen({ onReplay }: Props) {
  const big = useIsLargeScreen();
  return (
    <div className="absolute inset-0 overflow-hidden flex items-end justify-center">
      <SkyBackdrop />

      {/* floating hearts */}
      {Array.from({ length: HEART_COUNT }).map((_, i) => {
        const left = (i / HEART_COUNT) * 100 + (i % 3) * 4;
        const delay = (i % 5) * 0.6;
        const duration = 6 + (i % 4);
        const size = 16 + (i % 4) * 4;
        return (
          <motion.div
            key={i}
            initial={{ y: 700, opacity: 0 }}
            animate={{ y: -120, opacity: [0, 1, 1, 0] }}
            transition={{ duration, delay, repeat: Infinity, ease: 'linear' }}
            style={{ position: 'absolute', left: `${left}%`, top: 0 }}
            className="z-10"
          >
            <HeartSprite size={size} />
          </motion.div>
        );
      })}

      {/* twinkles */}
      <div className="absolute top-10 left-12 animate-twinkle z-10">
        <StarSprite size={26} />
      </div>
      <div className="absolute top-20 right-20 animate-twinkle z-10" style={{ animationDelay: '0.7s' }}>
        <StarSprite size={20} />
      </div>
      <div className="absolute top-28 left-1/3 animate-twinkle z-10" style={{ animationDelay: '1.2s' }}>
        <StarSprite size={16} color="#ffd1e0" />
      </div>

      {/* centered girl + bubble group */}
      <div className="relative z-10 flex items-end gap-8 mb-10">
        <CharacterImage src="/boy.png" alt="him" height={big ? 660 : 510} crop="full" />

        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="relative bg-pinkblush border-[4px] border-pinkdeep px-7 py-6 mb-20 2xl:mb-32 max-w-md"
        >
          {/* tail pointing toward girl */}
          <div
            className="absolute -left-3 bottom-10 w-0 h-0"
            style={{
              borderTop: '8px solid transparent',
              borderBottom: '8px solid transparent',
              borderRight: '12px solid #ff6fa3',
            }}
          />
          <div
            className="absolute -left-1.5 bottom-11 w-0 h-0"
            style={{
              borderTop: '6px solid transparent',
              borderBottom: '6px solid transparent',
              borderRight: '10px solid #ffeaf2',
            }}
          />
          <div className="font-pixel text-[15px] 2xl:text-[18px] text-[#5e1f3b] leading-[1.7]">
            That's all the gifts that i have for you <br /> (for now) hehe. <br /> <br /> Happiest of birthdays my love! <br /> Enjoy your birthday!!!! <br /> <br /> Cant wait to see you soon, I love you sayang! ♥
          </div>
        </motion.div>
      </div>

      {/* replay */}
      <div className="absolute bottom-6 left-6 z-10">
        <PixelButton variant="lavender" size="sm" onClick={onReplay}>
          ⟳ REPLAY
        </PixelButton>
      </div>
    </div>
  );
}
