import { Button } from "@/components/ui/button";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import { Check, Edit3 } from "lucide-react";

export default function AmenitiesSection() {
  const { amenities } = usePropertyStore((state) => state.property);
  const { goToSpecificStep } = usePropertyStepper();

  return (
    <section>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-semibold">What this place offers</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => goToSpecificStep(2)}
          className="text-primary hover:bg-primary/10"
        >
          <Edit3 className="mr-2 h-4 w-4" /> Edit
        </Button>
      </div>
      {amenities && amenities.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
          {amenities.slice(0, 10).map((amenity) => (
            <div
              key={amenity.id}
              className="flex items-center text-foreground font-medium"
            >
              <Check className="mr-3 h-5 w-5 text-muted-foreground" />
              {amenity.name}
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground italic">No amenities added.</p>
      )}
      {amenities && amenities.length > 10 && (
        <Button
          variant="outline"
          className="mt-6 font-semibold"
          onClick={() => goToSpecificStep(2)}
        >
          Show all {amenities.length} amenities
        </Button>
      )}
    </section>
  );
}
