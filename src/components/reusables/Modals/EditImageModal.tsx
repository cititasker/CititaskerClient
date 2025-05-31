import React from "react";
import { Modal, Box } from "@mui/material";
import Image from "next/image";
import FormButton from "@/components/forms/FormButton";
import Icons from "@/components/Icons";

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
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          borderRadius: "24px",
          width: "90%",
          maxWidth: 370,
          px: 4,
          py: 2,
        }}
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

        <div className="flex flex-col">
          <FormButton
            type="submit"
            text="Post"
            btnStyle="mt-3 max-w-[318px] w-full"
            handleClick={handleSaveImage}
          />
          <FormButton
            type="submit"
            text="Cancel"
            btnStyle="mt-3 max-w-[318px] w-full !bg-[#f3f5f6] !text-primary"
            handleClick={onClose}
          />
        </div>
      </Box>
    </Modal>
  );
};

export default EditImageModal;
