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
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1', // Nexus Primary Brand
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          cyan: '#06B6D4',
          violet: '#8B5CF6',
          glow: '#818CF8',
        },
        dark: {
          bg: '#080C14',
          card: '#0F172A',
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
