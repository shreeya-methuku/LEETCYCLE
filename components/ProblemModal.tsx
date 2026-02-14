import React, { useState, useEffect } from 'react';
import { X, Plus, Link as LinkIcon, StickyNote, Save, Trash2, Calendar } from 'lucide-react';
import { Difficulty, Problem } from '../types';

interface ProblemModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (problemData: any) => void;
  onDelete?: (id: string) => void;
  initialData?: Problem | null;
}

const ProblemModal: React.FC<ProblemModalProps> = ({ isOpen, onClose, onSubmit, onDelete, initialData }) => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [difficulty, setDifficulty] = useState<Difficulty>('Medium');
  const [tags, setTags] = useState('');
  const [notes, setNotes] = useState('');
  const [date, setDate] = useState('');

  // Populate form when modal opens or initialData changes
  useEffect(() => {
    if (isOpen) {
        if (initialData) {
            setTitle(initialData.title);
            setLink(initialData.link || '');
            setDifficulty(initialData.difficulty);
            setTags(initialData.tags.join(', '));
            setNotes(initialData.notes || '');
            // Convert timestamp to YYYY-MM-DD
            const d = new Date(initialData.createdAt);
            setDate(d.toISOString().split('T')[0]);
        } else {
            // Reset for new entry
            setTitle('');
            setLink('');
            setDifficulty('Medium');
            setTags('');
            setNotes('');
            // Default to today (Local time)
            // Using en-CA gives YYYY-MM-DD format
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            setDate(`${year}-${month}-${day}`);
        }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    onSubmit({
      title: title.trim(),
      link: link.trim() || `https://leetcode.com/problems/${title.toLowerCase().replace(/ /g, '-')}/`,
      difficulty,
      tags: tags.split(',').map(t => t.trim()).filter(Boolean),
      summary: '',
      notes: notes.trim(),
      date: date // Pass the selected date string
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-black border border-zinc-800 w-full max-w-md rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-black">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span className="w-1.5 h-6 bg-purple-600 rounded-full"></span>
            {initialData ? 'Edit Problem' : 'Log New Problem'}
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5 overflow-y-auto">
          
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 mb-1.5">Problem Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Two Sum"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-all placeholder:text-zinc-700"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             {/* Difficulty */}
            <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1.5">Difficulty</label>
                <div className="flex rounded-lg bg-zinc-900 border border-zinc-800 p-1">
                    {(['Easy', 'Medium', 'Hard'] as Difficulty[]).map((level) => (
                        <button
                            key={level}
                            type="button"
                            onClick={() => setDifficulty(level)}
                            className={`flex-1 py-1.5 rounded text-xs font-bold transition-all ${
                                difficulty === level
                                    ? level === 'Easy' ? 'bg-teal-500/20 text-teal-400'
                                    : level === 'Medium' ? 'bg-amber-500/20 text-amber-400'
                                    : 'bg-rose-500/20 text-rose-400'
                                    : 'text-zinc-500 hover:text-zinc-300'
                            }`}
                        >
                            {level}
                        </button>
                    ))}
                </div>
            </div>

            {/* Date */}
            <div>
                <label className="block text-sm font-medium text-zinc-500 mb-1.5">Date Solved</label>
                <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                    <input
                        type="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-2 py-2 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-all placeholder:text-zinc-700 text-sm [color-scheme:dark]"
                        required
                    />
                </div>
            </div>
          </div>

          {/* Link */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 mb-1.5">Problem URL (Optional)</label>
            <div className="relative">
                <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={16} />
                <input
                type="url"
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="https://leetcode.com/problems/..."
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-all placeholder:text-zinc-700 text-sm"
                />
            </div>
          </div>

           {/* Tags */}
           <div>
            <label className="block text-sm font-medium text-zinc-500 mb-1.5">Tags (comma separated)</label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. DP, Array, String"
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-all placeholder:text-zinc-700 text-sm"
            />
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-zinc-500 mb-1.5">Notes (Approach / Intuition)</label>
            <div className="relative">
                <StickyNote className="absolute left-3 top-3 text-zinc-600" size={16} />
                <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Briefly describe your approach..."
                rows={3}
                className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-9 pr-4 py-2.5 text-white focus:outline-none focus:ring-1 focus:ring-purple-600 focus:border-purple-600 transition-all placeholder:text-zinc-700 text-sm resize-none"
                />
            </div>
          </div>

          <div className="flex gap-2 mt-4">
            {initialData && onDelete && (
                <button
                type="button"
                onClick={() => {
                    if (window.confirm('Are you sure you want to delete this problem?')) {
                        onDelete(initialData.id);
                    }
                }}
                className="bg-zinc-900 hover:bg-rose-900/20 hover:border-rose-800 text-zinc-500 hover:text-rose-500 border border-zinc-800 font-bold py-3 px-4 rounded-xl transition-all"
                title="Delete Problem"
                >
                <Trash2 size={18} />
                </button>
            )}
            <button
                type="submit"
                className="flex-1 bg-white hover:bg-zinc-200 text-black font-bold py-3 rounded-xl transition-all active:scale-[0.98] flex items-center justify-center gap-2"
            >
                {initialData ? <Save size={18} /> : <Plus size={18} />}
                {initialData ? 'Update Problem' : 'Add Problem'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProblemModal;