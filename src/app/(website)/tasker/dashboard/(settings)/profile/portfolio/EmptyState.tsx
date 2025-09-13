import { ImageIcon, Upload } from "lucide-react";
import { MAX_IMAGES } from "./constant";

export const EmptyState = ({
  onUpload,
}: {
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) => (
  <div className="col-span-full">
    <div className="text-center py-12">
      <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <ImageIcon className="w-8 h-8 text-neutral-400" />
      </div>
      <h3 className="text-lg font-semibold text-text-primary mb-2">
        Build Your Portfolio
      </h3>
      <p className="text-text-muted mb-6 max-w-sm mx-auto">
        Showcase your best work with up to {MAX_IMAGES} portfolio images that
        represent your skills and experience.
      </p>
      <label className="btn-primary cursor-pointer">
        <Upload className="w-4 h-4 mr-2" />
        Upload First Image
        <input
          type="file"
          accept=".jpg,.jpeg,.png"
          hidden
          onChange={onUpload}
        />
      </label>
    </div>
  </div>
);
