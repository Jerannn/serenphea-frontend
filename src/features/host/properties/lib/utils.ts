import type {
  Amenity,
  PricingInput,
  PropertyWithRelations,
  Step,
} from "../types";
import Decimal from "decimal.js";

export const groupAmenitiesByCategory = (amenities: Amenity[]) => {
  return amenities.reduce(
    (acc, amenity) => {
      if (!amenity.category) return acc;

      if (!acc[amenity.category]) {
        acc[amenity.category] = [];
      }

      acc[amenity.category].push(amenity);

      return acc;
    },
    {} as Record<string, Amenity[]>,
  );
};

export const calculatePricing = ({
  basePrice,
  cleaningFee,
  weeklyDiscount,
  monthlyDiscount,
}: PricingInput) => {
  const serviceFeeRate = new Decimal(0.15);

  const base = new Decimal(basePrice);
  const cleaning = new Decimal(cleaningFee);

  const weeklyDiscountRate = new Decimal(weeklyDiscount).div(100);

  const monthlyDiscountRate = new Decimal(monthlyDiscount).div(100);

  const serviceFee = base.mul(serviceFeeRate);

  const perNightPrice = base.minus(serviceFee);

  const weeklySubtotal = base.mul(7);

  const weeklyDiscountAmount = weeklySubtotal.mul(weeklyDiscountRate);

  const weeklyPrice = weeklyDiscount
    ? weeklySubtotal
        .minus(weeklyDiscountAmount)
        .minus(weeklySubtotal.mul(serviceFeeRate))
        .plus(cleaning)
    : 0;

  const monthlySubtotal = base.mul(30);

  const monthlyDiscountAmount = monthlySubtotal.mul(monthlyDiscountRate);

  const monthlyPrice = monthlyDiscount
    ? monthlySubtotal
        .minus(monthlyDiscountAmount)
        .minus(monthlySubtotal.mul(serviceFeeRate))
        .plus(cleaning)
    : 0;

  return {
    serviceFee: serviceFee.toFixed(2),
    perNightPrice: perNightPrice.toFixed(2),
    weeklyPrice: weeklyPrice.toFixed(2),
    monthlyPrice: monthlyPrice.toFixed(2),
  };
};

export const evaluateStepsCompletion = (
  property: PropertyWithRelations,
  currentSteps: Step[],
): Step[] => {
  return currentSteps.map((step) => {
    let isCompleted = false;

    switch (step.id) {
      case 1: // Basics
        isCompleted = Boolean(property.title && property.maxAdults > 0);
        break;
      case 2: // Location
        isCompleted = Boolean(property.location && property.location.street);
        break;
      case 3: // Amenities
        isCompleted = Boolean(
          property.amenities && property.amenities.length > 0,
        );
        break;
      case 4: // Photos
        isCompleted = Boolean(property.images && property.images.length > 0);
        break;
      case 5: // Pricing
        isCompleted = Boolean(
          property.pricing && property.pricing.basePrice > 0,
        );
        break;
      case 6: // Settings
        isCompleted = Boolean(
          property.bookingSettings && property.bookingSettings.minNights > 0,
        );
        break;
      case 7: // Review
        isCompleted = property.status === "published";
        break;
    }

    return { ...step, isCompleted };
  });
};
