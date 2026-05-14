import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreatePropertyInput } from "@/features/host/properties/types";
import FormInputField from "@/components/FormInputField";

type RoomsSectionProps = {
  register: UseFormRegister<CreatePropertyInput>;
  errors: FieldErrors<CreatePropertyInput>;
};

export default function RoomsSection({ register, errors }: RoomsSectionProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold mb-2">Rooms</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <FormInputField<CreatePropertyInput>
          label="Bedrooms"
          id="bedrooms"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />

        <FormInputField<CreatePropertyInput>
          label="Beds"
          id="beds"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />

        <FormInputField<CreatePropertyInput>
          label="Bathrooms"
          id="bathrooms"
          type="number"
          placeholder="0"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
