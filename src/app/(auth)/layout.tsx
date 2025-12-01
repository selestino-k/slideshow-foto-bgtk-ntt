import type { Metadata } from "next";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/dark-switch";

export const metadata: Metadata = {
  title: "SI Inventaris Lab Bioscience",
  description: "Sistem Informasi Inventaris Lab Bioscience - UPT Laboratorium Terpadu Universitas Nusa Cendana",
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
    <main className="gap-3 w-full">
      <div className="flex justify-end p-4">
        <ModeToggle />
      </div>
        <div className="flex  min-h-screen items-center justify-items-center">
        {children}
        </div>
  
    </main>
    </ThemeProvider>

  );
}


