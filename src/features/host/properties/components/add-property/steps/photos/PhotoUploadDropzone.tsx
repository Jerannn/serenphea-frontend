import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";
import React from "react";

type PhotoUploadDropzoneProps = {
  handleFileInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  handleLeave: (e: React.DragEvent<HTMLDivElement>) => void;
  handleDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  isDragging: boolean;
  fileInutRef: React.RefObject<HTMLInputElement | null>;
};

export default function PhotoUploadDropzone({
  handleFileInput,
  handleDragOver,
  handleLeave,
  handleDrop,
  isDragging,
  fileInutRef,
}: PhotoUploadDropzoneProps) {
  return (
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
  );
}
