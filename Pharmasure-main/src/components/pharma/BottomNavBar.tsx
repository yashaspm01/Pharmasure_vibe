
import React from 'react';
import type { ViewType } from '@/lib/pharma/types';
import { InventoryIcon, DashboardIcon, PlusIcon } from './Icons';

interface BottomNavBarProps {
  activeView: ViewType;
  onNavigate: (view: ViewType) => void;
  onAdd: () => void;
}

const BottomNavBar: React.FC<BottomNavBarProps> = ({ activeView, onNavigate, onAdd }) => {
  const navButtonClass = (viewName: ViewType) =>
    `flex flex-col items-center justify-center flex-1 p-2 rounded-lg transition-colors ${
      activeView === viewName ? 'text-blue-600' : 'text-gray-500 hover:text-gray-800'
    }`;

  return (
    <nav className="fixed bottom-0 left-0 right-0 w-full max-w-md mx-auto h-16 bg-white border-t border-gray-200 flex justify-around items-center z-30">
      <button onClick={() => onNavigate('inventory')} className={navButtonClass('inventory')}>
        <InventoryIcon />
        <span className="text-xs font-medium mt-1">Inventory</span>
      </button>
      
      <button onClick={onAdd} className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center -mt-8 shadow-lg hover:bg-blue-700 transition-all transform hover:scale-110 active:scale-100">
        <PlusIcon />
      </button>

      <button onClick={() => onNavigate('dashboard')} className={navButtonClass('dashboard')}>
        <DashboardIcon />
        <span className="text-xs font-medium mt-1">Dashboard</span>
      </button>
    </nav>
  );
};

export default BottomNavBar;
