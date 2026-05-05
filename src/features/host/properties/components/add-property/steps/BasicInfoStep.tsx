import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import PropertyTypeList from "../PropertyTypeList";
import type { CreatePropertyInput, PropertyType } from "../../../types";
import { Controller, useForm } from "react-hook-form";
import { createPropertySchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import StepNavigation from "../StepNavigation";
import { useLoaderData, useNavigation, useSubmit } from "react-router-dom";
import { usePropertyStore } from "../../../store/PropertyStore";

export default function BasicInfoStep() {
  const base = usePropertyStore((state) => state.property);
  const submit = useSubmit();
  const propertyTypes = (useLoaderData() as PropertyType[]) || [];
  const navigation = useNavigation();
  const propertyTypeSlice = propertyTypes.slice(0, 6);
  const isSubmitting = navigation.state === "submitting";

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
      guests: base.guests,
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

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="basic-property-form"
        className="mb-10"
      >
        <FieldGroup>
          <Field>
            <FieldLabel>What type of property is this?</FieldLabel>
            <Controller
              name="propertyTypeId"
              control={control}
              render={({ field }) => (
                <PropertyTypeList
                  items={propertyTypeSlice}
                  selectedType={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 gap-4 md:grid-cols-3"
                />
              )}
            />

            <div className="flex justify-end">
              <Dialog>
                <DialogTrigger asChild>
                  <Button type="button" variant="link" size="sm">
                    See more
                  </Button>
                </DialogTrigger>

                <DialogContent className="flex max-h-[85vh] w-full max-w-lg flex-col">
                  <DialogHeader>
                    <DialogTitle>Property Types</DialogTitle>
                    <DialogDescription>
                      This is a dialog with scrollable content.
                    </DialogDescription>
                  </DialogHeader>

                  <Controller
                    name="propertyTypeId"
                    control={control}
                    render={({ field }) => (
                      <PropertyTypeList
                        items={propertyTypes}
                        selectedType={field.value}
                        onChange={field.onChange}
                        className="flex-1 space-y-2 overflow-y-auto pr-2"
                      />
                    )}
                  />

                  <DialogFooter>
                    <DialogClose asChild>
                      <Button variant="outline">Close</Button>
                    </DialogClose>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
            {errors.propertyTypeId && (
              <FieldError>{errors.propertyTypeId.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              placeholder="e.g., Cozy beachfront apartment with ocean views"
              id="title"
              type="text"
              className="border-border bg-white"
              {...register("title")}
            />
            <FieldDescription>0/100 characters</FieldDescription>
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="description">Description</FieldLabel>
            <Textarea
              placeholder="Describe what makes your property special. Include details about the space, nearby attractions, and what guests can expect..."
              id="description"
              className="border-border bg-white"
              {...register("description")}
            />
            {errors.description && (
              <FieldError>{errors.description.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="guests">Guests</FieldLabel>
            <Input
              type="number"
              placeholder="0"
              id="guests"
              className="border-border bg-white"
              {...register("guests", { valueAsNumber: true })}
            />
            {errors.guests && <FieldError>{errors.guests.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="bedrooms">Bedrooms</FieldLabel>
            <Input
              type="number"
              placeholder="0"
              id="bedrooms"
              className="border-border bg-white"
              {...register("bedrooms", { valueAsNumber: true })}
            />
            {errors.bedrooms && (
              <FieldError>{errors.bedrooms.message}</FieldError>
            )}
          </Field>

          <Field>
            <FieldLabel htmlFor="beds">Beds</FieldLabel>
            <Input
              type="number"
              placeholder="0"
              id="beds"
              className="border-border bg-white"
              {...register("beds", { valueAsNumber: true })}
            />
            {errors.beds && <FieldError>{errors.beds.message}</FieldError>}
          </Field>

          <Field>
            <FieldLabel htmlFor="bathrooms">Bathrooms</FieldLabel>
            <Input
              type="number"
              placeholder="0"
              id="bathrooms"
              className="border-border bg-white"
              {...register("bathrooms", { valueAsNumber: true })}
            />
            {errors.bathrooms && (
              <FieldError>{errors.bathrooms.message}</FieldError>
            )}
          </Field>
        </FieldGroup>
      </form>

      <StepNavigation
        onNext={() => {}}
        typeAction="basic-property-form"
        isSubmitting={isSubmitting}
      />
    </div>
  );
}
