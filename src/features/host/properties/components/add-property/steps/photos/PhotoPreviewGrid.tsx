import type { PropertyImage } from "@/features/host/properties/types";
import { Bell } from "lucide-react";
import PhotoPreviewCard from "./PhotoPreviewCard";

type PhotoPreviewGridProps = {
  uploadedFiles: PropertyImage[];
  removeImage: (id: string) => void;
};

export default function PhotoPreviewGrid({
  uploadedFiles,
  removeImage,
}: PhotoPreviewGridProps) {
  if (uploadedFiles.length === 0) return null;

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-medium text-foreground">
          Uploaded images ({uploadedFiles.length}/{20})
        </p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {uploadedFiles.map((file) => (
          <PhotoPreviewCard
            key={file.id}
            file={file}
            removeImage={removeImage}
          />
        ))}
      </div>

      <p className="text-xs mt-4 text-muted-foreground">
        <Bell className="inline w-4 h-4" /> Tip: The first image will be used as
        the primary photo for your listing
      </p>
    </div>
  );
}
