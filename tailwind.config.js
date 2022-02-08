module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['"Open Sans"', 'sans-serif']
      },
      colors: {
        black: {
          DEFAULT: '#18203F'
        },
        primary: {
          300: '#FF998B',
          500: '#DD4C37'
        },
        transparentPrimary: {
          '8%': '#E35C4914',
          '16%': '#E35C4929',
          '24%': '#E35C493D',
          '32%': '#E35C4952',
          '40%': '#E35C4952',
          '48%': '#E35C497A'
        },
        hoverPrimary: {
          500: '#C54532'
        },
        textAcent: {
          500: '#E35C49'
        },
        textHint: '#8C92A9',
        gray: {
          200: '#ECECEC',
          300: '#D6D6D6',
          400: '#B3B3B3',
          500: '#9D9D9D',
          600: '#777777',
          700: '#585858',
          800: '#404040',
          900: '#2A2A2A'
        },
        success: {
          100: '#EFFDD4',
          200: '#DBFBAB',
          300: '#BFF37F',
          400: '#A2E85D',
          500: '#78D92C',
          600: '#54A52C',
          700: '#429C16',
          800: '#2C7D0E',
          900: '#1D6808'
        },
        info: {
          100: '#D0FEF8',
          200: '#A3FDF9',
          300: '#74F6FA',
          400: '#51E5F6',
          500: '#18C8FF',
          600: '#139ECF',
          700: '#0D78AD',
          800: '#08568B',
          900: '#043E73'
        }
      },

      animation: {
        'fade-in': 'fadeIn 150ms ease-in'
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
