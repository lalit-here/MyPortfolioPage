import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    colors: {
      background: "#000000",
      primary: "#4ade80",
      accent: "#facc15",
      "text-main": "#f0fdf4",
      "text-muted": "#6b7280",
      transparent: "transparent",
      current: "currentColor",
    },
    fontFamily: {
      heading: ["var(--font-space-grotesk)", "sans-serif"],
      mono: ["var(--font-jetbrains-mono)", "monospace"],
      sans: ["var(--font-space-grotesk)", "sans-serif"],
    },
  },
  plugins: [],
};

export default config;
