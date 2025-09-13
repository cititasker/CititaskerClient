"use client";
import Link from "next/link";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { company, explore, legal, socials } from "@/../data";
import {
  allowedCategoryNames,
  containerVariants,
  itemVariants,
} from "./constants";

// Subcomponents
import { FooterSection } from "./components/FooterSection";
import { ContactSection } from "./components/ContactSection";
import { useGetCategories } from "@/services/general/index.hook";
import { capitalize } from "@/utils";
import { ROUTES } from "@/constant";
import BrandLogo from "../reusables/BrandLogo";
import { BRAND_LOGO_WHITE } from "@/constant/images";

const MainFooter: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const { data = [] } = useGetCategories();

  const categoryOptions = useMemo(() => {
    return data
      .filter((category) =>
        allowedCategoryNames.includes(capitalize(category.name))
      )
      .map((category) => ({
        name: capitalize(category.name),
        href: `${ROUTES.BROWSE_TASK}?category_id=${category.id}`,
      }));
  }, [data]);

  const FOOTER_SECTIONS = useMemo(() => {
    return [
      { title: "Categories", items: categoryOptions },
      { title: "Company", items: company },
      { title: "Explore", items: explore },
      { title: "Legal", items: legal },
    ];
  }, [categoryOptions]);

  return (
    <footer className="bg-neutral-900 relative overflow-hidden">
      {/* Gradient Overlays */}
      <div className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-primary/5 to-transparent" />
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-accent-purple/5 to-transparent" />

      <div className="container-w py-16 md:py-20 relative z-10">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={containerVariants}
        >
          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
            {/* Brand Section */}
            <motion.div className="lg:col-span-4" variants={itemVariants}>
              <div className="space-y-6">
                <BrandLogo
                  src={BRAND_LOGO_WHITE}
                  href="/"
                  height={32}
                  width={192}
                />
                <p className="text-text-disabled leading-relaxed max-w-sm">
                  CitiTasker is a trusted platform designed to connect people in
                  need of help with people who are ready to work. With secure
                  payments, verified Taskers, and 24/7 support.
                </p>

                {/* Social Links */}
                <div className="flex gap-4 pt-4">
                  {socials.map((social, index) => (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-text-disabled hover:text-white hover:bg-primary hover:border-primary transition-all duration-300"
                      whileHover={{ scale: 1.1, y: -2 }}
                      whileTap={{ scale: 0.9 }}
                      variants={itemVariants}
                    >
                      <social.icon className="text-lg" />
                    </motion.a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Navigation Sections */}
            <div className="lg:col-span-8">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-6">
                {FOOTER_SECTIONS.map((section, index) => (
                  <FooterSection key={index} section={section} />
                ))}
              </div>
            </div>
          </div>

          {/* Contact Section - Full Width */}
          <motion.div
            className="mb-16 p-8 rounded-2xl bg-neutral-800/50 border border-neutral-700"
            variants={itemVariants}
          >
            <ContactSection />
          </motion.div>

          {/* Bottom Section */}
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center gap-6 pt-8 border-t border-neutral-700"
            variants={itemVariants}
          >
            <p className="text-text-disabled font-medium text-center md:text-left">
              © Copyright {currentYear}, All Rights Reserved by CitiTasker
            </p>

            <div className="flex items-center gap-6">
              <Link
                href="/privacy"
                className="text-text-disabled hover:text-white transition-colors duration-300 text-sm"
              >
                Privacy Policy
              </Link>
              <Link
                href="/terms"
                className="text-text-disabled hover:text-white transition-colors duration-300 text-sm"
              >
                Terms of Service
              </Link>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-primary" />
    </footer>
  );
};

export default MainFooter;
