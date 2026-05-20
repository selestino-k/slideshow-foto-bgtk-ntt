import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import { PrismaClient } from "../src/generated/prisma/client";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const SEED_PHOTOS = [
  {
    photoName: "Image 1",
    description: "Tes Deskripsi",
    timelineDate: "2025-11-25",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1768181657752-IMG-20251125-082430.jpg",
    location: "Hotel Aston Kupang",
  },
  {
    photoName: "Image 2",
    description: "Tes Deskripsi",
    timelineDate: "2026-01-03",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1768182131522-NRD-7262--1-.jpg",
    location: "Hotel Aston Kupang",
  },
  {
    photoName: "Image 3",
    description: "Tes Deskripsi",
    timelineDate: "2026-02-03",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1768451778598_WhatsApp_Image_2026-01-14_at_14.03.53.jpeg",
    location: "Hotel Aston Kupang",
  },
  {
    photoName: "Image 4",
    description: "Tes Deskripsi",
    timelineDate: "2026-03-05",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1769488449136-WhatsApp-Image-2026-01-27-at-10.38.04.jpeg",
    location: "Hotel Aston Kupang",
  },
  {
    photoName: "Image 5",
    description: "Tes Deskripsi",
    timelineDate: "2026-04-07",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1769488510894-WhatsApp-Image-2026-01-27-at-10.38.00.jpeg",
    location: "Hotel Aston Kupang",
  },
  {
    photoName: "Image 6",
    description: "Tes Deskripsi",
    timelineDate: "2026-05-07",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1769488648725-WhatsApp-Image-2026-01-27-at-10.41.00.jpeg",
    location: "Hotel Aston Kupang",
  },
  {
    photoName: "Image 7",
    description: "Tes Deskripsi",
    timelineDate: "2026-06-05",
    imageUrl: "https://web-bgtk-ntt-s3-bucket.s3.ap-southeast-2.amazonaws.com/slideshow/1769488953290-WhatsApp-Image-2026-01-27-at-12.41.55.jpeg",
    location: "Hotel Aston Kupang",
  },
];

export async function seedPhotos() {
  console.log("Seeding photos...");

  for (const photo of SEED_PHOTOS) {
    const existing = await prisma.photo.findFirst({
      where: { photoName: photo.photoName },
    });

    if (existing) {
      console.log(`Photo "${photo.photoName}" already exists, skipping.`);
      continue;
    }

    await prisma.photo.create({
      data: photo,
    });

    console.log(`Created photo "${photo.photoName}".`);
  }

  console.log("Photo seeding complete.");
}

seedPhotos()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
