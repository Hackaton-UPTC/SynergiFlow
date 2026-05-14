import React from 'react';
import { motion } from 'framer-motion';
import { Home, Users, BarChart2, Settings, LogOut, Zap, Target, Coffee } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

type TabId = 'overview' | 'stakeholders' | 'alignments' | 'vaporware' | 'breaks' | 'config';

interface SidebarProps {
  activeTab: TabId;
  onTabChange: (tab: TabId) => void;
  onLogout?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange, onLogout }) => {
  return (
    <aside className="w-72 bg-bg-main text-text-muted p-8 flex flex-col border-r border-border-soft relative overflow-hidden h-screen sticky top-0">
      {/* Acento decorativo */}
      <div className="absolute -top-24 -left-24 w-48 h-48 bg-primary/20 rounded-full blur-[80px]" />
      
      <div className="flex items-center gap-3 mb-12 relative z-10">
        <div className="p-2 bg-primary rounded-xl">
          <Zap className="text-white w-6 h-6" />
        </div>
        <h1 className="text-xl font-black text-white tracking-tighter italic">SYNERGIFLOW</h1>
      </div>

      <nav className="flex flex-col gap-2 relative z-10 flex-1">
        <NavItem 
          icon={<Home size={20} />} 
          label="Vista General" 
          active={activeTab === 'overview'} 
          onClick={() => onTabChange('overview')} 
        />
        <NavItem 
          icon={<Users size={20} />} 
          label="Involucrados" 
          active={activeTab === 'stakeholders'} 
          onClick={() => onTabChange('stakeholders')} 
        />
        <NavItem 
          icon={<Target size={20} />} 
          label="Alineaciones" 
          active={activeTab === 'alignments'} 
          onClick={() => onTabChange('alignments')} 
        />
        <NavItem 
          icon={<BarChart2 size={20} />} 
          label="Vaporware" 
          active={activeTab === 'vaporware'} 
          onClick={() => onTabChange('vaporware')} 
        />
        <NavItem 
          icon={<Coffee size={20} />} 
          label="Pausas Sinergia" 
          active={activeTab === 'breaks'} 
          onClick={() => onTabChange('breaks')} 
        />
        
        <div className="my-4 border-t border-border-soft" />
        
        <NavItem 
          icon={<Settings size={20} />} 
          label="Config. Cuántica" 
          active={activeTab === 'config'} 
          onClick={() => onTabChange('config')} 
        />
      </nav>

      <div className="mt-auto pt-8 border-t border-border-soft relative z-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-enterprise-gradient flex items-center justify-center text-white font-bold">
            AD
          </div>
          <div>
            <p className="text-xs font-black text-white uppercase tracking-widest">Admin Prime</p>
            <p className="text-[10px] text-text-muted font-medium">Nivel 99 Sinergia</p>
          </div>
        </div>
        <button 
          onClick={onLogout ?? (() => window.location.reload())}
          className="flex items-center gap-2 text-chaos-red hover:text-chaos-red/80 transition-colors font-bold text-xs uppercase tracking-widest"
        >
          <LogOut size={16} />
          <span>ABANDONAR BARCO</span>
        </button>
      </div>
    </aside>
  );
};

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick: () => void }) {
  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-300 font-bold text-xs uppercase tracking-widest text-left w-full",
        active 
          ? "bg-primary text-white shadow-lg shadow-primary/20" 
          : "hover:bg-bg-card-strong hover:text-text-main text-text-muted"
      )}
    >
      {icon}
      <span>{label}</span>
    </motion.button>
  );
}
