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
import { useState } from "react";
import PropertyTypeList from "../PropertyTypeList";
import type { CreatePropertyInput } from "../../../types";
import { Controller, useForm } from "react-hook-form";
import { createPropertySchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import StepNavigation from "../StepNavigation";
import { useNavigation, useSubmit } from "react-router-dom";
import { usePropertyStore } from "../../../store/PropertyStore";
import { is } from "date-fns/locale";

const initialPropertyTypes = [
  // 🏠 Residential
  {
    id: "03769940-8db1-4da2-9202-d44b1c9dd909",
    key: "house",
    type: "House",
    description: "A standalone residential home",
  },
  {
    id: "11111111-1111-1111-1111-111111111112",
    key: "apartment",
    type: "Apartment",
    description: "A private unit within a building",
  },
  {
    id: "11111111-1111-1111-1111-111111111113",
    key: "condo",
    type: "Condominium",
    description: "A privately owned unit in a complex",
  },
  {
    id: "11111111-1111-1111-1111-111111111114",
    key: "townhouse",
    type: "Townhouse",
    description: "A multi-floor home sharing walls with others",
  },
  {
    id: "11111111-1111-1111-1111-111111111115",
    key: "duplex",
    type: "Duplex",
    description: "A building divided into two separate homes",
  },

  // 🏝️ Vacation & Luxury
  {
    id: "22222222-2222-2222-2222-222222222221",
    key: "villa",
    type: "Villa",
    description: "A luxury residence, often with outdoor space",
  },
  {
    id: "22222222-2222-2222-2222-222222222222",
    key: "cabin",
    type: "Cabin",
    description: "A rustic retreat, usually in nature",
  },
  {
    id: "22222222-2222-2222-2222-222222222223",
    key: "cottage",
    type: "Cottage",
    description: "A small, cozy countryside home",
  },
  {
    id: "22222222-2222-2222-2222-222222222224",
    key: "bungalow",
    type: "Bungalow",
    description: "A single-story house, often with a veranda",
  },
  {
    id: "22222222-2222-2222-2222-222222222225",
    key: "chalet",
    type: "Chalet",
    description: "A wooden mountain home, often near ski resorts",
  },
  {
    id: "22222222-2222-2222-2222-222222222226",
    key: "beach_house",
    type: "Beach House",
    description: "A home located near the beach",
  },

  // 🏨 Hospitality
  {
    id: "33333333-3333-3333-3333-333333333331",
    key: "hotel",
    type: "Hotel",
    description: "A professionally managed lodging with rooms",
  },
  {
    id: "33333333-3333-3333-3333-333333333332",
    key: "boutique_hotel",
    type: "Boutique Hotel",
    description: "A small, stylish hotel with unique design",
  },
  {
    id: "33333333-3333-3333-3333-333333333333",
    key: "hostel",
    type: "Hostel",
    description: "Budget-friendly shared accommodations",
  },
  {
    id: "33333333-3333-3333-3333-333333333334",
    key: "guesthouse",
    type: "Guesthouse",
    description: "A small lodging, often owner-occupied",
  },
  {
    id: "33333333-3333-3333-3333-333333333335",
    key: "bed_and_breakfast",
    type: "Bed & Breakfast",
    description: "Accommodation with breakfast included",
  },
  {
    id: "33333333-3333-3333-3333-333333333336",
    key: "resort",
    type: "Resort",
    description: "A full-service property with amenities and activities",
  },

  // 🏙️ Unique Stays
  {
    id: "44444444-4444-4444-4444-444444444441",
    key: "loft",
    type: "Loft",
    description: "An open-plan living space, often industrial-style",
  },
  {
    id: "44444444-4444-4444-4444-444444444442",
    key: "studio",
    type: "Studio",
    description: "A compact space combining living and sleeping areas",
  },
  {
    id: "44444444-4444-4444-4444-444444444443",
    key: "tiny_home",
    type: "Tiny Home",
    description: "A very small, minimalist house",
  },
  {
    id: "44444444-4444-4444-4444-444444444444",
    key: "treehouse",
    type: "Treehouse",
    description: "A structure built among trees",
  },
  {
    id: "44444444-4444-4444-4444-444444444445",
    key: "boat",
    type: "Boat",
    description: "A stay on a boat or houseboat",
  },
  {
    id: "44444444-4444-4444-4444-444444444446",
    key: "camper_rv",
    type: "Camper / RV",
    description: "A mobile home or recreational vehicle",
  },
  {
    id: "44444444-4444-4444-4444-444444444447",
    key: "dome",
    type: "Dome",
    description: "A rounded structure, often eco-friendly",
  },
  {
    id: "44444444-4444-4444-4444-444444444448",
    key: "farm_stay",
    type: "Farm Stay",
    description: "Accommodation on a working farm",
  },

  // 🏢 Shared Spaces
  {
    id: "55555555-5555-5555-5555-555555555551",
    key: "private_room",
    type: "Private Room",
    description: "A private room within a shared property",
  },
  {
    id: "55555555-5555-5555-5555-555555555552",
    key: "shared_room",
    type: "Shared Room",
    description: "A shared sleeping space with others",
  },

  // 🏕️ Outdoor
  {
    id: "66666666-6666-6666-6666-666666666661",
    key: "campground",
    type: "Campground",
    description: "An outdoor area for camping",
  },
  {
    id: "66666666-6666-6666-6666-666666666662",
    key: "glamping",
    type: "Glamping",
    description: "Luxury camping with amenities",
  },
  {
    id: "66666666-6666-6666-6666-666666666663",
    key: "tent",
    type: "Tent",
    description: "A simple outdoor shelter for camping",
  },

  // 🏢 Commercial / Extended Stay
  {
    id: "77777777-7777-7777-7777-777777777771",
    key: "serviced_apartment",
    type: "Serviced Apartment",
    description: "Furnished apartment with hotel-like services",
  },
  {
    id: "77777777-7777-7777-7777-777777777772",
    key: "aparthotel",
    type: "Aparthotel",
    description: "A hybrid of apartment and hotel",
  },
];

export default function BasicInfoStep() {
  const [propertyTypes, setPropertyType] = useState(initialPropertyTypes);
  const propertyTypeSlice = propertyTypes.slice(0, 6);
  const base = usePropertyStore((state) => state.property.base);
  const submit = useSubmit();
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CreatePropertyInput>({
    resolver: zodResolver(createPropertySchema),
    defaultValues: {
      property_type_id: base.property_type_id,
      title: base.title,
      description: base.description,
      guests: base.guests,
      bedrooms: base.bedrooms,
      beds: base.beds,
      bathrooms: base.bathrooms,
    },
  });

  function onSubmit(data: CreatePropertyInput) {
    console.log(data);
    submit(data, { method: "post" });
  }

  return (
    <div className="container mx-auto px-4 lg:px-20 py-12">
      <h1 className="text-3xl font-serif font-bold ">
        Let's start with the basics
      </h1>
      <p className="text-muted-foreground mb-8">
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
              name="property_type_id"
              control={control}
              render={({ field }) => (
                <PropertyTypeList
                  items={propertyTypeSlice}
                  selectedType={field.value}
                  onChange={field.onChange}
                  className="grid grid-cols-2 md:grid-cols-3 gap-4"
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

                <DialogContent className="max-h-[85vh] w-full max-w-lg flex flex-col">
                  <DialogHeader>
                    <DialogTitle>Property Types</DialogTitle>
                    <DialogDescription>
                      This is a dialog with scrollable content.
                    </DialogDescription>
                  </DialogHeader>

                  <Controller
                    name="property_type_id"
                    control={control}
                    render={({ field }) => (
                      <PropertyTypeList
                        items={propertyTypes}
                        selectedType={field.value}
                        onChange={field.onChange}
                        className="flex-1 overflow-y-auto pr-2 space-y-2"
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
            {errors.property_type_id && (
              <FieldError>{errors.property_type_id.message}</FieldError>
            )}
          </Field>

          {/* title */}
          <Field>
            <FieldLabel htmlFor="title">Title</FieldLabel>
            <Input
              placeholder="e.g., Cozy beachfront apartment with ocean views"
              id="title"
              className="border-border bg-white"
              {...register("title")}
            />
            <FieldDescription>0/100 characters</FieldDescription>
            {errors.title && <FieldError>{errors.title.message}</FieldError>}
          </Field>

          {/* description */}
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

          {/* guests */}
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

          {/* bedrooms */}
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

          {/* beds */}
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

          {/* bathrooms */}
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
