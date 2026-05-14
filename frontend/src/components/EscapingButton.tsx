import React, { useState, useRef } from 'react';
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
}

export const EscapingButton: React.FC<EscapingButtonProps> = ({ children, isValid, type = "submit" }) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [color, setColor] = useState('bg-indigo-600');
  const buttonRef = useRef<HTMLButtonElement>(null);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current) return;
    
    const rect = buttonRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const distance = Math.sqrt(
      Math.pow(e.clientX - centerX, 2) +
      Math.pow(e.clientY - centerY, 2)
    );

    if (distance < 120) {
      const angle = Math.random() * Math.PI * 2;
      const moveDist = 180;
      setPos(prev => ({
        x: prev.x + Math.cos(angle) * moveDist,
        y: prev.y + Math.sin(angle) * moveDist,
      }));
      
      const colors = ['bg-red-500', 'bg-emerald-500', 'bg-violet-500', 'bg-fuchsia-500', 'bg-amber-500', 'bg-sky-500'];
      setColor(colors[Math.floor(Math.random() * colors.length)]);
    }
  };

  return (
    <div 
      className="relative h-32 flex items-center justify-center w-full"
      onMouseMove={handleMouseMove}
    >
      <motion.button
        ref={buttonRef}
        type={type}
        animate={{ 
          x: pos.x, 
          y: pos.y,
          scale: isValid ? 1.05 : 1,
          rotate: pos.x / 10
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
        className={cn(
          "px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl transition-colors duration-700",
          color,
          "text-white border-2 border-white/20 backdrop-blur-sm"
        )}
      >
        {children}
      </motion.button>
    </div>
  );
};
