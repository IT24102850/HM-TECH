import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#0A0A14",
        paper: "#FFFFFF",
        mist: "#FAF9FE",
        iris: {
          50: "#F5F2FE",
          100: "#ECE5FD",
          200: "#D8CBFB",
          300: "#BDA5F6",
          400: "#A78BFA",
          500: "#8B5CF6",
          600: "#7C3AED",
          700: "#6D28D9",
          800: "#5B21B6",
          900: "#3E1A82",
          950: "#26105A",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "iris-gradient": "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 50%, #A78BFA 100%)",
        "iris-radial": "radial-gradient(circle at center, rgba(139, 92, 246, 0.15) 0%, transparent 70%)",
      },
      boxShadow: {
        iris: "0 20px 60px -15px rgba(109, 40, 217, 0.35)",
        "iris-sm": "0 8px 24px -8px rgba(109, 40, 217, 0.28)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease forwards",
        shimmer: "shimmer 3s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;
