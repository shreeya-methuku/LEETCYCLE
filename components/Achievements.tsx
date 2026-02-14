import React from 'react';
import { ACHIEVEMENTS } from '../constants';
import { UserStats } from '../types';
import { Zap, Flame, Rocket, BookOpen, Database, Crown, Lock } from 'lucide-react';

interface AchievementsProps {
  stats: UserStats;
}

const Achievements: React.FC<AchievementsProps> = ({ stats }) => {
  const getIcon = (name: string) => {
    switch (name) {
      case 'Zap': return <Zap size={16} />;
      case 'Flame': return <Flame size={16} />;
      case 'Rocket': return <Rocket size={16} />;
      case 'BookOpen': return <BookOpen size={16} />;
      case 'Database': return <Database size={16} />;
      case 'Crown': return <Crown size={16} />;
      default: return <Zap size={16} />;
    }
  };

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3 mb-8">
      {ACHIEVEMENTS.map((ach) => {
        const isUnlocked = ach.condition(stats);
        
        return (
          <div 
            key={ach.id}
            className={`
              relative p-3 rounded-xl border flex flex-col items-center justify-center text-center gap-2 transition-all duration-300
              ${isUnlocked 
                ? 'bg-zinc-900/80 border-purple-500/30 shadow-[0_0_15px_rgba(168,85,247,0.1)]' 
                : 'bg-black border-zinc-900 opacity-60 grayscale'}
            `}
          >
            <div className={`
              p-2 rounded-full 
              ${isUnlocked ? 'bg-purple-500/10 text-purple-400' : 'bg-zinc-900 text-zinc-700'}
            `}>
              {isUnlocked ? getIcon(ach.icon) : <Lock size={16} />}
            </div>
            
            <div>
              <h4 className={`text-xs font-bold ${isUnlocked ? 'text-white' : 'text-zinc-600'}`}>
                {ach.title}
              </h4>
              {isUnlocked && (
                  <span className="text-[9px] text-zinc-500 leading-tight block mt-0.5">{ach.description}</span>
              )}
            </div>

            {/* Shine effect for unlocked */}
            {isUnlocked && (
                <div className="absolute inset-0 rounded-xl bg-gradient-to-tr from-white/5 to-transparent pointer-events-none" />
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Achievements;