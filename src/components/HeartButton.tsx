import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
}

/**
 * Heart-shaped numpad key. Uses inline SVG so the heart is crisp at any scale.
 */
export default function HeartButton({ children, className = '', ...rest }: Props) {
  return (
    <button
      {...rest}
      className={[
        'relative w-14 h-14 group',
        'transition-transform active:translate-y-[3px]',
        'disabled:opacity-50',
        className,
      ].join(' ')}
    >
      <svg
        viewBox="0 0 32 32"
        className="absolute inset-0 w-full h-full drop-shadow-[3px_3px_0_#a13564]"
        aria-hidden
      >
        {/* Pixel-y heart shape via stepped polygon */}
        <path
          d="M6 4 H10 V6 H12 V8 H14 V10 H18 V8 H20 V6 H22 V4 H26 V8 H28 V14 H26 V18 H24 V22 H22 V24 H20 V26 H18 V28 H14 V26 H12 V24 H10 V22 H8 V18 H6 V14 H4 V8 H6 Z"
          fill="#ff95ba"
          stroke="#a13564"
          strokeWidth="1.5"
        />
        {/* Highlight pixel */}
        <rect x="9" y="8" width="3" height="3" fill="#fff5f5" opacity="0.85" />
      </svg>
      <span className="relative z-10 font-pixel text-[14px] text-[#5e1f3b] flex items-center justify-center w-full h-full pb-1">
        {children}
      </span>
    </button>
  );
}
