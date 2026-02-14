
export type Difficulty = 'Easy' | 'Medium' | 'Hard';

export interface ReviewLog {
  date: number;
  rating: 'easy' | 'medium' | 'hard' | 'forgot';
  problemId?: string; // Optional for backward compatibility
  problemTitle?: string; // Snapshot of title
}

export interface Problem {
  id: string;
  title: string;
  difficulty: Difficulty;
  tags: string[];
  link?: string;
  notes?: string;
  lastReviewed: number;
  nextReview: number;
  level: number; // 0 to N, determines interval
  history: ReviewLog[];
  createdAt: number;
}

export interface UserStats {
  xp: number;
  streak: number;
  lastLoginDate: string; // YYYY-MM-DD
  totalSolved: number;
  totalReviewed: number;
  level: number;
  dailyLimit: number; // New field for daily cap
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; // Lucide icon name
  condition: (stats: UserStats) => boolean;
}

export const LEVELS = {
  Novice: 0,
  Apprentice: 500,
  Adept: 1500,
  Expert: 3500,
  Master: 6000,
  Grandmaster: 10000
};
