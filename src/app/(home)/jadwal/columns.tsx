"use client";

import { ColumnDef } from "@tanstack/react-table";


export type JadwalHome = {
    id: number;
    title: string;
    description: string | null;
    eventStart: Date;
    eventEnd: Date;
    location: string | null;
    createdAt: Date;
};

export const columns: ColumnDef<JadwalHome>[] = [
    {
        accessorKey: "id",
        header: "No.",
        cell: ({ row }) => {
            const id = row.index + 1;
            return <span className="text-xs font-mono">{id}</span>;
        }
    },
    {
        accessorKey: "title",
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
                    {", Pukul "}
                    {eventStart.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
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
                    {", Pukul "}
                    {eventEnd.toLocaleTimeString("id-ID", {
                        hour: "2-digit",
                        minute: "2-digit",
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
    
];