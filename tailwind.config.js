/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1.5rem",
      },
      fontFamily: {
        sans: ['Inter', 'Source Sans Pro', 'system-ui', 'sans-serif'],
        display: ['Bluu Next', 'ClashDisplay', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'monospace'],
        metropolis: ['Metropolis', 'system-ui', 'sans-serif'],
        lato: ['Lato', 'system-ui', 'sans-serif'],
        general: ['General Sans', 'system-ui', 'sans-serif'],
        retro: ['Bluu Next', 'serif'],
        modern: ['Metropolis', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': '0.625rem',
        '4xl': '2.25rem',
        '5xl': '2.75rem',
        '6xl': '3.75rem',
        '7xl': '4.5rem',
        '8xl': '6rem',
        '9xl': '8rem',
      },
      colors: {
        primary: {
          50: '#f0f7ff',
          100: '#e0f0ff',
          200: '#bae0ff',
          300: '#7cc8ff',
          400: '#36a9ff',
          500: '#0090f0',
          600: '#006fd1',
          700: '#0057ab',
          800: '#00468c',
          900: '#073a75',
        },
        accent: {
          50: '#fef2ff',
          100: '#fde6ff',
          200: '#fbcdff',
          300: '#f9a5ff',
          400: '#f570ff',
          500: '#e83ded',
          600: '#d91fd0',
          700: '#b315a9',
          800: '#91148a',
          900: '#771a71',
        },
        neo: {
          50: '#ecfdf5',
          100: '#d1fadd',
          200: '#9cf7c2',
          300: '#65eea6',
          400: '#35df8e',
          500: '#10c16a',
          600: '#0c9d5a',
          700: '#107d4d',
          800: '#126340',
          900: '#115138',
        },
        tertiary: {
          50: '#fef7ee',
          100: '#fdedd8',
          200: '#fad7af',
          300: '#f7ba7b',
          400: '#f3944c',
          500: '#f07127',
          600: '#dc5121',
          700: '#b73a1e',
          800: '#932e20',
          900: '#78291e',
        },
        bone: {
          50: '#FEFDFB',
          100: '#FBF9F3',
          200: '#F8F4E9',
          300: '#F5EFE0',
          400: '#F2EAD7',
          500: '#EFE5CE',
          600: '#E6D8B9',
          700: '#D9C8A3',
          800: '#CCB88E',
          900: '#BFA878',
        },
        dark: '#0A0F1E',
        darker: '#05070F',
        light: '#F9FAFC',
        lighter: '#FFFFFF',
        glass: {
          light: "rgba(255, 255, 255, 0.25)",
          dark: "rgba(10, 15, 30, 0.25)",
          blur: "rgba(255, 255, 255, 0.05)",
          heavy: "rgba(10, 15, 30, 0.7)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "noise": "url('/images/noise.png')",
        "noise-subtle": "url('/images/noise-subtle.png')",
        "mesh-1": "radial-gradient(at 40% 20%, hsla(228, 100%, 74%, 1) 0px, transparent 50%), radial-gradient(at 80% 0%, hsla(189, 100%, 56%, 1) 0px, transparent 50%), radial-gradient(at 0% 50%, hsla(355, 85%, 93%, 1) 0px, transparent 50%), radial-gradient(at 80% 50%, hsla(340, 100%, 76%, 1) 0px, transparent 50%), radial-gradient(at 0% 100%, hsla(22, 100%, 77%, 1) 0px, transparent 50%), radial-gradient(at 80% 100%, hsla(242, 100%, 70%, 1) 0px, transparent 50%), radial-gradient(at 0% 0%, hsla(343, 100%, 76%, 1) 0px, transparent 50%)",
        "mesh-2": "radial-gradient(at 0% 0%, hsla(253, 16%, 7%, 1) 0, transparent 50%), radial-gradient(at 100% 0%, hsla(225, 39%, 30%, 1) 0, transparent 50%), radial-gradient(at 100% 100%, hsla(339, 49%, 30%, 1) 0, transparent 50%), radial-gradient(at 0% 100%, hsla(271, 100%, 40%, 1) 0, transparent 50%)",
        "mesh-primary": "radial-gradient(at 3% 25%, rgba(0, 111, 209, 0.5) 0px, transparent 50%), radial-gradient(at 90% 85%, rgba(216, 31, 208, 0.35) 0px, transparent 50%)",
        "grid-light": "linear-gradient(to right, rgba(209, 213, 219, 0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(209, 213, 219, 0.1) 1px, transparent 1px)",
        "grid-dark": "linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
      },
      animation: {
        "spin-slow": "spin 20s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "float-delayed": "float 6s ease-in-out 2s infinite",
        "float-slow": "float 8s ease-in-out infinite",
        "float-delayed-slow": "float 8s ease-in-out 3s infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "gradient": "gradient 8s ease infinite",
        "morph": "morph 8s ease-in-out infinite",
        "text-reveal": "text-reveal 1.5s cubic-bezier(0.77, 0, 0.175, 1) forwards",
        "marquee": "marquee 25s linear infinite",
        "typewriter": "typewriter 2s steps(40) forwards",
        "blink": "blink 0.75s step-end infinite",
        'bounce-slow': 'bounce 3s ease-in-out infinite',
        'pulse-slow': 'pulse-slow 10s ease-in-out infinite',
        'spin-slow': 'spin-slow 15s linear infinite',
        'shimmer': 'shimmer 2s infinite linear',
      },
      keyframes: {
        float: {
          '0%, 100%': {
            transform: 'translateY(0)',
          },
          '50%': {
            transform: 'translateY(-10px)',
          },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        morph: {
          '0%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' },
          '50%': { borderRadius: '30% 60% 70% 40%/50% 60% 30% 60%' },
          '100%': { borderRadius: '60% 40% 30% 70%/60% 30% 70% 40%' }
        },
        "text-reveal": {
          '0%': { width: '0%' },
          '100%': { width: '100%' }
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' }
        },
        typewriter: {
          to: { width: '100%' }
        },
        blink: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: 'currentColor' },
          '100%': { borderColor: 'transparent' }
        }
      },
      borderRadius: {
        blob: '60% 40% 30% 70%/60% 30% 70% 40%',
        '4xl': '2rem',
        '5xl': '3rem',
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'neon': '0 0 5px theme("colors.primary.400"), 0 0 20px theme("colors.primary.500")',
        'neon-accent': '0 0 5px theme("colors.accent.400"), 0 0 20px theme("colors.accent.500")',
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.15)',
        'inner-dark': 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.1)',
      },
      transitionDuration: {
        '1500': '1500ms',
        '2000': '2000ms',
      },
      aspectRatio: {
        'portrait': '3 / 4',
        'landscape': '16 / 9',
        'square': '1 / 1',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '112': '28rem',
        '128': '32rem',
        '144': '36rem',
      },
      opacity: {
        '3': '0.03',
        '5': '0.05',
        '8': '0.08',
        '15': '0.15',
        '85': '0.85',
        '98': '0.98',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms')({
      strategy: 'class',
    }),
  ],
};