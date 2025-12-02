"use client";
import * as React from "react"
import Autoplay from "embla-carousel-autoplay";
import Fade from "embla-carousel-fade";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Calendar, MapPin } from "lucide-react";
import "./zoom.css";


export default function Home() {
  const Plugin = React.useRef([
    Autoplay({ delay: 5000, stopOnInteraction: false }),
  ]);
  const autoplayRef = React.useRef<typeof Autoplay.prototype | null>(null);

  const carouselItems = [
    { id: 1, date:"25 November 2025", title: "Hari Guru Nasional", description: "Untuk memperingati momentum yang berharga ini, Kementerian Pendidikan Dasar dan Menengah telah memberikan berbagai apresiasi terhadap dedikasi guru. Salah satu bentuk penghargaan tersebut adalah dengan diselenggarakannya upacara bendera memperingati Hari Guru Nasional Tahun 2025..", image: "/images/foto-1.jpg", location: "Balai GTK NTT" },
    { id: 2, date:"28-31 Oktober 2024",title: "Kegiatan di Hotel Sahid T-More", description: "Pelatihan Pemanfaatan Buku Untuk Pembelajaran Literasi dan Pengelolaan Perpustakaan Sekolah bagi Guru Jenjang SD Gelombang 1", image: "/images/foto-2.jpg" , location: "Hotel Sahid T-More Kupang" },
    { id: 3, title: "Slide 3", description: "Description for slide 3", image: "/images/foto-3.jpg" },
    { id: 4, title: "Slide 4", description: "Description for slide 4", image: "/images/foto-4.jpg" },
    { id: 5, title: "Slide 5", description: "Description for slide 5", image: "/images/foto-5.jpg" },
  ];

  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-white dark:bg-gray-900">
      <main className="flex w-screen flex-1 flex-col items-center justify-center px-4 ">
        
        <Carousel
              plugins={Plugin.current}
              className="w-full max-w-screen h-screen bg-black"
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
                        className="object-cover carousel-item-zoom"
                      />
                      <div className="absolute inset-0 bg-black/40 flex flex-col justify-end p-6">
                        <h4 className="text-gray-200 text-xl mt-2 mb-2 w-full"><Calendar className="inline-block mr-2 mb-1" />{item.date}</h4>
                        <h3 className="text-white text-6xl font-bold w-full">{item.title}</h3>
                        <p className="text-gray-200 text-xl mt-2 mb-6 w-full">{item.description}</p>
                        <div className="text-gray-200 text-lg mb-4"><MapPin className="inline-block mr-2 mb-1" />{item.location}</div>
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>

        </Carousel>        
        <div className="mt-10 text-center text-gray-800 dark:text-gray-200">
          <h1 className="text-4xl font-bold mb-4">Welcome to the Photo Slideshow App</h1>
          <p className="text-lg">
            This application showcases a fullscreen photo slideshow using Next.js and Embla Carousel.
          </p>
        </div>
      </main>
    </div>
  );
}


