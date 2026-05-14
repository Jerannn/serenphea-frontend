export default function BookingSettingsStep() {
  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">Booking settings</h1>
      <p className="mb-8 text-muted-foreground">
        Set your preferences for how guests can book your property
      </p>

      <form
        //   onSubmit={handleSubmit(onSubmit)}
        id="settings-property-form"
        className="flex items-start gap-8"
      ></form>
    </div>
  );
}
