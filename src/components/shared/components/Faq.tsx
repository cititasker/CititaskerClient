"use client";

import React from "react";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";
import SectionHeader from "@/components/reusables/SectionHeader";
import AccordionWithHTML from "@/components/Accordion/AccordionWithHTML";
import Image from "next/image";

interface FAQProps {
  accordionData: FAQItem[];
  variant?: "default" | "tasker";
  className?: string;
  contactButtonText?: string;
  contactButtonHref?: string;
  title?: string;
  showContactCard?: boolean;
}

// User Avatar Stack Component
const UserAvatarStack = ({ count = 5 }: { count?: number }) => (
  <div className="flex items-center justify-center relative h-[50px] w-full mb-8">
    {Array.from({ length: count }).map((_, index) => (
      <div
        key={index}
        className="w-12 h-12 rounded-full border-2 border-white shadow-sm absolute bg-neutral-200 overflow-hidden"
        style={{ left: `${32 * index}px`, zIndex: count - index }}
      >
        <Image
          src="/images/user.svg"
          alt={`User ${index + 1}`}
          width={48}
          height={48}
          className="w-full h-full object-cover"
        />
      </div>
    ))}
  </div>
);

// Contact Card Component
const ContactCard = ({
  buttonText = "Contact Us",
  buttonHref = "#contact",
}: {
  buttonText?: string;
  buttonHref?: string;
}) => (
  <div className="relative bg-gradient-to-br from-secondary-100 to-secondary-200 rounded-2xl p-6 lg:p-8 shadow-lg border border-secondary-300">
    <UserAvatarStack />

    <div className="space-y-6">
      <div>
        <h3 className="text-neutral-900 text-xl lg:text-2xl font-bold mb-3 leading-tight">
          Still have questions?
        </h3>
        <p className="text-neutral-800 text-sm lg:text-base leading-relaxed">
          We're here to help! Our support team is ready to provide the
          information you need and ensure your experience is smooth and
          hassle-free.
        </p>
      </div>

      <FormButton
        text={buttonText}
        href={buttonHref}
        className="btn-primary w-full sm:w-auto"
      />
    </div>
  </div>
);

// Main FAQ Component
const FAQ: React.FC<FAQProps> = ({
  accordionData,
  // variant = "default",
  className,
  contactButtonText = "Contact Us",
  contactButtonHref = "#contact",
  title = "Common Questions, Clear Answers",
  showContactCard = true,
}) => {
  return (
    <section className={cn("bg-secondary-50 relative", className)}>
      {/* Scroll anchor */}
      <div id="faq" className="absolute w-full -top-24" />

      <div className="container-w py-16 lg:py-24">
        <div
          className={cn(
            "grid gap-8 lg:gap-12 items-start",
            showContactCard
              ? "grid-cols-1 lg:grid-cols-12"
              : "grid-cols-1 max-w-4xl mx-auto"
          )}
        >
          {/* Contact Card - Left Column */}
          {showContactCard && (
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="lg:hidden mb-8">
                <SectionHeader title={title} className="text-center" />
              </div>

              <div className="hidden lg:block mb-8">
                <SectionHeader title={title} />
              </div>

              <ContactCard
                buttonText={contactButtonText}
                buttonHref={contactButtonHref}
              />
            </div>
          )}

          {/* FAQ Accordion - Right Column */}
          <div
            className={cn(
              showContactCard ? "lg:col-span-7 order-1 lg:order-2" : ""
            )}
          >
            {!showContactCard && (
              <div className="mb-12 text-center">
                <SectionHeader title={title} />
              </div>
            )}
            <AccordionWithHTML data={accordionData} variant="default" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
