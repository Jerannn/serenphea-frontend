import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Amenity,
  CreatePropertyInput,
  PropertyImage,
  PropertyLocation,
  PropertyWithRelations,
  Step,
} from "../types";

type PropertyState = {
  property: PropertyWithRelations;

  steps: Step[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;

  paths: string[];
  setPath: (path: string) => void;

  setBaseProperty: (data: CreatePropertyInput) => void;
  setLocation: (data: PropertyLocation) => void;
  setAmenities: (data: Amenity[]) => void;
  setImages: (data: PropertyImage[]) => void;
};

const initialSteps = [
  {
    id: 1,
    title: "Basics",
    description: "Property details",
    isCompleted: false,
  },
  { id: 2, title: "Location", description: "Where is it?", isCompleted: false },
  {
    id: 3,
    title: "Amenities",
    description: "What you offer",
    isCompleted: false,
  },
  {
    id: 4,
    title: "Photos",
    description: "Showcase your space",
    isCompleted: false,
  },
  {
    id: 5,
    title: "Pricing",
    description: "Set your rates",
    isCompleted: false,
  },
  {
    id: 6,
    title: "Settings",
    description: "Booking rules",
    isCompleted: false,
  },
  { id: 7, title: "Review", description: "Final check", isCompleted: false },
];

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
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

      paths: [],
      setPath: (path: string) =>
        set((state) => {
          if (state.paths.includes(path)) return state;

          return { paths: [...state.paths, path] };
        }),

      steps: initialSteps,
      currentStep: 0,

      nextStep: () => {
        const { steps, currentStep } = get();

        if (currentStep >= steps.length - 1) return;

        set((state) => {
          return {
            currentStep: state.currentStep + 1,
            steps: state.steps.map((step, index) => ({
              ...step,
              isCompleted: index <= state.currentStep,
            })),
          };
        });
      },
      prevStep: () => {
        const { currentStep } = get();

        if (currentStep <= 0) return;

        set((state) => {
          const remainingPaths = state.paths.slice(0, state.paths.length - 1);

          return { currentStep: state.currentStep - 1, paths: remainingPaths };
        });
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

      setAmenities: (data) =>
        set((state) => ({
          property: {
            ...state.property,
            amenities: data,
          },
        })),

      setImages: (data) =>
        set((state) => ({
          property: {
            ...state.property,
            images: data,
          },
        })),
    }),
    {
      name: "property-paths",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        paths: state.paths,
        currentStep: state.currentStep,
      }),
    },
  ),
);
