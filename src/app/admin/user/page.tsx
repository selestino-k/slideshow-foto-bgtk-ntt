import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { columns } from "./columns";
import prisma from "@/lib/prisma";
import Link from "next/link";
import { DataTable } from "@/components/ui/data-table";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

async function getUserData() {
  const users = await prisma.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      email: true,
      name: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return users;
}

export default async function UsersPage() {
  const session = await getServerSession(authOptions);
  const userData = await getUserData();
  
  if (!session?.user?.id) {
    redirect("/sign-in");
  }

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 w-full">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
            Daftar Pengguna
          </h2>
        </div>
        <div className="mt-10 flex">
          <Button variant="default" size="lg" asChild>
            <Link href="/admin/users/buat">
              <Plus className="mr-2 h-8 w-8" />
              Tambah Pengguna
            </Link>
          </Button>
        </div>
        <div className="mt-6 w-full">
          {userData.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              Tidak ada pengguna yang tersedia.
            </div>
          ) : (
            <DataTable columns={columns} data={userData} meta={{ currentUserId: session.user.id }} />
          )}
        </div>
      </main>
    </div>
  );
}