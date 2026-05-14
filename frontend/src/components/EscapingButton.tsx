import React, { useEffect, useRef, useState } from 'react';
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
  const containerRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [isTired, setIsTired] = useState(false);
  const chaseStartedAt = useRef<number | null>(null);

  useEffect(() => {
    const center = () => {
      const container = containerRef.current;
      const button = buttonRef.current;
      if (!container || !button) return;

      const bounds = container.getBoundingClientRect();
      const buttonBounds = button.getBoundingClientRect();
      const maxX = Math.max(0, (bounds.width - buttonBounds.width) / 2 - 8);
      const maxY = Math.max(0, (bounds.height - buttonBounds.height) / 2 - 8);
      setPos({ x: clamp(0, -maxX, maxX), y: clamp(0, -maxY, maxY) });
    };

    center();
    window.addEventListener('resize', center);
    return () => window.removeEventListener('resize', center);
  }, []);

  const clamp = (value: number, min: number, max: number) => Math.max(min, Math.min(max, value));

  const keepInside = (x: number, y: number) => {
    const container = containerRef.current;
    const button = buttonRef.current;

    if (!container || !button) return { x, y };

    const bounds = container.getBoundingClientRect();
    const buttonBounds = button.getBoundingClientRect();
    const maxX = Math.max(0, (bounds.width - buttonBounds.width) / 2 - 8);
    const maxY = Math.max(0, (bounds.height - buttonBounds.height) / 2 - 8);

    return {
      x: clamp(x, -maxX, maxX),
      y: clamp(y, -maxY, maxY),
    };
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (isTired) return;

    const container = containerRef.current;
    if (!container) return;

    const now = Date.now();
    if (chaseStartedAt.current === null) chaseStartedAt.current = now;
    if (now - chaseStartedAt.current >= 5000) {
      setIsTired(true);
      return;
    }

    const bounds = container.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    const centerY = bounds.top + bounds.height / 2;
    const distance = Math.hypot(e.clientX - centerX, e.clientY - centerY);

    if (distance < 160) {
      const angle = Math.atan2(centerY - e.clientY, centerX - e.clientX) + (Math.random() - 0.5) * 0.9;
      const moveDist = 120 + Math.random() * 50;
      const next = keepInside(Math.cos(angle) * moveDist, Math.sin(angle) * moveDist);
      setPos(next);
    }
  };

  return (
    <div ref={containerRef} onMouseMove={handleMouseMove} className="fixed inset-0 z-50 pointer-events-auto">
      <motion.button
        ref={buttonRef}
        type={type}
        form={form}
        animate={{ x: pos.x, y: pos.y, scale: isValid ? 1.03 : 1 }}
        transition={{ type: "spring", stiffness: 320, damping: 24 }}
        className={cn(
          "px-10 py-4 rounded-2xl font-black uppercase tracking-widest text-lg shadow-2xl transition-colors duration-300",
          isTired ? 'bg-slate-500 hover:bg-slate-500 cursor-default' : isValid ? 'bg-indigo-600 hover:bg-indigo-500' : 'bg-slate-700 cursor-not-allowed',
          "text-white border-2 border-white/20 backdrop-blur-sm pointer-events-auto absolute left-1/2 top-1/2"
        )}
        disabled={!isValid}
      >
        {isTired ? 'Too tired' : children}
      </motion.button>
    </div>
  );
};
