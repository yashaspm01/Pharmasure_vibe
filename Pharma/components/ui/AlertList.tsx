import React from 'react';
import type { Medication } from '../../types';
import { formatDate } from '../../utils/helpers';

interface AlertListProps {
  title: string;
  icon: React.ReactNode;
  count: number;
  meds: Medication[];
}

const AlertList: React.FC<AlertListProps> = ({ title, icon, count, meds }) => {
  return (
    <div className="bg-white p-4 rounded-xl border border-gray-200 shadow-sm">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          {icon}
          <h4 className="text-lg font-semibold text-gray-800">{title}</h4>
        </div>
        <span className="text-sm font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">{count} items</span>
      </div>
      {meds.length > 0 ? (
        <div className="max-h-64 overflow-y-auto pr-2">
            <ul className="space-y-2">
                {meds.map(med => (
                    <li key={med.id} className="text-sm text-gray-600 flex justify-between items-center p-2 rounded-md hover:bg-gray-50">
                        <div>
                            <p className="font-semibold text-gray-800">{med.name}</p>
                            <p className="text-xs text-gray-500">Expires: {formatDate(med.expiryDate)}</p>
                        </div>
                        <span className="font-medium">{med.stock} pcs</span>
                    </li>
                ))}
            </ul>
        </div>
       ) : (
        <p className="text-sm text-gray-500 text-center py-4">Nothing to show here.</p>
       )}
    </div>
  );
};

export default AlertList;