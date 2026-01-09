'use server';

import prisma from '@/lib/prisma';

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