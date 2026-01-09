import { Button } from "@/components/ui/button";
import { Newspaper, ImagePlay, Book, User, Plus } from "lucide-react";
import Link from "next/link";


async function getDashboardData() {
    const totalPosts = "20";
    const totalMedia = "150";
    const totalDocuments = "35";
    const totalAdmins = "5";
    return {
        totalPosts,
        totalMedia,
        totalDocuments,
        totalAdmins,
    };
}

   

export default async function AdminPage() {
    const dashboardData = await getDashboardData();
    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                            Dashboard
                        </h2>
                        <Button variant="default" size="lg" asChild>
                            <Link href="/admin/posts/buat">
                                <Plus className="mr-2 h-8 w-8" />
                                Tambahkan Foto
                            </Link>
                        </Button>

                    </div>
                    <div className="mt-5 flex ">
                        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
                            <div>
                                <h4 className="text-lg text-muted-foreground">Total Postingan</h4>
                                <h2 className="text-3xl font-bold">
                                    <Newspaper className="inline-block mr-2 h-6 w-6 text-primary" />
                                    {dashboardData.totalPosts}
                                </h2>
                            </div>
                            <div>
                                <h4 className="text-lg text-muted-foreground">Jumlah Media</h4>
                                <h2 className="text-3xl font-bold">
                                    <ImagePlay className="inline-block mr-2 h-6 w-6 text-primary" />
                                    {dashboardData.totalMedia}
                                </h2>
                            </div>
                            <div>
                                <h4 className="text-lg text-muted-foreground">Jumlah Dokumen</h4>
                                <h2 className="text-3xl font-bold">
                                    <Book className="inline-block mr-2 h-6 w-6 text-primary" />
                                    {dashboardData.totalDocuments}
                                </h2>
                            </div>
                            <div>
                                <h4 className="text-lg text-muted-foreground">Total Admin</h4>
                                <h2 className="text-3xl font-bold">
                                    <User className="inline-block mr-2 h-6 w-6 text-primary" />
                                    {dashboardData.totalAdmins}
                                </h2>
                            </div>
                        </div>
                    </div>
                    
                </main>
            </div>
    );
}
        
    




