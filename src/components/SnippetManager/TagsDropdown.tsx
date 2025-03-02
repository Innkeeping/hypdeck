import React from 'react';
import { Tag, ChevronDown, Check, X } from 'lucide-react';

interface TagsDropdownProps {
  selectedTags: string[];
  allTags: string[];
  toggleTag: (tag: string) => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const TagsDropdown: React.FC<TagsDropdownProps> = ({
  selectedTags,
  allTags,
  toggleTag,
  isOpen,
  setIsOpen,
}) => (
  <div className="flex gap-4">
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent flex items-center space-x-2 min-w-[200px]"
      >
        <Tag size={16} />
        <span>Select Tags ({selectedTags.length})</span>
        <ChevronDown
          size={16}
          className={`ml-2 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        />
      </button>

      {isOpen && (
        <>
          <div className="absolute top-full mt-1 w-64 bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50 max-h-[300px] overflow-y-auto">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center justify-between"
              >
                <span className={`${selectedTags.includes(tag) ? 'text-cyan-400' : 'text-gray-300'}`}>
                  {tag}
                </span>
                {selectedTags.includes(tag) && (
                  <div className="text-cyan-400">
                    <Check size={16} />
                  </div>
                )}
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

    {/* Selected Tags Display */}
    <div className="flex flex-wrap gap-2 flex-1">
      {selectedTags.map(tag => (
        <span
          key={tag}
          className="px-2 py-1 rounded-full bg-cyan-500/10 text-cyan-400 text-xs font-mono flex items-center gap-1"
        >
          {tag}
          <button
            onClick={() => toggleTag(tag)}
            className="hover:text-white"
          >
            <X size={12} />
          </button>
        </span>
      ))}
    </div>
  </div>
);