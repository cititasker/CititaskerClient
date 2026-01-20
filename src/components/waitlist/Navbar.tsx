"use client";
import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import WaitlistModal from "./WaitlistModal";
import BrandLogo from "../reusables/BrandLogo";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "../ui/drawer";
import { VisuallyHidden } from "../ui/visually-hidden";

const NAV_ITEMS = [
  { href: "#home", label: "Home" },
  { href: "#why-cititasker", label: "Why CitiTasker" },
  { href: "#faq", label: "FAQ" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeHash, setActiveHash] = useState("#home");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    setActiveHash(window.location.hash || "#home");

    const handleHashChange = () => setActiveHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);

    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavClick = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleOpenModal = useCallback(() => {
    setShowModal(true);
    setIsOpen(false);
  }, []);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 z-50 px-4 pt-4 sm:px-6 sm:pt-6">
        <div className="container-w p-0">
          <div className="flex h-16 items-center justify-between rounded-2xl bg-white/95 px-4 shadow-md backdrop-blur-md sm:px-6">
            <BrandLogo />

            {/* Desktop Navigation */}
            <nav className="hidden items-center gap-8 lg:flex">
              {NAV_ITEMS.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className={`relative text-sm font-medium transition-colors hover:text-primary ${
                    activeHash === href
                      ? "text-primary after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-full after:bg-primary"
                      : "text-neutral-600"
                  }`}
                >
                  {label}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => setShowModal(true)}
                className="!hidden sm:!inline-flex"
              >
                Join Waitlist
              </Button>

              <button
                onClick={() => setIsOpen(!isOpen)}
                className="rounded-full p-2 hover:bg-neutral-100 lg:hidden"
                aria-label="Toggle menu"
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent className="lg:hidden">
            <>
              <VisuallyHidden asChild>
                <DrawerTitle>Mobile Navigation</DrawerTitle>
              </VisuallyHidden>
              <VisuallyHidden asChild>
                <DrawerDescription>Mobile Navigation</DrawerDescription>
              </VisuallyHidden>
            </>
            <div className="p-6">
              <nav className="flex flex-col gap-4">
                {NAV_ITEMS.map(({ href, label }) => (
                  <Link
                    key={href}
                    href={href}
                    onClick={handleNavClick}
                    className={`rounded-lg px-4 py-3 text-center text-sm font-medium transition-colors ${
                      activeHash === href
                        ? "bg-primary/10 text-primary"
                        : "text-neutral-700 hover:bg-neutral-50"
                    }`}
                  >
                    {label}
                  </Link>
                ))}
                <Button
                  onClick={handleOpenModal}
                  className="mt-2 w-full rounded-full"
                >
                  Join Waitlist
                </Button>
              </nav>
            </div>
          </DrawerContent>
        </Drawer>
      </nav>

      <WaitlistModal open={showModal} onOpenChange={setShowModal} />
    </>
  );
}
