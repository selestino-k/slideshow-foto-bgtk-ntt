import type { Metadata } from "next";
import { AdminAppSidebar } from "@/components/admin/admin-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/dark-switch";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  title: "Panel Admin SIPI Lab Bioscience Undana",
  description: "Sistem Informasi Inventaris Lab Bioscience - UPT Laboratorium Terpadu Universitas Nusa Cendana",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const session = await auth();
  if (!session) {
    redirect("/sign-in");
  }
  
  return (
    <SessionProvider>
      <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
      >
        <SidebarProvider>
            <AdminAppSidebar/> 
            <main className="gap-3 w-full">
                <div className="flex items-center content-center justify-between p-4 bg-white dark:bg-gray-950 border-b shadow-sm">
                <SidebarTrigger/>
                <ModeToggle/>
                </div>
                <div className="flex w-full min-h-screen items-center justify-items-center">
                  {children}
                  <Toaster position="top-right" />

                </div>
            </main>
        </SidebarProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}


