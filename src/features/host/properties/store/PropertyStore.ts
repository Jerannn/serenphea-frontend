import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type {
  Amenity,
  CreatePropertyInput,
  PropertyBookingSettings,
  PropertyImage,
  PropertyLocation,
  PropertyPricing,
  PropertyWithRelations,
  Step,
} from "../types";

type PropertyState = {
  property: PropertyWithRelations;

  steps: Step[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  navigateStep: (step: number) => void;

  paths: Record<number, string>;
  setPath: (path: string) => void;

  setBaseProperty: (data: CreatePropertyInput) => void;
  setLocation: (data: PropertyLocation) => void;
  setAmenities: (data: Amenity[]) => void;
  setImages: (data: PropertyImage[]) => void;
  setPricing: (data: PropertyPricing) => void;
  setBookingSettings: (data: PropertyBookingSettings) => void;
  clearStoreStorage: () => void;
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

const initialState: Pick<
  PropertyState,
  "property" | "paths" | "steps" | "currentStep"
> = {
  property: {
    id: "",
    hostId: "",
    propertyTypeId: "",
    title: "",
    description: "",
    maxAdults: 0,
    maxChildren: 0,
    maxInfants: 0,
    maxPets: 0,
    bedrooms: 0,
    beds: 0,
    bathrooms: 0,
    status: "draft",
    rules: null,
    location: null,
    pricing: null,
    availability: null,
    bookingSettings: {
      propertyId: "",
      checkInTime: "",
      checkOutTime: "",
      minNights: 0,
      maxNights: 0,
      instantBook: false,
    },
    images: [],
    amenities: [],
    createdAt: "",
    updatedAt: "",
  },
  paths: {},
  steps: initialSteps,
  currentStep: 0,
};

export const usePropertyStore = create<PropertyState>()(
  persist(
    (set, get) => ({
      ...initialState,

      setPath: (path: string) => {
        const { currentStep } = get();

        set((state) => {
          return { paths: { ...state.paths, [currentStep]: path } };
        });
      },

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

        set((state) => ({
          currentStep: state.currentStep - 1,
        }));
      },
      navigateStep: (step: number) => {
        const { currentStep } = get();

        if (currentStep === step) return;

        set({ currentStep: step });
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

      setPricing: (data) =>
        set((state) => ({
          property: {
            ...state.property,
            pricing: data,
          },
        })),

      setBookingSettings: (data) =>
        set((state) => ({
          property: {
            ...state.property,
            bookingSettings: data,
          },
        })),

      clearStoreStorage: () => {
        const { paths, currentStep } = get();

        // reset the paths and current step in the store
        if (Object.keys(paths).length > 0 || currentStep > 0) {
          usePropertyStore.persist.clearStorage();
          set(initialState);
        }
      },
    }),
    {
      name: "property-paths",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
