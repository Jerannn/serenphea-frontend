import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import type { PricingInput } from "@/features/host/properties/types";
import { TrendingUp } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import FormInputField from "@/components/FormInputField";

type PricingFormProps = {
  register: UseFormRegister<PricingInput>;
  errors: FieldErrors<PricingInput>;
};

export default function PricingForm({ register, errors }: PricingFormProps) {
  return (
    <FieldGroup className="max-w-md w-full">
      <FormInputField<PricingInput>
        label="Base price per night"
        id="basePrice"
        type="number"
        description="This is what guests will see before fees"
        register={register}
        errors={errors}
      />

      <FormInputField<PricingInput>
        label="Cleaning fee (optional)"
        id="cleaningFee"
        type="number"
        description="One-time fee charged per reservation"
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
          <FormInputField<PricingInput>
            label="Weekly discount (7+ nights)"
            id="weeklyDiscount"
            type="number"
            register={register}
            errors={errors}
          />
          <FormInputField<PricingInput>
            label="Monthly discount (30+ nights)"
            id="monthlyDiscount"
            type="number"
            register={register}
            errors={errors}
          />
        </CardContent>
      </Card>
    </FieldGroup>
  );
}
