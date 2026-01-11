"use client"

import { cn } from "@/lib/utils"

interface CircleLoaderProps {
  size?: "sm" | "md" | "lg" | "xl"
  color?: "primary" | "secondary" | "accent" | "white"
  className?: string
}

export function CircleLoader({ size = "md", color = "primary", className }: CircleLoaderProps) {
  // Map size to actual pixel values
  const sizeMap = {
    sm: "h-4 w-4 border-2",
    md: "h-8 w-8 border-2",
    lg: "h-12 w-12 border-3",
    xl: "h-16 w-16 border-4",
  }

  // Map color to Tailwind classes with dark mode support
  const colorMap = {
    primary: "border-t-primary dark:border-t-primary",
    secondary: "border-t-secondary dark:border-t-secondary",
    accent: "border-t-emerald-500 dark:border-t-emerald-400",
    white: "border-t-white dark:border-t-white",
    muted: "border-t-gray-500 dark:border-t-gray-400",
    adaptive: "border-t-gray-800 dark:border-t-gray-200",
  }

  return (
    <div className={cn("relative flex items-center justify-center", className)}>
      <div className={cn("animate-spin rounded-full border-transparent", sizeMap[size], colorMap[color])} />
    </div>
  )
}