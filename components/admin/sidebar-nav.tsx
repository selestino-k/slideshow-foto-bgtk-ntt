"use client"

import { usePathname } from "next/navigation"
import {
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"
import Link from "next/link"
import { ChartPie, User, List, Calendar } from "lucide-react"

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
        title: "Jadwal Kegiatan",
        url: "/admin/jadwal",
        icon: Calendar,
    },
    {
        title: "Pengguna",
        url: "/admin/user",
        icon: User,
    },
]

export function SidebarNav() {
    const pathname = usePathname()

    return (
        <SidebarMenu className="space-y-3 font-semibold font-geist">
            {items.map((item) => {
                const isActive =
                    item.url === "/admin"
                        ? pathname === "/admin"
                        : pathname.startsWith(item.url)

                return (
                    <SidebarMenuItem key={item.title}>
                        <SidebarMenuButton asChild>
                            <Link
                                href={item.url}
                                className={`flex items-center gap-3 px-3 py-2 rounded-md h-12 pl-8 transition-colors
                                    ${isActive
                                        ? "bg-white/20 text-white"
                                        : "dark:hover:bg-primary-700"
                                    }`}
                            >
                                <item.icon className="h-8 w-8" />
                                <span>{item.title}</span>
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                )
            })}
        </SidebarMenu>
    )
}
