"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, formatDate } from "@/utils";
import MoreOptionsMenu, { OptionItem } from "./MoreOptionsMenu";
import useModal from "@/hooks/useModal";
import CancelTaskModal from "./CancelTaskModal";
import ImageGallery from "@/components/browseTask/Modals/ImageGalleryModal/ImageGallery";
import {
  Calendar,
  DollarSign,
  Edit,
  MapPin,
  Clock,
  User,
  MessageCircle,
  Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskSummaryCardProps {
  task: ITask;
  onEditDate?: () => void;
  onEditPrice?: () => void;
  onPrimaryAction: () => void;
  buttonText?: string | null;
  showViewButton?: boolean;
  onViewTask?: () => void;
}

interface InfoRowProps {
  label: string;
  value: string | React.ReactNode;
  icon: React.ReactNode;
  onEdit?: () => void;
  canEdit?: boolean;
  variant?: "default" | "compact";
}

const InfoRow = ({
  label,
  value,
  icon,
  onEdit,
  canEdit = false,
  variant = "default",
}: InfoRowProps) => (
  <div
    className={cn(
      "relative group rounded-lg transition-all duration-200",
      variant === "compact" ? "p-3" : "p-4",
      canEdit && "hover:bg-background-secondary/50 hover:shadow-sm"
    )}
  >
    <div className="flex items-center gap-3">
      <div className="flex-shrink-0">
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
          <div className="text-primary">{icon}</div>
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-text-muted uppercase tracking-wide mb-1">
          {label}
        </p>
        <div className="text-sm font-semibold text-text-primary">
          {typeof value === "string" ? (
            <span className="truncate block">{value}</span>
          ) : (
            value
          )}
        </div>
      </div>

      {canEdit && onEdit && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onEdit}
          className={cn(
            "opacity-0 group-hover:opacity-100 transition-all duration-200",
            "text-primary hover:text-primary/80 hover:bg-primary/10",
            "h-8 px-2 text-xs"
          )}
        >
          <Edit className="w-3 h-3 mr-1" />
          Edit
        </Button>
      )}
    </div>
  </div>
);

