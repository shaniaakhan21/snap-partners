/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        15: "15px",
        10: "10px",
      },
      fontFamily: {
        body: ["Open Sans", "sans-serif"],
      },

      screens: {
        xs: '420px',
        '3xl': '1921px'
      },

      height: {
        "screen-80": "80vh",
      },

      colors: {
        black: {
          DEFAULT: "#000000",
        },
        primary: {
          100: "#f4b400",
          200: "#0f9d58",
          300: "#FF998B",
          500: "#E74426",
        },
        transparentPrimary: {
          "8%": "#E35C4914",
          "16%": "#E35C4929",
          "24%": "#E35C493D",
          "32%": "#E35C4952",
          "40%": "#E35C4952",
          "48%": "#E35C497A",
        },
        hoverPrimary: {
          500: "#C54532",
        },
        textAcent: {
          100: "#FFAA00",
          200: "#2C7D0E",
          500: '#E35C49',
          600: '#E74426'
        },
        phase: {
          100: "#FFE7E7",
          200: "#FFE59E",
          300: "#BFF37F",
        },
        textHint: "#8C92A9",
        gray: {
          200: "#ECECEC",
          300: "#D6D6D6",
          400: "#B3B3B3",
          500: "#9D9D9D",
          600: "#777777",
          700: "#585858",
          800: "#404040",
          900: "#2A2A2A",
          1000: "#1C1C1C",
        },
        success: {
          100: "#EFFDD4",
          200: "#DBFBAB",
          300: "#BFF37F",
          400: "#A2E85D",
          500: "#78D92C",
          600: "#54A52C",
          700: "#429C16",
          800: "#2C7D0E",
          900: "#1D6808",
        },
        info: {
          100: "#D0FEF8",
          200: "#A3FDF9",
          300: "#74F6FA",
          400: "#51E5F6",
          500: "#18C8FF",
          600: "#139ECF",
          700: "#0D78AD",
          800: "#08568B",
          900: "#043E73",
        },
        warning: {
          100: "#FFFDF2",
          200: "#FFF1C2",
          300: "#FFE59E",
          400: "#FFC94D",
          500: "#FFAA00",
          600: "#DB8B00",
          700: "#B86E00",
          800: "#945400",
          900: "#703C00",
        },
      },

      animation: {
        "fade-in": "fadeIn 150ms ease-in",
      },

      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
