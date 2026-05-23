import type { User, Shiori, Schedule, ShioriWithMembers } from "./types";

// Mock current user
export const currentUser: User = {
  id: "user-1",
  displayName: "田中 花子",
  iconUrl: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
  authProvider: "google",
  externalAuthId: "google-123",
  createdAt: new Date("2024-01-01"),
  updatedAt: new Date("2024-01-01"),
};

// Mock users
export const mockUsers: User[] = [
  currentUser,
  {
    id: "user-2",
    displayName: "鈴木 太郎",
    iconUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    authProvider: "apple",
    externalAuthId: "apple-456",
    createdAt: new Date("2024-02-01"),
    updatedAt: new Date("2024-02-01"),
  },
  {
    id: "user-3",
    displayName: "佐藤 美咲",
    iconUrl: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    authProvider: "google",
    externalAuthId: "google-789",
    createdAt: new Date("2024-03-01"),
    updatedAt: new Date("2024-03-01"),
  },
];

// Mock shiori data
export const mockShioriList: ShioriWithMembers[] = [
  {
    id: "shiori-1",
    title: "北海道 #01",
    startDate: new Date("2024-11-02"),
    endDate: new Date("2024-11-05"),
    coverImageUrl: "https://images.unsplash.com/photo-1598935898639-81629af54ea5?w=800&h=600&fit=crop",
    description: "紅葉の北海道をめぐる3泊4日のドライブ旅。",
    creatorUserId: "user-1",
    shareToken: "abc123",
    createdAt: new Date("2024-10-01"),
    updatedAt: new Date("2024-10-28"),
    memberCount: 2,
    members: [mockUsers[0], mockUsers[1]],
  },
  {
    id: "shiori-2",
    title: "日光 #01",
    startDate: new Date("2024-10-12"),
    endDate: new Date("2024-10-13"),
    coverImageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop",
    description: "紅葉の日光を巡る1泊2日の旅。",
    creatorUserId: "user-1",
    shareToken: "def456",
    createdAt: new Date("2024-09-15"),
    updatedAt: new Date("2024-10-10"),
    memberCount: 2,
    members: [mockUsers[0], mockUsers[1]],
  },
  {
    id: "shiori-3",
    title: "スペイン2026",
    startDate: new Date("2026-03-01"),
    endDate: new Date("2026-03-08"),
    coverImageUrl: "https://images.unsplash.com/photo-1509840841025-9088ba78a826?w=800&h=600&fit=crop",
    description: "憧れのスペインを巡る1週間の旅。",
    creatorUserId: "user-1",
    shareToken: "ghi789",
    createdAt: new Date("2024-08-01"),
    updatedAt: new Date("2024-10-05"),
    memberCount: 1,
    members: [mockUsers[0]],
  },
  {
    id: "shiori-4",
    title: "冬の北海道旅",
    startDate: new Date("2025-02-08"),
    endDate: new Date("2025-02-11"),
    coverImageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=800&h=600&fit=crop",
    description: "雪景色の北海道を満喫する4日間。",
    creatorUserId: "user-2",
    shareToken: "jkl012",
    createdAt: new Date("2024-07-01"),
    updatedAt: new Date("2024-09-20"),
    memberCount: 3,
    members: [mockUsers[0], mockUsers[1], mockUsers[2]],
  },
];

