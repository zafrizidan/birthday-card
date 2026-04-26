/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pixel: ['"Press Start 2P"', 'system-ui', 'monospace'],
      },
      colors: {
        pinksoft: '#ffd1e0',
        pinkmid: '#ffa6c1',
        pinkdeep: '#ff6fa3',
        pinkblush: '#ffeaf2',
        lavender: '#d6c4f0',
        lavendersoft: '#e7dcf7',
        cream: '#fff5f5',
        bezel: '#3a3a3a',
        bezeldark: '#1f1f23',
        nightsky: '#2b2545',
      },
      boxShadow: {
        pixel: '4px 4px 0 0 #ff6fa3',
        pixelsoft: '3px 3px 0 0 #d48bb0',
        pixeldark: '4px 4px 0 0 #2a1a2a',
        innermon: 'inset 0 0 0 4px #1a1320, inset 0 0 0 8px #4a3856',
      },
      keyframes: {
        bob: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '20%, 60%': { transform: 'translateX(-8px)' },
          '40%, 80%': { transform: 'translateX(8px)' },
        },
        twinkle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '1', transform: 'scale(1.4)' },
        },
        scanline: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
      },
      animation: {
        bob: 'bob 2.4s ease-in-out infinite',
        bobfast: 'bob 1.2s ease-in-out infinite',
        shake: 'shake 0.4s linear',
        twinkle: 'twinkle 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
