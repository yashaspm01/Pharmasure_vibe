import React, { useState, useMemo, useRef } from 'react';
import type { Medication } from '@/lib/pharma/types';
import { getStatus } from '@/lib/pharma/helpers';
import { SearchIcon } from './Icons';

const HEADER_HEIGHT_PX = 112;
const FILTER_BAR_HEIGHT_PX = 53;
const ALPHABET_BAR_HEIGHT_PX = 48;
const TOTAL_STICKY_HEIGHT = HEADER_HEIGHT_PX + FILTER_BAR_HEIGHT_PX + ALPHABET_BAR_HEIGHT_PX;

interface InventoryViewProps {
  meds: Medication[];
  onOpenDetailSheet: (med: Medication) => void;
  onLoadSampleData?: () => void;
}

const InventoryView: React.FC<InventoryViewProps> = ({ meds, onOpenDetailSheet, onLoadSampleData }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('All drugs');
  const groupRefs = useRef<Record<string, HTMLHeadingElement | null>>({});

  const filteredMeds = useMemo(() => {
    return meds
      .filter(med => activeFilter === 'All drugs' || getStatus(med.expiryDate).text === activeFilter)
      .filter(med => med.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [meds, activeFilter, searchTerm]);

  const groupedMeds = useMemo(() => {
    const sortedMeds = [...filteredMeds].sort((a, b) => a.name.localeCompare(b.name));
    return sortedMeds.reduce((acc, med) => {
      let firstChar = med.name[0].toUpperCase();
      if (!isNaN(parseInt(firstChar))) firstChar = '#';
      if (!acc[firstChar]) acc[firstChar] = [];
      acc[firstChar].push(med);
      return acc;
    }, {} as { [key: string]: Medication[] });
  }, [filteredMeds]);

  const alphabet = useMemo(() => ['#', ...Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i))], []);
  
  const sortedGroupKeys = Object.keys(groupedMeds).sort((a, b) => {
      if (a === '#') return -1;
      if (b === '#') return 1;
      return a.localeCompare(b);
  });

  const handleJumpTo = (letter: string) => {
    groupRefs.current[letter]?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <header className="h-28 border-b border-gray-200 sticky top-0 bg-white z-20 flex flex-col justify-center">
        <div className="p-4">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Pharmasure</h1>
            <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400"><SearchIcon /></span>
                <input
                    type="text"
                    placeholder="Search for Drug..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full bg-gray-100 border border-gray-300 rounded-lg py-2 pl-10 pr-4 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </div>
      </header>

      <div className="px-4 py-3 flex space-x-2 border-b border-gray-200 sticky bg-white z-20 overflow-x-auto scrollbar-hide" style={{ top: `${HEADER_HEIGHT_PX}px` }}>
        {['All drugs', 'Expired', 'Expiring soon', 'Safe'].map(filter => (
          <button
            key={filter}
            onClick={() => setActiveFilter(filter)}
            className={`px-3 py-1 text-sm rounded-full transition-colors whitespace-nowrap ${activeFilter === filter ? 'bg-blue-600 text-white shadow' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
          >
            {filter}
          </button>
        ))}
      </div>
      
      <div className="sticky bg-white z-20 border-b border-gray-200" style={{ top: `${HEADER_HEIGHT_PX + FILTER_BAR_HEIGHT_PX}px` }}>
        <div className="flex justify-between items-center px-2 py-2 overflow-x-auto scrollbar-hide">
          {alphabet.map(letter => (
            <button key={letter} onClick={() => handleJumpTo(letter)} className="px-2.5 py-1 text-sm font-semibold text-gray-500 hover:text-blue-600 rounded disabled:opacity-30 disabled:hover:text-gray-500" disabled={!groupedMeds[letter]}>
              {letter}
            </button>
          ))}
        </div>
      </div>


      <main className="flex-grow overflow-y-auto" style={{ paddingTop: `${TOTAL_STICKY_HEIGHT}px`, marginTop: `-${TOTAL_STICKY_HEIGHT}px` }}>
        <div className="px-4 pb-20">
            {meds.length === 0 && activeFilter === 'All drugs' && !searchTerm ? (
                <div className="text-center mt-16 px-4">
                    <div className="max-w-sm mx-auto">
                        <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                        </svg>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">Your Inventory is Empty</h3>
                        <p className="text-gray-500 mb-6">Start adding medications using the + button below, or load sample data to explore the app.</p>
                        {onLoadSampleData && (
                            <button 
                                onClick={onLoadSampleData}
                                className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <svg className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                                </svg>
                                Load Sample Data
                            </button>
                        )}
                    </div>
                </div>
            ) : sortedGroupKeys.length === 0 ? (
                <div className="text-center text-gray-500 mt-10"><p>No medications match your criteria.</p></div>
            ) : (
                sortedGroupKeys.map(group => (
                    <div key={group} className="mb-4">
                        <h2 ref={el => { groupRefs.current[group] = el; }} className="text-sm font-bold text-gray-400 mb-2 border-b border-gray-200 pb-1 pt-4 sticky bg-white z-10" style={{top: 0}}>{group}</h2>
                        <ul>
                            {groupedMeds[group].map(med => {
                                const status = getStatus(med.expiryDate);
                                return (
                                    <li
                                        key={med.id}
                                        onClick={() => onOpenDetailSheet(med)}
                                        className="flex justify-between items-center py-2.5 cursor-pointer hover:bg-gray-100 rounded-md px-2"
                                    >
                                        <span className="font-medium">{med.name}</span>
                                        <span className={`text-sm font-semibold ${status.color}`}>{status.text}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                ))
            )}
        </div>
      </main>
    </>
  );
};

export default InventoryView;
