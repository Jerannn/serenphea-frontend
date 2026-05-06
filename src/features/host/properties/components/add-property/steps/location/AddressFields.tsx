import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type UseFormRegister, type FieldErrors } from "react-hook-form";
import { type LocationFormValues } from "../../../../hooks/useLocationForm";

interface AddressFieldsProps {
  register: UseFormRegister<LocationFormValues>;
  errors: FieldErrors<LocationFormValues>;
}

export function AddressFields({ register, errors }: AddressFieldsProps) {
  return (
    <div className="grid gap-4 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="line-street">Street</FieldLabel>
        <Input
          id="line-street"
          {...register("street")}
          className="border-border bg-white"
          autoComplete="address-line1"
        />
        <FieldError errors={[errors.street]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="line-city">City / town</FieldLabel>
        <Input
          id="line-city"
          {...register("city")}
          className="border-border bg-white"
          autoComplete="address-level2"
        />
        <FieldError errors={[errors.city]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="line-region">State / region</FieldLabel>
        <Input
          id="line-region"
          {...register("region")}
          className="border-border bg-white"
          autoComplete="address-level1"
        />
        <FieldError errors={[errors.region]} />
      </Field>
      <Field>
        <FieldLabel htmlFor="line-postcode">Postal code</FieldLabel>
        <Input
          id="line-postcode"
          {...register("postcode")}
          className="border-border bg-white"
          autoComplete="postal-code"
        />
        <FieldError errors={[errors.postcode]} />
      </Field>
      <Field className="sm:col-span-2">
        <FieldLabel htmlFor="line-country">Country</FieldLabel>
        <Input
          id="line-country"
          {...register("country")}
          className="border-border bg-white"
          autoComplete="country-name"
        />
        <FieldError errors={[errors.country]} />
      </Field>
    </div>
  );
}
