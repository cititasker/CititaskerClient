import React from "react";

const PulseLoader: React.FC = () => (
  <div className="absolute top-8 left-8 z-50">
    <div className="w-4 h-4 bg-primary rounded-full animate-ping" />
  </div>
);

export default PulseLoader;
