"use client";
import Faq from "@/components/Faq";
import Footer from "@/components/waitlist/Footer";
import TaskerBanner from "@/components/waitlist/TaskerBanner";
import WhyCitiTasker from "@/components/waitlist/why/WhyCitiTasker";
import Hero from "@/components/waitlist/Hero/Hero";
import Navbar from "@/components/waitlist/Navbar";
import dynamic from "next/dynamic";

const CountDownTimer = dynamic(
  () => import("@/components/waitlist/CountDownTimer"),
  { ssr: false }
);

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <WhyCitiTasker />
      <CountDownTimer />
      <Faq />
      <TaskerBanner />
      <Footer />
    </main>
  );
}
