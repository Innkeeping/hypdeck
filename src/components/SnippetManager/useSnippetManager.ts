import { RefObject } from 'react';
import { useEditorStore } from '../../store/editorStore';
import { useSearch } from './hooks/useSearch';
import { useTags } from './hooks/useTags';
import { useNotification } from './hooks/useNotification';
import { useSnippetActions } from './hooks/useSnippetActions';
import { useFilteredSnippets } from './hooks/useFilteredSnippets';

export const useSnippetManager = () => {
  const { editors } = useEditorStore();

  const { notification, setNotification } = useNotification();

  const {
    searchTerm,
    setSearchTerm,
    categorySearchTerm,
    setCategorySearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredCategories,
    handleClearCategorySearch,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
  } = useSearch();

  const {
    selectedTags,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    allTags,
    toggleTag,
  } = useTags();

  const {
    openDropdownId,
    setOpenDropdownId,
    selectedTerminalId,
    setSelectedTerminalId,
    showActionDialog,
    setShowActionDialog,
    handleCopyCode,
    handleSendToTerminal,
    handleAddToExisting,
    handleReplace,
    isConfigureSnippet,
  } = useSnippetActions(setNotification);

  const filteredSnippets = useFilteredSnippets({
    searchTerm,
    selectedTags,
    selectedCategory,
  });

  const availableEditors = editors.filter(editor => !editor.isMinimized);

  const handleCategorySelect = (
    categoryId: string | null,
    snippetListRef: RefObject<HTMLDivElement>,
    snippetSearchRef: RefObject<HTMLInputElement>
  ): void => {
    setSelectedCategory(categoryId);
    setIsCategoryDropdownOpen(false);

    if (snippetListRef.current) {
      snippetListRef.current.scrollTop = 0;
    }

    setTimeout(() => {
      snippetSearchRef.current?.focus();
    }, 100);
  };

  return {
    // Search related
    searchTerm,
    setSearchTerm,
    categorySearchTerm,
    setCategorySearchTerm,
    selectedCategory,
    setSelectedCategory,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
    filteredCategories,
    handleClearCategorySearch,
    handleCategorySelect,

    // Tags related
    selectedTags,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    allTags,
    toggleTag,

    // Snippet actions
    openDropdownId,
    setOpenDropdownId,
    selectedTerminalId,
    setSelectedTerminalId,
    showActionDialog,
    setShowActionDialog,
    handleCopyCode,
    handleSendToTerminal,
    handleAddToExisting,
    handleReplace,
    isConfigureSnippet,

    // Filtered results
    filteredSnippets,
    availableEditors,

    // Notifications
    notification,
  };
};