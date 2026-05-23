"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  MoreHorizontal,
  MapPin,
  Clock,
  FileText,
  Image as ImageIcon,
  Pencil,
  Trash2,
  ExternalLink,
  Navigation,
} from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { CategoryIcon } from "@/components/ui/category-icon";
import { mockShioriList, mockSchedules } from "@/lib/mock-data";
import { formatTime } from "@/lib/date-utils";

export default function ScheduleDetailPage() {
  const params = useParams();
  const router = useRouter();
  const shioriId = params.id as string;
  const scheduleId = params.scheduleId as string;

  const [showMenu, setShowMenu] = useState(false);

  const shiori = mockShioriList.find((s) => s.id === shioriId);
  const schedule = mockSchedules[shioriId]?.find((s) => s.id === scheduleId);

  if (!shiori || !schedule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">スケジュールが見つかりません</p>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm("この予定を削除しますか？")) {
      router.push(`/shiori/${shioriId}/schedule`);
    }
  };

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href={`/shiori/${shioriId}/schedule`}
            className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <h1 className="font-serif text-lg text-foreground">予定詳細</h1>
          <div className="relative">
            <button
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 rounded-full hover:bg-card transition-colors"
            >
              <MoreHorizontal className="w-5 h-5 text-foreground/70" />
            </button>
            {showMenu && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowMenu(false)}
                />
                <div className="absolute right-0 top-full mt-1 w-40 bg-card rounded-xl shadow-lg border border-border/50 overflow-hidden z-20">
                  <Link
                    href={`/shiori/${shioriId}/schedule/${scheduleId}/edit`}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors"
                  >
                    <Pencil className="w-4 h-4 text-primary" />
                    <span className="text-sm">編集</span>
                  </Link>
                  <button
                    onClick={handleDelete}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-accent/50 transition-colors w-full text-left text-destructive"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span className="text-sm">削除</span>
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Hero Image */}
        {schedule.imageUrl && (
          <div className="relative aspect-video rounded-2xl overflow-hidden mb-6 shadow-md">
            <img
              src={schedule.imageUrl}
              alt={schedule.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          </div>
        )}

        {/* Title Section */}
        <div className="flex items-start gap-4 mb-6">
          <div className="p-3 bg-card rounded-xl shadow-sm border border-border/30">
            <CategoryIcon category={schedule.category} size="lg" />
          </div>
          <div className="flex-1">
            <h2 className="text-xl font-bold text-foreground mb-1">
              {schedule.title}
            </h2>
            <p className="text-muted-foreground text-sm">
              {schedule.description}
            </p>
          </div>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-6">
          {/* Time */}
          <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30">
            <div className="p-2 bg-primary/10 rounded-lg">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-0.5">時間</p>
              <p className="font-medium text-foreground">
                {formatTime(schedule.startTime)}
                {schedule.endTime && ` - ${formatTime(schedule.endTime)}`}
              </p>
            </div>
          </div>

          {/* Location */}
          {schedule.location && (
            <div className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30">
              <div className="p-2 bg-secondary/10 rounded-lg">
                <MapPin className="w-5 h-5 text-secondary" />
              </div>
              <div className="flex-1">
                <p className="text-xs text-muted-foreground mb-0.5">場所</p>
                <p className="font-medium text-foreground">
                  {schedule.location.name}
                </p>
                {schedule.location.address && (
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {schedule.location.address}
                  </p>
                )}
              </div>
              <button className="p-2 bg-primary/10 rounded-lg hover:bg-primary/20 transition-colors">
                <Navigation className="w-4 h-4 text-primary" />
              </button>
            </div>
          )}

          {/* URL */}
          {schedule.url && (
            <a
              href={schedule.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border/30 hover:border-primary/50 transition-colors"
            >
              <div className="p-2 bg-accent/50 rounded-lg">
                <ExternalLink className="w-5 h-5 text-foreground/70" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-muted-foreground mb-0.5">
                  関連リンク
                </p>
                <p className="font-medium text-primary truncate">
                  {schedule.url}
                </p>
              </div>
            </a>
          )}
        </div>

        {/* Memo Section */}
        {schedule.memo && (
          <div className="mb-6">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-foreground">メモ</h3>
            </div>
            <div className="p-4 bg-card rounded-xl border border-border/30">
              <p className="text-sm text-foreground/80 whitespace-pre-wrap leading-relaxed">
                {schedule.memo}
              </p>
            </div>
          </div>
        )}

        {/* Photos Section */}
        {schedule.photos && schedule.photos.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-3">
              <ImageIcon className="w-4 h-4 text-primary" />
              <h3 className="font-medium text-foreground">写真</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {schedule.photos.map((photo, index) => (
                <div
                  key={index}
                  className="aspect-square rounded-xl overflow-hidden bg-accent/30"
                >
                  <img
                    src={photo}
                    alt={`写真 ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Edit Button */}
        <div className="mt-8">
          <Link
            href={`/shiori/${shioriId}/schedule/${scheduleId}/edit`}
            className="flex items-center justify-center gap-2 w-full py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            <Pencil className="w-4 h-4" />
            この予定を編集
          </Link>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
