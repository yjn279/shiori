"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  ChevronLeft,
  Camera,
  MapPin,
  Clock,
  FileText,
  Link as LinkIcon,
  X,
  Plus,
} from "lucide-react";
import { CategoryIcon } from "@/components/ui/category-icon";
import { mockShioriList, mockSchedules } from "@/lib/mock-data";
import type { ScheduleCategory } from "@/lib/types";

const categories: { value: ScheduleCategory; label: string }[] = [
  { value: "transport", label: "移動" },
  { value: "accommodation", label: "宿泊" },
  { value: "food", label: "食事" },
  { value: "activity", label: "観光" },
  { value: "shopping", label: "買い物" },
  { value: "other", label: "その他" },
];

export default function ScheduleEditPage() {
  const params = useParams();
  const router = useRouter();
  const shioriId = params.id as string;
  const scheduleId = params.scheduleId as string;

  const shiori = mockShioriList.find((s) => s.id === shioriId);
  const schedule = mockSchedules[shioriId]?.find((s) => s.id === scheduleId);

  const [formData, setFormData] = useState({
    title: schedule?.title || "",
    description: schedule?.description || "",
    category: schedule?.category || ("activity" as ScheduleCategory),
    startTime: schedule?.startTime || "09:00",
    endTime: schedule?.endTime || "",
    locationName: schedule?.location?.name || "",
    locationAddress: schedule?.location?.address || "",
    url: schedule?.url || "",
    memo: schedule?.memo || "",
  });

  const [photos, setPhotos] = useState<string[]>(schedule?.photos || []);

  if (!shiori || !schedule) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">スケジュールが見つかりません</p>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(`/shiori/${shioriId}/schedule/${scheduleId}`);
  };

  const handleAddPhoto = () => {
    const newPhoto = `https://images.unsplash.com/photo-${Date.now()}?w=400&h=400&fit=crop`;
    setPhotos([...photos, newPhoto]);
  };

  const handleRemovePhoto = (index: number) => {
    setPhotos(photos.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href={`/shiori/${shioriId}/schedule/${scheduleId}`}
            className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <h1 className="font-serif text-lg text-foreground">予定を編集</h1>
          <div className="w-16" />
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-4 py-6 space-y-6">
        {/* Category Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">
            カテゴリー
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() =>
                  setFormData({ ...formData, category: cat.value })
                }
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                  formData.category === cat.value
                    ? "border-primary bg-primary/10"
                    : "border-border/50 bg-card hover:border-primary/50"
                }`}
              >
                <CategoryIcon category={cat.value} size="md" />
                <span className="text-xs font-medium">{cat.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            タイトル <span className="text-destructive">*</span>
          </label>
          <input
            type="text"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="例: 東京駅出発"
            className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            説明
          </label>
          <input
            type="text"
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            placeholder="例: 新幹線で京都へ"
            className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Time */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <Clock className="w-4 h-4 text-primary" />
            時間
          </label>
          <div className="flex items-center gap-3">
            <input
              type="time"
              value={formData.startTime}
              onChange={(e) =>
                setFormData({ ...formData, startTime: e.target.value })
              }
              className="flex-1 px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <span className="text-muted-foreground">〜</span>
            <input
              type="time"
              value={formData.endTime}
              onChange={(e) =>
                setFormData({ ...formData, endTime: e.target.value })
              }
              className="flex-1 px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* Location */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <MapPin className="w-4 h-4 text-secondary" />
            場所
          </label>
          <div className="space-y-2">
            <input
              type="text"
              value={formData.locationName}
              onChange={(e) =>
                setFormData({ ...formData, locationName: e.target.value })
              }
              placeholder="場所の名前"
              className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
            <input
              type="text"
              value={formData.locationAddress}
              onChange={(e) =>
                setFormData({ ...formData, locationAddress: e.target.value })
              }
              placeholder="住所（任意）"
              className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
            />
          </div>
        </div>

        {/* URL */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <LinkIcon className="w-4 h-4 text-foreground/70" />
            関連リンク
          </label>
          <input
            type="url"
            value={formData.url}
            onChange={(e) => setFormData({ ...formData, url: e.target.value })}
            placeholder="https://..."
            className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Memo */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-2">
            <FileText className="w-4 h-4 text-primary" />
            メモ
          </label>
          <textarea
            value={formData.memo}
            onChange={(e) => setFormData({ ...formData, memo: e.target.value })}
            placeholder="予約番号や注意事項など..."
            rows={4}
            className="w-full px-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all resize-none"
          />
        </div>

        {/* Photos */}
        <div>
          <label className="flex items-center gap-2 text-sm font-medium text-foreground mb-3">
            <Camera className="w-4 h-4 text-primary" />
            写真
          </label>
          <div className="grid grid-cols-3 gap-2">
            {photos.map((photo, index) => (
              <div key={index} className="relative aspect-square">
                <img
                  src={photo}
                  alt={`写真 ${index + 1}`}
                  className="w-full h-full object-cover rounded-xl"
                />
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(index)}
                  className="absolute -top-2 -right-2 p-1 bg-destructive text-destructive-foreground rounded-full shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={handleAddPhoto}
              className="aspect-square flex flex-col items-center justify-center gap-1 bg-card border-2 border-dashed border-border/50 rounded-xl hover:border-primary/50 hover:bg-accent/30 transition-all"
            >
              <Plus className="w-6 h-6 text-muted-foreground" />
              <span className="text-xs text-muted-foreground">追加</span>
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          <button
            type="submit"
            className="w-full py-3.5 bg-primary text-primary-foreground rounded-xl font-medium hover:bg-primary/90 transition-colors"
          >
            変更を保存
          </button>
        </div>
      </form>
    </div>
  );
}
