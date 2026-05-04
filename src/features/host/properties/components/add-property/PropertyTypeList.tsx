import {
  Field,
  FieldContent,
  FieldDescription,
  FieldLabel,
  FieldTitle,
} from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Home,
  Building2,
  Hotel,
  Warehouse,
  TreePine,
  Mountain,
  Waves,
  Tent,
  Caravan,
  Ship,
} from "lucide-react";
import type { PropertyTypes } from "../../types";

type PropertyTypeListProps = {
  items: PropertyTypes[];
  selectedType: string;
  onChange: (value: string) => void;
  className?: string;
};

const propertyTypeIcons = {
  house: Home,
  apartment: Building2,
  condo: Building2,
  townhouse: Building2,
  duplex: Building2,

  villa: Home,
  cabin: TreePine,
  cottage: Home,
  bungalow: Home,
  chalet: Mountain,
  beach_house: Waves,

  hotel: Hotel,
  boutique_hotel: Hotel,
  hostel: Hotel,
  guesthouse: Home,
  bed_and_breakfast: Home,
  resort: Hotel,

  loft: Warehouse,
  studio: Building2,
  tiny_home: Home,
  treehouse: TreePine,
  boat: Ship,
  camper_rv: Caravan,
  dome: Home,
  farm_stay: Home,

  private_room: Home,
  shared_room: Home,

  campground: Tent,
  glamping: Tent,
  tent: Tent,

  serviced_apartment: Building2,
  aparthotel: Building2,
};

export default function PropertyTypeList({
  items,
  selectedType,
  onChange,
  className,
}: PropertyTypeListProps) {
  return (
    <RadioGroup
      value={selectedType}
      onValueChange={onChange}
      className={className}
    >
      {items.map(({ id, key, type, description }) => {
        const Icon =
          propertyTypeIcons[
            key.toLowerCase() as keyof typeof propertyTypeIcons
          ] || Hotel;

        return (
          <FieldLabel
            htmlFor={id}
            key={id}
            className={`transition ${
              selectedType === id ? "bg-muted" : "bg-white"
            }`}
          >
            <Field orientation="horizontal" style={{ alignItems: "center" }}>
              <Icon className="w-5 h-5 text-muted-foreground" />
              <FieldContent className="gap-0">
                <FieldTitle className="font-semibold text-card-foreground">
                  {type}
                </FieldTitle>
                <FieldDescription className="text-xs text-muted-foreground">
                  {description}
                </FieldDescription>
              </FieldContent>
              <RadioGroupItem
                value={id}
                id={id}
                className="border-border bg-background"
              />
            </Field>
          </FieldLabel>
        );
      })}
    </RadioGroup>
  );
}
