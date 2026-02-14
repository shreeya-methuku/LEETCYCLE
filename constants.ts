import { Achievement, UserStats } from './types';

// Spaced Repetition Intervals in Days
export const SRS_INTERVALS = [1, 3, 7, 14, 30, 60, 90];

export const XP_REWARDS = {
  ADD_PROBLEM: 50,
  REVIEW_PROBLEM: 20,
  STREAK_BONUS: 100,
};

export const DIFFICULTY_COLORS = {
  Easy: 'text-teal-400 bg-teal-400/10 border-teal-400/20',
  Medium: 'text-amber-400 bg-amber-400/10 border-amber-400/20',
  Hard: 'text-rose-400 bg-rose-400/10 border-rose-400/20',
};

export const ACHIEVEMENTS: Achievement[] = [
  {
    id: 'first_blood',
    title: 'Hello World',
    description: 'Log your first problem',
    icon: 'Zap',
    condition: (stats: UserStats) => stats.totalSolved >= 1
  },
  {
    id: 'streak_3',
    title: 'Momentum',
    description: 'Reach a 3-day streak',
    icon: 'Flame',
    condition: (stats: UserStats) => stats.streak >= 3
  },
  {
    id: 'streak_7',
    title: 'Unstoppable',
    description: 'Reach a 7-day streak',
    icon: 'Rocket',
    condition: (stats: UserStats) => stats.streak >= 7
  },
  {
    id: 'novice_review',
    title: 'Dedicated',
    description: 'Review 10 problems total',
    icon: 'BookOpen',
    condition: (stats: UserStats) => stats.totalReviewed >= 10
  },
  {
    id: 'master_log',
    title: 'Algorithmist',
    description: 'Log 50 unique problems',
    icon: 'Database',
    condition: (stats: UserStats) => stats.totalSolved >= 50
  },
  {
    id: 'xp_hunter',
    title: 'Level Up',
    description: 'Reach 1000 XP',
    icon: 'Crown',
    condition: (stats: UserStats) => stats.xp >= 1000
  }
];

export const SAMPLE_PROBLEMS = [
  {
    id: 'two-sum',
    title: 'Two Sum',
    difficulty: 'Easy',
    tags: ['Array', 'Hash Table'],
    createdAt: Date.now(),
    lastReviewed: Date.now(),
    nextReview: Date.now(),
    level: 0,
    history: []
  }
];