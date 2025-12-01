import { auth } from "@/lib/auth"
import { redirect } from "next/navigation"
import UpdateAdminForm from "./update-admin-form"

export default async function PengaturanAdminPage() {
  const session = await auth()
  
  if (!session?.user) {
    redirect("/sign-in")
  } 

  // Verify admin role
  if (session.user.role !== "ADMIN") {
    redirect("/sign-in")
  }

  return (
    <UpdateAdminForm user={session.user} />
  )
}