import { create } from "zustand";
import type { CreatePropertyInput, PropertyWithRelations } from "../types";

type PropertyState = {
  property: PropertyWithRelations;

  setBaseProperty: (data: CreatePropertyInput) => void;
  // reset: () => void;
};

export const usePropertyStore = create<PropertyState>((set) => ({
  property: {
    id: "",
    hostId: "",
    propertyTypeId: "",
    title: "",
    description: "",
    guests: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    status: "draft",
    createdAt: "",
    updatedAt: "",
    location: null,
    pricing: null,
    availability: null,
    bookingSettings: null,
    images: [],
    amenities: [],
    rules: null,
  },

  setBaseProperty: (data) =>
    set((state) => ({
      property: {
        ...state.property,
        ...data,
      },
    })),

  //   reset: () =>
  //     set(() => ({
  //       property: initialProperty,
  //     })),
}));
