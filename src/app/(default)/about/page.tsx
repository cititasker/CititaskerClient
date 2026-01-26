import AboutHero from "@/components/about/AboutHero";
import AboutIntro from "@/components/about/AboutIntro";
import AboutValues from "@/components/about/AboutValues";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about CitiTasker's mission to connect people with skilled taskers across Nigeria.",
  openGraph: {
    title: "About CitiTasker",
    description: "Learn about our mission and values",
    url: "/about",
    // images: ["/logo.jpg"],
  },
  twitter: {
    title: "About CitiTasker",
    description: "Learn about our mission and values",
  },
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div>
      <AboutHero />
      <AboutIntro />
      <AboutValues />
    </div>
  );
}
