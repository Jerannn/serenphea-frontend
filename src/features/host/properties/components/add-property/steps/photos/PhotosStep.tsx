import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { PropertyImage } from "@/features/host/properties/types";
import { cn } from "@/lib/utils";
import { Bell, Upload, X } from "lucide-react";
import { useRef, useState, type ChangeEvent, type DragEvent } from "react";

const defaultImageFormats = ["image/jpeg", "image/png", "image/webp"];
const maxFiles = 5;

export default function PhotosStep() {
  const [uploadedFiles, setUploadedFiles] = useState<PropertyImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInutRef = useRef<HTMLInputElement>(null);

  const handleFileInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      handleUploadedFiles(files);
    }
  };

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleLeave = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    handleUploadedFiles(files);
  };

  const handleUploadedFiles = (files: FileList) => {
    const fileList = Array.from(files);
    const validFiles = fileList.filter((file) =>
      defaultImageFormats.includes(file.type),
    );

    const hasCover = uploadedFiles.some((file) => file.isCover === true);

    const newUploadedFiles = validFiles.map((file, index) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      isCover: !hasCover && index === 0 ? true : false,
      publicId: "",
    }));

    setUploadedFiles((prev) => [...prev, ...newUploadedFiles]);
  };

  const removeImage = (id: string) => {
    setUploadedFiles((prev) => prev.filter((file) => file.id !== id));
  };

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
        // onSubmit={handleSubmit(onSubmit)}
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
                <div className="relative aspect-square rounded-xl overflow-hidden group border border-border/60 bg-white">
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
