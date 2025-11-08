'use client';
import { Bar, BarChart, XAxis, YAxis, ResponsiveContainer, RadialBar, RadialBarChart, Tooltip, CartesianGrid } from 'recharts';
import { weeklyAdherence, adherenceStats } from '@/lib/data';

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
          <p className="font-bold text-foreground">{`${label}`}</p>
          <p className="text-sm text-primary">{`Doses: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };

export function WeeklyAdherenceChart() {
  return (
    <div className="w-full h-32">
        <ResponsiveContainer>
        <BarChart data={weeklyAdherence} margin={{ top: 5, right: 10, left: 10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="hsl(var(--border) / 0.5)" />
            <XAxis dataKey="day" tick={{ fontSize: 12 }} tickLine={false} axisLine={false} />
            <YAxis hide={true} domain={[0, 6]} />
            <Tooltip content={<CustomTooltip />} cursor={{fill: 'hsl(var(--accent) / 0.3)'}} />
            <Bar dataKey="doses" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} />
        </BarChart>
        </ResponsiveContainer>
    </div>
  );
}

export function AdherenceRadialChart() {
    return (
        <div className="w-full h-32">
            <ResponsiveContainer>
                 <RadialBarChart 
                    innerRadius="80%" 
                    outerRadius="90%" 
                    data={[{ name: 'Adherence', value: adherenceStats.percentage, fill: 'hsl(var(--primary))' }]}
                    startAngle={90}
                    endAngle={-270}
                >
                    <Tooltip cursor={{
                        stroke: 'hsl(var(--accent))',
                        strokeWidth: 2,
                        fill: 'transparent'
                    }} content={({ active, payload }) => {
                        if (active && payload && payload.length) {
                            return (
                                <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
                                  <p className="text-sm text-primary">{`Weekly Adherence: ${payload[0].value}%`}</p>
                                </div>
                              );
                        }
                        return null;
                    }} />
                    <RadialBar
                        background
                        dataKey='value'
                        cornerRadius={10}
                    />
                    <text 
                        x="50%" 
                        y="50%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        className="fill-foreground text-2xl font-bold"
                    >
                        {adherenceStats.percentage}%
                    </text>
                     <text 
                        x="50%" 
                        y="65%" 
                        textAnchor="middle" 
                        dominantBaseline="middle" 
                        className="fill-muted-foreground text-xs"
                    >
                        This Week
                    </text>
                </RadialBarChart>
            </ResponsiveContainer>
        </div>
    )
}
