import Image from "next/image";
import type { Schedule } from "@/lib/types";
import { CategoryIcon } from "@/components/ui/category-icon";
import { FileText, MoreHorizontal } from "lucide-react";

interface ScheduleItemProps {
  schedule: Schedule;
  showTimeline?: boolean;
  isLast?: boolean;
}

export function ScheduleItem({
  schedule,
  showTimeline = true,
  isLast = false,
}: ScheduleItemProps) {
  return (
    <div className="flex gap-3">
      {/* Timeline */}
      {showTimeline && (
        <div className="flex flex-col items-center">
          {/* Category icon */}
          <CategoryIcon category={schedule.category} size="md" />
          
          {/* Connecting line */}
          {!isLast && (
            <div className="w-px flex-1 bg-border mt-2 mb-2 min-h-[40px]" />
          )}
        </div>
      )}
      
      {/* Time */}
      <div className="w-12 flex-shrink-0 pt-2">
        {schedule.startTime && (
          <span className="text-sm font-medium text-accent">
            {schedule.startTime}
          </span>
        )}
      </div>
      
      {/* Content */}
      <div className="flex-1 pb-4">
        <div className="flex items-start gap-3 bg-card rounded-xl p-3 border border-border hover:border-primary/30 transition-colors">
          {/* Photo */}
          {schedule.placePhotoUrl && (
            <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
              <Image
                src={schedule.placePhotoUrl}
                alt={schedule.title}
                fill
                className="object-cover"
              />
            </div>
          )}
          
          {/* Details */}
          <div className="flex-1 min-w-0">
            <h4 className="font-medium text-foreground line-clamp-1">
              {schedule.title}
            </h4>
            
            {schedule.placeName && (
              <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                {schedule.memo || schedule.placeName}
              </p>
            )}
            
            {/* Tags */}
            <div className="flex items-center gap-2 mt-2 flex-wrap">
              {schedule.memo && (
                <span className="inline-flex items-center gap-1 text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded-full">
                  <FileText className="w-3 h-3" />
                  メモあり
                </span>
              )}
              {schedule.category === "staying" && schedule.placeName && (
                <span className="text-xs text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                  宿泊：{schedule.placeName}
                </span>
              )}
            </div>
          </div>
          
          {/* More button */}
          <button className="p-1 text-muted-foreground hover:text-foreground transition-colors flex-shrink-0">
            <MoreHorizontal className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

interface ScheduleListProps {
  schedules: Schedule[];
}

export function ScheduleList({ schedules }: ScheduleListProps) {
  // Sort by start time
  const sortedSchedules = [...schedules].sort((a, b) => {
    if (!a.startTime && !b.startTime) return 0;
    if (!a.startTime) return 1;
    if (!b.startTime) return -1;
    return a.startTime.localeCompare(b.startTime);
  });

  return (
    <div className="space-y-0">
      {sortedSchedules.map((schedule, index) => (
        <ScheduleItem
          key={schedule.id}
          schedule={schedule}
          isLast={index === sortedSchedules.length - 1}
        />
      ))}
    </div>
  );
}
