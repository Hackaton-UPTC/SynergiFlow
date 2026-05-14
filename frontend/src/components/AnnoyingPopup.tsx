import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, AlertTriangle, Bell } from 'lucide-react';
import { PopupMessage } from '../types/dashboard';

interface AnnoyingPopupProps {
  popup: PopupMessage;
  onClose: (id: string) => void;
}

export const AnnoyingPopup: React.FC<AnnoyingPopupProps> = ({ popup, onClose }) => {
  return (
    <motion.div
      initial={{ scale: 0, x: (Math.random() - 0.5) * 500, y: (Math.random() - 0.5) * 500 }}
      animate={{ scale: 1, x: 0, y: 0 }}
      exit={{ scale: 0, opacity: 0 }}
      className="fixed z-[100] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 bg-slate-900 text-white rounded-3xl p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] border border-slate-700 backdrop-blur-xl"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="p-2 bg-amber-500 rounded-xl text-slate-900">
          <AlertTriangle size={20} />
        </div>
        <button 
          onClick={() => onClose(popup.id)}
          className="p-1 hover:bg-slate-800 rounded-lg transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      <h4 className="text-sm font-black uppercase tracking-widest mb-2">{popup.title}</h4>
      <p className="text-xs text-slate-400 leading-relaxed mb-6">
        {popup.content}
      </p>

      <button
        onClick={() => onClose(popup.id)}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 rounded-xl font-bold text-xs transition-all active:scale-95"
      >
        I ACKNOWLEDGE THE VOID
      </button>
    </motion.div>
  );
};
