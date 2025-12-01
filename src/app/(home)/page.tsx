"use client";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "@/components/ui/carousel";


export default function Home() {
  const Plugin = React.useRef([
    Autoplay({ delay: 7000, stopOnInteraction: false }),
    Fade()
  ]);
  const autoplayRef = React.useRef<typeof Autoplay.prototype | null>(null);

  const carouselItems = [
    { id: 1, title: "Hari Guru Nasional", description: "Untuk memperingati momentum yang berharga ini, Kementerian Pendidikan Dasar dan Menengah telah memberikan berbagai apresiasi terhadap dedikasi guru. Salah satu bentuk penghargaan tersebut adalah dengan diselenggarakannya upacara bendera memperingati Hari Guru Nasional Tahun 2025..", image: "/images/foto-1.jpg" },
    { id: 2, title: "Slide 2", description: "Description for slide 2", image: "/images/foto-2.jpg" },
    { id: 3, title: "Slide 3", description: "Description for slide 3", image: "/images/foto-3.jpg" },
    { id: 4, title: "Slide 4", description: "Description for slide 4", image: "/images/foto-4.jpg" },
    { id: 5, title: "Slide 5", description: "Description for slide 5", image: "/images/foto-5.jpg" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gray-900 dark:bg-gray-900">
      <main className="flex w-screen flex-1 flex-col items-center justify-center px-4 ">
        
        <Carousel
              plugins={Plugin.current}
              className="w-full max-w-screen h-screen"
              setApi={(api) => {
                autoplayRef.current = api?.plugins().autoplay;
              }}
            >
              <CarouselContent>
                {carouselItems.map((item) => (
                  <CarouselItem key={item.id}>
                    <div className="relative w-full h-screen overflow-hidden">
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                        <h3 className="text-white text-6xl font-bold w-full">{item.title}</h3>
                        <p className="text-gray-200 text-xl mt-2 mb-6 w-full">{item.description}</p>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

        </Carousel>        
        <div className="mt-10 text-gray-300">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Photo Slideshow App</h1>
          <p className="text-lg">
            This application showcases a fullscreen photo slideshow using Next.js and Embla Carousel.
          </p>
        </div>
      </main>
    </div>
  );
}
