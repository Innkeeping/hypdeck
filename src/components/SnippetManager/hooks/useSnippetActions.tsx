import { useState } from 'react';
import { useSnippetStore } from '../../../store/snippetStore';
import { useEditorStore } from '../../../store/editorStore';
import type { CodeSnippet, ActionDialogState } from '../types';

type NotificationType = {
  message: string;
  type: 'success' | 'error';
};

export const useSnippetActions = (
  setNotification: (notification: NotificationType | null) => void
) => {
  const { snippets } = useSnippetStore();
  const { editors, updateEditorContent } = useEditorStore();
  const [showActionDialog, setShowActionDialog] = useState<ActionDialogState | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string | null>(null);

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
        // Create new config content first
        const configContent = wrapperSnippet.code.replace(
          '  // Add configuration items here',
          snippetCode
        );

        // Get existing content
        const existingContent = editor.content.trim();

        // Combine with config first, then existing content
        const newContent = existingContent
          ? `${configContent}\n\n${existingContent}`
          : configContent;

        updateEditorContent(editorId, newContent);
        setNotification({
          message: 'Configuration added at the top',
          type: 'success'
        });
      }
    } else {
      const existingContent = editor.content.trim();
      const newContent = existingContent
        ? `${existingContent}\n${snippetCode}`
        : snippetCode;

      updateEditorContent(editorId, newContent);
      setNotification({
        message: 'Snippet added to terminal',
        type: 'success'
      });
    }

    setOpenDropdownId(null);
    setSelectedTerminalId(editorId);
  };

  const handleAddToExisting = (): void => {
    if (!showActionDialog) return;

    const { snippetCode, editorId } = showActionDialog;
    const editor = editors.find(e => e.id === editorId);
    if (!editor) return;

    const configureIndex = editor.content.indexOf('app.configure');
    if (configureIndex === -1) return;

    const closingBracketIndex = editor.content.indexOf('])', configureIndex);
    if (closingBracketIndex === -1) return;

    const newContent =
      editor.content.slice(0, closingBracketIndex) +
      `,\n  ${snippetCode}` +
      editor.content.slice(closingBracketIndex);

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
      const editor = editors.find(e => e.id === editorId);
      if (!editor) return;

      const newConfigContent = wrapperSnippet.code.replace(
        '  // Add configuration items here',
        snippetCode
      );

      const configureIndex = editor.content.indexOf('app.configure');
      const closingBracketIndex = editor.content.indexOf('])', configureIndex);

      const afterConfig = editor.content.slice(closingBracketIndex + 2).trim();

      const newContent = afterConfig
        ? `${newConfigContent}\n\n${afterConfig}`
        : newConfigContent;

      updateEditorContent(editorId, newContent);
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

  return {
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
  };
};