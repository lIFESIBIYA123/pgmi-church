'use client'

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import Image from 'next/image';

interface ImageUploadProps {
  value: string;
  onChange: (value: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/uploads', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const data = await response.json();
      onChange(data.secure_url || data.url);
    } catch (error) {
      console.error('Error uploading image:', error);
      alert('Image upload failed.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <Label>Thumbnail</Label>
      <div className="mt-2 flex items-center space-x-4">
        {value ? (
          <div className="relative w-32 h-32 rounded-lg overflow-hidden">
            <Image src={value} alt="Thumbnail" layout="fill" objectFit="cover" />
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute top-1 right-1 h-6 w-6"
              onClick={() => onChange('')}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="w-32 h-32 rounded-lg border-2 border-dashed border-gray-300 flex items-center justify-center">
            <span className="text-sm text-gray-500">No image</span>
          </div>
        )}
        <div className="flex-1">
          <Input
            id="thumbnail-upload"
            type="file"
            accept="image/*"
            onChange={handleUpload}
            disabled={uploading}
            className="hidden"
          />
          <Button type="button" onClick={() => document.getElementById('thumbnail-upload')?.click()} disabled={uploading}>
            <Upload className="h-4 w-4 mr-2" />
            {uploading ? 'Uploading...' : 'Upload Image'}
          </Button>
          <p className="text-xs text-gray-500 mt-2">
            Recommended size: 1280x720px
          </p>
        </div>
      </div>
    </div>
  );
}
