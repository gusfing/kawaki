import { useState, useRef } from 'react';
import { useApiMutation } from '../../hooks/useApi.js';
import { Upload, Trash2, Copy } from 'lucide-react';

interface UploadedImage {
  id: string;
  filename: string;
  url: string;
  size: number;
  uploadedAt: string;
}

interface ImageUploaderProps {
  onImageUpload?: (image: UploadedImage) => void;
  blogId?: string;
  pageId?: string;
}

export function ImageUploader({ onImageUpload, blogId, pageId }: ImageUploaderProps) {
  const [uploadedImages, setUploadedImages] = useState<UploadedImage[]>([]);
  const [copied, setCopied] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { mutate: uploadImage, loading, error } = useApiMutation<FormData, UploadedImage>(
    '/uploads/images',
    'POST'
  );

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    for (const file of Array.from(files)) {
      const formData = new FormData();
      formData.append('file', file);
      if (blogId) formData.append('blogId', blogId);
      if (pageId) formData.append('pageId', pageId);

      try {
        const result = await uploadImage(formData);
        if (result) {
          setUploadedImages((prev) => [result, ...prev]);
          onImageUpload?.(result);
        }
      } catch (err) {
        console.error('Upload failed:', err);
      }
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const copyToClipboard = (url: string, imageId: string) => {
    const markdown = `![alt text](${url})`;
    navigator.clipboard.writeText(markdown);
    setCopied(imageId);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-400 transition cursor-pointer"
        onClick={() => fileInputRef.current?.click()}
      >
        <Upload size={32} className="mx-auto mb-2 text-gray-400" />
        <p className="text-gray-600 font-medium">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500">PNG, JPG, WebP up to 5MB</p>
        <input
          ref={fileInputRef}
          type="file"
          multiple
          accept="image/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800 text-sm">
          {error}
        </div>
      )}

      {loading && <p className="text-gray-600 text-sm">Uploading...</p>}

      {/* Uploaded Images */}
      {uploadedImages.length > 0 && (
        <div>
          <h3 className="font-semibold text-gray-900 mb-3">Uploaded Images</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {uploadedImages.map((image) => (
              <div key={image.id} className="space-y-2">
                <div className="bg-gray-100 rounded-lg overflow-hidden">
                  <img
                    src={image.url}
                    alt={image.filename}
                    className="w-full h-24 object-cover"
                  />
                </div>
                <div className="text-xs text-gray-600 truncate">{image.filename}</div>
                <div className="flex gap-1">
                  <button
                    onClick={() => copyToClipboard(image.url, image.id)}
                    className="flex-1 p-1 text-xs bg-blue-100 hover:bg-blue-200 rounded flex items-center justify-center gap-1 text-blue-700"
                    title="Copy markdown"
                  >
                    <Copy size={12} />
                    {copied === image.id ? 'Copied' : 'Copy'}
                  </button>
                  <button
                    className="p-1 text-xs bg-red-100 hover:bg-red-200 rounded text-red-700"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
