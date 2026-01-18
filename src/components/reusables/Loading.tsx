"use client";

const Loader = () => {
  return (
    <div className="w-full h-dvh flex flex-col items-center justify-center z-[9999] bg-white fixed top-0 left-0 gap-4">
      {/* Logo */}
      <div className="relative w-16 h-16">
        <div className="absolute inset-0 bg-primary rounded-2xl animate-pulse"></div>
        <div className="absolute inset-2 bg-white rounded-xl flex items-center justify-center">
          <span className="text-2xl font-bold text-primary">CT</span>
        </div>
      </div>

      {/* Loading text with dots animation */}
      <div className="flex items-center gap-1 text-sm text-gray-600">
        <span>Loading</span>
        <span className="flex gap-0.5">
          <span className="animate-bounce [animation-delay:0ms]">.</span>
          <span className="animate-bounce [animation-delay:150ms]">.</span>
          <span className="animate-bounce [animation-delay:300ms]">.</span>
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-48 h-1 bg-gray-200 rounded-full overflow-hidden">
        <div className="h-full bg-primary rounded-full animate-[progress_1.5s_ease-in-out_infinite]"></div>
      </div>
    </div>
  );
};

export default Loader;
