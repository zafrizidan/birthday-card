import { useEffect, useState } from 'react';

interface Viewport {
  width: number;
  height: number;
}

const read = (): Viewport =>
  typeof window === 'undefined'
    ? { width: 1920, height: 1080 }
    : { width: window.innerWidth, height: window.innerHeight };

export function useViewport(): Viewport {
  const [size, setSize] = useState<Viewport>(read);
  useEffect(() => {
    const onResize = () => setSize(read());
    window.addEventListener('resize', onResize);
    window.addEventListener('orientationchange', onResize);
    return () => {
      window.removeEventListener('resize', onResize);
      window.removeEventListener('orientationchange', onResize);
    };
  }, []);
  return size;
}

// Matches Tailwind's `2xl:` breakpoint — true on a 15" laptop (1920x1080),
// false on iPad Air 4 landscape (1180x820).
export function useIsLargeScreen(): boolean {
  const { width } = useViewport();
  return width >= 1536;
}
