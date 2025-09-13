import React from "react";
import Image from "next/image";
import { formatCurrency } from "@/utils";
import { defaultProfile } from "@/constant/images";
import StatusChip from "@/components/reusables/StatusChip";

interface TaskCardHeaderProps {
  posterImage: string | null;
  budget: number;
  status: string;
  isActive: boolean;
}

export function TaskCardHeader({
  posterImage,
  budget,
  status,
  isActive,
}: TaskCardHeaderProps) {
  return (
    <div className="flex justify-between items-start mb-4">
      <div className="flex flex-col items-center gap-2">
        <div className="relative">
          <Image
            src={posterImage ?? defaultProfile}
            alt="Task poster"
            width={48}
            height={48}
            className="w-12 h-12 object-cover rounded-full ring-2 ring-gray-100"
          />
          {/* <div className="absolute -bottom-1 -right-1">
            <StatusChip status={status} isActive={isActive} />
          </div> */}
        </div>
      </div>

      {budget && (
        <div className="flex flex-col items-end gap-1">
          <p className="text-primary text-xl font-bold">
            {formatCurrency({ value: budget, noFraction: true })}
          </p>
          <StatusChip status={status} isActive={isActive} />

          {/* <span className="text-xs text-gray-500">Budget</span> */}
        </div>
      )}
    </div>
  );
}
