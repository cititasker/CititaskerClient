import ActionsButtons from "@/components/reusables/ActionButtons";
import React from "react";

interface IProps {
  onClose: () => void;
}
export default function Reschedule({ onClose }: IProps) {
  return (
    <div>
      <div className="mb-4">
        <p className="text-2xl text-black-2 font-semibold mb-3">
          Reschedule Time and Date
        </p>
        <p className="text-black-2">
          Let the Poster know when you will be doing the task.
        </p>
      </div>
      <div>//</div>
      <ActionsButtons okText="Next" handleCancel={onClose} />
    </div>
  );
}
