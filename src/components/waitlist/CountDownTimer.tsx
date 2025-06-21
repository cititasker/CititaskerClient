"use client";
import { useTimer } from "@/hooks/useTimer";
import React, { useEffect, useState } from "react";

const CountDownTimer = () => {
  const [isClient, setIsClient] = useState(false);
  const { days, hours, minutes, seconds } = useTimer(
    new Date("2025-07-01").getTime()
  );
  useEffect(() => {
    setIsClient(true);
  }, []);
  if (!isClient) return null;
  return (
    <div className="bg-primary py-16 px-5">
      <div className="flex justify-between gap-4 max-w-5xl mx-auto">
        <div className="max-w-[200px] w-full h-[80px] sm:h-[120px] md:h-[140px] lg:h-[187px] bg-black text-white rounded-2xl flex justify-center items-center flex-col">
          <p className="text-2xl md:text-4xl lg:text-6xl font-semibold">
            {days}
          </p>
          <span className="text-dark-grey text-xs sm:text-sm inline-block mt-1">
            Days
          </span>
        </div>
        <div className="max-w-[200px] w-full h-[80px] sm:h-[120px] md:h-[140px] lg:h-[187px] bg-black text-white rounded-2xl flex justify-center items-center flex-col">
          <p className="text-2xl md:text-4xl lg:text-6xl font-semibold">
            {hours}
          </p>
          <span className="text-dark-grey text-xs sm:text-sm inline-block mt-1">
            Hours
          </span>
        </div>
        <div className="max-w-[200px] w-full h-[80px] sm:h-[120px] md:h-[140px] lg:h-[187px] bg-black text-white rounded-2xl flex justify-center items-center flex-col">
          <p className="text-2xl md:text-4xl lg:text-6xl font-semibold">
            {minutes}
          </p>
          <span className="text-dark-grey text-xs sm:text-sm inline-block mt-1">
            Minutes
          </span>
        </div>
        <div className="max-w-[200px] w-full h-[80px] sm:h-[120px] md:h-[140px] lg:h-[187px] bg-black text-white rounded-2xl flex justify-center items-center flex-col">
          <p className="text-2xl md:text-4xl lg:text-6xl font-semibold">
            {seconds}
          </p>
          <span className="text-dark-grey text-xs sm:text-sm inline-block mt-1">
            Seconds
          </span>
        </div>
      </div>
    </div>
  );
};

export default CountDownTimer;
