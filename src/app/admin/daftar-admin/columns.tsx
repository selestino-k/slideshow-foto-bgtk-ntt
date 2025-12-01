"use client"
import { ColumnDef } from "@tanstack/react-table"


// This type is used to define the shape of our data.
export type User = {
    id: string
    email: string | null
    role: string 
    createdAt: Date
}

export const columns: ColumnDef<User>[] = [
 {
    accessorKey: "id",
    header: "ID",
  },
  {
    accessorKey: "email",
    header: "E-Mail",
  },
  {
    accessorKey: "role",
    header: "Peran (Role)",
  },
  {
    accessorKey: "createdAt",
    header: "Tanggal Pembuatan",
  }
]
