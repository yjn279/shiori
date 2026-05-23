"use client";

import Link from "next/link";
import { ChevronLeft, Users, Lock, Globe, Search } from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { mockShioriList } from "@/lib/mock-data";
import { formatDateRange } from "@/lib/date-utils";

export default function SharedShioriPage() {
  // Filter shared shiori (public or shared with user)
  const sharedShiori = mockShioriList.filter(
    (s) => s.visibility === "public" || s.visibility === "shared"
  );

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b border-border/50">
        <div className="flex items-center justify-between px-4 py-3">
          <Link
            href="/"
            className="flex items-center gap-1 text-foreground/70 hover:text-foreground transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">戻る</span>
          </Link>
          <h1 className="font-serif text-lg text-foreground">
            共有されているしおり
          </h1>
          <div className="w-16" />
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="しおりを検索..."
            className="w-full pl-11 pr-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Shared Shiori List */}
        <div className="space-y-3">
          {sharedShiori.length === 0 ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 bg-accent/50 rounded-full flex items-center justify-center">
                <Users className="w-8 h-8 text-muted-foreground" />
              </div>
              <p className="text-muted-foreground text-sm">
                共有されているしおりはありません
              </p>
            </div>
          ) : (
            sharedShiori.map((shiori) => (
              <Link
                key={shiori.id}
                href={`/shiori/${shiori.id}`}
                className="flex items-center gap-4 p-3 bg-card rounded-xl border border-border/30 hover:border-primary/30 hover:shadow-md transition-all"
              >
                {/* Thumbnail */}
                <div className="w-20 h-20 rounded-lg overflow-hidden bg-accent/30 flex-shrink-0">
                  {shiori.coverImage ? (
                    <img
                      src={shiori.coverImage}
                      alt={shiori.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="text-2xl">📔</span>
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-foreground truncate">
                    {shiori.title}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {formatDateRange(shiori.startDate, shiori.endDate)}
                  </p>
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      <Users className="w-3 h-3" />
                      <span>{shiori.members.length}人</span>
                    </div>
                    <span className="text-border">|</span>
                    <div className="flex items-center gap-1 text-xs text-muted-foreground">
                      {shiori.visibility === "public" ? (
                        <>
                          <Globe className="w-3 h-3" />
                          <span>公開</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3 h-3" />
                          <span>限定共有</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))
          )}
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
}
