import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "selection-bg": "#7f7d75", // Cor de fundo da seleção
        "selection-text": "#ffffff", // Cor do texto da seleção
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        nunito: ["var(--font-nunito)", "sans-serif"],
        "dm-serif-display": ["var(--font-dm-serif-display)", "serif"],
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: (utilities: any, options?: any) => void;
      theme: (path: string) => any;
    }) {
      addUtilities({
        "::selection": {
          backgroundColor: theme("colors.selection-bg"),
          color: theme("colors.selection-text"),
        },
      });
    },
  ],
} satisfies Config;
