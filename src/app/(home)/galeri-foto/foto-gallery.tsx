"use client"

import * as React from "react"
import Image from "next/image"
import { Calendar, MapPin, X } from "lucide-react"
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogClose,
} from "@/components/ui/dialog"

interface Photo {
    id: number
    photoName: string
    description: string | null
    timelineDate: string
    location: string | null
    imageUrl: string
    createdAt: Date
    updatedAt: Date
}

interface FotoGalleryProps {
    photos: Photo[]
}

export function FotoGallery({ photos }: FotoGalleryProps) {
    const [selectedPhoto, setSelectedPhoto] = React.useState<Photo | null>(null)
    const [isOpen, setIsOpen] = React.useState(false)

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    const handlePhotoClick = (photo: Photo) => {
        setSelectedPhoto(photo)
        setIsOpen(true)
    }

    return (
        <>
            {/* Grid Gallery */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
                {photos.map((photo) => (
                    <div
                        key={photo.id}
                        className="relative group cursor-pointer overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300"
                        onClick={() => handlePhotoClick(photo)}
                    >
                        <div className="aspect-square relative">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.photoName}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <h3 className="text-white text-lg font-semibold line-clamp-2">
                                {photo.photoName}
                            </h3>
                            <p className="text-gray-200 text-sm flex items-center mt-1">
                                <Calendar className="w-4 h-4 mr-1" />
                                {formatDate(photo.timelineDate)}
                            </p>
                            {photo.location && (
                                <p className="text-gray-200 text-sm flex items-center mt-1">
                                    <MapPin className="w-4 h-4 mr-1" />
                                    {photo.location}
                                </p>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            {/* Preview Dialog */}
            <Dialog open={isOpen} onOpenChange={setIsOpen}>
                <DialogContent className="max-w-4xl w-full p-0 overflow-hidden">
                    <DialogClose className="absolute right-4 top-4 z-50 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors">
                        <X className="h-5 w-5" />
                        <span className="sr-only">Close</span>
                    </DialogClose>
                    
                    {selectedPhoto && (
                        <div className="flex flex-col">
                            {/* Image */}
                            <div className="relative w-full aspect-video">
                                <Image
                                    src={selectedPhoto.imageUrl}
                                    alt={selectedPhoto.photoName}
                                    fill
                                    className="object-contain bg-black"
                                    priority
                                />
                            </div>
                            
                            {/* Photo Details */}
                            <div className="p-6 bg-white dark:bg-gray-900">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                                        {selectedPhoto.photoName}
                                    </DialogTitle>
                                </DialogHeader>
                                
                                <div className="mt-4 space-y-3">
                                    {/* Date */}
                                    <div className="flex items-center text-gray-600 dark:text-gray-300">
                                        <Calendar className="w-5 h-5 mr-2 text-primary" />
                                        <span>{formatDate(selectedPhoto.timelineDate)}</span>
                                    </div>
                                    
                                    {/* Location */}
                                    {selectedPhoto.location && (
                                        <div className="flex items-center text-gray-600 dark:text-gray-300">
                                            <MapPin className="w-5 h-5 mr-2 text-primary" />
                                            <span>{selectedPhoto.location}</span>
                                        </div>
                                    )}
                                    
                                    {/* Description */}
                                    {selectedPhoto.description && (
                                        <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                                            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                                {selectedPhoto.description}
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    )
}