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
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        "light-primary-1": "var(--light-primary-1)",
        "light-primary-2": "var(--light-primary-2)",
        black: "var(--black)",
        "black-2": "var(--black-2)",
        "light-grey": "var(--light-grey)",
        "dark-grey": "var(--dark-grey)",
        "dark-grey-1": "var(--dark-grey-1)",
        "dark-grey-2": "var(--dark-grey-2)",
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        "dark-secondary": "var(--dark-secondary)",
        "red-light-1": "var(--red-light-1)",
        "red-state-color": "var(--red-state-color)",
        "green-state-color": "var(--green-state-color)",
        "yellow-state-color": "var(--yellow-state-color)",
        "light-blue": "var(--light-blue)",
        "text-black": "var(--text-black)",
        lapis: "var(--Lapis-Blue-Primary-Light-2)",
        "cs-dark-4": "var(--Cultured-Secondary-Dark-4)",
        "cs-dark-5": "var(--Cultured-Secondary-Dark-5)",
        F9F9F9: "var(--F9F9F9)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        chart: {
          "1": "var(--chart-1)",
          "2": "var(--chart-2)",
          "3": "var(--chart-3)",
          "4": "var(--chart-4)",
          "5": "var(--chart-5)",
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
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
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
