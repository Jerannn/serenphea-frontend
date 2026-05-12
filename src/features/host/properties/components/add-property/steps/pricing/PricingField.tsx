import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import type { PricingInput } from "@/features/host/properties/types";
import { DollarSign } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type PricingFieldProps = {
  label: string;
  id: "basePrice" | "cleaningFee" | "weeklyDiscount" | "monthlyDiscount";
  register: UseFormRegister<PricingInput>;
  errors: FieldErrors<PricingInput>;
};

export default function PricingField({
  label,
  id,
  register,
  errors,
}: PricingFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <InputGroup className="border-border bg-white">
        <InputGroupInput
          placeholder="0.00"
          id={id}
          type="number"
          {...register(id, { valueAsNumber: true })}
        />
        <InputGroupAddon>
          <DollarSign />
        </InputGroupAddon>
      </InputGroup>
      <FieldDescription>
        This is what guests will see before fees
      </FieldDescription>
      {errors[id] && <FieldError>{errors[id].message}</FieldError>}
    </Field>
  );
}
