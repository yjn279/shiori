import { format, differenceInDays } from "date-fns";
import { ja } from "date-fns/locale";

// Format date with Japanese locale
export function formatDate(date: Date | string, formatStr: string = "yyyy.M.d"): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, formatStr, { locale: ja });
}

// Format date range
export function formatDateRange(startDate: Date | string, endDate: Date | string): string {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  
  const startStr = format(start, "yyyy.M.d（E）", { locale: ja });
  const endStr = format(end, "M.d（E）", { locale: ja });
  
  return `${startStr} - ${endStr}`;
}

// Get day of week abbreviation
export function getDayOfWeek(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  return format(d, "E", { locale: ja });
}

// Calculate trip duration in days
export function getTripDuration(startDate: Date | string, endDate: Date | string): number {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  return differenceInDays(end, start) + 1;
}

// Generate day tabs for a trip
export function generateDayTabs(startDate: Date | string, endDate: Date | string): {
  dayNumber: number;
  date: Date;
  label: string;
  dateLabel: string;
}[] {
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const duration = getTripDuration(startDate, endDate);
  
  return Array.from({ length: duration }, (_, i) => {
    const date = new Date(start);
    date.setDate(date.getDate() + i);
    
    return {
      dayNumber: i + 1,
      date,
      label: `Day ${i + 1}`,
      dateLabel: format(date, "M.d（E）", { locale: ja }),
    };
  });
}

// Format time (HH:mm)
export function formatTime(time: string | undefined): string {
  if (!time) return "";
  return time;
}

// Check if a date is today
export function isToday(date: Date | string): boolean {
  const d = typeof date === "string" ? new Date(date) : date;
  const today = new Date();
  return (
    d.getDate() === today.getDate() &&
    d.getMonth() === today.getMonth() &&
    d.getFullYear() === today.getFullYear()
  );
}

// Check if a trip is ongoing
export function isTripOngoing(startDate: Date | string, endDate: Date | string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  const end = typeof endDate === "string" ? new Date(endDate) : endDate;
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  
  return today >= start && today <= end;
}

// Check if a trip is upcoming
export function isTripUpcoming(startDate: Date | string): boolean {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const start = typeof startDate === "string" ? new Date(startDate) : startDate;
  start.setHours(0, 0, 0, 0);
  
  return start > today;
}

// Get status label for a trip
export function getTripStatus(startDate: Date | string, endDate: Date | string): string | null {
  if (isTripOngoing(startDate, endDate)) {
    return "旅行中";
  }
  if (isTripUpcoming(startDate)) {
    return "次の旅";
  }
  return null;
}
