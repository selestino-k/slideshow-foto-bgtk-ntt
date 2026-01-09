import { S3Client, PutObjectCommand, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";



// Initialize S3 client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

const bucketName = process.env.S3_BUCKET_NAME || "";

// Upload file to S3
export async function uploadFileToS3(
  file: Buffer, 
  fileName: string, 
  contentType: string
): Promise<string> {
  const command = new PutObjectCommand({
    Bucket: bucketName,
    Key: fileName,
    Body: file,
    ContentType: contentType,
    ACL: "public-read", // Make the file publicly readable
  });

  try {
    await s3Client.send(command);
    return `https://${bucketName}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
  } catch (error) {
    console.error('S3 Upload Error:', error);
    throw new Error('Failed to upload to S3');
  }
}

// Get a signed URL for temporary access to a private file
export async function getSignedFileUrl(key: string): Promise<string> {
  const command = new GetObjectCommand({
    Bucket: bucketName,
    Key: key,
  });

  // URL expires in 1 hour (3600 seconds)
  return getSignedUrl(s3Client, command, { expiresIn: 3600 });
}