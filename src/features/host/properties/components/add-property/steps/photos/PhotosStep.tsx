import usePropertyImages from "@/features/host/properties/hooks/usePropertyImages";
import type {
  PhotosInput,
  PropertyImage,
} from "@/features/host/properties/types";
import { photosSchema } from "@/shared/schema/properties-schema";
import type { ErrorResponse } from "@/shared/types/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useSubmit } from "react-router-dom";
import { toast } from "sonner";
import PhotoUploadDropzone from "./PhotoUploadDropzone";
import PhotoPreviewGrid from "./PhotoPreviewGrid";

export default function PhotosStep() {
  const submit = useSubmit();
  const errorResponse = useActionData<ErrorResponse>();
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
    const formData = new FormData();

    data.images.forEach((image) => formData.append("images", image));

    submit(formData, { method: "put", encType: "multipart/form-data" });
  };

  useEffect(() => {
    if (errors.images) {
      toast.error("Upload failed", {
        description: errors.images.message,
        className: "bg-destructive text-white border-destructive",
      });
    }
    if (errorResponse?.status === "fail") {
      toast.error("Upload failed", {
        description: errorResponse.message,
        className: "bg-destructive text-white border-destructive",
      });
    }
  }, [errors.images, errorResponse]);

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
        <PhotoUploadDropzone
          handleFileInput={handleFileInput}
          handleDragOver={handleDragOver}
          handleLeave={handleLeave}
          handleDrop={handleDrop}
          isDragging={isDragging}
          fileInutRef={fileInutRef}
        />

        <PhotoPreviewGrid
          uploadedFiles={uploadedFiles}
          removeImage={removeImage}
        />
      </form>
    </div>
  );
}
