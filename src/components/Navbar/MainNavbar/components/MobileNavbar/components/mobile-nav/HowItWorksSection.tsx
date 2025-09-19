import React, { useState } from "react";
import { ClipboardCheck, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { howItWorksItems } from "@/components/Navbar/MainNavbar/constant";

interface HowItWorksSectionProps {
  onNavClick: () => void;
}

export const HowItWorksSection: React.FC<HowItWorksSectionProps> = ({
  onNavClick,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-neutral-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "flex items-center gap-3 w-full p-4 transition-all duration-200",
          "hover:bg-primary-50 active:bg-primary-100",
          isOpen && "bg-primary-50 text-primary-700"
        )}
      >
        <ClipboardCheck className="w-5 h-5" />
        <span className="font-medium">How It Works</span>
        <ChevronDown
          className={cn(
            "w-4 h-4 ml-auto transition-transform duration-200",
            isOpen && "rotate-180"
          )}
        />
      </button>

      {isOpen && (
        <div className="px-4 pb-4 space-y-2">
          {howItWorksItems.map((item, i) => (
            <Link
              key={i}
              href={item.href}
              onClick={onNavClick}
              className="flex items-start gap-3 p-3 rounded-xl hover:bg-neutral-50 transition-colors"
            >
              <div className={`p-2 rounded-lg ${item.color}`}>
                <item.icon className="w-4 h-4" />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-neutral-900 text-sm mb-1">
                  {item.title}
                </h4>
                <p className="text-xs text-neutral-600">{item.description}</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
