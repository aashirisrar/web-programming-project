"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Upload, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export const ImageUpload = ({ value, onChange }: ImageUploadProps) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleFileChange = useCallback(
    async (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (!file) return;

      // Validate file type
      if (!file.type.startsWith('image/')) {
        toast.error('Please select an image file');
        return;
      }

      // Validate file size (5MB limit)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('File size must be less than 5MB');
        return;
      }

      try {
        setIsUploading(true);
        
        const formData = new FormData();
        formData.append('file', file);

        const response = await fetch('/api/s3-upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Upload failed');
        }

        const { url } = await response.json();
        onChange(url);
        toast.success('Image uploaded successfully');
      } catch (error: any) {
        console.error('Upload error:', error);
        toast.error(error.message || 'Failed to upload image');
      } finally {
        setIsUploading(false);
      }
    },
    [onChange]
  );

  // Handle removing the image
  const handleRemove = useCallback(() => {
    onChange("");
  }, [onChange]);

  return (
    <div className="space-y-4">
      {value ? (
        <div className="flex flex-col items-center gap-4">
          <div className="relative w-32 h-32 overflow-hidden rounded-full">
            <Image
              src={value}
              alt="Profile image"
              fill
              style={{ objectFit: "cover" }}
              className="rounded-full"
            />
          </div>
          <Button
            onClick={handleRemove}
            type="button"
            variant="destructive"
            size="sm"
          >
            <Trash2 className="mr-2 h-4 w-4" />
            Remove Image
          </Button>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-md p-8 cursor-pointer hover:border-gray-400 transition">
          <Upload className="h-10 w-10 text-gray-400" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400 mb-4">
            Click to upload an image
          </p>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id="image-upload"
          />
          <Button
            type="button"
            variant="outline"
            disabled={isUploading}
            onClick={() => document.getElementById('image-upload')?.click()}
          >
            {isUploading ? 'Uploading...' : 'Choose File'}
          </Button>
        </div>
      )}
    </div>
  );
};
