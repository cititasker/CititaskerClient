import React from "react";
import { Calendar, DollarSign, MapPin, Clock } from "lucide-react";
import { formatCurrency } from "@/utils";
import InfoRow from "./InfoRow";

interface Props {
  task: ITask;
  canEdit: boolean;
  formattedDate: string;
  locationDisplay: string;
  timeDisplay: string | null;
  onEditDate?: () => void;
  onEditPrice?: () => void;
}

export default function TaskInfoGrid({
  task,
  canEdit,
  formattedDate,
  locationDisplay,
  timeDisplay,
  onEditDate,
  onEditPrice,
}: Props) {
  return (
    <div className="px-6 pb-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-3 gap-y-6">
        <InfoRow
          label="Due Date"
          value={formattedDate}
          icon={<Calendar className="w-4 h-4" />}
          onEdit={onEditDate}
          canEdit={canEdit}
        />

        <InfoRow
          label="Budget"
          value={formatCurrency({ value: task.budget, noFraction: true })}
          icon={<DollarSign className="w-4 h-4" />}
          onEdit={onEditPrice}
          canEdit={canEdit}
        />

        <InfoRow
          label="Location"
          value={locationDisplay}
          icon={<MapPin className="w-4 h-4" />}
        />

        {timeDisplay && (
          <InfoRow
            label="Preferred Time"
            value={timeDisplay}
            icon={<Clock className="w-4 h-4" />}
          />
        )}
      </div>
    </div>
  );
}
