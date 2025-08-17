// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bright-sun": {
          50: "#fffdea",
          100: "#fff9c4",
          200: "#fff59d",
          300: "#fff176",
          400: "#ffee58", // 🔥 main shade
          500: "#fdd835",
          600: "#fbc02d",
          700: "#f9a825",
          800: "#f57f17",
          900: "#f57f17",
        },
        'mine-shaft': {
          '50': '#f6f6f6',
          '100': '#e7e7e7',
          '200': '#d1d1d1',
          '300': '#b0b0b0',
          '400': '#888888',
          '500': '#6d6d6d',
          '600': '#5d5d5d',
          '700': '#4f4f4f',
          '800': '#454545',
          '900': '#3d3d3d',
          '950': '#2d2d2d',
        }
,
      },
    },
  },
  plugins: [],
}
