module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
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
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
