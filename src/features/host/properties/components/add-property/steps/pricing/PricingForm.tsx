import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import type { PricingInput } from "@/features/host/properties/types";
import { TrendingUp } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import PricingField from "./PricingField";

type PricingFormProps = {
  register: UseFormRegister<PricingInput>;
  errors: FieldErrors<PricingInput>;
};

export default function PricingForm({ register, errors }: PricingFormProps) {
  return (
    <FieldGroup className="max-w-md w-full">
      <PricingField
        label="Base price per night"
        id="basePrice"
        register={register}
        errors={errors}
      />
      <PricingField
        label="Cleaning fee (optional)"
        id="cleaningFee"
        register={register}
        errors={errors}
      />

      <Card className="bg-accent/5 ring-accent/20 text-card-foreground">
        <CardHeader>
          <CardTitle className="text-sm font-serif font-semibold flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-accent" />
            Length of stay discounts
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <PricingField
            label="Weekly discount (7+ nights)"
            id="weeklyDiscount"
            register={register}
            errors={errors}
          />

          <PricingField
            label="Monthly discount (30+ nights)"
            id="monthlyDiscount"
            register={register}
            errors={errors}
          />
        </CardContent>
      </Card>
    </FieldGroup>
  );
}
