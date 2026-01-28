import { toast as sonnerToast } from "sonner"

type ToastProps = {
  title?: string
  description?: string
  message ?: string
  variant?: "default" | "destructive"
  duration?: number
}

export function useToast() {
  const toast = ({ title, description, variant = "default", duration = 5000 }: ToastProps) => {
    if (variant === "destructive") {
      sonnerToast.error(title, {
        description: description,
        duration: duration,
      })
    } else {
      sonnerToast.success(title, {
        description: description,
        duration: duration,
      })
    }
  }

  return { toast }
}

export { sonnerToast as toast }