import { Loader2 } from "lucide-react"

export function AuthLoading() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Loader2 className="h-9 w-9 animate-spin text-primary mb-4" />
      <p className="text-muted-foreground text-sm">Memeriksa kredensial...</p>
    </div>
  )
}