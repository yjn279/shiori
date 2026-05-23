"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, MapPin, Plus, Heart, Trash2, Search } from "lucide-react";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { mockWishlistPlaces } from "@/lib/mock-data";

export default function WishlistPage() {
  const [places, setPlaces] = useState(mockWishlistPlaces);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPlaces = places.filter(
    (place) =>
      place.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      place.region.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleRemove = (id: string) => {
    setPlaces(places.filter((p) => p.id !== id));
  };

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
          <h1 className="font-serif text-lg text-foreground">行きたい場所</h1>
          <button className="p-2 rounded-full hover:bg-card transition-colors">
            <Plus className="w-5 h-5 text-primary" />
          </button>
        </div>
      </header>

      <main className="px-4 py-6">
        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="場所を検索..."
            className="w-full pl-11 pr-4 py-3 bg-card border border-border/50 rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-all"
          />
        </div>

        {/* Stats */}
        <div className="flex items-center gap-2 mb-4">
          <Heart className="w-4 h-4 text-destructive fill-destructive" />
          <span className="text-sm text-muted-foreground">
            {places.length}件の場所をお気に入り中
          </span>
        </div>

        {/* Places Grid */}
        {filteredPlaces.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 mx-auto mb-4 bg-accent/50 rounded-full flex items-center justify-center">
              <MapPin className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-muted-foreground text-sm">
              {searchQuery
                ? "検索結果がありません"
                : "行きたい場所を追加しましょう"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredPlaces.map((place) => (
              <div
                key={place.id}
                className="bg-card rounded-xl overflow-hidden border border-border/30 group"
              >
                {/* Image */}
                <div className="relative aspect-[4/3]">
                  <img
                    src={place.imageUrl}
                    alt={place.name}
                    className="w-full h-full object-cover"
                  />
                  <button
                    onClick={() => handleRemove(place.id)}
                    className="absolute top-2 right-2 p-1.5 bg-background/80 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Trash2 className="w-3.5 h-3.5 text-destructive" />
                  </button>
                  <div className="absolute bottom-2 left-2 px-2 py-0.5 bg-background/80 backdrop-blur-sm rounded-full">
                    <span className="text-xs font-medium text-foreground">
                      {place.region}
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-3">
                  <h3 className="font-bold text-sm text-foreground truncate">
                    {place.name}
                  </h3>
                  {place.note && (
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {place.note}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add Button */}
        <button className="fixed bottom-28 right-4 flex items-center gap-2 px-5 py-3 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors">
          <Plus className="w-5 h-5" />
          <span className="font-medium">場所を追加</span>
        </button>
      </main>

      <BottomNavigation />
    </div>
  );
}
