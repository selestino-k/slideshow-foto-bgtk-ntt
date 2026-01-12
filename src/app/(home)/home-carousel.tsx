"use client"

import * as React from "react"
import Autoplay from "embla-carousel-autoplay"
import Image from "next/image"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    type CarouselApi,
} from "@/components/ui/carousel"
import { Calendar, MapPin } from "lucide-react"
import "./zoom.css"

interface Photo {
    id: number
    photoName: string
    description: string | null
    timelineDate: string
    location: string | null
    imageUrl: string
    createdAt: Date
}

interface HomeCarouselProps {
    photos: Photo[]
}

export function HomeCarousel({ photos }: HomeCarouselProps) {
    const Plugin = React.useRef([
        Autoplay({ delay: 2500, stopOnInteraction: false }),
    ])
    const autoplayRef = React.useRef<typeof Autoplay.prototype | null>(null)
    const [api, setApi] = React.useState<CarouselApi>()
    const [current, setCurrent] = React.useState(0)

    React.useEffect(() => {
        if (!api) return

        setCurrent(api.selectedScrollSnap())

        api.on("select", () => {
            setCurrent(api.selectedScrollSnap())
        })
    }, [api])

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        return date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
    }

    return (
        <Carousel
            plugins={Plugin.current}
            className="w-full max-w-screen h-screen bg-black"
            opts={{
                loop: true,
                dragFree: false,
            }}
            setApi={(carouselApi) => {
                setApi(carouselApi)
                autoplayRef.current = carouselApi?.plugins().autoplay
            }}
        >
            <CarouselContent>
                {photos.map((photo) => (
                    <CarouselItem key={photo.id}>
                        <div className="relative w-full h-screen overflow-hidden">
                            <Image
                                src={photo.imageUrl}
                                alt={photo.photoName}
                                fill
                                className="object-cover carousel-item-zoom"
                                priority={photo.id === photos[0]?.id}
                            />
                            <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6 pb-15">
                                <div className="flex items-center mb-2">
                                    <h4 className="text-gray-200 text-xl mt-2 mb-2 mr-6 ">
                                        <Calendar className="inline-block mr-2 mb-1" />
                                        {formatDate(photo.timelineDate)}
                                    </h4>
                                    {photo.location && (
                                        <h4 className="text-gray-200 text-xl mt-2 mb-2">
                                            <MapPin className="inline-block mr-2 mb-1" />
                                            {photo.location}
                                        </h4>
                                    )}
                                </div>

                                <h3 className="text-white text-5xl font-semibold font-geist w-full">
                                    {photo.photoName}
                                </h3>
                                {photo.description && (
                                    <p className="text-gray-200 text-xl mt-4 mb-6 w-full">
                                        {photo.description}
                                    </p>
                                )}

                            </div>
                        </div>
                    </CarouselItem>
                ))}
            </CarouselContent>

            {/* Navigation Arrows and Pagination Dots Container */}
            <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-50 flex items-center gap-4">
                
                {/* Pagination Dots */}
                <div className="flex gap-2">
                    {photos.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => api?.scrollTo(index)}
                            className={`w-3 h-3 rounded-full transition-all ${index === current
                                    ? "bg-white w-8"
                                    : "bg-white/50 hover:bg-white/70"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
                
                <CarouselNext className="relative bg-white/20 hover:bg-white/30 text-white border-white/50 right-0 translate-y-0" />
            </div>
        </Carousel>
    )
}