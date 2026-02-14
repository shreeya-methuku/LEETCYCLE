
import React from 'react';
import { Problem } from '../types';
import { SRS_INTERVALS } from '../constants';
import { CalendarClock, CheckCircle2, Circle } from 'lucide-react';

interface ReviewScheduleProps {
  problem: Problem;
}

const ReviewSchedule: React.FC<ReviewScheduleProps> = ({ problem }) => {
  // history[0] is creation.
  // history[1] is Review 1 (R1).
  const totalReviews = problem.history.length - 1; 

  const getFormatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  const getDayDiff = (timestamp: number) => {
     const diff = timestamp - Date.now();
     const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
     if (days < 0) return 'Overdue';
     if (days === 0) return 'Today';
     if (days === 1) return 'Tomorrow';
     return `in ${days}d`;
  };

  const steps = [1, 2, 3, 4, 5]; // R1 to R5

  return (
    <div className="mt-4 border-t border-zinc-800 pt-4">
        <div className="flex items-center gap-2 mb-3 text-zinc-500">
            <CalendarClock size={14} />
            <span className="text-[10px] uppercase font-bold tracking-widest">Review Schedule</span>
        </div>
        
        <div className="grid grid-cols-5 gap-2">
            {steps.map((rNum) => {
                const isCompleted = rNum <= totalReviews;
                const isNext = rNum === totalReviews + 1;
                
                let dateStr = "";
                let subText = "";
                let statusClass = "";

                if (isCompleted) {
                    // Get actual date from history
                    // history index for R1 is 1
                    const log = problem.history[rNum];
                    dateStr = getFormatDate(log.date);
                    subText = "Done";
                    statusClass = "bg-emerald-900/20 border-emerald-500/30 text-emerald-400";
                } else if (isNext) {
                    dateStr = getFormatDate(problem.nextReview);
                    subText = getDayDiff(problem.nextReview);
                    statusClass = "bg-blue-900/20 border-blue-500/30 text-blue-400 ring-1 ring-blue-500/20";
                } else {
                    // Projected
                    // Rough calculation: Last known date + cumulative intervals
                    // If Next is R2 (Level 1), it's due at T.
                    // R3 would be T + SRS_INTERVALS[2] roughly (assuming progression)
                    // We simply project from the 'nextReview' date for future items
                    
                    // Current Level is problem.level.
                    // Next Review is based on problem.level interval.
                    // The review AFTER that will likely be level + 1.
                    
                    // Offset from Next Review
                    // If isNext is R2, problem.level determines interval for R2 (already added to LastReviewed)
                    // The interval for R3 will be SRS_INTERVALS[problem.level + (rNum - isNext_index)]
                    
                    let projectedMs = problem.nextReview;
                    let simLevel = problem.level; 
                    
                    // Add intervals for steps between 'Next' and this step
                    for (let i = totalReviews + 1; i < rNum; i++) {
                         // Simulate leveling up
                         simLevel = Math.min(SRS_INTERVALS.length - 1, simLevel + 1);
                         const intervalDays = SRS_INTERVALS[simLevel] || 30;
                         projectedMs += intervalDays * 24 * 60 * 60 * 1000;
                    }

                    dateStr = getFormatDate(projectedMs);
                    subText = "Est.";
                    statusClass = "bg-zinc-900 border-zinc-800 text-zinc-600 opacity-60";
                }

                return (
                    <div key={rNum} className={`flex flex-col items-center justify-center p-2 rounded-lg border text-center transition-all ${statusClass}`}>
                        <span className="text-[10px] font-bold opacity-70 mb-0.5">R{rNum}</span>
                        <span className="text-xs font-bold whitespace-nowrap">{dateStr}</span>
                        <span className="text-[9px] opacity-60 mt-0.5">{subText}</span>
                        {isCompleted && <div className="mt-1"><CheckCircle2 size={10} /></div>}
                        {isNext && <div className="mt-1"><Circle size={8} fill="currentColor" className="animate-pulse" /></div>}
                    </div>
                );
            })}
        </div>
    </div>
  );
};

export default ReviewSchedule;
