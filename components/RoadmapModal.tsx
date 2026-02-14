
import React, { useState, useMemo } from 'react';
import { X, Search, Plus, Check, ExternalLink, List, Eye } from 'lucide-react';
import { NEETCODE_PROBLEMS, BLIND75_PROBLEMS, DIFFICULTY_COLORS } from '../constants';
import { Difficulty } from '../types';

interface RoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  // We pass a simple handler that takes the problem data
  onAdd: (data: any) => void;
  existingTitles: Set<string>;
}

type ListType = 'NeetCode' | 'Blind75';

const RoadmapModal: React.FC<RoadmapModalProps> = ({ isOpen, onClose, onAdd, existingTitles }) => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeList, setActiveList] = useState<ListType>('NeetCode');

  const sourceList = activeList === 'NeetCode' ? NEETCODE_PROBLEMS : BLIND75_PROBLEMS;

  const categories = useMemo(() => {
    const cats = new Set(sourceList.map(p => p.category));
    return ['All', ...Array.from(cats).sort()];
  }, [sourceList]);

  // Reset category when switching lists if it doesn't exist
  useMemo(() => {
    if (selectedCategory !== 'All' && !categories.includes(selectedCategory)) {
        setSelectedCategory('All');
    }
  }, [categories, selectedCategory]);

  const filteredProblems = useMemo(() => {
    return sourceList.filter(p => {
        const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
        return matchesSearch && matchesCategory;
    });
  }, [search, selectedCategory, sourceList]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-black border border-zinc-800 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden flex flex-col h-[85vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <div className="flex items-center gap-3">
             <div className="bg-purple-900/30 p-2 rounded-lg border border-purple-500/20">
                <List size={20} className="text-purple-400" />
             </div>
             <div>
                <h2 className="text-lg font-bold text-white">Problem Roadmap</h2>
                <p className="text-xs text-zinc-500">Select problems you have solved to add them to your rotation.</p>
             </div>
          </div>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={24} />
          </button>
        </div>

        {/* List Toggle Tabs */}
        <div className="flex border-b border-zinc-800">
            <button 
                onClick={() => setActiveList('NeetCode')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeList === 'NeetCode' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                <List size={14} />
                NeetCode 150
                {activeList === 'NeetCode' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-purple-500"></div>}
            </button>
            <div className="w-px bg-zinc-800"></div>
            <button 
                onClick={() => setActiveList('Blind75')}
                className={`flex-1 py-3 text-sm font-bold flex items-center justify-center gap-2 transition-colors relative ${activeList === 'Blind75' ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'}`}
            >
                <Eye size={14} />
                Blind 75
                {activeList === 'Blind75' && <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-emerald-500"></div>}
            </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-zinc-800 grid gap-4 md:grid-cols-[200px_1fr]">
            {/* Category Filter */}
            <select 
                value={selectedCategory} 
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5"
            >
                {categories.map(c => <option key={c} value={c}>{c}</option>)}
            </select>

            {/* Search */}
            <div className="relative">
                <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                    <Search className="w-4 h-4 text-zinc-500" />
                </div>
                <input 
                    type="text" 
                    className="bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full ps-10 p-2.5" 
                    placeholder="Search title..." 
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 bg-black">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredProblems.map((problem) => {
                    const isAdded = existingTitles.has(problem.title);
                    const diffColor = DIFFICULTY_COLORS[problem.difficulty as Difficulty];
                    
                    return (
                        <div 
                            key={problem.title} 
                            className={`p-3 rounded-xl border transition-all ${isAdded ? 'bg-zinc-900/40 border-emerald-900/50 opacity-60' : 'bg-zinc-900 border-zinc-800 hover:border-zinc-600'}`}
                        >
                            <div className="flex justify-between items-start mb-2">
                                <span className={`text-[10px] px-2 py-0.5 rounded-full border ${diffColor}`}>
                                    {problem.difficulty}
                                </span>
                                {isAdded ? (
                                    <span className="text-emerald-500 flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider">
                                        <Check size={12} /> Logged
                                    </span>
                                ) : (
                                    <button 
                                        onClick={() => onAdd({
                                            title: problem.title,
                                            difficulty: problem.difficulty,
                                            tags: [problem.category],
                                            link: problem.link,
                                            notes: '',
                                            // Defaults to today
                                            date: new Date().toLocaleDateString('en-CA')
                                        })}
                                        className="text-white hover:bg-white hover:text-black border border-zinc-700 bg-black transition-colors rounded-lg p-1.5"
                                        title="Log as Solved Today"
                                    >
                                        <Plus size={16} />
                                    </button>
                                )}
                            </div>
                            
                            <h3 className="font-bold text-zinc-200 text-sm mb-1 truncate" title={problem.title}>
                                {problem.title}
                            </h3>
                            
                            <div className="flex justify-between items-center mt-2">
                                <span className="text-[10px] text-zinc-500">{problem.category}</span>
                                <a 
                                    href={problem.link} 
                                    target="_blank" 
                                    rel="noreferrer" 
                                    className="text-zinc-600 hover:text-purple-400"
                                >
                                    <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    );
                })}

                {filteredProblems.length === 0 && (
                    <div className="col-span-full text-center py-10 text-zinc-600">
                        No problems found matching your criteria.
                    </div>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};

export default RoadmapModal;
