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
          "linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)",
        "gradient-secondary":
          "linear-gradient(135deg, var(--secondary) 0%, var(--accent-orange) 100%)",
        "gradient-accent":
          "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-pink) 100%)",
      },
      colors: {
        // Modern Primary Palette
        primary: {
          DEFAULT: "var(--primary)",
          50: "var(--primary-50)",
          100: "var(--primary-100)",
          200: "var(--primary-200)",
          300: "var(--primary-300)",
          400: "var(--primary-400)",
          500: "var(--primary-500)",
          600: "var(--primary-600)",
          700: "var(--primary-700)",
          800: "var(--primary-800)",
          900: "var(--primary-900)",
          foreground: "var(--primary-foreground)",
        },
        // Modern Secondary Palette
        secondary: {
          DEFAULT: "var(--secondary)",
          50: "var(--secondary-50)",
          100: "var(--secondary-100)",
          200: "var(--secondary-200)",
          300: "var(--secondary-300)",
          400: "var(--secondary-400)",
          500: "var(--secondary-500)",
          600: "var(--secondary-600)",
          700: "var(--secondary-700)",
          800: "var(--secondary-800)",
          900: "var(--secondary-900)",
          foreground: "var(--secondary-foreground)",
        },
        // Accent Colors
        accent: {
          DEFAULT: "var(--accent)",
          purple: "var(--accent-purple)",
          "purple-light": "var(--accent-purple-light)",
          pink: "var(--accent-pink)",
          "pink-light": "var(--accent-pink-light)",
          orange: "var(--accent-orange)",
          "orange-light": "var(--accent-orange-light)",
          foreground: "var(--accent-foreground)",
        },
        // Modern Neutral Palette
        neutral: {
          50: "var(--neutral-50)",
          100: "var(--neutral-100)",
          200: "var(--neutral-200)",
          300: "var(--neutral-300)",
          400: "var(--neutral-400)",
          500: "var(--neutral-500)",
          600: "var(--neutral-600)",
          700: "var(--neutral-700)",
          800: "var(--neutral-800)",
          900: "var(--neutral-900)",
        },
        // State Colors
        success: {
          DEFAULT: "var(--success)",
          light: "var(--success-light)",
        },
        warning: {
          DEFAULT: "var(--warning)",
          light: "var(--warning-light)",
        },
        error: {
          DEFAULT: "var(--error)",
          light: "var(--error-light)",
        },
        info: {
          DEFAULT: "var(--info)",
          light: "var(--info-light)",
        },
        // Semantic Colors
        text: {
          primary: "var(--text-primary)",
          secondary: "var(--text-secondary)",
          muted: "var(--text-muted)",
          disabled: "var(--text-disabled)",
        },
        border: {
          DEFAULT: "var(--border)",
          light: "var(--border-light)",
          medium: "var(--border-medium)",
          strong: "var(--border-strong)",
        },
        background: {
          DEFAULT: "var(--background)",
          secondary: "var(--background-secondary)",
          tertiary: "var(--background-tertiary)",
        },

        // Legacy Colors (for backward compatibility)
        "light-primary-1": "var(--light-primary-1)",
        "light-primary-2": "var(--light-primary-2)",
        black: "var(--black)",
        "black-2": "var(--black-2)",
        "light-grey": "var(--light-grey)",
        "dark-grey": "var(--dark-grey)",
        "dark-grey-1": "var(--dark-grey-1)",
        "dark-grey-2": "var(--dark-grey-2)",
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
        "table-stroke": "#F3F5F6",
        "red-state-color-fill": "var(--bg-red-state-color-fill)",

        // Shadcn/UI Colors
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
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        input: "var(--input)",
        ring: "var(--primary-200)",
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
        "glow-primary": "0 0 20px rgba(29, 78, 216, 0.3)",
        "glow-secondary": "0 0 20px rgba(22, 163, 74, 0.3)",
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
          "scrollbar-width": "none", // Firefox
          "&::-webkit-scrollbar": {
            display: "none", // Chrome, Safari
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
            // "linear-gradient(135deg, var(--primary) 0%, var(--accent-purple) 100%)",
            "linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-secondary": {
          background:
            "linear-gradient(135deg, var(--secondary) 0%, var(--accent-orange) 100%)",
          "background-clip": "text",
          "-webkit-background-clip": "text",
          "-webkit-text-fill-color": "transparent",
        },
        ".text-gradient-accent": {
          background:
            "linear-gradient(135deg, var(--accent-purple) 0%, var(--accent-pink) 100%)",
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
            "linear-gradient(135deg, var(--primary) 0%, var(--primary-600) 100%)",
          "box-shadow": "var(--shadow-md)",
          transition: "all 300ms ease",
          // transform: "translateY(0)",
          // "&:hover": {
          //   transform: "translateY(-1px) scale(1.02)",
          //   "box-shadow": "var(--shadow-lg)",
          // },
          // "&:active": {
          //   transform: "translateY(0) scale(0.98)",
          // },
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
            "linear-gradient(135deg, var(--secondary) 0%, var(--secondary-600) 100%)",
          "box-shadow": "var(--shadow-md)",
          transition: "all 300ms ease",
          // transform: "translateY(0)",
          // "&:hover": {
          //   transform: "translateY(-1px) scale(1.02)",
          //   "box-shadow": "var(--shadow-lg)",
          // },
          // "&:active": {
          //   transform: "translateY(0) scale(0.98)",
          // },
        },
        ".card-modern": {
          padding: "1.5rem",
          "border-radius": "1rem",
          background: "var(--background)",
          border: "1px solid var(--border-light)",
          "box-shadow": "var(--shadow-md)",
          transition: "all 300ms ease",
          "&:hover": {
            "border-color": "var(--border-medium)",
          },
        },
        // Mobile-first card component
        ".card-auth": {
          // Mobile (default)
          padding: "1rem",
          borderRadius: "0.75rem",

          // Small screens and up
          "@screen sm": {
            padding: "2rem",
            borderRadius: "1rem",
          },

          // Large screens and up
          "@screen lg": {
            padding: "2.5rem",
            borderRadius: "1.5rem",
          },
        },

        // Mobile form spacing
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

        // Mobile button heights
        ".btn-mobile": {
          height: "3rem", // 48px - good for mobile touch
          fontSize: "1rem",

          "@screen sm": {
            height: "3rem", // 48px
            fontSize: "1rem",
          },
        },
      };
      addUtilities(newUtilities);
      addBase({
        body: {
          "font-family": theme("fontFamily.articulat"),
          "background-color": "var(--background)",
          color: "var(--text-primary)",
        },
        "h1,h2,h3,h4,h5,h6": {
          // color: "var(--text-primary)",
          "font-family": theme("fontFamily.articulat"),
        },
      });
    },
    require("tailwindcss-animate"),
    require("@tailwindcss/typography"),
    // require("@tailwindcss/line-clamp"),
  ],
  // safelist: ["line-clamp-1", "line-clamp-2", "line-clamp-3"],
} satisfies Config;
