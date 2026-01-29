import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ModeToggle } from "@/components/dark-switch"
import { getSchedules } from '@/lib/actions/schedule-actions'
import { CalendarTimeline } from './calendar-timeline'
import { DataTable } from "@/components/ui/data-table"
import { columns } from "./columns"

export default async function JadwalPage() {
  const schedules = await getSchedules()

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-gray-950">
      {/* Header */}
      <header className="flex sticky top-0 z-40 bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex items-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 text-gray-600 dark:text-gray-300 hover:text-primary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl font-bold text-primary font-geist">
            Jadwal Kegiatan
          </h1>
        </div>
        <div className="absolute right-4 my-5">
          <ModeToggle />
        </div>
      </header>

      {/* Calendar Content */}
      <main className="container mx-auto px-4 py-6">
        <CalendarTimeline schedules={schedules} />
        <div className="mt-5" />
        <DataTable columns={columns} data={schedules} />
      </main>

    </div>
  )
}