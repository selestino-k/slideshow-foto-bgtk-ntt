import { getSchedules } from '@/lib/actions/schedule-actions'
import { CalendarTimeline } from '@/src/app/(home)/jadwal/calendar-timeline'
import { TambahJadwalDialog } from './tambah-jadwal dialog'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

export default async function JadwalPage() {
  const schedules = await getSchedules()

  return (
    <div className="items-stretch w-full min-h-screen p-8 pb-20 font-[family-name:var(--font-geist-sans)]">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary">
                        Daftar Jadwal
                    </h2>
                </div>
                <div className="mt-10 flex">
                    <TambahJadwalDialog />
                </div>
                <div className="mt-6 w-full">
                    <CalendarTimeline schedules={schedules} />
                </div>
                <div className="h-20" />
                <DataTable columns={columns} data={schedules} />
            </main>
        </div>
  )
}