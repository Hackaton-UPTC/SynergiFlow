import React from 'react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', synergy: 4000, dread: 2400, alignment: 2400 },
  { name: 'Tue', synergy: 3000, dread: 1398, alignment: 2210 },
  { name: 'Wed', synergy: 2000, dread: 9800, alignment: 2290 },
  { name: 'Thu', synergy: 2780, dread: 3908, alignment: 2000 },
  { name: 'Fri', synergy: 1890, dread: 4800, alignment: 2181 },
  { name: 'Sat', synergy: 2390, dread: 3800, alignment: 2500 },
  { name: 'Sun', synergy: 3490, dread: 4300, alignment: 2100 },
];

export const UselessChart: React.FC = () => {
  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="colorSyn" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-primary)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--color-primary)" stopOpacity={0}/>
            </linearGradient>
            <linearGradient id="colorDread" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="var(--color-error-red)" stopOpacity={0.8}/>
              <stop offset="95%" stopColor="var(--color-error-red)" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--color-border-soft)" />
          <XAxis 
            dataKey="name" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fontSize: 10, fill: 'var(--color-text-muted)' }} 
          />
          <YAxis hide />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--color-bg-main)', 
              borderRadius: '16px', 
              border: '1px solid var(--color-border-soft)', 
              boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.5)',
              color: 'var(--color-text-main)'
            }}
            itemStyle={{ color: 'var(--color-text-main)' }}
            labelStyle={{ fontWeight: 'bold', color: 'var(--color-primary)' }}
          />
          <Area type="monotone" dataKey="synergy" stroke="var(--color-primary)" fillOpacity={1} fill="url(#colorSyn)" strokeWidth={3} />
          <Area type="monotone" dataKey="dread" stroke="var(--color-error-red)" fillOpacity={1} fill="url(#colorDread)" strokeWidth={3} />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
