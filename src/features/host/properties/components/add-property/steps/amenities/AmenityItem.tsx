import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import type { Amenity, AmenityInput } from "@/features/host/properties/types";
import {
  Wifi,
  AirVent,
  Tv,
  Bath,
  CookingPot,
  Waves,
  Dumbbell,
  Car,
  Shield,
  PawPrint,
  Utensils,
  Baby,
  Briefcase,
  TreePalm,
  Flame,
  Accessibility,
  Sparkles,
  WashingMachine,
  Fan,
  ThermometerSun,
  type LucideIcon,
} from "lucide-react";

const amenityIcons: Record<string, LucideIcon> = {
  wifi: Wifi,
  fast_wifi: Wifi,
  air_conditioning: AirVent,
  tv: Tv,
  smart_tv: Tv,
  netflix: Tv,
  bathtub: Bath,
  shower: Bath,
  kitchen: CookingPot,
  microwave: CookingPot,
  oven: CookingPot,
  pool: Waves,
  gym: Dumbbell,
  free_parking: Car,
  paid_parking: Car,
  smoke_alarm: Shield,
  security_cameras: Shield,
  pets_allowed: PawPrint,
  pet_friendly: PawPrint,
  breakfast: Utensils,
  crib: Baby,
  workspace: Briefcase,
  garden: TreePalm,
  bbq_grill: Flame,
  wheelchair_accessible: Accessibility,
  washer: WashingMachine,
  fan: Fan,
  heating: ThermometerSun,
};

type AmenitiesListProps = {
  amenity: Amenity;
  selectedAmenityIds: AmenityInput["amenityIds"];
  onChange: (amenityId: string, checked: boolean) => void;
};

export default function AmenityItem({
  amenity,
  selectedAmenityIds,
  onChange,
}: AmenitiesListProps) {
  const Icon = amenityIcons[amenity.key] || Sparkles;
  const isChecked = selectedAmenityIds.includes(amenity.id);

  return (
    <FieldLabel
      key={amenity.id}
      htmlFor={amenity.id}
      className="
          group cursor-pointer rounded-xl border
          border-border bg-background p-4
          transition-all duration-200
          hover:border-primary/30
          hover:bg-muted/40
          hover:shadow-sm
          has-data-[state=checked]:border-primary
          has-data-[state=checked]:bg-primary/5
        "
    >
      <Field
        orientation="horizontal"
        className="items-start justify-between gap-4"
      >
        <div
          className="
              flex size-10 shrink-0 items-center justify-center
              rounded-lg bg-muted
              text-muted-foreground
              transition-colors
              group-has-data-[state=checked]:bg-primary/10
              group-has-data-[state=checked]:text-primary
            "
        >
          <Icon className="size-5" />
        </div>
        <FieldContent className="space-y-1">
          <FieldTitle className="text-sm font-medium leading-none text-foreground">
            {amenity.name}
          </FieldTitle>

          <FieldDescription className="text-xs text-muted-foreground">
            Available for guests
          </FieldDescription>
        </FieldContent>

        <Checkbox
          id={amenity.id}
          name={amenity.id}
          checked={isChecked}
          className="border-border bg-white"
          onCheckedChange={(checked) =>
            onChange(amenity.id, checked as boolean)
          }
        />
      </Field>
    </FieldLabel>
  );
}
