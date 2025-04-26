import { useState } from "react";
import Image from "next/image";
import { Modal, IconButton } from "@mui/material";
import Icons from "@/components/Icons";
import useModal from "@/hooks/useModal";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number>(0);
  const previewModal = useModal();

  const openModal = (index: number) => {
    setSelectedIndex(index);
    previewModal.openModal();
  };
  const closeModal = () => {
    setSelectedIndex(0);
    previewModal.closeModal();
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + images?.length) % images?.length);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % images?.length);
  };

  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(100px,1fr))] gap-2 items-center">
      {images.map((img, i) => (
        <Image
          key={i}
          src={img}
          alt={`Image ${i + 1}`}
          width={100}
          height={90}
          className="h-[90px] object-cover rounded-[10px] border border-dark-grey-1 overflow-hidden cursor-pointer"
          onClick={() => openModal(i)}
        />
      ))}

      <Modal open={previewModal.isOpen} onClose={closeModal} className="jus">
        <div className="relative max-w-[360px] w-full top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
          <div className="overflow-auto w-full rounded-lg">
            <div
              className="flex flex-row transition-all duration-300"
              style={{ transform: `translateX(-${selectedIndex * 100}%)` }}
            >
              {images.map((img, i) => (
                <Image
                  key={i}
                  src={img}
                  alt="Preview"
                  width={360}
                  height={300}
                  className="rounded-lg min-w-full"
                />
              ))}
            </div>
          </div>

          {/* Navigation Buttons*/}
          {images.length > 1 && (
            <>
              <IconButton
                className="absolute -left-10 top-1/2 -translate-y-1/2 text-white rounded-full p-2"
                onClick={prevImage}
              >
                <Icons.iconLeft />
              </IconButton>
              <IconButton
                className="absolute -right-10 top-1/2 -translate-y-1/2 text-white rounded-full p-2"
                onClick={nextImage}
              >
                <Icons.iconRight />
              </IconButton>
            </>
          )}

          {/* Close Button*/}
          <IconButton
            className="absolute -top-[30px] -right-[20px] text-white rounded-full p-2"
            onClick={closeModal}
          >
            <Icons.cancel />
          </IconButton>
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;
