"use client";
import Image from "next/image";
import ContentCopy from "@/assets/icons/content_copy.svg";
import CustomTab from "@/components/reusables/CustomTab";

const POSTER_BENEFITS = [
  {
    title: "Secured Payment",
    description:
      "Your payment is held securely in our escrow account until the task is completed to your satisfaction.",
  },
  {
    title: "Flexibility and Convenience",
    description:
      "Post tasks anytime, anywhere. Get help on your schedule with verified taskers ready to assist.",
  },
  {
    title: "24/7 Support",
    description:
      "Round-the-clock support to ensure your experience is seamless and stress-free.",
  },
  {
    title: "Verified Taskers",
    description:
      "Every tasker goes through thorough verification including background checks and skill validation.",
  },
];

const TASKER_BENEFITS = [
  {
    title: "Secured Payment",
    description:
      "With secure payments held in escrow, you'll always get paid on time after completing a task.",
  },
  {
    title: "Work Your Way",
    description:
      "Choose tasks that match your skills, set your rates, and work on your terms.",
  },
  {
    title: "Be in Charge",
    description:
      "Be your own boss! Decide when, where, and how you want to work.",
  },
  {
    title: "24/7 Support",
    description:
      "Our dedicated support team is available 24/7 to help with tasks, payments, and more.",
  },
  {
    title: "Fast Payout",
    description:
      "Get paid within 24 hours after completing a job. Your hard work is rewarded promptly.",
  },
];

// Benefits Content Component
const BenefitsContent = ({
  benefits,
  imageSrc,
  roleTitle,
  roleDescription,
}: {
  benefits: typeof POSTER_BENEFITS;
  imageSrc: string;
  roleTitle: string;
  roleDescription: string;
}) => (
  <div className="space-y-8">
    <div className="text-center">
      <p className="text-base text-neutral-700 sm:text-lg">
        <span className="font-semibold text-primary">{roleTitle}</span>{" "}
        {roleDescription}
      </p>
    </div>

    <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
      <div className="relative aspect-[1/1] overflow-hidden rounded-2xl">
        <Image
          src={imageSrc}
          alt="Illustration"
          fill
          className="object-cover"
        />
      </div>

      <div className="space-y-4">
        {benefits.map((benefit, index) => (
          <div
            key={index}
            className="group rounded-xl border border-neutral-200 bg-white p-5 transition-all hover:border-primary/50 hover:shadow-md"
          >
            <div className="flex gap-4">
              <div className="flex-shrink-0 hidden sm:inline-block">
                <ContentCopy />
              </div>
              <div>
                <h3 className="mb-2 font-semibold text-neutral-900">
                  {benefit.title}
                </h3>
                <p className="text-sm text-neutral-600">
                  {benefit.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default function WhyCitiTasker() {
  const tabs = [
    {
      label: "Join as a Poster",
      value: "poster",
      render: () => (
        <BenefitsContent
          benefits={POSTER_BENEFITS}
          imageSrc="/images/poster.svg"
          roleTitle="Who is a Poster?"
          roleDescription="A Poster is someone who needs assistance with a task and uses CitiTasker to connect with skilled Taskers."
        />
      ),
    },
    {
      label: "Join as a Tasker",
      value: "tasker",
      render: () => (
        <BenefitsContent
          benefits={TASKER_BENEFITS}
          imageSrc="/images/tasker.svg"
          roleTitle="Who is a Tasker?"
          roleDescription="A Tasker is a skilled service provider who completes tasks posted on CitiTasker efficiently."
        />
      ),
    },
  ];

  return (
    <section id="why-cititasker" className="relative bg-neutral-50">
      <div className="container-w px-4 sm:px-6 lg:px-8 md:py-20 lg:py-28">
        {/* Header */}
        <div className="mb-6 md:mb-10 text-center">
          <h2 className="mb-3 text-3xl font-bold sm:text-4xl lg:text-5xl">
            Why Join{" "}
            <span className="relative inline-block text-gradient-primary">
              CitiTasker?
            </span>
          </h2>
          <p className="mx-auto max-w-3xl text-neutral-700">
            The ultimate platform for connecting you with skilled Taskers who
            can help tackle your to-do list.
          </p>
        </div>

        {/* Content */}
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm">
          <CustomTab
            items={tabs}
            defaultValue="poster"
            queryKey="role"
            className="pb-0"
            listClassName="bg-neutral-50 px-4 pb-6 sm:px-8 rounded-none justify-center mb-0 gap-3"
            triggerClassName="data-[state=active]:bg-primary data-[state=active]:text-white py-3"
            contentClassName="p-6 sm:p-10"
          />
        </div>
      </div>
    </section>
  );
}
