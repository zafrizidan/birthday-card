import { motion } from 'framer-motion';
import PixelButton from '../components/PixelButton';
import CharacterImage from '../components/CharacterImage';
import SkyBackdrop from '../components/SkyBackdrop';
import { HeartSprite, StarSprite } from '../components/PixelCharacter';
import { useIsLargeScreen } from '../hooks/useViewport';

interface Props {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: Props) {
  const big = useIsLargeScreen();
  return (
    <div className="absolute inset-0 overflow-hidden flex">
      <SkyBackdrop />
      {/* lives row */}
      <div className="absolute top-3 left-3 flex gap-1 z-10">
        <HeartSprite size={20} />
        <HeartSprite size={20} />
        <HeartSprite size={20} />
      </div>

      {/* twinkles */}
      <div className="absolute top-6 right-32 animate-twinkle">
        <StarSprite size={20} />
      </div>
      <div className="absolute bottom-12 left-32 animate-twinkle" style={{ animationDelay: '0.8s' }}>
        <StarSprite size={16} />
      </div>
      <div className="absolute top-24 right-20 animate-twinkle" style={{ animationDelay: '1.4s' }}>
        <StarSprite size={14} color="#ffd1e0" />
      </div>

      {/* characters in heart frame */}
      <div className="relative z-10 flex-1 flex items-center justify-center pl-6">
        <div
          className="relative px-8 py-6 bg-pinksoft/70 backdrop-blur-[1px] border-[4px] border-pinkdeep shadow-[6px_6px_0_#5e1f3b]"
          style={{ borderRadius: 4 }}
        >
          {/* corner heart */}
          <div className="absolute -top-3 -right-3">
            <HeartSprite size={24} />
          </div>
          <div>
            <CharacterImage src="/title.png" alt="title character" height={big ? 600 : 460} crop="full" />
          </div>
        </div>
      </div>

      {/* title */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center pr-8">
        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 180, damping: 14 }}
          className="font-pixel text-pinksoft pixel-shadow text-[52px] 2xl:text-[68px] leading-[1.25] mb-10"
          style={{ textAlign: 'center' }}
        >
          HAPPY
          <br />
          BIRTHDAY,
          <br />
          LOVE!
        </motion.div>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        >
          <PixelButton variant="pink" size="lg" onClick={onStart}>
            START
          </PixelButton>
        </motion.div>
      </div>
    </div>
  );
}
