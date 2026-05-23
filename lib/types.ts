// User types
export interface User {
  id: string;
  displayName: string;
  iconUrl?: string;
  authProvider: "apple" | "google";
  externalAuthId: string;
  createdAt: Date;
  updatedAt: Date;
}

// Shiori (travel booklet) types
export interface Shiori {
  id: string;
  title: string;
  startDate: Date;
  endDate: Date;
  coverImageUrl?: string;
  description?: string;
  creatorUserId: string;
  shareToken?: string;
  createdAt: Date;
  updatedAt: Date;
  memberCount: number;
}

// Group membership types
export interface Group {
  id: string;
  userId: string;
  shioriId: string;
  role: "creator" | "member";
  createdAt: Date;
  updatedAt: Date;
}

// Schedule category types
export type ScheduleCategory =
  | "sightseeing"
  | "eating"
  | "staying"
  | "shopping"
  | "transport"
  | "other";

export const categoryLabels: Record<ScheduleCategory, string> = {
  sightseeing: "観光する",
  eating: "食べる",
  staying: "泊まる",
  shopping: "買う",
  transport: "移動",
  other: "その他",
};

// Schedule types
export interface Schedule {
  id: string;
  shioriId: string;
  date: Date;
  startTime?: string; // HH:mm format
  endTime?: string; // HH:mm format
  title: string;
  memo?: string;
  category: ScheduleCategory;
  externalPlaceId?: string; // For external map API
  placeName?: string;
  placePhotoUrl?: string;
  creatorUserId: string;
  createdAt: Date;
  updatedAt: Date;
}

// View models for display
export interface ShioriWithMembers extends Shiori {
  members: Pick<User, "id" | "displayName" | "iconUrl">[];
}

export interface DaySchedule {
  date: Date;
  dayNumber: number;
  schedules: Schedule[];
}
