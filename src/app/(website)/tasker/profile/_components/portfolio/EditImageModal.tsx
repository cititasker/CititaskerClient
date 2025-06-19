import React from "react";
import Image from "next/image";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import CustomModal from "@/components/reusables/CustomModal";

interface Props {
  open: boolean;
  onClose: () => void;
  selectedImage: { src: string } | null;
  handleSaveImage: () => void;
}

const EditImageModal = ({
  open,
  onClose,
  selectedImage,
  handleSaveImage,
}: Props) => {
  return (
    <CustomModal isOpen={open} onClose={onClose}>
      <div>
        <h2 className="text-lg font-semibold text-center mb-2">Preview</h2>

        {selectedImage && (
          <div
            style={{
              borderRadius: "30px",
              overflow: "hidden",
            }}
          >
            <Image
              src={selectedImage.src}
              alt="preview"
              width={300}
              height={300}
              objectFit="cover"
              className="w-[300px] h-[300px] object-cover"
            />
          </div>
        )}

        <div className="flex justify-center items-center gap-4 pt-3">
          <Icons.image />
          <Icons.crop />
        </div>

        <div className="flex flex-col">
          <FormButton
            type="submit"
            text="Post"
            className="mt-3 max-w-[318px] w-full"
            handleClick={handleSaveImage}
          />
          <FormButton
            type="submit"
            text="Cancel"
            className="mt-3 max-w-[318px] w-full !bg-[#f3f5f6] !text-primary"
            handleClick={onClose}
          />
        </div>
      </div>
    </CustomModal>
  );
};

export default EditImageModal;
