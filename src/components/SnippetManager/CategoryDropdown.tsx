import React from 'react';
import { ChevronDown } from 'lucide-react';
import { CATEGORIES } from '../../store/categories';

interface CategoryDropdownProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedTerminalId: (id: string | null) => void; // Add this prop
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  setSelectedCategory,
  isOpen,
  setIsOpen,
  setSelectedTerminalId,  // Add this prop
}) => (
  <div className="relative">
    <button
      onClick={() => setIsOpen(!isOpen)}
      className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent flex items-center space-x-2 min-w-[200px]"
    >
      <span>{selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Select Category'}</span>
      <ChevronDown size={16} className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
    </button>

    {isOpen && (
      <>
        <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
          <button
            onClick={() => {
              setSelectedCategory(null);
              setIsOpen(false);
              setSelectedTerminalId(null); // Clear terminal selection
            }}
            className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
          >
            All Categories
          </button>
          {CATEGORIES.map(category => (
            <button
              key={category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setIsOpen(false);
                setSelectedTerminalId(null); // Clear terminal selection
              }}
              className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {category.name}
            </button>
          ))}
        </div>
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      </>
    )}
  </div>
);