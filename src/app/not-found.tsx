"use client";

import Image from "next/image";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import { ArrowLeft, Home } from "lucide-react";
import { useRouter } from "next/navigation";

const NotFound = () => {
    const router = useRouter();
   
    return (
        <div className="grid w-full">
            <div className="flex items-center justify-center h-screen w-full relative">
                <div className="absolute inset-0 z-0">
                    <Image 
                        src="/images/intro-web.png"
                        alt="Background"
                        fill
                        className="object-cover opacity-95 grayscale"
                        priority
                    />
                </div>
                <main className="relative z-10 flex flex-col gap-3 text-white items-center p-8 w-full">
                    <div className="text-center w-full">
                        <h1 className="text-4xl md:text-5xl/9 font-bold sm:tracking-tight mt-2 text-primary">
                            404 - Halaman Tidak Ditemukan
                        </h1>  
                        <h2 className="text-2xl mt-4 mb-6 text-gray-700">
                            Maaf, halaman yang Anda cari tidak ditemukan.
                        </h2>
                    </div>
                    <div className="flex items-center gap-2 gap-x-4">
                        <Button 
                            onClick={() => router.back()}
                            className="h-12 text-lg px-6" 
                            variant="secondary"
                        >
                            <ArrowLeft className="w-5 h-5 mr-2"/>
                            Kembali
                        </Button>
                        <Button asChild className="h-12 text-lg px-6" variant="default">
                            <Link href="/" className="flex items-center gap-2">
                                <Home className="w-5 h-5"/>
                                Beranda
                            </Link>
                        </Button>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default NotFound;
