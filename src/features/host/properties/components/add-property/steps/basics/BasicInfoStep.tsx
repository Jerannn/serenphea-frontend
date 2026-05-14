import { FieldGroup } from "@/components/ui/field";
import type { CreatePropertyInput, PropertyType } from "../../../../types";
import { useForm } from "react-hook-form";
import { createPropertySchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderData, useSubmit } from "react-router-dom";
import { usePropertyStore } from "../../../../store/PropertyStore";
import BasicInputField from "./BasicInputField";
import BasicTypeField from "./BasicTypeField";
import BasicTypeDialog from "./BasicTypeDialog";
import OccupancySection from "./OccupancySection";
import RoomsSection from "./RoomsSection";

export default function BasicInfoStep() {
  const base = usePropertyStore((state) => state.property);
  const submit = useSubmit();
  const propertyTypes = (useLoaderData() as PropertyType[]) || [];
  const propertyTypeSlice = propertyTypes.slice(0, 6);

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      propertyTypeId: base.propertyTypeId,
      title: base.title,
      description: base.description,
      maxAdults: base.maxAdults,
      maxChildren: base.maxChildren,
      maxInfants: base.maxInfants,
      maxPets: base.maxPets,
      bedrooms: base.bedrooms,
      beds: base.beds,
      bathrooms: base.bathrooms,
    },
  });

  function onSubmit(data: CreatePropertyInput) {
    submit(data, { method: "post" });
  }

  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">
        Let&apos;s start with the basics
      </h1>
      <p className="mb-8 text-muted-foreground">
        Tell us about your property so guests can find it easily
      </p>

      <form onSubmit={handleSubmit(onSubmit)} id="basics-property-form">
        <FieldGroup>
          <BasicTypeField
            propertyTypes={propertyTypeSlice}
            control={control}
            errors={errors}
          >
            <BasicTypeDialog propertyTypes={propertyTypes} control={control} />
          </BasicTypeField>

          <BasicInputField
            label="Title"
            id="title"
            placeholder="e.g., Cozy beachfront apartment with ocean views"
            register={register}
            errors={errors}
          />

          <BasicInputField
            label="Description"
            id="description"
            placeholder="Describe what makes your property special. Include details about the space, nearby attractions, and what guests can expect..."
            register={register}
            errors={errors}
          />

          <OccupancySection register={register} errors={errors} />
          <RoomsSection register={register} errors={errors} />
        </FieldGroup>
      </form>
    </div>
  );
}
