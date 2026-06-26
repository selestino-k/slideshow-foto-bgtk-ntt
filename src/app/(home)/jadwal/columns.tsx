"use client";

import { useState } from "react";
import { ColumnDef } from "@tanstack/react-table";
import { JadwalDetailDialog, type JadwalDetail } from "../../../../components/jadwal-detail-dialog";
import { toSafeDate } from "@/lib/date-utils";

export type JadwalHome = JadwalDetail;

function JadwalDetailCell({ jadwal }: { jadwal: JadwalDetail }) {
    const [open, setOpen] = useState(false);
    return (
        <>
            <button
                onClick={() => setOpen(true)}
                className="text-primary hover:text-primary/80 font-medium"
            >
                Lihat Detail
            </button>
            <JadwalDetailDialog jadwal={jadwal} open={open} onOpenChange={setOpen} />
        </>
    );
}

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
        cell: ({ row }) => {
            const title = row.getValue("title") as string;
            const truncatedTitle = title.length > 50 ? title.substring(0, 50) + "..." : title;
            return <span>{truncatedTitle}</span>;
        }
    },
    {
        accessorKey: "eventStart",
        header: "Tanggal Mulai",
        cell: ({ row }) => {
            const eventStart = toSafeDate(row.original.eventStart);
            if (!eventStart) {
                return <span className="text-sm text-gray-400 italic">Tidak ada data</span>;
            }
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
            const eventEnd = toSafeDate(row.original.eventEnd);
            if (!eventEnd) {
                return <span className="text-sm text-gray-400 italic">Tidak ada data</span>;
            }
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
        accessorKey: "meetingType",
        header: "Tipe Pertemuan",
        cell: ({ row }) => {
            const meetingType = row.getValue("meetingType") as string | null;
            return meetingType ? (
                <span>{meetingType}</span>
            ) : (
                <span className="text-sm text-gray-400 italic">Tidak ada tipe pertemuan</span>
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
                <span className="text-sm text-gray-400 italic">Tidak ada host</span>
            );
        },
    },
    {
        id: "actions",
        header: "Aksi",
        cell: ({ row }) => <JadwalDetailCell jadwal={row.original} />,
    }
];