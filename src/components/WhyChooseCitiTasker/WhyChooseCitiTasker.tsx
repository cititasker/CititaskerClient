"use client";
import React, { useRef, useState, useCallback } from "react";
import { motion, useInView } from "framer-motion";
import UnderlinedHeader from "../reusables/UnderlinedHeader";
import Image from "next/image";

// Data and constants
const FEATURES = [
  {
    id: 1,
    title: "Pay safely",
    description:
      "Pay easily with peace of mind. We hold payments secure in CitiTasker escrow until task completion and your 100% satisfaction.",
    image: "/images/wcu-1.svg",
    gradient: "from-emerald-500 to-teal-600",
  },
  {
    id: 2,
    title: "Top rated insurance",
    description:
      "CitiTasker insurance covers Taskers' liability to third parties for personal injury or property damage during task activities.",
    image: "/images/wcu-2.svg",
    gradient: "from-blue-500 to-cyan-600",
  },
  {
    id: 3,
    title: "24/7 Support",
    description:
      "Our Help Centre and dedicated support specialists are available around the clock to help you navigate and maximize our platform.",
    image: "/images/wcu-3.svg",
    gradient: "from-purple-500 to-pink-600",
  },
  {
    id: 4,
    title: "Verified Taskers",
    description:
      "Every Tasker undergoes thorough verification including background checks and skill validation to ensure reliability and trustworthiness.",
    image: "/images/wcu-4.svg",
    gradient: "from-orange-500 to-red-600",
  },
] as const;

const STYLES = {
  container:
    "relative bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden",
  backgroundPattern:
    'absolute inset-0 bg-[url(\'data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23e2e8f0" fill-opacity="0.3"%3E%3Ccircle cx="30" cy="30" r="1.5"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\')] opacity-40',
  content: "relative z-10 container-w mx-auto px-4 md:px-8 py-16 md:py-24",
  header: "text-center mb-16",
  title: "text-3xl md:text-4xl lg:text-5xl font-bold text-slate-800 mb-4",
  grid: "grid lg:grid-cols-2 gap-12 lg:gap-16 items-center",
  featuresList: "space-y-6",
  featureItem: "group cursor-pointer transition-all duration-500 ease-out",
  featureContent:
    "flex items-start gap-4 p-6 rounded-2xl transition-all duration-300",
  featureIcon:
    "flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg",
  featureText: "flex-1 min-w-0",
  featureTitle: "text-lg font-semibold mb-2 transition-colors duration-300",
  featureDesc: "text-sm leading-relaxed transition-colors duration-300",
  imageContainer:
    "relative h-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl",
  imageWrapper: "absolute inset-0 transition-all duration-700 ease-in-out",
} as const;

const WhyChooseCitiTasker: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.3 });

  // Intersection Observer setup for cleaner scroll detection
  const observerCallback = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.6) {
          const index = parseInt(
            entry.target.getAttribute("data-index") || "0"
          );
          setActiveIndex(index);
        }
      });
    },
    []
  );

  const itemRef = useCallback(
    (element: HTMLDivElement | null, index: number) => {
      if (!element) return;

      const observer = new IntersectionObserver(observerCallback, {
        threshold: [0.6],
        rootMargin: "-20% 0px -20% 0px",
      });

      element.setAttribute("data-index", index.toString());
      observer.observe(element);

      return () => observer.disconnect();
    },
    [observerCallback]
  );

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const imageVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section className={STYLES.container} ref={containerRef}>
      {/* Background Pattern */}
      <div className={STYLES.backgroundPattern} />

      {/* Decorative Background Image */}
      <Image
        src="/images/bg-pics.svg"
        alt=""
        width={400}
        height={400}
        className="absolute bottom-0 right-0 w-64 h-auto opacity-20 pointer-events-none"
        priority={false}
      />

      <div className={STYLES.content}>
        {/* Header */}
        <motion.div
          className={STYLES.header}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.h2 className={STYLES.title} variants={itemVariants}>
            Why Choose{" "}
            <UnderlinedHeader
              text="CitiTasker?"
              extraStyle="before:!translate-x-0 inline-block text-transparent bg-gradient-to-r from-primary to-secondary bg-clip-text"
            />
          </motion.h2>
        </motion.div>

        {/* Main Content Grid */}
        <div className={STYLES.grid}>
          {/* Features List */}
          <motion.div
            className={STYLES.featuresList}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {FEATURES.map((feature, index) => {
              const isActive = activeIndex === index;

              return (
                <motion.div
                  key={feature.id}
                  ref={(el) => itemRef(el, index)}
                  className={STYLES.featureItem}
                  variants={itemVariants}
                  onClick={() => setActiveIndex(index)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div
                    className={`${STYLES.featureContent} ${
                      isActive
                        ? "bg-white shadow-xl border-l-4 border-blue-500"
                        : "bg-white/60 hover:bg-white/80 shadow-md hover:shadow-lg"
                    }`}
                  >
                    <div
                      className={`${STYLES.featureIcon} bg-gradient-to-r ${
                        feature.gradient
                      } ${isActive ? "ring-4 ring-blue-100" : ""}`}
                    >
                      {index + 1}
                    </div>
                    <div className={STYLES.featureText}>
                      <h3
                        className={`${STYLES.featureTitle} ${
                          isActive
                            ? "text-blue-600"
                            : "text-slate-700 group-hover:text-slate-900"
                        }`}
                      >
                        {feature.title}
                      </h3>
                      <p
                        className={`${STYLES.featureDesc} ${
                          isActive ? "text-slate-600" : "text-slate-500"
                        }`}
                      >
                        {feature.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Image Display */}
          <motion.div
            className={STYLES.imageContainer}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            variants={imageVariants}
          >
            {FEATURES.map((feature, index) => (
              <motion.div
                key={feature.id}
                className={STYLES.imageWrapper}
                animate={{
                  opacity: activeIndex === index ? 1 : 0,
                  scale: activeIndex === index ? 1 : 0.95,
                  zIndex: activeIndex === index ? 10 : 1,
                }}
                transition={{
                  duration: 0.6,
                  ease: "easeInOut",
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.title}
                  fill
                  className="object-cover"
                  priority={index === 0}
                />

                {/* Gradient Overlay for better visual appeal */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent`}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseCitiTasker;
