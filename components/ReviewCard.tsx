
import React, { useState } from 'react';
import { Problem } from '../types';
import { ExternalLink, ChevronRight, StickyNote, Pencil } from 'lucide-react';
import { DIFFICULTY_COLORS } from '../constants';
import ReviewSchedule from './ReviewSchedule';

interface ReviewCardProps {
  problem: Problem;
  onReview: (problemId: string, rating: 'easy' | 'medium' | 'hard' | 'forgot') => void;
  onEdit: (problem: Problem) => void;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ problem, onReview, onEdit }) => {
  const [flipped, setFlipped] = useState(false);

  const handleAction = (rating: 'easy' | 'medium' | 'hard' | 'forgot') => {
    onReview(problem.id, rating);
    setFlipped(false);
  };

  const difficultyStyle = DIFFICULTY_COLORS[problem.difficulty] || DIFFICULTY_COLORS.Medium;

  return (
    <div className="w-full bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-700 transition-colors group">
      {/* Header Summary (Always Visible) */}
      <div className="p-5 cursor-pointer" onClick={() => setFlipped(!flipped)}>
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
                <h3 className="text-lg font-bold text-zinc-100 group-hover:text-purple-400 transition-colors">
                {problem.title}
                </h3>
                <span className={`text-[10px] uppercase font-bold px-2 py-0.5 rounded-full border ${difficultyStyle}`}>
                {problem.difficulty}
                </span>
            </div>
            <div className="flex flex-wrap gap-2">
                {problem.tags.slice(0, 3).map(tag => (
                <span key={tag} className="text-xs text-zinc-500 bg-black px-2 py-1 rounded border border-zinc-800">
                    {tag}
                </span>
                ))}
            </div>
            </div>
            <div className="flex flex-col items-end gap-2">
                <div className="flex gap-1">
                    <button 
                        onClick={(e) => { e.stopPropagation(); onEdit(problem); }}
                        className="text-zinc-600 hover:text-white p-1 transition-colors"
                        title="Edit Problem"
                    >
                        <Pencil size={16} />
                    </button>
                    <button 
                        onClick={(e) => { e.stopPropagation(); window.open(problem.link, '_blank'); }}
                        className="text-zinc-600 hover:text-white p-1 transition-colors"
                        title="Open LeetCode"
                    >
                        <ExternalLink size={16} />
                    </button>
                </div>
            <ChevronRight className={`text-zinc-600 transition-transform duration-300 ${flipped ? 'rotate-90' : ''}`} />
            </div>
        </div>
        
        {/* Schedule Preview (Collapsed State - Small Indicators) */}
        {!flipped && (
             <div className="mt-4 flex gap-1">
                <div className="text-[10px] text-zinc-600 font-mono flex items-center gap-2">
                    <span className={problem.nextReview <= Date.now() ? "text-orange-400 font-bold" : ""}>
                        Next: {new Date(problem.nextReview).toLocaleDateString('en-US', { month: 'short', day: 'numeric'})}
                    </span>
                    <span className="text-zinc-700">•</span>
                    <span>Level {problem.level}</span>
                </div>
             </div>
        )}

        {/* Schedule Full (Expanded) */}
        {flipped && (
             <ReviewSchedule problem={problem} />
        )}
      </div>

      {/* Expanded Actions */}
      {flipped && (
        <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-200">
          
          {/* Notes Section */}
          {problem.notes && (
            <div className="mt-5 p-3 rounded-lg bg-black border border-zinc-800/50">
                <div className="flex items-center gap-2 text-zinc-500 mb-1.5">
                    <StickyNote size={12} />
                    <span className="text-xs font-bold uppercase tracking-wider">Your Notes</span>
                </div>
                <p className="text-zinc-400 text-sm whitespace-pre-wrap">{problem.notes}</p>
            </div>
          )}

          <div className="pt-4 mt-5 border-t border-zinc-800">
            
            <p className="text-sm text-zinc-500 mb-4 font-medium">How well did you recall the solution?</p>
            
            <div className="grid grid-cols-4 gap-2">
              <button
                onClick={() => handleAction('forgot')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 text-zinc-300 transition-all active:scale-95"
              >
                <span className="text-xs uppercase font-bold mb-1">Forgot</span>
                <span className="text-[10px] opacity-70">Reset</span>
              </button>
              
              <button
                onClick={() => handleAction('hard')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 text-zinc-300 transition-all active:scale-95"
              >
                <span className="text-xs uppercase font-bold mb-1">Hard</span>
                <span className="text-[10px] opacity-70">1d</span>
              </button>

              <button
                onClick={() => handleAction('medium')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 text-zinc-300 transition-all active:scale-95"
              >
                <span className="text-xs uppercase font-bold mb-1">Okay</span>
                <span className="text-[10px] opacity-70">Standard</span>
              </button>

              <button
                onClick={() => handleAction('easy')}
                className="flex flex-col items-center justify-center p-3 rounded-lg bg-zinc-800/50 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-500 text-zinc-300 transition-all active:scale-95"
              >
                <span className="text-xs uppercase font-bold mb-1">Easy</span>
                <span className="text-[10px] opacity-70">Boost</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReviewCard;
