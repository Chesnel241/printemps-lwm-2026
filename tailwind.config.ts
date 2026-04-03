import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/frontend/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── LWM Brand Palette (from logo) ──
        night: '#0A1628',     // Très sombre bleu nuit
        ink: '#0F2545',       // Bleu encre profond
        ink2: '#153463',      // Bleu encre moyen
        muted: '#6B8EB5',     // Bleu sourd
        pale: '#94B8D8',      // Bleu pâle texte
        line: '#D6E4F0',      // Bordures
        bg: '#F5F9FC',        // Fond clair
        warm: '#EBF3FA',      // Fond chaud

        // ── Accent principal : Bleu LWM ──
        primary: { DEFAULT: '#1B5E8A', l: '#DBF0FF', b: '#7EC8E3' },

        // ── Accent secondaire : Bleu ciel ──
        sky: { DEFAULT: '#4DA8DA', l: '#E8F4FD', b: '#9DD7F0' },

        // ── Types d'annonces ──
        sage: { DEFAULT: '#2D7D5F', l: '#ECFDF5', b: '#A7F3D0' },
        red: { DEFAULT: '#991B1B', l: '#FEF2F2', b: '#FECACA' },
        blue: { DEFAULT: '#1B5E8A', l: '#DBF0FF', b: '#7EC8E3' },
        violet: { DEFAULT: '#5B21B6', l: '#F5F3FF' },

        // ── Gold conservé pour les accents d'urgence ──
        gold: { DEFAULT: '#B45309', l: '#FEF3C7', b: '#FDE68A' },
      },
      fontFamily: {
        sans: ['var(--font-nunito)', 'sans-serif'],
        display: ['var(--font-lora)', 'serif'],
      }
    },
  },
  plugins: [],
};
export default config;
