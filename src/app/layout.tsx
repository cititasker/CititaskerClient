import type { Metadata } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
