import React, { useRef, useState, useEffect } from 'react';
import { X, Download, Upload, AlertTriangle, ShieldCheck, Target } from 'lucide-react';
import * as Storage from '../services/storageService';
import { UserStats } from '../types';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImported: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [limit, setLimit] = useState(2);

  // Load current stats when modal opens
  useEffect(() => {
    if (isOpen) {
        const stats = Storage.getStats();
        setLimit(stats.dailyLimit || 2);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleExport = () => {
    Storage.exportData();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const saveLimit = (newVal: number) => {
      setLimit(newVal);
      const currentStats = Storage.getStats();
      const newStats: UserStats = { ...currentStats, dailyLimit: newVal };
      Storage.saveStats(newStats);
      // Trigger a reload of data in parent (indirectly via onDataImported for simplicity, or just rely on next app refresh)
      // Ideally App should listen to storage changes, but calling onDataImported works to trigger a refresh in App.tsx
      onDataImported(); 
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (window.confirm('This will overwrite your current data with the backup. Are you sure?')) {
        const result = await Storage.importData(file);
        if (result.success) {
            alert(result.message);
            onDataImported();
            onClose();
        } else {
            alert(result.message);
        }
    }
    // Reset input
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="bg-zinc-950 border border-zinc-800 w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200">
        
        <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-zinc-900/50">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <ShieldCheck size={20} className="text-purple-500" />
            Settings
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-8">
          
          {/* Daily Limit Setting */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-purple-400">
                <Target size={18} />
                <h3 className="text-sm font-bold">Daily Revision Limit</h3>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                    <span className="text-xs text-zinc-400">Problems per day</span>
                    <span className="text-xl font-bold text-white">{limit}</span>
                </div>
                <input 
                    type="range" 
                    min="1" 
                    max="10" 
                    value={limit} 
                    onChange={(e) => saveLimit(parseInt(e.target.value))}
                    className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-purple-500"
                />
                <p className="text-[10px] text-zinc-500 mt-2">
                    We'll only show this many problems in your "Due Today" list to prevent burnout.
                </p>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-6">
            <h3 className="text-sm font-bold text-zinc-400 mb-3">Data Backup</h3>
            <div className="space-y-3">
                <button 
                    onClick={handleExport}
                    className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-zinc-800 group-hover:bg-zinc-700 p-2 rounded-lg transition-colors">
                            <Download size={20} className="text-zinc-400 group-hover:text-white" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-sm text-zinc-200 group-hover:text-white">Export Backup</div>
                            <div className="text-[10px] text-zinc-500">Download JSON file</div>
                        </div>
                    </div>
                </button>

                <button 
                    onClick={handleImportClick}
                    className="w-full flex items-center justify-between p-4 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 hover:border-zinc-700 rounded-xl transition-all group"
                >
                    <div className="flex items-center gap-3">
                        <div className="bg-zinc-800 group-hover:bg-zinc-700 p-2 rounded-lg transition-colors">
                            <Upload size={20} className="text-zinc-400 group-hover:text-white" />
                        </div>
                        <div className="text-left">
                            <div className="font-bold text-sm text-zinc-200 group-hover:text-white">Import Backup</div>
                            <div className="text-[10px] text-zinc-500">Restore from JSON file</div>
                        </div>
                    </div>
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        className="hidden" 
                        accept=".json"
                        onChange={handleFileChange}
                    />
                </button>
            </div>
            <div className="flex items-center gap-2 text-[10px] text-zinc-600 justify-center pt-2 mt-2">
                <AlertTriangle size={12} />
                <span>Importing will replace current data</span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SettingsModal;