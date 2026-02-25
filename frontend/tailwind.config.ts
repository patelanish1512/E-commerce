import type { Config } from "tailwindcss";

const config: Config = {
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
        card: "var(--card)",
        "card-foreground": "var(--card-foreground)",
        primary: "var(--primary)",
        "primary-foreground": "var(--primary-foreground)",
        secondary: "var(--secondary)",
        "secondary-foreground": "var(--secondary-foreground)",
        accent: "var(--accent)",
        "accent-foreground": "var(--accent-foreground)",
        success: "var(--success)",
        destructive: "var(--destructive)",
        border: "var(--border)",
        muted: "var(--muted)",
        "muted-foreground": "var(--muted-foreground)",
        luxury: {
          indigo: "#1E1B4B",
          purple: "#6D28D9",
          gold: "#D4AF37",
          emerald: "#059669",
          red: "#DC2626",
          dark: "#0F172A",
        }
      },
      backgroundImage: {
        'premium-gradient': 'linear-gradient(135deg, #1E1B4B, #6D28D9)',
      },
      boxShadow: {
        'soft': '0 4px 20px rgba(0, 0, 0, 0.05)',
        'hover-soft': '0 10px 40px rgba(30, 27, 75, 0.08)',
        'button-glow': '0 8px 16px rgba(109, 40, 217, 0.25)',
      },
      borderRadius: {
        'luxury': '20px',
        'luxury-lg': '24px',
        'button': '16px',
        'input': '14px',
      }
    },
  },
  plugins: [],
};
export default config;
