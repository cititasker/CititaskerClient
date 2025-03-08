"use client";
import CountDownTimer from "@/components/waitlist/CountDownTimer";
import Faq from "@/components/Faq";
import Footer from "@/components/waitlist/Footer";
import TaskerBanner from "@/components/waitlist/TaskerBanner";
import WhyCitiTasker from "@/components/waitlist/why/WhyCitiTasker";
import Hero from "@/components/waitlist/Hero/Hero";
import Navbar from "@/components/waitlist/Navbar";

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
