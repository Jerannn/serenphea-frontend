import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { locationSchema } from "@/shared/schema/properties-schema";

export type LocationInput = z.infer<typeof locationSchema>;
export type LocationFormValues = z.input<typeof locationSchema>;

export function useLocationForm() {
  return useForm<LocationFormValues, unknown, LocationInput>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      street: "",
      city: "",
      region: "",
      postcode: "",
      country: "",
      latitude: undefined,
      longitude: undefined,
    },
  });
}
