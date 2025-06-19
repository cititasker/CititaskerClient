"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import CustomModal from "@/components/reusables/CustomModal";

interface ShareTaskModalProps {
  open: boolean;
  onClose: () => void;
}

const socialMedia = [
  { src: "/icons/facebook.svg", alt: "Facebook", size: [24, 26] },
  { src: "/icons/whatsapp.svg", alt: "WhatsApp", size: [28, 28] },
  { src: "/icons/twitter.svg", alt: "Twitter", size: [28, 28] },
  { src: "/icons/instagram.svg", alt: "Instagram", size: [28, 28] },
];

export default function ShareTaskModal({ open, onClose }: ShareTaskModalProps) {
  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      contentClassName="max-w-[578px] p-6 sm:px-8 sm:py-12"
    >
      <div className="max-w-[478px] w-full mx-auto">
        <div className="text-center mb-8">
          <p className="text-2xl font-semibold text-black-2">Share this task</p>
          <p className="text-base mt-2 text-gray-600">
            Spread the word about this task on your social media account.
          </p>
        </div>
        <div className="flex justify-center gap-4">
          {socialMedia.map(({ src, alt, size }, index) => (
            <Button
              key={index}
              variant="outline"
              size="icon"
              className="rounded-full w-14 h-14 border-dark-grey-1"
            >
              <Image src={src} alt={alt} width={size[0]} height={size[1]} />
            </Button>
          ))}
        </div>
      </div>
    </CustomModal>
  );
}
