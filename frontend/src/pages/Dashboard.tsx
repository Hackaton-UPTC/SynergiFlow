import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { MetricCard } from '../components/MetricCard';
import { UselessChart } from '../components/UselessChart';
import { AnnoyingPopup } from '../components/AnnoyingPopup';
import { useDashboardData } from '../hooks/useDashboardData';
import { Search, Plus, Bell, RefreshCcw, Zap } from 'lucide-react';

export default function Dashboard() {
  const { metrics, activities, popups, closePopup } = useDashboardData();

  return (
    <div className="min-h-screen bg-bg-main flex font-sans selection:bg-primary/30 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        {/* Encabezado Superior */}
        <header className="sticky top-0 z-20 bg-bg-card/80 backdrop-blur-xl border-b border-border-soft px-10 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-text-main tracking-tighter">
              Bienvenido de nuevo, <span className="text-primary italic">Visionario</span>.
            </h2>
            <p className="text-xs font-bold text-text-muted uppercase tracking-widest mt-1">
              Tus niveles actuales de sinergia son críticos.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-text-muted group-focus-within:text-primary transition-colors" size={16} />
              <input
                type="text"
                placeholder="Buscar en el vacío..."
                className="pl-10 pr-4 py-2 bg-black/20 border-none rounded-xl text-xs font-bold outline-none ring-2 ring-transparent focus:ring-primary/20 transition-all w-64 text-text-main"
              />
            </div>
            <button className="p-2 rounded-xl bg-bg-card-strong text-text-muted hover:text-primary transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-chaos-red rounded-full border-2 border-bg-main" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-primary text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-primary-dark transition-all shadow-lg shadow-primary/10">
              <Plus size={16} />
              <span>Manifestar Meta</span>
            </button>
          </div>
        </header>

        {/* Contenido del Dashboard */}
        <div className="p-10 space-y-10">
          
          {/* Cuadrícula de Estadísticas */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <MetricCard key={idx} metric={metric} />
            ))}
          </section>

          {/* Cuadrícula Principal */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Sección de Gráficos */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-bg-card rounded-[2.5rem] p-8 border border-border-soft shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-text-main tracking-tight">Rendimiento Existencial</h3>
                    <p className="text-xs font-bold text-text-muted uppercase tracking-widest">Índice de Sinergia vs Pavor</p>
                  </div>
                  <div className="flex items-center gap-2 p-1 bg-black/20 rounded-xl">
                    <button className="px-3 py-1.5 bg-bg-card-strong shadow-sm rounded-lg text-[10px] font-black text-primary">VIVO</button>
                    <button className="px-3 py-1.5 text-[10px] font-black text-text-disabled">HISTÓRICO</button>
                  </div>
                </div>
                <UselessChart />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-enterprise-gradient rounded-[2rem] p-8 text-white shadow-xl shadow-primary/20 relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Objetivo de Alineación</h4>
                  <div className="text-4xl font-black mb-2">99.8%</div>
                  <p className="text-xs font-medium opacity-60">Tu alineación con la mente colmena corporativa es casi perfecta.</p>
                  <button className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors">
                    <RefreshCcw size={14} /> Realinear Alma
                  </button>
                </div>

                <div className="bg-bg-card rounded-[2rem] p-8 border border-border-soft shadow-sm flex flex-col justify-center items-center text-center">
                   <div className="w-16 h-16 bg-compliance-yellow/20 rounded-full flex items-center justify-center text-compliance-yellow mb-4">
                     <Zap size={32} />
                   </div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-text-main">Densidad de Buzzwords</h4>
                   <p className="text-xs text-text-muted font-medium mt-2">El entorno actual cumple con el 42% de las palabras de moda.</p>
                </div>
              </div>
            </div>

            {/* Columna Lateral: Actividad */}
            <div className="bg-bg-card rounded-[2.5rem] p-8 border border-border-soft shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-text-main tracking-tight">Rastro de Vapor</h3>
                <span className="text-[10px] font-black bg-black/20 px-3 py-1 rounded-full text-text-muted">TIEMPO REAL</span>
              </div>

              <div className="space-y-6 flex-1">
                {activities.map((activity) => (
                  <motion.div 
                    key={activity.id}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="group"
                  >
                    <div className="flex gap-4">
                      <div className="mt-1 w-2 h-2 rounded-full bg-primary group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(255,92,0,0.5)]" />
                      <div className="space-y-1">
                        <p className="text-xs font-black text-text-main uppercase tracking-tight">{activity.title}</p>
                        <p className="text-xs text-text-muted leading-relaxed font-medium">{activity.description}</p>
                        <p className="text-[10px] text-text-disabled font-bold">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="mt-10 w-full py-4 border-2 border-dashed border-border-soft hover:border-primary hover:bg-primary/5 rounded-2xl text-[10px] font-black text-text-disabled hover:text-primary transition-all uppercase tracking-widest">
                Cargar Más Nada
              </button>
            </div>

          </section>
        </div>

        {/* Info del Footer */}
        <footer className="p-10 border-t border-border-soft text-center">
           <p className="text-[10px] font-bold text-text-disabled uppercase tracking-[0.5em]">
             SynergiFlow v4.2.0-alpha (Paradigm Stable)
           </p>
        </footer>

        {/* Capa de Popups Molestos */}
        <AnimatePresence>
          {popups.map(popup => (
            <AnnoyingPopup key={popup.id} popup={popup} onClose={closePopup} />
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
}
