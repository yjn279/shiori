import type { ScheduleCategory } from "@/lib/types";
import {
  Camera,
  Utensils,
  Building2,
  ShoppingBag,
  Car,
  MoreHorizontal,
} from "lucide-react";

const categoryConfig: Record<
  ScheduleCategory,
  { icon: React.ComponentType<{ className?: string }>; color: string; bgColor: string }
> = {
  sightseeing: {
    icon: Camera,
    color: "text-amber-700",
    bgColor: "bg-amber-50",
  },
  eating: {
    icon: Utensils,
    color: "text-orange-700",
    bgColor: "bg-orange-50",
  },
  staying: {
    icon: Building2,
    color: "text-emerald-700",
    bgColor: "bg-emerald-50",
  },
  shopping: {
    icon: ShoppingBag,
    color: "text-pink-700",
    bgColor: "bg-pink-50",
  },
  transport: {
    icon: Car,
    color: "text-sky-700",
    bgColor: "bg-sky-50",
  },
  other: {
    icon: MoreHorizontal,
    color: "text-slate-700",
    bgColor: "bg-slate-50",
  },
};

interface CategoryIconProps {
  category: ScheduleCategory;
  size?: "sm" | "md" | "lg";
  showBackground?: boolean;
}

export function CategoryIcon({
  category,
  size = "md",
  showBackground = true,
}: CategoryIconProps) {
  const config = categoryConfig[category];
  const Icon = config.icon;
  
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };
  
  const containerSizes = {
    sm: "w-7 h-7",
    md: "w-9 h-9",
    lg: "w-11 h-11",
  };

  if (showBackground) {
    return (
      <div
        className={`${containerSizes[size]} ${config.bgColor} rounded-full flex items-center justify-center`}
      >
        <Icon className={`${sizeClasses[size]} ${config.color}`} />
      </div>
    );
  }

  return <Icon className={`${sizeClasses[size]} ${config.color}`} />;
}

export function getCategoryConfig(category: ScheduleCategory) {
  return categoryConfig[category];
}
