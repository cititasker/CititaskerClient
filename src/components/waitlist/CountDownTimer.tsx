"use client";
import { useEffect, useState } from "react";
import SectionHeader from "../reusables/SectionHeader";

interface TimeLeft {
  days: string;
  hours: string;
  minutes: string;
  seconds: string;
}

const TARGET_DATE = new Date("2026-02-01").getTime();

const formatNumber = (num: number) => (num < 10 ? `0${num}` : `${num}`);

const calculateTimeLeft = (targetTime: number): TimeLeft => {
  const diff = targetTime - Date.now();

  if (diff <= 0) {
    return { days: "00", hours: "00", minutes: "00", seconds: "00" };
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  return {
    days: formatNumber(days),
    hours: formatNumber(hours),
    minutes: formatNumber(minutes),
    seconds: formatNumber(seconds),
  };
};

const TimeUnit = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-neutral-900 p-4 shadow-xl sm:rounded-3xl sm:p-6 lg:p-8">
    <div className="mb-2 text-3xl font-bold text-white sm:text-5xl lg:text-6xl">
      {value}
    </div>
    <div className="text-xs font-medium text-neutral-400 sm:text-sm lg:text-base">
      {label}
    </div>
  </div>
);

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>(
    calculateTimeLeft(TARGET_DATE),
  );
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft(TARGET_DATE));
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  if (!mounted) {
    return (
      <section className="bg-gradient-to-br from-primary via-primary-600 to-primary-700 py-16">
        <div className="mx-auto max-w-5xl px-4 sm:px-6">
          <SectionHeader
            title="Launch Countdown"
            titleClassName="text-white"
            subtitleClassName="text-white"
            className="mb-6 sm:mb-10 md:mb-10"
          />
          <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
            {["00", "00", "00", "00"].map((_, i) => (
              <div
                key={i}
                className="flex flex-1 flex-col items-center justify-center rounded-2xl bg-neutral-900 p-4 sm:rounded-3xl sm:p-6 lg:p-8"
              >
                <div className="mb-2 h-8 w-16 animate-pulse rounded bg-neutral-700 sm:h-10 sm:w-20 lg:h-12 lg:w-24" />
                <div className="h-3 w-12 animate-pulse rounded bg-neutral-700 sm:h-4 sm:w-16" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary-600 to-primary-700 py-16">
      {/* Background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-20 top-1/2 h-64 w-64 rounded-full bg-white/5 blur-3xl" />
        <div className="absolute -right-20 top-1/3 h-96 w-96 rounded-full bg-white/5 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-5xl px-4 sm:px-6">
        <SectionHeader
          title="Launch Countdown"
          subtitle="We're almost there! Get ready to transform how you get things done."
          titleClassName="text-white"
          subtitleClassName="text-white"
          className="mb-6 sm:mb-10 md:mb-10"
        />

        <div className="grid grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
          <TimeUnit value={timeLeft.days} label="Days" />
          <TimeUnit value={timeLeft.hours} label="Hours" />
          <TimeUnit value={timeLeft.minutes} label="Minutes" />
          <TimeUnit value={timeLeft.seconds} label="Seconds" />
        </div>
      </div>
    </section>
  );
}
