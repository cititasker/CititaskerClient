import React from "react";
import Icons from "../Icons";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Image from "next/image";
import { convertToBase64 } from "@/utils";
import { BsTrash } from "react-icons/bs";
import { IconButton } from "@mui/material";

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

  const images = watch("portfolio");

  const handleUpload = async (e: any) => {
    const files = e.target.files;
    const prev = getValues("portfolio") as any;
    if (files) {
      const fileArray: File[] = Array.from(files);
      const images = await Promise.all(
        fileArray.map(async (file) => {
          const src = await convertToBase64(file);
          return { src, file };
        })
      );
      const uploaded = [...prev, ...images].slice(0, 4);
      setValue("portfolio", uploaded);
    }
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
          <div className="h-[300px] flex items-center justify-center">
            <label
              htmlFor="portfolio"
              className="cursor-pointer inline-flex w-[120px] h-[120px] items-center justify-center border border-dashed border-dark-grey-1 rounded-[10px]"
            >
              <Icons.plus />
            </label>
            <input
              type="file"
              id="portfolio"
              multiple
              hidden
              onChange={handleUpload}
            />
          </div>
        </div>
      </form>
    </FormProvider>
  );
};

export default Portfolio;
