import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Move, Crop, ZoomIn, X, Info, RotateCw, Download } from "lucide-react";
import CustomModal from "@/components/reusables/CustomModal";
import SaveButton from "@/components/reusables/SaveButton.tsx";

interface EditImageModalProps {
  open: boolean;
  onClose: () => void;
  selectedImage: { src: string; file: File } | null;
  onSaveImage: (croppedImage: { src: string; file: File }) => void;
  cropShape?: "rect" | "round";
  aspectRatio?: number;
  title?: string;
  description?: string;
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

async function getCroppedImg(
  imageSrc: string,
  pixelCrop: any,
  fileName: string = "cropped.jpg"
) {
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
    canvas.toBlob(
      (blob) => {
        if (!blob) return reject("Canvas is empty");

        const file = new File([blob], fileName, { type: "image/jpeg" });
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        reader.onloadend = () => {
          resolve({ file, base64: reader.result as string });
        };
      },
      "image/jpeg",
      0.9
    );
  });
}

const ModeToggle = ({
  mode,
  onModeChange,
}: {
  mode: CropMode;
  onModeChange: (mode: CropMode) => void;
}) => (
  <div className="flex items-center gap-1 p-1 bg-neutral-100 rounded-lg">
    <Button
      variant={mode === "reposition" ? "default" : "ghost"}
      size="sm"
      onClick={() => onModeChange("reposition")}
      className="flex-1 h-8 text-xs font-medium"
    >
      <Move className="w-3 h-3 mr-1.5" />
      Position
    </Button>
    <Button
      variant={mode === "crop" ? "default" : "ghost"}
      size="sm"
      onClick={() => onModeChange("crop")}
      className="flex-1 h-8 text-xs font-medium"
    >
      <Crop className="w-3 h-3 mr-1.5" />
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
    <div className="flex items-center justify-between">
      <span className="text-text-muted text-sm flex items-center gap-1.5">
        <ZoomIn className="w-4 h-4" />
        Zoom
      </span>
      <span className="text-text-secondary text-sm font-medium">
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
  cropShape,
  aspectRatio,
  onCropChange,
  onZoomChange,
  onCropComplete,
}: {
  image: string;
  crop: { x: number; y: number };
  zoom: number;
  mode: CropMode;
  cropShape: "rect" | "round";
  aspectRatio: number;
  onCropChange: (crop: { x: number; y: number }) => void;
  onZoomChange: (zoom: number) => void;
  onCropComplete: (croppedArea: any, croppedAreaPixels: any) => void;
}) => (
  <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-neutral-900 border border-neutral-200">
    <Cropper
      image={image}
      crop={crop}
      zoom={zoom}
      aspect={aspectRatio}
      onCropChange={onCropChange}
      onZoomChange={onZoomChange}
      onCropComplete={onCropComplete}
      cropShape={cropShape}
      showGrid={mode === "crop"}
      objectFit="cover"
      restrictPosition={false}
      style={{
        cropAreaStyle: {
          pointerEvents: mode === "crop" ? "auto" : "none",
          border:
            mode === "crop" ? "2px solid #ffffff" : "2px solid transparent",
          borderRadius: cropShape === "round" ? "50%" : "8px",
        },
      }}
    />

    {/* Mode indicator */}
    <div className="absolute top-3 left-3 z-10">
      <div className="bg-neutral-900/80 backdrop-blur-sm rounded-lg px-3 py-1.5 border border-white/10">
        <span className="text-xs text-white font-medium flex items-center gap-1.5">
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

const HelpTips = ({ cropShape }: { cropShape: "rect" | "round" }) => (
  <div className="bg-neutral-50 p-4 rounded-xl border border-neutral-200">
    <div className="flex items-start gap-3">
      <div className="p-1 bg-info-light rounded-lg">
        <Info className="w-4 h-4 text-info flex-shrink-0" />
      </div>
      <div className="text-xs text-text-muted space-y-2">
        <p className="font-semibold text-text-secondary">Quick Tips:</p>
        <ul className="space-y-1 leading-relaxed">
          <li>
            • Use <strong>Position</strong> mode to move and zoom the image
          </li>
          <li>
            • Use <strong>Crop</strong> mode to adjust the selection area
          </li>
          <li>• Drag the zoom slider for precise control</li>
          {cropShape === "round" && (
            <li>• Perfect for profile pictures and avatars</li>
          )}
        </ul>
      </div>
    </div>
  </div>
);

const EditImageModal: React.FC<EditImageModalProps> = ({
  open,
  onClose,
  selectedImage,
  onSaveImage,
  cropShape = "rect",
  aspectRatio = 1,
  title = "Edit Image",
  description = "Position and crop your image to look its best",
}) => {
  const [mode, setMode] = useState<CropMode>("reposition");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const [isSaving, setIsSaving] = useState(false);

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handleSave = async () => {
    if (!selectedImage || !croppedAreaPixels) return;

    setIsSaving(true);

    try {
      const { file, base64 } = await getCroppedImg(
        selectedImage.src,
        croppedAreaPixels,
        selectedImage.file.name
      );

      onSaveImage({ src: base64, file });
      handleClose();
    } catch (error) {
      console.error("Failed to crop image:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleClose = () => {
    if (isSaving) return;

    onClose();
    // Reset state
    setMode("reposition");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  if (!selectedImage) return null;

  return (
    <CustomModal
      isOpen={open}
      onClose={handleClose}
      contentClassName="max-w-md mx-auto"
    >
      <div className="space-y-6 p-1">
        {/* Header */}
        <div className="text-center space-y-1">
          <h2 className="text-xl font-semibold text-text-primary">{title}</h2>
          <p className="text-sm text-text-muted">{description}</p>
        </div>

        {/* Crop Preview */}
        <CropPreview
          image={selectedImage.src}
          crop={crop}
          zoom={zoom}
          mode={mode}
          cropShape={cropShape}
          aspectRatio={aspectRatio}
          onCropChange={setCrop}
          onZoomChange={setZoom}
          onCropComplete={onCropComplete}
        />

        {/* Controls */}
        <div className="space-y-4">
          <ModeToggle mode={mode} onModeChange={setMode} />
          <ZoomControl zoom={zoom} onZoomChange={setZoom} />
          <HelpTips cropShape={cropShape} />
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row gap-3 pt-2">
          <Button
            variant="ghost"
            onClick={handleClose}
            disabled={isSaving}
            className="flex-1 sm:flex-none"
          >
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <SaveButton
            onClick={handleSave}
            isLoading={isSaving}
            label="Save Image"
            className="flex-1 sm:flex-none"
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default EditImageModal;
