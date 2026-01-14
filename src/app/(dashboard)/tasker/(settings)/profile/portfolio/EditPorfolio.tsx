import React, { useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertToBase64, extractPublicIdFromUrl } from "@/utils";
import EditImageModal from "./EditImageModal";
import { useAppSelector } from "@/store/hook";
import {
  deleteUserPorfolio,
  updateUserPorfolio,
} from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { API_ROUTES } from "@/constant";
import { useGetPorfolio } from "@/services/user/user.hook";
import { ImageCard } from "./ImageCard";
import { UploadCard } from "./UploadCard";
import { MAX_IMAGES, PortfolioFormData, portfolioSchema } from "./constant";
import { EmptyState } from "./EmptyState";
import { DeleteConfirmModal } from "@/components/reusables/Modals/ConfirmModal";
import LoadingMessage from "@/components/shared/dashboard/LoadingMessage";
import { useCloudinaryUpload } from "@/hooks/useCloudinaryUpload";
import { useCloudinaryDelete } from "@/hooks/useCloudinaryDelete";
import { portfolioStorage } from "./portfolioStorage";
import SaveButton from "@/components/reusables/SaveButton.tsx";
import { useBaseMutation } from "@/hooks/useBaseMutation";
import { UploadIcon } from "lucide-react";

interface PortfolioImage {
  src: string;
  url?: string;
  publicId?: string;
  key?: string;
  file?: File;
}

