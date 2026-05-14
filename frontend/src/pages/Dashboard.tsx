import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sidebar } from '../components/Sidebar';
import { MetricCard } from '../components/MetricCard';
import { UselessChart } from '../components/UselessChart';
import { AnnoyingPopup } from '../components/AnnoyingPopup';
import { useDashboardData } from '../hooks/useDashboardData';
import { Search, Plus, Bell, RefreshCcw } from 'lucide-react';

export default function Dashboard() {
  const { metrics, activities, popups, closePopup } = useDashboardData();

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-indigo-500/30 overflow-hidden">
      <Sidebar />

      <main className="flex-1 flex flex-col relative h-screen overflow-y-auto">
        {/* Top Header */}
        <header className="sticky top-0 z-20 bg-white/70 backdrop-blur-xl border-b border-slate-200 px-10 py-6 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">
              Welcome back, <span className="text-indigo-600 italic">Visionary</span>.
            </h2>
            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
              Your current synergy levels are critical.
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative group">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-indigo-500 transition-colors" size={16} />
              <input
                type="text"
                placeholder="Search the void..."
                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-xl text-xs font-bold outline-none ring-2 ring-transparent focus:ring-indigo-500/20 transition-all w-64"
              />
            </div>
            <button className="p-2 rounded-xl bg-slate-100 text-slate-500 hover:text-indigo-600 transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-0 right-0 w-2 h-2 bg-rose-500 rounded-full border-2 border-white" />
            </button>
            <button className="flex items-center gap-2 px-5 py-2 bg-slate-900 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              <Plus size={16} />
              <span>Manifest New Goal</span>
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="p-10 space-y-10">
          
          {/* Stats Grid */}
          <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {metrics.map((metric, idx) => (
              <MetricCard key={idx} metric={metric} />
            ))}
          </section>

          {/* Main Grid */}
          <section className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Charts Section */}
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-xl font-black text-slate-900 tracking-tight">Existential Throughput</h3>
                    <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Synergy vs Dread Index</p>
                  </div>
                  <div className="flex items-center gap-2 p-1 bg-slate-100 rounded-xl">
                    <button className="px-3 py-1.5 bg-white shadow-sm rounded-lg text-[10px] font-black text-indigo-600">LIVE</button>
                    <button className="px-3 py-1.5 text-[10px] font-black text-slate-400">HISTORIC</button>
                  </div>
                </div>
                <UselessChart />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-indigo-600 to-blue-700 rounded-[2rem] p-8 text-white shadow-xl shadow-indigo-500/20 relative overflow-hidden group">
                  <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/10 rounded-full blur-3xl group-hover:scale-125 transition-transform duration-700" />
                  <h4 className="text-sm font-black uppercase tracking-widest mb-4 opacity-80">Alignment Goal</h4>
                  <div className="text-4xl font-black mb-2">99.8%</div>
                  <p className="text-xs font-medium opacity-60">Your current alignment with the corporate hive mind is nearly perfect.</p>
                  <button className="mt-8 flex items-center gap-2 text-xs font-black uppercase tracking-widest bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl transition-colors">
                    <RefreshCcw size={14} /> Re-align Soul
                  </button>
                </div>

                <div className="bg-white rounded-[2rem] p-8 border border-slate-200 shadow-sm flex flex-col justify-center items-center text-center">
                   <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center text-amber-600 mb-4">
                     <Zap size={32} />
                   </div>
                   <h4 className="text-sm font-black uppercase tracking-widest text-slate-900">Buzzword Density</h4>
                   <p className="text-xs text-slate-400 font-medium mt-2">Current environment is 42% buzzword compliant.</p>
                </div>
              </div>
            </div>

            {/* Side Column: Activity */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-slate-200 shadow-sm flex flex-col h-full">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-black text-slate-900 tracking-tight">Vapor Trail</h3>
                <span className="text-[10px] font-black bg-slate-100 px-3 py-1 rounded-full text-slate-500">REAL-TIME</span>
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
                      <div className="mt-1 w-2 h-2 rounded-full bg-indigo-500 group-hover:scale-150 transition-transform shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                      <div className="space-y-1">
                        <p className="text-xs font-black text-slate-900 uppercase tracking-tight">{activity.title}</p>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{activity.description}</p>
                        <p className="text-[10px] text-slate-400 font-bold">{activity.time}</p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              <button className="mt-10 w-full py-4 border-2 border-dashed border-slate-200 hover:border-indigo-400 hover:bg-indigo-50/50 rounded-2xl text-[10px] font-black text-slate-400 hover:text-indigo-600 transition-all uppercase tracking-widest">
                Load More Nothingness
              </button>
            </div>

          </section>
        </div>

        {/* Footer info */}
        <footer className="p-10 border-t border-slate-200 text-center">
           <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.5em]">
             SynergiFlow v4.2.0-alpha (Paradigm Stable)
           </p>
        </footer>

        {/* Annoying Popups Layer */}
        <AnimatePresence>
          {popups.map(popup => (
            <AnnoyingPopup key={popup.id} popup={popup} onClose={closePopup} />
          ))}
        </AnimatePresence>
      </main>
    </div>
  );
}
