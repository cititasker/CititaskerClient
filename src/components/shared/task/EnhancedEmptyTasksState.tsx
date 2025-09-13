import React from "react";
import FormButton from "../../forms/FormButton";
import { ROLE, ROUTES } from "@/constant";
import {
  Plus,
  Search,
  Clipboard,
  Sparkles,
  RotateCcw,
  SearchX,
} from "lucide-react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/store/hook";

export function EmptyTasksState() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search");
  const statusFilter = searchParams.get("status");
  const hasActiveFilters =
    searchQuery || (statusFilter && statusFilter !== "all");

  // If there are active filters (search or status), show "no results" state
  if (hasActiveFilters) {
    return (
      <NoSearchResultsState
        searchQuery={searchQuery}
        statusFilter={statusFilter}
      />
    );
  }

  // Default empty state when no filters are applied
  return <DefaultEmptyState />;
}

function NoSearchResultsState({
  searchQuery,
  statusFilter,
}: {
  searchQuery: string | null;
  statusFilter: string | null;
}) {
  const clearFilters = () => {
    // Clear all filters and search params
    window.location.href = window.location.pathname;
  };

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 py-12 bg-white">
      <div className="relative z-10 text-center max-w-md">
        {/* Search Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-gray-100 to-gray-50 rounded-full flex items-center justify-center mb-4 group">
            <div className="relative">
              <SearchX className="w-10 h-10 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
            </div>
          </div>

          {/* Subtle floating elements */}
          <div className="absolute top-2 left-2 w-1.5 h-1.5 bg-gray-300 rounded-full animate-pulse"></div>
          <div className="absolute top-6 right-4 w-1 h-1 bg-gray-300 rounded-full animate-pulse delay-300"></div>
          <div className="absolute bottom-4 left-6 w-2 h-2 bg-gray-300 rounded-full animate-pulse delay-500"></div>
        </div>

        {/* Dynamic Heading based on filters */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">
          {searchQuery ? "No Tasks Found" : "No Tasks Match Your Filters"}
        </h2>

        {/* Dynamic Description */}
        <div className="text-gray-600 mb-8 leading-relaxed space-y-2">
          {searchQuery && (
            <p>
              No tasks found for "
              <span className="font-semibold text-gray-800">{searchQuery}</span>
              "
            </p>
          )}
          {statusFilter && statusFilter !== "all" && (
            <p>No {statusFilter} tasks available right now.</p>
          )}
          <p className="text-sm">
            Try adjusting your search terms or filters to find what you're
            looking for.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col gap-4 w-full">
          {/* Clear filters button */}
          <FormButton
            text="Clear All Filters"
            size="lg"
            icon={<RotateCcw className="w-5 h-5" />}
            className="
              bg-primary text-white hover:bg-primary/90
              px-8 py-3 rounded-xl font-semibold
              shadow-md hover:shadow-lg
              transform hover:scale-105 transition-all duration-200
              min-w-48
            "
            onClick={clearFilters}
          />

          {/* Secondary actions */}
          {!statusFilter && (
            <FormButton
              text="Browse All Tasks"
              size="lg"
              icon={<Search className="w-4 h-4" />}
              className="
                bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 w-full
                hover:border-gray-300 px-6 py-2.5 rounded-lg
                transition-all duration-200 font-medium
              "
              href={ROUTES.BROWSE_TASK}
            />
          )}
        </div>
      </div>
    </div>
  );
}

