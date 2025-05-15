/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        green: {
          50: "#f0f9f1",
          100: "#dcf1de",
          200: "#bae3be",
          300: "#8ecd95",
          400: "#5fb06a",
          500: "#4f7942",
          600: "#3a5a31",
          700: "#2f4728",
          800: "#273921",
          900: "#22301d",
        },
        yellow: {
          500: "#f9a826",
        },
      },
    },
  },
  plugins: [],
};
