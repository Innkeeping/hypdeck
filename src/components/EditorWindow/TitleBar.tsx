import React, { useState, useRef } from 'react';
import { X, Maximize2, Minus, Edit3 } from 'lucide-react';
import type { TitleBarProps } from './types';

export const TitleBar: React.FC<TitleBarProps> = ({
  editor,
  isMaximized,
  onClose,
  onMaximize,
  onMinimize,
  onNameChange,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(editor.name);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleNameEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      titleInputRef.current?.select();
    }, 10);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNameChange(editName);
    setIsEditing(false);
  };

  return (
    <div
      className="editor-handle flex items-center justify-between px-3 py-2 bg-gray-800 text-cyan-400 cursor-move"
      onDoubleClick={handleTitleDoubleClick}
    >
      {isEditing ? (
        <form onSubmit={handleNameSubmit} className="flex-1">
          <input
            ref={titleInputRef}
            type="text"
            value={editName}
            onChange={(e) => setEditName(e.target.value)}
            className="bg-gray-700 text-cyan-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
            autoFocus
            onBlur={handleNameSubmit}
          />
        </form>
      ) : (
        <div className="flex items-center space-x-2">
          <span className="font-mono text-sm truncate">{editor.name}</span>
          <button
            onClick={handleNameEdit}
            className="p-1 hover:bg-gray-700 rounded"
            title="Edit name"
          >
            <Edit3 size={14} />
          </button>
        </div>
      )}
      <div className="flex space-x-1">
        <button
          onClick={onMinimize}
          className="p-1 hover:bg-gray-700 rounded"
          title="Minimize"
        >
          <Minus size={16} />
        </button>
        <button
          onClick={onMaximize}
          className="p-1 hover:bg-gray-700 rounded"
          title={isMaximized ? "Restore" : "Maximize"}
        >
          <Maximize2 size={16} />
        </button>
        <button
          onClick={onClose}
          className="p-1 hover:bg-red-600 rounded"
          title="Close"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
};