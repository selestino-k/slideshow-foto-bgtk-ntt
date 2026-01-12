import { Button } from "@/components/ui/button";
import { ImagePlay, User, Plus } from "lucide-react";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import prisma from "@/lib/prisma";
import { DashChart } from "@/components/admin/dash-chart";
import { format, subMonths, addMonths, startOfMonth, endOfMonth, parseISO, isValid } from "date-fns";
import { id as idLocale } from "date-fns/locale";
import { toast } from "@/hooks/use.toast";

async function getDashboardData() {
    const totalPhotos = await prisma.photo.count();
    const totalAdmins = await prisma.user.count();
    
    // Fetch photos for chart
    const photos = await prisma.photo.findMany({
        select: {
            timelineDate: true,
        },
        orderBy: {
            createdAt: 'desc',
        },
    });


    // Calculate chart data - showing past 12 months, current month, and next 2 months
    const months: { month: string; count: number }[] = [];
    const currentDate = new Date();
    
    // Start from 12 months ago and go to 3 months in the future
    for (let i = -12; i <= 3; i++) {
        const monthDate = i < 0 ? subMonths(currentDate, Math.abs(i)) : addMonths(currentDate, i);
        const monthStart = startOfMonth(monthDate);
        const monthEnd = endOfMonth(monthDate);
        
        const photosInMonth = photos.filter(photo => {
            try {
                const photoDate = parseISO(photo.timelineDate);
                
                if (!isValid(photoDate)) {
                    toast.warning('Invalid date: ' + photo.timelineDate);
                    return false;
                }
                
                const inRange = photoDate >= monthStart && photoDate <= monthEnd;
                return inRange;
            } catch {
            toast.error('Error parsing date: ' + photo.timelineDate);
                return false;
                
            }
        });

        months.push({
            month: format(monthDate, "MMMM",  { locale: idLocale }),
            count: photosInMonth.length,
        });
    }


    return {
        totalPhotos,
        totalAdmins,
        chartData: months,
    };
}

export default async function AdminPage() {
    const session = await getServerSession(authOptions);

    if (!session?.user?.id) {
        redirect("/sign-in");
    }

    const dashboardData = await getDashboardData();

    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
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
                            <h4 className="text-lg text-muted-foreground">Total Foto</h4>
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
                    </div>
                </div>
                <div className="mt-6 place-self-center max-w-4xl w-full">
                    <div className="mb-4 h-1/2  ">
                    <DashChart initialData={dashboardData.chartData} />
                    </div>

                </div>
                
            </main>
        </div>
    );
}






