import { useCallback, useState } from 'react';
import { motion } from 'framer-motion';
import HeartButton from '../components/HeartButton';
import CharacterImage from '../components/CharacterImage';
import SkyBackdrop from '../components/SkyBackdrop';
import { HeartSprite } from '../components/PixelCharacter';
import { useIsLargeScreen } from '../hooks/useViewport';

const PASSCODE = '0220';

interface Props {
  onUnlock: () => void;
}

export default function LockScreen({ onUnlock }: Props) {
  const [code, setCode] = useState('');
  const [shake, setShake] = useState(false);
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const big = useIsLargeScreen();

  const submit = useCallback(
    (entered: string) => {
      if (entered === PASSCODE) {
        setSuccess(true);
        window.setTimeout(onUnlock, 600);
      } else {
        setError(true);
        setShake(true);
        window.setTimeout(() => {
          setCode('');
          setError(false);
          setShake(false);
        }, 500);
      }
    },
    [onUnlock]
  );

  const press = useCallback(
    (key: string) => {
      if (success) return;
      if (key === '*') {
        setCode((c) => c.slice(0, -1));
        return;
      }
      if (key === '#') {
        if (code.length === 4) submit(code);
        return;
      }
      setCode((c) => {
        if (c.length >= 4) return c;
        const next = c + key;
        if (next.length === 4) {
          window.setTimeout(() => submit(next), 150);
        }
        return next;
      });
    },
    [code, submit, success]
  );

  const keys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];

  return (
    <div className="absolute inset-0 flex">
      {/* Left half: characters on sunset sky */}
      <div className="relative w-1/2 overflow-hidden flex items-end justify-center pb-8">
        <SkyBackdrop />
        <div className="relative z-10">
          <CharacterImage src="/couple.png" alt="us" height={big ? 600 : 460} crop="full" />
        </div>

        {/* heart sparkles on top of the sky */}
        <div className="absolute top-6 left-8 animate-twinkle z-10">
          <HeartSprite size={26} />
        </div>
        <div className="absolute top-12 right-10 animate-twinkle z-10" style={{ animationDelay: '0.6s' }}>
          <HeartSprite size={20} />
        </div>
        <div className="absolute bottom-32 left-10 animate-twinkle z-10" style={{ animationDelay: '1.2s' }}>
          <HeartSprite size={18} />
        </div>
      </div>

      {/* Right half: keypad panel */}
      <motion.div
        className="w-1/2 bg-pinksoft flex flex-col items-center justify-center px-6"
        animate={shake ? { x: [-8, 8, -6, 6, 0] } : { x: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div
          className={[
            'font-pixel text-[22px] mb-5 tracking-wider',
            success ? 'text-pinkdeep' : error ? 'text-red-500' : 'text-[#5e1f3b]',
          ].join(' ')}
        >
          {success ? 'You got it!' : error ? 'Try again!' : 'Enter passcode'}
        </div>

        {/* digit display */}
        <div className="flex gap-3 mb-7">
          {[0, 1, 2, 3].map((i) => {
            const filled = i < code.length;
            return (
              <div
                key={i}
                className="w-14 h-14 bg-white border-[3px] border-pinkdeep flex items-center justify-center font-pixel text-[20px] text-pinkdeep shadow-[3px_3px_0_#a13564]"
              >
                {filled ? code[i] : ''}
              </div>
            );
          })}
        </div>

        {/* numpad */}
        <div className="grid grid-cols-3 gap-3">
          {keys.map((k) => (
            <HeartButton key={k} onClick={() => press(k)} aria-label={`key ${k}`}>
              {k}
            </HeartButton>
          ))}
        </div>

        <div className="mt-5 font-pixel text-[8px] text-[#a13564] tracking-widest opacity-80">
          * clear &nbsp;·&nbsp; # submit
        </div>
      </motion.div>
    </div>
  );
}
