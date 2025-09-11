"use client";
import React from "react";
import Link from "next/link";
import { ChevronDown, UserCheck, Briefcase } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

interface HowItWorksDropdownProps {
  userRole?: string;
}

export function HowItWorksDropdown({ userRole }: HowItWorksDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    {
      icon: Briefcase,
      title: "For Task Posters",
      description: "Learn how to post and manage tasks",
      href: "/how-it-works/poster",
      color: "text-blue-600 bg-blue-50",
    },
    {
      icon: UserCheck,
      title: "For Taskers",
      description: "Discover how to find and complete tasks",
      href: "/how-it-works/tasker",
      color: "text-green-600 bg-green-50",
    },
  ];

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary"
        >
          <span>How It Works</span>
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent
        className="w-80 p-4 rounded-xl shadow-xl border-0 bg-white"
        align="center"
        sideOffset={8}
      >
        <div className="space-y-3">
          {menuItems.map((item, i) => (
            <DropdownMenuItem key={i} asChild className="p-0">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div
                  className={`p-2 rounded-lg ${item.color} group-hover:scale-110 transition-transform`}
                >
                  <item.icon className="w-5 h-5" />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-1">
                    {item.title}
                  </h4>
                  <p className="text-sm text-gray-600">{item.description}</p>
                </div>
              </Link>
            </DropdownMenuItem>
          ))}
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
