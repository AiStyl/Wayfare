import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary palette - Sunset/Travel inspired
        coral: {
          50: '#fef2f0',
          100: '#fee4df',
          200: '#fecdc4',
          300: '#fcab9b',
          400: '#f97356',
          500: '#f04d2e',
          600: '#dd3320',
          700: '#b92718',
          800: '#982418',
          900: '#7e231b',
        },
        midnight: {
          50: '#f4f6f9',
          100: '#e2e7ef',
          200: '#c2cde0',
          300: '#94a8c7',
          400: '#6280aa',
          500: '#3f5f8a',
          600: '#324c76',
          700: '#2a3f61',
          800: '#1a2744',
          900: '#0f1729',
          950: '#080c14',
        },
        gold: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
        },
        teal: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        purple: {
          50: '#f5f3ff',
          100: '#ede9fe',
          200: '#ddd6fe',
          300: '#c4b5fd',
          400: '#a78bfa',
          500: '#8b5cf6',
          600: '#7c3aed',
          700: '#6d28d9',
          800: '#5b21b6',
          900: '#4c1d95',
        },
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'Georgia', 'serif'],
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-coral': '0 0 40px -8px rgba(249, 115, 86, 0.4)',
        'glow-gold': '0 0 40px -8px rgba(245, 158, 11, 0.4)',
        'glow-teal': '0 0 40px -8px rgba(13, 148, 136, 0.4)',
        'card': '0 4px 20px -4px rgba(15, 23, 41, 0.08)',
        'card-hover': '0 12px 40px -8px rgba(15, 23, 41, 0.15)',
        'elevated': '0 20px 60px -15px rgba(15, 23, 41, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-down': 'slideDown 0.4s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'pulse-soft': 'pulseSoft 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'plane': 'plane 20s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        plane: {
          '0%': { transform: 'translateX(-100%) translateY(0)' },
          '100%': { transform: 'translateX(calc(100vw + 100%)) translateY(-50px)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-coral': 'linear-gradient(135deg, #f97356 0%, #fbbf24 100%)',
        'gradient-sunset': 'linear-gradient(135deg, #f97356 0%, #ec4899 50%, #8b5cf6 100%)',
        'gradient-ocean': 'linear-gradient(135deg, #0d9488 0%, #3b82f6 100%)',
        'gradient-night': 'linear-gradient(135deg, #1a2744 0%, #4c1d95 100%)',
      },
    },
  },
  plugins: [],
};
export default config;
