import React from 'react';
import { UserStats } from '../types';
import { Trophy, Flame, Target, Star } from 'lucide-react';

interface StatsPanelProps {
  stats: UserStats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const getLevelTitle = (xp: number) => {
    if (xp < 500) return 'Novice';
    if (xp < 1500) return 'Apprentice';
    if (xp < 3500) return 'Adept';
    if (xp < 6000) return 'Expert';
    return 'Grandmaster';
  };

  const nextLevelXp = (xp: number) => {
    if (xp < 500) return 500;
    if (xp < 1500) return 1500;
    if (xp < 3500) return 3500;
    if (xp < 6000) return 6000;
    return 10000;
  };

  const title = getLevelTitle(stats.xp);
  const targetXp = nextLevelXp(stats.xp);
  const progress = Math.min(100, (stats.xp / targetXp) * 100);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {/* Streak */}
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center hover:border-orange-500/30 transition-colors group">
        <div className="flex items-center gap-2 mb-1 text-orange-500 group-hover:scale-110 transition-transform">
          <Flame size={24} fill="currentColor" />
          <span className="text-2xl font-bold">{stats.streak}</span>
        </div>
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Day Streak</span>
      </div>

      {/* Level */}
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center hover:border-purple-500/30 transition-colors group">
        <div className="flex items-center gap-2 mb-1 text-purple-500 group-hover:scale-110 transition-transform">
          <Trophy size={24} />
          <span className="text-xl font-bold truncate max-w-[100px]">{title}</span>
        </div>
        <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-2 overflow-hidden">
            <div className="bg-purple-600 h-full transition-all duration-500" style={{ width: `${progress}%` }}></div>
        </div>
        <span className="text-[10px] text-zinc-500 mt-1">{stats.xp} / {targetXp} XP</span>
      </div>

      {/* Solved */}
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center hover:border-emerald-500/30 transition-colors group">
        <div className="flex items-center gap-2 mb-1 text-emerald-500 group-hover:scale-110 transition-transform">
          <Target size={24} />
          <span className="text-2xl font-bold">{stats.totalSolved}</span>
        </div>
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Total Logged</span>
      </div>

      {/* Reviews */}
      <div className="bg-zinc-900/50 backdrop-blur-md border border-zinc-800 p-4 rounded-xl flex flex-col items-center justify-center hover:border-blue-500/30 transition-colors group">
        <div className="flex items-center gap-2 mb-1 text-blue-500 group-hover:scale-110 transition-transform">
          <Star size={24} />
          <span className="text-2xl font-bold">{stats.totalReviewed}</span>
        </div>
        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Reviews Done</span>
      </div>
    </div>
  );
};

export default StatsPanel;