function DefaultEmptyState() {
  const { isAuth, user } = useAppSelector((state) => state.user);
  const role = user.role;

  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[400px] px-6 py-12 bg-white">
      {/* Animated Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-white to-purple-50 opacity-60 rounded-xl"></div>

      {/* Main Content */}
      <div className="relative z-10 text-center max-w-md">
        {/* Icon with Animation */}
        <div className="relative mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary/10 to-primary/5 rounded-full flex items-center justify-center mb-4 group">
            <div className="relative">
              <Clipboard className="w-10 h-10 text-primary/60 group-hover:text-primary transition-colors duration-300" />
              <div className="absolute -top-1 -right-1 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-400 rounded-full flex items-center justify-center opacity-80">
                <Sparkles className="w-3 h-3 text-white" />
              </div>
            </div>
          </div>

          {/* Floating Decorative Elements */}
          <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400 rounded-full animate-bounce delay-100"></div>
          <div className="absolute top-4 right-2 w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-300"></div>
          <div className="absolute bottom-2 left-4 w-1 h-1 bg-pink-400 rounded-full animate-bounce delay-500"></div>
        </div>

        {/* Heading */}
        <h2 className="text-2xl font-bold text-gray-900 mb-3">No Tasks Yet</h2>

        {/* Description */}
        <p className="text-gray-600 mb-8 leading-relaxed">
          Task list is empty. Start by creating your first task and begin
          connecting with talented professionals in your area.
        </p>

        {/* Action Button */}
        {(!isAuth || role == ROLE.poster) && (
          <FormButton
            text="Create Your First Task"
            size="lg"
            icon={<Plus className="w-5 h-5" />}
            href={ROUTES.POST_TASK}
          />
        )}

        {/* Secondary Action */}
        {(!isAuth || role == ROLE.tasker) && (
          <div className="mt-6 pt-6 border-t border-gray-100">
            <p className="text-sm text-gray-500 mb-3">
              Or explore what others are looking for
            </p>
            <FormButton
              text="Browse Available Tasks"
              size="lg"
              icon={<Search className="w-4 h-4" />}
              href={ROUTES.BROWSE_TASK}
            />
          </div>
        )}
      </div>

      {/* Subtle Pattern Overlay */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="w-full h-full bg-repeat"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23000000' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='1'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            backgroundSize: "60px 60px",
          }}
        ></div>
      </div>
    </div>
  );
}

// Enhanced version with different styles for different contexts
interface EmptyTasksStateProps {
  variant?: "default" | "minimal" | "illustration";
  title?: string;
  description?: string;
  primaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
  secondaryAction?: {
    text: string;
    href: string;
    icon?: React.ReactNode;
  };
}

export function EnhancedEmptyTasksState({
  variant = "default",
  title = "No Tasks Yet",
  description = "Your task list is empty. Start by creating your first task and begin connecting with talented professionals in your area.",
  primaryAction = {
    text: "Create Your First Task",
    href: ROUTES.POST_TASK,
    icon: <Plus className="w-5 h-5" />,
  },
  secondaryAction = {
    text: "Browse Available Tasks",
    href: ROUTES.BROWSE_TASK,
    icon: <Search className="w-4 h-4" />,
  },
}: EmptyTasksStateProps) {
  if (variant === "minimal") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[300px] px-6 py-8 bg-white">
        <div className="text-center max-w-sm">
          <div className="w-16 h-16 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
            <Clipboard className="w-8 h-8 text-gray-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-6">{description}</p>
          <FormButton
            text={primaryAction.text}
            icon={primaryAction.icon}
            href={primaryAction.href}
            className="bg-primary text-white hover:bg-primary/90 px-6 py-2.5 rounded-lg font-medium"
          />
        </div>
      </div>
    );
  }

  if (variant === "illustration") {
    return (
      <div className="flex flex-col items-center justify-center h-full min-h-[500px] px-6 py-12 bg-white">
        {/* Illustration Area */}
        <div className="relative mb-8">
          <svg
            className="w-32 h-32 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
          <div className="absolute -top-2 -right-2 w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
            <Plus className="w-4 h-4 text-primary" />
          </div>
        </div>

        <div className="text-center max-w-lg">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
          <p className="text-gray-600 mb-8 text-lg leading-relaxed">
            {description}
          </p>

          <div className="space-y-4">
            <FormButton
              text={primaryAction.text}
              icon={primaryAction.icon}
              href={primaryAction.href}
              size="lg"
              className="
                bg-gradient-to-r from-primary to-primary/80 text-white 
                px-8 py-4 rounded-xl font-semibold
                shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200
              "
            />

            {secondaryAction && (
              <FormButton
                text={secondaryAction.text}
                icon={secondaryAction.icon}
                href={secondaryAction.href}
                className="
                  bg-white border-2 border-gray-200 text-gray-700 
                  hover:bg-gray-50 hover:border-primary/30
                  px-6 py-3 rounded-lg font-medium transition-all duration-200
                "
              />
            )}
          </div>
        </div>
      </div>
    );
  }

  return <EmptyTasksState />;
}
