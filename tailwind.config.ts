import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Cinematic, on a light stage. `ink` is the FOREGROUND (near-black)
           and `paper` the off-white stage, so text-ink / bg-paper usage reads
           correctly against the film. */
        ink: "#0B0A14",
        paper: "#FBFBFD",
        mist: "#F4F2FA",
        charcoal: {
          DEFAULT: "#ECEAF4",
          deep: "#E2DEF0",
          soft: "#F4F2FA",
        },
        /* Gold, deepened so it holds contrast as text on white */
        gold: {
          DEFAULT: "#A8842F",
          soft: "#D9B46A",
          deep: "#7E6120",
        },
        accent: {
          DEFAULT: "#8B5CF6",
          soft: "#C4B5FD",
        },
        /* Violet ramp for a light stage: low steps are tints and hairlines,
           high steps are readable text. */
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
        serif: ["var(--font-serif)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      backgroundImage: {
        "iris-gradient":
          "linear-gradient(135deg, #6D28D9 0%, #8B5CF6 55%, #A78BFA 100%)",
        "gold-gradient":
          "linear-gradient(135deg, #7E6120 0%, #A8842F 50%, #D9B46A 100%)",
        "iris-radial":
          "radial-gradient(circle at center, rgba(139,92,246,0.30) 0%, transparent 70%)",
      },
      boxShadow: {
        iris: "0 30px 80px -30px rgba(109, 40, 217, 0.35)",
        "iris-sm": "0 12px 32px -14px rgba(109, 40, 217, 0.25)",
        gold: "0 20px 60px -25px rgba(168, 132, 47, 0.3)",
        film: "0 30px 80px -40px rgba(38, 16, 90, 0.22)",
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
