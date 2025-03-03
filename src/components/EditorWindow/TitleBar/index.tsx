import React from 'react';
import { TitleInput } from './TitleInput';
import { WindowControls } from './WindowControls';
import type { EditorInstance } from '../../../types';

interface TitleBarProps {
  editor: EditorInstance;
  isEditing: boolean;
  editName: string;
  isMaximized: boolean;
  onNameSubmit: (e: React.FormEvent) => void;
  onNameEdit: (e: React.MouseEvent) => void;
  onNameChange: (value: string) => void;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
  onTitleDoubleClick: () => void;
}

export const TitleBar: React.FC<TitleBarProps> = ({
  editor,
  isEditing,
  editName,
  isMaximized,
  onNameSubmit,
  onNameEdit,
  onNameChange,
  onMinimize,
  onMaximize,
  onClose,
  onTitleDoubleClick,
}) => {
  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onNameChange(e.target.value);
  };

  return (
    <div
      className="editor-handle flex items-center justify-between px-3 py-2 bg-gray-800/90 text-cyan-400 cursor-move backdrop-blur-sm"
      onDoubleClick={onTitleDoubleClick}
    >
      <TitleInput
        isEditing={isEditing}
        editName={editName}
        editor={editor}
        onNameSubmit={onNameSubmit}
        onNameEdit={onNameEdit}
        onNameChange={handleNameChange}
      />
      <WindowControls
        isMaximized={isMaximized}
        onMinimize={onMinimize}
        onMaximize={onMaximize}
        onClose={onClose}
      />
    </div>
  );
};