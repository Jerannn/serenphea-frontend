import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import type { PricingInput } from "@/features/host/properties/types";
import { pricingSchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";
import PricingSummary from "./PricingSummary";
import PricingForm from "./PricingForm";
import PropertyStepLayout from "../../PropertyStepLayout";

export default function PricingStep() {
  const pricingInitial = usePropertyStore((state) => state.property.pricing);
  const submit = useSubmit();
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<PricingInput>({
    resolver: zodResolver(pricingSchema),
    defaultValues: {
      basePrice: pricingInitial?.basePrice ?? 0,
      cleaningFee: pricingInitial?.cleaningFee ?? 0,
      weeklyDiscount: pricingInitial?.weeklyDiscount ?? 0,
      monthlyDiscount: pricingInitial?.monthlyDiscount ?? 0,
    },
  });

  const onSubmit = (data: PricingInput) => {
    submit(data, { method: "put" });
  };

  return (
    <PropertyStepLayout
      title="Set your pricing"
      description="You can always change your pricing later"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="pricing-property-form"
        className="flex items-start gap-8"
      >
        <PricingForm register={register} errors={errors} />
        <PricingSummary control={control} />
      </form>
    </PropertyStepLayout>
  );
}
