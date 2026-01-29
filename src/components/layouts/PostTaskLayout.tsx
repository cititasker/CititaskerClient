"use client";
import React from "react";
import { useSearchParams } from "next/navigation";
import BackTo from "../BackTo";
import { useTaskData } from "../poster/post-task/hooks/useTaskData";
import PostTaskHeader from "../poster/post-task/partials/PostTaskHeader";
import { getDefaultRedirect } from "@/lib/middleware/guards/route-config";
import { useAuth } from "@/hooks/useAuth";
import { ROUTES } from "@/constant";
import LoadingScreen from "../reusables/loaders/LoadingScreen";

const PostTaskLayout: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const searchParams = useSearchParams();
  const step = parseInt(searchParams.get("step") || "1");
  const { role } = useAuth();

  const href = role ? getDefaultRedirect(role) : ROUTES.HOME;

  const { isLoading } = useTaskData();

  if (isLoading) return <LoadingScreen text="Loading task data..." />;

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

export default PostTaskLayout;
