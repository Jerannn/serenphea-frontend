import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import { Bath, BedDouble, Users } from "lucide-react";

export default function StatsSection() {
  const { maxAdults, maxChildren, bedrooms, beds, bathrooms } =
    usePropertyStore((state) => state.property);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">Entire place hosted by You</h3>
      </div>
      <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-muted-foreground text-sm sm:text-base">
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <Users className="h-4 w-4" /> {maxAdults + maxChildren} guests
        </span>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <BedDouble className="h-4 w-4" /> {bedrooms} bedrooms
        </span>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <BedDouble className="h-4 w-4" /> {beds} beds
        </span>
        <span className="hidden sm:inline text-muted-foreground/30">•</span>
        <span className="flex items-center gap-1.5 whitespace-nowrap">
          <Bath className="h-4 w-4" /> {bathrooms} baths
        </span>
      </div>
    </section>
  );
}
