import React, { useEffect, useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { convertToBase64 } from "@/utils";
import EditImageModal from "./EditImageModal";
import { useAppSelector } from "@/store/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserPorfolio,
  updateUserPorfolio,
} from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import { API_ROUTES } from "@/constant";
import { useGetPorfolio } from "@/services/user/user.hook";
import useModal from "@/hooks/useModal";
import { ImageCard } from "./ImageCard";
import { UploadCard } from "./UploadCard";
import { MAX_IMAGES, PortfolioFormData, portfolioSchema } from "./constant";
import { EmptyState } from "./EmptyState";
import SaveButton from "@/components/reusables/SaveButton.tsx";
import { DeleteConfirmModal } from "@/components/reusables/Modals/ConfirmModal";
import LoadingMessage from "@/components/shared/dashboard/LoadingMessage";

const EditPortfolio = () => {
  const { showSnackbar } = useSnackbar();
  const { user } = useAppSelector((state) => state.user);
  const [toDeleteImage, setToDeleteImage] = useState<any>(null);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const queryClient = useQueryClient();
  const deletePortfolio = useModal();

  const { data, isLoading } = useGetPorfolio({ id: user.id });
  const portfolio = data?.data?.portfolio;

  const methods = useForm<PortfolioFormData>({
    defaultValues: { portfolio: [] },
    resolver: zodResolver(portfolioSchema),
  });

  const { handleSubmit, setValue, watch } = methods;
  const images = watch("portfolio") ?? [];

  // Check for unsaved changes
  const hasChanges = useMemo(() => {
    return images.some((img) => img.file);
  }, [images]);

  // Update form when data loads
  useEffect(() => {
    if (portfolio) {
      setValue(
        "portfolio",
        portfolio.map((item) => ({ src: item.url, key: item.key }))
      );
    }
  }, [portfolio, setValue]);

  // Mutations
  const updateMutation = useMutation({
    mutationFn: updateUserPorfolio,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_PORTFOLIO, user.id],
      });
    },
    onError: (error: any) => {
      showSnackbar(error?.message || "Failed to update portfolio", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserPorfolio,
    onSuccess: (data) => {
      showSnackbar(data.message, "success");
      deletePortfolio.closeModal();
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_PORTFOLIO, user.id],
      });
    },
    onError: (error: any) => {
      showSnackbar(error?.message || "Failed to delete image", "error");
    },
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

  const handleSaveImage = (croppedImage: { src: string; file: File }) => {
    const currentImages = [...images];
    if (currentImages.length < MAX_IMAGES) {
      setValue("portfolio", [...currentImages, croppedImage]);
    }
    setOpenCropModal(false);
    setSelectedImage(null);
  };

  const handlDeleteModal = (image: any, index: number) => {
    setToDeleteImage({ ...image, index });
    deletePortfolio.openModal();
  };

  const handleDeleteImage = () => {
    if (toDeleteImage.key) {
      deleteMutation.mutate(toDeleteImage.key);
    } else {
      const updatedImages = [...images];
      updatedImages.splice(toDeleteImage.index, 1);
      setValue("portfolio", updatedImages);
      deletePortfolio.closeModal();
    }
  };

  const onSubmit = (values: PortfolioFormData) => {
    const formData = new FormData();
    values.portfolio?.forEach((img) => {
      if (img.file) {
        formData.append("portfolio_images[]", img.file);
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
            <EmptyState onUpload={handleUpload} />
          ) : (
            <>
              {images.map((image, index) => (
                <ImageCard
                  key={`${image.key || index}`}
                  image={image}
                  index={index}
                  onDelete={() => handlDeleteModal(image, index)}
                />
              ))}

              {images.length < MAX_IMAGES && (
                <UploadCard
                  onUpload={handleUpload}
                  disabled={images.length >= MAX_IMAGES}
                />
              )}
            </>
          )}
        </div>

        <div className="text-xs text-text-muted bg-neutral-50 p-4 rounded-lg">
          <p className="font-medium mb-2">Portfolio Guidelines:</p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Upload up to {MAX_IMAGES} high-quality images</li>
            <li>Images should be under 2MB in size</li>
            <li>Supported formats: JPG, PNG</li>
            <li>Square aspect ratio works best for consistent display</li>
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
      />
      <DeleteConfirmModal
        description="kindly note that this action is irrevsible and the image will be permanently deleted."
        open={deletePortfolio.isOpen}
        onClose={deletePortfolio.closeModal}
        onConfirm={handleDeleteImage}
        loading={deleteMutation.isPending}
      />
    </FormProvider>
  );
};

export default EditPortfolio;
