import usePropertyImages from "@/features/host/properties/hooks/usePropertyImages";
import type {
  PhotosInput,
  PropertyImage,
} from "@/features/host/properties/types";
import { photosSchema } from "@/shared/schema/properties-schema";
import type { ErrorResponse } from "@/shared/types/response-types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useActionData, useSubmit } from "react-router-dom";
import { toast } from "sonner";
import PhotoUploadDropzone from "./PhotoUploadDropzone";
import PhotoPreviewGrid from "./PhotoPreviewGrid";
import PropertyStepLayout from "../../PropertyStepLayout";

export default function PhotosStep() {
  const submit = useSubmit();
  const errorResponse = useActionData<ErrorResponse>();

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<PhotosInput>({
    resolver: zodResolver(photosSchema),
    defaultValues: { images: [] },
  });

  const {
    imageRemoveIds,
    uploadedFiles,
    isDragging,
    handleFileInput,
    handleDragOver,
    handleLeave,
    handleDrop,
    removeImage,
    fileInputRef,
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

    imageRemoveIds.forEach((id) => {
      formData.append("imageRemoveIds[]", id);
    });

    submit(formData, { method: "put", encType: "multipart/form-data" });
  };

  useEffect(() => {
    if (errors.images) {
      toast.error("Upload failed", {
        description: errors.images.message,
      });
    }
    if (errorResponse?.status === "fail") {
      toast.error("Upload failed", {
        description: errorResponse.message,
      });
    }
  }, [errors.images, errorResponse]);

  return (
    <PropertyStepLayout
      title="Add photos of your property"
      description="Great photos help your listing stand out. Upload at least 5 high-quality
        images."
    >
      <form onSubmit={handleSubmit(onSubmit)} id="photos-property-form">
        <PhotoUploadDropzone
          handleFileInput={handleFileInput}
          handleDragOver={handleDragOver}
          handleLeave={handleLeave}
          handleDrop={handleDrop}
          isDragging={isDragging}
          fileInputRef={fileInputRef}
        />

        <PhotoPreviewGrid
          uploadedFiles={uploadedFiles}
          removeImage={removeImage}
        />
      </form>
    </PropertyStepLayout>
  );
}
