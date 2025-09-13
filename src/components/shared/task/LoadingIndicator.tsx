import React from "react";
import { LuLoaderCircle } from "react-icons/lu";

export function LoadingIndicator() {
  return (
    <div className="sticky top-0 z-10 bg-primary text-white text-sm h-9 w-9 flex items-center justify-center rounded-full text-center mx-auto mt-2 shadow">
      <LuLoaderCircle size={26} className="animate-spin" />
    </div>
  );
}
