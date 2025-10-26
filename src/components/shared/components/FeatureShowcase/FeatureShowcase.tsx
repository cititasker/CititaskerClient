"use client";

import React from "react";
import { cn } from "@/lib/utils";
import FormButton from "@/components/forms/FormButton";
import Image, { StaticImageData } from "next/image";

// Types
interface FeatureShowcaseItem {
  title: string;
  description: string;
  details: string[];
  image: StaticImageData;
  shapeBg: StaticImageData;
  bottomRight?: StaticImageData;
  topLeft?: StaticImageData;
  imageAlt: string;
  buttonText: string;
  buttonHref?: string;
  buttonAction?: () => void;
}

interface FeatureShowcaseProps {
  title: string;
  subtitle: string;
  features: FeatureShowcaseItem[];
  variant?: "poster" | "tasker";
  className?: string;
}

// Individual Feature Item Component
const FeatureItem = ({
  item,
  index,
  variant = "poster",
}: {
  item: FeatureShowcaseItem;
  index: number;
  variant?: "poster" | "tasker";
}) => {
  const isReversed = index % 2 === 1;

  const variantStyles = {
    poster: {
      accent: "bg-secondary-100",
      button: "btn-primary",
    },
    tasker: {
      accent: "bg-primary-100",
      button: "btn-secondary",
    },
  };

  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center",
        "py-16 lg:py-20"
      )}
    >
      {/* Image Section */}
      <div
        className={cn(
          "relative w-[95%] max-w-[450px] md:max-w-max mx-auto",
          // Create stacking context with z-index
          "z-0",
          isReversed ? "lg:order-2" : "lg:order-1"
        )}
      >
        {/* Background Shape - Behind main image */}
        <div className="absolute inset-0 -z-10">
          <Image
            src={item.shapeBg}
            alt=""
            width={500}
            height={500}
            className="absolute -top-[8%] -right-5 max-w-full"
            priority
          />
        </div>

        {/* Main Image - Above background */}
        <div className="relative z-10 w-[80%] max-w-[450px] mx-auto">
          <Image
            src={item.image}
            alt={item.imageAlt}
            width={500}
            height={500}
            className="w-full h-full object-cover rounded-[30px]"
            priority
          />

          {/* Bottom Right Overlay - Positioned relative to main image */}
          {item.bottomRight && (
            <Image
              src={item.bottomRight}
              alt=""
              width={200}
              height={200}
              className="absolute bottom-2 -right-2 w-auto h-auto max-w-[40%] z-10"
              priority
            />
          )}

          {/* Top Left Overlay - Positioned relative to main image */}
          {item.topLeft && (
            <Image
              src={item.topLeft}
              alt=""
              width={200}
              height={200}
              className="absolute top-5 -left-2 w-auto h-auto max-w-[40%] z-10"
              priority
            />
          )}
        </div>
      </div>

      {/* Content Section */}
      <div
        className={cn(
          "space-y-6",
          isReversed ? "lg:order-1 lg:pr-8" : "lg:order-2 lg:pl-8"
        )}
      >
        <div>
          <h3 className="text-2xl lg:text-3xl font-bold text-neutral-900 mb-4 leading-tight">
            {item.title}
          </h3>
          <p className="text-base lg:text-lg text-neutral-700 leading-relaxed mb-6">
            {item.description}
          </p>
        </div>

        {/* Feature Details */}
        {item.details.length > 0 && (
          <ul className="space-y-3">
            {item.details.map((detail, idx) => (
              <li key={idx} className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2.5 flex-shrink-0" />
                <p className="text-sm lg:text-base text-neutral-700 leading-relaxed">
                  {detail}
                </p>
              </li>
            ))}
          </ul>
        )}

        {/* CTA Button */}
        <FormButton
          text={item.buttonText}
          href={item.buttonHref}
          onClick={item.buttonAction}
          className={cn(styles.button, "mt-8")}
        />
      </div>
    </div>
  );
};

// Main Feature Showcase Component
const FeatureShowcase: React.FC<FeatureShowcaseProps> = ({
  title,
  subtitle,
  features,
  variant = "poster",
  className,
}) => {
  return (
    <section className={cn("bg-background py-16 lg:py-24", className)}>
      <div className="container-w">
        {/* Header */}
        <div className="text-center mb-16 lg:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-neutral-900 mb-4 leading-tight">
            {title}
          </h2>
          <p className="text-base lg:text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        </div>

        {/* Features List */}
        <div className="divide-y divide-neutral-200">
          {features.map((feature, index) => (
            <FeatureItem
              key={index}
              item={feature}
              index={index}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeatureShowcase;

// Export types for external use
export type { FeatureShowcaseItem, FeatureShowcaseProps };
