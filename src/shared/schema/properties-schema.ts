import {
  ACCEPTED_IMAGE_TYPES,
  MIN_IMAGES,
} from "@/features/host/properties/lib/constants";
import { z } from "zod";

export const createPropertySchema = z.object({
  propertyTypeId: z.string().min(1, {
    message: "Please select a property type",
  }),
  title: z.string().min(1, { message: "Please enter a property title" }),
  description: z.string().min(1, { message: "Please enter a description" }),

  guests: z.number().min(1, { message: "Please enter a number of guests" }),
  bedrooms: z.number().min(1, { message: "Please enter a number of bedrooms" }),
  beds: z.number().min(1, { message: "Please enter a number of beds" }),
  bathrooms: z
    .number()
    .min(1, { message: "Please enter a number of bathrooms" }),
});

export const locationSchema = z.object({
  street: z.string().trim().min(1, { message: "Please enter a street" }),
  city: z.string().trim().min(1, { message: "Please enter a city" }),
  region: z.string().trim().min(1, { message: "Please enter a region" }),
  postcode: z.string().trim().min(1, { message: "Please enter a postcode" }),
  country: z.string().trim().min(1, { message: "Please enter a country" }),
  latitude: z.coerce
    .number()
    .refine(Number.isFinite, { message: "Please pick a location on the map" })
    .min(-90)
    .max(90),
  longitude: z.coerce
    .number()
    .refine(Number.isFinite, { message: "Please pick a location on the map" })
    .min(-180)
    .max(180),
});

export const amenitySchema = z.object({
  amenityIds: z.array(z.uuid()).min(1, "Please select at least one amenity"),
});

export const photosSchema = z.object({
  images: z
    .array(z.instanceof(File))
    .min(MIN_IMAGES, `Upload at least ${MIN_IMAGES} images`)
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Only JPG, PNG, and WebP images are allowed",
      },
    ),
});
