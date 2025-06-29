import React from "react";
import Image from "next/image";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";
import CustomModal from "@/components/reusables/CustomModal";
import ActionsButtons from "@/components/reusables/ActionButtons";

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
    <CustomModal
      isOpen={open}
      onClose={onClose}
      contentClassName="max-w-[370px]"
    >
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

      <ActionsButtons
        cancelText="Cancel"
        handleCancel={onClose}
        okText="Post"
        handleSubmit={handleSaveImage}
        className="mt-4 sm:flex-col-reverse"
        type="submit"
      />
    </CustomModal>
  );
};

export default EditImageModal;
