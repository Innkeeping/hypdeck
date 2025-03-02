import { useState, useEffect, useMemo } from 'react';
import { useSnippetStore } from '../../store/snippetStore';
import { useEditorStore } from '../../store/editorStore';
import type { CodeSnippet, ActionDialogState } from './types';
import { CATEGORIES } from '../../store/categories';

export const useSnippetManager = () => {
  const { snippets } = useSnippetStore();
  const { editors, appendToEditor, updateEditorContent } = useEditorStore();

  // Search states
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');

  // Filter states
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // UI states
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState<ActionDialogState | null>(null);
  const [notification, setNotification] = useState<{
    message: string;
    type: 'success' | 'error';
  } | null>(null);

  // Memoized filtered categories
  const filteredCategories = useMemo(() => {
    if (!categorySearchTerm) return CATEGORIES;
    const searchLower = categorySearchTerm.toLowerCase();
    return CATEGORIES.filter(category =>
      category.name.toLowerCase().includes(searchLower) ||
      category.id.toLowerCase().includes(searchLower) ||
      (category.tag && category.tag.toLowerCase().includes(searchLower))
    );
  }, [categorySearchTerm]);

  // Get unique tags from all snippets
  const allTags = useMemo(() =>
    Array.from(new Set(snippets.flatMap(snippet => snippet.tags)))
  , [snippets]);

  // Get available editors (non-minimized)
  const availableEditors = editors.filter(editor => !editor.isMinimized);

  // Filter snippets based on search term, selected category, and tags
  const filteredSnippets = useMemo(() => {
    return snippets.filter(snippet => {
      const searchLower = searchTerm.toLowerCase();

      // Check if snippet matches search term
      const matchesSearch = searchTerm === '' ||
        snippet.name.toLowerCase().includes(searchLower) ||
        snippet.description.toLowerCase().includes(searchLower) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchLower));

      // Check if snippet matches selected tags
      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => snippet.tags.includes(tag));

      // Check if snippet matches selected category
      const categoryTag = selectedCategory
        ? CATEGORIES.find(c => c.id === selectedCategory)?.tag
        : null;
      const matchesCategory = !categoryTag || snippet.tags.includes(categoryTag);

      return matchesSearch && matchesTags && matchesCategory;
    });
  }, [snippets, searchTerm, selectedTags, selectedCategory]);

  const handleCopyCode = async (code: string): Promise<void> => {
    try {
      await navigator.clipboard.writeText(code);
      setNotification({
        message: 'Code copied to clipboard',
        type: 'success'
      });
    } catch (err) {
      console.error('Failed to copy code:', err);
      setNotification({
        message: 'Failed to copy code',
        type: 'error'
      });
    }
  };

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSendToTerminal = (snippetCode: string, editorId: string, isConfigSnippet: boolean): void => {
    const editor = editors.find(e => e.id === editorId);
    if (!editor) return;

    if (isConfigSnippet) {
      if (editor.content.includes('app.configure')) {
        setShowActionDialog({ snippetCode, editorId });
        return;
      }

      const wrapperSnippet = snippets.find(s => s.name === 'App Configure Wrapper');
      if (wrapperSnippet) {
        updateEditorContent(editorId, wrapperSnippet.code.replace(
          '  // Add configuration items here',
          snippetCode
        ));
        setNotification({
          message: 'Configuration added successfully',
          type: 'success'
        });
      }
      setSelectedTerminalId(editorId);
    } else {
      appendToEditor(editorId, snippetCode);
      setNotification({
        message: 'Snippet added to terminal',
        type: 'success'
      });
    }

    setOpenDropdownId(null);
  };

  const handleAddToExisting = (): void => {
    if (!showActionDialog) return;

    const { snippetCode, editorId } = showActionDialog;
    const editor = editors.find(e => e.id === editorId);
    if (!editor) return;

    const currentContent = editor.content;
    const newContent = currentContent.replace(
      /\n\]\)$/,
      `,\n  ${snippetCode}\n])`
    );
    updateEditorContent(editorId, newContent);
    setNotification({
      message: 'Configuration added to existing setup',
      type: 'success'
    });
    setShowActionDialog(null);
    setSelectedTerminalId(editorId);
    setOpenDropdownId(null);
  };

  const handleReplace = (): void => {
    if (!showActionDialog) return;

    const { snippetCode, editorId } = showActionDialog;
    const wrapperSnippet = snippets.find(s => s.name === 'App Configure Wrapper');
    if (wrapperSnippet) {
      updateEditorContent(editorId, wrapperSnippet.code.replace(
        '  // Add configuration items here',
        snippetCode
      ));
      setNotification({
        message: 'Configuration replaced successfully',
        type: 'success'
      });
    }
    setShowActionDialog(null);
    setSelectedTerminalId(editorId);
    setOpenDropdownId(null);
  };

  const isConfigureSnippet = (snippet: CodeSnippet): boolean => {
    return snippet.tags.includes('configure') && snippet.name !== 'App Configure Wrapper';
  };

  // Auto-dismiss notification
  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  return {
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
  };
};