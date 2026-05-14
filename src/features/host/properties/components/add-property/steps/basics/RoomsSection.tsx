import BasicInputField from "./BasicInputField";
import type { FieldErrors, UseFormRegister } from "react-hook-form";
import type { CreatePropertyInput } from "@/features/host/properties/types";

type RoomsSectionProps = {
  register: UseFormRegister<CreatePropertyInput>;
  errors: FieldErrors<CreatePropertyInput>;
};

export default function RoomsSection({ register, errors }: RoomsSectionProps) {
  return (
    <div>
      <h2 className="font-serif text-xl font-bold mb-2">Rooms</h2>
      <div className="grid gap-4 sm:grid-cols-2">
        <BasicInputField
          label="Bedrooms"
          id="bedrooms"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />

        <BasicInputField
          label="Beds"
          id="beds"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />

        <BasicInputField
          label="Bathrooms"
          id="bathrooms"
          placeholder="0"
          type="number"
          register={register}
          errors={errors}
        />
      </div>
    </div>
  );
}
