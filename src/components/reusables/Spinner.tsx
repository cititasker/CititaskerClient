import React from "react";

const Spinner: React.FC = () => (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#000]/20">
    <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin" />
  </div>
);

export default Spinner;
