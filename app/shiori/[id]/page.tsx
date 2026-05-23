"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Share2,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Users,
  Map,
  ChevronRight,
  Plus,
} from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { DayTabsContainer } from "@/components/schedule/day-tabs";
import { ScheduleList } from "@/components/schedule/schedule-item";
import { getShioriById, getSchedulesByShioriId } from "@/lib/mock-data";
import { formatDateRange, getTripStatus } from "@/lib/date-utils";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ShioriDetailPage({ params }: PageProps) {
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
          <Link
            href="/"
            className="text-primary hover:underline"
          >
            ホームに戻る
          </Link>
        </div>
      </main>
    );
  }

  const status = getTripStatus(shiori.startDate, shiori.endDate);
  
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
            href="/"
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

      {/* Hero Card */}
      <div className="px-4 py-4">
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
          {/* Decorative tape */}
          <div className="absolute top-3 left-6 w-14 h-5 bg-amber-100/70 rounded-sm transform -rotate-2 z-10" />
          <div className="absolute top-3 right-8 w-12 h-5 bg-amber-100/70 rounded-sm transform rotate-3 z-10" />
          
          <div className="flex flex-col sm:flex-row">
            {/* Info */}
            <div className="flex-1 p-5">
              {status && (
                <span className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-xs font-medium mb-3">
                  {status}
                </span>
              )}
              
              <h2 className="text-2xl font-bold text-foreground mb-2">
                {shiori.title}
              </h2>
              
              <p className="text-sm text-muted-foreground mb-2">
                {formatDateRange(shiori.startDate, shiori.endDate)}
              </p>
              
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <Users className="w-4 h-4" />
                <span>{shiori.memberCount}人</span>
              </div>
              
              {shiori.description && (
                <p className="text-sm text-foreground/80 mb-4">
                  {shiori.description}
                </p>
              )}
              
              <Link
                href={`/shiori/${shiori.id}/schedule`}
                className="inline-flex items-center gap-1 text-sm font-medium text-foreground border border-border rounded-full px-4 py-2 hover:bg-muted transition-colors"
              >
                旅のしおりを見る
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
            
            {/* Cover Image */}
            <div className="relative w-full sm:w-52 h-44 sm:h-auto sm:min-h-[220px]">
              {shiori.coverImageUrl ? (
                <Image
                  src={shiori.coverImageUrl}
                  alt={shiori.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground">No Image</span>
                </div>
              )}
              
              {/* Edit button */}
              <button className="absolute bottom-4 right-4 bg-card/90 backdrop-blur-sm p-2.5 rounded-full shadow-md hover:bg-card transition-colors">
                <Pencil className="w-5 h-5 text-foreground" />
              </button>
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
          href={`/shiori/${shiori.id}/map`}
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
            <p className="text-muted-foreground mb-4">
              この日のスケジュールはまだありません
            </p>
          </div>
        )}

        {/* Add Schedule Button */}
        <div className="flex justify-center py-6">
          <Link
            href={`/shiori/${shiori.id}/schedule/new`}
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
