import ImageGallery from "../Modals/ImageGalleryModal/ImageGallery";

export const ImagesSection = ({ images }: { images?: string[] }) => (
  <section className="space-y-4">
    <h2 className="text-lg sm:text-xl font-semibold text-text-primary">
      Pictures
    </h2>
    {images?.length ? (
      <ImageGallery images={images} />
    ) : (
      <div className="p-6 text-center bg-neutral-50 rounded-xl border border-neutral-200">
        <p className="text-text-muted">No images available for this task</p>
      </div>
    )}
  </section>
);
