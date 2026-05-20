import "./globals.css";
import type { Metadata } from "next";
import { Inter, Montserrat } from "next/font/google";
import { ThemeProvider } from "@/components/ui/theme-provider";

const MontserratFont = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
});

const InterFont = Inter({
    variable: "--font-inter",
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
            <body className={`${MontserratFont.variable} ${InterFont.variable} antialiased`}>
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
