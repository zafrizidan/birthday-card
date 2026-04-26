import type { ButtonHTMLAttributes, ReactNode } from 'react';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'pink' | 'lavender' | 'cream';
  size?: 'sm' | 'md' | 'lg';
}

const variants = {
  pink: {
    bg: 'bg-pinkdeep',
    text: 'text-white',
    border: 'border-[#a13564]',
    shadow: 'shadow-[4px_4px_0_0_#5e1f3b]',
  },
  lavender: {
    bg: 'bg-lavender',
    text: 'text-[#3d2b66]',
    border: 'border-[#7a63a6]',
    shadow: 'shadow-[4px_4px_0_0_#3d2b66]',
  },
  cream: {
    bg: 'bg-cream',
    text: 'text-pinkdeep',
    border: 'border-pinkdeep',
    shadow: 'shadow-[4px_4px_0_0_#a13564]',
  },
};

const sizes = {
  sm: 'px-3 py-2 text-[8px]',
  md: 'px-5 py-3 text-[10px]',
  lg: 'px-8 py-4 text-[14px]',
};

export default function PixelButton({
  children,
  variant = 'pink',
  size = 'md',
  className = '',
  ...rest
}: Props) {
  const v = variants[variant];
  return (
    <button
      {...rest}
      className={[
        'font-pixel tracking-wider',
        'border-[3px]',
        'transition-transform',
        'active:translate-x-[3px] active:translate-y-[3px]',
        'active:shadow-none',
        'hover:-translate-y-0.5',
        'disabled:opacity-50 disabled:cursor-not-allowed disabled:active:translate-x-0 disabled:active:translate-y-0',
        v.bg,
        v.text,
        v.border,
        v.shadow,
        sizes[size],
        className,
      ].join(' ')}
    >
      {children}
    </button>
  );
}