export default function TaskSummaryCard({
  task,
  onEditDate,
  onEditPrice,
  onPrimaryAction,
  buttonText,
  showViewButton = false,
  onViewTask,
}: TaskSummaryCardProps) {
  const router = useRouter();
  const cancelTask = useModal();

  const handleOptionSelect = (option: OptionItem) => {
    switch (option.name) {
      case "reschedule":
        router.push(`/post-task/${task.id}?step=3&action=reschedule`);
        break;
      case "cancel-task":
        cancelTask.openModal();
        break;
      case "similar-task":
        // Navigate to post task with pre-filled data
        router.push("/post-task?similar=" + task.id);
        break;
      case "refund":
        // Navigate to refund page
        router.push(`/task/${task.id}/refund`);
        break;
      case "help":
        // Navigate to help/support
        router.push("/help?task=" + task.id);
        break;
      default:
        console.log("Selected:", option);
    }
  };

  const canEdit = task.status === "open";
  const hasImages = task.images && task.images.length > 0;

  // Status badge color mapping
  const getStatusBadge = (status: string) => {
    const statusConfig = {
      open: { label: "Open", variant: "default" as const },
      assigned: { label: "Assigned", variant: "secondary" as const },
      in_progress: { label: "In Progress", variant: "outline" as const },
      completed: { label: "Completed", variant: "outline" as const },
      cancelled: { label: "Cancelled", variant: "destructive" as const },
      draft: { label: "Draft", variant: "secondary" as const },
    };

    return (
      statusConfig[status as keyof typeof statusConfig] || {
        label: status.charAt(0).toUpperCase() + status.slice(1),
        variant: "default" as const,
      }
    );
  };

  const statusBadge = getStatusBadge(task.status);

  // Format location display
  const getLocationDisplay = () => {
    if (task.address) return task.address;
    if (task.location && task.location.length > 0) {
      return task.location.join(", ");
    }
    return task.location_type === "online"
      ? "Online"
      : "Location not specified";
  };

  // Format time display
  const getTimeDisplay = () => {
    if (!task.time) return null;

    const timeMapping: Record<string, string> = {
      morning: "Morning (Before 10 AM)",
      mid_day: "Mid Day (10 AM - 2 PM)",
      afternoon: "Afternoon (2 PM - 6 PM)",
      evening: "Evening (After 6 PM)",
    };

    return timeMapping[task.time] || task.time;
  };

  return (
    <>
      <Card className="shadow-sm border-border-light hover:shadow-lg transition-all duration-300 overflow-hidden">
        <CardContent className="p-0">
          {/* Header Section */}
          <div className="p-6 pb-4">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2 flex-wrap">
                  <Badge variant={statusBadge.variant} className="text-xs">
                    {statusBadge.label}
                  </Badge>

                  <Badge variant="outline" className="text-xs">
                    {task.category?.name}
                  </Badge>

                  {task.sub_category?.name && (
                    <Badge variant="outline" className="text-xs opacity-75">
                      {task.sub_category.name}
                    </Badge>
                  )}

                  <Badge variant="outline" className="text-xs capitalize">
                    {task.location_type?.replace("_", " ") || "Unknown"}
                  </Badge>
                </div>

                <h2 className="text-xl sm:text-2xl font-bold text-text-primary mb-2 leading-tight line-clamp-2">
                  {task.name}
                </h2>
              </div>
            </div>

            {/* Description */}
            {task.description && (
              <p className="text-text-secondary text-sm leading-relaxed mb-4 line-clamp-3">
                {task.description}
              </p>
            )}

            {/* Stats Row */}
            <div className="flex items-center gap-4 text-xs text-text-muted">
              {task.offer_count > 0 && (
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>
                    {task.offer_count} offer{task.offer_count !== 1 ? "s" : ""}
                  </span>
                </div>
              )}

              <div className="flex items-center gap-1">
                <Eye className="w-3 h-3" />
                <span>ID: {task.id}</span>
              </div>

              <span>Posted {formatDate(task.created_at, "MMM DD")}</span>
            </div>
          </div>

          {/* Image Gallery Section */}
          {hasImages && (
            <div className="px-6 pb-4">
              <ImageGallery
                images={task.images}
                columns={4}
                aspectRatio="square"
                showCounter={true}
                className="mb-4"
              />
            </div>
          )}

          {/* Task Details Grid */}
          <div className="px-6 pb-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <InfoRow
                label="Due Date"
                value={formatDate(task.date, "DD MMM YYYY")}
                icon={<Calendar className="w-4 h-4" />}
                onEdit={onEditDate}
                canEdit={canEdit}
                variant="compact"
              />

              <InfoRow
                label="Budget"
                value={formatCurrency({
                  value: task.budget,
                  noFraction: true,
                })}
                icon={<DollarSign className="w-4 h-4" />}
                onEdit={onEditPrice}
                canEdit={canEdit}
                variant="compact"
              />

              <InfoRow
                label="Location"
                value={getLocationDisplay()}
                icon={<MapPin className="w-4 h-4" />}
                variant="compact"
              />

              {getTimeDisplay() && (
                <InfoRow
                  label="Preferred Time"
                  value={getTimeDisplay()}
                  icon={<Clock className="w-4 h-4" />}
                  variant="compact"
                />
              )}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="px-6 pb-6">
            <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] gap-3">
              {/* More Options - Always present */}
              <MoreOptionsMenu
                moreOptions={[
                  { text: "Cancel Task", name: "cancel-task" },
                  { text: "Reschedule Task", name: "reschedule" },
                  { text: "Post Similar Task", name: "similar-task" },
                  { text: "Refund Details", name: "refund" },
                  { text: "Help", name: "help" },
                ]}
                onSelect={handleOptionSelect}
                className="w-full h-10"
              />

              {/* View Button - Conditional */}
              {showViewButton && onViewTask && (
                <Button
                  onClick={onViewTask}
                  variant="outline"
                  className="w-full h-10"
                >
                  <Eye className="w-4 h-4 mr-2" />
                  View
                </Button>
              )}

              {/* Primary Action Button - Conditional */}
              {buttonText && (
                <Button
                  onClick={onPrimaryAction}
                  className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
                >
                  {buttonText}
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <CancelTaskModal
        isOpen={cancelTask.isOpen}
        onClose={cancelTask.setIsOpen}
      />
    </>
  );
}
