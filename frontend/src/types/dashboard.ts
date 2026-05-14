import React from 'react';

export interface AbsurdMetric {
  title: string;
  value: string | number;
  change: string;
  trend: 'up' | 'down' | 'chaotic';
  unit?: string;
}

export interface AbsurdActivity {
  id: string;
  title: string;
  description: string;
  time: string;
  importance: 'high' | 'low' | 'nonsense';
}

export interface PopupMessage {
  id: string;
  title: string;
  content: string;
  type: 'annoying' | 'urgent' | 'meaningless';
}
