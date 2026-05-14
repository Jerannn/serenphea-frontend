import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type LocationFormValues } from "../../../../hooks/useLocationForm";
import FormInputField from "@/components/FormInputField";

interface AddressFieldsProps {
  register: UseFormRegister<LocationFormValues>;
  errors: FieldErrors<LocationFormValues>;
}

export function AddressFields({ register, errors }: AddressFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <FormInputField<LocationFormValues>
        label="Street"
        id="street"
        register={register}
        errors={errors}
      />

      <FormInputField<LocationFormValues>
        label="City / town"
        id="city"
        register={register}
        errors={errors}
      />

      <FormInputField<LocationFormValues>
        label="State / region"
        id="region"
        register={register}
        errors={errors}
      />

      <FormInputField<LocationFormValues>
        label="Postal code"
        id="postcode"
        register={register}
        errors={errors}
      />

      <div className="sm:col-span-2">
        <FormInputField<LocationFormValues>
          label="Country"
          id="country"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
