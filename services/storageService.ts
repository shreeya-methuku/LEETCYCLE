import { Problem, UserStats } from '../types';
import { SAMPLE_PROBLEMS } from '../constants';

const KEYS = {
  PROBLEMS: 'leetcycle_problems_v1',
  STATS: 'leetcycle_stats_v1',
};

export const getProblems = (): Problem[] => {
  const stored = localStorage.getItem(KEYS.PROBLEMS);
  if (!stored) return SAMPLE_PROBLEMS as Problem[];
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
};

export const saveProblems = (problems: Problem[]) => {
  localStorage.setItem(KEYS.PROBLEMS, JSON.stringify(problems));
};

export const getStats = (): UserStats => {
  const stored = localStorage.getItem(KEYS.STATS);
  if (!stored) {
    return {
      xp: 0,
      streak: 0,
      lastLoginDate: '',
      totalSolved: 0,
      totalReviewed: 0,
      level: 1,
      dailyLimit: 2, // Default to 2
    };
  }
  const parsed = JSON.parse(stored);
  // Migration for existing users who don't have dailyLimit yet
  if (parsed.dailyLimit === undefined) {
      parsed.dailyLimit = 2;
  }
  return parsed;
};

export const saveStats = (stats: UserStats) => {
  localStorage.setItem(KEYS.STATS, JSON.stringify(stats));
};

export const calculateStreak = (currentStats: UserStats): UserStats => {
  // Helper to get IST date string (YYYY-MM-DD)
  const getISTDate = (d: Date) => d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  
  const now = new Date();
  const todayIST = getISTDate(now);
  const lastLogin = currentStats.lastLoginDate;

  if (lastLogin === todayIST) return currentStats;

  // Calculate yesterday in IST
  // Since IST doesn't have DST, subtracting 24h is safe for determining the previous calendar day string
  const yesterdayTime = now.getTime() - (24 * 60 * 60 * 1000);
  const yesterdayIST = getISTDate(new Date(yesterdayTime));

  let newStreak = currentStats.streak;
  
  if (lastLogin === yesterdayIST) {
    newStreak += 1;
  } else if (lastLogin !== todayIST) {
    // If last login wasn't yesterday (and obviously not today since we checked), streak breaks
    // Exception: If it's the very first login (empty string), set to 1
    newStreak = 1;
  }

  return {
    ...currentStats,
    streak: newStreak,
    lastLoginDate: todayIST,
  };
};

// Backup Functions
export const exportData = () => {
  const problems = getProblems();
  const stats = getStats();
  const data = { problems, stats, timestamp: Date.now(), version: 1, app: 'LeetCycle' };
  
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  
  const a = document.createElement('a');
  a.href = url;
  a.download = `leetcycle-backup-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

export const importData = async (file: File): Promise<{ success: boolean; message: string }> => {
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const json = e.target?.result as string;
        const data = JSON.parse(json);

        // Basic validation
        if (!data.problems || !Array.isArray(data.problems) || !data.stats) {
            resolve({ success: false, message: 'Invalid backup file format.' });
            return;
        }

        saveProblems(data.problems);
        saveStats(data.stats);
        resolve({ success: true, message: 'Data restored successfully!' });
      } catch (err) {
        resolve({ success: false, message: 'Failed to parse file.' });
      }
    };
    reader.onerror = () => resolve({ success: false, message: 'Error reading file.' });
    reader.readAsText(file);
  });
};