import { Lato, Montserrat, DM_Sans, Poppins, Manrope } from "next/font/google";

export const lato = Lato({
  weight: ["400", "700"],
  style: ["normal"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-lato",
});

export const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

export const dm_sans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm_sans",
});

export const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-poppins",
  weight: ["400", "700"],
});

export const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
});
