"use server";

import prisma from "@/lib/prisma";

export async function getSchedules() {
  try {
    const schedules = await prisma.schedule.findMany({
        orderBy: {
        eventStart: "asc",
      },
    });
    return schedules;
  } catch {
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
    return null;
  }
}

export async function getUpcomingSchedules() {
  try {
    const now = new Date();
    const schedules = await prisma.schedule.findMany({
        where: {
        eventStart: {
            gte: now,
        },
        },
        orderBy: {
        eventStart: "asc",
        },
    });
    return schedules;
  } catch {
    return [];
  }
}

export async function createSchedule(data: {
    title: string;
    description?: string;
    host?: string;
    eventStart: Date;
    eventEnd: Date;
    location?: string;
    meetingType?: string;
    meetingLink?: string;
}) {
  try {
    const schedule = await prisma.schedule.create({
        data: {
        title: data.title,
        description: data.description || null,
        eventStart: data.eventStart,
        eventEnd: data.eventEnd,
        location: data.location || null,
        host: data.host || null,
        meetingType: data.meetingType || null,
        meetingLink: data.meetingLink || null,
        },
    });
    return { success: true, schedule };
  } catch {
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
        host: formData.get("host") as string | null,
        meetingType: formData.get("meetingType") as string | null,
        meetingLink: formData.get("meetingLink") as string | null,
    };
    const schedule = await prisma.schedule.update({
        where: { id: id },
        data: {
        title: data.title,
        description: data.description,
        eventStart: data.eventStart,
        eventEnd: data.eventEnd,
        location: data.location,
        host: data.host,
        meetingType: data.meetingType,
        meetingLink: data.meetingLink,
        },
    });
    return { success: true, schedule };
  } catch {
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
    return { success: false, error: "Gagal menghapus jadwal." };
  }
}