import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import type { PricingInput } from "@/features/host/properties/types";
import { pricingSchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";
import PricingSummary from "./PricingSummary";
import PricingForm from "./PricingForm";

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
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">Set your pricing</h1>
      <p className="mb-8 text-muted-foreground">
        You can always change your pricing later
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="pricing-property-form"
        className="flex items-start gap-8"
      >
        <PricingForm register={register} errors={errors} />
        <PricingSummary control={control} />
      </form>
    </div>
  );
}
