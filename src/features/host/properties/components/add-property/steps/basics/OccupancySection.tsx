import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreatePropertyInput } from "@/features/host/properties/types";
import FormInputField from "@/components/FormInputField";

type OccupancySectionProps = {
  register: UseFormRegister<CreatePropertyInput>;
  errors: FieldErrors<CreatePropertyInput>;
};

export default function OccupancySection({
  register,
  errors,
}: OccupancySectionProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold mb-2">Guests</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInputField<CreatePropertyInput>
          label="Max adults"
          id="maxAdults"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />

        <FormInputField<CreatePropertyInput>
          label="Max children"
          id="maxChildren"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />

        <FormInputField<CreatePropertyInput>
          label="Max infants"
          id="maxInfants"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />

        <FormInputField<CreatePropertyInput>
          label="Max pets"
          id="maxPets"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
