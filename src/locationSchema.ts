import * as z from "zod";

export const LocationDataSchema = z.object({
  address: z.object({
    city: z.string(),
    county: z.string(),
    country: z.string(),
  }),
});

export type LocationData = z.infer<typeof LocationDataSchema>;
