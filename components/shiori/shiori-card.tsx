import Image from "next/image";
import Link from "next/link";
import type { ShioriWithMembers } from "@/lib/types";
import { formatDateRange, getTripStatus } from "@/lib/date-utils";
import { Users, ChevronRight, Pencil } from "lucide-react";

interface ShioriCardProps {
  shiori: ShioriWithMembers;
  variant?: "featured" | "list";
}

export function ShioriCard({ shiori, variant = "list" }: ShioriCardProps) {
  const status = getTripStatus(shiori.startDate, shiori.endDate);

  if (variant === "featured") {
    return (
      <div className="relative">
        {/* Torn paper edge effect at top */}
        <div className="absolute -top-2 left-0 right-0 h-4 overflow-hidden">
          <svg
            viewBox="0 0 400 16"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16 L0 8 Q10 4 20 8 T40 8 T60 8 T80 8 T100 8 T120 8 T140 8 T160 8 T180 8 T200 8 T220 8 T240 8 T260 8 T280 8 T300 8 T320 8 T340 8 T360 8 T380 8 T400 8 L400 16 Z"
              fill="currentColor"
              className="text-card"
            />
          </svg>
        </div>

        <Link href={`/shiori/${shiori.id}`} className="block">
          <div className="relative bg-card rounded-2xl overflow-hidden shadow-lg border border-border/50">
            {/* Main content grid */}
            <div className="grid grid-cols-[1fr,1.2fr] min-h-[220px]">
              {/* Left side - Info */}
              <div className="relative p-5 flex flex-col justify-between z-10">
                {/* Decorative tape */}
                <div className="absolute top-4 left-4 w-16 h-6 bg-amber-100/60 rounded-sm transform -rotate-3 shadow-sm" />

                <div className="relative z-10">
                  {status && (
                    <span className="inline-block bg-primary/15 text-primary px-3 py-1 rounded-full text-xs font-semibold mb-3 border border-primary/20">
                      {status}
                    </span>
                  )}

                  <h3 className="text-xl font-bold text-foreground mb-2 leading-tight">
                    {shiori.title}
                  </h3>

                  <p className="text-sm text-muted-foreground mb-1">
                    {formatDateRange(shiori.startDate, shiori.endDate)}
                  </p>

                  <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                    <Users className="w-4 h-4" />
                    <span>{shiori.memberCount}人</span>
                  </div>
                </div>

                <div className="space-y-3">
                  {shiori.description && (
                    <p className="text-sm text-foreground/70 line-clamp-2 leading-relaxed">
                      {shiori.description}
                    </p>
                  )}

                  <div className="inline-flex items-center gap-1.5 text-sm font-medium text-foreground bg-background border border-border rounded-full px-4 py-2.5 hover:bg-accent/50 hover:border-primary/30 transition-all group">
                    旅のしおりを見る
                    <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5" />
                  </div>
                </div>
              </div>

              {/* Right side - Image */}
              <div className="relative">
                {shiori.coverImageUrl ? (
                  <>
                    <Image
                      src={shiori.coverImageUrl}
                      alt={shiori.title}
                      fill
                      className="object-cover"
                    />
                    {/* Edit button overlay */}
                    <button className="absolute bottom-4 right-4 p-3 bg-background/90 backdrop-blur-sm rounded-full shadow-md hover:bg-background transition-colors border border-border/50">
                      <Pencil className="w-5 h-5 text-foreground/70" />
                    </button>
                  </>
                ) : (
                  <div className="w-full h-full bg-muted flex items-center justify-center">
                    <span className="text-muted-foreground text-sm">
                      No Image
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </Link>

        {/* Torn paper edge effect at bottom */}
        <div className="absolute -bottom-2 left-0 right-0 h-4 overflow-hidden rotate-180">
          <svg
            viewBox="0 0 400 16"
            className="w-full h-full"
            preserveAspectRatio="none"
          >
            <path
              d="M0 16 L0 8 Q10 4 20 8 T40 8 T60 8 T80 8 T100 8 T120 8 T140 8 T160 8 T180 8 T200 8 T220 8 T240 8 T260 8 T280 8 T300 8 T320 8 T340 8 T360 8 T380 8 T400 8 L400 16 Z"
              fill="currentColor"
              className="text-card"
            />
          </svg>
        </div>
      </div>
    );
  }

  return (
    <Link href={`/shiori/${shiori.id}`} className="block">
      <div className="flex items-center gap-4 bg-card rounded-xl p-3 border border-border/50 hover:border-primary/30 hover:shadow-md transition-all">
        {/* Thumbnail */}
        <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0 shadow-sm">
          {shiori.coverImageUrl ? (
            <Image
              src={shiori.coverImageUrl}
              alt={shiori.title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <span className="text-muted-foreground text-xs">No Image</span>
            </div>
          )}
          {/* Tape decoration */}
          <div className="absolute -top-1 left-2 w-10 h-4 bg-amber-100/80 rounded-sm transform -rotate-6 shadow-sm" />
          <div className="absolute -bottom-0.5 right-1 w-8 h-3 bg-amber-100/70 rounded-sm transform rotate-12" />
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-foreground truncate">{shiori.title}</h4>
          <p className="text-xs text-muted-foreground mt-1">
            {formatDateRange(shiori.startDate, shiori.endDate)}
          </p>
        </div>

        {/* Members + Actions */}
        <div className="flex items-center gap-3 flex-shrink-0">
          <div className="p-2 bg-accent/50 rounded-full">
            <Users className="w-4 h-4 text-muted-foreground" />
          </div>
          <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            <MoreHorizontalIcon />
          </button>
        </div>
      </div>
    </Link>
  );
}

function MoreHorizontalIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="1" />
      <circle cx="19" cy="12" r="1" />
      <circle cx="5" cy="12" r="1" />
    </svg>
  );
}
