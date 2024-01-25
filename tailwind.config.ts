import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        background: "hsl(var(--background) / <alpha-value>)",
        "background-secondary":
          "hsl(var(--background-secondary) / <alpha-value>)",
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        primary: "hsl(var(--primary) / <alpha-value>)",
        secondary: "hsl(var(--secondary) / <alpha-value>)",
        brand: "hsl(var(--brand) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
      },
      fontFamily: {
        raleway: ["var(--font-raleway)"],
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
