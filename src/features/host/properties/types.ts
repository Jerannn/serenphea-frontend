import type { createPropertySchema } from "@/shared/schema/properties-schema";
import type { z } from "zod";

export type PropertyTypes = {
  id: string;
  key: string;
  type: string;
  description: string;
};

export type CreatePropertyInput = z.infer<typeof createPropertySchema>;

export type Property = CreatePropertyInput & {
  id: string;
  hostId: string;
  propertyTypeId: string;
  status: "draft" | "published" | "archived";
  createdAt: Date | string;
  updatedAt: Date | string;
};

export type PropertyWithRelations = Property & {
  rules: string | null;

  location: PropertyLocation | null;

  pricing: PropertyPricing | null;
  availability: PropertyAvailability[] | null;
  bookingSettings: PropertyBookingSettings | null;

  images: PropertyImage[];
  amenities: string[];
};

export interface PropertyLocation {
  id: string;
  propertyId: string;
  street: string;
  city: string;
  region: string;
  country: string;
  postcode: string;
  latitude: number;
  longitude: number;
}

export interface PropertyImage {
  id: string;
  url: string;
  isCover: boolean;
  publicId: string;
}

export interface PropertyPricing {
  id: string;
  propertyId: string;

  basePrice: number;
  cleaningFee: number;
  weeklyDiscount: number;
  monthlyDiscount: number;
}

export interface PropertyAvailability {
  id: string;
  propertyId: string;

  date: string; // ISO string (TIMESTAMPTZ)
  isAvailable: boolean;
  priceOverride: number | null;
}

export interface PropertyBookingSettings {
  propertyId: string;

  instantBook: boolean;
  checkInTime: string; // "HH:mm"
  checkOutTime: string;

  minNights: number;
  maxNights: number;
}

export interface PropertyType {
  id: string;
  key: string;
  type: string;
  description: string;
}

export type NextCursor = {
  createdAt: string | Date;
  id: string;
} | null;
