"use server";

import prisma from "@/lib/prisma";
import { toast } from "sonner";

export async function getSchedules() {
  try {
    const schedules = await prisma.schedule.findMany({
        orderBy: {
        eventStart: "asc",
      },
    });
    return schedules;
  } catch {
    toast.error("Gagal memuat jadwal.");
    return [];
  }
}

export async function getScheduleById(id: number) {
  try {
    const schedule = await prisma.schedule.findUnique({
        where: { id: id },
    });
    return schedule;
  } catch {
    toast.error("Gagal memuat jadwal.");
    return null;
  }
}

export async function createSchedule(data: {
    title: string;
    description?: string;
    eventStart: Date;
    eventEnd: Date;
    location?: string;
}) {
  try {
    const schedule = await prisma.schedule.create({
        data: {
        title: data.title,
        description: data.description,
        eventStart: data.eventStart,
        eventEnd: data.eventEnd,
        location: data.location,
        },
    });
    return { success: true, schedule };
  } catch {
    toast.error("Gagal membuat jadwal.");
    return { success: false, error: "Gagal membuat jadwal." };
  }
}

export async function updateSchedule(formData: FormData, id:number) {

    try {
    const data = {
        title: formData.get("title") as string,
        description: formData.get("description") as string | null,
        eventStart: new Date(formData.get("eventStart") as string),
        eventEnd: new Date(formData.get("eventEnd") as string),
        location: formData.get("location") as string | null,
    };
    const schedule = await prisma.schedule.update({
        where: { id: id },
        data: {
        title: data.title,
        description: data.description,
        eventStart: data.eventStart,
        eventEnd: data.eventEnd,
        location: data.location,
        },
    });
    return { success: true, schedule };
  } catch {
    toast.error("Gagal memperbarui jadwal.");
    return { success: false, error: "Gagal memperbarui jadwal." };
  } 
}

export async function deleteSchedule(id: number) {
  try {
    await prisma.schedule.delete({
        where: { id: id },
    });
    return { success: true };
  } catch {
    toast.error("Gagal menghapus jadwal.");
    return { success: false, error: "Gagal menghapus jadwal." };
  }
}