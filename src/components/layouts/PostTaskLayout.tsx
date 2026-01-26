"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import BackTo from "../BackTo";
import { useTaskData } from "../poster/post-task/hooks/useTaskData";
import PostTaskHeader from "../poster/post-task/partials/PostTaskHeader";
import { getDefaultRedirect } from "@/lib/middleware/guards/route-config";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constant";

const PostTaskLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  const { role } = useAuth();

  const href = role ? getDefaultRedirect(role) : ROUTES.HOME;

  const { isLoading } = useTaskData();

  if (isLoading) return <PostTaskLoadingScreen />;

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      {/* Header with backdrop blur */}
      <header className="flex-shrink-0 bg-background/80 backdrop-blur-sm border-b border-border-light">
        <div className="px-4 sm:px-6 lg:px-8 py-4">
          <BackTo href={href} />
        </div>
      </header>

      {/* Main content - THIS IS THE KEY: Set explicit height calculation */}
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 max-w-3xl flex-1 flex flex-col overflow-hidden">
        {Number(step) < 5 && (
          <div className="flex-shrink-0 mb-6">
            <PostTaskHeader />
          </div>
        )}

        {/* Content wrapper with explicit height constraint */}
        <div className="flex-1 flex flex-col overflow-hidden">{children}</div>
      </main>
    </div>
  );
};

const PostTaskLoadingScreen = () => (
  <div className="min-h-screen bg-background flex items-center justify-center">
    <div className="text-center">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
      <p className="text-text-secondary">Loading task data...</p>
    </div>
  </div>
);

export default PostTaskLayout;
