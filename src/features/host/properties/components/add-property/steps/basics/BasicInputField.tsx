import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { CreatePropertyInput } from "@/features/host/properties/types";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

type BasicInputFields =
  | "propertyTypeId"
  | "title"
  | "description"
  | "maxAdults"
  | "maxChildren"
  | "maxInfants"
  | "maxPets"
  | "bedrooms"
  | "beds"
  | "bathrooms";

type BasicInputFieldProps = {
  label: string;
  id: BasicInputFields;
  placeholder: string;
  type?: string;
  register: UseFormRegister<CreatePropertyInput>;
  errors: FieldErrors<CreatePropertyInput>;
};

export default function BasicInputField({
  label,
  id,
  placeholder,
  type = "text",
  register,
  errors,
}: BasicInputFieldProps) {
  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <Input
        type={type}
        placeholder={placeholder}
        id={id}
        className="border-border bg-white"
        {...register(id, { valueAsNumber: type === "number" })}
      />
      {errors[id] && <FieldError>{errors[id].message}</FieldError>}
    </Field>
  );
}
