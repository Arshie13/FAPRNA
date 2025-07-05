'use client';

import { SingleImageDropzone } from '@/components/upload/single-image';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/libstore/libstore-config';
import * as React from 'react';

interface ImageUploadProps {
  setImageUrl: (url: string) => void;
}

export function ImageUploadForm({ setImageUrl }: ImageUploadProps) {
  const { edgestore } = useEdgeStore();

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      const res = await edgestore.publicFiles.upload({
        file,
        input: { type: "image" },
        signal,
        onProgressChange,
      });
      setImageUrl(res.url)
      return res;
    },
    [edgestore, setImageUrl],
  );

  return (
    <div className="col-span-1 md:col-span-2">
      <label className="block font-medium mb-1">Event Image</label>
      <p className="text-sm text-muted-foreground mb-2">
        Upload an image for this event item (max 10 MB, jpg/png/webp).
      </p>

      <UploaderProvider uploadFn={uploadFn} autoUpload>
        <SingleImageDropzone
          height={200}
          width={200}
          dropzoneOptions={{
            maxSize: 1024 * 1024 * 10, // 10 MB
          }}
        />
      </UploaderProvider>
    </div>
  );
}
