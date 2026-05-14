import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Controller, type Control, type FieldErrors } from "react-hook-form";
import PropertyTypeList from "../../PropertyTypeList";
import type {
  CreatePropertyInput,
  PropertyType,
} from "@/features/host/properties/types";
import type { ReactNode } from "react";

type BasicTypeFieldProps = {
  propertyTypes: PropertyType[];
  control: Control<CreatePropertyInput>;
  errors: FieldErrors<CreatePropertyInput>;
  children: ReactNode;
};

export default function BasicTypeField({
  propertyTypes,
  control,
  errors,
  children,
}: BasicTypeFieldProps) {
  return (
    <Field>
      <FieldLabel>What type of property is this?</FieldLabel>
      <Controller
        name="propertyTypeId"
        control={control}
        render={({ field }) => (
          <PropertyTypeList
            items={propertyTypes}
            selectedType={field.value}
            onChange={field.onChange}
            className="grid grid-cols-2 gap-4 md:grid-cols-3"
          />
        )}
      />

      {children}

      {errors.propertyTypeId && (
        <FieldError>{errors.propertyTypeId.message}</FieldError>
      )}
    </Field>
  );
}
