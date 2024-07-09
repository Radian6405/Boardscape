/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark_purple: {
          DEFAULT: "#242038",
          100: "#07060b",
          200: "#0e0d16",
          300: "#151321",
          400: "#1c192c",
          500: "#242038",
          600: "#463f6d",
          700: "#695ea2",
          800: "#9b93c1",
          900: "#cdc9e0",
        },
        slate_blue: {
          DEFAULT: "#725ac1",
          100: "#150f29",
          200: "#2b1f51",
          300: "#402e7a",
          400: "#553ea3",
          500: "#725ac1",
          600: "#8d7acd",
          700: "#aa9bd9",
          800: "#c6bce6",
          900: "#e3def2",
        },
        tropical_indigo: {
          DEFAULT: "#8d86c9",
          100: "#17152e",
          200: "#2f2a5d",
          300: "#463f8b",
          400: "#6259b4",
          500: "#8d86c9",
          600: "#a59fd4",
          700: "#bbb7df",
          800: "#d2cfe9",
          900: "#e8e7f4",
        },
        "azure_(web)": {
          DEFAULT: "#f2fdff",
          100: "#005463",
          200: "#00a8c6",
          300: "#2adfff",
          400: "#8deeff",
          500: "#f2fdff",
          600: "#f3fdff",
          700: "#f6feff",
          800: "#f9feff",
          900: "#fcffff",
        },
      },
      animation: {
        "spin-slow": "spin 120s linear infinite"
      }
    },
  },
  plugins: [],
};
