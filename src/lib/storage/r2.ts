import { StorageProvider } from '.';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME!;
const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID!;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID!;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY!;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN!; // ✅ e.g. videos.yourdomain.com

if (
  !R2_ACCESS_KEY_ID ||
  !R2_SECRET_ACCESS_KEY ||
  !R2_BUCKET_NAME ||
  !R2_ACCOUNT_ID ||
  !R2_PUBLIC_DOMAIN
) {
  throw new Error('❌ Missing R2 env vars. Check .env.local');
}

const R2_ENDPOINT = `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`;

const r2Client = new S3Client({
  region: 'auto',
  endpoint: R2_ENDPOINT,
  credentials: {
    accessKeyId: R2_ACCESS_KEY_ID,
    secretAccessKey: R2_SECRET_ACCESS_KEY,
  },
});

export const R2StorageProvider: StorageProvider = {
  async upload(file: File, path: string) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET_NAME,
      Key: path,
      Body: buffer,
      ContentType: file.type,
    });

    const result = await r2Client.send(command);

    console.log('✅ R2 upload success:', result);

    // ✅ Return clean CDN/domain-based URL
    return `https://${R2_PUBLIC_DOMAIN}/${path}`;
  },
};
