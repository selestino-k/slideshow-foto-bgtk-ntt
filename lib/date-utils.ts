import { parseISO } from "date-fns";

export function toSafeDate(value: Date | string | null | undefined): Date | null {
  if (!value) return null;

  if (value instanceof Date) {
    return Number.isNaN(value.getTime()) ? null : value;
  }

  if (typeof value !== "string") return null;

  const trimmed = value.trim();
  if (!trimmed) return null;

  const dateOnlyMatch = /^(\d{4})-(\d{2})-(\d{2})$/.exec(trimmed);
  if (dateOnlyMatch) {
    const [, year, month, day] = dateOnlyMatch;
    return new Date(Number(year), Number(month) - 1, Number(day));
  }

  const normalized = trimmed.includes(" ") ? trimmed.replace(" ", "T") : trimmed;
  const parsed = normalized.includes("T") || normalized.includes("Z") || normalized.includes("+")
    ? parseISO(normalized)
    : new Date(normalized);

  return Number.isNaN(parsed.getTime()) ? null : parsed;
}
