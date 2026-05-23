"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Camera, X, Trash2 } from "lucide-react";
import { getShioriById } from "@/lib/mock-data";
import { format } from "date-fns";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function ShioriEditPage({ params }: PageProps) {
  const { id } = use(params);
  const router = useRouter();
  const shiori = getShioriById(id);

  const [title, setTitle] = useState(shiori?.title || "");
  const [startDate, setStartDate] = useState(
    shiori ? format(new Date(shiori.startDate), "yyyy-MM-dd") : ""
  );
  const [endDate, setEndDate] = useState(
    shiori ? format(new Date(shiori.endDate), "yyyy-MM-dd") : ""
  );
  const [description, setDescription] = useState(shiori?.description || "");
  const [coverImage, setCoverImage] = useState<string | null>(
    shiori?.coverImageUrl || null
  );
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

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

  const isValid = title.trim() && startDate && endDate;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    
    // In real app, this would update the shiori via API
    router.push(`/shiori/${id}`);
  };

  const handleDelete = () => {
    // In real app, this would delete the shiori via API
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href={`/shiori/${id}`}
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">
              しおりを編集
            </h1>
          </div>
        </div>
      </header>

      <form onSubmit={handleSubmit} className="px-5 py-6 space-y-6">
        {/* Cover Image */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            表紙画像
          </label>
          
          {coverImage ? (
            <div className="relative w-full h-48 rounded-xl overflow-hidden bg-muted">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={coverImage}
                alt="Cover"
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setCoverImage(null)}
                className="absolute top-2 right-2 bg-foreground/80 text-background p-1.5 rounded-full hover:bg-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed border-border bg-secondary/50 cursor-pointer hover:border-primary hover:bg-secondary transition-colors">
              <Camera className="w-8 h-8 text-muted-foreground mb-2" />
              <span className="text-sm text-muted-foreground">
                タップして画像を選択
              </span>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => setCoverImage(reader.result as string);
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
          )}
        </div>

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
            className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
          />
        </div>

        {/* Dates */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              旅行開始日
              <span className="text-destructive ml-0.5">*</span>
            </label>
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              旅行終了日
              <span className="text-destructive ml-0.5">*</span>
            </label>
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
              min={startDate}
              className="w-full px-4 py-3 rounded-xl border border-border bg-card text-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-shadow"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">
            説明文
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
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
            変更を保存
          </button>
          
          <Link
            href={`/shiori/${id}`}
            className="block text-center text-muted-foreground text-sm hover:text-foreground transition-colors"
          >
            キャンセル
          </Link>
        </div>

        {/* Delete Section */}
        <div className="pt-8 border-t border-border">
          <button
            type="button"
            onClick={() => setShowDeleteConfirm(true)}
            className="flex items-center gap-2 text-destructive text-sm hover:underline"
          >
            <Trash2 className="w-4 h-4" />
            このしおりを削除
          </button>
        </div>
      </form>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-2xl p-6 max-w-sm w-full shadow-xl">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              しおりを削除しますか？
            </h3>
            <p className="text-sm text-muted-foreground mb-6">
              この操作は取り消せません。関連するスケジュールも全て削除されます。
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="flex-1 px-4 py-3 rounded-xl border border-border text-foreground font-medium hover:bg-muted transition-colors"
              >
                キャンセル
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 px-4 py-3 rounded-xl bg-destructive text-destructive-foreground font-medium hover:bg-destructive/90 transition-colors"
              >
                削除する
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
