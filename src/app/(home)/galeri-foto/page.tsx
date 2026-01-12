import prisma from "@/lib/prisma"
import { FotoGallery } from "./foto-gallery"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/dark-switch"
import { toast } from "@/hooks/use.toast"

async function getAllPhotos() {
    try {
        const photos = await prisma.photo.findMany({
            orderBy: {
                timelineDate: 'desc',
            },
        })
        return photos
    } catch {
        toast.error('Error fetching photos');
        return []
    }
}

export default async function GaleriFotoPage() {
    const photos = await getAllPhotos()

    return (
        <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-950">
            {/* Header */}
            <header className=" flex sticky top-0 z-40 bg-white dark:bg-gray-900 shadow-sm">
                <div className="container mx-auto px-4 py-4 flex items-center gap-4">
                    <Link
                        href="/"
                        className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                    <h1 className="text-2xl font-bold text-primary font-geist">
                        Galeri Foto
                    </h1>
                </div>
                <div className="absolute right-4 my-5">
                    <ModeToggle />
                </div>
            </header>

            {/* Gallery Content */}
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
    )
}