// Mock schedules for Hokkaido trip (shiori-1)
export const mockSchedules: Schedule[] = [
  // Day 1 - 11/2
  {
    id: "schedule-1",
    shioriId: "shiori-1",
    date: new Date("2024-11-02"),
    startTime: "08:30",
    title: "札幌出発",
    memo: "レンタカーを借りて出発",
    category: "transport",
    placeName: "札幌市内",
    placePhotoUrl: "https://images.unsplash.com/photo-1513407030348-c983a97b98d8?w=400&h=300&fit=crop",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-2",
    shioriId: "shiori-1",
    date: new Date("2024-11-02"),
    startTime: "11:00",
    title: "定山渓温泉",
    memo: "渓谷の紅葉を眺めながらゆったり温泉",
    category: "sightseeing",
    placeName: "定山渓温泉",
    placePhotoUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-3",
    shioriId: "shiori-1",
    date: new Date("2024-11-02"),
    startTime: "13:00",
    title: "昼食（定山渓エリア）",
    memo: "地元の食材を使ったランチ",
    category: "eating",
    placeName: "定山渓エリア",
    placePhotoUrl: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=400&h=300&fit=crop",
    creatorUserId: "user-2",
    createdAt: new Date("2024-10-16"),
    updatedAt: new Date("2024-10-16"),
  },
  {
    id: "schedule-4",
    shioriId: "shiori-1",
    date: new Date("2024-11-02"),
    startTime: "15:30",
    title: "支笏湖 散策",
    memo: "湖畔をのんびりお散歩",
    category: "sightseeing",
    placeName: "支笏湖",
    placePhotoUrl: "https://images.unsplash.com/photo-1598935898639-81629af54ea5?w=400&h=300&fit=crop",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-5",
    shioriId: "shiori-1",
    date: new Date("2024-11-02"),
    startTime: "17:30",
    title: "定山渓温泉に宿泊",
    memo: "温泉街を散策して夜はゆっくり",
    category: "staying",
    placeName: "定山渓温泉",
    placePhotoUrl: "https://images.unsplash.com/photo-1503899036084-c55cdd92da26?w=400&h=300&fit=crop",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  // Day 2 - 11/3
  {
    id: "schedule-6",
    shioriId: "shiori-1",
    date: new Date("2024-11-03"),
    startTime: "09:00",
    title: "朝食",
    memo: "宿の朝食バイキング",
    category: "eating",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-7",
    shioriId: "shiori-1",
    date: new Date("2024-11-03"),
    startTime: "10:30",
    title: "小樽へ移動",
    category: "transport",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-8",
    shioriId: "shiori-1",
    date: new Date("2024-11-03"),
    startTime: "12:00",
    title: "小樽運河散策",
    memo: "レトロな街並みを楽しむ",
    category: "sightseeing",
    placeName: "小樽運河",
    placePhotoUrl: "https://images.unsplash.com/photo-1624253321171-1be53e12f5f4?w=400&h=300&fit=crop",
    creatorUserId: "user-2",
    createdAt: new Date("2024-10-16"),
    updatedAt: new Date("2024-10-16"),
  },
  {
    id: "schedule-9",
    shioriId: "shiori-1",
    date: new Date("2024-11-03"),
    startTime: "13:30",
    title: "寿司ランチ",
    memo: "小樽の新鮮な海鮮を堪能",
    category: "eating",
    placeName: "小樽寿司通り",
    placePhotoUrl: "https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=400&h=300&fit=crop",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-10",
    shioriId: "shiori-1",
    date: new Date("2024-11-03"),
    startTime: "15:00",
    title: "ガラス工房見学",
    memo: "小樽のガラス細工体験",
    category: "sightseeing",
    placeName: "北一硝子",
    placePhotoUrl: "https://images.unsplash.com/photo-1518281420975-50db6e5d0a97?w=400&h=300&fit=crop",
    creatorUserId: "user-2",
    createdAt: new Date("2024-10-16"),
    updatedAt: new Date("2024-10-16"),
  },
  // Day 3 - 11/4
  {
    id: "schedule-11",
    shioriId: "shiori-1",
    date: new Date("2024-11-04"),
    startTime: "08:00",
    title: "富良野へ出発",
    category: "transport",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-12",
    shioriId: "shiori-1",
    date: new Date("2024-11-04"),
    startTime: "11:00",
    title: "ファーム富田",
    memo: "秋のラベンダー畑を見学",
    category: "sightseeing",
    placeName: "ファーム富田",
    placePhotoUrl: "https://images.unsplash.com/photo-1499002238440-d264f5e4f5e2?w=400&h=300&fit=crop",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  // Day 4 - 11/5
  {
    id: "schedule-13",
    shioriId: "shiori-1",
    date: new Date("2024-11-05"),
    startTime: "10:00",
    title: "新千歳空港へ",
    category: "transport",
    creatorUserId: "user-1",
    createdAt: new Date("2024-10-15"),
    updatedAt: new Date("2024-10-15"),
  },
  {
    id: "schedule-14",
    shioriId: "shiori-1",
    date: new Date("2024-11-05"),
    startTime: "12:00",
    title: "空港でお土産購入",
    memo: "白い恋人、六花亭など",
    category: "shopping",
    placeName: "新千歳空港",
    placePhotoUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=400&h=300&fit=crop",
    creatorUserId: "user-2",
    createdAt: new Date("2024-10-16"),
    updatedAt: new Date("2024-10-16"),
  },
];

// Get shiori by ID
export function getShioriById(id: string): ShioriWithMembers | undefined {
  return mockShioriList.find((s) => s.id === id);
}

// Get schedules for a shiori
export function getSchedulesByShioriId(shioriId: string): Schedule[] {
  return mockSchedules.filter((s) => s.shioriId === shioriId);
}

// Get next/current trip
export function getNextTrip(): ShioriWithMembers | undefined {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  // First, find ongoing trips
  const ongoingTrip = mockShioriList.find((s) => {
    const start = new Date(s.startDate);
    const end = new Date(s.endDate);
    start.setHours(0, 0, 0, 0);
    end.setHours(23, 59, 59, 999);
    return today >= start && today <= end;
  });
  
  if (ongoingTrip) return ongoingTrip;
  
  // Then find next upcoming trip
  const futureTrips = mockShioriList.filter((s) => {
    const start = new Date(s.startDate);
    start.setHours(0, 0, 0, 0);
    return start > today;
  });
  
  futureTrips.sort((a, b) => 
    new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
  );
  
  return futureTrips[0];
}

// Get recent trips
export function getRecentTrips(limit: number = 5): ShioriWithMembers[] {
  return [...mockShioriList]
    .sort((a, b) => 
      new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    )
    .slice(0, limit);
}

// Wishlist places
export interface WishlistPlace {
  id: string;
  name: string;
  region: string;
  imageUrl: string;
  note?: string;
}

export const mockWishlistPlaces: WishlistPlace[] = [
  {
    id: "place-1",
    name: "屋久島",
    region: "鹿児島県",
    imageUrl: "https://images.unsplash.com/photo-1528164344705-47542687000d?w=400&h=300&fit=crop",
    note: "縄文杉を見てみたい",
  },
  {
    id: "place-2",
    name: "金沢",
    region: "石川県",
    imageUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=400&h=300&fit=crop",
    note: "兼六園と21世紀美術館",
  },
  {
    id: "place-3",
    name: "直島",
    region: "香川県",
    imageUrl: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=400&h=300&fit=crop",
    note: "アートの島めぐり",
  },
  {
    id: "place-4",
    name: "宮古島",
    region: "沖縄県",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=400&h=300&fit=crop",
    note: "透き通る海でシュノーケリング",
  },
  {
    id: "place-5",
    name: "尾道",
    region: "広島県",
    imageUrl: "https://images.unsplash.com/photo-1480796927426-f609979314bd?w=400&h=300&fit=crop",
    note: "坂道と猫のある街",
  },
  {
    id: "place-6",
    name: "白川郷",
    region: "岐阜県",
    imageUrl: "https://images.unsplash.com/photo-1478436127897-769e1b3f0f36?w=400&h=300&fit=crop",
    note: "冬のライトアップを見たい",
  },
];
