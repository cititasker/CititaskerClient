"use client";
import { useState } from "react";
import FAQAccordionItem from "../reusables/FAQAccordion/FAQAccordionItem";
import ContactCard from "../ContactCard";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQProps {
  accordionData: FAQItem[];
}

export default function FAQ({ accordionData }: FAQProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative bg-primary-50 ">
      <div className="container-w px-4 sm:px-6 lg:px-8 py-16 md:py-20">
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
              <ContactCard
                title="Still have questions?"
                description="We're here to help! Our support team is ready to provide the information you need and ensure your experience is smooth and hassle-free."
                buttonText="Get Support"
              />
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
