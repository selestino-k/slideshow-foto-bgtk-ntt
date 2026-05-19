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
import { Edit, CalendarIcon } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { updateSchedule } from "@/lib/actions/schedule-actions"
import { format } from "date-fns"
import { id as idLocale } from "date-fns/locale"
import { useRouter } from "next/navigation"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface EditJadwalDialogProps {
  id: number
  title: string
  description: string | null
  eventStart: Date
  eventEnd: Date
  location: string | null
  host: string | null
  meetingType: string | null
  meetingLink: string | null
}

export function EditJadwalDialog({ 
  id, 
  title, 
  description, 
  eventStart, 
  eventEnd, 
  location,
  host,
  meetingType,
  meetingLink,
}: EditJadwalDialogProps) {
  const { toast } = useToast()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  
  const formatTime = (date: Date) => {
    const d = new Date(date)
    const hours = String(d.getHours()).padStart(2, '0')
    const minutes = String(d.getMinutes()).padStart(2, '0')
    return `${hours}:${minutes}`
  }

  const [startDate, setStartDate] = useState<Date>(new Date(eventStart))
  const [endDate, setEndDate] = useState<Date>(new Date(eventEnd))
  const [startTime, setStartTime] = useState(formatTime(eventStart))
  const [endTime, setEndTime] = useState(formatTime(eventEnd))
  const [formData, setFormData] = useState({
    title: title,
    description: description || "",
    location: location || "",
    host: host || "",
    meetingType: meetingType || "",
    meetingLink: meetingLink || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      // Combine date and time
      const [startHour, startMinute] = startTime.split(':').map(Number)
      const [endHour, endMinute] = endTime.split(':').map(Number)
      
      const newEventStart = new Date(startDate)
      newEventStart.setHours(startHour, startMinute, 0, 0)
      
      const newEventEnd = new Date(endDate)
      newEventEnd.setHours(endHour, endMinute, 0, 0)

      const formDataToSend = new FormData()
      formDataToSend.append("title", formData.title)
      formDataToSend.append("description", formData.description)
      formDataToSend.append("eventStart", newEventStart.toISOString())
      formDataToSend.append("eventEnd", newEventEnd.toISOString())
      formDataToSend.append("location", formData.location)
      formDataToSend.append("host", formData.host)
      formDataToSend.append("meetingType", formData.meetingType)
      formDataToSend.append("meetingLink", formData.meetingLink)

      const result = await updateSchedule(formDataToSend, id)

      if (!result.success) {
        throw new Error(result.error || "Gagal memperbarui jadwal")
      }
      router.refresh()
      toast({
        title: "Sukses",
        description: "Jadwal berhasil diperbarui",
      })
      setOpen(false)
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Gagal memperbarui jadwal",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen) {
      setFormData({
        title,
        description: description || "",
        location: location || "",
        host: host || "",
        meetingType: meetingType || "",
        meetingLink: meetingLink || "",
      })
      setStartDate(new Date(eventStart))
      setEndDate(new Date(eventEnd))
      setStartTime(formatTime(eventStart))
      setEndTime(formatTime(eventEnd))
    }
    setOpen(newOpen)
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button variant="secondary">
          <Edit className="h-4 w-4"/>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-131.25">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Edit Jadwal</DialogTitle>
            <DialogDescription>
              Perbarui informasi jadwal. Klik simpan untuk menyimpan perubahan.
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
                required
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
                rows={2}
                disabled={isLoading}
              />
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label>
                  Tanggal & Waktu Mulai <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      className="w-full justify-start"
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "dd/MM/yyyy", { locale: idLocale }) : "Pilih Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      className="w-full"
                      mode="single"
                      selected={startDate}
                      onSelect={(date) => date && setStartDate(date)}
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
              <div className="grid gap-2">
                <Label>
                  Tanggal & Waktu Selesai <span className="text-red-500">*</span>
                </Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="default"
                      size="lg"
                      className="w-full justify-start"
                      disabled={isLoading}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "dd/MM/yyyy", { locale: idLocale }) : "Pilih Tanggal"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent>
                    <Calendar
                      className="w-full"
                      mode="single"
                      selected={endDate}
                      onSelect={(date) => date && setEndDate(date)}
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
            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="host">Host (Opsional)</Label>
                <Input
                  id="host"
                  value={formData.host}
                  onChange={(e) =>
                    setFormData({ ...formData, host: e.target.value })
                  }
                  disabled={isLoading}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="meetingType">Tipe Pertemuan (Opsional)</Label>
                <Select
                  value={formData.meetingType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, meetingType: value })
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Pilih Tipe Pertemuan" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Daring (Online)">Daring (Online)</SelectItem>
                    <SelectItem value="Luring (Offline)">Luring (Offline)</SelectItem>
                    <SelectItem value="Hybrid">Hybrid</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="meetingLink">Link Pertemuan (Opsional)</Label>
              <Input
                id="meetingLink"
                value={formData.meetingLink}
                onChange={(e) =>
                  setFormData({ ...formData, meetingLink: e.target.value })
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
              {isLoading ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}