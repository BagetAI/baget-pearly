import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#F4ECD8",
        burgundy: "#6B2D3E",
        navy: "#2C3E50",
        sepia: "#4A3728",
      },
      fontFamily: {
        serif: ["var(--font-libre-baskerville)"],
        sans: ["var(--font-lato)"],
      },
      borderRadius: {
        custom: "4px",
      },
    },
  },
  plugins: [],
};
export default config;
