import type { Config } from 'tailwindcss';
const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#060816',
        panel: '#11182d',
        line: 'rgba(159,177,227,.16)',
        lavender: '#a9b7ff',
        mint: '#95e4ce',
      },
      fontFamily: { sans: ['var(--font-manrope)', 'sans-serif'] },
    },
  },
  plugins: [],
};
export default config;
