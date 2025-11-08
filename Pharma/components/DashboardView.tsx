import React, { useMemo, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import type { Medication } from '../types';
import { getStatus } from '../utils/helpers';
import { MedicineBoxIcon, ExclamationIcon, WarningTriangleIcon, DollarSignIcon } from './Icons';
import MetricCard from './ui/MetricCard';
import AlertList from './ui/AlertList';

// MOCK DATA for charts - in a real app this would be generated from historical data
const generateTrendData = (meds: Medication[]) => {
    // This is a simplified mock. A real implementation would process historical snapshots.
    return {
        'Last 7 Days': Array.from({ length: 7 }, (_, i) => ({ name: `Day ${i + 1}`, 'Expiring Soon': Math.floor(Math.random() * 10), 'Expired': Math.floor(Math.random() * 5) })),
        'Month': Array.from({ length: 4 }, (_, i) => ({ name: `Week ${i + 1}`, 'Expiring Soon': Math.floor(Math.random() * 50), 'Expired': Math.floor(Math.random() * 20) })),
        'Quarter': Array.from({ length: 3 }, (_, i) => ({ name: ['Jan', 'Feb', 'Mar'][i], 'Expiring Soon': Math.floor(Math.random() * 150), 'Expired': Math.floor(Math.random() * 50) })),
        'Year': Array.from({ length: 4 }, (_, i) => ({ name: `Q${i + 1}`, 'Expiring Soon': Math.floor(Math.random() * 400), 'Expired': Math.floor(Math.random() * 150) })),
    };
};
const stockCategoryData = [
  { name: 'Antibiotics', value: 25, color: '#3b82f6' },
  { name: 'Pain Relief', value: 20, color: '#8b5cf6' },
  { name: 'Vitamins', value: 18, color: '#10b981' },
  { name: 'Heart Meds', value: 15, color: '#f59e0b' },
  { name: 'Diabetes', value: 12, color: '#ef4444' },
  { name: 'Others', value: 10, color: '#6b7280' },
];

const DashboardView: React.FC<{ meds: Medication[] }> = ({ meds }) => {
    const [activeTrend, setActiveTrend] = useState('Month');
    const allTrendData = useMemo(() => generateTrendData(meds), [meds]);

    const analysisData = useMemo(() => {
        const expired = meds.filter(m => getStatus(m.expiryDate).text === 'Expired');
        const expiringSoon = meds.filter(m => getStatus(m.expiryDate).text === 'Expiring soon');
        const totalValue = meds.reduce((acc, med) => {
            // Mock price calculation for demonstration
            const mockPrice = (med.name.length % 5) * 10 + 50; // Price between 50-90
            return acc + (med.stock * mockPrice);
        }, 0);

        return {
            totalMeds: meds.length,
            expiredCount: expired.length,
            expiringSoonCount: expiringSoon.length,
            totalValue,
            expiredMeds: expired.sort((a,b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()),
            expiringSoonMeds: expiringSoon.sort((a,b) => new Date(a.expiryDate).getTime() - new Date(b.expiryDate).getTime()),
        };
    }, [meds]);

    if (meds.length === 0) {
        return <div className="p-4 text-center text-gray-500 flex items-center justify-center h-full">Loading dashboard data...</div>;
    }

    return (
        <>
            <header className="h-28 border-b border-gray-200 sticky top-0 bg-white z-10 flex items-center p-4">
                <h1 className="text-2xl font-bold text-gray-900">Reports & Analytics</h1>
            </header>
            <main className="flex-grow overflow-y-auto pb-20 bg-gray-50">
                <div className="p-4 space-y-6">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-4">Key Metrics</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <MetricCard title="Total Medicines" value={analysisData.totalMeds} icon={<MedicineBoxIcon />} iconBg="bg-blue-100" iconColor="text-blue-600" />
                            <MetricCard title="Expired" value={analysisData.expiredCount} icon={<ExclamationIcon />} iconBg="bg-red-100" iconColor="text-red-600" />
                            <MetricCard title="Expiring Soon" value={analysisData.expiringSoonCount} icon={<WarningTriangleIcon />} iconBg="bg-orange-100" iconColor="text-orange-600" />
                            <MetricCard title="Total Value" value={`₹${analysisData.totalValue.toLocaleString('en-IN')}`} icon={<DollarSignIcon />} iconBg="bg-green-100" iconColor="text-green-600" />
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
                        <h3 className="font-bold mb-4 text-lg text-gray-700">Expiry Trends</h3>
                        <div className="flex space-x-2 overflow-x-auto scrollbar-hide mb-4">
                            {['Last 7 Days', 'Month', 'Quarter', 'Year'].map(filter => (
                                <button key={filter} onClick={() => setActiveTrend(filter)} className={`px-4 py-2 text-sm font-medium rounded-full transition-colors whitespace-nowrap ${activeTrend === filter ? 'bg-blue-600 text-white shadow' : 'bg-white text-gray-700 border border-gray-200 hover:bg-gray-100'}`}>{filter}</button>
                            ))}
                        </div>
                        <div style={{ width: '100%', height: 250 }}>
                            <ResponsiveContainer>
                                <BarChart data={allTrendData[activeTrend]} margin={{ top: 5, right: 0, left: -20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                                    <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                    <YAxis tick={{ fontSize: 12, fill: '#6b7280' }} axisLine={false} tickLine={false} />
                                    <Tooltip contentStyle={{ backgroundColor: '#ffffff', border: '1px solid #e5e7eb', borderRadius: '0.5rem' }} />
                                    <Legend iconType="circle" wrapperStyle={{ fontSize: '14px', paddingTop: '10px' }} />
                                    <Bar dataKey="Expiring Soon" fill="#f97316" radius={[4, 4, 0, 0]} barSize={15} />
                                    <Bar dataKey="Expired" fill="#ef4444" radius={[4, 4, 0, 0]} barSize={15} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    
                    <div className="space-y-4">
                        <AlertList title="Recently Expired" icon={<ExclamationIcon />} count={analysisData.expiredCount} meds={analysisData.expiredMeds} />
                        <AlertList title="Nearing Expiry" icon={<WarningTriangleIcon />} count={analysisData.expiringSoonCount} meds={analysisData.expiringSoonMeds} />
                    </div>
                </div>
            </main>
        </>
    );
};

export default DashboardView;