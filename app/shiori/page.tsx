"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Plus, ArrowUpDown } from "lucide-react";
import { ShioriCard } from "@/components/shiori/shiori-card";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { mockShioriList } from "@/lib/mock-data";

type SortOrder = "newest" | "updated";

export default function ShioriListPage() {
  const [sortOrder, setSortOrder] = useState<SortOrder>("newest");
  
  const sortedShiori = [...mockShioriList].sort((a, b) => {
    if (sortOrder === "newest") {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    }
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });

  return (
    <main className="flex-1 pb-24 bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="p-2 -ml-2 text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <h1 className="text-lg font-semibold text-foreground">
              旅のしおり一覧
            </h1>
          </div>
          
          <Link
            href="/shiori/new"
            className="p-2 text-primary hover:text-primary/80 transition-colors"
          >
            <Plus className="w-6 h-6" />
          </Link>
        </div>
        
        {/* Sort controls */}
        <div className="px-4 pb-3">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setSortOrder(sortOrder === "newest" ? "updated" : "newest")}
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowUpDown className="w-4 h-4" />
              {sortOrder === "newest" ? "新着順" : "更新順"}
            </button>
          </div>
        </div>
      </header>

      {/* Content */}
      <div className="px-4 py-4">
        {sortedShiori.length === 0 ? (
          <div className="text-center py-16">
            <div className="mb-4">
              <EmptyStateIcon />
            </div>
            <p className="text-muted-foreground mb-4">
              まだしおりがありません
            </p>
            <Link
              href="/shiori/new"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-medium hover:bg-primary/90 transition-colors"
            >
              <Plus className="w-5 h-5" />
              新しい旅をつくる
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {sortedShiori.map((shiori) => (
              <ShioriCard key={shiori.id} shiori={shiori} variant="list" />
            ))}
          </div>
        )}
      </div>

      <BottomNavigation />
    </main>
  );
}

function EmptyStateIcon() {
  return (
    <svg
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      className="mx-auto text-muted-foreground/30"
    >
      <rect
        x="20"
        y="10"
        width="40"
        height="60"
        rx="4"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
      <path
        d="M28 25H52M28 35H45M28 45H48"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="60" cy="55" r="12" fill="var(--primary)" opacity="0.2" />
      <path
        d="M56 55H64M60 51V59"
        stroke="var(--primary)"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}
