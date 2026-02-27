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
        "brand-primary": "#009253",
        "brand-white": "#ffffff",
        "brand-black": "#231f20",
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
  plugins: [
    require('@tailwindcss/typography'),
  ],
};
