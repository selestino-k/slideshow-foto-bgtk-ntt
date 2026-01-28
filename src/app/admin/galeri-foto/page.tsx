import prisma from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { FotoGallery } from "./foto-gallery";
import {toast } from "@/hooks/use-toast";


async function getAllPhotos() {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: {
                timelineDate: 'desc',
            },
        })
        return photos
    } catch  {
        toast.error("Gagal memuat foto. Silakan coba lagi.")
        return []
    }
}


export default async function GaleriFotoPage() {
    const photos = await getAllPhotos();
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/sign-in");
    }

    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                        Galeri Foto
                    </h2>
                </div>
                <div className="mt-6 w-full">
                    <main className="container mx-auto py-6">
                        {photos.length > 0 ? (
                            <FotoGallery photos={photos} />
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20">
                                <p className="text-gray-500 dark:text-gray-400 text-lg">
                                    Belum ada foto yang tersedia.
                                </p>
                            </div>
                        )}
                    </main>
                </div>
            </main>
        </div>
    );
}
