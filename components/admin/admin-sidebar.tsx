import {  ChartPie, User, ImagePlay, List } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { SidebarUser } from "./sidebar-user"
import Image from "next/image"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

const items = [
    {
        title: "Dashboard",
        url: "/admin",
        icon: ChartPie,
    },
    {
        title: "Daftar Foto",
        url: "/admin/daftar-foto",
        icon: List,
    },
    {
        title: "Galeri Foto",
        url: "/admin/galeri-foto",
        icon: ImagePlay,
    },
    {
        title: "Pengguna",
        url: "/admin/user",
        icon: User,
    },
]

// Sidebar component with explicit background styling
export async function AdminAppSidebar() {
    const session = await getServerSession(authOptions);
    
    const userData = {
        name: session?.user?.name || "Admin BGTK NTT",
        email: session?.user?.email || "bgtkntt@kemendikasmen.go.id",
    }

    return (
        <Sidebar side="left" className="bg-primary dark:bg-gray-950 text-white dark:text-white-700 border-r shadow-sm transition-all duration-300 ease-in-out">
            <SidebarHeader className="bg-primary dark:bg-gray-950">
                <div className="pl-2 py-2">
                <Link href="/" className="flex items-center gap-2" prefetch={false}>
                    <Image src="/images/logo/logo-admin-bgtk-ntt.png" alt="Balai GTK Logo" width={250} height={48}/>
                    
                </Link>
                </div>
            </SidebarHeader>
            <SidebarContent className="bg-primary dark:bg-gray-950">
                <SidebarGroup>
                    <SidebarGroupContent>
                        <DropdownMenu>
                        </DropdownMenu>
                        <SidebarGroupLabel className="text-base items-center text-white dark:text-white-700 mb-5">PANEL ADMIN</SidebarGroupLabel>
                        <SidebarMenu className="space-y-3 font-semibold font-geist">
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <a href={item.url} className="flex items-center gap-3 px-3 py-2 rounded-md
                                             hover:bg-primary-70 h-12 pl-8 dark:hover:bg-primary-700 transition-colors">
                                            <item.icon className="h-8 w-8" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="bg-primary dark:bg-gray-950">
                <SidebarUser user={userData} />
                <div className="p-4 text-sm text-white dark:text-white-700">
                    <p> © {new Date().getFullYear()} BGTK NTT</p>
                </div>
            </SidebarFooter>
        </Sidebar>
    )
}