import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import type { CreatePropertyInput, PropertyType } from "../../../../types";
import { useForm } from "react-hook-form";
import { createPropertySchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLoaderData, useSubmit } from "react-router-dom";
import { usePropertyStore } from "../../../../store/PropertyStore";
import BasicTypeField from "./BasicTypeField";
import BasicTypeDialog from "./BasicTypeDialog";
import OccupancySection from "./OccupancySection";
import RoomsSection from "./RoomsSection";
import FormInputField from "@/components/FormInputField";
import { Textarea } from "@/components/ui/textarea";
import PropertyStepLayout from "../../PropertyStepLayout";

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
    <PropertyStepLayout
      title="Let's start with the basics"
      description="Tell us about your property so guests can find it easily"
    >
      <form onSubmit={handleSubmit(onSubmit)} id="basics-property-form">
        <FieldGroup>
          <BasicTypeField
            propertyTypes={propertyTypeSlice}
            control={control}
            errors={errors}
          >
            <BasicTypeDialog propertyTypes={propertyTypes} control={control} />
          </BasicTypeField>

          <FormInputField<CreatePropertyInput>
            label="Title"
            id="title"
            type="text"
            placeholder="e.g., Cozy beachfront apartment with ocean views"
            register={register}
            errors={errors}
          />

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              id="description"
              placeholder="Describe what makes your property special. Include details about the space, nearby attractions, and what guests can expect..."
              className="bg-white border-border"
              {...register("description")}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <OccupancySection register={register} errors={errors} />
          <RoomsSection register={register} errors={errors} />
        </FieldGroup>
      </form>
    </PropertyStepLayout>
  );
}
