'use server';

import prisma from '@/lib/prisma';
import { uploadImageToS3, deleteImageFromS3 } from './s3-actions';
import { revalidatePath } from 'next/cache';

export async function getPhotos() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });
    return photos;
  } catch (error) {
    console.error('Error fetching photos:', error);
    return [];
  }
}

export async function getPhotoById(id: string) {
  try {
    const photo = await prisma.photo.findUnique({
      where: { id: parseInt(id) },
    });
    return photo;
  } catch (error) {
    console.error('Error fetching photo:', error);
    return null;
  }
}

export async function createPhoto(formData: FormData) {
  try {
    const file = formData.get('file') as File | null;
    const photoName = formData.get('photoName') as string;
    const description = formData.get('description') as string;
    const timelineDate = formData.get('timelineDate') as string;
    const location = formData.get('location') as string;
    const externalUrl = formData.get('externalUrl') as string | null;

    if (!photoName || !timelineDate) {
      return { success: false, error: 'Missing required fields' };
    }

    let imageUrl = '';

    // Check if using external URL or file upload
    if (externalUrl) {
      imageUrl = externalUrl;
    } else if (file) {
      // Upload image to S3
      const uploadResult = await uploadImageToS3(file, 'slideshow');

      if (!uploadResult.success || !uploadResult.url) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }

      imageUrl = uploadResult.url;
    } else {
      return { success: false, error: 'No image provided' };
    }

    // Create photo record in database
    const photo = await prisma.photo.create({
      data: {
        photoName,
        description: description || null,
        timelineDate,
        location: location || null,
        imageUrl,
      },
    });

    revalidatePath('/');
    return { success: true, photo };
  } catch (error) {
    console.error('Error creating photo:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to create photo',
    };
  }
}

export async function updatePhoto(formData: FormData) {
  try {
    const id = formData.get('id');
    const photoName = formData.get('photoName') as string;
    const description = formData.get('description') as string;
    const timelineDate = formData.get('timelineDate') as string;
    const location = formData.get('location') as string;
    const file = formData.get('file') as File | null;
    const externalUrl = formData.get('externalUrl') as string | null;
    const existingImageUrl = formData.get('imageUrl') as string | null;

    if (!id || !photoName || !timelineDate) {
      return { success: false, error: 'Missing required fields' };
    }

    const photoId = parseInt(id as string);

    // Get existing photo
    const existingPhoto = await prisma.photo.findUnique({
      where: { id: photoId },
    });

    if (!existingPhoto) {
      return { success: false, error: 'Photo not found' };
    }

    let imageUrl = existingPhoto.imageUrl;

    // Handle image update logic
    if (file && file.size > 0) {
      // New file uploaded - upload to S3
      const uploadResult = await uploadImageToS3(file, 'slideshow');

      if (!uploadResult.success || !uploadResult.url) {
        return { success: false, error: uploadResult.error || 'Failed to upload image' };
      }

      // Delete old image from S3 if it's not an external URL
      if (!existingPhoto.imageUrl.startsWith('http://') && !existingPhoto.imageUrl.startsWith('https://')) {
        await deleteImageFromS3(existingPhoto.imageUrl);
      }
      
      imageUrl = uploadResult.url;
    } else if (externalUrl) {
      // Using external URL - delete old image from S3 if needed
      if (!existingPhoto.imageUrl.startsWith('http://') && !existingPhoto.imageUrl.startsWith('https://')) {
        await deleteImageFromS3(existingPhoto.imageUrl);
      }
      imageUrl = externalUrl;
    } else if (existingImageUrl) {
      // Keep existing image URL
      imageUrl = existingImageUrl;
    }

    // Update photo record
    const photo = await prisma.photo.update({
      where: { id: photoId },
      data: {
        photoName,
        description: description || null,
        timelineDate,
        location: location || null,
        imageUrl,
      },
    });

    revalidatePath('/');
    revalidatePath('/admin/daftar-foto');
    return { success: true, photo };
  } catch (error) {
    console.error('Error updating photo:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to update photo',
    };
  }
}

export async function deletePhoto(id: number) {
  try {
    // Get photo to retrieve image URL
    const photo = await prisma.photo.findUnique({
      where: { id },
    });

    if (!photo) {
      return { success: false, error: 'Photo not found' };
    }

    // Delete image from S3
    const deleteResult = await deleteImageFromS3(photo.imageUrl);

    if (!deleteResult.success) {
      console.error('Failed to delete image from S3:', deleteResult.error);
      // Continue with database deletion even if S3 deletion fails
    }

    // Delete photo record from database
    await prisma.photo.delete({
      where: { id },
    });

    revalidatePath('/');
    return { success: true };
  } catch (error) {
    console.error('Error deleting photo:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to delete photo',
    };
  }
}

export async function getPhotosByTimelineDate(timelineDate: string) {
  try {
    const photos = await prisma.photo.findMany({
      where: {
        timelineDate,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
    return photos;
  } catch (error) {
    console.error('Error fetching photos by timeline:', error);
    return [];
  }
}