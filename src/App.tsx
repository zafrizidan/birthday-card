import { useCallback, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import LockScreen from './screens/LockScreen';
import TitleScreen from './screens/TitleScreen';
import DialogueScreen from './screens/DialogueScreen';
import GiftChoiceScreen from './screens/GiftChoiceScreen';
import LetterScreen from './screens/LetterScreen';
import GalleryScreen from './screens/GalleryScreen';
import MusicScreen from './screens/MusicScreen';
import FinalScreen from './screens/FinalScreen';
import type { GiftId, Screen } from './types';

const dissolve = {
  initial: { opacity: 0, filter: 'contrast(1.6) brightness(0.6)', clipPath: 'inset(45% 0 45% 0)' },
  animate: {
    opacity: 1,
    filter: 'contrast(1) brightness(1)',
    clipPath: 'inset(0% 0 0% 0)',
    transition: { duration: 0.45, ease: [0.2, 0.8, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    filter: 'contrast(1.4) brightness(1.2)',
    clipPath: 'inset(48% 0 48% 0)',
    transition: { duration: 0.3, ease: [0.6, 0, 0.8, 0] },
  },
};

export default function App() {
  const [screen, setScreen] = useState<Screen>('lock');
  const [openedGifts, setOpenedGifts] = useState<Set<GiftId>>(new Set());

  const goTo = useCallback((next: Screen) => setScreen(next), []);

  const markGiftOpened = useCallback((id: GiftId) => {
    setOpenedGifts((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setOpenedGifts(new Set());
    setScreen('lock');
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          variants={dissolve}
          initial="initial"
          animate="animate"
          exit="exit"
          className="absolute inset-0"
        >
          {screen === 'lock' && <LockScreen onUnlock={() => goTo('title')} />}
          {screen === 'title' && <TitleScreen onStart={() => goTo('dialogue')} />}
          {screen === 'dialogue' && <DialogueScreen onNext={() => goTo('gifts')} />}
          {screen === 'gifts' && (
            <GiftChoiceScreen
              opened={openedGifts}
              onPick={(id) => goTo(id)}
              onAllOpened={() => goTo('final')}
            />
          )}
          {screen === 'letter' && (
            <LetterScreen
              onBack={() => {
                markGiftOpened('letter');
                goTo('gifts');
              }}
            />
          )}
          {screen === 'gallery' && (
            <GalleryScreen
              onBack={() => {
                markGiftOpened('gallery');
                goTo('gifts');
              }}
            />
          )}
          {screen === 'music' && (
            <MusicScreen
              onBack={() => {
                markGiftOpened('music');
                goTo('gifts');
              }}
            />
          )}
          {screen === 'final' && <FinalScreen onReplay={reset} />}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
