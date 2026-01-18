import Image from "next/image";
import React from "react";
import HandeShake from "@/assets/images/handshake.svg?url";

export default function Success() {
  return (
    <div className="flex h-full justify-center items-center p-6">
      <div className="space-y-4 text-center">
        <Image
          src={HandeShake}
          alt="Handshake"
          className="mx-auto w-[80%] sm:w-full"
        />
        <p className="text-lg">Thank you for sharing your review</p>
      </div>
    </div>
  );
}
