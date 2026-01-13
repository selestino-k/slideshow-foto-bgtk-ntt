import type { Metadata, Viewport } from "next";
import { Toaster } from "sonner";


export const metadata: Metadata = {
  title: "Slideshow Foto BGTK Provinsi NTT",
  keywords: ["Balai GTK NTT", "Balai GTK Provinsi NTT", "BGTK NTT", "Balai Guru dan Tenaga Kependidikan NTT"],
  description: "Aplikasi Slideshow foto - Balai Guru dan Tenaga Kependidikan Provinsi Nusa Tenggara Timur",
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  // Add custom properties as needed
  // minimumScale: 1,
  // maximumScale: 1,
  // viewportFit: 'cover', 
};
export default async function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {


  return (
    <main className="gap-3 w-full scroll-smooth">
      <div className="flex w-full min-h-screen items-center justify-center">
        {children}
        <Toaster position="bottom-center" />
      </div>
    </main>

  );
}
