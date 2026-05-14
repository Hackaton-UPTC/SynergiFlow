import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: any[]) {
  return twMerge(clsx(inputs));
}

interface EscapingButtonProps {
  children: React.ReactNode;
  isValid: boolean;
  type?: "button" | "submit" | "reset";
  form?: string;
}

export const EscapingButton: React.FC<EscapingButtonProps> = ({ children, isValid, type = "submit", form }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('bg-indigo-600');
  const [isFixed, setIsFixed] = useState(false);
  const [isExhausted, setIsExhausted] = useState(false);
  const [timer, setTimer] = useState(5);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Effect to handle exhaustion timer once it starts escaping
  useEffect(() => {
    if (isFixed && !isExhausted) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            setIsExhausted(true);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [isFixed, isExhausted]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || isExhausted) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) +
      Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 200) {
      if (!isFixed) setIsFixed(true);

      const padding = 100;
      const targetX = Math.random() * (window.innerWidth - padding * 2) + padding;
      const targetY = Math.random() * (window.innerHeight - padding * 2) + padding;

      setPos({ 
        x: targetX - window.innerWidth / 2, 
        y: targetY - window.innerHeight / 2 
      });
      
      const colors = ['bg-red-500', 'bg-emerald-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-sky-500'];
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  };

  return (
    <div 
      className="relative h-32 flex items-center justify-center w-full"
      onMouseMove={handleMouseMove}
    >
      <div className="fixed inset-0 z-[-1]" onMouseMove={handleMouseMove} />
      
      <motion.button
        ref={buttonRef}
        type={type}
        form={form}
        animate={{ 
          x: pos.x, 
          y: pos.y,
          scale: isExhausted ? 0.95 : (isValid ? 1.1 : 1),
          rotate: isExhausted ? 0 : pos.x / 10,
          opacity: isExhausted ? 0.8 : 1
        }}
        transition={{ type: "spring", stiffness: isExhausted ? 50 : 600, damping: 20 }}
        className={cn(
          "px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl transition-colors duration-500 z-[9999] border-4 border-white/20",
          isExhausted ? "bg-slate-700 cursor-pointer" : color,
          "text-white whitespace-nowrap",
          isFixed && "fixed"
        )}
      >
        <div className="flex flex-col items-center">
          <span>{isExhausted ? "Fine... Click me" : children}</span>
          {isFixed && !isExhausted && (
            <span className="text-[10px] opacity-60 mt-1 italic animate-pulse">
              Escaping energy: {timer}s
            </span>
          )}
          {isExhausted && (
            <span className="text-[10px] opacity-60 mt-1 italic">
              Exhausted... (Sigh)
            </span>
          )}
        </div>
      </motion.button>
    </div>
  );
};
