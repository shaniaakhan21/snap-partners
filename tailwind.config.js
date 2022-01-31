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
        primary: {
          300: '#FF998B',
          500: '#DD4C37'
        },
        textAcent: {
          500: '#E35C49'
        },
        gray: {
          200: '#ECEEF3',
          300: '#D6D6D6',
          400: '#B3B3B3',
          500: '#9D9D9D',
          700: '#585858',
          800: '#404040'
        },

        animation: {
          'fade-in': 'fadeIn 500ms ease-in-out'
        },

        keyframes: {
          fadeIn: {
            '0%': { opacity: '0' },
            '100%': { opacity: '1' }
          }
        }
      }
    }
  },
  plugins: [require('@tailwindcss/line-clamp')]
}
