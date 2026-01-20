"use client";
import dynamic from "next/dynamic";
import Navbar from "@/components/waitlist/Navbar";
import Hero from "@/components/waitlist/Hero";
import WhyCitiTasker from "@/components/waitlist/why/WhyCitiTasker";
import Footer from "@/components/waitlist/Footer";
import TaskerBanner from "@/components/waitlist/TaskerBanner";
import { accordionDataWithHTML } from "data";
import { WelcomeModal } from "@/components/waitlist/WelcomeModal";
import FAQ from "@/components/shared/FAQ";

const CountDownTimer = dynamic(
  () => import("@/components/waitlist/CountDownTimer"),
  {
    ssr: false,
  },
);

export default function WaitlistPage() {
  return (
    <main className="relative">
      <Navbar />
      <Hero />
      <WhyCitiTasker />
      <CountDownTimer />
      <FAQ accordionData={accordionDataWithHTML} />
      <TaskerBanner />
      <Footer />
      <WelcomeModal />
    </main>
  );
}
