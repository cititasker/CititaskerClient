import React, { useCallback, useState } from "react";
import Cropper from "react-easy-crop";
import CustomModal from "@/components/reusables/CustomModal";
import ActionsButtons from "@/components/reusables/ActionButtons";
import Icons from "@/components/Icons";
import { useFormContext } from "react-hook-form";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedImage: { src: string; file: File } | null;
  handleSaveImage: (croppedImage: { src: string; file: File }) => void;
}

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

const EditImageModal = ({
  open,
  onClose,
  selectedImage,
  handleSaveImage,
}: Props) => {
  const [mode, setMode] = useState<"crop" | "reposition">("reposition");
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
  const {
    formState: { errors },
    trigger,
  } = useFormContext();

  const onCropComplete = useCallback((_: any, croppedPixels: any) => {
    setCroppedAreaPixels(croppedPixels);
  }, []);

  const handlePost = async () => {
    const isValid = await trigger("portfolio");

    if (!isValid || !selectedImage || !croppedAreaPixels) return;

    const { file, base64 } = await getCroppedImg(
      selectedImage.src,
      croppedAreaPixels
    );
    handleSaveImage({ src: base64, file });
  };

  return (
    <CustomModal
      isOpen={open}
      onClose={onClose}
      contentClassName="max-w-[370px]"
    >
      <h2 className="text-lg font-semibold text-center mb-2">Preview</h2>

      {selectedImage && (
        <div>
          <div className="relative w-[300px] h-[300px] mx-auto rounded-[30px] overflow-hidden bg-[#000]">
            <Cropper
              image={selectedImage.src}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={onCropComplete}
              cropShape="rect"
              showGrid={mode === "crop"} // grid visible only when cropping
              objectFit="cover"
              restrictPosition={false}
              style={{
                // mediaStyle: { objectFit: "cover" },
                cropAreaStyle: {
                  pointerEvents: mode === "crop" ? "auto" : "none", // disable crop box interaction in reposition mode
                },
              }}
            />
          </div>
          {errors.portfolio?.message && (
            <p className="text-sm text-destructive text-center mt-2">
              {(errors.portfolio as any)?.message}
            </p>
          )}
        </div>
      )}

      <div className="flex justify-center items-center gap-4 pt-3">
        <Icons.image
          className={
            mode === "reposition"
              ? "[&>path]:fill-primary [&>path]:stroke-primary"
              : undefined
          }
          onClick={() => setMode("reposition")}
        />
        <Icons.crop
          className={mode === "crop" ? "[&>path]:fill-primary" : undefined}
          onClick={() => setMode("crop")}
        />
      </div>

      <ActionsButtons
        cancelText="Cancel"
        handleCancel={onClose}
        okText="Post"
        handleSubmit={handlePost}
        className="mt-4 sm:flex-col-reverse"
        type="button"
      />
    </CustomModal>
  );
};

export default EditImageModal;
