import { Button } from "@/components/ui/button";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import { Edit3, MapPin } from "lucide-react";

export default function HeaderSection() {
  const { title, location } = usePropertyStore((state) => state.property);
  const { goToSpecificStep } = usePropertyStepper();

  return (
    <div className="flex flex-col sm:flex-row sm:items-start justify-between mt-8 mb-4 gap-4">
      <div>
        <h2 className="text-2xl font-semibold text-foreground">
          {title || "Untitled Property"}
        </h2>
        {location && (
          <div className="flex items-center text-muted-foreground mt-2 font-medium">
            <MapPin className="mr-1 h-4 w-4" />
            {location.street}, {location.city}, {location.country}
          </div>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => goToSpecificStep(0)}
        className="text-primary hover:bg-primary/10"
      >
        <Edit3 className="mr-2 h-4 w-4" /> Edit basic info
      </Button>
    </div>
  );
}
