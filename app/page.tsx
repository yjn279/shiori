import Image from "next/image";
import Link from "next/link";
import { Bell, Plus, BookOpen, Users, MapPin, ChevronRight } from "lucide-react";
import { ShioriCard } from "@/components/shiori/shiori-card";
import { BottomNavigation } from "@/components/navigation/bottom-navigation";
import { getNextTrip, getRecentTrips, currentUser } from "@/lib/mock-data";

// Quick action icons as simple components
function CreateTripIcon() {
  return (
    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center border border-border">
      <Plus className="w-7 h-7 text-foreground/70" />
    </div>
  );
}

function TripListIcon() {
  return (
    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center border border-border">
      <BookOpen className="w-7 h-7 text-foreground/70" />
    </div>
  );
}

function SharedTripsIcon() {
  return (
    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center border border-border">
      <Users className="w-7 h-7 text-foreground/70" />
    </div>
  );
}

function WishlistIcon() {
  return (
    <div className="w-14 h-14 bg-secondary rounded-xl flex items-center justify-center border border-border">
      <MapPin className="w-7 h-7 text-foreground/70" />
    </div>
  );
}

export default function HomePage() {
  const nextTrip = getNextTrip();
  const recentTrips = getRecentTrips(4);
  
  // Filter out next trip from recent trips to avoid duplication
  const filteredRecentTrips = recentTrips.filter(
    (trip) => trip.id !== nextTrip?.id
  );

  return (
    <main className="flex-1 pb-24 bg-background">
      {/* Header */}
      <header className="sticky top-0 bg-background/95 backdrop-blur-sm z-40 pt-safe">
        <div className="flex items-center justify-between px-5 py-4">
          <div>
            <h1 className="text-2xl font-bold text-foreground tracking-tight">
              しおり旅
              <span className="inline-block ml-1 text-accent">
                <LeafDecoration />
              </span>
            </h1>
            <p className="text-sm text-muted-foreground mt-0.5">
              思い出を、しおりに残そう。
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <Bell className="w-6 h-6" />
            </button>
            <Link href="/settings" className="block">
              <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-border">
                {currentUser.iconUrl ? (
                  <Image
                    src={currentUser.iconUrl}
                    alt={currentUser.displayName}
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center text-muted-foreground text-sm">
                    {currentUser.displayName.charAt(0)}
                  </div>
                )}
              </div>
            </Link>
          </div>
        </div>
      </header>

      <div className="px-5 space-y-8">
        {/* Featured/Next Trip */}
        {nextTrip && (
          <section className="relative">
            {/* Decorative leaves */}
            <div className="absolute -top-4 -left-2 opacity-30 transform -rotate-12">
              <MapleLeaf />
            </div>
            <div className="absolute -top-2 right-8 opacity-20 transform rotate-45 scale-75">
              <MapleLeaf />
            </div>
            
            <ShioriCard shiori={nextTrip} variant="featured" />
          </section>
        )}

        {/* Quick Actions */}
        <section>
          <div className="grid grid-cols-4 gap-3">
            <Link href="/shiori/new" className="flex flex-col items-center gap-2">
              <CreateTripIcon />
              <span className="text-xs text-foreground text-center leading-tight">
                新しい旅を<br />つくる
              </span>
            </Link>
            <Link href="/shiori" className="flex flex-col items-center gap-2">
              <TripListIcon />
              <span className="text-xs text-foreground text-center leading-tight">
                旅のしおり<br />一覧
              </span>
            </Link>
            <Link href="/shared" className="flex flex-col items-center gap-2">
              <SharedTripsIcon />
              <span className="text-xs text-foreground text-center leading-tight">
                共有されている<br />しおり
              </span>
            </Link>
            <Link href="/wishlist" className="flex flex-col items-center gap-2">
              <WishlistIcon />
              <span className="text-xs text-foreground text-center leading-tight">
                行きたい場所<br />リスト
              </span>
            </Link>
          </div>
        </section>

        {/* Recent Trips */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
              最近の旅
              <span className="text-accent">
                <SmallLeafDecoration />
              </span>
            </h2>
            <Link
              href="/shiori"
              className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-0.5 transition-colors"
            >
              すべて見る
              <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          
          <div className="space-y-3">
            {filteredRecentTrips.map((shiori) => (
              <ShioriCard key={shiori.id} shiori={shiori} variant="list" />
            ))}
          </div>
        </section>

        {/* Decorative footer illustration */}
        <div className="flex justify-center py-8 opacity-30">
          <TornPaperDecoration />
        </div>
      </div>

      <BottomNavigation />
    </main>
  );
}

// Decorative SVG components
function LeafDecoration() {
  return (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className="inline-block"
    >
      <path
        d="M12 2C13.5 4 15 6.5 15 10C15 13.5 13.5 17 12 19C10.5 17 9 13.5 9 10C9 6.5 10.5 4 12 2Z"
        fill="currentColor"
        opacity="0.6"
      />
      <path
        d="M6 8C8 8 10 9 11 12C10 15 8 16 6 16C4 16 2 15 1 12C2 9 4 8 6 8Z"
        fill="currentColor"
        opacity="0.4"
      />
      <path
        d="M18 8C16 8 14 9 13 12C14 15 16 16 18 16C20 16 22 15 23 12C22 9 20 8 18 8Z"
        fill="currentColor"
        opacity="0.4"
      />
    </svg>
  );
}

function SmallLeafDecoration() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 3C14 5 16 8 16 12C16 16 14 19 12 21C10 19 8 16 8 12C8 8 10 5 12 3Z"
        stroke="currentColor"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}

function MapleLeaf() {
  return (
    <svg width="40" height="40" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2L14 6L18 4L16 8L20 10L16 12L18 16L14 14L12 22L10 14L6 16L8 12L4 10L8 8L6 4L10 6L12 2Z"
        fill="#c4956a"
      />
    </svg>
  );
}

function TornPaperDecoration() {
  return (
    <svg width="200" height="30" viewBox="0 0 200 30" fill="none">
      <path
        d="M0 15C10 10 20 20 30 15C40 10 50 20 60 15C70 10 80 20 90 15C100 10 110 20 120 15C130 10 140 20 150 15C160 10 170 20 180 15C190 10 200 20 200 15"
        stroke="#e0d8ce"
        strokeWidth="2"
        fill="none"
      />
    </svg>
  );
}
