import PostTaskLayout from "@/components/layouts/PostTaskLayout";
import type { Metadata } from "next";

const APP_URL = process.env.NEXT_PUBLIC_DOMAIN_URL || "https://cititasker.com";

export const metadata: Metadata = {
  title: {
    default: "Post a Task",
    template: "%s | CitiTasker",
  },
  description:
    "Post a task on CitiTasker and connect with skilled taskers ready to help. Get quotes from qualified professionals in minutes. Quick, easy, and secure.",
  keywords: [
    "post task",
    "hire tasker",
    "find help",
    "task posting",
    "get quotes",
    "hire professionals",
    "Nigeria taskers",
    "local services",
  ],
  openGraph: {
    title: "Post a Task on CitiTasker",
    description:
      "Connect with skilled taskers ready to help. Post your task and receive quotes from qualified professionals in minutes.",
    url: `${APP_URL}/post-task`,
    type: "website",
    siteName: "CitiTasker",
    images: [
      {
        url: `${APP_URL}/images/seo/logo.png`,
        width: 1200,
        height: 630,
        alt: "Post a Task on CitiTasker",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Post a Task on CitiTasker",
    description:
      "Connect with skilled taskers. Post your task and get quotes in minutes.",
    images: [`${APP_URL}/images/seo/logo.png`],
  },
  alternates: {
    canonical: `${APP_URL}/post-task`,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <PostTaskLayout>{children}</PostTaskLayout>;
}
