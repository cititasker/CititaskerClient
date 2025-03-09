import type { Metadata } from "next";
import "./globals.css";
import { dm_sans, lato, montserrat } from "@/fonts";
import AppProvider from "@/providers/AppProvider";

export const metadata: Metadata = {
  title: "CitiTasker",
  description:
    "CitiTasker is a trusted community platform that connects people who need to outsource tasks and find local services, with people who are looking to earn money",
  openGraph: {
    type: "website",
    siteName: "CitiTasker",
    images: "http://localhost:3000/icons/icon.png",
    url: "https://cititasker.vercel.app",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`relative ${montserrat.className} ${lato.variable} ${dm_sans.variable}`}
      >
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  );
}
