import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { DropdownMenu } from "@/components/ui/dropdown-menu"
import { SidebarUser } from "./sidebar-user"
import { SidebarNav } from "./sidebar-nav"
import Image from "next/image"
import Link from "next/link"
import { authOptions } from "@/lib/auth"
import { getServerSession } from "next-auth"

// Sidebar component with explicit background styling
export async function AdminAppSidebar() {
    const session = await getServerSession(authOptions);
    
    const userData = {
        name: session?.user?.name || "Admin BGTK NTT",
        email: session?.user?.email || "bgtkntt@kemendikasmen.go.id",
    }

    return (
        <Sidebar side="left" className="bg-primary dark:bg-gray-950 text-white dark:text-white-700 border-r shadow-sm transition-all duration-300 ease-in-out font-montserrat">
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
                        <SidebarGroupLabel className="text-md mb-3 text-white">PANEL ADMIN SLIDESHOW</SidebarGroupLabel>
                        <SidebarNav />
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