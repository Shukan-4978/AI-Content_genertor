/** @type {import('tailwindcss').Config} */
// Tailwind v3 configuration — scans every JS/JSX/TS/TSX file under src/
// so the produced stylesheet only contains classes we actually use.
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#0B0B0F",
          card: "rgba(18, 18, 26, 0.7)",
          border: "rgba(255, 255, 255, 0.08)",
          primary: "#8B5CF6", // Neon Violet
          secondary: "#06B6D4", // Cyber Cyan
          accent: "#D946EF", // Neon Magenta
          glow: "rgba(139, 92, 246, 0.15)",
        }
      },
      animation: {
        "text-glow": "text-glow 3s ease-in-out infinite alternate",
        "pulse-glow": "pulse-glow 2s infinite alternate",
        "float": "float 6s ease-in-out infinite",
        "fade-in-up": "fade-in-up 0.5s ease-out forwards",
      },
      keyframes: {
        "text-glow": {
          "0%": { textShadow: "0 0 10px rgba(139, 92, 246, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)" },
          "100%": { textShadow: "0 0 20px rgba(6, 182, 212, 0.8), 0 0 30px rgba(6, 182, 212, 0.5)" },
        },
        "pulse-glow": {
          "0%": { boxShadow: "0 0 5px rgba(139, 92, 246, 0.2), inset 0 0 5px rgba(139, 92, 246, 0.1)" },
          "100%": { boxShadow: "0 0 20px rgba(6, 182, 212, 0.6), inset 0 0 10px rgba(6, 182, 212, 0.3)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};
