import React from 'react';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface RequirementItemProps {
  met: boolean;
  text: string;
}

export const RequirementItem: React.FC<RequirementItemProps> = ({ met, text }) => {
  return (
    <div className={cn(
      "flex items-center gap-2 transition-all duration-300", 
      met ? "text-emerald-400 scale-100" : "text-slate-500 scale-95"
    )}>
      {met ? <CheckCircle2 size={12} className="shrink-0" /> : <AlertCircle size={12} className="shrink-0" />}
      <span className="text-[10px] leading-tight">{text}</span>
    </div>
  );
};
