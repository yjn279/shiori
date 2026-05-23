"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  MoreHorizontal,
  Map,
  ChevronRight,
  Plus,
} from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { DayTabsContainer } from "@/components/schedule/day-tabs";
import { ScheduleList } from "@/components/schedule/schedule-item";
import { getShioriById, getSchedulesByShioriId } from "@/lib/mock-data";
import { formatDateRange } from "@/lib/date-utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ScheduleListPage({ params }: PageProps) {
  const { id } = use(params);
  const shiori = getShioriById(id);
  const allSchedules = getSchedulesByShioriId(id);
  
  const [selectedDate, setSelectedDate] = useState<Date | null>(
    shiori ? new Date(shiori.startDate) : null
  );

  if (!shiori) {
    return (
      <main className="flex-1 flex items-center justify-center bg-background">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">しおりが見つかりません</p>
          <Link href="/" className="text-primary hover:underline">
            ホームに戻る
          </Link>
        </div>
      </main>
    );
  }

  // Filter schedules by selected date
  const filteredSchedules = selectedDate
    ? allSchedules.filter((s) => {
        const scheduleDate = new Date(s.date);
        return (
          scheduleDate.getFullYear() === selectedDate.getFullYear() &&
          scheduleDate.getMonth() === selectedDate.getMonth() &&
          scheduleDate.getDate() === selectedDate.getDate()
        );
      })
    : [];

  const handleDayChange = (dayNumber: number, date: Date) => {
    setSelectedDate(date);
  };

  return (
    <main className="flex-1 pb-24 bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href={`/shiori/${id}`}
            className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
          </Link>
          
          <div className="flex-1 text-center">
            <h1 className="text-lg font-semibold text-foreground flex items-center justify-center gap-1">
              しおり旅
              <LeafDecoration />
            </h1>
            <p className="text-xs text-muted-foreground">
              思い出を、しおりに残そう。
            </p>
          </div>
          
          <div className="flex items-center gap-1">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <MessageCircle className="w-5 h-5" />
            </button>
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <MoreHorizontal className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mini Hero */}
      <div className="px-4 py-3">
        <div className="relative bg-card rounded-xl overflow-hidden border border-border">
          {/* Tape decorations */}
          <div className="absolute top-2 left-4 w-10 h-4 bg-amber-100/70 rounded-sm transform -rotate-2 z-10" />
          <div className="absolute top-2 right-6 w-8 h-4 bg-amber-100/70 rounded-sm transform rotate-3 z-10" />
          
          <div className="flex items-center gap-4 p-4">
            {/* Cover thumbnail */}
            <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              {shiori.coverImageUrl ? (
                <Image
                  src={shiori.coverImageUrl}
                  alt={shiori.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted" />
              )}
            </div>
            
            {/* Info */}
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-semibold text-foreground truncate">
                {shiori.title}
              </h2>
              <p className="text-xs text-muted-foreground">
                {formatDateRange(shiori.startDate, shiori.endDate)}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Day Tabs */}
      <div className="px-4 border-b border-border">
        <DayTabsContainer
          startDate={shiori.startDate}
          endDate={shiori.endDate}
          onDayChange={handleDayChange}
        />
      </div>

      {/* Map Link */}
      <div className="px-4 py-3 flex justify-end">
        <Link
          href={`/shiori/${id}/map`}
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <Map className="w-4 h-4" />
          地図を見る
          <ChevronRight className="w-4 h-4" />
        </Link>
      </div>

      {/* Schedule List */}
      <div className="px-4">
        {filteredSchedules.length > 0 ? (
          <ScheduleList schedules={filteredSchedules} />
        ) : (
          <div className="text-center py-12">
            <EmptyScheduleIcon />
            <p className="text-muted-foreground mt-4 mb-4">
              この日のスケジュールはまだありません
            </p>
          </div>
        )}

        {/* Add Schedule Button */}
        <div className="flex justify-center py-6">
          <Link
            href={`/shiori/${id}/schedule/new`}
            className="flex items-center gap-2 text-muted-foreground border border-dashed border-border rounded-full px-6 py-3 hover:border-primary hover:text-primary transition-colors"
          >
            <Plus className="w-5 h-5" />
            予定を追加
          </Link>
        </div>
      </div>

      {/* Decorative footer */}
      <div className="px-4 py-8 flex justify-end">
        <div className="opacity-30">
          <TravelTicketDecoration />
        </div>
      </div>

      <BottomNavigation />
    </main>
  );
}

function LeafDecoration() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-accent inline-block">
      <path
        d="M12 2C14 4 16 8 16 12C16 16 14 20 12 22C10 20 8 16 8 12C8 8 10 4 12 2Z"
        fill="currentColor"
        opacity="0.5"
      />
    </svg>
  );
}

function EmptyScheduleIcon() {
  return (
    <svg
      width="60"
      height="60"
      viewBox="0 0 60 60"
      fill="none"
      className="mx-auto text-muted-foreground/30"
    >
      <rect
        x="10"
        y="15"
        width="40"
        height="35"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path d="M10 25H50" stroke="currentColor" strokeWidth="2" />
      <path d="M20 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <path d="M40 10V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="30" cy="38" r="8" stroke="currentColor" strokeWidth="2" fill="none" />
      <path d="M30 34V38H34" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function TravelTicketDecoration() {
  return (
    <svg width="80" height="50" viewBox="0 0 80 50" fill="none">
      <rect
        x="2"
        y="5"
        width="76"
        height="40"
        rx="4"
        fill="#f5efe6"
        stroke="#e0d8ce"
        strokeWidth="1"
      />
      <line
        x1="25"
        y1="5"
        x2="25"
        y2="45"
        stroke="#e0d8ce"
        strokeWidth="1"
        strokeDasharray="3 3"
      />
      <rect x="8" y="12" width="10" height="8" rx="1" fill="#c4956a" opacity="0.5" />
      <line x1="32" y1="15" x2="70" y2="15" stroke="#e0d8ce" strokeWidth="1" />
      <line x1="32" y1="22" x2="60" y2="22" stroke="#e0d8ce" strokeWidth="1" />
      <line x1="32" y1="29" x2="55" y2="29" stroke="#e0d8ce" strokeWidth="1" />
    </svg>
  );
}
