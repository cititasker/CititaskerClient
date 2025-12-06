"use client";
import React, { useMemo } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { howItWorksItems } from "../constant";

export function HowItWorksDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const { role, isAuthenticated } = useAuth();

  // Filter items based on user role
  const filteredItems = useMemo(() => {
    if (!isAuthenticated) {
      return howItWorksItems;
    }

    // If authenticated, show only relevant item
    return howItWorksItems.filter((item) => {
      if (role === "poster") {
        return item.href === "/how-it-works-poster";
      }
      if (role === "tasker") {
        return item.href === "/how-it-works-tasker";
      }
      return false;
    });
  }, [isAuthenticated, role]);

  // If authenticated and only one item, render as a simple button instead of dropdown
  if (isAuthenticated && filteredItems.length === 1) {
    const item = filteredItems[0];
    return (
      <Button
        asChild
        variant="ghost"
        className="flex items-center gap-2 hover:bg-primary/10 hover:text-primary"
      >
        <Link href={item.href}>
          <item.icon className="w-4 h-4" />
          <span>How It Works</span>
        </Link>
      </Button>
    );
  }

  // Render dropdown for guests (both items shown)
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
        className="w-80 p-3 rounded-none rounded-b-xl shadow-xl border-0 bg-white"
        align="center"
        sideOffset={8}
      >
        <div className="space-y-3">
          {filteredItems.map((item, i) => (
            <DropdownMenuItem key={i} asChild className="p-0">
              <Link
                href={item.href}
                onClick={() => setIsOpen(false)}
                className="flex !items-start gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
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
