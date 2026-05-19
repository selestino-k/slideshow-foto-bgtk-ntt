"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useState } from "react";
import { EditJadwalDialog } from "./edit-jadwal-dialog";
import { DeleteJadwalDialog } from "./delete-jadwal-dialog";
import { JadwalDetailDialog } from "../../(home)/jadwal/jadwal-detail-dialog";
import { Button } from "@/components/ui/button";


export type Jadwal = {
    id: number;
    title: string;
    description: string | null;
    eventStart: Date;
    eventEnd: Date;
    location: string | null;
    host: string | null;
    meetingType: string | null;
    meetingLink: string | null;
    createdAt: Date;
};

export const columns: ColumnDef<Jadwal>[] = [
    {
        accessorKey: "id",
        header: "ID",
        cell: ({ row }) => {
            const id = row.index + 1;
            return <span className="text-xs font-mono">{id}</span>;
        }
    },
    {
        accessorKey: "title",
        header: "Nama Acara",
        cell: ({ row }) => {
            const title = row.getValue("title") as string;
            const truncatedTitle = title.length > 50 ? title.substring(0, 50) + "..." : title;
            return <span>{truncatedTitle}</span>;
        }
    },
    {
        accessorKey: "eventStart",
        header: "Waktu Mulai",
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
        header: "Waktu Selesai",
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
    {
        accessorKey: "host",
        header: "Host",
        cell: ({ row }) => {
            const host = row.getValue("host") as string | null;
            return host ? (
                <span>{host}</span>
            ) : (
                <span className="text-sm text-gray-400 italic">-</span>
            );
        },
    },
    {
        accessorKey: "meetingType",
        header: "Tipe Pertemuan",
        cell: ({ row }) => {
            const meetingType = row.getValue("meetingType") as string | null;
            return meetingType ? (
                <span>{meetingType}</span>
            ) : (
                <span className="text-sm text-gray-400 italic">-</span>
            );
        },
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => {
            const jadwalId = row.original.id;
            const jadwalTitle = row.original.title;

            const ActionsCell = () => {
                const [detailOpen, setDetailOpen] = useState(false);
                return (
                    <div className="flex items-center gap-2">
                        <Button variant="outline" size="sm" onClick={() => setDetailOpen(true)}>
                            Detail
                        </Button>
                        <JadwalDetailDialog
                            jadwal={row.original}
                            open={detailOpen}
                            onOpenChange={setDetailOpen}
                        />
                        <EditJadwalDialog
                            id={jadwalId}
                            title={row.original.title}
                            description={row.original.description}
                            eventStart={row.original.eventStart}
                            eventEnd={row.original.eventEnd}
                            location={row.original.location}
                            host={row.original.host}
                            meetingType={row.original.meetingType}
                            meetingLink={row.original.meetingLink}
                        />
                        <DeleteJadwalDialog
                            id={jadwalId}
                            title={jadwalTitle}
                        />
                    </div>
                );
            };

            return <ActionsCell />;
        },
    },
];