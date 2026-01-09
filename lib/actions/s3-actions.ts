"use server"

import { S3Client, PutObjectCommand, DeleteObjectCommand } from "@aws-sdk/client-s3";


// Configure AWS S3 Client
const s3Client = new S3Client({
  region: process.env.AWS_REGION || "ap-southeast-2",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
})

const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME || ""

// Upload image to S3
export async function uploadImageToS3(
  file: File,
  folder: string = "slideshow"
): Promise<{ success: boolean; url?: string; error?: string }> {
  try { const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    // Generate unique filename
    const timestamp = Date.now()
    const sanitizedName = file.name.replace(/[^a-zA-Z0-9.-]/g, "-")
    const key = `${folder}/${timestamp}-${sanitizedName}`

    // Upload to S3
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
      Body: buffer,
      ContentType: file.type,
      
    })

    await s3Client.send(command)
 // Construct public URL
    const url = `https://${BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`

    return { success: true, url }
  } catch (error) {
    console.error("S3 upload error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to upload image" 
    }
  }
}

// Delete image from S3
export async function deleteImageFromS3(
  imageUrl: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Extract key from URL
    const urlParts = imageUrl.split(".amazonaws.com/")
    if (urlParts.length !== 2) {
      throw new Error("Invalid S3 URL")
    }
    
    const key = urlParts[1]

    const command = new DeleteObjectCommand({
      Bucket: BUCKET_NAME,
      Key: key,
    })

    await s3Client.send(command)

    return { success: true }
  } catch (error) {
    console.error("S3 delete error:", error)
    return { 
      success: false, 
      error: error instanceof Error ? error.message : "Failed to delete image" 
    }
  }
}

