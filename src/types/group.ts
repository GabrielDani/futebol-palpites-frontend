import { User } from "./user";

// types/group.ts
export type Group = {
  id: string;
  name: string;
  isPublic: boolean;
  memberCount: number;
  createdAt: string;
  createdBy: User;
};

// types/group.ts
export type GroupDetails = {
  id: string;
  name: string;
  isPublic: boolean;
  createdAt: string;
  createdBy: User;
  memberCount: number;
  members: User[];
  ranking: RankingEntry[];
  recentPredictions?: Array<{
    matchId: string;
    homeTeam: string;
    awayTeam: string;
    userPrediction: [number, number];
    actualResult?: [number, number];
    pointsEarned: number;
  }>;
};

export type RankingEntry = {
  user: User;
  points: number;
  position: number;
  totalGuesses: number;
  exactHits: number;
  correctPredictions: number;
};
