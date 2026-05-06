import { create } from "zustand";
import type {
  CreatePropertyInput,
  PropertyLocation,
  PropertyWithRelations,
} from "../types";

type PropertyState = {
  property: PropertyWithRelations;
  setBaseProperty: (data: CreatePropertyInput) => void;
  setLocation: (data: PropertyLocation) => void;
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
    rules: null,
    location: null,
    pricing: null,
    availability: null,
    bookingSettings: null,
    images: [],
    amenities: [],
    createdAt: "",
    updatedAt: "",
  },

  setBaseProperty: (data) =>
    set((state) => ({
      property: {
        ...state.property,
        ...data,
      },
    })),

  setLocation: (data) =>
    set((state) => ({
      property: {
        ...state.property,
        location: data,
      },
    })),
}));
