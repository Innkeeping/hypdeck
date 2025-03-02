import React, { forwardRef } from 'react';
import { SearchIcon } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  placeholder?: string;
  className?: string;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void; // Added onKeyDown prop
}

export const SearchBar = forwardRef<HTMLInputElement, SearchBarProps>(
  ({ searchTerm, setSearchTerm, placeholder = 'Search...', className = '', onKeyDown }, ref) => {
    return (
      <div className={`relative ${className}`}>
        <input
          ref={ref}
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={onKeyDown} // Added onKeyDown handler
          placeholder={placeholder}
          className="w-full bg-gray-800 text-gray-100 placeholder-gray-400 rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-cyan-500/50"
        />
        <SearchIcon className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
      </div>
    );
  }
);

SearchBar.displayName = 'SearchBar';