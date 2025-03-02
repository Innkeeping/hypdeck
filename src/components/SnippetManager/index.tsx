import React, { useRef, useEffect } from 'react';
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

  const {
    searchTerm,
    setSearchTerm,
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

  // Scroll to top when category changes
  useEffect(() => {
    if (snippetListRef.current) {
      snippetListRef.current.scrollTop = 0;
    }
  }, [selectedCategory]);

  // Handle click outside and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        if (openDropdownId || isCategoryDropdownOpen || isTagDropdownOpen) {
          setOpenDropdownId(null);
          setIsCategoryDropdownOpen(false);
          setIsTagDropdownOpen(false);
        } else {
          onClose();
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose, openDropdownId, isCategoryDropdownOpen, isTagDropdownOpen]);

  return (
    <div
      className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]"
      onClick={(e) => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        ref={modalRef}
        className="bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
      >
        <Header onClose={onClose} />

        <div className="p-4 border-b border-gray-700 space-y-4">
          <div className="flex gap-4">
            <CategoryDropdown
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
              isOpen={isCategoryDropdownOpen}
              setIsOpen={setIsCategoryDropdownOpen}
              setSelectedTerminalId={setSelectedTerminalId}
            />
            <SearchBar
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
          </div>
          <TagsDropdown
            selectedTags={selectedTags}
            allTags={allTags}
            toggleTag={toggleTag}
            isOpen={isTagDropdownOpen}
            setIsOpen={setIsTagDropdownOpen}
          />
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

        <ActionDialog
          showActionDialog={showActionDialog}
          setShowActionDialog={setShowActionDialog}
          handleAddToExisting={handleAddToExisting}
          handleReplace={handleReplace}
        />

        {notification && (
          <Notification
            message={notification.message}
            type={notification.type}
          />
        )}

        {/* Click outside handlers for dropdowns */}
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