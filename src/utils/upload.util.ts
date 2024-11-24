import { Storage } from '@google-cloud/storage';

const KEYFILE_PATH = './service-account.json';
const BUCKET_NAME = process.env.GC_BUCKET_NAME || 'testing-bucket';

const storage = new Storage({ keyFilename: KEYFILE_PATH });
const bucket = storage.bucket(BUCKET_NAME);

/**
 * Decode base64 and validate file
 * @param file 
 * @returns { filename, buffer }
 */
export async function decodeBase64(file: string): Promise<{ filename: string, buffer: Buffer }> {
    try {
        // Decode base64
        const base64Data = file.replace(/^data:image\/\w+;base64,/, '');
        const buffer = Buffer.from(base64Data, 'base64');

        // Generate filename
        const extension = file.split(';')[0].split('/')[1];
        const filename = `${Date.now()}.${extension}`;

        // Validate size max 1MB
        if (buffer.byteLength > 1048576) {
            throw new Error('File size is too large');
        }

        return { filename, buffer };
    } catch (error) {
        console.error('Error decoding Base64:', error);
        throw error;
    }
}


/**
 * Upload file to Google Cloud Storage Bucket
 * @param buffer 
 * @param filename 
 * @returns filename
 * 
 */
export async function uploadFileToBucket(buffer: Buffer, filename: string): Promise<string | undefined> {
    try {
      const file = bucket.file(filename);
      await file.save(buffer, {
        contentType: 'image/png',
      });

      // Return public URL (assuming bucket is public)
      const publicUrl = `https://storage.googleapis.com/${BUCKET_NAME}/${filename}`;
      return publicUrl;

    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
}

  