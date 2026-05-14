import { useState, useEffect } from 'react';
import { AbsurdMetric, AbsurdActivity, PopupMessage } from '../types/dashboard';

export const useDashboardData = () => {
  const [metrics, setMetrics] = useState<AbsurdMetric[]>([
    { title: 'Puntaje de Sinergia', value: '94.2', unit: 'SYN', change: '+5.4%', trend: 'up' },
    { title: 'Velocidad de Alineación', value: '12.8', unit: 'm/s²', change: '-2.1%', trend: 'down' },
    { title: 'Quórum de Stakeholders', value: '0.004', unit: 'QRM', change: '+0.1%', trend: 'up' },
    { title: 'Pavor Existencial', value: '88', unit: 'DREAD', change: '+14%', trend: 'up' },
  ]);

  const [activities] = useState<AbsurdActivity[]>([
    { id: '1', title: 'Alineación de Paradigma', description: 'Se ha forzado una nueva visión sobre el equipo de diseño.', time: 'Hace 2 min', importance: 'high' },
    { id: '2', title: 'Evento de Sinergia Crítica', description: 'Niveles de café por debajo del umbral corporativo.', time: 'Hace 15 min', importance: 'high' },
    { id: '3', title: 'Actualización de Vaporware', description: 'El módulo "Felicidad del Cliente" ha sido renombrado a "Métrica de Retención".', time: 'Hace 1 hora', importance: 'nonsense' },
    { id: '4', title: 'Fuga de Optimismo', description: 'Se detectó un empleado sonriendo sin autorización previa.', time: 'Hace 3 horas', importance: 'low' },
  ]);

  const [popups, setPopups] = useState<PopupMessage[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (Math.random() > 0.7 && popups.length < 5) {
        const newPopup: PopupMessage = {
          id: Math.random().toString(),
          title: 'ALERTA DE CUMPLIMIENTO',
          content: '¿Has alineado tus chakras corporativos hoy? El no hacerlo puede resultar en una reducción de tu cuota de oxígeno.',
          type: 'urgent',
        };
        setPopups(prev => [...prev, newPopup]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [popups]);

  const closePopup = (id: string) => {
    setPopups(prev => prev.filter(p => p.id !== id));
  };

  return { metrics, activities, popups, closePopup };
};
