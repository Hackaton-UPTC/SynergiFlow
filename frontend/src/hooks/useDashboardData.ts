import { useState, useEffect } from 'react';
import { AbsurdMetric, AbsurdActivity, PopupMessage } from '../types/dashboard';

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<AbsurdMetric[]>([
    { title: 'Synergy Score', value: '84.2', change: '+12.5%', trend: 'up', unit: 'Pts' },
    { title: 'Alignment Velocity', value: '0.0042', change: '-2%', trend: 'down', unit: 'm/s²' },
    { title: 'Stakeholder Happiness', value: 'Cloudy', change: '±0', trend: 'chaotic' },
    { title: 'Corporate Buzzwords/min', value: '148', change: '+45%', trend: 'up' },
  ]);

  const [activities, setActivities] = useState<AbsurdActivity[]>([
    { id: '1', title: 'Paradigm Shift Detected', description: 'Someone used the word "leveraging" twice in a row.', time: '2m ago', importance: 'high' },
    { id: '2', title: 'Synergy Leak', description: 'Minor synergy loss in the coffee machine area.', time: '15m ago', importance: 'nonsense' },
    { id: '3', title: 'Cloud Vaporization', description: 'A server turned into a metaphorical cloud.', time: '1h ago', importance: 'low' },
  ]);

  const [popups, setPopups] = useState<PopupMessage[]>([]);

  // Randomly update metrics to look "busy"
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(m => ({
        ...m,
        value: typeof m.value === 'number' ? (parseFloat(m.value as any) + (Math.random() - 0.5)).toFixed(2) : m.value
      })));
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Randomly trigger annoying popups
  useEffect(() => {
    const triggerPopup = () => {
      const messages = [
        "Your alignment is decreasing! Click to fix.",
        "A stakeholder is looking at you. Smile!",
        "Warning: Too much productivity detected.",
        "Update available for your corporate soul."
      ];
      const newPopup = {
        id: Math.random().toString(),
        title: "CRITICAL ALERT",
        content: messages[Math.floor(Math.random() * messages.length)],
        type: 'annoying' as const
      };
      setPopups(prev => [...prev, newPopup]);
      
      // Schedule next one
      setTimeout(triggerPopup, Math.random() * 15000 + 10000);
    };

    const timer = setTimeout(triggerPopup, 5000);
    return () => clearTimeout(timer);
  }, []);

  const closePopup = (id: string) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return { metrics, activities, popups, closePopup };
};
