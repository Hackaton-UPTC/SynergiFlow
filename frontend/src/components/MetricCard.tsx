import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, HelpCircle } from 'lucide-react';
import { AbsurdMetric } from '../types/dashboard';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const MetricCard: React.FC<{ metric: AbsurdMetric }> = ({ metric }) => {
  return (
    <motion.div
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-bg-card backdrop-blur-md rounded-3xl p-6 border border-border-soft shadow-sm relative overflow-hidden group"
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <HelpCircle size={48} />
      </div>

      <p className="text-[10px] font-black uppercase tracking-widest text-text-muted mb-2">{metric.title}</p>
      
      <div className="flex items-end gap-2">
        <h3 className="text-3xl font-black text-text-main tracking-tighter">
          {metric.value}
        </h3>
        {metric.unit && <span className="text-xs font-bold text-text-muted mb-1">{metric.unit}</span>}
      </div>

      <div className="flex items-center gap-2 mt-4">
        <div className={cn(
          "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold",
          metric.trend === 'up' ? "bg-emerald-100 text-emerald-600" : 
          metric.trend === 'down' ? "bg-rose-100 text-rose-600" : "bg-amber-100 text-amber-600"
        )}>
          {metric.trend === 'up' ? <TrendingUp size={12} /> : 
           metric.trend === 'down' ? <TrendingDown size={12} /> : <HelpCircle size={12} />}
          {metric.change}
        </div>
        <span className="text-[10px] text-slate-400 font-medium">Since last syncopation</span>
      </div>
    </motion.div>
  );
};
