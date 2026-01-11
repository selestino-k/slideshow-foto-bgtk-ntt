import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import UpdateAdminForm from "./update-admin-form"
import { getServerSession } from "next-auth";

export default async function PengaturanAdminPage() {
  const session = await getServerSession(authOptions);
  
  if (!session?.user) {
    redirect("/sign-in")
  } 

  return (
    <UpdateAdminForm user={session.user} />
  )
}