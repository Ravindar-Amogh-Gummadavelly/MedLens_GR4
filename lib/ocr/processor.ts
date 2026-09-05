import pdfParse from 'pdf-parse';

export interface OcrResult {
  text: string;
  pageCount: number;
  provider: 'GOOGLE_CLOUD_VISION' | 'NATIVE_PDF_PARSER' | 'PLAINTEXT';
}

export async function processDocumentOcr(
  fileBuffer: Buffer,
  mimeType: string,
  filename: string
): Promise<OcrResult> {
  // If Google Cloud Vision credentials exist in environment, attempt GCP Vision
  if (process.env.GCP_PROJECT_ID && process.env.GOOGLE_APPLICATION_CREDENTIALS) {
    try {
      // Safe dynamic require for bundlers
      const visionModule = eval('require')('@google-cloud/vision');
      const client = new visionModule.ImageAnnotatorClient();
      const [result] = await client.textDetection(fileBuffer);
      const detections = result.textAnnotations;
      if (detections && detections.length > 0) {
        return {
          text: detections[0].description || '',
          pageCount: 1,
          provider: 'GOOGLE_CLOUD_VISION',
        };
      }
    } catch (err) {
      console.warn('[MedLens OCR] GCP Vision processing fallback:', err);
    }
  }

  // Native PDF Parser Fallback
  if (mimeType.includes('pdf') || filename.endsWith('.pdf')) {
    try {
      const parsed = await pdfParse(fileBuffer);
      return {
        text: parsed.text || '',
        pageCount: parsed.numpages || 1,
        provider: 'NATIVE_PDF_PARSER',
      };
    } catch (err) {
      console.warn('[MedLens OCR] pdf-parse fallback failed:', err);
    }
  }

  // Plain Text / Image string fallback
  const textContent = fileBuffer.toString('utf-8');
  return {
    text: textContent || `Medical Document: ${filename}`,
    pageCount: 1,
    provider: 'PLAINTEXT',
  };
}
