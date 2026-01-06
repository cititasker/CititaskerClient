"use client";
import { useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import WaitlistModal from "./WaitlistModal";

export default function TaskerBanner() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <section className="relative overflow-hidden bg-neutral-50">
        <div className="container-w px-4 sm:px-6 lg:px-8 md:pb-20">
          <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
            {/* Left - CTA Card */}
            <div className="lg:flex-[3] overflow-hidden rounded-2xl bg-[#3B6A7C] p-8 shadow-xl sm:rounded-3xl sm:p-10 lg:p-12">
              <div className="flex h-full flex-col justify-between">
                <div className="space-y-5">
                  <h2 className="text-2xl font-bold leading-tight text-white sm:text-3xl lg:text-4xl">
                    Become a Tasker for free
                  </h2>
                  <p className="text-base leading-relaxed text-white/90 sm:text-lg">
                    Turn your skills into income with CitiTasker! Join a trusted
                    community where you can choose tasks that match your
                    expertise, work on your terms, and earn up to ₦500,000 a
                    month. Signing up is easy, secure, and completely free.
                    Start earning today—your next opportunity is just a click
                    away!
                  </p>
                </div>

                <Button
                  onClick={() => setShowModal(true)}
                  size="lg"
                  className="mt-8 w-fit rounded-full bg-white px-8 text-[#3B6A7C] hover:bg-white/90"
                >
                  Join Waitlist
                </Button>
              </div>
            </div>

            {/* Right - Image Card */}
            <div className="relative h-[380px] lg:flex-[2] overflow-hidden rounded-2xl bg-[#3B6A7C] sm:h-[400px] sm:rounded-3xl">
              {/* Decorative circles */}
              <div className="absolute left-8 top-8 z-10 h-12 w-12 rounded-full bg-[#F2AF42] sm:h-14 sm:w-14 lg:h-16 lg:w-16" />
              <div className="absolute -bottom-6 -left-6 z-10 h-20 w-20 rounded-full bg-[#FB9596] sm:h-24 sm:w-24 lg:-bottom-8 lg:-left-8 lg:h-28 lg:w-28" />
              <div className="absolute left-[28%] top-1/2 z-10 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#C9F07D] sm:h-32 sm:w-32 lg:h-36 lg:w-36" />
              <div className="absolute -right-24 -top-20 z-10 h-64 w-64 rounded-full bg-[#236F8E] sm:-right-28 sm:-top-24 sm:h-72 sm:w-72 lg:-right-32 lg:-top-28 lg:h-80 lg:w-80" />

              {/* Image Container */}
              <div className="absolute inset-0 z-20">
                <Image
                  src="/images/tasker_lady.svg"
                  alt="Professional tasker ready to work"
                  fill
                  className="object-cover object-bottom"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      <WaitlistModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
