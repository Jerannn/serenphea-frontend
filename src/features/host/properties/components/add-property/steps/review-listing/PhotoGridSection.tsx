import { Button } from "@/components/ui/button";
import usePropertyStepper from "@/features/host/properties/hooks/usePropertyStepper";
import { usePropertyStore } from "@/features/host/properties/store/PropertyStore";
import { Edit3 } from "lucide-react";

export default function PhotoGridSection() {
  const { images } = usePropertyStore((state) => state.property);
  const { goToSpecificStep } = usePropertyStepper();
  const coverImage = images?.find((img) => img.isCover) || images?.[0];
  const otherImages =
    images?.filter((img) => img.id !== coverImage?.id).slice(0, 4) || [];

  return (
    <div className="relative mb-8 sm:mb-12 flex flex-col gap-2 rounded-2xl overflow-hidden sm:h-100 md:h-125 sm:grid sm:grid-cols-4 sm:grid-rows-2 group">
      {coverImage ? (
        <div className="col-span-2 row-span-2 aspect-4/3 sm:aspect-auto sm:h-full relative overflow-hidden bg-muted">
          <img
            src={coverImage.url}
            alt="Cover"
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />
        </div>
      ) : (
        <div className="col-span-2 row-span-2 aspect-4/3 sm:aspect-auto sm:h-full bg-muted flex items-center justify-center border-border border-r border-b">
          <p className="text-muted-foreground">No cover photo</p>
        </div>
      )}

      {Array.from({ length: 4 }).map((_, idx) => {
        const img = otherImages[idx];
        return (
          <div
            key={img?.id || idx}
            className="hidden sm:block col-span-1 row-span-1 relative overflow-hidden bg-muted"
          >
            {img ? (
              <img
                src={img.url}
                alt={`Gallery ${idx + 1}`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="h-full w-full bg-muted/50 border-border border-l border-b" />
            )}
          </div>
        );
      })}

      <Button
        variant="secondary"
        size="sm"
        className="absolute bottom-4 right-4 shadow-md bg-white text-black hover:bg-gray-100 font-semibold"
        onClick={() => goToSpecificStep(3)}
      >
        <Edit3 className="mr-2 h-4 w-4" /> Edit Photos
      </Button>
    </div>
  );
}
