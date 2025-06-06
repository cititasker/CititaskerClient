"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { formatCurrency, formatDate } from "@/utils";
import Icons from "@/components/Icons";
import FormButton from "@/components/forms/FormButton";
import MoreOptionsMenu from "./MoreOptionsMenu";
import { Button } from "@/components/ui/button";

interface TaskSummaryCardProps {
  task: ITask;
  onMoreOptionSelect: (option: { text: string; name: string }) => void;
  onEditDate?: () => void;
  onEditPrice?: () => void;
  onPrimaryAction: () => void;
  buttonText?: string | null;
}

export default function TaskSummaryCard({
  task,
  onMoreOptionSelect,
  onEditDate,
  onEditPrice,
  onPrimaryAction,
  buttonText,
}: TaskSummaryCardProps) {
  const router = useRouter();

  return (
    <Card className="mb-6 rounded-[30px]">
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
            <div className="flex items-start gap-4">
              <Icons.calendar className="shrink-0 mt-2" />
              <div className="flex justify-between items-center w-full gap-3">
                <div>
                  <p className="text-base font-semibold text-black mb-1.5">
                    Due Date
                  </p>
                  <p className="text-sm text-dark-grey-2">
                    {formatDate(task.date, "DD MMM YYYY")}
                  </p>
                </div>
                {task.status === "open" && (
                  <FormButton
                    handleClick={onEditDate}
                    className="text-sm"
                    variant="ghost"
                    size="lg"
                  >
                    Edit
                  </FormButton>
                )}
              </div>
            </div>

            {/* Price */}
            <div className="flex items-start gap-4 mt-2">
              <Icons.database className="shrink-0 mt-2" />
              <div className="flex justify-between items-center w-full gap-3">
                <div>
                  <p className="text-base font-semibold text-black mb-1.5">
                    Price
                  </p>
                  <p className="text-sm text-dark-grey-2">
                    {formatCurrency({
                      value: task.budget,
                      noFraction: true,
                    })}
                  </p>
                </div>
                {task.status === "open" && (
                  <FormButton
                    className="text-sm"
                    handleClick={onEditPrice}
                    variant="ghost"
                    size="lg"
                  >
                    Edit
                  </FormButton>
                )}
              </div>
            </div>
          </div>
        </div>

        <p className="text-black text-base font-normal">{task.description}</p>

        {/* Action Buttons */}
        <div className="flex mt-[68px] gap-[13px]">
          <MoreOptionsMenu
            moreOptions={[
              { text: "Cancel Task", name: "cancel" },
              { text: "Reschedule Task", name: "reschedule" },
              { text: "Post Similar Task", name: "similar-task" },
              { text: "Refund Details", name: "refund" },
              { text: "Help", name: "help" },
            ]}
            onSelect={onMoreOptionSelect}
          />
          {buttonText && (
            <FormButton
              className="flex-1 text-base"
              handleClick={onPrimaryAction}
            >
              {buttonText}
            </FormButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
