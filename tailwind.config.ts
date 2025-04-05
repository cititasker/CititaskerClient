import type { Config } from "tailwindcss";

export default {
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
        primary: "#236F8E",
        "light-primary-1": "#edfafe",
        "light-primary-2": "#B8E9F9",
        black: "#161a32",
        "black-2": "#021637",
        "light-grey": "#F3F5F6",
        "dark-grey": "#7c8697",
        "dark-grey-1": "#CAD7DC",
        "dark-grey-2": "#7C8698",
        secondary: "#13B5EA",
        "dark-secondary": "#161A32",
        "red-light-1": "#FB9596",
        "red-state-color": "#EC514B",
        "green-state-color": "#29C483",
        "yellow-state-color": "#F2AF42",
        "light-blue": "#EEFAFE",
        "text-black": "#1B2149",
      },
      borderRadius: {
        "20": "20px",
        "30": "30px",
        "40": "40px",
      },
      lineHeight: {
        normal: "1.2",
      },
      fontFamily: {
        lato: "var(--font-lato)",
        montserrat: "var(--font-montserrat)",
        dm_sans: "var(--font-dm_sans)",
        poppins: "var(--font-poppins)",
      },
    },
  },
  plugins: [],
} satisfies Config;
