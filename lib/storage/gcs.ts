import fs from 'fs';
import path from 'path';

export interface StorageUploadResult {
  fileUrl: string;
  filename: string;
  storageProvider: 'GOOGLE_CLOUD_STORAGE' | 'LOCAL_DISK';
}

export async function uploadMedicalDocument(
  fileBuffer: Buffer,
  originalFilename: string,
  mimeType: string
): Promise<StorageUploadResult> {
  const uniqueFilename = `${Date.now()}-${originalFilename.replace(/[^a-zA-Z0-9\._\-]/g, '_')}`;

  // If GCS Bucket is configured, upload to Google Cloud Storage
  const bucketName = process.env.GCS_BUCKET_NAME;
  if (bucketName) {
    try {
      const storageModule = eval('require')('@google-cloud/storage');
      const storage = new storageModule.Storage();
      const bucket = storage.bucket(bucketName);
      const file = bucket.file(`documents/${uniqueFilename}`);

      await file.save(fileBuffer, {
        contentType: mimeType,
        resumable: false,
      });

      const publicUrl = `https://storage.googleapis.com/${bucketName}/documents/${uniqueFilename}`;
      return {
        fileUrl: publicUrl,
        filename: uniqueFilename,
        storageProvider: 'GOOGLE_CLOUD_STORAGE',
      };
    } catch (err) {
      console.warn('[MedLens Storage] GCS upload fallback to local storage:', err);
    }
  }

  // Local storage fallback
  const uploadsDir = path.join(process.cwd(), 'public', 'uploads');
  if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
  }

  const filePath = path.join(uploadsDir, uniqueFilename);
  fs.writeFileSync(filePath, fileBuffer);

  return {
    fileUrl: `/uploads/${uniqueFilename}`,
    filename: uniqueFilename,
    storageProvider: 'LOCAL_DISK',
  };
}
