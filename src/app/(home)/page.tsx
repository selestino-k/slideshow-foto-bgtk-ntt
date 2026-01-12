import MenuCard from "@/components/menu-card"
import { HomeCarousel } from "./home-carousel"
import prisma from "@/lib/prisma"
import "./zoom.css"
import Image from "next/image"
import { ModeToggle } from "@/components/dark-switch"
import { toast } from "@/hooks/use.toast"

async function getCarouselPhotos() {
  try {
    const photos = await prisma.photo.findMany({
      orderBy: {
        timelineDate: 'desc',
      },
      take: 10,
    })
    return photos
  } catch  {
    toast.error('Gagal memuat foto untuk carousel.');
    return []
  }
}

export default async function Home() {
  const photos = await getCarouselPhotos()

  return (
    <div className="grid w-full justify-items-center min-h-dvh overflow-hidden">

      <div id="home" className="relative z-10 flex justify-center h-screen w-screen">
        <Image
          src="/images/logo/logo-admin-bgtk-ntt.png"
          alt="Logo BGTK NTT"
          width={450}
          height={150}
          className="absolute top-6 left-6 z-20 object-contain"
          priority
        />
        <main className="z-10 w-full content-around">
          <HomeCarousel photos={photos} />
        </main>
      </div>


      <div className="mt-10 w-full mx-10 pl-10 font-geist text-primary dark:text-white-700">
        <div className="flex flex-row items-start">
          <div className=" items-center space-x-4">
            <h1 className="text-4xl font-bold mb-4">Menu</h1>
          </div>
          <div className="items-center ml-auto px-8">
            <ModeToggle />
          </div>
        </div>

        <div className="flex space-x-5 mt-2 mb-10 max-w-7xl justify-items-center">
          <MenuCard
            iconName="ImageIcon"
            title="Galeri Foto"
            description="Lihat koleksi foto kegiatan BGTK Provinsi NTT"
            href="/galeri-foto"
          />
          <MenuCard
            iconName="Globe"
            title="Website BGTK NTT"
            description="Kunjungi website resmi BGTK Provinsi NTT"
            href="https://bgtkntt.kemendikdasmen.go.id/"
          />
          <MenuCard
            iconName="UserCircle"
            title="Admin"
            description="Panel admin untuk manajemen foto slideshow"
            href="/admin"
          />
        </div>
      </div>
    </div>
  )
}