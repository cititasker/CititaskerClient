import { useState } from "react";
import Image from "next/image";
import { Modal, IconButton } from "@mui/material";
import Icons from "@/components/Icons";

const ImageGallery = ({ images }: { images: string[] }) => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const openModal = (index: number) => setSelectedIndex(index);
  const closeModal = () => setSelectedIndex(null);

  const prevImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === 0 ? images.length - 1 : prev! - 1));
    }
  };

  const nextImage = () => {
    if (selectedIndex !== null) {
      setSelectedIndex((prev) => (prev === images.length - 1 ? 0 : prev! + 1));
    }
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

      <Modal open={selectedIndex !== null} onClose={closeModal}>
        <div className="fixed inset-0 bg-black bg-opacity-10 flex items-center justify-center pt-20">
          {/* Transparent Border Box */}
          <div className="relative  rounded-lg p-4">
            {selectedIndex !== null && (
              <>
                {/* Image Display */}
                <Image
                  src={images[selectedIndex]}
                  alt="Preview"
                  width={360}
                  height={300}
                  className="rounded-lg"
                />

                {/* Navigation Buttons*/}
                {images.length > 1 && (
                  <>
                    <IconButton
                      className="absolute left-[-20px] top-[140px] text-white rounded-full p-2"
                      onClick={prevImage}
                    >
                      <Icons.iconLeft />
                    </IconButton>
                    <IconButton
                      className="absolute right-[-20px] top-[140px] text-white rounded-full p-2"
                      onClick={nextImage}
                    >
                      <Icons.iconRight />
                    </IconButton>
                  </>
                )}

                {/* Close Button*/}
                <IconButton
                  className="absolute top-[-20px] right-[10px] text-white rounded-full p-2"
                  onClick={closeModal}
                >
                  <Icons.cancel />
                </IconButton>
              </>
            )}
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ImageGallery;





