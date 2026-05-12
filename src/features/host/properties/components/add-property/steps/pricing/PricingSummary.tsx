import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { calculatePricing } from "@/features/host/properties/lib/utils";
import type { PricingInput } from "@/features/host/properties/types";
import { Info } from "lucide-react";
import { useWatch, type Control } from "react-hook-form";

type PricingSummaryProps = {
  control: Control<PricingInput>;
};

export default function PricingSummary({ control }: PricingSummaryProps) {
  const basePrice = useWatch({ control, name: "basePrice" });
  const cleaningFee = useWatch({ control, name: "cleaningFee" });
  const weeklyDiscount = useWatch({ control, name: "weeklyDiscount" });
  const monthlyDiscount = useWatch({ control, name: "monthlyDiscount" });

  const { serviceFee, perNightPrice, weeklyPrice, monthlyPrice } =
    calculatePricing({
      basePrice,
      cleaningFee,
      weeklyDiscount,
      monthlyDiscount,
    });

  return (
    <Card className="bg-white w-full max-w-md ring-0 rounded-2xl border-0 shadow-sm hover:shadow-lg transition-all duration-300 p-6">
      <CardHeader className="p-0">
        <CardTitle className="text-xl font-serif text-card-foreground">
          Your earnings
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Base price</span>
          <span className="font-medium text-card-foreground">${basePrice}</span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">Cleaning fee</span>
          <span className="font-medium text-card-foreground">
            ${cleaningFee}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Service fee (15%)
          </span>
          <span className="font-medium text-card-foreground">
            -${serviceFee}
          </span>
        </div>

        <Separator className="my-4" />

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-semibold text-card-foreground">
            Estimated payout per night
          </span>
          <span className="text-xl font-bold text-primary font-serif">
            ${perNightPrice}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Per week ({weeklyDiscount}% off)
          </span>
          <span className="font-medium text-card-foreground">
            ${weeklyPrice}
          </span>
        </div>

        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-muted-foreground">
            Per month ({monthlyDiscount}% off)
          </span>
          <span className="font-medium text-card-foreground">
            ${monthlyPrice}
          </span>
        </div>

        <div className="flex gap-2 mt-6 p-3 rounded-lg bg-primary/5">
          <Info />
          <p className="text-xs text-card-foreground">
            These are estimates. Actual earnings depend on bookings and
            occupancy rates.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
