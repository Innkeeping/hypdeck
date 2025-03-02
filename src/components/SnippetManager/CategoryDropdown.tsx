import React from 'react';
import { ChevronDownIcon } from 'lucide-react';
import { CATEGORIES } from '../../store/categories';

interface CategoryDropdownProps {
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setSelectedTerminalId: (id: string | null) => void;
  filteredCategories: typeof CATEGORIES;
  snippetListRef: React.RefObject<HTMLDivElement>;
  snippetSearchRef: React.RefObject<HTMLInputElement>;
  onCategorySelect: (
    categoryId: string | null,
    snippetListRef: React.RefObject<HTMLDivElement>,
    snippetSearchRef: React.RefObject<HTMLInputElement>
  ) => void;
}

export const CategoryDropdown: React.FC<CategoryDropdownProps> = ({
  selectedCategory,
  isOpen,
  setIsOpen,
  setSelectedTerminalId,
  filteredCategories,
  snippetListRef,
  snippetSearchRef,
  onCategorySelect
}) => {
  const handleCategorySelect = (categoryId: string | null) => {
    onCategorySelect(categoryId, snippetListRef, snippetSearchRef);
    setSelectedTerminalId(null);
  };

  const selectedCategoryName = selectedCategory
    ? CATEGORIES.find(cat => cat.id === selectedCategory)?.name
    : 'All Categories';

  return (
    <div className="relative flex-1">
      <button
        type="button"
        className="w-full flex items-center justify-between bg-gray-800/50 text-gray-100 rounded-lg px-4 py-2.5
                   hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 border border-gray-700/50
                   transition-colors duration-200 ease-in-out"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center gap-2">
          <span className="font-medium text-sm truncate">{selectedCategoryName}</span>
          <span className="text-xs text-gray-400">
            ({filteredCategories.length} {filteredCategories.length === 1 ? 'category' : 'categories'})
          </span>
        </div>
        <ChevronDownIcon
          className={`w-4 h-4 text-gray-400 transform transition-transform duration-200 ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div className="absolute z-50 w-full mt-2 bg-gray-800 border border-gray-700/50 rounded-lg shadow-lg
                      max-h-[280px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-gray-800">
          <div className="py-1">
            <button
              className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                         hover:bg-gray-700/50 flex items-center justify-between gap-2
                         ${!selectedCategory ? 'bg-cyan-500/10 text-cyan-400' : 'text-gray-100'}`}
              onClick={() => handleCategorySelect(null)}
            >
              <span className="font-medium">All Categories</span>
              {!selectedCategory && (
                <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">
                  Selected
                </span>
              )}
            </button>

            {filteredCategories.map((category) => (
              <button
                key={category.id}
                className={`w-full text-left px-4 py-2.5 text-sm transition-colors duration-150
                           hover:bg-gray-700/50 flex items-center justify-between gap-2
                           ${selectedCategory === category.id
                             ? 'bg-cyan-500/10 text-cyan-400'
                             : 'text-gray-100'}`}
                onClick={() => handleCategorySelect(category.id)}
              >
                <div className="flex flex-col">
                  <span className="font-medium">{category.name}</span>
                  {category.tag && (
                    <span className="text-xs text-gray-400">Tag: {category.tag}</span>
                  )}
                </div>
                {selectedCategory === category.id && (
                  <span className="text-xs bg-cyan-500/20 text-cyan-400 px-2 py-0.5 rounded">
                    Selected
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};