import { transform } from "typescript";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--primary))",
        "dark-primary": "rgba(var(--dark-primary))",

        secondary: "rgba(var(--secondary))",

        accent: "rgba(var(--accent))",
        "dark-accent": "rgba(var(--dark-accent))",

        text: "rgba(var(--text))",

        background: "rgba(var(--background))",
        "dark-background": "rgba(var(--dark-background))",
      },
      animation: {
        "spin-slow": "spin 120s linear infinite",
      },
      fontFamily: {
        nueu: ["Comic Neue", "cursive"],
      },
    },
  },
  plugins: [],
};
