import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Eye, EyeOff, AlertTriangle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useBadValidation } from '../hooks/useBadValidation';
import { RequirementItem } from '../components/RequirementItem';
import { EmotionalCaptcha } from '../components/EmotionalCaptcha';
import { EscapingButton } from '../components/EscapingButton';
import '../index.scss';

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState<string | null>(null);
  const [error, setError] = useState('');
  
  const { checks, isValid: isPasswordValid } = useBadValidation(password);

  const isFormValid = username && 
    isPasswordValid && 
    captchaAnswer === 'Ennui';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid) {
      setError('The authentication spirits are displeased. Try again.');
      return;
    }
    // Simulation of backend call
    console.log("Authenticating:", { username, password });
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen w-full bg-bg-main text-text-main flex items-center justify-center p-6 font-sans selection:bg-primary/30">
      
      {/* Background Ambience */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px] animate-slow-pulse" />
        <div className="absolute -bottom-[10%] -right-[10%] w-[40%] h-[40%] bg-blue-900/20 rounded-full blur-[120px] animate-slow-pulse" />
      </div>

      <motion.main 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full relative z-10"
      >
        <div className="bg-bg-card backdrop-blur-2xl p-8 rounded-[2.5rem] border border-border-soft shadow-2xl">
          
          <header className="text-center mb-10">
            <motion.div 
              animate={{ y: [0, -5, 0] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="inline-flex p-3 rounded-2xl bg-enterprise-gradient mb-4 shadow-lg shadow-primary/20"
            >
              <Shield className="w-8 h-8 text-white" />
            </motion.div>
            <h1 className="text-4xl font-black tracking-tighter text-white mb-2 italic">
              SYNERGIFLOW
            </h1>
            <p className="text-[10px] font-bold uppercase tracking-[0.4em] text-text-muted">
              High-Friction Auth Protocol
            </p>
          </header>

          <form onSubmit={handleSubmit} className="space-y-8">
            <div className="space-y-6">
              {/* Username Input */}
              <div className="group">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 block mb-2 group-focus-within:text-indigo-400 transition-colors">
                  Identity Label
                </label>
                <input
                  type="text"
                  required
                  autoComplete="off"
                  className="w-full bg-black/20 border border-border-soft rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all placeholder:text-text-disabled"
                  placeholder="The_Chosen_One"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>

              {/* Password Input */}
              <div className="group relative">
                <label className="text-[10px] font-black uppercase tracking-widest text-slate-500 ml-1 block mb-2 group-focus-within:text-indigo-400 transition-colors">
                  Arcane Keyphrase
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    className="w-full bg-black/20 border border-border-soft rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-all pr-14 font-mono text-primary-light"
                    placeholder="••••••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button 
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-600 hover:text-indigo-400 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
              </div>

              {/* Requirements Grid */}
              <div className="bg-black/40 p-5 rounded-3xl border border-slate-800/50 backdrop-blur-md">
                <h2 className="text-[9px] font-black text-slate-600 uppercase tracking-widest mb-4 border-b border-slate-800/50 pb-2">
                  Validation Layer
                </h2>
                <div className="grid grid-cols-1 gap-3">
                  <RequirementItem met={checks.threeEmojis} text="3+ Spiritual Vessels (Emojis)" />
                  <RequirementItem met={checks.oneHieroglyph} text="1+ Ancient Whisper (Hieroglyphs)" />
                  <RequirementItem met={checks.onePrime} text="1+ Indivisible Truth (Prime Number)" />
                  <RequirementItem met={checks.oneLatin} text="1+ Dead Tongue Invocation (Latin Words)" />
                  <RequirementItem met={checks.noConsecutive} text="Zero Sibling Proximity (No Consecutive Letters)" />
                </div>
              </div>

              {/* Captcha */}
              <EmotionalCaptcha 
                selected={captchaAnswer} 
                onSelect={(val) => setCaptchaAnswer(val)} 
              />
            </div>

            <EscapingButton isValid={isFormValid}>
              Authenticate Soul
            </EscapingButton>

            <AnimatePresence>
              {error && (
                <motion.div 
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-3 text-red-400 text-xs mt-4">
                    <AlertTriangle size={18} className="shrink-0" />
                    <p className="leading-relaxed">{error}</p>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>

        <footer className="mt-8 text-center">
          <p className="text-[9px] text-slate-600 uppercase tracking-[0.5em] font-medium">
            Designed for discomfort by Antigravity
          </p>
        </footer>
      </motion.main>
    </div>
  );
}
