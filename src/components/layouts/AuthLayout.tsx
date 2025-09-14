"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import AuthBg1 from "../../../public/images/hiw-1.svg?url";
import AuthBg2 from "../../../public/images/hiw-2.svg?url";
import AuthBg3 from "../../../public/images/hiw-3.svg?url";
import { cn } from "@/utils";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/constant";

interface AuthLayoutProps {
  children: React.ReactNode;
  extraClass?: string;
}

const testimonials = [
  {
    img: AuthBg1,
    text: "CitiTasker insurance covers Taskers liability to third parties for personal injury or property damage while performing most task activities – so you can work with peace of mind.",
  },
  {
    img: AuthBg2,
    text: "Pay easily, with peace of mind. We hold payments secure in CitiTasker pay escrow account until the task is completed and you're 100% satisfied.",
  },
  {
    img: AuthBg3,
    text: "Create your account on our website in minutes and jumpstart your reputation by setting up your profile and verifying your information.",
  },
];

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, extraClass }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const pathname = usePathname();

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={cn(
        "bg-background lg:bg-primary-50",
        pathname === ROUTES.CREATE_ACCOUNT && "bg-primary-50"
      )}
    >
      <div className="min-h-screen relative">
        <div className="flex">
          {/* Left Side - Testimonials */}
          <div className="relative flex-1 w-full h-screen hidden md:block overflow-hidden">
            {testimonials.map((item, index) => (
              <Image
                key={index}
                src={item.img}
                alt=""
                className={`scale-105 h-full w-full object-cover absolute inset-0 transition-opacity duration-700 ${
                  activeIndex === index ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}

            {/* Testimonial Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-900/60 to-transparent" />
            <div className="absolute bottom-8 left-8 right-8">
              <div className="glass-dark rounded-2xl p-6 backdrop-blur-lg">
                <div className="mb-6 overflow-hidden w-full">
                  <div
                    className="flex transition-transform duration-700 ease-in-out"
                    style={{
                      transform: `translateX(-${activeIndex * 100}%)`,
                    }}
                  >
                    {testimonials.map((item, index) => (
                      <p
                        key={index}
                        className="text-white text-base leading-relaxed min-w-full"
                      >
                        {item.text}
                      </p>
                    ))}
                  </div>
                </div>

                {/* Indicators */}
                <div className="flex gap-2">
                  {testimonials.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`w-3 h-3 rounded-full transition-colors duration-300 ${
                        activeIndex === index ? "bg-primary-400" : "bg-white/50"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Form */}
          <div
            className={cn(
              "min-h-screen px-7 flex-1 bg-background md:bg-primary-50",
              extraClass
            )}
          >
            <Link
              href={ROUTES.HOME}
              className="focus:outline-none border-none flex items-center gap-2 py-6 w-fit text-primary-600 hover:text-primary-700 transition-colors group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span className="font-medium text-sm">Back to website</span>
            </Link>

            <div className="flex justify-center pt-5 md:pt-0 md:items-center min-h-[calc(100vh-96px)]">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
