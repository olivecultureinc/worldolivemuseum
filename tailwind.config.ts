import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        olive: {
          DEFAULT: "#5F7D1C",
          hover: "#556F19",
          soft: "#7F9C3A",
        },
        gold: "#C9A227",
        cream: "#F3F0EA",
      },
    },
  },
  plugins: [],
};

export default config;