import type { Config } from "tailwindcss";
const config: Config = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        medi: {
          DEFAULT: '#00C4D1',
          dark: '#00A6B3',
          light: '#ECFEFF',
        },
      },
    },
  },
  plugins: [],
};

export default config;