"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import BackTo from "../BackTo";
import PostTaskHeader from "@/app/post-task/_components/partials/PostTaskHeader";
import { useTaskData } from "@/app/post-task/hooks/useTaskData";

const PostTaskLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");

  const { isLoading } = useTaskData();

  if (isLoading) return <PostTaskLoadingScreen />;

  return (
    <div className="min-h-screen bg-background">
      {/* Header with backdrop blur */}
      <header className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm border-b border-border-light">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <BackTo href="/" />
        </div>
      </header>

      {/* Main content */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl">
        {Number(step) < 5 && <PostTaskHeader />}
        <div className="bg-background">{children}</div>
      </main>
    </div>
  );
};

// Extracted loading component for better reusability
const PostTaskLoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-text-secondary">Loading task data...</p>
    </div>
  </div>
);

export default PostTaskLayout;
