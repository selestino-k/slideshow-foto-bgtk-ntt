import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets : ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Slideshow Foto dan SI Jadwal BGTK NTT",
    description: "Aplikasi slideshow foto dan SI jadwal BGTK Provinsi NTT",
    keywords: [
        "Balai GTK NTT",
        "Balai GTK Provinsi NTT",
        "BGTK NTT",
        "Balai Guru dan Tenaga Kependidikan NTT",
    ],
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>    
            <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                >
                    <main className="gap-3 w-full">
                        <div className="flex w-full min-h-screen">
                            {children}
                        </div>
                    </main>
                </ThemeProvider>
            </body>
        </html>
    );
}
