import { useEffect, useState } from 'react';

interface Props {
  src: string;
  alt?: string;
  /**
   * Which slice of the source image to render.
   *  - 'full'  : whole image
   *  - 'left'  : left 50% (girl, in the user's couple PNG)
   *  - 'right' : right 50% (boy)
   */
  crop?: 'full' | 'left' | 'right';
  /** Display height in px. Width is derived from natural aspect (or half of it). */
  height: number;
  className?: string;
  /** R,G,B all >= threshold → alpha 0. Tweak down if cream tones disappear. */
  threshold?: number;
}

interface Processed {
  url: string;
  naturalWidth: number;
  naturalHeight: number;
}

const cache = new Map<string, Processed>();

function processImage(src: string, threshold: number): Promise<Processed> {
  const key = `${src}@${threshold}`;
  const cached = cache.get(key);
  if (cached) return Promise.resolve(cached);

  return new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = img.naturalWidth;
      canvas.height = img.naturalHeight;
      const ctx = canvas.getContext('2d');
      if (!ctx) return reject(new Error('no 2d context'));
      ctx.drawImage(img, 0, 0);
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const px = data.data;
      for (let i = 0; i < px.length; i += 4) {
        if (px[i] >= threshold && px[i + 1] >= threshold && px[i + 2] >= threshold) {
          px[i + 3] = 0;
        }
      }
      ctx.putImageData(data, 0, 0);
      const result: Processed = {
        url: canvas.toDataURL('image/png'),
        naturalWidth: img.naturalWidth,
        naturalHeight: img.naturalHeight,
      };
      cache.set(key, result);
      resolve(result);
    };
    img.onerror = (e) => reject(e);
    img.src = src;
  });
}

export default function CharacterImage({
  src,
  alt = '',
  crop = 'full',
  height,
  className = '',
  threshold = 248,
}: Props) {
  const [data, setData] = useState<Processed | null>(null);

  useEffect(() => {
    let cancelled = false;
    processImage(src, threshold)
      .then((d) => {
        if (!cancelled) setData(d);
      })
      .catch((err) => {
        console.error('CharacterImage chroma-key failed', err);
      });
    return () => {
      cancelled = true;
    };
  }, [src, threshold]);

  if (!data) {
    return (
      <div
        className={className}
        style={{ height, width: height * 0.5, opacity: 0 }}
        aria-label={alt}
      />
    );
  }

  const aspect = data.naturalWidth / data.naturalHeight;
  const fullWidth = height * aspect;
  const containerWidth = crop === 'full' ? fullWidth : fullWidth / 2;

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ height, width: containerWidth }}
    >
      <img
        src={data.url}
        alt={alt}
        draggable={false}
        style={{
          position: 'absolute',
          height: '100%',
          width: fullWidth,
          maxWidth: 'none',
          imageRendering: 'pixelated',
          left: crop === 'right' ? -fullWidth / 2 : 0,
          top: 0,
        }}
      />
    </div>
  );
}
