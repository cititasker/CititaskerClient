import { z } from "zod";

export const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
export const MAX_IMAGES = 4;

export const portfolioSchema = z.object({
  portfolio: z
    .array(
      z.object({
        src: z.string().min(1, "Image source is required"),
        url: z.string().optional(),
        publicId: z.string().optional(),
        key: z.string().optional(),
        file: z.instanceof(File).optional(),
      })
    )
    .max(MAX_IMAGES, `Maximum ${MAX_IMAGES} images allowed`)
    .optional(),
});

export type PortfolioFormData = z.infer<typeof portfolioSchema>;
