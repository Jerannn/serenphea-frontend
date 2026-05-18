import FormInputField from "@/components/FormInputField";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { Switch } from "@/components/ui/switch";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import type { BookingSettingsInput } from "@/features/host/properties/types";
import { bookingSettingsSchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Clock4, Zap } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { useSubmit } from "react-router-dom";
import PropertyStepLayout from "../../PropertyStepLayout";

export default function BookingSettingsStep() {
  const submit = useSubmit();
  const bookingSettings = usePropertyStore(
    (state) => state.property.bookingSettings,
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<BookingSettingsInput>({
    resolver: zodResolver(bookingSettingsSchema),
    defaultValues: {
      checkInTime: bookingSettings?.checkInTime ?? "00:00",
      checkOutTime: bookingSettings?.checkOutTime ?? "00:00",
      minNights: bookingSettings?.minNights ?? 0,
      maxNights: bookingSettings?.maxNights ?? 0,
      instantBook: bookingSettings?.instantBook ?? false,
    },
  });

  const onSubmit = (data: BookingSettingsInput) => {
    submit(data, { method: "put" });
  };

  return (
    <PropertyStepLayout
      title="Booking settings"
      description="Set your preferences for how guests can book your property"
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        id="settings-property-form"
        className="flex items-start gap-8"
      >
        <FieldGroup className="max-w-md w-full">
          <FormInputField<BookingSettingsInput>
            label="Check-in time"
            id="checkInTime"
            type="time"
            register={register}
            errors={errors}
            icon={Clock4}
          />

          <FormInputField<BookingSettingsInput>
            label="Check-out time"
            id="checkOutTime"
            type="time"
            register={register}
            errors={errors}
            icon={Clock4}
          />

          <FormInputField<BookingSettingsInput>
            label="Min. nights"
            id="minNights"
            type="number"
            register={register}
            errors={errors}
          />

          <FormInputField<BookingSettingsInput>
            label="Max. nights"
            id="maxNights"
            type="number"
            register={register}
            errors={errors}
          />

          <Field>
            <FieldLabel htmlFor="switch-instant-book">
              <Field orientation="horizontal" className="gap-4 items-center!">
                <div className="flex size-10 items-center justify-center rounded-full bg-primary/10">
                  <Zap className="size-5 text-primary" />
                </div>

                <FieldContent className="flex-1">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <FieldTitle>Instant Book</FieldTitle>

                      <FieldDescription>
                        Allow guests to book instantly without requiring
                        approval.
                      </FieldDescription>
                    </div>

                    <Controller
                      name="instantBook"
                      control={control}
                      render={({ field }) => (
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {field.value ? "Enabled" : "Disabled"}
                          </span>

                          <Switch
                            id="switch-instant-book"
                            onCheckedChange={field.onChange}
                            checked={field.value}
                          />
                        </div>
                      )}
                    />
                  </div>
                </FieldContent>
              </Field>
            </FieldLabel>
          </Field>
        </FieldGroup>
      </form>
    </PropertyStepLayout>
  );
}
