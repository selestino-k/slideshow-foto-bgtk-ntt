"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export type JadwalDetail = {
    id: number;
    title: string;
    description: string | null;
    eventStart: Date;
    eventEnd: Date;
    host: string | null;
    location: string | null;
    meetingType: string | null;
    meetingLink: string | null;
    createdAt: Date;
};

interface JadwalDetailDialogProps {
    jadwal: JadwalDetail | null;
    open: boolean;
    onOpenChange: (open: boolean) => void;
}

export function JadwalDetailDialog({ jadwal, open, onOpenChange }: JadwalDetailDialogProps) {
    if (!jadwal) return null;

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="max-w-lg p-0 overflow-hidden font-montserrat">
                {/* Header */}
                <DialogHeader className="bg-event text-primary-foreground px-6 py-5">
                    <DialogTitle className="text-2xl font-bold leading-snug">
                        {jadwal.title}
                    </DialogTitle>
                </DialogHeader>

                <div className="px-6 py-5 space-y-5">
                    {/* Description */}
                    <div>
                        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Deskripsi</p>
                    </div>
                    {jadwal.description && (
                        <p className="text-foreground leading-relaxed text-sm">{jadwal.description}</p>

                    )}

                    <Separator />

                    {/* Event Details */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Waktu Mulai</p>
                            <Badge variant="outline" className="text-sm font-medium border-foreground text-foreground">
                                {new Date(jadwal.eventStart).toLocaleString("id-ID")}
                            </Badge>
                        </div>
                        <div className="space-y-1">
                            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Waktu Selesai</p>
                            <Badge variant="outline" className="text-sm font-medium border-foreground text-foreground">
                                {new Date(jadwal.eventEnd).toLocaleString("id-ID")}
                            </Badge>
                        </div>
                        {jadwal.location && (
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Lokasi</p>
                                <p className="text-foreground text-sm">{jadwal.location}</p>
                            </div>
                        )}
                        {jadwal.host && (
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Host</p>
                                <p className="text-foreground text-sm">{jadwal.host}</p>
                            </div>
                        )}
                        {jadwal.meetingType && (
                            <div className="space-y-1">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Tipe Pertemuan</p>
                                <p className="text-foreground text-sm">{jadwal.meetingType}</p>
                            </div>
                        )}
                        {jadwal.meetingLink && (
                            <div className="space-y-1 sm:col-span-2">
                                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Link Pertemuan</p>
                                <a
                                    href={jadwal.meetingLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary hover:text-primary/80 break-all underline underline-offset-4 text-sm"
                                >
                                    {jadwal.meetingLink}
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
