"use client";

import { useState } from "react";
import { format } from "date-fns";
import { ja } from "date-fns/locale";

interface DayTab {
  dayNumber: number;
  date: Date;
}

interface DayTabsProps {
  tabs: DayTab[];
  selectedDay: number;
  onSelectDay: (dayNumber: number) => void;
}

export function DayTabs({ tabs, selectedDay, onSelectDay }: DayTabsProps) {
  return (
    <div className="flex overflow-x-auto scrollbar-hide gap-1 py-2 px-1 -mx-1">
      {tabs.map((tab) => {
        const isSelected = tab.dayNumber === selectedDay;
        const dayOfWeek = format(tab.date, "E", { locale: ja });
        const dateLabel = format(tab.date, "M.d", { locale: ja });
        
        return (
          <button
            key={tab.dayNumber}
            onClick={() => onSelectDay(tab.dayNumber)}
            className={`flex-shrink-0 px-4 py-2 rounded-lg transition-colors ${
              isSelected
                ? "bg-card border-2 border-primary text-foreground font-medium shadow-sm"
                : "bg-muted/50 border-2 border-transparent text-muted-foreground hover:bg-muted"
            }`}
          >
            <div className="text-sm font-medium">Day {tab.dayNumber}</div>
            <div className="text-xs mt-0.5">
              {dateLabel}（{dayOfWeek}）
            </div>
          </button>
        );
      })}
    </div>
  );
}

interface DayTabsContainerProps {
  startDate: Date;
  endDate: Date;
  onDayChange?: (dayNumber: number, date: Date) => void;
}

export function DayTabsContainer({
  startDate,
  endDate,
  onDayChange,
}: DayTabsContainerProps) {
  const [selectedDay, setSelectedDay] = useState(1);
  
  // Generate tabs
  const tabs: DayTab[] = [];
  const duration =
    Math.ceil(
      (new Date(endDate).getTime() - new Date(startDate).getTime()) /
        (1000 * 60 * 60 * 24)
    ) + 1;
  
  for (let i = 0; i < duration; i++) {
    const date = new Date(startDate);
    date.setDate(date.getDate() + i);
    tabs.push({
      dayNumber: i + 1,
      date,
    });
  }
  
  const handleSelectDay = (dayNumber: number) => {
    setSelectedDay(dayNumber);
    const tab = tabs.find((t) => t.dayNumber === dayNumber);
    if (tab && onDayChange) {
      onDayChange(dayNumber, tab.date);
    }
  };

  return (
    <DayTabs
      tabs={tabs}
      selectedDay={selectedDay}
      onSelectDay={handleSelectDay}
    />
  );
}
