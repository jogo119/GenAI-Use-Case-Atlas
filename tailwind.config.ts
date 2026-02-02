import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f1f5ff',
          100: '#e1e9ff',
          200: '#c2d3ff',
          300: '#95b3ff',
          400: '#5f8bff',
          500: '#3a6bff',
          600: '#214fe6',
          700: '#193cb3',
          800: '#152f80',
          900: '#0f1f52'
        }
      }
    }
  },
  plugins: []
};

export default config;
