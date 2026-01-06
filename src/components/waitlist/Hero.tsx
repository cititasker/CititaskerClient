"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import WaitlistModal from "./WaitlistModal";
import Chef from "@/assets/images/chef.png";

export default function Hero() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section
        id="home"
        className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 pt-32 sm:pt-40"
      >
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -left-10 top-1/3 h-72 w-72 rounded-full bg-primary/10 blur-3xl" />
          <div className="absolute -right-10 bottom-1/4 h-96 w-96 rounded-full bg-secondary/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="relative z-10 text-center lg:text-left">
              <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                Coming Soon
              </div>

              <h1 className="mb-6 text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
                Get to-dos{" "}
                <span className="relative inline-block">
                  <span className="relative z-10">Done,</span>
                  <svg
                    className="absolute -bottom-2 left-0 w-full text-primary"
                    viewBox="0 0 200 12"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2 9c50-4 100-4 196 0"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>{" "}
                Anytime, Anywhere
              </h1>

              <p className="mb-8 text-lg text-neutral-300 sm:text-xl">
                Post it. Match it. Done.
              </p>

              <Button
                onClick={() => setShowModal(true)}
                size="lg"
                className="rounded-full px-8"
              >
                Join Waitlist
              </Button>

              {/* Decorative ribbon */}
              <div className="absolute -right-8 top-1/2 hidden lg:block">
                <div className="h-20 w-20 rotate-12 rounded-full bg-secondary/20 blur-xl" />
              </div>
            </div>

            {/* Right Content - Image */}
            <div className="relative">
              <div className="relative mx-auto aspect-[3/4] max-w-md overflow-hidden rounded-3xl">
                <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent" />
                <Image
                  src={Chef}
                  alt="Professional tasker"
                  fill
                  className="object-cover"
                  priority
                />
              </div>

              {/* Floating Stats Card */}
              <div className="absolute -bottom-6 -right-6 rounded-2xl bg-white p-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map((i) => (
                      <div
                        key={i}
                        className="h-8 w-8 rounded-full border-2 border-white bg-neutral-200"
                      />
                    ))}
                  </div>
                  <div>
                    <p className="text-xs text-neutral-600">Active Taskers</p>
                    <p className="text-sm font-bold">2,500+</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Decorative Circle */}
        <div className="absolute -bottom-16 -left-16 h-32 w-32 rounded-full bg-secondary/30 blur-2xl" />
      </section>

      <WaitlistModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
