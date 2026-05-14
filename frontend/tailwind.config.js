/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--color-primary)',
          light: 'var(--color-primary-light)',
          dark: 'var(--color-primary-dark)',
        },
        synergy: {
          blue: 'var(--color-synergy-blue)',
        },
        bureaucracy: {
          purple: 'var(--color-bureaucracy-purple)',
        },
        compliance: {
          yellow: 'var(--color-compliance-yellow)',
        },
        chaos: {
          red: 'var(--color-error-red)',
          dark: 'var(--color-error-dark)',
        },
        bg: {
          main: 'var(--color-bg-main)',
          card: 'var(--color-bg-card)',
          'card-strong': 'var(--color-bg-card-strong)',
        }
      },
      backgroundImage: {
        'enterprise-gradient': 'var(--gradient-enterprise)',
        'danger-gradient': 'var(--gradient-danger)',
      },
      animation: {
        'slow-pulse': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
