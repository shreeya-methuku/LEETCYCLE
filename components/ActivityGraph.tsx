import React, { useMemo } from 'react';
import { Problem } from '../types';

interface ActivityGraphProps {
  problems: Problem[];
}

const ActivityGraph: React.FC<ActivityGraphProps> = ({ problems }) => {
  // Helper for IST strings
  const getISTDate = (d: Date | number) => {
    return new Date(d).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
  };

  // Generate last 84 days (12 weeks) based on IST
  const days = useMemo(() => {
    const d = [];
    const now = new Date();
    // Start from 84 days ago
    for (let i = 83; i >= 0; i--) {
      // Calculate timestamp for i days ago
      const t = now.getTime() - (i * 24 * 60 * 60 * 1000);
      const iso = getISTDate(t);
      d.push({
        iso: iso
      });
    }
    return d;
  }, []);

  // Map activity to IST days
  // Stores count for color intensity, and unique titles for tooltip
  const activityData = useMemo(() => {
    const map = new Map<string, { count: number; titles: Set<string> }>();
    
    problems.forEach(p => {
      // Helper to update map
      const update = (dateStr: string, title: string) => {
          if (!map.has(dateStr)) {
              map.set(dateStr, { count: 0, titles: new Set() });
          }
          const entry = map.get(dateStr)!;
          entry.count += 1;
          entry.titles.add(title);
      };

      // Check create date (converted to IST)
      update(getISTDate(p.createdAt), p.title);

      // Check history (converted to IST)
      p.history.forEach(h => {
        update(getISTDate(h.date), h.problemTitle || p.title);
      });
    });
    return map;
  }, [problems]);

  const getColor = (count: number) => {
    if (count === 0) return 'bg-zinc-900 border-zinc-800';
    if (count <= 2) return 'bg-purple-900/40 border-purple-800/50';
    if (count <= 4) return 'bg-purple-700/60 border-purple-600/50';
    return 'bg-purple-500 border-purple-400/50 shadow-[0_0_8px_rgba(168,85,247,0.4)]';
  };

  return (
    <div className="w-full">
      <div className="flex justify-between items-end mb-3">
        <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Activity Log (Last 3 Months • IST)</h3>
      </div>
      
      {/* Container allowing wrap, with items prevented from shrinking */}
      <div className="flex flex-wrap gap-1">
        {days.map((day) => {
            const data = activityData.get(day.iso) || { count: 0, titles: new Set() };
            const titles = Array.from(data.titles);
            
            return (
                <div 
                    key={day.iso}
                    className={`w-3 h-3 shrink-0 rounded-sm border ${getColor(data.count)} transition-all hover:scale-125 cursor-default relative group`}
                >
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block z-50 pointer-events-none w-max max-w-[200px]">
                        <div className="bg-zinc-950 text-white text-[10px] p-2 rounded-lg border border-zinc-800 shadow-2xl relative z-50">
                            <div className="font-bold text-zinc-400 mb-1.5 border-b border-zinc-800 pb-1">{day.iso}</div>
                            {titles.length > 0 ? (
                                <ul className="space-y-1">
                                    {titles.slice(0, 5).map((t, i) => (
                                        <li key={i} className="truncate text-zinc-200">• {t}</li>
                                    ))}
                                    {titles.length > 5 && (
                                        <li className="text-zinc-500 italic pt-1">+{titles.length - 5} more</li>
                                    )}
                                </ul>
                            ) : (
                                <span className="text-zinc-600 italic">No activity</span>
                            )}
                        </div>
                    </div>
                </div>
            )
        })}
      </div>
    </div>
  );
};

export default ActivityGraph;