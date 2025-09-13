"use client";
import React from "react";
import { TaskStatusCard } from "./TaskStatusCard";
import { Filter, RotateCcw } from "lucide-react";
import FormButton from "@/components/forms/FormButton";
import { TASK_FILTERS, TaskStatus } from "./constants";
import { useTaskFilter } from "./hooks/useTaskFilter";

interface TaskFilterProps {
  onClose?: () => void; // Add onClose prop
}

export function TaskFilter({ onClose }: TaskFilterProps) {
  const { currentStatus, updateStatus, clearFilter } = useTaskFilter();
  const hasActiveFilter = currentStatus !== "all";

  const handleStatusUpdate = (status: TaskStatus) => {
    updateStatus(status);
    onClose?.(); // Close the sheet after selection
  };

  const handleClearFilter = () => {
    clearFilter();
    onClose?.(); // Close the sheet after clearing
  };

  return (
    <div className="bg-white sm:rounded-xl sm:shadow-sm sm:border border-gray-100 sm:p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-1 flex items-center gap-2">
          <Filter size={18} />
          Task Status
        </h3>
        <p className="text-sm text-gray-500">
          Filter your tasks by their current status
        </p>
      </div>

      <div className="space-y-3">
        {TASK_FILTERS.map((filter) => (
          <TaskStatusCard
            key={filter.value}
            status={filter}
            isActive={currentStatus === filter.value}
            onClick={() => handleStatusUpdate(filter.value)}
          />
        ))}
      </div>

      {hasActiveFilter && (
        <div className="pt-4 border-t border-gray-100 mt-6">
          <FormButton
            type="button"
            onClick={handleClearFilter}
            className="
              w-full px-4 py-3 rounded-lg border border-gray-200 bg-white text-gray-600 
              hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800
              transition-all duration-200 ease-in-out
              focus:ring-2 focus:ring-gray-200 focus:ring-offset-2
              flex items-center justify-center gap-2 font-medium
            "
          >
            <RotateCcw size={16} />
            Clear Filter
          </FormButton>
        </div>
      )}
    </div>
  );
}
