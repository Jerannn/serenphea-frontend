import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import Map from "../../Map";

export default function LocationStep() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">
        Where's your property located?
      </h1>
      <p className="mb-8 text-muted-foreground">
        Guests will only get your exact address after they've made a reservation
      </p>

      <form
        // onSubmit={handleSubmit(onSubmit)}
        id="basic-property-form"
        className="mb-10"
      >
        <FieldGroup>
          {/* address */}
          <Field>
            <FieldLabel htmlFor="address">Address</FieldLabel>
            <Input
              id="address"
              type="text"
              placeholder="123 Main Street"
              className="border-border bg-white"
            />
            {/* <FieldError>City is required</FieldError> */}
          </Field>

          {/* city */}
          <Field>
            <FieldLabel htmlFor="city">City</FieldLabel>
            <Input
              id="city"
              type="text"
              placeholder="San Francisco"
              className="border-border bg-white"
            />
            {/* <FieldError>City is required</FieldError> */}
          </Field>

          {/* state */}
          <Field>
            <FieldLabel htmlFor="state">State / Province</FieldLabel>
            <Input
              id="state"
              type="text"
              placeholder="California"
              className="border-border bg-white"
            />
            {/* <FieldError>City is required</FieldError> */}
          </Field>

          <Field>
            <FieldLabel htmlFor="country">Country</FieldLabel>
            <Input
              id="country"
              type="text"
              placeholder="United States"
              className="border-border bg-white"
            />
            {/* <FieldError>City is required</FieldError> */}
          </Field>
        </FieldGroup>

        <Map />
      </form>
    </div>
  );
}
