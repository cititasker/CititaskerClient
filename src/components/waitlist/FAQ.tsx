"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Image from "next/image";
import FormButton from "../forms/FormButton";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  accordionData: FAQItem[];
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

const ContactCard = () => (
  <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-secondary-100 to-secondary-200 p-6 lg:p-8 shadow-lg border border-secondary-300">
    {/* User Avatars Stack */}
    <UserAvatarStack />

    <div className="space-y-6">
      <div>
        <h3 className="mb-3 text-2xl font-bold text-neutral-900 lg:text-3xl">
          Still have questions?
        </h3>
        <p className="text-base leading-relaxed text-neutral-700 lg:text-lg">
          We're here to help! Our support team is ready to provide the
          information you need and ensure your experience is smooth and
          hassle-free.
        </p>
      </div>
      <FormButton
        text="Contact Us"
        href="#contact"
        className="btn-primary w-full sm:w-auto"
      />
    </div>
  </div>
);

const FAQAccordionItem = ({
  item,
  isOpen,
  onToggle,
}: {
  item: FAQItem;
  isOpen: boolean;
  onToggle: () => void;
}) => (
  <div
    className={`overflow-hidden rounded-2xl border-2 transition-all duration-300 ${
      isOpen
        ? "border-primary bg-white shadow-lg"
        : "border-neutral-200 bg-white hover:border-neutral-300"
    }`}
  >
    <button
      onClick={onToggle}
      className="flex w-full items-center justify-between p-5 text-left sm:p-6"
    >
      <span
        className={`pr-4 text-base font-semibold transition-colors sm:text-lg ${
          isOpen ? "text-primary" : "text-neutral-900"
        }`}
      >
        {item.question}
      </span>
      <ChevronDown
        className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180 text-primary" : "text-neutral-500"
        }`}
      />
    </button>

    <div
      className={`grid transition-all duration-300 ${
        isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
      }`}
    >
      <div className="overflow-hidden">
        <div className="px-5 pb-5 sm:px-6 sm:pb-6">
          <div
            className="prose prose-sm max-w-none text-neutral-600 sm:prose-base"
            dangerouslySetInnerHTML={{ __html: item.answer }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default function FAQ({ accordionData }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-neutral-50 ">
      <div className="container-w px-4 sm:px-6 lg:px-8 md:py-20 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left - Contact Card */}
          <div className="lg:col-span-5">
            <div className="mb-8 lg:mb-12">
              <h2 className="mb-4 text-3xl font-bold sm:text-4xl lg:text-5xl">
                Common Questions,{" "}
                <span className="text-primary">Clear Answers</span>
              </h2>
            </div>
            <div className="lg:sticky lg:top-24">
              <ContactCard />
            </div>
          </div>

          {/* Right - FAQ Accordion */}
          <div className="space-y-4 lg:col-span-7">
            {accordionData.map((item, index) => (
              <FAQAccordionItem
                key={index}
                item={item}
                isOpen={openIndex === index}
                onToggle={() =>
                  setOpenIndex(openIndex === index ? null : index)
                }
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
