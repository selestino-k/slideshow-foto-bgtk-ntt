"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Plus, CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createSchedule } from "@/lib/actions/schedule-actions"
import { format } from "date-fns"
import { id as idLocale }  from "date-fns/locale"
import { useRouter } from "next/navigation"

export function TambahJadwalDialog() {
  const { toast } = useToast()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [startDate, setStartDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [startTime, setStartTime] = useState("09:00")
  const [endTime, setEndTime] = useState("17:00")
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!startDate || !endDate) {
      toast({
        title: "Error",
        description: "Tanggal mulai dan selesai harus diisi",
        variant: "destructive",
      })
      return
    }

    setIsLoading(true)

    try {
      // Combine date and time
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const [endHour, endMinute] = endTime.split(':').map(Number)
      
      const eventStart = new Date(startDate)
      eventStart.setHours(startHour, startMinute, 0, 0)
      
      const eventEnd = new Date(endDate)
      eventEnd.setHours(endHour, endMinute, 0, 0)

      const result = await createSchedule({
        title: formData.title,
        description: formData.description || undefined,
        eventStart,
        eventEnd,
        location: formData.location || undefined,
      })

      if (!result.success) {
        throw new Error(result.error || "Gagal membuat jadwal")
      }
      router.refresh()
      toast({
        title: "Sukses",
        description: "Jadwal berhasil ditambahkan",
      })
      setOpen(false)
      setFormData({
        title: "",
        description: "",
        location: "",
      })
      setStartDate(undefined)
      setEndDate(undefined)
      setStartTime("09:00")
      setEndTime("17:00")
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal membuat jadwal",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" size="lg">
          <Plus className="mr-2 h-8 w-8" />
          Tambah Jadwal Baru
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[525px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Tambah Jadwal Baru</DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk menambahkan jadwal baru. Klik simpan untuk menyimpan jadwal.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">
                Judul <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }

                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Deskripsi (Opsional)</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
                rows={3}
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label>
                Tanggal & Waktu Mulai <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "PPP", { locale: idLocale }) : "Pilih Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      className="w-full"
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      locale={idLocale}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label>
                Tanggal & Waktu Selesai <span className="text-red-500">*</span>
              </Label>
              <div className="flex gap-2">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "PPP", { locale: idLocale }) : "Pilih Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      className="w-full"
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      locale={idLocale}
                    />
                  </PopoverContent>
                </Popover>
                <Input
                  type="time"
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  disabled={isLoading}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="location">Lokasi (Opsional)</Label>
              <Input
                id="location"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isLoading}
            >
              Batal
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Menyimpan..." : "Simpan Jadwal"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}