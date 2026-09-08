import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Cinematic tech-noir. `ink` is the FOREGROUND (near-white) and
           `paper` the off-black stage, so existing text-ink / bg-paper usage
           reads correctly against the film. */
        ink: "#ECEAF4",
        paper: "#07070B",
        mist: "#0D0D14",
        charcoal: {
          DEFAULT: "#101018",
          deep: "#0A0A10",
          soft: "#16161F",
        },
        /* Subtle gold, used sparingly for highlights and rules */
        gold: {
          DEFAULT: "#D9B46A",
          soft: "#F2DCAE",
          deep: "#9C7A32",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          soft: "#C4B5FD",
        },
        /* Violet ramp inverted for a dark stage: low steps are surfaces and
           hairlines, high steps are bright text and accents. */
        iris: {
          50: "#0F0C1C",
          100: "#181330",
          200: "#241B4C",
          300: "#3A2B7A",
          400: "#8B5CF6",
          500: "#A17DFF",
          600: "#B79BFF",
          700: "#CDBAFF",
          800: "#E0D5FF",
          900: "#EFE9FF",
          950: "#F8F5FF",
        },
      },
      fontFamily: {
        display: ["var(--font-display)"],
        serif: ["var(--font-serif)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "iris-gradient":
          "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #9C7A32 0%, #D9B46A 50%, #F2DCAE 100%)",
        "iris-radial":
          "radial-gradient(circle at center, rgba(139,92,246,0.30) 0%, transparent 70%)",
      },
      boxShadow: {
        iris: "0 30px 90px -25px rgba(139, 92, 246, 0.55)",
        "iris-sm": "0 14px 40px -14px rgba(139, 92, 246, 0.45)",
        gold: "0 20px 60px -25px rgba(217, 180, 106, 0.45)",
        film: "0 40px 120px -40px rgba(0, 0, 0, 0.9)",
      },
      letterSpacing: {
        cinema: "0.42em",
        wide2: "0.24em",
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
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        spinSlow: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "0.65", transform: "scale(1.08)" },
        },
        lightSweep: {
          "0%": { transform: "translateX(-120%) skewX(-18deg)" },
          "100%": { transform: "translateX(220%) skewX(-18deg)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        fadeUp: "fadeUp 0.8s ease forwards",
        shimmer: "shimmer 3s linear infinite",
        marquee: "marquee 30s linear infinite",
        spinSlow: "spinSlow 26s linear infinite",
        pulseGlow: "pulseGlow 6s ease-in-out infinite",
        lightSweep: "lightSweep 2.4s cubic-bezier(0.22,1,0.36,1)",
      },
    },
  },
  plugins: [],
};
export default config;
