import React from "react";
import { Button } from "@/components/ui/button";
import MoreOptionsMenu from "@/components/reusables/MoreOptionMenu";
import { Eye } from "lucide-react";
import { useRouter } from "next/navigation";
import { moreOptions } from "../constant";

interface Props {
  task: ITask;
  buttonText?: string | null;
  showViewButton?: boolean;
  disabledButtonText?: boolean;
  onViewTask?: () => void;
  onPrimaryAction: () => void;
  onSelectOption?: (option: MoreOptionItem) => void;
}

export default function TaskFooterActions({
  task,
  buttonText,
  showViewButton,
  disabledButtonText,
  onViewTask,
  onPrimaryAction,
  onSelectOption,
}: Props) {
  const router = useRouter();

  const handleOptionSelect = (option: MoreOptionItem) => {
    switch (option.name) {
      case "reschedule":
        router.push(`/post-task/${task.id}?step=3&action=reschedule`);
        break;
      case "help":
      case "cancel-task":
        onSelectOption?.(option);
        break;
      case "similar-task":
        router.push("/post-task?similar=" + task.id);
        break;
      case "refund":
        router.push(`/task/${task.id}/refund`);
        break;
      default:
        console.log("Unknown option:", option);
    }
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-3">
      <MoreOptionsMenu
        moreOptions={moreOptions}
        onSelect={handleOptionSelect}
        className="w-full h-10"
      />

      {showViewButton && onViewTask && (
        <Button onClick={onViewTask} variant="outline" className="w-full h-10">
          <Eye className="w-4 h-4 mr-2" />
          View
        </Button>
      )}

      {buttonText && (
        <Button
          onClick={onPrimaryAction}
          className="w-full h-10 bg-primary hover:bg-primary/90 text-primary-foreground"
          disabled={disabledButtonText}
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
}
