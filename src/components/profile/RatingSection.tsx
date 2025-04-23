"use client";
import React, { useState } from "react";
import CustomModal from "@/components/reusables/CustomModal";
import theme from "@/providers/theme";
import RatingCard from "../reusables/RatingCard";
import Icons from "../Icons";
import Image from "next/image";
import FormButton from "../forms/FormButton";

const mockReviews = [
  {
    image: "/images/Certificate.svg",
    name: "Juliet Samuel",
    profession: "Frontend Developer",
    timeAgo: "1 day ago",
    review:
      "This platform has helped me grow tremendously as a frontend developer. Clean UI, great community — I highly recommend it!",
  },
  {
    image: "/images/Certificate.svg",
    name: "Daniel Eze",
    profession: "UI/UX Designer",
    timeAgo: "2 days ago",
    review:
      "Working with the team here was seamless. Their attention to detail and professionalism stood out throughout our project.",
  },
  {
    image: "/images/Certificate.svg",
    name: "Amaka Johnson",
    profession: "Product Manager",
    timeAgo: "3 days ago",
    review:
      "I love how intuitive and easy to navigate the dashboard is. It really made tracking project progress simple.",
  },
  {
    image: "/images/Certificate.svg",
    name: "Kelechi Nwosu",
    profession: "Backend Engineer",
    timeAgo: "5 days ago",
    review:
      "Their integration process was super smooth. The documentation was clear, and the support team was very helpful.",
  },
  {
    image: "/images/Certificate.svg",
    name: "Fatima Musa",
    profession: "Digital Marketer",
    timeAgo: "6 days ago",
    review:
      "This is one of the most engaging platforms I’ve used recently. Everything just works and it’s aesthetically pleasing.",
  },
  {
    image: "/images/Certificate.svg",
    name: "Tunde Adigun",
    profession: "QA Analyst",
    timeAgo: "1 week ago",
    review:
      "Testing features was a breeze. I love how thorough and robust the platform's performance is even under load.",
  },
  {
    image: "/images/Certificate.svg",
    name: "Sarah Okonkwo",
    profession: "Content Creator",
    timeAgo: "1 week ago",
    review:
      "As someone who creates tutorials, I appreciate how clean and accessible the UI is — makes screen recording so much easier!",
  },
  {
    image: "/images/Certificate.svg",
    name: "Chidera Obi",
    profession: "DevOps Engineer",
    timeAgo: "2 weeks ago",
    review:
      "Deployment was fast, and the environment setup took just minutes. I’d recommend this for any modern DevOps team.",
  },
];

const profileSummary = {
  image: "/images/Certificate.svg",
  name: "Juliet Samuel",
  address: "Ikeja, Lagos",
  rating: 4.8,
  totalReviews: mockReviews.length,
};

const RatingSection = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">Reviews</h2>
        <FormButton
          text="See all reviews"
          handleClick={handleOpen}
          btnStyle="mt-5 max-w-[144px] w-full !bg-[#D0F0FB] !text-primary"
        />
      </div>

      {/* Scrollable Cards */}
      <div className="flex overflow-x-auto gap-4 scrollbar-hide py-2">
        {mockReviews.map((review, idx) => (
          <div key={idx} className="flex-shrink-0 w-[290px]">
            <RatingCard {...review} />
          </div>
        ))}
      </div>

      {/* Modal */}
      <CustomModal
        isOpen={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        paperStyle={{
          maxWidth: "750px",
          p: "20px",
          [theme.breakpoints.up("sm")]: {
            px: "34px",
            py: "24px",
            borderRadius: "40px",
          },
        }}
      >
        <div>
          <h3 className="text-xl font-semibold text-center pb-6">All Reviews</h3>

          <div className="flex flex-col md:flex-row gap-6 items-start">
            {/* Left Profile Summary Box */}
            <div className="w-full md:max-w-[350px] flex-shrink-0 bg-primary p-6 rounded-2xl space-y-4">
              <div className="flex items-center gap-4">
                <Image
                  src={profileSummary.image}
                  alt={profileSummary.name}
                  width={60}
                  height={60}
                  className="rounded-full object-cover"
                />
                <div className="text-left">
                  <p className="text-base font-bold text-white">
                    {profileSummary.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    {profileSummary.address}
                  </p>
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold text-white">
                    Overall review rating
                  </h2>
                  <div className="flex items-center">
                    <Icons.star
                      variant="Bold"
                      className="text-yellow-400 w-4 h-4"
                    />
                    <p className="ml-2 text-lg font-bold text-white">
                      {profileSummary.rating}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-white">
                  {profileSummary.totalReviews} Reviews
                </p>
              </div>
            </div>

            {/* Right Review List */}
            <div className="flex-1 max-h-[400px] overflow-y-auto space-y-6 bg-white rounded-2xl">
              <div className="grid grid-cols-1 gap-4">
                {mockReviews.map((review, idx) => (
                  <RatingCard key={idx} {...review} />
                ))}
              </div>
            </div>
          </div>

          
        </div>
      </CustomModal>
    </div>
  );
};

export default RatingSection;

