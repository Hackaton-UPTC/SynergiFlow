import { useEffect } from 'react';
import { motion } from 'framer-motion';

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  useEffect(() => {
    const timer = window.setTimeout(onComplete, 2500);
    return () => window.clearTimeout(timer);
  }, [onComplete]);

  return (
    <div className="min-h-screen w-full flex flex-col items-center justify-center bg-bg-main text-white overflow-hidden relative">
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 text-center space-y-6"
      >
        <div className="inline-block px-4 py-1.5 bg-primary/20 border border-primary/30 rounded-full text-primary text-[10px] font-black uppercase tracking-[0.3em]">
          Iniciando Fase 2
        </div>

        <h2 className="text-5xl font-black tracking-tighter italic">
          PREPÁRATE PARA LA <br />
          <span className="text-primary">SINERGIA TOTAL</span>
        </h2>

        <p className="text-text-muted text-sm font-medium tracking-widest uppercase opacity-60">
          Validando protocolos de fricción empresarial...
        </p>

        <div className="flex justify-center gap-1 mt-8">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              animate={{ opacity: [0.3, 1, 0.3] }}
              transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.2 }}
              className="w-2 h-2 bg-primary rounded-full"
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
