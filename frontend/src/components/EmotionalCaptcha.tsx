import React from 'react';
import { motion } from 'framer-motion';
import { Ghost, Heart, Frown, Brain } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { CaptchaEmotion } from '../types';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

const EMOTIONS: CaptchaEmotion[] = [
  { name: 'Ennui', icon: <Ghost className="w-8 h-8" />, color: 'bg-slate-400' },
  { name: 'Saudade', icon: <Heart className="w-8 h-8" />, color: 'bg-rose-400' },
  { name: 'Weltschmerz', icon: <Frown className="w-8 h-8" />, color: 'bg-indigo-400' },
  { name: 'Schadenfreude', icon: <Brain className="w-8 h-8" />, color: 'bg-amber-400' },
];

interface EmotionalCaptchaProps {
  selected: string | null;
  onSelect: (name: string) => void;
}

export const EmotionalCaptcha: React.FC<EmotionalCaptchaProps> = ({ selected, onSelect }) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Emotional Proof of Life</label>
        <p className="text-[11px] text-slate-400 italic">"Select the void that represents 'Ennui'..."</p>
      </div>
      <div className="grid grid-cols-4 gap-3">
        {EMOTIONS.map((emotion) => (
          <motion.button
            key={emotion.name}
            type="button"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => onSelect(emotion.name)}
            className={cn(
              "p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden group",
              selected === emotion.name 
                ? "border-indigo-500 bg-indigo-500/20 shadow-[0_0_20px_rgba(99,102,241,0.3)]" 
                : "border-slate-800 bg-slate-900/50 hover:border-slate-600"
            )}
          >
            <div className={cn(
              "p-2 rounded-xl text-white transition-transform duration-500 group-hover:scale-110", 
              emotion.color
            )}>
              {emotion.icon}
            </div>
            {selected === emotion.name && (
              <motion.div 
                layoutId="active-captcha"
                className="absolute inset-0 bg-indigo-500/10 pointer-events-none"
              />
            )}
          </motion.button>
        ))}
      </div>
    </div>
  );
};
