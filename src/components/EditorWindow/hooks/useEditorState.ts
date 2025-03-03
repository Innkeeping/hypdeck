import { useState, useEffect, useRef } from 'react';
import { useEditorStore } from '../../../store/editorStore';
import type { EditorInstance } from '../../../types';
import type { TitleBarProps } from '../types';

export const useEditorState = (editor: EditorInstance) => {
  const {
    updateEditor,
    updateEditorContent,
    updateEditorName,
    minimizeEditor,
    removeEditor,
    bringToFront
  } = useEditorStore();

  const [isMaximized, setIsMaximized] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(editor.name);
  const editorRef = useRef<any>(null);

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
    if (editor.isActive) {
      editor.focus();
      editor.setPosition({ lineNumber: 1, column: 1 });
    }
  };

  const handleClick = () => {
    bringToFront(editor.id);
    if (editorRef.current) {
      editorRef.current.focus();
    }
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateEditorContent(editor.id, value);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeEditor(editor.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMaximized(!isMaximized);

    if (!isMaximized) {
      updateEditor(editor.id, {
        width: window.innerWidth - 40,
        height: window.innerHeight - 40,
        position: { x: 20, y: 20 }
      });
    } else {
      updateEditor(editor.id, {
        width: editor.width,
        height: editor.height,
        position: editor.position
      });
    }
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeEditor(editor.id);
  };

  const handleNameChange = (name: string) => {
    setEditName(name);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEditorName(editor.id, editName);
    setIsEditing(false);
  };

  const handleNameEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
  };

  useEffect(() => {
    if (editor.isActive && editorRef.current) {
      editorRef.current.focus();
      editorRef.current.setPosition({ lineNumber: 1, column: 1 });
    }
  }, [editor.isActive]);

  const titleBarProps: TitleBarProps = {
    editor,
    isEditing,
    editName,
    isMaximized,
    onNameSubmit: handleNameSubmit,
    onNameEdit: handleNameEdit,
    onNameChange: handleNameChange,
    onMinimize: handleMinimize,
    onMaximize: handleMaximize,
    onClose: handleClose,
    onTitleDoubleClick: handleTitleDoubleClick
  };

  return {
    isMaximized,
    editorRef,
    handleEditorDidMount,
    handleClick,
    handleEditorChange,
    titleBarProps
  };
};