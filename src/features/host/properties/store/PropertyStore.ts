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
import { evaluateStepsCompletion } from "../lib/utils";
import { STEPS } from "../lib/constants";

type PropertyState = {
  property: PropertyWithRelations;

  steps: Step[];
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  navigateStep: (step: number) => void;

  paths: Record<number, string>;
  setPath: (path: string) => void;

  setProperty: (data: PropertyWithRelations) => void;
  setBaseProperty: (data: CreatePropertyInput) => void;
  setLocation: (data: PropertyLocation) => void;
  setAmenities: (data: Amenity[]) => void;
  setImages: (data: PropertyImage[]) => void;
  setPricing: (data: PropertyPricing) => void;
  setBookingSettings: (data: PropertyBookingSettings) => void;
  clearStoreStorage: () => void;
};

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
  steps: STEPS,
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

        set((state) => ({
          currentStep: state.currentStep + 1,
        }));
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

      setProperty: (data) =>
        set((state) => ({
          property: data,
          steps: evaluateStepsCompletion(data, state.steps),
        })),

      setBaseProperty: (data) =>
        set((state) => {
          const newProperty = { ...state.property, ...data };
          return {
            property: newProperty,
            steps: evaluateStepsCompletion(newProperty, state.steps),
          };
        }),

      setLocation: (data) =>
        set((state) => {
          const newProperty = { ...state.property, location: data };
          return {
            property: newProperty,
            steps: evaluateStepsCompletion(newProperty, state.steps),
          };
        }),

      setAmenities: (data) =>
        set((state) => {
          const newProperty = { ...state.property, amenities: data };
          return {
            property: newProperty,
            steps: evaluateStepsCompletion(newProperty, state.steps),
          };
        }),

      setImages: (data) =>
        set((state) => {
          const newProperty = { ...state.property, images: data };
          return {
            property: newProperty,
            steps: evaluateStepsCompletion(newProperty, state.steps),
          };
        }),

      setPricing: (data) =>
        set((state) => {
          const newProperty = { ...state.property, pricing: data };
          return {
            property: newProperty,
            steps: evaluateStepsCompletion(newProperty, state.steps),
          };
        }),

      setBookingSettings: (data) =>
        set((state) => {
          const newProperty = { ...state.property, bookingSettings: data };
          return {
            property: newProperty,
            steps: evaluateStepsCompletion(newProperty, state.steps),
          };
        }),

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
