"use client";
import Image from "next/image";
import React from "react";
import FormButton from "@/components/forms/FormButton";
import CustomAccordion from "@/components/Accordion/CustomAccordion";

interface IProps {
  accordionData: { question: string; answer: string }[];
}

const Faq = ({ accordionData }: IProps) => {
  return (
    <div className="bg-sky-50 relative">
      <div id="faq" className="absolute w-full -top-[95px]" />
      <div className="container-w py-10 sm:pt-[5.625rem] sm:pb-[8.875rem] ">
        <div className="justify-between items-start gap-5 flex flex-col-reverse lg:flex-row">
          <div className="w-full lg:max-w-[419px]">
            <h2 className="text-slate-900 text-[40px] font-bold mb-10 hidden lg:block">
              Common Questions, Clear Answers
            </h2>
            <div className="lg:max-w-[402px] w-full relative bg-sky-200 rounded-[20px] py-7 px-10">
              <div className="justify-center items-start inline-flex relative h-[50px] w-full">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Image
                    key={i}
                    className="w-[48.30px] h-[48.30px] rounded-full border-white absolute"
                    style={{ left: `${40 * i}px` }}
                    src="/images/user.svg"
                    width={48}
                    height={48}
                    alt="user"
                  />
                ))}
              </div>
              <div className="mb-[32px]">
                <h3 className="text-slate-900 text-2xl font-semibold mb-2">
                  Still have any question?
                </h3>
                <div className="max-w-80 w-full text-justify text-slate-900 text-sm font-normal ">
                  We're here to help! If you have any more questions or need
                  further assistance, don’t hesitate to reach out. Our support
                  team is ready to provide the information you need and ensure
                  your experience with CitiTasker is smooth and hassle-free.
                  Feel free to contact us anytime!
                </div>
              </div>
              <FormButton
                text="Contact Us"
                className="!bg-white !text-dark-secondary !px-4 !py-3"
              />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-slate-900 text-[20px] sm:text-2xl font-bold mb-5 block lg:hidden text-center">
              Common Questions, Clear Answers
            </h2>
            <CustomAccordion data={accordionData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
