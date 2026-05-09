import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import usePropertyImages from "@/features/host/properties/hooks/usePropertyImages";
import {
  ACCEPTED_IMAGE_TYPES,
  MIN_IMAGES,
} from "@/features/host/properties/lib/constants";
import type {
  PhotosInput,
  PropertyImage,
} from "@/features/host/properties/types";
import { cn } from "@/lib/utils";
import { photosSchema } from "@/shared/schema/properties-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Bell, Upload, X } from "lucide-react";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export default function PhotosStep() {
  const fileInutRef = useRef<HTMLInputElement>(null);

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhotosInput>({
    resolver: zodResolver(photosSchema),
    defaultValues: { images: [] },
  });

  const {
    uploadedFiles,
    isDragging,
    handleFileInput,
    handleDragOver,
    handleLeave,
    handleDrop,
    removeImage,
  } = usePropertyImages({ syncFiles });

  function syncFiles(files: PropertyImage[]) {
    setValue(
      "images",
      files.map((file) => file.file!),
    );
  }

  const onSubmit = (data: PhotosInput) => {
    console.log(data);
  };

  useEffect(() => {
    if (errors.images) {
      toast.error("Upload failed", {
        description: errors.images.message,
        className: "bg-destructive text-white border-destructive",
      });
    }
  }, [errors.images]);

  return (
    <div className="container mx-auto px-4 py-12 lg:px-20">
      <h1 className="font-serif text-3xl font-bold">
        Add photos of your property
      </h1>
      <p className="mb-8 text-muted-foreground">
        Great photos help your listing stand out. Upload at least 5 high-quality
        images.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        id="photos-property-form"
        className="space-y-10"
      >
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleLeave}
          onDrop={handleDrop}
          onClick={() => fileInutRef.current?.click()}
          className={cn(
            "relative cursor-pointer transition-all duration-300 flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-2xl bg-card p-8 ",
            isDragging
              ? "bg-accent/10 border-accent"
              : "border-border hover:bg-background hover:border-primary/30",
          )}
        >
          <input
            type="file"
            name="images"
            id="images"
            multiple
            ref={fileInutRef}
            onChange={handleFileInput}
            className="hidden"
          />

          <div className="text-center">
            <div
              className={cn(
                "w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center",
                isDragging ? "bg-accent/10" : "bg-primary/10",
              )}
            >
              <Upload
                className={cn(
                  "w-8 h-8",
                  isDragging ? "text-accent" : "text-primary",
                )}
              />
            </div>

            <h3 className="text-lg mb-2 font-serif font-semibold text-foreground">
              {isDragging ? "Drop your images here" : "Upload property photos"}
            </h3>

            <p className="text-sm mb-4 text-muted-foreground">
              Drag and drop or click to browse
            </p>

            <p className="text-xs text-muted-foreground">
              JPG, PNG or WebP • Max {20} images • Up to 10MB each
            </p>
          </div>
        </div>

        {uploadedFiles.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-medium text-foreground">
                Uploaded images ({uploadedFiles.length}/{20})
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {uploadedFiles.map((file) => (
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
              ))}
            </div>

            <p className="text-xs mt-4 text-muted-foreground">
              <Bell className="inline w-4 h-4" /> Tip: The first image will be
              used as the primary photo for your listing
            </p>
          </div>
        )}
      </form>
    </div>
  );
}
