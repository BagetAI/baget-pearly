/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
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
        serif: ['var(--font-libre-baskerville)', 'serif'],
        sans: ['var(--font-lato)', 'sans-serif'],
      },
      borderRadius: {
        'custom': '4px',
      },
    },
  },
  plugins: [],
};
