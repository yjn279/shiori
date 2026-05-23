import Image from "next/image";
import Link from "next/link";
import type { ShioriWithMembers } from "@/lib/types";
import { formatDateRange, getTripStatus } from "@/lib/date-utils";
import { Users, ChevronRight } from "lucide-react";

interface ShioriCardProps {
  shiori: ShioriWithMembers;
  variant?: "featured" | "list";
}

export function ShioriCard({ shiori, variant = "list" }: ShioriCardProps) {
  const status = getTripStatus(shiori.startDate, shiori.endDate);
  
  if (variant === "featured") {
    return (
      <Link href={`/shiori/${shiori.id}`} className="block">
        <div className="relative bg-card rounded-2xl overflow-hidden shadow-sm border border-border">
          {/* Decorative tape effect */}
          <div className="absolute top-3 left-6 w-14 h-5 bg-amber-100/70 rounded-sm transform -rotate-2 z-10" />
          <div className="absolute top-3 right-8 w-12 h-5 bg-amber-100/70 rounded-sm transform rotate-3 z-10" />
          
          <div className="flex flex-col sm:flex-row">
            {/* Left side - Info */}
            <div className="flex-1 p-5 pr-4">
              {status && (
                <span className="inline-block bg-accent/20 text-accent-foreground px-3 py-1 rounded-full text-xs font-medium mb-3">
                  {status}
                </span>
              )}
              
              <h3 className="text-xl font-semibold text-foreground mb-2">
                {shiori.title}
              </h3>
              
              <p className="text-sm text-muted-foreground mb-2">
                {formatDateRange(shiori.startDate, shiori.endDate)}
              </p>
              
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-4">
                <Users className="w-4 h-4" />
                <span>{shiori.memberCount}人</span>
              </div>
              
              {shiori.description && (
                <p className="text-sm text-foreground/80 mb-4 line-clamp-2">
                  {shiori.description}
                </p>
              )}
              
              <div className="inline-flex items-center gap-1 text-sm font-medium text-foreground border border-border rounded-full px-4 py-2 hover:bg-muted transition-colors">
                旅のしおりを見る
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
            
            {/* Right side - Image */}
            <div className="relative w-full sm:w-48 h-40 sm:h-auto sm:min-h-[200px]">
              {shiori.coverImageUrl ? (
                <Image
                  src={shiori.coverImageUrl}
                  alt={shiori.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-muted flex items-center justify-center">
                  <span className="text-muted-foreground text-sm">No Image</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    );
  }

  return (
    <Link href={`/shiori/${shiori.id}`} className="block">
      <div className="flex items-center gap-4 bg-card rounded-xl p-3 border border-border hover:border-primary/30 transition-colors">
        {/* Thumbnail */}
        <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
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
          <div className="absolute -top-1 left-2 w-8 h-3 bg-amber-100/80 rounded-sm transform -rotate-6" />
        </div>
        
        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-foreground truncate">{shiori.title}</h4>
          <p className="text-xs text-muted-foreground mt-0.5">
            {formatDateRange(shiori.startDate, shiori.endDate)}
          </p>
        </div>
        
        {/* Members + Actions */}
        <div className="flex items-center gap-2 flex-shrink-0">
          <div className="flex items-center gap-1 text-muted-foreground">
            <Users className="w-4 h-4" />
          </div>
          <button className="p-1.5 text-muted-foreground hover:text-foreground transition-colors">
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
