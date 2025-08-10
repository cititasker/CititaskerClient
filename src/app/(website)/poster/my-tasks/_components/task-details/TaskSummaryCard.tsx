"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils";
import FormButton from "@/components/forms/FormButton";
import MoreOptionsMenu from "./MoreOptionsMenu";
import { ICalendar, IDatabase } from "@/constant/icons";
import useModal from "@/hooks/useModal";
import CancelTaskModal from "./CancelTaskModal";

interface TaskSummaryCardProps {
  task: ITask;
  onEditDate?: () => void;
  onEditPrice?: () => void;
  onPrimaryAction: () => void;
  buttonText?: string | null;
}

const InfoRow = ({
  label,
  value,
  icon: Icon,
  onEdit,
  editCondition,
}: {
  label: string;
  value: string;
  icon: any;
  onEdit?: () => void;
  editCondition: boolean;
}) => (
  <div className="flex items-start gap-4 mt-2">
    <Icon className="shrink-0 mt-2" />
    <div className="flex justify-between items-center w-full gap-3">
      <div>
        <p className="text-base font-semibold text-black mb-1">{label}</p>
        <p className="text-sm text-dark-grey-2">{value}</p>
      </div>
      {editCondition && (
        <FormButton
          handleClick={onEdit}
          className="text-sm"
          variant="ghost"
          size="lg"
        >
          Edit
        </FormButton>
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
}: TaskSummaryCardProps) {
  const router = useRouter();
  const cancelTask = useModal();

  const onMoreOptionSelect = (option: { text: string; name: string }) => {
    console.log("Selected:", option);
    switch (option.name) {
      case "reschedule": {
        router.push(`/post-task/${task.id}?step=3&action=reschedule`);
        break;
      }
      case "cancel-task": {
        cancelTask.openModal();
        break;
      }
    }
  };

  return (
    <>
      <Card className="mb-6">
        <CardContent className="py-6 px-[18px]">
          <div className="flex gap-5">
            {task.images.length > 0 && (
              <Image
                src={task.images[0]}
                alt="task image"
                width={116}
                height={109}
                className="rounded-[10px] w-[116px] h-[109px] object-cover"
              />
            )}
            <div className="w-full mb-7">
              <h2 className="text-black text-2xl font-semibold mb-3">
                {task.name}
              </h2>

              {/* Due Date */}
              <InfoRow
                label="Due Date"
                value={formatDate(task.date, "DD MMM YYYY")}
                icon={ICalendar}
                onEdit={onEditDate}
                editCondition={task.status === "open"}
              />

              {/* Price */}
              <InfoRow
                label="Price"
                value={formatCurrency({ value: task.budget, noFraction: true })}
                icon={IDatabase}
                onEdit={onEditPrice}
                editCondition={task.status === "open"}
              />
            </div>
          </div>

          <p className="text-black text-base font-normal">{task.description}</p>

          {/* Action Buttons */}
          <div className="grid grid-cols-[repeat(auto-fit,minmax(160px,1fr))] mt-10 gap-3">
            <MoreOptionsMenu
              moreOptions={[
                { text: "Cancel Task", name: "cancel-task" },
                { text: "Reschedule Task", name: "reschedule" },
                { text: "Post Similar Task", name: "similar-task" },
                { text: "Refund Details", name: "refund" },
                { text: "Help", name: "help" },
              ]}
              onSelect={onMoreOptionSelect}
            />
            {buttonText && (
              <FormButton className="text-base" handleClick={onPrimaryAction}>
                {buttonText}
              </FormButton>
            )}
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
