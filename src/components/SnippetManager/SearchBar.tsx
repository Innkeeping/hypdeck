import React, { forwardRef } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onClear?: () => void;
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ searchTerm, setSearchTerm, placeholder = 'Search...', className = '', onKeyDown, onClear }, ref) => {
    return (
      <div className={`relative flex-1 ${className}`}>
        <div className="relative">
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none"
            aria-hidden="true"
          />

          <input
            ref={ref}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            className="w-full bg-gray-800/50 text-gray-100 placeholder-gray-400 rounded-lg
                     pl-9 pr-8 py-2.5 border border-gray-700/50
                     focus:outline-none focus:ring-2 focus:ring-cyan-500/50
                     transition-colors duration-200 ease-in-out"
          />

          {searchTerm && (
            <button
              type="button"
              onClick={() => {
                setSearchTerm('');
                onClear?.();
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 p-1
                       text-gray-400 hover:text-gray-300
                       focus:outline-none focus:ring-2 focus:ring-cyan-500/50 rounded-full
                       transition-colors duration-200 ease-in-out"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';