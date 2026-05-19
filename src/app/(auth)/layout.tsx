import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/dark-switch";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Masuk | Panel Admin Slideshow dan SI Jadwal BGTK NTT",
    description: "Silahkan masuk ke akun Anda untuk melanjutkan.",
};

export default function AuthLayout({
  children,
}:{
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem
      disableTransitionOnChange
    >
      <main className="relative w-full min-h-screen">
        <div className="absolute top-4 right-4 z-20">
          <ModeToggle />
        </div>
        <div className="flex min-h-screen items-center justify-center">
          {children}
        </div>
      </main>
    </ThemeProvider>
  );
}
