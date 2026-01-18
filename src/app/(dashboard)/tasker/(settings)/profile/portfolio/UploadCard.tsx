import { Plus } from "lucide-react";

export const UploadCard = ({
  onUpload,
  disabled,
  inputRef,
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disabled: boolean;
  inputRef?: React.RefObject<HTMLInputElement | null>;
}) => (
  <label
    className={`group relative aspect-square rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer flex flex-col items-center justify-center ${
      disabled
        ? "border-neutral-200 bg-neutral-50 cursor-not-allowed"
        : "border-neutral-300 bg-neutral-50 hover:border-primary hover:bg-primary-50"
    }`}
  >
    <div className="flex flex-col items-center gap-3 p-4 text-center">
      <div
        className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
          disabled
            ? "bg-neutral-200"
            : "bg-neutral-200 group-hover:bg-primary-100"
        }`}
      >
        <Plus
          className={`w-6 h-6 ${
            disabled
              ? "text-neutral-400"
              : "text-neutral-500 group-hover:text-primary"
          }`}
        />
      </div>
      <div className="space-y-1">
        <p
          className={`text-sm font-medium ${
            disabled
              ? "text-neutral-400"
              : "text-text-secondary group-hover:text-primary"
          }`}
        >
          {disabled ? "Maximum reached" : "Add Image"}
        </p>
        <p className="text-xs text-text-muted">JPG, PNG up to 2MB</p>
      </div>
    </div>
    <input
      ref={inputRef}
      type="file"
      accept=".jpg,.jpeg,.png"
      hidden
      onChange={onUpload}
      disabled={disabled}
    />
  </label>
);
