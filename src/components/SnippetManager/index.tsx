import React, { useRef } from 'react';
import { Header } from './Header';
import { SearchBar } from './SearchBar';
import { CategoryDropdown } from './CategoryDropdown';
import { TagsDropdown } from './TagsDropdown';
import { TerminalIndicator } from './TerminalIndicator';
import { SnippetItem } from './SnippetItem';
import { ActionDialog } from './ActionDialog';
import { Notification } from './Notification';
import { useSnippetManager } from './useSnippetManager';
import type { SnippetManagerProps } from './types';

const SnippetManager: React.FC<SnippetManagerProps> = ({ onClose }) => {
  const snippetListRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);
  const snippetSearchRef = useRef<HTMLInputElement>(null);
  const categorySearchRef = useRef<HTMLInputElement>(null);

  const {
    searchTerm,
    setSearchTerm,
    categorySearchTerm,
    setCategorySearchTerm,
    selectedTags,
    selectedCategory,
    setSelectedCategory,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    allTags,
    toggleTag,
    filteredSnippets,
    filteredCategories,
    availableEditors,
    openDropdownId,
    setOpenDropdownId,
    selectedTerminalId,
    setSelectedTerminalId,
    showActionDialog,
    setShowActionDialog,
    notification,
    handleCopyCode,
    handleSendToTerminal,
    handleAddToExisting,
    handleReplace,
    isConfigureSnippet,
  } = useSnippetManager();

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, direction: 'up' | 'down') => {
    if (e.key === 'ArrowUp' && direction === 'up') {
      e.preventDefault();
      categorySearchRef.current?.focus();
    } else if (e.key === 'ArrowDown' && direction === 'down') {
      e.preventDefault();
      snippetSearchRef.current?.focus();
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div ref={modalRef} className="bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <Header onClose={onClose} />

        <div className="p-4 border-b border-gray-700">
          <div className="flex gap-4">
            {/* Left side - Filters */}
            <div className="flex flex-col space-y-4 w-1/2">
              <CategoryDropdown
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                isOpen={isCategoryDropdownOpen}
                setIsOpen={setIsCategoryDropdownOpen}
                setSelectedTerminalId={setSelectedTerminalId}
                filteredCategories={filteredCategories}
              />

              <TagsDropdown
                selectedTags={selectedTags}
                allTags={allTags}
                toggleTag={toggleTag}
                isOpen={isTagDropdownOpen}
                setIsOpen={setIsTagDropdownOpen}
              />
            </div>

            {/* Right side - Search bars */}
            <div className="flex flex-col space-y-2 w-1/2">
              <SearchBar
                ref={categorySearchRef}
                searchTerm={categorySearchTerm}
                setSearchTerm={setCategorySearchTerm}
                placeholder="Search categories..."
                onKeyDown={(e) => handleKeyDown(e, 'down')}
              />
              <SearchBar
                ref={snippetSearchRef}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                placeholder="Search snippets..."
                onKeyDown={(e) => handleKeyDown(e, 'up')}
              />
            </div>
          </div>
        </div>

        <TerminalIndicator
          selectedTerminalId={selectedTerminalId}
          setSelectedTerminalId={setSelectedTerminalId}
          editors={availableEditors}
        />

        <div
          ref={snippetListRef}
          className="overflow-y-auto max-h-[calc(90vh-200px)] scroll-smooth snap-y snap-mandatory"
        >
          {filteredSnippets.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {filteredSnippets.map((snippet) => (
                <div key={snippet.id} className="snap-start snap-always">
                  <SnippetItem
                    snippet={snippet}
                    availableEditors={availableEditors}
                    selectedTerminalId={selectedTerminalId}
                    openDropdownId={openDropdownId}
                    setOpenDropdownId={setOpenDropdownId}
                    handleCopyCode={handleCopyCode}
                    handleSendToTerminal={handleSendToTerminal}
                    isConfigureSnippet={isConfigureSnippet}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400">
              No snippets found matching your search.
            </div>
          )}
        </div>

        {showActionDialog && (
          <ActionDialog
            showActionDialog={showActionDialog}
            setShowActionDialog={setShowActionDialog}
            handleAddToExisting={handleAddToExisting}
            handleReplace={handleReplace}
          />
        )}

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}

        {(openDropdownId || isCategoryDropdownOpen || isTagDropdownOpen) && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => {
              setOpenDropdownId(null);
              setIsCategoryDropdownOpen(false);
              setIsTagDropdownOpen(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default SnippetManager;