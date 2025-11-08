
import React from 'react';

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  iconBg: string;
  iconColor: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, icon, iconBg, iconColor }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm flex flex-col justify-between">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-500">{title}</span>
        <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${iconBg} ${iconColor}`}>
          {icon}
        </div>
      </div>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
};

export default MetricCard;
