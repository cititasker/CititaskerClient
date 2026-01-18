import React, { useState } from "react";
import Image from "next/image";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";

type Faq = {
  question: string;
  answer: string;
};

const FAQ = () => {
  const [faqs, setFaqs] = useState<Faq[]>([]);
  const [tempFaqs, setTempFaqs] = useState<Faq[]>([]);
  const [showForm, setShowForm] = useState(false);

  const handleAddTempFaq = () => {
    setTempFaqs([...tempFaqs, { question: "", answer: "" }]);
  };

  const handleFaqChange = (
    index: number,
    field: "question" | "answer",
    value: string
  ) => {
    const updated = [...tempFaqs];
    updated[index][field] = value;
    setTempFaqs(updated);
  };

  const handleSaveFaqs = () => {
    const filteredFaqs = tempFaqs.filter(
      (faq) => faq.question.trim() && faq.answer.trim()
    );
    setFaqs([...faqs, ...filteredFaqs]);
    setTempFaqs([]);
    setShowForm(false);
  };

  const handleCancel = () => {
    setTempFaqs([]);
    setShowForm(false);
  };

  return (
    <div className="mx-auto max-w-[776px] mb-10">
      {/* Empty State */}
      {faqs.length === 0 && tempFaqs.length === 0 && !showForm && (
        <div className="text-center space-y-4 flex flex-col justify-center items-center">
          <Image src="/images/faq-image.svg" alt="" width={174} height={233} />
          <p className="text-[24px] text-lapis font-semibold">
            No FAQ added yet..
          </p>
          <FormButton
            handleClick={() => {
              setShowForm(true);
              setTempFaqs([{ question: "", answer: "" }]);
            }}
            className="w-[380px]"
          >
            Create FAQ
          </FormButton>
        </div>
      )}

      {/* Add Form */}
      {showForm && (
        <div className="space-y-4 mb-8">
          {tempFaqs.map((faq, index) => (
            <div key={index} className="space-y-4 border-b pb-4">
              <div>
                <label className="font-semibold block mb-1">FAQ</label>
                <input
                  type="text"
                  value={faq.question}
                  onChange={(e) =>
                    handleFaqChange(index, "question", e.target.value)
                  }
                  className="w-full p-3 border rounded-md"
                  placeholder="Who’s going to buy the materials for the task?"
                />
              </div>

              <div>
                <label className="font-semibold block mb-1">Answer</label>
                <textarea
                  value={faq.answer}
                  onChange={(e) =>
                    handleFaqChange(index, "answer", e.target.value)
                  }
                  className="w-full p-3 border rounded-md"
                  placeholder="Enter answer"
                  rows={4}
                />
              </div>
            </div>
          ))}

          <button
            onClick={handleAddTempFaq}
            className="text-sm text-primary flex items-center font-semibold"
          >
            <Icons.plus className="mr-1" />
            Add FAQ
          </button>

          <div className="flex justify-center gap-3">
            <FormButton
              handleClick={handleCancel}
              text="Cancel"
              className="mt-5 max-w-[318px] w-full !bg-[#f3f5f6] !text-primary"
            />
            <FormButton
              handleClick={handleSaveFaqs}
              text="Save"
              className="mt-5 max-w-[318px] w-full"
              disabled={
                tempFaqs.length === 0 ||
                tempFaqs.some((faq) => !faq.question || !faq.answer)
              }
            />
          </div>
        </div>
      )}

      {/* FAQ List */}
      {faqs.length > 0 && !showForm && (
        <div className="space-y-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold">FAQs</h2>
            <button
              onClick={() => {
                setShowForm(true);
                setTempFaqs([{ question: "", answer: "" }]); // Start with one empty FAQ
              }}
              className="text-sm text-primary flex items-center font-semibold px-10"
            >
              <Icons.plus className="mr-1" />
              Add FAQ
            </button>
          </div>
          <div className="max-w-[740px]">
            {/* <CustomAccordion data={accordionData} /> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default FAQ;
