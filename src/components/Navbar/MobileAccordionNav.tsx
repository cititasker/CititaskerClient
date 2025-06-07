"use client";

import React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

interface NavItem {
  name: string;
  href?: string;
  children?: {
    category: string;
    children: { name: string; href: string }[];
  }[];
}

interface Props {
  navbar: NavItem[];
  toggleMobileNav: () => void;
}

export default function MobileAccordionNav({ navbar, toggleMobileNav }: Props) {
  return (
    <Accordion type="single" collapsible className="flex flex-col gap-4">
      {navbar.map((nav, i) =>
        nav.children ? (
          <AccordionItem
            key={i}
            value={`parent-item-${i}`}
            className="border-none"
          >
            <AccordionTrigger className="text-dark-secondary text-base font-normal py-0 hover:no-underline flex justify-between">
              {nav.name}
            </AccordionTrigger>
            <AccordionContent className="pl-4 space-y-3">
              {/* Nested accordion for submenu groups */}
              <Accordion type="multiple" className="flex flex-col">
                {nav.children.map((group, idx) => (
                  <AccordionItem key={idx} value={`child-item-${i}-${idx}`}>
                    <AccordionTrigger className="text-primary font-semibold flex justify-between">
                      {group.category}
                    </AccordionTrigger>
                    <AccordionContent className="pl-4 mt-1 space-y-1">
                      <ul>
                        {group.children.map((item, id) => (
                          <li key={id}>
                            <Link
                              href={item.href}
                              className="text-sm hover:text-primary py-1 inline-block"
                              onClick={toggleMobileNav}
                            >
                              {item.name}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AccordionContent>
          </AccordionItem>
        ) : (
          <div key={i}>
            <Link
              href={nav.href!}
              className="block text-dark-secondary text-base font-normal"
              onClick={toggleMobileNav}
            >
              {nav.name}
            </Link>
          </div>
        )
      )}
    </Accordion>
  );
}
