import React, { useState } from "react";
import Icons from "../Icons";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { convertToBase64 } from "@/utils";
import { BsTrash } from "react-icons/bs";
import { IconButton } from "@mui/material";
import EditImageModal from "../reusables/Modals/EditImageModal";

const schema = z.object({
  portfolio: z.array(z.object({ src: z.any(), file: z.any() })).optional(),
});
type schemaType = z.infer<typeof schema>;

const Portfolio = () => {
  const methods = useForm<schemaType>({
    defaultValues: {
      portfolio: [],
    },
    resolver: zodResolver(schema),
  });
  const { handleSubmit, getValues, setValue, watch } = methods;

  const images = watch("portfolio") ?? [];
  const [openCropModal, setOpenCropModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);

  const handleUpload = async (e: any) => {
    const files = e.target.files;
    if (files && files.length) {
      const file = files[0];
      const src = await convertToBase64(file);
      setSelectedImage({ src, file });
      setOpenCropModal(true);
    }
  };

  const handleSaveImage = () => {
    const prev = getValues("portfolio") as any;
    const updated = [...prev, selectedImage].slice(0, 4);
    setValue("portfolio", updated);
    setOpenCropModal(false);
    setSelectedImage(null);
  };

  const onsubmit = () => {};

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onsubmit)}>
        <div className="px-10 w-full grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-6">
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
                  <div className="flex items-center absolute bottom-5 right-5">
                    <IconButton onClick={() => {}}>
                      <BsTrash className="text-red-500" />
                    </IconButton>
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
                type="file"
                id="portfolio"
                multiple={false}
                hidden
                onChange={handleUpload}
              />
            </div>
          )}
        </div>
      </form>

      <EditImageModal
        open={openCropModal}
        onClose={() => setOpenCropModal(false)}
        selectedImage={selectedImage}
        handleSaveImage={handleSaveImage}
      />
    </FormProvider>
  );
};

export default Portfolio;
