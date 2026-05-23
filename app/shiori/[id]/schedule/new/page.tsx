"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Search, MapPin, Clock, X } from "lucide-react";
import { categoryLabels, type ScheduleCategory } from "@/lib/types";
import { getShioriById } from "@/lib/mock-data";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface PageProps {
  params: Promise<{ id: string }>;
}

const categories: ScheduleCategory[] = [
  "sightseeing",
  "eating",
  "staying",
  "shopping",
  "transport",
  "other",
];

export default function ScheduleNewPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const shiori = getShioriById(id);

  const [title, setTitle] = useState("");
  const [category, setCategory] = useState<ScheduleCategory>("sightseeing");
  const [selectedDate, setSelectedDate] = useState(
    shiori ? format(new Date(shiori.startDate), "yyyy-MM-dd") : ""
  );
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [memo, setMemo] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [showPlaceSearch, setShowPlaceSearch] = useState(false);

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

  const isValid = title.trim() && category && selectedDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    // In real app, this would create the schedule via API
    router.push(`/shiori/${id}/schedule`);
  };

  // Generate available dates for the trip
  const tripDays: Date[] = [];
  const start = new Date(shiori.startDate);
  const end = new Date(shiori.endDate);
  for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 1)) {
    tripDays.push(new Date(d));
  }

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/shiori/${id}/schedule`}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold text-foreground">
                予定を追加
              </h1>
              <p className="text-xs text-muted-foreground">
                {shiori.title}
              </p>
            </div>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            タイトル
            <span className="text-destructive ml-0.5">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="例：札幌出発"
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
          />
        </div>

        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            カテゴリ
            <span className="text-destructive ml-0.5">*</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setCategory(cat)}
                className={`px-3 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  category === cat
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary text-secondary-foreground border border-border hover:bg-muted"
                }`}
              >
                {categoryLabels[cat]}
              </button>
            ))}
          </div>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            日付
            <span className="text-destructive ml-0.5">*</span>
          </label>
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1 scrollbar-hide">
            {tripDays.map((day, index) => {
              const dateStr = format(day, "yyyy-MM-dd");
              const isSelected = selectedDate === dateStr;
              
              return (
                <button
                  key={dateStr}
                  type="button"
                  onClick={() => setSelectedDate(dateStr)}
                  className={`flex-shrink-0 px-4 py-2 rounded-xl transition-colors ${
                    isSelected
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary text-secondary-foreground border border-border hover:bg-muted"
                  }`}
                >
                  <div className="text-xs font-medium">Day {index + 1}</div>
                  <div className="text-xs mt-0.5">
                    {format(day, "M/d（E）", { locale: ja })}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Time */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              開始時刻
              <span className="text-muted-foreground font-normal ml-1">（任意）</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="time"
                value={startTime}
                onChange={(e) => setStartTime(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              終了時刻
              <span className="text-muted-foreground font-normal ml-1">（任意）</span>
            </label>
            <div className="relative">
              <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="time"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
              />
            </div>
          </div>
        </div>

        {/* Place */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            場所
            <span className="text-muted-foreground font-normal ml-1">（任意）</span>
          </label>
          {placeName ? (
            <div className="flex items-center gap-3 px-4 py-3 rounded-xl border border-border bg-card">
              <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
              <span className="flex-1 text-foreground">{placeName}</span>
              <button
                type="button"
                onClick={() => setPlaceName("")}
                className="p-1 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowPlaceSearch(true)}
              className="flex items-center gap-3 w-full px-4 py-3 rounded-xl border border-dashed border-border bg-secondary/50 text-muted-foreground hover:border-primary hover:text-foreground transition-colors"
            >
              <Search className="w-5 h-5" />
              場所を検索
            </button>
          )}
        </div>

        {/* Memo */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            メモ
            <span className="text-muted-foreground font-normal ml-1">（任意）</span>
          </label>
          <textarea
            value={memo}
            onChange={(e) => setMemo(e.target.value)}
            placeholder="自由にメモを残せます"
            rows={3}
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow resize-none"
          />
        </div>

        {/* Submit */}
        <div className="pt-4 space-y-3">
          <button
            type="submit"
            disabled={!isValid}
            className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-medium hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            予定を追加
          </button>
          
          <Link
            href={`/shiori/${id}/schedule`}
            className="block text-center text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            キャンセル
          </Link>
        </div>
      </form>

      {/* Place Search Modal (placeholder) */}
      {showPlaceSearch && (
        <div className="fixed inset-0 bg-black/50 flex items-end z-50">
          <div className="bg-card rounded-t-3xl w-full max-h-[80vh] overflow-hidden">
            <div className="p-4 border-b border-border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-foreground">
                  場所を検索
                </h3>
                <button
                  onClick={() => setShowPlaceSearch(false)}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="場所を検索..."
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-secondary text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>
            </div>
            <div className="p-4 space-y-2 overflow-y-auto max-h-[50vh]">
              {/* Sample search results */}
              {["札幌駅", "定山渓温泉", "支笏湖", "小樽運河", "新千歳空港"].map((place) => (
                <button
                  key={place}
                  onClick={() => {
                    setPlaceName(place);
                    setShowPlaceSearch(false);
                  }}
                  className="flex items-center gap-3 w-full px-4 py-3 rounded-xl hover:bg-muted transition-colors text-left"
                >
                  <MapPin className="w-5 h-5 text-muted-foreground" />
                  <span className="text-foreground">{place}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
