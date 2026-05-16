import {
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGES,
} from "@/features/host/properties/lib/constants";
import { z } from "zod";

export const createPropertySchema = z.object({
  propertyTypeId: z.string().min(1, {
    message: "Please select a property type",
  }),
  title: z.string().min(1, { message: "Please enter a property title" }),
  description: z.string().min(1, { message: "Please enter a description" }),

  maxAdults: z
    .number()
    .int()
    .min(1, { message: "At least 1 adult is required" }),
  maxChildren: z
    .number()
    .int()
    .min(0, { message: "Children cannot be negative" }),
  maxInfants: z
    .number()
    .int()
    .min(0, { message: "Infants cannot be negative" }),
  maxPets: z.number().int().min(0, { message: "Pets cannot be negative" }),

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
    .min(1, "At least 1 image is required")
    .max(MAX_IMAGES, "Maximum of 20 images allowed")
    .refine(
      (files) =>
        files.every((file) => ACCEPTED_IMAGE_TYPES.includes(file.type)),
      {
        message: "Only JPG, PNG, and WebP images are allowed",
      },
    ),
});

export const pricingSchema = z.object({
  basePrice: z.number().positive({
    message: "Please enter a per night price",
  }),
  cleaningFee: z
    .number()
    .nonnegative({ message: "Please enter a cleaning fee" }),
  weeklyDiscount: z
    .number({ message: "Weekly discount must be a number" })
    .min(0, { message: "Must be at least 0%" })
    .max(100, { message: "Cannot exceed 100%" }),
  monthlyDiscount: z
    .number({ message: "Monthly discount must be a number" })
    .min(0, { message: "Must be at least 0%" })
    .max(100, { message: "Cannot exceed 100%" }),
});

const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;

export const bookingSettingsSchema = z
  .object({
    instantBook: z.boolean(),

    checkInTime: z
      .string({
        message: "Check-in time is required",
      })
      .min(1, {
        message: "Check-in time is required",
      })
      .regex(timeRegex, {
        message: "Invalid time format (HH:mm)",
      }),

    checkOutTime: z
      .string({
        message: "Check-out time is required",
      })
      .min(1, {
        message: "Check-out time is required",
      })
      .regex(timeRegex, {
        message: "Invalid time format (HH:mm)",
      }),

    minNights: z
      .number({
        message: "Minimum nights is required",
      })
      .int()
      .min(1, {
        message: "Minimum nights must be at least 1",
      }),

    maxNights: z
      .number({
        message: "Maximum nights is required",
      })
      .int()
      .min(1, {
        message: "Maximum nights must be at least 1",
      }),
  })
  .refine((data) => data.maxNights >= data.minNights, {
    message: "Maximum nights must be greater than or equal to minimum nights",
    path: ["maxNights"],
  });
