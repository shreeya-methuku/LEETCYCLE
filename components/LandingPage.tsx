import React from 'react';
import { BrainCircuit, Zap, ArrowRight } from 'lucide-react';

interface LandingPageProps {
  onEnter: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-purple-500/30 font-sans flex flex-col justify-center relative overflow-hidden">
      
      {/* Ambient Background Glows */}
      <div className="absolute top-1/4 -left-20 w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none opacity-40" />
      <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-emerald-600/5 rounded-full blur-[128px] pointer-events-none opacity-40" />

      {/* Navbar / Header */}
      <header className="absolute top-0 left-0 right-0 px-6 py-8 flex justify-between items-center max-w-7xl mx-auto w-full z-10">
        <div className="flex items-center gap-2">
          <div className="bg-zinc-900 p-2 rounded-lg border border-zinc-800">
             <BrainCircuit className="text-white" size={24} />
          </div>
          <span className="text-xl font-bold tracking-tight">LeetCycle</span>
        </div>
        <button 
          onClick={onEnter}
          className="text-sm font-semibold text-zinc-400 hover:text-white transition-colors"
        >
          Enter App
        </button>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-4 text-center z-10">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-400 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Zap size={12} className="text-white" />
            <span>Spaced Repetition System</span>
          </div>
          
          <h1 className="text-5xl md:text-9xl font-bold tracking-tighter leading-[1.1] animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            MASTER<br />
            <span className="text-zinc-500">THE PATTERN.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-zinc-500 max-w-xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200 leading-relaxed font-light">
            Log your solves. Let the algorithm handle the schedule. <br/> Never forget a solution again.
          </p>

          <div className="flex items-center justify-center pt-8 animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <button 
              onClick={onEnter}
              className="px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-all active:scale-95 flex items-center gap-2 group text-lg tracking-tight"
            >
              Start Practicing
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </main>

      <footer className="absolute bottom-8 left-0 right-0 text-center text-zinc-700 text-xs">
        <p>LeetCycle &copy; {new Date().getFullYear()}</p>
      </footer>
    </div>
  );
};

export default LandingPage;