import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      colors: {
        cream: "#faf8f5",
        blush: "#fce7f3",
        lavender: "#ede9fe",
        softgold: "#fde68a",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(15, 23, 42, 0.08), 0 2px 8px rgba(15, 23, 42, 0.04)",
        float: "0 20px 60px -20px rgba(15, 23, 42, 0.35)",
      },
    },
  },
  plugins: [],
};

export default config;
