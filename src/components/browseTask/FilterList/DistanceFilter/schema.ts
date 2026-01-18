import { z } from "zod";

export const schema = z.object({
  location: z.any(),
  distance: z.number().min(0).max(100),
  address: z.string(),
  userLocation: z.object({ lat: z.any(), lng: z.any() }),
});

export type DistanceFormData = z.infer<typeof schema>;
