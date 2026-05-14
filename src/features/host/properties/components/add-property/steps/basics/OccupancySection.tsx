import BasicInputField from "./BasicInputField";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreatePropertyInput } from "@/features/host/properties/types";

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
        <BasicInputField
          label="Max adults"
          id="maxAdults"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />

        <BasicInputField
          label="Max children"
          id="maxChildren"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />

        <BasicInputField
          label="Max infants"
          id="maxInfants"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />

        <BasicInputField
          label="Max pets"
          id="maxPets"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
