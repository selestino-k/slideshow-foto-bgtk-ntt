'use client'

import { useEffect, useState } from 'react'
import { Badge } from '@/components/ui/badge'

interface DigitalClockProps {
  className?: string
}

export function DigitalClock({ className }: DigitalClockProps) {
  const [time, setTime] = useState<Date | null>(null)

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000)
    return () => clearInterval(interval)
  }, [])

  if (!time) return null

  const hours = time.getHours().toString().padStart(2, '0')
  const minutes = time.getMinutes().toString().padStart(2, '0')
  const seconds = time.getSeconds().toString().padStart(2, '0')

  return (
    <Badge
      variant="outline"
      className={`flex items-center gap-1.5 font-mono px-3 py-1 tabular-nums ${className ?? ''}`}
    >
      <span>{hours}:{minutes}:{seconds}</span>
    </Badge>
  )
}
