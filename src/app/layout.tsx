import type { Metadata, Viewport } from "next";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "./globals.css";
import AppProviders from "@/providers/AppProviders";
import { JsonLd } from "@/components/seo/JsonLd";

const APP_NAME = "CitiTasker";
const APP_DESCRIPTION =
  "CitiTasker is a trusted community platform that connects people who need to outsource tasks and find local services, with people who are looking to earn money";
const APP_URL =
  process.env.NEXT_PUBLIC_DOMAIN_URL || "https://www.cititasker.com";

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: "CitiTasker - Your Trusted Task Marketplace",
    template: "%s | CitiTasker", // Pages will use: "Page Title | CitiTasker"
  },
  description: APP_DESCRIPTION,
  applicationName: APP_NAME,
  authors: [{ name: "CitiTasker Team" }],
  generator: "Next.js",
  keywords: [
    "task marketplace",
    "freelance",
    "gig economy",
    "taskers",
    "hire help",
    "Nigeria",
    "side hustle",
    "earn money",
    "local services",
  ],
  referrer: "origin-when-cross-origin",
  creator: "CitiTasker",
  publisher: "CitiTasker",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_NG",
    url: APP_URL,
    title: "CitiTasker - Your Trusted Task Marketplace",
    description: APP_DESCRIPTION,
    siteName: APP_NAME,
    images: [
      {
        url: `${APP_URL}/images/seo/logo.png`,
        width: 1200,
        height: 630,
        alt: "CitiTasker - Task Marketplace Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CitiTasker - Your Trusted Task Marketplace",
    description: APP_DESCRIPTION,
    creator: "@cititasker",
    site: "@cititasker",
    images: [`${APP_URL}/images/seo/logo.png`],
  },
  // verification: {
  //   google: "your-google-verification-code",
  //   yandex: "your-yandex-verification-code",
  // },
  alternates: {
    canonical: APP_URL,
  },
  category: "marketplace",
  icons: {
    icon: {
      url: "/favicon.png",
    },
    apple: {
      url: "/favicon.png",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "CitiTasker",
    description: "Nigeria's leading task marketplace platform",
    url: APP_URL,
    logo: `${APP_URL}/images/seo/logo.png`,
    contactPoint: {
      "@type": "ContactPoint",
      // telephone: "+234-XXX-XXXX",
      contactType: "Customer Service",
      email: process.env.NEXT_PUBLIC_SUPPORT_URL,
      areaServed: "NG",
      availableLanguage: ["en"],
    },
  };
  return (
    <html lang="en">
      <head>
        <JsonLd data={organizationSchema} />
      </head>

      <body className="relative">
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
