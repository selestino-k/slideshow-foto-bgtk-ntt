import { Button } from "@/components/ui/button";
import { ImagePlay, User, Plus, CalendarDays, CalendarClock } from "lucide-react";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { CalendarTimeline } from "@/src/app/(home)/jadwal/calendar-timeline";
import { getSchedules } from "@/lib/actions/schedule-actions";

async function getDashboardData() {
    const now = new Date();
    const totalPhotos = await prisma.photo.count();
    const totalAdmins = await prisma.user.count();
    const totalSchedules = await prisma.schedule.count();
    const ongoingSchedules = await prisma.schedule.count({
        where: {
            eventStart: { lte: now },
            eventEnd: { gte: now },
        },
    });

    return {
        totalPhotos,
        totalAdmins,
        totalSchedules,
        ongoingSchedules,
    };
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/sign-in");
    }

    const dashboardData = await getDashboardData();
    const schedules = await getSchedules();

    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-(family-name:--font-geist-sans)">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                        Dashboard
                    </h2>
                    <Button variant="default" size="lg" asChild>
                        <Link href="/admin/daftar-foto/tambah">
                            <Plus className="mr-2 h-8 w-8" />
                            Tambahkan Foto
                        </Link>
                    </Button>
                </div>
                <div className="mt-5 flex">
                    <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                        <div>
                            <h4 className="text-lg text-muted-foreground">Total Foto Slideshow</h4>
                            <h2 className="text-3xl font-bold">
                                <ImagePlay className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalPhotos}
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Jumlah Pengguna</h4>
                            <h2 className="text-3xl font-bold">
                                <User className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalAdmins}
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Total Jadwal</h4>
                            <h2 className="text-3xl font-bold">
                                <CalendarDays className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.totalSchedules}
                            </h2>
                        </div>
                        <div>
                            <h4 className="text-lg text-muted-foreground">Jadwal Berlangsung</h4>
                            <h2 className="text-3xl font-bold">
                                <CalendarClock className="inline-block mr-2 h-6 w-6 text-primary" />
                                {dashboardData.ongoingSchedules}
                            </h2>
                        </div>
                    </div>
                </div>
                <div className="mt-6 place-self-center max-w-4xl w-full">
                    <CalendarTimeline schedules={schedules} />
                </div>
                
            </main>
        </div>
    );
}






