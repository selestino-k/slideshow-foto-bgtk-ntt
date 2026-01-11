import type { Metadata } from "next";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeProvider } from "@/components/ui/theme-provider";
import { ModeToggle } from "@/components/dark-switch";
import { Toaster } from "sonner";
import { AdminAppSidebar } from "@/components/admin/admin-sidebar";


export const metadata: Metadata = {
  title: "Panel Admin Slideshow Foto BGTK NTT",
  description: "Panel Admin untuk mengelola slideshow foto kepala BGTK NTT",
};

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <SidebarProvider
          defaultOpen={true}
          style={{
            "--sidebar-width": "250px",
            "--sidebar-width-mobile": "100%",
          } as React.CSSProperties}
        >
          <AdminAppSidebar />

          <main className="gap-3 w-full">
            <div className="flex items-center content-center justify-between p-4 bg-white dark:bg-gray-950 border-b shadow-sm">
              <SidebarTrigger/>
              <ModeToggle />
            </div>
            <div className="flex w-full min-h-screen items-center justify-items-center">
              {children}
              <Toaster position="top-right" />
            </div>
          </main>
        </SidebarProvider>
      </ThemeProvider>
  );
}
