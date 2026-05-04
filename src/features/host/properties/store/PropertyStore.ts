import { create } from "zustand";
import type { CreatePropertyInput, Property } from "../types";

type PropertyState = {
  property: {
    base: Property;
  };

  setBaseProperty: (data: CreatePropertyInput) => void;
  // reset: () => void;
};

export const usePropertyStore = create<PropertyState>((set) => ({
  property: {
    base: {
      id: "",
      host_id: "",
      property_type_id: "",
      title: "",
      description: "",
      guests: 0,
      bedrooms: 0,
      beds: 0,
      bathrooms: 0,
      status: "draft",
      created_at: "",
      updated_at: "",
    },
  },

  setBaseProperty: (data) =>
    set((state) => ({
      property: {
        ...state.property,
        base: { ...state.property.base, ...data },
      },
    })),

  //   reset: () =>
  //     set(() => ({
  //       property: initialProperty,
  //     })),
}));
