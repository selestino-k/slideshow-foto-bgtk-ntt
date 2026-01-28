"use client";

import { ColumnDef } from "@tanstack/react-table";
import { EditJadwalDialog } from "./edit-jadwal-dialog";
import {DeleteJadwalDialog} from "./delete-jadwal-dialog";


export type Jadwal = {
    id: number;
    title: string;
    description: string | null;
    eventStart: Date;
    eventEnd: Date;
    location: string | null;
    createdAt: Date;
};

export const columns: ColumnDef<Jadwal>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.original.id.toString();
            return <span className="text-xs font-mono">{id}</span>;
        },
    },
    {
        accessorKey: "eventName",
        header: "Nama Acara",
    },
    {
        accessorKey: "eventStart",
        header: "Tanggal Mulai",
        cell: ({ row }) => {
            const eventStart = new Date(row.original.eventStart);
            return (
                <span>
                    {eventStart.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
            );
        }
    },
    {
        accessorKey: "eventEnd",
        header: "Tanggal Selesai",
        cell: ({ row }) => {
            const eventEnd = new Date(row.original.eventEnd);
            return (
                <span>
                    {eventEnd.toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                        year: "numeric",
                    })}
                </span>
            );
        }
    },
    {
        accessorKey: "location",
        header: "Lokasi",
        cell: ({ row }) => {
            const location = row.getValue("location") as string | null;
            return location ? (
                <span>{location}</span>
            ) : (
                <span className="text-sm text-gray-400 italic">Tidak ada lokasi</span>
            );
        },
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const jadwalId = row.original.id;
            const jadwalTitle = row.original.title;
            return (
                <div className="flex items-center gap-2">
                <EditJadwalDialog  
                    id={jadwalId}
                    title={row.original.title}
                    description={row.original.description}
                    eventStart={row.original.eventStart}
                    eventEnd={row.original.eventEnd}
                    location={row.original.location}
                />
                <DeleteJadwalDialog 
                    id={jadwalId} 
                    title={jadwalTitle} 
                />
                </div>


            );
        },
    },
];