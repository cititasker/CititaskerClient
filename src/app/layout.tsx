import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import "./globals.css";
import Providers from "@/providers";
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
      <body className="relative">
        <SessionProvider>
          <AppProvider>
            <Providers>{children}</Providers>
          </AppProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
