import { useRef, useState, type ChangeEvent, type DragEvent } from "react";
import type { PropertyImage } from "../types";
import { ACCEPTED_IMAGE_TYPES } from "../lib/constants";
import { usePropertyStore } from "../store/PropertyStore";

type useDragProps = {
  syncFiles: (files: PropertyImage[]) => void;
};

export default function usePropertyImages({ syncFiles }: useDragProps) {
  const initialImages = usePropertyStore((state) => state.property.images);
  const [uploadedFiles, setUploadedFiles] =
    useState<PropertyImage[]>(initialImages);
  const [isDragging, setIsDragging] = useState(false);
  const [imageRemoveIds, setImageRemoveIds] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

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
    const files = e.dataTransfer?.files;
    if (files) {
      handleUploadedFiles(files);
    }
  };

  const handleUploadedFiles = (files: FileList) => {
    const fileList = Array.from(files);
    const validFiles = fileList.filter((file) =>
      ACCEPTED_IMAGE_TYPES.includes(file.type),
    );

    const newUploadedFiles = validFiles.map((file) => ({
      id: crypto.randomUUID(),
      url: URL.createObjectURL(file),
      isCover: false,
      publicId: "",
      file,
    }));

    setUploadedFiles((prev) => {
      const updatedFiles = [...prev, ...newUploadedFiles].map(
        (file, index) => ({
          ...file,
          isCover: index === 0,
        }),
      );

      const validFiles = updatedFiles.filter((file) => file.file);

      syncFiles(validFiles);
      return updatedFiles;
    });
  };

  const removeImage = (id: string) => {
    setUploadedFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id);

      return updatedFiles;
    });

    const removedImage = uploadedFiles.find((file) => file.id === id);

    if (removedImage) {
      syncFiles(uploadedFiles.filter((file) => file.id !== id && file.file));

      if (removedImage.publicId && !removedImage.file) {
        setImageRemoveIds((prev) => [...prev, removedImage.id]);
      }

      URL.revokeObjectURL(removedImage.url);
      if (fileInputRef.current?.value) fileInputRef.current.value = "";
    }

    if (removedImage?.file) {
      URL.revokeObjectURL(removedImage.url);
      if (fileInputRef.current?.value) {
        fileInputRef.current.value = "";
      }
    }
  };

  return {
    imageRemoveIds,
    uploadedFiles,
    isDragging,
    handleFileInput,
    handleDragOver,
    handleLeave,
    handleDrop,
    removeImage,
    fileInputRef,
  };
}
