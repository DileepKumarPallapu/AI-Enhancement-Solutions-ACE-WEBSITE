/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FAF5FF',
          100: '#F3E8FF',
          200: '#E9D5FF',
          300: '#D8B4FE',
          400: '#C084FC',
          500: '#7F00FF', // ACE Primary Brand
          600: '#6B00D7',
          700: '#5800B0',
          800: '#46008C',
          900: '#320064',
          glow: '#A855F7',
        },
        dark: {
          bg: '#0B0F19',
          card: '#131B2E',
          surface: '#1E293B',
          border: '#334155'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Poppins', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 4s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 15px rgba(127, 0, 255, 0.4)' },
          '100%': { boxShadow: '0 0 30px rgba(168, 85, 247, 0.8)' },
        }
      }
    },
  },
  plugins: [],
}
