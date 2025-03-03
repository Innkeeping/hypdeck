import React from 'react';
import { Edit3 } from 'lucide-react';
import type { EditorInstance } from '../../../types';

interface TitleInputProps {
  isEditing: boolean;
  editName: string;
  editor: EditorInstance;
  onNameSubmit: (e: React.FormEvent) => void;
  onNameEdit: (e: React.MouseEvent) => void;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TitleInput: React.FC<TitleInputProps> = ({
  isEditing,
  editName,
  editor,
  onNameSubmit,
  onNameEdit,
  onNameChange,
}) => {
  if (isEditing) {
    return (
      <form onSubmit={onNameSubmit} className="flex-1">
        <input
          type="text"
          value={editName}
          onChange={onNameChange}
          className="bg-gray-700 text-cyan-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
          autoFocus
          onBlur={onNameSubmit}
        />
      </form>
    );
  }

  return (
    <div className="flex items-center space-x-2">
      <span className="font-mono text-sm truncate">{editor.name}</span>
      <button
        onClick={onNameEdit}
        className="p-1 hover:bg-gray-700 rounded"
        title="Edit name"
      >
        <Edit3 size={14} />
      </button>
    </div>
  );
};