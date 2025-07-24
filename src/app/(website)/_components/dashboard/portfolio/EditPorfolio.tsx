import React, { useEffect, useMemo, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { convertToBase64 } from "@/utils";
import EditImageModal from "./EditImageModal";
import Icons from "@/components/Icons";
import { useAppSelector } from "@/store/hook";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteUserPorfolio,
  updateUserPorfolio,
} from "@/services/user/users.api";
import { useSnackbar } from "@/providers/SnackbarProvider";
import FormButton from "@/components/forms/FormButton";
import { Trash2, Upload } from "lucide-react";
import { API_ROUTES } from "@/constant";
import { useGetPorfolio } from "@/services/user/user.hook";
import DeleteConfirmationModal from "@/components/reusables/Modals/DeleteConfirmationModal";
import useModal from "@/hooks/useModal";

const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB in bytes

const schema = z.object({
  portfolio: z
    .array(
      z.object({
        src: z.string().min(1, "Image source is required"),
        key: z.string().optional(),
        file: z
          .instanceof(File)
          .refine((file) => file.size <= MAX_FILE_SIZE, {
            message: "File must be 2MB or smaller",
          })
          .optional(),
      })
    )
    .optional(),
});
type schemaType = z.infer<typeof schema>;

const EditPorfolio = () => {
  const { showSnackbar } = useSnackbar();
  const { user } = useAppSelector((state) => state.user);
  const [toDeleteImage, setToDeleteImage] = useState<any>(null);
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const queryClient = useQueryClient();
  const deletePortfolio = useModal();

  const { data } = useGetPorfolio({ id: user.id });

  const portfolio = data?.data?.portfolio;

  const mutation = useMutation({
    mutationFn: updateUserPorfolio,
    onSuccess(data) {
      console.log(data);
      showSnackbar(data.message, "success");
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_PORTFOLIO, user.id],
      });
    },
    onError(error) {
      showSnackbar(error?.message || "Something went wrong", "error");
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserPorfolio,
    onSuccess(data) {
      console.log(data);
      showSnackbar(data.message, "success");
      deletePortfolio.closeModal();
      queryClient.invalidateQueries({
        queryKey: [API_ROUTES.GET_PORTFOLIO, user.id],
      });
    },
    onError(error) {
      showSnackbar(error?.message || "Something went wrong", "error");
    },
  });

  const methods = useForm<schemaType>({
    defaultValues: {
      portfolio: [],
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, getValues, setValue, watch } = methods;

  useEffect(() => {
    if (portfolio) {
      setValue(
        "portfolio",
        portfolio.map((src) => ({ src: src.url, key: src.key }))
      );
    }
  }, [portfolio]);

  const images = watch("portfolio") ?? [];

  const handleUpload = async (e: any) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      const src = await convertToBase64(file);
      setSelectedImage({ src, file });
      setOpenCropModal(true);
    }
  };

  const handleSaveImage = (croppedImage: { src: string; file: File }) => {
    const prev = getValues("portfolio") as any;
    const updated = [...prev, croppedImage].slice(0, 4);
    setValue("portfolio", updated);
    setOpenCropModal(false);
    setSelectedImage(null);
  };

  const onsubmit = (values: schemaType) => {
    const formData = new FormData();
    values.portfolio?.forEach((img) => {
      if (img?.file) formData.append("portfolio_images[]", img?.file);
    });
    mutation.mutate(formData);
  };

  const handleRemove = (index: number) => {
    const prev = getValues("portfolio") as any;
    const portfolio = [...prev];
    portfolio.splice(index, 1);
    setValue("portfolio", portfolio);
    deletePortfolio.closeModal();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDelete = () => {
    if (toDeleteImage.key) {
      deleteMutation.mutate(toDeleteImage.key);
    } else {
      handleRemove(toDeleteImage.index);
    }
  };

  const closeEditModal = () => {
    setOpenCropModal(false);
    setSelectedImage(null);
  };

  const isUpload = useMemo(() => {
    return images.some((img) => img.file);
  }, [images]);

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onsubmit)}>
        {isUpload && (
          <FormButton
            text="Save changes"
            size="lg"
            icon={<Upload />}
            className="ml-auto mb-5"
            type="submit"
            loading={mutation.isPending}
          />
        )}
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6 mb-5">
          {!!images?.length &&
            images.map((img, i: number) => (
              <div
                key={i}
                className="h-[300px] rounded-30 overflow-hidden relative group"
              >
                <Image
                  src={img.src}
                  alt=""
                  width={250}
                  height={250}
                  className="w-full h-full object-cover"
                />
                <div className="absolute w-full h-full top-0 left-0 bg-[#000]/20 hidden group-hover:block">
                  <div
                    className="absolute bottom-5 right-5 cursor-pointer flex items-center bg-red-100 w-7 h-7 rounded-full justify-center"
                    onClick={() => {
                      setToDeleteImage({ ...img, index: i });
                      deletePortfolio.openModal();
                    }}
                  >
                    <Trash2 size={18} className="text-red-500" />
                  </div>
                </div>
              </div>
            ))}
          {images?.length < 4 && (
            <div className="h-[300px] flex items-center justify-center">
              <label
                htmlFor="portfolio"
                className="cursor-pointer inline-flex w-[280px] h-[280px] items-center justify-center border border-dashed border-dark-grey-1 rounded-[10px]"
              >
                <Icons.plus />
              </label>
              <input
                ref={fileInputRef}
                type="file"
                id="portfolio"
                multiple={false}
                accept=".jpg, .jpeg, .png"
                hidden
                onChange={handleUpload}
              />
            </div>
          )}
        </div>
      </form>

      <EditImageModal
        open={openCropModal}
        onClose={closeEditModal}
        selectedImage={selectedImage}
        handleSaveImage={handleSaveImage}
      />
      <DeleteConfirmationModal
        isOpen={deletePortfolio.isOpen}
        onClose={deletePortfolio.closeModal}
        desc={
          !toDeleteImage?.key
            ? "You want to remove the selected item?"
            : undefined
        }
        okText={!toDeleteImage?.key ? "Remove" : "Delete"}
        loading={deleteMutation.isPending}
        handleSubmit={handleDelete}
      />
    </FormProvider>
  );
};

export default EditPorfolio;
