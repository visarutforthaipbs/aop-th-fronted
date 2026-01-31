/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-noto-sans-thai-looped)", "sans-serif"],
      },
      colors: {
        "brand-green-dark": "#009253",
        "brand-green-medium": "#67be6a",
        "brand-green-light": "#d9e8c5",
        "brand-primary": "#009253", // Using existing green as primary base, or update if strict needed
        "brand-secondary": "#FDF8C0", // Cream
        "brand-accent": "#005F33", // Dark Green
        "brand-white": "#ffffff",
        "brand-black": "#231f20",
        "brand-red": "#803432",
        "brand-yellow": "#faf4a6",
      },
      keyframes: {
        "slow-zoom": {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(1.1)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "slow-zoom": "slow-zoom 20s linear infinite alternate",
        "fade-in-up": "fade-in-up 1s ease-out forwards",
      },
    },
  },
  plugins: [],
};
