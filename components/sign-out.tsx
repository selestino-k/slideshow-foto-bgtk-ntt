"use client"

import { Button } from "@/components/ui/button"
import { signOut } from "next-auth/react"
import { useState } from "react"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function SignOut() {
  const [open, setOpen] = useState(false)
  const [isLoggingOut, setIsLoggingOut] = useState(false)

  const handleSignOut = async () => {
    setIsLoggingOut(true)
    
    try {
      // Keep the dialog open while signing out
      await signOut({ 
        callbackUrl: "/sign-in",
        redirect: true
      })
    } catch  {
      setIsLoggingOut(false)
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Log Out</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Apakah anda yakin untuk Log Out?</AlertDialogTitle>
          <AlertDialogDescription>
            Anda perlu Log In lagi nanti untuk mengakses sistem.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoggingOut}>Batal</AlertDialogCancel>
          <Button 
            variant="destructive" 
            onClick={handleSignOut}
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Log Out"}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}