const EditPortfolio = () => {
  const { showSnackbar } = useSnackbar();
  const { user } = useAppSelector((state) => state.user);
  const [toDeleteImage, setToDeleteImage] = useState<any>(null);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { data, isLoading } = useGetPorfolio({ id: user.id });
  const portfolio = data?.data?.portfolio;

  const methods = useForm<PortfolioFormData>({
    defaultValues: { portfolio: [] },
    resolver: zodResolver(portfolioSchema),
  });

  const { handleSubmit, setValue, watch } = methods;
  const images = watch("portfolio") ?? [];

  // Cloudinary hooks
  const { uploadFile, isUploading } = useCloudinaryUpload({
    folder: `portfolio/${user.id}`,
    tags: ["portfolio", String(user.id)],
    onSuccess: (result) => {
      portfolioStorage.add({
        src: result.secure_url,
        url: result.secure_url,
        publicId: result.public_id,
        timestamp: Date.now(),
      });
    },
    onError: (error) => {
      showSnackbar(error.message || "Upload failed", "error");
    },
  });

  const { deleteImage, isDeleting } = useCloudinaryDelete({
    onSuccess: (publicId) => {
      portfolioStorage.remove(publicId);
    },
    onError: (error) => {
      showSnackbar(error, "error");
    },
  });

  // Check for unsaved changes (pending uploads in localStorage)
  const hasChanges = portfolioStorage.get().length > 0;

  // Load portfolio and pending uploads on mount
  useEffect(() => {
    const loadPortfolio = () => {
      const savedImages: PortfolioImage[] =
        portfolio?.map((item: any) => ({
          src: item.url,
          url: item.url,
          publicId: extractPublicIdFromUrl(item.url),
          key: item.key,
        })) || [];

      const pendingImages = portfolioStorage.get().map((item) => ({
        src: item.url,
        url: item.url,
        publicId: item.publicId,
      }));

      setValue("portfolio", [...savedImages, ...pendingImages]);
    };

    if (portfolio) {
      loadPortfolio();
    }
  }, [portfolio, setValue]);

  // Update mutation
  const updateMutation = useBaseMutation(updateUserPorfolio, {
    invalidateQueryKeys: [[API_ROUTES.GET_PORTFOLIO, user.id]],
    onSuccess: () => {
      portfolioStorage.clear(); // Clear pending uploads
    },
    errorMessage: (error: any) =>
      error?.message || "Failed to update portfolio",
  });

  // delete mutation
  const deleteMutation = useBaseMutation(deleteUserPorfolio, {
    invalidateQueryKeys: [[API_ROUTES.GET_PORTFOLIO, user.id]],
    errorMessage: (error: any) =>
      error?.message || "Failed to delete portfolio",
  });

  // Handlers
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const src = await convertToBase64(file);
      setSelectedImage({ src, file });
      setOpenCropModal(true);
    } catch {
      showSnackbar("Failed to process image", "error");
    }
  };

  const handleSaveImage = async (croppedImage: { src: string; file: File }) => {
    if (images.length >= MAX_IMAGES) {
      showSnackbar(`Maximum ${MAX_IMAGES} images allowed`, "error");
      return;
    }

    const result = await uploadFile(croppedImage.file);

    const newImage: PortfolioImage = {
      src: result.secure_url,
      url: result.secure_url,
      publicId: result.public_id,
    };

    setValue("portfolio", [...images, newImage]);
    showSnackbar("Image uploaded successfully", "success");
    setSelectedImage(null);
  };

  const handleDeleteModal = (image: any, index: number) => {
    setToDeleteImage({ ...image, index });
  };

  const handleDeleteImage = async () => {
    if (!toDeleteImage) return;

    const { publicId, key, index } = toDeleteImage;

    await Promise.all([
      publicId ? deleteImage(publicId) : Promise.resolve(),
      key ? deleteMutation.mutateAsync(key) : Promise.resolve(),
    ]);

    // Remove from form state immediately
    if (!key) {
      const updatedImages = images.filter((_, idx) => idx !== index);
      setValue("portfolio", updatedImages);
    }

    setToDeleteImage(null);
  };

  const onSubmit = (values: PortfolioFormData) => {
    const formData = new FormData();

    values.portfolio?.forEach((img) => {
      if (img.url) {
        formData.append("portfolio_images[]", img.url);
      }
    });

    updateMutation.mutate(formData);
  };

  if (isLoading) {
    return <LoadingMessage message="Loading portfolio..." />;
  }

  return (
    <FormProvider {...methods}>
      <div className="space-y-6">
        <SaveButton
          label="Save Portfolio"
          hasChanges={hasChanges}
          isLoading={updateMutation.isPending}
          onClick={handleSubmit(onSubmit)}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {images.length === 0 ? (
            <EmptyState onUpload={handleUpload} inputRef={fileInputRef} />
          ) : (
            <>
              {images.length < MAX_IMAGES && (
                <UploadCard
                  onUpload={handleUpload}
                  disabled={images.length >= MAX_IMAGES || isUploading}
                  inputRef={fileInputRef}
                />
              )}
              {images.map((image, index) => (
                <ImageCard
                  key={image.publicId || image.key || index}
                  image={image}
                  index={index}
                  onDelete={() => handleDeleteModal(image, index)}
                />
              ))}
            </>
          )}
        </div>

        <div className="text-xs text-text-muted bg-neutral-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Portfolio Guidelines:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Upload up to {MAX_IMAGES} high-quality images</li>
            <li>Images should be under 2MB in size</li>
            <li>Supported formats: JPG, PNG</li>
            <li>Square aspect ratio works best</li>
            <li>
              Images are temporarily stored until you click Save Portfolio
            </li>
          </ul>
        </div>
      </div>

      <EditImageModal
        open={openCropModal}
        onClose={() => {
          setOpenCropModal(false);
          setSelectedImage(null);
        }}
        selectedImage={selectedImage}
        onSaveImage={handleSaveImage}
        loading={isUploading}
        inputRef={fileInputRef}
        saveButtonLabel="Upload"
        saveButtonIcon={<UploadIcon size={14} />}
      />

      <DeleteConfirmModal
        description="This action is irreversible and the image will be permanently deleted."
        open={!!toDeleteImage}
        onClose={() => setToDeleteImage(null)}
        onConfirm={handleDeleteImage}
        loading={isDeleting}
      />
    </FormProvider>
  );
};

export default EditPortfolio;
