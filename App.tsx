import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Search, CheckSquare, BrainCircuit, History, LayoutDashboard, Settings, Coffee } from 'lucide-react';
import { Problem, UserStats } from './types';
import { SRS_INTERVALS, XP_REWARDS } from './constants';
import * as Storage from './services/storageService';
import StatsPanel from './components/StatsPanel';
import ProblemModal from './components/ProblemModal';
import ReviewCard from './components/ReviewCard';
import LandingPage from './components/LandingPage';
import ActivityGraph from './components/ActivityGraph';
import Achievements from './components/Achievements';
import SettingsModal from './components/SettingsModal';

const QUOTES = [
    "Consistency is the mother of mastery.",
    "First, solve the problem. Then, write the code.",
    "Make it work, make it right, make it fast.",
    "The only way to learn a new programming language is by writing programs in it.",
    "Simplicity is the soul of efficiency.",
    "Code never lies, comments sometimes do.",
    "Talk is cheap. Show me the code.",
    "Programs must be written for people to read, and only incidentally for machines to execute."
];

export default function App() {
  const [showLanding, setShowLanding] = useState(true);
  const [problems, setProblems] = useState<Problem[]>([]);
  const [stats, setStats] = useState<UserStats>(Storage.getStats());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [editingProblem, setEditingProblem] = useState<Problem | null>(null);
  const [view, setView] = useState<'dashboard' | 'history'>('dashboard');
  const [filter, setFilter] = useState<'due' | 'all'>('due');
  const [searchQuery, setSearchQuery] = useState('');
  const [motivationalQuote, setMotivationalQuote] = useState('');

  // Initialization
  useEffect(() => {
    loadData();
    // Set random quote
    setMotivationalQuote(QUOTES[Math.floor(Math.random() * QUOTES.length)]);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadData = () => {
    const loadedProblems = Storage.getProblems();
    setProblems(loadedProblems);
    
    const currentStats = Storage.getStats();
    const updatedStats = Storage.calculateStreak(currentStats);
    setStats(updatedStats);
    Storage.saveStats(updatedStats);
  };

  // Calculate reviews done today
  const reviewsToday = useMemo(() => {
    const today = new Date().toDateString();
    let count = 0;
    problems.forEach(p => {
        p.history.forEach(h => {
            if (new Date(h.date).toDateString() === today) {
                count++;
            }
        });
    });
    return count;
  }, [problems]);

  const dailyLimit = stats.dailyLimit || 2;
  const remainingDailyQuota = Math.max(0, dailyLimit - reviewsToday);

  // Compute problems due today
  const dueProblems = useMemo(() => {
    // Basic due filter
    const due = problems.filter(p => p.nextReview <= new Date().getTime());
    
    // Sort by Priority: Lower level (less mastery) comes first. Then by overdue time.
    return due.sort((a, b) => {
        if (a.level !== b.level) return a.level - b.level;
        return a.nextReview - b.nextReview;
    });
  }, [problems]);

  // History Log List
  const historyLog = useMemo(() => {
    const logs: { date: number; title: string; rating: string; id: string }[] = [];
    problems.forEach(p => {
        p.history.forEach(h => {
            logs.push({
                date: h.date,
                title: p.title,
                rating: h.rating,
                id: p.id + h.date
            });
        });
    });
    return logs.sort((a, b) => b.date - a.date).slice(0, 50); // Last 50 actions
  }, [problems]);

  // Filtered list for display
  const displayProblems = useMemo(() => {
    let baseList = filter === 'due' ? dueProblems : problems;
    
    if (searchQuery) {
      const lowerQ = searchQuery.toLowerCase();
      baseList = baseList.filter(p => 
        p.title.toLowerCase().includes(lowerQ) || 
        p.tags.some(t => t.toLowerCase().includes(lowerQ))
      );
    }
    
    if (filter === 'due') {
        // Apply Daily Limit
        // Only show up to the remaining quota
        // If user searches, we might show items outside the top quota, which is fine for UX, 
        // but generally we want to cap the view.
        if (!searchQuery) {
            return baseList.slice(0, remainingDailyQuota);
        }
    } else {
        // All problems view: Sort by Next Review
        return baseList.sort((a, b) => a.nextReview - b.nextReview);
    }

    return baseList;
  }, [filter, dueProblems, problems, searchQuery, remainingDailyQuota]);

  // Handler: Save Problem (Add or Edit)
  const handleSaveProblem = (data: any) => {
    // Determine timestamp from selected date
    const dateTimestamp = new Date(data.date).getTime();
    
    if (editingProblem) {
        // Edit Mode
        const updatedProblem: Problem = {
            ...editingProblem,
            title: data.title,
            difficulty: data.difficulty,
            tags: data.tags,
            link: data.link,
            notes: data.notes,
            createdAt: dateTimestamp, 
        };

        const updatedProblems = problems.map(p => p.id === editingProblem.id ? updatedProblem : p);
        setProblems(updatedProblems);
        Storage.saveProblems(updatedProblems);
        setEditingProblem(null);
    } else {
        // Create Mode
        const newProblem: Problem = {
            id: crypto.randomUUID(),
            title: data.title,
            difficulty: data.difficulty,
            tags: data.tags,
            link: data.link,
            createdAt: dateTimestamp,
            lastReviewed: dateTimestamp,
            nextReview: dateTimestamp + (SRS_INTERVALS[0] * 24 * 60 * 60 * 1000), 
            level: 0,
            notes: data.notes || '',
            history: [{ date: dateTimestamp, rating: 'easy', problemTitle: data.title }]
        };

        const updatedProblems = [...problems, newProblem];
        setProblems(updatedProblems);
        Storage.saveProblems(updatedProblems);

        const newStats = {
            ...stats,
            xp: stats.xp + XP_REWARDS.ADD_PROBLEM,
            totalSolved: stats.totalSolved + 1
        };
        setStats(newStats);
        Storage.saveStats(newStats);
    }
  };

  // Handler: Delete Problem
  const handleDeleteProblem = (id: string) => {
    const updatedProblems = problems.filter(p => p.id !== id);
    setProblems(updatedProblems);
    Storage.saveProblems(updatedProblems);
    setIsModalOpen(false);
    setEditingProblem(null);
  };

  // Handler: Review Problem
  const handleReview = (problemId: string, rating: 'easy' | 'medium' | 'hard' | 'forgot') => {
    const problem = problems.find(p => p.id === problemId);
    if (!problem) return;

    let newLevel = problem.level;
    let nextIntervalDays = 1;

    if (rating === 'forgot') {
        newLevel = 0;
        nextIntervalDays = 1;
    } else if (rating === 'hard') {
        newLevel = Math.max(0, problem.level - 1);
        nextIntervalDays = SRS_INTERVALS[newLevel] || 1;
    } else if (rating === 'medium') {
        newLevel = problem.level;
        nextIntervalDays = SRS_INTERVALS[newLevel] || 3;
        newLevel = Math.min(SRS_INTERVALS.length - 1, newLevel + 1);
    } else if (rating === 'easy') {
        newLevel = Math.min(SRS_INTERVALS.length - 1, problem.level + 2);
        nextIntervalDays = SRS_INTERVALS[newLevel] || 7;
    }

    const nextReviewDate = Date.now() + (nextIntervalDays * 24 * 60 * 60 * 1000);

    const updatedProblem: Problem = {
        ...problem,
        lastReviewed: Date.now(),
        nextReview: nextReviewDate,
        level: newLevel,
        history: [...problem.history, { date: Date.now(), rating, problemTitle: problem.title }]
    };

    const updatedProblems = problems.map(p => p.id === problemId ? updatedProblem : p);
    setProblems(updatedProblems);
    Storage.saveProblems(updatedProblems);

    const newStats = {
        ...stats,
        xp: stats.xp + XP_REWARDS.REVIEW_PROBLEM,
        totalReviewed: stats.totalReviewed + 1
    };
    setStats(newStats);
    Storage.saveStats(newStats);
  };

  const openNewModal = () => {
      setEditingProblem(null);
      setIsModalOpen(true);
  };

  const openEditModal = (problem: Problem) => {
      setEditingProblem(problem);
      setIsModalOpen(true);
  };

  if (showLanding) {
    return <LandingPage onEnter={() => setShowLanding(false)} />;
  }

  return (
    <div className="min-h-screen pb-20 font-sans bg-black text-zinc-100">
      {/* Navbar */}
      <nav className="border-b border-zinc-900 bg-black/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView('dashboard')}>
            <div className="bg-zinc-900 p-1.5 rounded-lg border border-zinc-800">
                <BrainCircuit className="text-white" size={20} />
            </div>
            <h1 className="text-xl font-bold tracking-tight text-white">
              Leet<span className="text-zinc-600">Cycle</span>
            </h1>
          </div>
          
          <div className="flex gap-2">
              <div className="flex bg-zinc-900/50 rounded-lg p-1 border border-zinc-800">
                <button 
                    onClick={() => setView('dashboard')}
                    className={`p-2 rounded-md transition-colors ${view === 'dashboard' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    title="Dashboard"
                >
                    <LayoutDashboard size={18} />
                </button>
                <button 
                    onClick={() => setView('history')}
                    className={`p-2 rounded-md transition-colors ${view === 'history' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
                    title="History Log"
                >
                    <History size={18} />
                </button>
                <div className="w-px bg-zinc-800 mx-1"></div>
                <button 
                    onClick={() => setIsSettingsOpen(true)}
                    className="p-2 rounded-md transition-colors text-zinc-500 hover:text-white hover:bg-zinc-800"
                    title="Settings & Backup"
                >
                    <Settings size={18} />
                </button>
              </div>

              <button 
                onClick={openNewModal}
                className="bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 transition-colors ml-2"
              >
                <Plus size={16} />
                <span className="hidden sm:inline">Log Solve</span>
              </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-4 py-8 space-y-8">
        
        {view === 'dashboard' ? (
            <>
                {/* Stats & Quote */}
                <div>
                    <div className="flex justify-between items-baseline mb-4">
                        <p className="text-zinc-600 text-xs italic">"{motivationalQuote}"</p>
                    </div>
                    <StatsPanel stats={stats} />
                </div>

                {/* Achievements */}
                <div>
                    <h3 className="text-xs font-bold text-zinc-500 uppercase tracking-widest mb-3">Achievements</h3>
                    <Achievements stats={stats} />
                </div>

                {/* Date Wise Log (Heatmap) */}
                <div className="bg-black border border-zinc-900 p-5 rounded-xl">
                    <ActivityGraph problems={problems} />
                </div>

                {/* Dashboard: Review List */}
                <div>
                    <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 mt-10">
                    <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                        <button
                        onClick={() => setFilter('due')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            filter === 'due' 
                            ? 'bg-zinc-800 text-white shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                        >
                        Due Today <span className="ml-1 bg-zinc-950 px-1.5 py-0.5 rounded text-[10px] text-zinc-400">{dueProblems.length}</span>
                        </button>
                        <button
                        onClick={() => setFilter('all')}
                        className={`px-4 py-1.5 rounded-md text-sm font-medium transition-all ${
                            filter === 'all' 
                            ? 'bg-zinc-800 text-white shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                        >
                        All Problems
                        </button>
                    </div>

                    <div className="relative w-full sm:w-auto">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                        <input
                        type="text"
                        placeholder="Search..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full sm:w-64 bg-zinc-950 border border-zinc-900 rounded-lg pl-9 pr-4 py-2 text-sm text-zinc-200 focus:outline-none focus:border-zinc-700 focus:ring-1 focus:ring-zinc-700 placeholder:text-zinc-700"
                        />
                    </div>
                    </div>

                    {/* Progress Bar for Daily Limit */}
                    {filter === 'due' && (
                        <div className="mb-6 flex flex-col gap-2">
                            <div className="flex justify-between text-xs text-zinc-400 uppercase font-bold tracking-wider">
                                <span>Daily Goal</span>
                                <span>{reviewsToday} / {dailyLimit} Revised</span>
                            </div>
                            <div className="w-full h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                                <div 
                                    className={`h-full transition-all duration-500 ${reviewsToday >= dailyLimit ? 'bg-emerald-500' : 'bg-purple-500'}`}
                                    style={{ width: `${Math.min(100, (reviewsToday / dailyLimit) * 100)}%` }}
                                ></div>
                            </div>
                            {remainingDailyQuota === 0 && dueProblems.length > 0 && (
                                <p className="text-xs text-emerald-400 mt-1 flex items-center gap-1">
                                    <CheckSquare size={12} />
                                    Daily goal reached! {dueProblems.length} more problems are in the backlog.
                                </p>
                            )}
                        </div>
                    )}

                    <div className="space-y-4">
                    {displayProblems.length === 0 ? (
                        <div className="text-center py-20 bg-zinc-900/20 rounded-2xl border border-dashed border-zinc-900">
                            {filter === 'due' && remainingDailyQuota === 0 && reviewsToday >= dailyLimit ? (
                                <>
                                    <div className="bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                        <Coffee className="text-emerald-500" size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-1">You're done for today!</h3>
                                    <p className="text-zinc-600 text-sm max-w-xs mx-auto">
                                        Great work. You've hit your daily limit of {dailyLimit} problems. Come back tomorrow!
                                    </p>
                                    {dueProblems.length > 0 && (
                                        <button 
                                            onClick={() => setFilter('all')}
                                            className="mt-4 text-xs text-zinc-500 hover:text-zinc-300 underline"
                                        >
                                            View {dueProblems.length} backlog items in All Problems
                                        </button>
                                    )}
                                </>
                            ) : (
                                <>
                                    <div className="bg-zinc-900 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-800">
                                        <CheckSquare className="text-zinc-700" size={32} />
                                    </div>
                                    <h3 className="text-lg font-medium text-white mb-1">Zero state.</h3>
                                    <p className="text-zinc-600 text-sm max-w-xs mx-auto">
                                        {filter === 'due' 
                                        ? "Nothing due right now." 
                                        : "Start logging your journey."}
                                    </p>
                                </>
                            )}
                        </div>
                    ) : (
                        displayProblems.map(problem => (
                        <ReviewCard 
                            key={problem.id} 
                            problem={problem} 
                            onReview={handleReview}
                            onEdit={openEditModal}
                        />
                        ))
                    )}
                    </div>
                </div>
            </>
        ) : (
            <div className="max-w-2xl mx-auto">
                 <div className="flex items-center gap-2 mb-6 text-zinc-500">
                    <History size={16} />
                    <h2 className="text-sm font-bold uppercase tracking-widest">Recent Activity Log</h2>
                 </div>
                 
                 <div className="relative border-l border-zinc-800 ml-3 space-y-8">
                    {historyLog.length === 0 && (
                         <div className="ml-6 text-zinc-600 italic">No activity recorded yet.</div>
                    )}
                    {historyLog.map((log) => (
                        <div key={log.id} className="ml-6 relative">
                            <span className={`absolute -left-[31px] top-1 h-2.5 w-2.5 rounded-full border border-black ${
                                log.rating === 'easy' ? 'bg-emerald-500' : 
                                log.rating === 'medium' ? 'bg-amber-500' :
                                log.rating === 'hard' ? 'bg-rose-500' : 'bg-zinc-500'
                            }`}></span>
                            <div className="flex flex-col">
                                <span className="text-xs text-zinc-500 mb-0.5">{new Date(log.date).toLocaleString()}</span>
                                <span className="text-white font-medium">{log.title}</span>
                                <span className="text-xs text-zinc-600 capitalize">Rated: {log.rating}</span>
                            </div>
                        </div>
                    ))}
                 </div>
            </div>
        )}
      </main>

      <ProblemModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSubmit={handleSaveProblem}
        onDelete={handleDeleteProblem}
        initialData={editingProblem}
      />

      <SettingsModal 
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onDataImported={loadData}
      />
    </div>
  );
}