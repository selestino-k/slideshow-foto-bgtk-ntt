"use client"

import { ColumnDef } from "@tanstack/react-table"


declare module "@tanstack/react-table" {
  interface TableMeta<TData> {
    currentUserId?: string
  }
}

export type User = {
  id: string
  email: string
  name: string
  createdAt: Date
  updatedAt: Date
}

export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "id",
    header: "ID",
    cell: ({ row }) => {
      const id = row.original.id
      return <span className="text-xs font-mono">{id.substring(0, 8)}...</span>
    },
  },
  {
    accessorKey: "name",
    header: "Nama",
    cell: ({ row }) => {
      return <span className="font-medium">{row.getValue("name")}</span>
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => {
      return <span className="text-sm">{row.getValue("email")}</span>
    },
  },
  
  {
    accessorKey: "createdAt",
    header: "Tanggal Dibuat",
    cell: ({ row }) => {
      const date = new Date(row.getValue("createdAt") as Date)
      return (
        <span className="text-sm">
          {date.toLocaleDateString("id-ID", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </span>
      )
    },
  },
]