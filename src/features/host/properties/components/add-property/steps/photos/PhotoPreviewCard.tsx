import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PropertyImage } from "@/features/host/properties/types";
import { X } from "lucide-react";

type PhotoPreviewCardProps = {
  file: PropertyImage;
  removeImage: (id: string) => void;
};

export default function PhotoPreviewCard({
  file,
  removeImage,
}: PhotoPreviewCardProps) {
  return (
    <div
      key={file.id}
      className="relative aspect-square rounded-xl overflow-hidden group border border-border/60 bg-white"
    >
      <img
        src={file.url}
        alt={`Image ${file.id}`}
        className="w-full h-full object-cover"
      />
      {file.isCover && (
        <Badge
          variant="secondary"
          className="absolute top-2 left-2 bg-accent text-foreground text-xs px-2 py-1 rounded-full"
        >
          Primary
        </Badge>
      )}
      <Button
        onClick={() => removeImage(file.id)}
        variant="ghost"
        type="button"
        className="absolute top-2 right-2 w-8 h-8 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer text-white bg-black/50"
      >
        <X className="w-4 h-4" />
      </Button>
    </div>
  );
}
