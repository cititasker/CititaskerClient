import { PORTFOLIO_STORAGE_KEY } from "@/constant";

interface StoredImage {
  src: string;
  url: string;
  publicId: string;
  timestamp: number;
}

export const portfolioStorage = {
  get: (): StoredImage[] => {
    try {
      const stored = localStorage.getItem(PORTFOLIO_STORAGE_KEY);
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  },

  add: (image: StoredImage) => {
    const images = portfolioStorage.get();
    images.push(image);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(images));
  },

  remove: (publicId: string) => {
    const images = portfolioStorage
      .get()
      .filter((img) => img.publicId !== publicId);
    localStorage.setItem(PORTFOLIO_STORAGE_KEY, JSON.stringify(images));
  },

  clear: () => {
    localStorage.removeItem(PORTFOLIO_STORAGE_KEY);
  },
};
