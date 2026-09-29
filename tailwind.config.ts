import type { Config } from "tailwindcss";

// Design tokens transcribed directly from Section 10 (Design System) of the proposal.
// Shared palette + one accent per farm. Do not add new base colors without a design-system
// sign-off (Section 21 RACI: Design system & brand direction).
const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // Shared palette (Section 10)
        deepGreen: "#3F5B3A",
        roastedGold: "#B08945",
        ink: "#2B2118",
        cream: "#F6F1E7",
        paper: "#FFFFFF",
        line: "#D9CFC0",
        // Per-farm accents (Section 10) — keyed to match content/farms.json `slug`
        farm: {
          "gibe-gesha-farm": "#B08945",
          "bale-mountain-coffee": "#3F5B3A",
          "gibe-agro-processing": "#5A6B73",
          "debka-farm": "#B56102",
          "gellana-farm": "#6E7A3D",
          "adami-tullu": "#C09A2E",
          // Gellana Gisham / Gibe Gesha Farm listed as a 7th asset in the Exec Summary
          // (2.1 says Seven; brand-by-brand concept in Section 7 details six + Gibe Agro).
          // Confirm the 7th farm's accent during Phase 1 discovery (see README "Open questions").
        },
      },
      fontFamily: {
        // Headline: warm serif, editorial/farm-journal feel (Section 10.1)
        serif: ["Georgia", "Cambria", "Times New Roman", "serif"],
        // Body/UI: clean sans-serif (Section 10.1)
        sans: ["Inter", "Arial", "Helvetica", "sans-serif"],
      },
      maxWidth: {
        prose: "80ch",
      },
    },
  },
  plugins: [],
};

export default config;
