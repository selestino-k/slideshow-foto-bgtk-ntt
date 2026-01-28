'use client'

import { useState } from 'react'
import { Calendar } from '@/components/ui/calendar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Clock, MapPin } from 'lucide-react'
import { format, isSameDay, parseISO } from 'date-fns'
import { id } from 'date-fns/locale'

interface Schedule {
  id: number
  title: string
  description: string | null
  eventStart: Date
  eventEnd: Date
  location: string | null
  createdAt: Date
  updatedAt: Date
}

interface CalendarTimelineProps {
  schedules: Schedule[]
}

export function CalendarTimeline({ schedules }: CalendarTimelineProps) {
  const [selectedDate, setSelectedDate] = useState<Date>(new Date())

  // Get schedules for selected date
  const selectedSchedules = schedules.filter((schedule) =>
    isSameDay(parseISO(schedule.eventStart.toString()), selectedDate)
  )

  // Get dates that have schedules for calendar highlighting
  const scheduleDates = schedules.map((schedule) =>
    parseISO(schedule.eventStart.toString())
  )

  // Format time
  const formatTime = (date: Date) => {
    return format(parseISO(date.toString()), 'HH:mm', { locale: id })
  }

  // Calculate duration
  const calculateDuration = (start: Date, end: Date) => {
    const startDate = parseISO(start.toString())
    const endDate = parseISO(end.toString())
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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Calendar Section */}
      <Card className="lg:col-span-1">
        <CardHeader>
          <CardTitle>Kalender</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 items-center">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            locale={id}
            className="rounded-md border"
            modifiers={{
              scheduled: scheduleDates,
            }}
            modifiersStyles={{
              scheduled: {
                fontWeight: 'bold',
                backgroundColor: 'hsl(var(--primary))',
                color: 'white',
              },
            }}
          />
          <div className="mt-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-primary"></span>
              Tanggal dengan jadwal
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Timeline Section */}
      <Card className="lg:col-span-2">
        <CardHeader>
          <CardTitle>
            Jadwal - {format(selectedDate, 'EEEE, dd MMMM yyyy', { locale: id })}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {selectedSchedules.length > 0 ? (
            <div className="space-y-4">
              {selectedSchedules
                .sort((a, b) => {
                  const dateA = parseISO(a.eventStart.toString())
                  const dateB = parseISO(b.eventStart.toString())
                  return dateA.getTime() - dateB.getTime()
                })
                .map((schedule, index) => (
                  <div
                    key={schedule.id}
                    className="relative pl-8 pb-6 last:pb-0"
                  >
                    {/* Timeline Line */}
                    {index !== selectedSchedules.length - 1 && (
                      <div className="absolute left-[11px] top-6 bottom-0 w-0.5 bg-border" />
                    )}

                    {/* Timeline Dot */}
                    <div className="absolute left-0 top-1 w-6 h-6 rounded-full bg-primary border-4 border-background" />

                    {/* Schedule Card */}
                    <div className="bg-muted/50 rounded-lg p-4 hover:bg-muted transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1 space-y-2">
                          <h3 className="font-semibold text-lg">
                            {schedule.title}
                          </h3>
                          
                          {schedule.description && (
                            <p className="text-sm text-muted-foreground">
                              {schedule.description}
                            </p>
                          )}

                          <div className="flex flex-wrap gap-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              <span>
                                {formatTime(schedule.eventStart)} -{' '}
                                {formatTime(schedule.eventEnd)}
                              </span>
                            </div>
                            {schedule.location && (
                              <div className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span>{schedule.location}</span>
                              </div>
                            )}
                          </div>

                          <Badge variant="secondary" className="text-xs">
                            Durasi: {calculateDuration(schedule.eventStart, schedule.eventEnd)}
                          </Badge>
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
              <p className="text-lg font-medium text-muted-foreground">
                Tidak ada jadwal
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                Tidak ada jadwal yang tersedia untuk tanggal ini
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}