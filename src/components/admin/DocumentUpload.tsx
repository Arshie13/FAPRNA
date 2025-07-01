'use client';

import { Dropzone } from '@/components/upload/dropzone';
import {
  UploaderProvider,
  type UploadFn,
} from '@/components/upload/uploader-provider';
import { useEdgeStore } from '@/lib/libstore/libstore-config';
import * as React from 'react';

interface FileUploadProps {
  setFileUrl: (url: string) => void;
}

export function DocumentUpload({ setFileUrl }: FileUploadProps) {
  const { edgestore } = useEdgeStore();
  const [fileName, setFileName] = React.useState<string | null>(null);
  const [uploading, setUploading] = React.useState(false);

  const uploadFn: UploadFn = React.useCallback(
    async ({ file, onProgressChange, signal }) => {
      setUploading(true);
      try {
        const res = await edgestore.publicFiles.upload({
          file,
          input: { type: "pdf" },
          signal,
          onProgressChange,
        });
        setFileUrl(res.url);
        setFileName(file.name);
        return res;
      } finally {
        setUploading(false);
      }
    },
    [edgestore, setFileUrl],
  );

  return (
    <div className="col-span-1 md:col-span-2">
      <label className="block font-medium mb-1">PDF Upload</label>
      <p className="text-sm text-muted-foreground mb-2">
        Upload a pdf file.
      </p>

      <UploaderProvider uploadFn={uploadFn} autoUpload>
        <Dropzone
          dropzoneOptions={{
            maxFiles: 1,
            accept: { 'application/pdf': [] },
            onDropAccepted: (files) => {
              if (files.length > 0) setFileName(files[0].name);
            },
          }}
        />
      </UploaderProvider>
      {uploading && (
        <div className="mt-2 text-sm text-gray-500">Uploading...</div>
      )}
      {fileName && !uploading && (
        <div className="mt-2 text-sm text-green-600">Uploaded: {fileName}</div>
      )}
    </div>
  );
}
