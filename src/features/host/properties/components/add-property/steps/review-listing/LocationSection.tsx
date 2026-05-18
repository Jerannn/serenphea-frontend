import { Button } from "@/components/ui/button";
import { Edit3 } from "lucide-react";
import Map from "../../../Map";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";

export default function LocationSection() {
  const { location } = usePropertyStore((state) => state.property);
  const { goToSpecificStep } = usePropertyStepper();

  const mapCenter =
    location?.latitude && location?.longitude
      ? { lat: location.latitude, lng: location.longitude }
      : { lat: 40.7128, lng: -74.006 };

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">Where you'll be</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToSpecificStep(1)}
          className="text-primary hover:bg-primary/10"
        >
          <Edit3 className="mr-2 h-4 w-4" /> Edit
        </Button>
      </div>
      {location ? (
        <>
          <p className="text-muted-foreground mb-4 font-medium">
            {location.street} {location.city}, {location.region},{" "}
            {location.country}
          </p>
          <div className="h-64 sm:h-80 w-full rounded-2xl overflow-hidden border border-border/50 shadow-sm relative z-0">
            <Map
              center={mapCenter}
              zoom={14}
              markerPosition={mapCenter}
              markerDraggable={false}
              className="h-full w-full z-0"
            />
          </div>
        </>
      ) : (
        <p className="text-muted-foreground italic">Location not specified.</p>
      )}
    </section>
  );
}
