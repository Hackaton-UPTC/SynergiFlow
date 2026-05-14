import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Frown, Angry, Meh } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const MOODS = [
  { name: 'Happy', icon: <Smile className="w-8 h-8" />, color: 'bg-emerald-400' },
  { name: 'Sad', icon: <Frown className="w-8 h-8" />, color: 'bg-sky-400' },
  { name: 'Angry', icon: <Angry className="w-8 h-8" />, color: 'bg-rose-400' },
  { name: 'Neutral', icon: <Meh className="w-8 h-8" />, color: 'bg-amber-400' },
];

interface MoodSelectorProps {
  selected: string | null;
  onSelect: (name: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Mood check</label>
        <p className="text-[11px] text-slate-400 italic">Select Happy to continue</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {MOODS.map((mood) => (
          <motion.button
            key={mood.name}
            type="button"
            whileHover={{ scale: 1.05, rotate: 3 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => onSelect(mood.name)}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden group",
              selected === mood.name
                ? "border-indigo-500 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]"
                : "border-slate-800 bg-slate-900/50 hover:border-slate-600"
            )}
          >
            <div className={cn("p-2 rounded-xl text-white transition-transform duration-500 group-hover:scale-110", mood.color)}>
              {mood.icon}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
};
