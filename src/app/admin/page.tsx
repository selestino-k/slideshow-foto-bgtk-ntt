import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import prisma from "@/lib/prisma"
import { ChartBox } from "@/components/admin/chart-box."
import { Suspense } from "react"
import { unstable_cache } from 'next/cache'
import { CircleLoader } from "@/components/ui/circle-loader"
import { getStats } from "@/lib/actions/admin/stats-actions"

// Cache the admin check
const checkAdminRole = unstable_cache(
  async (userId: string) => {
    return await prisma.user.findUnique({
      where: { id: userId },
      select: { role: true },
    })
  },
  ['admin-role'],
  { revalidate: 60 }
)

// Cache stats data
const getCachedStats = unstable_cache(
  async () => {
    const stats = await getStats()
    return stats
  },
  ['admin-stats'],
  { revalidate: 30 } // Refresh every 30 seconds
)

const Page = async () => {
  // Parallel data fetching
  const session = await auth()
  if (!session?.user) redirect("/sign-in")

  const [user, stats] = await Promise.all([
    checkAdminRole(session.user.id ?? ""),
    getCachedStats()
  ])

  if (user?.role !== "ADMIN") {
    redirect("/")
  }

  return (
    <div className="grid grid-rows-1 items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-3 row-start-[1] items-center sm:items-start">
        <h3 className="text-lg">
          Selamat datang <b>{session.user?.name}</b> ({session.user?.email}) di Panel Admin
        </h3>
        <h2 className="text-2xl/7 font-bold sm:truncate sm:text-5xl sm:tracking-tight">
          SI Peminjaman dan Inventaris Lab Bioscience
        </h2>   
        <h3 className="text-lg">
          UPT Laboratorium Terpadu - Universitas Nusa Cendana
        </h3> 
        
        <Suspense fallback={<CircleLoader size="lg" />}>
          <ChartBox 
            rentCount={stats.rentCount}
            instrumenCount={stats.instrumenCount}
            bahanCount={stats.bahanCount}
            barangCount={stats.barangCount}
            alatCount={stats.alatCount}
            userCount={stats.userCount}
            chartData={stats.chartData}
          />
        </Suspense>
      </main>
    </div>
  )
}

export const runtime = 'nodejs' // Use Node.js runtime for better performance
export const preferredRegion = 'auto' // Automatically choose closest region
export const dynamic = 'force-dynamic' // Force dynamic rendering

export default Page


