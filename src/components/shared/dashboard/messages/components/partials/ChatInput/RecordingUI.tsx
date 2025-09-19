import React from "react";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

interface RecordingUIProps {
  recordingTime: number;
  formatTime: (seconds: number) => string;
  onCancel: () => void;
}

export const RecordingUI: React.FC<RecordingUIProps> = ({
  recordingTime,
  formatTime,
  onCancel,
}) => (
  <div className="flex-1 flex items-center gap-3 bg-red-50 rounded-full px-4 py-2 border border-red-200">
    <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
    <span className="text-red-700 font-medium">Recording...</span>
    <span className="text-red-600 text-sm ml-auto">
      {formatTime(recordingTime)}
    </span>
    <Button
      onClick={onCancel}
      size="sm"
      variant="ghost"
      className="text-red-600 hover:text-red-700 p-1"
    >
      <Trash2 className="w-4 h-4" />
    </Button>
  </div>
);
