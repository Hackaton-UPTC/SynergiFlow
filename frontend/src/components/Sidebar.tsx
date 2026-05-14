import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, BarChart2, Settings, LogOut, Zap, Target, Coffee } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

export const Sidebar: React.FC = () => {
  return (
    <aside className="w-72 bg-[#020617] text-slate-400 p-8 flex flex-col border-r border-slate-800/50 relative overflow-hidden">
      {/* Decorative accent */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-indigo-600/20 rounded-full blur-[80px]" />
      
      <div className="flex items-center gap-3 mb-12 relative z-10">
        <div className="p-2 bg-indigo-600 rounded-xl">
          <Zap className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-black text-white tracking-tighter italic">SYNERGIFLOW</h1>
      </div>

      <nav className="flex flex-col gap-2 relative z-10">
        <NavItem icon={<Home size={20} />} label="Overview" active />
        <NavItem icon={<Users size={20} />} label="Stakeholders" />
        <NavItem icon={<Target size={20} />} label="Alignments" />
        <NavItem icon={<BarChart2 size={20} />} label="Vaporware" />
        <NavItem icon={<Coffee size={20} />} label="Synergy Breaks" />
        <div className="my-4 border-t border-slate-800/50" />
        <NavItem icon={<Settings size={20} />} label="Quantum Config" />
      </nav>

      <div className="mt-auto pt-8 border-t border-slate-800/50 relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div>
            <p className="text-xs font-black text-white uppercase tracking-widest">Admin Prime</p>
            <p className="text-[10px] text-slate-500 font-medium">Level 99 Synergy</p>
          </div>
        </div>
        <button className="flex items-center gap-2 text-rose-500 hover:text-rose-400 transition-colors font-bold text-xs">
          <LogOut size={16} />
          <span>ABANDON SHIP</span>
        </button>
      </div>
    </aside>
  );
};

function NavItem({ icon, label, active = false }: { icon: React.ReactNode, label: string, active?: boolean }) {
  return (
    <motion.button
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest",
        active 
          ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20" 
          : "hover:bg-slate-800/50 hover:text-slate-200"
      )}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
