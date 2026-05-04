import { z } from "zod";

export const createPropertySchema = z.object({
  property_type_id: z.string().min(1, {
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
