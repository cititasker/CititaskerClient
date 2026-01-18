// app/layout.tsx
import type { Metadata } from "next";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import { auth } from "@/auth";

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
  const session = await auth();

  return (
    <html lang="en">
      <body className="relative">
        <AppProviders session={session}>{children}</AppProviders>
      </body>
    </html>
  );
}
