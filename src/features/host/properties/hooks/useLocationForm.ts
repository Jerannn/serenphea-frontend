import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { locationSchema } from "@/shared/schema/properties-schema";
import { usePropertyStore } from "../store/PropertyStore";

export type LocationInput = z.infer<typeof locationSchema>;
export type LocationFormValues = z.input<typeof locationSchema>;

export function useLocationForm() {
  const location = usePropertyStore((state) => state.property.location);

  return useForm<LocationFormValues, unknown, LocationInput>({
    resolver: zodResolver(locationSchema),
    defaultValues: {
      street: location?.street ?? "",
      city: location?.city ?? "",
      region: location?.region ?? "",
      postcode: location?.postCode ?? "",
      country: location?.country ?? "",
      latitude: location?.latitude ?? undefined,
      longitude: location?.longitude ?? undefined,
    },
  });
}
