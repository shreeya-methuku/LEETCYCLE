import React, { useRef } from 'react';
import { X, Download, Upload, AlertTriangle, ShieldCheck } from 'lucide-react';
import * as Storage from '../services/storageService';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onDataImported: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose, onDataImported }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleExport = () => {
    Storage.exportData();
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
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
            Data Settings
          </h2>
          <button onClick={onClose} className="text-zinc-500 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <div className="p-6 space-y-6">
          <div className="p-4 bg-purple-900/10 border border-purple-500/20 rounded-xl">
             <h3 className="text-sm font-bold text-purple-400 mb-1">Local Storage</h3>
             <p className="text-xs text-zinc-400 leading-relaxed">
                Your data is stored securely in your browser. It is not synced to the cloud. 
                Use the options below to move your data between devices.
             </p>
          </div>

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

          <div className="flex items-center gap-2 text-[10px] text-zinc-600 justify-center pt-2">
             <AlertTriangle size={12} />
             <span>Importing will replace current data</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;