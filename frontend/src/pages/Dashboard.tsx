import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { MetricCard } from '../components/MetricCard';
import { UselessChart } from '../components/UselessChart';
import { AnnoyingPopup } from '../components/AnnoyingPopup';
import { useDashboardData } from '../hooks/useDashboardData';
import { Search, Plus, Bell, RefreshCcw, Zap, Users, Target, BarChart2, Coffee, Ghost, AlertTriangle } from 'lucide-react';

type TabId = 'overview' | 'stakeholders' | 'alignments' | 'vaporware' | 'breaks' | 'config';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState<TabId>('overview');
  const [showNotifications, setShowNotifications] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const { metrics, activities, popups, closePopup } = useDashboardData();

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-10 animate-in fade-in duration-500">
            <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {metrics.map((metric, idx) => (
                <MetricCard key={idx} metric={metric} />
              ))}
            </section>

            <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-bg-card rounded-[2.5rem] p-8 border border-border-soft shadow-sm">
                  <div className="flex items-center justify-between mb-8">
                    <div>
                      <h3 className="text-xl font-black text-text-main tracking-tight">Rendimiento Existencial</h3>
                      <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Índice de Sinergia vs Pavor</p>
                    </div>
                  </div>
                  <UselessChart />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-enterprise-gradient rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                    <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Objetivo de Alineación</h4>
                    <div className="text-4xl font-black mb-2">99.8%</div>
                    <p className="text-xs font-medium opacity-60">Tu alineación con la mente colmena corporativa es casi perfecta.</p>
                  </div>
                  <div className="bg-bg-card rounded-[2rem] p-8 border border-border-soft shadow-sm flex flex-col justify-center items-center text-center">
                     <div className="w-16 h-16 bg-compliance-yellow/20 rounded-full flex items-center justify-center text-compliance-yellow mb-4">
                       <Zap size={32} />
                     </div>
                     <h4 className="text-sm font-black uppercase tracking-widest text-text-main">Densidad de Buzzwords</h4>
                     <p className="text-xs text-text-muted font-medium mt-2">42% de palabras de moda detectadas.</p>
                  </div>
                </div>
              </div>
              <div className="bg-bg-card rounded-[2.5rem] p-8 border border-border-soft shadow-sm flex flex-col h-full">
                <h3 className="text-xl font-black text-text-main mb-8 tracking-tight">Rastro de Vapor</h3>
                <div className="space-y-6 flex-1">
                  {activities.map((activity) => (
                    <div key={activity.id} className="flex gap-4 group">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(255,92,0,0.5)]" />
                      <div>
                        <p className="text-xs font-black text-text-main uppercase">{activity.title}</p>
                        <p className="text-[11px] text-text-muted leading-tight mt-1">{activity.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>
        );
      case 'stakeholders':
        return (
          <div className="bg-bg-card rounded-[2.5rem] p-10 border border-border-soft animate-in slide-in-from-bottom-4 duration-500">
            <h3 className="text-3xl font-black text-text-main mb-8 flex items-center gap-4">
              <Users className="text-primary" size={32} /> Jerarquía de Stakeholders
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="p-6 rounded-2xl bg-black/20 border border-border-soft flex items-center justify-between group hover:border-primary transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-bg-card-strong border border-border-soft flex items-center justify-center font-black text-primary">VP</div>
                    <div>
                      <p className="text-sm font-black text-text-main">Director de Entropía #{i}</p>
                      <p className="text-[10px] text-text-muted uppercase tracking-widest">Nivel de Aprobación: Incierto</p>
                    </div>
                  </div>
                  <button className="text-[10px] font-black px-3 py-1.5 bg-primary/10 text-primary rounded-lg opacity-0 group-hover:opacity-100 transition-opacity">Ignorar</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'alignments':
        return (
          <div className="flex flex-col items-center justify-center min-h-[500px] text-center space-y-8 animate-in zoom-in-95 duration-500">
             <div className="relative">
               <Target className="text-primary w-48 h-48 animate-spin-slow opacity-20" />
               <Target className="text-primary w-24 h-24 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-pulse" />
             </div>
             <h3 className="text-4xl font-black text-text-main italic">Sincronizador de Almas</h3>
             <p className="text-text-muted max-w-md mx-auto">Mueve tu cursor rítmicamente para alinear tu visión con el presupuesto del próximo trimestre.</p>
             <button className="px-8 py-4 bg-primary text-white font-black uppercase tracking-widest rounded-2xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all">Iniciar Alineación Crucial</button>
          </div>
        );
      case 'vaporware':
        return (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-700">
            {['Blockchain de Café', 'SaaS de Inutilidad', 'IA de Micro-management', 'Nube de Estrés'].map((item, idx) => (
              <div key={idx} className="bg-bg-card p-8 rounded-[2rem] border border-border-soft relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 text-text-disabled group-hover:text-primary transition-colors">
                  <Ghost size={40} />
                </div>
                <h4 className="text-lg font-black text-text-main mb-2">{item}</h4>
                <p className="text-xs text-text-muted">Estado: Post-Beta Inexistente</p>
                <div className="mt-6 h-1 w-full bg-black/20 rounded-full overflow-hidden">
                  <motion.div initial={{ x: '-100%' }} animate={{ x: '0%' }} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-1/3 bg-primary" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'breaks':
        return (
          <div className="bg-chaos-red/10 border border-chaos-red/30 p-12 rounded-[3rem] text-center space-y-6 animate-in slide-in-from-top-4">
            <Coffee className="mx-auto text-chaos-red w-16 h-16" />
            <h3 className="text-3xl font-black text-text-main uppercase tracking-tighter">Pausa Obligatoria</h3>
            <p className="text-sm text-text-muted">Has intentado ser productivo durante 4 minutos. Por favor, mira fijamente a la pared hasta que la métrica de sinergia se estabilice.</p>
            <div className="text-6xl font-black text-chaos-red tabular-nums">00:59</div>
            <button className="text-[10px] font-black text-chaos-red/60 uppercase tracking-widest hover:text-chaos-red transition-colors">Solicitar permiso para parpadear</button>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-bg-main flex font-sans selection:bg-primary/30 overflow-hidden">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />

      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        <header className="sticky top-0 z-20 bg-bg-card/80 backdrop-blur-xl border-b border-border-soft px-10 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-text-main tracking-tighter">
              Hola, <span className="text-primary italic">Visionario</span>.
            </h2>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">
              Estás viendo: <span className="text-text-main">{activeTab}</span>
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={16} />
              <input
                type="text"
                placeholder="Buscar en el vacío..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-black/20 border-none rounded-xl text-xs font-bold outline-none ring-2 ring-transparent focus:ring-primary/20 transition-all w-64 text-text-main"
              />
              {searchTerm && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-bg-card border border-border-soft rounded-xl p-4 shadow-2xl text-[10px] font-bold text-text-muted">
                  No se encontraron resultados para "{searchTerm}" en esta dimensión.
                </div>
              )}
            </div>
            
            <div className="relative">
              <button 
                onClick={() => setShowNotifications(!showNotifications)}
                className={`p-2 rounded-xl transition-colors relative ${showNotifications ? 'bg-primary text-white' : 'bg-bg-card-strong text-text-muted hover:text-primary'}`}
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 w-2 h-2 bg-chaos-red rounded-full border-2 border-bg-main" />
              </button>
              
              <AnimatePresence>
                {showNotifications && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 10 }} className="absolute top-full right-0 mt-4 w-80 bg-bg-card border border-border-soft rounded-3xl shadow-2xl overflow-hidden z-50">
                    <div className="p-4 bg-primary/10 border-b border-border-soft flex items-center gap-2">
                      <AlertTriangle size={14} className="text-primary" />
                      <span className="text-[10px] font-black text-text-main uppercase">Notificaciones de Urgencia</span>
                    </div>
                    <div className="p-2 space-y-1">
                      {[1, 2, 3].map(i => (
                        <div key={i} className="p-3 hover:bg-black/10 rounded-2xl transition-colors cursor-pointer">
                          <p className="text-[11px] font-black text-text-main uppercase tracking-tighter">Alerta de Sinergia #{i}</p>
                          <p className="text-[10px] text-text-muted leading-tight">El departamento de café ha reportado una baja del 12%.</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <button 
              onClick={() => alert("Meta manifestada. Espere 4 a 6 meses para la aprobación espiritual.")}
              className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/10 active:scale-95"
            >
              <Plus size={16} />
              <span>Manifestar Meta</span>
            </button>
          </div>
        </header>

        <div className="p-10 pb-32">
          {renderContent()}
        </div>

        <footer className="fixed bottom-0 left-72 right-0 bg-bg-main/80 backdrop-blur-md p-6 border-t border-border-soft text-center z-10">
           <p className="text-[10px] font-bold text-text-disabled uppercase tracking-[0.5em]">
             SynergiFlow v4.2.0-alpha (Paradigm Stable)
           </p>
        </footer>

        <AnimatePresence>
          {popups.map(popup => (
            <AnnoyingPopup key={popup.id} popup={popup} onClose={closePopup} />
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
}
