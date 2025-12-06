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
      screens: {
        xs: "470px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "gradient-primary":
          "linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--accent-purple)) 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, rgb(var(--secondary)) 0%, rgb(var(--accent-orange)) 100%)",
        "gradient-accent":
          "linear-gradient(135deg, rgb(var(--accent-purple)) 0%, rgb(var(--accent-pink)) 100%)",
      },
      colors: {
        // Modern Primary Palette with opacity support
        primary: {
          DEFAULT: "rgb(var(--primary) / <alpha-value>)",
          50: "rgb(var(--primary-50) / <alpha-value>)",
          100: "rgb(var(--primary-100) / <alpha-value>)",
          200: "rgb(var(--primary-200) / <alpha-value>)",
          300: "rgb(var(--primary-300) / <alpha-value>)",
          400: "rgb(var(--primary-400) / <alpha-value>)",
          500: "rgb(var(--primary-500) / <alpha-value>)",
          600: "rgb(var(--primary-600) / <alpha-value>)",
          700: "rgb(var(--primary-700) / <alpha-value>)",
          800: "rgb(var(--primary-800) / <alpha-value>)",
          900: "rgb(var(--primary-900) / <alpha-value>)",
          foreground: "rgb(var(--primary-foreground) / <alpha-value>)",
        },
        // Modern Secondary Palette with opacity support
        secondary: {
          DEFAULT: "rgb(var(--secondary) / <alpha-value>)",
          50: "rgb(var(--secondary-50) / <alpha-value>)",
          100: "rgb(var(--secondary-100) / <alpha-value>)",
          200: "rgb(var(--secondary-200) / <alpha-value>)",
          300: "rgb(var(--secondary-300) / <alpha-value>)",
          400: "rgb(var(--secondary-400) / <alpha-value>)",
          500: "rgb(var(--secondary-500) / <alpha-value>)",
          600: "rgb(var(--secondary-600) / <alpha-value>)",
          700: "rgb(var(--secondary-700) / <alpha-value>)",
          800: "rgb(var(--secondary-800) / <alpha-value>)",
          900: "rgb(var(--secondary-900) / <alpha-value>)",
          foreground: "rgb(var(--secondary-foreground) / <alpha-value>)",
        },
        // Accent Colors with opacity support
        accent: {
          DEFAULT: "hsl(var(--accent) / <alpha-value>)",
          purple: "rgb(var(--accent-purple) / <alpha-value>)",
          "purple-light": "rgb(var(--accent-purple-light) / <alpha-value>)",
          pink: "rgb(var(--accent-pink) / <alpha-value>)",
          "pink-light": "rgb(var(--accent-pink-light) / <alpha-value>)",
          orange: "rgb(var(--accent-orange) / <alpha-value>)",
          "orange-light": "rgb(var(--accent-orange-light) / <alpha-value>)",
          foreground: "hsl(var(--accent-foreground) / <alpha-value>)",
        },
        // Modern Neutral Palette with opacity support
        neutral: {
          50: "rgb(var(--neutral-50) / <alpha-value>)",
          100: "rgb(var(--neutral-100) / <alpha-value>)",
          200: "rgb(var(--neutral-200) / <alpha-value>)",
          300: "rgb(var(--neutral-300) / <alpha-value>)",
          400: "rgb(var(--neutral-400) / <alpha-value>)",
          500: "rgb(var(--neutral-500) / <alpha-value>)",
          600: "rgb(var(--neutral-600) / <alpha-value>)",
          700: "rgb(var(--neutral-700) / <alpha-value>)",
          800: "rgb(var(--neutral-800) / <alpha-value>)",
          900: "rgb(var(--neutral-900) / <alpha-value>)",
        },
        // State Colors with opacity support
        success: {
          DEFAULT: "rgb(var(--success) / <alpha-value>)",
          light: "rgb(var(--success-light) / <alpha-value>)",
        },
        warning: {
          DEFAULT: "rgb(var(--warning) / <alpha-value>)",
          light: "rgb(var(--warning-light) / <alpha-value>)",
        },
        error: {
          DEFAULT: "rgb(var(--error) / <alpha-value>)",
          light: "rgb(var(--error-light) / <alpha-value>)",
        },
        info: {
          DEFAULT: "rgb(var(--info) / <alpha-value>)",
          light: "rgb(var(--info-light) / <alpha-value>)",
        },
        // Semantic Colors with opacity support
        text: {
          primary: "rgb(var(--text-primary) / <alpha-value>)",
          secondary: "rgb(var(--text-secondary) / <alpha-value>)",
          muted: "rgb(var(--text-muted) / <alpha-value>)",
          disabled: "rgb(var(--text-disabled) / <alpha-value>)",
        },
        border: {
          DEFAULT: "hsl(var(--border) / <alpha-value>)",
          light: "rgb(var(--border-light) / <alpha-value>)",
          medium: "rgb(var(--border-medium) / <alpha-value>)",
          strong: "rgb(var(--border-strong) / <alpha-value>)",
        },
        background: {
          DEFAULT: "rgb(var(--background) / <alpha-value>)",
          secondary: "rgb(var(--background-secondary) / <alpha-value>)",
          tertiary: "rgb(var(--background-tertiary) / <alpha-value>)",
        },

        // Legacy Colors (for backward compatibility) with opacity support
        "light-primary-1": "rgb(var(--light-primary-1) / <alpha-value>)",
        "light-primary-2": "rgb(var(--light-primary-2) / <alpha-value>)",
        black: "rgb(var(--black) / <alpha-value>)",
        "black-2": "rgb(var(--black-2) / <alpha-value>)",
        "light-grey": "rgb(var(--light-grey) / <alpha-value>)",
        "dark-grey": "rgb(var(--dark-grey) / <alpha-value>)",
        "dark-grey-1": "rgb(var(--dark-grey-1) / <alpha-value>)",
        "dark-grey-2": "rgb(var(--dark-grey-2) / <alpha-value>)",
        "dark-secondary": "rgb(var(--dark-secondary) / <alpha-value>)",
        "red-light-1": "rgb(var(--red-light-1) / <alpha-value>)",
        "red-state-color": "rgb(var(--red-state-color) / <alpha-value>)",
        "green-state-color": "rgb(var(--green-state-color) / <alpha-value>)",
        "yellow-state-color": "rgb(var(--yellow-state-color) / <alpha-value>)",
        "light-blue": "rgb(var(--light-blue) / <alpha-value>)",
        lapis: "rgb(var(--Lapis-Blue-Primary-Light-2) / <alpha-value>)",
        "cs-dark-4": "rgb(var(--Cultured-Secondary-Dark-4) / <alpha-value>)",
        "cs-dark-5": "rgb(var(--Cultured-Secondary-Dark-5) / <alpha-value>)",
        F9F9F9: "rgb(var(--F9F9F9) / <alpha-value>)",
        "table-stroke": "#F3F5F6",
        "red-state-color-fill":
          "rgb(var(--bg-red-state-color-fill) / <alpha-value>)",
        "text-black": "rgb(var(--text-black) / <alpha-value>)",

        // Shadcn/UI Colors
        foreground: "hsl(var(--foreground) / <alpha-value>)",
        card: {
          DEFAULT: "hsl(var(--card) / <alpha-value>)",
          foreground: "hsl(var(--card-foreground) / <alpha-value>)",
        },
        popover: {
          DEFAULT: "hsl(var(--popover) / <alpha-value>)",
          foreground: "hsl(var(--popover-foreground) / <alpha-value>)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted) / <alpha-value>)",
          foreground: "hsl(var(--muted-foreground) / <alpha-value>)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
          foreground: "hsl(var(--destructive-foreground) / <alpha-value>)",
        },
        input: "hsl(var(--input) / <alpha-value>)",
        ring: "rgb(var(--ring) / <alpha-value>)",
        chart: {
          "1": "rgb(var(--chart-1) / <alpha-value>)",
          "2": "rgb(var(--chart-2) / <alpha-value>)",
          "3": "rgb(var(--chart-3) / <alpha-value>)",
          "4": "rgb(var(--chart-4) / <alpha-value>)",
          "5": "rgb(var(--chart-5) / <alpha-value>)",
        },
      },
      borderRadius: {
        "20": "20px",
        "30": "30px",
        "40": "40px",
        xl: "calc(var(--radius) + 6px)",
        lg: "calc(var(--radius) + 4px)",
        md: "calc(var(--radius) + 2px)",
        DEFAULT: "var(--radius)",
        sm: "calc(var(--radius) - 2px)",
        xs: "calc(var(--radius) - 6px)",
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
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        xl: "var(--shadow-xl)",
        "glow-primary": "0 0 20px rgba(35, 111, 142, 0.3)",
        "glow-secondary": "0 0 20px rgba(19, 181, 234, 0.3)",
        "glow-accent": "0 0 20px rgba(139, 92, 246, 0.3)",
      },
      backdropBlur: {
        glass: "10px",
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
        "fade-in": {
          "0%": {
            opacity: "0",
            transform: "translateY(10px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "fade-in-up": {
          "0%": {
            opacity: "0",
            transform: "translateY(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        "scale-in": {
          "0%": {
            opacity: "0",
            transform: "scale(0.9)",
          },
          "100%": {
            opacity: "1",
            transform: "scale(1)",
          },
        },
        "slide-in-left": {
          "0%": {
            opacity: "0",
            transform: "translateX(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "slide-in-right": {
          "0%": {
            opacity: "0",
            transform: "translateX(20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateX(0)",
          },
        },
        "pulse-glow": {
          "0%, 100%": {
            opacity: "1",
          },
          "50%": {
            opacity: "0.5",
          },
        },
        float: {
          "0%, 100%": {
            transform: "translateY(0px)",
          },
          "50%": {
            transform: "translateY(-10px)",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "fade-in": "fade-in 0.5s ease-out",
        "fade-in-up": "fade-in-up 0.6s ease-out",
        "scale-in": "scale-in 0.3s ease-out",
        "slide-in-left": "slide-in-left 0.5s ease-out",
        "slide-in-right": "slide-in-right 0.5s ease-out",
        "pulse-glow": "pulse-glow 2s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
      },
    },
  },
  plugins: [
    function ({ addBase, theme, addUtilities }: any) {
      const newUtilities = {
        ".no-scrollbar": {
          "scrollbar-width": "none",
          "&::-webkit-scrollbar": {
            display: "none",
          },
        },
        ".glass-effect": {
          background: "rgba(255, 255, 255, 0.1)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        },
        ".glass-dark": {
          background: "rgba(0, 0, 0, 0.1)",
          "backdrop-filter": "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.1)",
        },
        ".text-gradient-primary": {
          background:
            "linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--secondary)) 100%)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-secondary": {
          background:
            "linear-gradient(135deg, rgb(var(--secondary)) 0%, rgb(var(--accent-orange)) 100%)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-accent": {
          background:
            "linear-gradient(135deg, rgb(var(--accent-purple)) 0%, rgb(var(--accent-pink)) 100%)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".btn-animate-press": {
          transition: "all 300ms ease",
          transform: "translateY(0)",
          "&:hover": {
            transform: "translateY(-1px) scale(1.01)",
            boxShadow: "var(--shadow-lg)",
          },
          "&:active": {
            transform: "translateY(0) scale(0.98)",
          },
        },
        ".btn-primary": {
          display: "inline-flex",
          "align-items": "center",
          "justify-content": "center",
          padding: "0.75rem 1.5rem",
          "border-radius": "0.75rem",
          "font-weight": "600",
          "font-size": "0.875rem",
          "line-height": "1.25rem",
          color: "white",
          background:
            "linear-gradient(135deg, rgb(var(--primary)) 0%, rgb(var(--primary-600)) 100%)",
          "box-shadow": "var(--shadow-md)",
          transition: "all 300ms ease",
        },
        ".btn-secondary": {
          display: "inline-flex",
          "align-items": "center",
          "justify-content": "center",
          padding: "0.75rem 1.5rem",
          "border-radius": "0.75rem",
          "font-weight": "600",
          "font-size": "0.875rem",
          "line-height": "1.25rem",
          color: "white",
          background:
            "linear-gradient(135deg, rgb(var(--secondary)) 0%, rgb(var(--secondary-600)) 100%)",
          "box-shadow": "var(--shadow-md)",
          transition: "all 300ms ease",
        },
        ".card-modern": {
          padding: "1.5rem",
          "border-radius": "1rem",
          background: "rgb(var(--background))",
          border: "1px solid rgb(var(--border-light))",
          "box-shadow": "var(--shadow-md)",
          transition: "all 300ms ease",
          "&:hover": {
            "border-color": "rgb(var(--border-medium))",
          },
        },
        ".card-auth": {
          padding: "1rem",
          borderRadius: "0.75rem",
          "@screen sm": {
            padding: "2rem",
            borderRadius: "1rem",
          },
          "@screen lg": {
            padding: "2.5rem",
            borderRadius: "1.5rem",
          },
        },
        ".form-mobile": {
          "& > *": {
            marginBottom: "1rem",
          },
          "@screen sm": {
            "& > *": {
              marginBottom: "1.5rem",
            },
          },
        },
        ".btn-mobile": {
          height: "3rem",
          fontSize: "1rem",
          "@screen sm": {
            height: "3rem",
            fontSize: "1rem",
          },
        },
      };
      addUtilities(newUtilities);
      addBase({
        body: {
          "font-family": theme("fontFamily.articulat"),
          "background-color": "rgb(var(--background))",
          color: "rgb(var(--text-primary))",
        },
        "h1,h2,h3,h4,h5,h6": {
          "font-family": theme("fontFamily.articulat"),
        },
      });
    },
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
  ],
} satisfies Config;
