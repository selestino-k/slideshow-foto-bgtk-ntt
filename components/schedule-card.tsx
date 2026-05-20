'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, MapPin, Presentation, Timer } from 'lucide-react'
import { format, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'
import { JadwalDetailDialog, type JadwalDetail } from '@/components/jadwal-detail-dialog'
import { DigitalClock } from '@/components/digital-clock'

type Schedule = JadwalDetail & { updatedAt: Date }

interface ScheduleCardProps {
  schedules: Schedule[]
}

export function ScheduleCard({ schedules }: ScheduleCardProps) {
  const [dialogJadwal, setDialogJadwal] = useState<JadwalDetail | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)

  const today = new Date()

  // Get schedules for today (including multi-day events)
  const todaySchedules = schedules.filter((schedule) => {
    const startDate = schedule.eventStart instanceof Date
      ? schedule.eventStart
      : parseISO(String(schedule.eventStart))
    const endDate = schedule.eventEnd instanceof Date
      ? schedule.eventEnd
      : parseISO(String(schedule.eventEnd))

    const todayDay = new Date(today)
    todayDay.setHours(0, 0, 0, 0)

    const eventStartDay = new Date(startDate)
    eventStartDay.setHours(0, 0, 0, 0)

    const eventEndDay = new Date(endDate)
    eventEndDay.setHours(0, 0, 0, 0)

    return todayDay >= eventStartDay && todayDay <= eventEndDay
  })

  // Format time
  const formatTime = (date: Date) => {
    const eventDate = date instanceof Date ? date : parseISO(String(date))
    return format(eventDate, 'HH:mm', { locale: id })
  }

  // Format date
  const formatDate = (date: Date) => {
    const eventDate = date instanceof Date ? date : parseISO(String(date))
    return format(eventDate, 'dd/MM/yyyy', { locale: id })
  }

  // Calculate duration
  const calculateDuration = (start: Date, end: Date) => {
    const startDate = start instanceof Date ? start : parseISO(String(start))
    const endDate = end instanceof Date ? end : parseISO(String(end))
    const diff = endDate.getTime() - startDate.getTime()
    const hours = Math.floor(diff / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (hours > 0 && minutes > 0) {
      return `${hours} jam ${minutes} menit`
    } else if (hours > 0) {
      return `${hours} jam`
    } else {
      return `${minutes} menit`
    }
  }

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-center gap-2 space-y-2 flex-wrap ">
            <Clock className="w-6 h-6 text-primary" />
            <DigitalClock className="text-4xl" />
            <CardTitle className='text-2xl font-bold text-center'>
              {format(today, 'EEEE, dd MMMM yyyy', { locale: id })}
            </CardTitle>
            
          </div>
        </CardHeader>
        <CardContent>
          {todaySchedules.length > 0 ? (
            <div className="space-y-4">
              {todaySchedules
                .sort((a, b) => {
                  const dateA = a.eventStart instanceof Date ? a.eventStart : parseISO(String(a.eventStart))
                  const dateB = b.eventStart instanceof Date ? b.eventStart : parseISO(String(b.eventStart))
                  return dateA.getTime() - dateB.getTime()
                })
                .map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className="relative pl-8 pb-6 last:pb-0"
                  >
                    {/* Timeline Line */}
                    {index !== todaySchedules.length - 1 && (
                      <div className="absolute left-2.75 top-6 bottom-0 w-0.5 bg-border" />
                    )}

                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-0 w-6 h-6 rounded-full bg-event border-4 border-background" />

                    {/* Schedule Item */}
                    <div
                      className="rounded-lg hover:bg-muted transition-colors cursor-pointer mx-2 p-2 py-0"
                      onClick={() => { setDialogJadwal(schedule); setDialogOpen(true) }}
                    >
                      <div className="flex-1 space-y-2 max-w-xl">
                        <h3 className="font-semibold text-lg">{schedule.title}</h3>

                        {schedule.description && (
                          <p className="text-sm text-muted-foreground">{schedule.description}</p>
                        )}

                        <div className="grid flex-wrap gap-3 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>
                              {formatDate(schedule.eventStart)} {formatTime(schedule.eventStart)} -{' '}
                              {formatDate(schedule.eventEnd)} {formatTime(schedule.eventEnd)}
                            </span>
                          </div>
                          {schedule.meetingType && (
                            <div className="flex items-center gap-1">
                              <Presentation className="w-4 h-4" />
                              <span>Jenis: {schedule.meetingType}</span>
                            </div>
                          )}
                          {schedule.location && (
                            <div className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              <span>{schedule.location}</span>
                            </div>
                          )}
                          <div className="flex items-center gap-1">
                            <Timer className="w-4 h-4" />
                            <span>Durasi: {calculateDuration(schedule.eventStart, schedule.eventEnd)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="rounded-full bg-muted p-6 mb-4">
                <Clock className="w-12 h-12 text-muted-foreground" />
              </div>
              <p className="text-lg font-medium text-muted-foreground">Tidak ada jadwal</p>
              <p className="text-sm text-muted-foreground mt-1">
                Tidak ada jadwal yang tersedia untuk hari ini
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      <JadwalDetailDialog
        jadwal={dialogJadwal}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </>
  )
}