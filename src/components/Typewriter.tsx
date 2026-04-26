import { useEffect, useRef, useState } from 'react';

interface Props {
  text: string;
  speed?: number;
  onDone?: () => void;
  className?: string;
  showCursor?: boolean;
}

export default function Typewriter({
  text,
  speed = 40,
  onDone,
  className = '',
  showCursor = true,
}: Props) {
  const [shown, setShown] = useState('');
  const onDoneRef = useRef(onDone);

  // Keep the latest onDone in a ref so it isn't a useEffect dep — otherwise an
  // inline arrow function in the parent would restart the interval on every
  // render, causing the typewriter to play through twice.
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    setShown('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) {
        window.clearInterval(id);
        onDoneRef.current?.();
      }
    }, speed);
    return () => window.clearInterval(id);
  }, [text, speed]);

  const done = shown.length === text.length;

  return (
    <span className={className}>
      {shown}
      {showCursor && !done && (
        <span className="inline-block w-2 h-3 ml-0.5 bg-pinkdeep align-baseline animate-pulse" />
      )}
    </span>
  );
}
