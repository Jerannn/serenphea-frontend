import { api } from "@/lib/api";
import type { NextCursor, PropertyWithRelations } from "../types";
import { usePropertyStore } from "../store/PropertyStore";

export default async function loader(): Promise<{
  meta: NextCursor;
  properties: PropertyWithRelations[];
}> {
  const paths = usePropertyStore.getState().paths;
  const currentStep = usePropertyStore.getState().currentStep;

  // reset the paths and current step in the store
  if (paths.length > 0 || currentStep > 0) {
    usePropertyStore.persist.clearStorage();
  }

  const response = await api(`/properties`);

  const { meta, properties } = response.data;
  return { meta, properties };
}
