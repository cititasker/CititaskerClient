import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import CustomModal from "@/components/reusables/CustomModal";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Move, Crop, ZoomIn, Save, X, RotateCw, Info } from "lucide-react";
import { useFormContext } from "react-hook-form";
import SaveButton from "@/components/reusables/SaveButton.tsx";

interface EditImageModalProps {
  open: boolean;
  onClose: () => void;
  selectedImage: { src: string; file: File } | null;
  handleSaveImage: (croppedImage: { src: string; file: File }) => void;
}

type CropMode = "reposition" | "crop";

const createImage = (url: string): Promise<HTMLImageElement> =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.addEventListener("load", () => resolve(img));
    img.addEventListener("error", (err) => reject(err));
    img.setAttribute("crossOrigin", "anonymous");
    img.src = url;
  });

async function getCroppedImg(imageSrc: string, pixelCrop: any) {
  const image = await createImage(imageSrc);
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  if (!ctx) throw new Error("No 2D context");

  canvas.width = pixelCrop.width;
  canvas.height = pixelCrop.height;

  ctx.drawImage(
    image,
    pixelCrop.x,
    pixelCrop.y,
    pixelCrop.width,
    pixelCrop.height,
    0,
    0,
    pixelCrop.width,
    pixelCrop.height
  );

  return new Promise<{ file: File; base64: string }>((resolve, reject) => {
    canvas.toBlob((blob) => {
      if (!blob) return reject("Canvas is empty");

      const file = new File([blob], "cropped.jpg", { type: "image/jpeg" });
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        resolve({ file, base64: reader.result as string });
      };
    }, "image/jpeg");
  });
}

const ModeToggle = ({
  mode,
  onModeChange,
}: {
  mode: CropMode;
  onModeChange: (mode: CropMode) => void;
}) => (
  <div className="flex items-center justify-center gap-2 p-1 bg-neutral-100 rounded-lg">
    <Button
      variant={mode === "reposition" ? "default" : "ghost"}
      size="sm"
      onClick={() => onModeChange("reposition")}
      className="flex-1 h-8 text-xs"
    >
      <Move className="w-3 h-3 mr-1" />
      Position
    </Button>
    <Button
      variant={mode === "crop" ? "default" : "ghost"}
      size="sm"
      onClick={() => onModeChange("crop")}
      className="flex-1 h-8 text-xs"
    >
      <Crop className="w-3 h-3 mr-1" />
      Crop
    </Button>
  </div>
);

const ZoomControl = ({
  zoom,
  onZoomChange,
}: {
  zoom: number;
  onZoomChange: (zoom: number) => void;
}) => (
  <div className="space-y-2">
    <div className="flex items-center justify-between text-sm">
      <span className="text-text-muted flex items-center gap-1">
        <ZoomIn className="w-4 h-4" />
        Zoom
      </span>
      <span className="text-text-secondary font-medium">
        {Math.round(zoom * 100)}%
      </span>
    </div>
    <Slider
      value={[zoom]}
      onValueChange={([value]) => onZoomChange(value)}
      min={1}
      max={3}
      step={0.1}
      className="w-full"
    />
  </div>
);

const CropPreview = ({
  image,
  crop,
  zoom,
  mode,
  onCropChange,
  onZoomChange,
  onCropComplete,
}: {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  mode: CropMode;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
}) => (
  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={1}
      onCropChange={onCropChange}
      onZoomChange={onZoomChange}
      onCropComplete={onCropComplete}
      cropShape="rect"
      showGrid={mode === "crop"}
      objectFit="cover"
      restrictPosition={false}
      style={{
        cropAreaStyle: {
          pointerEvents: mode === "crop" ? "auto" : "none",
          border:
            mode === "crop" ? "2px solid #ffffff" : "2px solid transparent",
        },
      }}
    />

    {/* Mode indicator */}
    <div className="absolute top-3 left-3">
      <div className="bg-neutral-900/75 backdrop-blur-sm rounded-lg px-2 py-1">
        <span className="text-xs text-white font-medium flex items-center gap-1">
          {mode === "crop" ? (
            <>
              <Crop className="w-3 h-3" />
              Crop Mode
            </>
          ) : (
            <>
              <Move className="w-3 h-3" />
              Position Mode
            </>
          )}
        </span>
      </div>
    </div>
  </div>
);

const ActionButtons = ({
  onCancel,
  onSave,
  isSaving,
}: {
  onCancel: () => void;
  onSave: () => void;
  isSaving: boolean;
}) => (
  <div className="flex flex-col-reverse sm:flex-row gap-3">
    <Button
      variant="ghost"
      onClick={onCancel}
      disabled={isSaving}
      className="flex-1 sm:flex-none"
    >
      <X className="w-4 h-4 mr-2" />
      Cancel
    </Button>
    <SaveButton onClick={onSave} label="Save Image" />
  </div>
);

const EditImageModal = ({
  open,
  onClose,
  selectedImage,
  handleSaveImage,
}: EditImageModalProps) => {
  const [mode, setMode] = useState<CropMode>("reposition");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const {
    formState: { errors },
    trigger,
  } = useFormContext();

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setIsSaving(true);

    try {
      const isValid = await trigger("portfolio");
      if (!isValid) return;

      const { file, base64 } = await getCroppedImg(
        selectedImage.src,
        croppedAreaPixels
      );

      handleSaveImage({ src: base64, file });
    } catch (error) {
      console.error("Failed to crop image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (!isSaving) {
      onClose();
      // Reset state
      setMode("reposition");
      setCrop({ x: 0, y: 0 });
      setZoom(1);
      setCroppedAreaPixels(null);
    }
  };

  if (!selectedImage) return null;

  return (
    <CustomModal
      isOpen={open}
      onClose={handleClose}
      contentClassName="max-w-md mx-auto"
    >
      <div className="space-y-6">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-lg font-semibold text-text-primary mb-1">
            Edit Image
          </h2>
          <p className="text-sm text-text-muted">
            Position and crop your image to look its best
          </p>
        </div>

        {/* Crop Preview */}
        <CropPreview
          image={selectedImage.src}
          crop={crop}
          zoom={zoom}
          mode={mode}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />

        {/* Controls */}
        <div className="space-y-4">
          <ModeToggle mode={mode} onModeChange={setMode} />

          <ZoomControl zoom={zoom} onZoomChange={setZoom} />

          {/* Help Text */}
          <div className="bg-neutral-50 p-3 rounded-lg border border-neutral-200">
            <div className="flex items-start gap-2">
              <Info className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
              <div className="text-xs text-text-muted">
                <p className="font-medium mb-1">Tips:</p>
                <ul className="space-y-1">
                  <li>
                    • Use <strong>Position</strong> to move and zoom the image
                  </li>
                  <li>
                    • Use <strong>Crop</strong> to adjust the selection area
                  </li>
                  <li>• Drag the slider to zoom in/out</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Error Display */}
        {errors.portfolio?.message && (
          <div className="text-sm text-error bg-error-light p-3 rounded-lg border border-error/20">
            {(errors.portfolio as any)?.message}
          </div>
        )}

        {/* Action Buttons */}
        <ActionButtons
          onCancel={handleClose}
          onSave={handleSave}
          isSaving={isSaving}
        />
      </div>
    </CustomModal>
  );
};

export default EditImageModal;
