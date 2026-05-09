import { useState, type ChangeEvent, type DragEvent } from "react";
import type { PropertyImage } from "../types";
import { ACCEPTED_IMAGE_TYPES } from "../lib/constants";

type useDragProps = {
  syncFiles: (files: PropertyImage[]) => void;
};

export default function usePropertyImages({ syncFiles }: useDragProps) {
  const [uploadedFiles, setUploadedFiles] = useState<PropertyImage[]>([]);
  const [isDragging, setIsDragging] = useState(false);

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
      syncFiles(updatedFiles);
      return updatedFiles;
    });
  };

  const removeImage = (id: string) => {
    setUploadedFiles((prev) => {
      const updatedFiles = prev.filter((file) => file.id !== id);
      syncFiles(updatedFiles);

      return updatedFiles;
    });
  };

  return {
    uploadedFiles,
    isDragging,
    handleFileInput,
    handleDragOver,
    handleLeave,
    handleDrop,
    removeImage,
  };
}
