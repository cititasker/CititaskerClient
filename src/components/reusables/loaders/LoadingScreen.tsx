import React from "react";

interface IProps {
  text?: string;
}
export default function LoadingScreen({ text = "Loading..." }: IProps) {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-text-secondary">{text}</p>
      </div>
    </div>
  );
}
