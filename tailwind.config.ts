import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        "light-primary-1": "hsl(var(--light-primary-1))",
        "light-primary-2": "hsl(var(--light-primary-2))",
        black: "hsl(var(--black))",
        "black-2": "hsl(var(--black-2))",
        "light-grey": "hsl(var(--light-grey))",
        "dark-grey": "hsl(var(--dark-grey))",
        "dark-grey-1": "hsl(var(--dark-grey-1))",
        "dark-grey-2": "hsl(var(--dark-grey-2))",
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        "dark-secondary": "hsl(var(--dark-secondary))",
        "red-light-1": "hsl(var(--red-light-1))",
        "red-state-color": "hsl(var(--red-state-color))",
        "green-state-color": "hsl(var(--green-state-color))",
        "yellow-state-color": "hsl(var(--yellow-state-color))",
        "light-blue": "hsl(var(--light-blue))",
        "text-black": "hsl(var(--text-black))",
        lapis: "hsl(var(--Lapis-Blue-Primary-Light-2))",
        "cs-dark-4": "hsl(var(--Cultured-Secondary-Dark-4))",
        "cs-dark-5": "hsl(var(--Cultured-Secondary-Dark-5))",
        F9F9F9: "hsl(var(--F9F9F9))",

        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",

        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        "20": "20px",
        "30": "30px",
        "40": "40px",
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      lineHeight: {
        normal: "1.2",
      },
      fontFamily: {
        lato: "var(--font-lato)",
        montserrat: "var(--font-montserrat)",
        dm_sans: "var(--font-dm_sans)",
        poppins: "var(--font-poppins)",
        articulat: ["Articulat", "sans-serif"],
      },
    },
  },
  plugins: [
    function ({ addBase, theme, addUtilities }: any) {
      const newUtilities = {
        ".no-scrollbar": {
          "scrollbar-width": "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
          },
        },
      };
      addUtilities(newUtilities);
      addBase({
        body: { "font-family": theme("fontFamily.articulat") },
        "h1,h2,h3,h4,h5,h6": {
          // color: theme("colors.black"),
          "font-family": theme("fontFamily.articulat"),
        },
      });
    },
    require("tailwindcss-animate"),
  ],
} satisfies Config;
