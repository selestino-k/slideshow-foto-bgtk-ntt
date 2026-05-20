import { getSchedules } from '@/lib/actions/schedule-actions'
import { TambahJadwalDialog } from './tambah-jadwal dialog'
import { columns } from './columns'
import { DataTable } from '@/components/ui/data-table'

export default async function JadwalPage() {
    const schedules = await getSchedules()

    return (
        <div className="items-stretch w-full min-h-screen p-8 pb-20 font-montserrat">
            <main className="flex flex-col gap-3 w-full">
                <div className="flex items-center justify-between">
                    <h2 className="text-2xl/7 font-semibold sm:truncate sm:text-5xl sm:tracking-tight text-primary dark:text-primary">
                        Daftar Jadwal
                    </h2>
                </div>
                <div className="mt-10 flex">
                    <TambahJadwalDialog />
                </div>
                <div className="w-full mt-5 font-inter">
                <DataTable columns={columns} data={schedules} />
                </div>
            </main>
        </div>
    )
}