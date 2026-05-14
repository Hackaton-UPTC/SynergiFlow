import React, { useMemo, useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, LogIn, UserPlus, CheckCircle2, Loader2, Smile, Frown, Angry, Meh } from 'lucide-react';
import { EscapingButton } from './components/EscapingButton';
import Dashboard from './pages/Dashboard';
import './index.scss';

type AuthMode = 'login' | 'register';

export default function App() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [mode, setMode] = useState<AuthMode>('login');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [session, setSession] = useState<{ username: string; token: string } | null>(null);
  const [mood, setMood] = useState<string | null>(null);
  const [errorFlash, setErrorFlash] = useState(false);
  const [shakeKey, setShakeKey] = useState(0);

  const canSubmit = useMemo(() => username.trim().length >= 3 && password.length >= 6 && mood === 'Happy' && !loading, [username, password, mood, loading]);
  const moods = [
    { name: 'Happy', icon: <Smile className="w-8 h-8" />, color: 'bg-emerald-400' },
    { name: 'Sad', icon: <Frown className="w-8 h-8" />, color: 'bg-sky-400' },
    { name: 'Angry', icon: <Angry className="w-8 h-8" />, color: 'bg-rose-400' },
    { name: 'Neutral', icon: <Meh className="w-8 h-8" />, color: 'bg-amber-400' },
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSuccess('');

    if (!canSubmit) {
      setErrorFlash(true);
      setShakeKey((value) => value + 1);
      window.setTimeout(() => setErrorFlash(false), 700);
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post('http://localhost:3000/api/auth', {
        action: mode,
        username: username.trim(),
        password,
      });

      const payload = response.data?.data;

      if (mode === 'register') {
        const nextSession = { username: payload.user.username, token: payload.token };
        setSession(nextSession);
        localStorage.setItem('synergiflow.session', JSON.stringify(nextSession));
        setSuccess('Account created. Accessing the void...');
      } else {
        if (payload?.token && payload?.user?.username) {
          const nextSession = { username: payload.user.username, token: payload.token };
          setSession(nextSession);
          localStorage.setItem('synergiflow.session', JSON.stringify(nextSession));
        }
        setSuccess(`Welcome back, ${payload?.user?.username ?? username.trim()}.`);
      }
    } catch (err) {
      console.error("Auth Error:", err);
      setErrorFlash(true);
      setShakeKey((value) => value + 1);
      window.setTimeout(() => setErrorFlash(false), 700);
    } finally {
      setLoading(false);
    }
  };

  if (session) {
    return <Dashboard />;
  }

  return (
    <div className="min-h-screen w-full bg-bg-main text-text-main flex items-center justify-center p-6 font-sans selection:bg-primary/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-slow-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-synergy-blue/20 rounded-full blur-[120px] animate-slow-pulse" />
      </div>

      <motion.main
        key={shakeKey}
        initial={{ opacity: 0, y: 20 }}
        animate={errorFlash ? { opacity: 1, y: 0, x: [0, -12, 12, -10, 10, -6, 6, 0] } : { opacity: 1, y: 0, x: 0 }}
        transition={errorFlash ? { duration: 0.6 } : { duration: 0.25 }}
        className="max-w-md w-full relative z-10"
      >
        <div className={`backdrop-blur-2xl p-8 rounded-[2.5rem] border shadow-2xl transition-colors duration-300 ${errorFlash ? 'bg-chaos-red/20 border-chaos-red/60' : 'bg-bg-card border-border-soft'}`}>
          <header className="text-center mb-10">
            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="inline-flex p-3 rounded-2xl bg-enterprise-gradient mb-4 shadow-lg shadow-primary/20"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2 italic">SYNERGIFLOW</h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">High-Friction Auth Protocol</p>
          </header>

          <div className="grid grid-cols-2 gap-2 mb-6 p-1 rounded-2xl bg-black/20 border border-border-soft">
            <button
              type="button"
              onClick={() => setMode('login')}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-[0.3em] transition-colors ${mode === 'login' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-muted hover:text-text-main'}`}
            >
              <LogIn size={14} /> Login
            </button>
            <button
              type="button"
              onClick={() => setMode('register')}
              className={`flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-xs font-black uppercase tracking-[0.3em] transition-colors ${mode === 'register' ? 'bg-primary text-white shadow-md shadow-primary/20' : 'text-text-muted hover:text-text-main'}`}
            >
              <UserPlus size={14} /> Register
            </button>
          </div>

          <form id="auth-form" onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1 block mb-2 group-focus-within:text-primary transition-colors">Username</label>
                <input
                  type="text"
                  required
                  autoComplete="username"
                  className="w-full bg-black/20 border border-border-soft rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-text-disabled"
                  placeholder="alex"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              <div className="group relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1 block mb-2 group-focus-within:text-primary transition-colors">Password</label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                    className="w-full bg-black/20 border border-border-soft rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all pr-14 font-mono text-primary-light"
                    placeholder="123456"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-primary transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Mood check</label>
                  <p className="text-[11px] text-slate-400 italic">Select Happy to continue</p>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {moods.map((item) => (
                    <motion.button
                      key={item.name}
                      type="button"
                      whileHover={{ scale: 1.05, rotate: 3 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => setMood(item.name)}
                      className={`p-4 rounded-2xl border-2 transition-all flex flex-col items-center justify-center gap-2 relative overflow-hidden group ${
                        mood === item.name ? 'border-primary bg-primary/20 shadow-[0_0_20px_rgba(255,92,0,0.3)]' : 'border-border-soft bg-black/20 hover:border-text-muted'
                      }`}
                    >
                      <div className={`p-2 rounded-xl text-white transition-transform duration-500 group-hover:scale-110 ${item.color}`}>{item.icon}</div>
                    </motion.button>
                  ))}
                </div>
              </div>
            </div>

            <EscapingButton isValid={canSubmit} form="auth-form">
              {loading ? <span className="inline-flex items-center gap-2"><Loader2 className="h-4 w-4 animate-spin" /> Working</span> : mode === 'login' ? 'Login' : 'Register'}
            </EscapingButton>

            <AnimatePresence>
              {success && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden">
                  <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center gap-3 text-emerald-400 text-xs mt-4">
                    <CheckCircle2 size={18} className="shrink-0" />
                    <p className="leading-relaxed">{success}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          {session && (
            <div className="mt-6 p-4 rounded-2xl border border-slate-800 bg-slate-950/50 text-xs text-slate-400">
              Logged in as <span className="text-slate-200 font-semibold">{session.username}</span>
            </div>
          )}
        </div>

        <footer className="mt-8 text-center">
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.5em] font-medium">Minimal auth by SynergiFlow</p>
        </footer>
      </motion.main>
    </div>
  );
}
