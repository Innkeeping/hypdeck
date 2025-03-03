import React from 'react';
import { X, Maximize2, Minus } from 'lucide-react';

interface WindowControlsProps {
  isMaximized: boolean;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
}

export const WindowControls: React.FC<WindowControlsProps> = ({
  isMaximized,
  onMinimize,
  onMaximize,
  onClose,
}) => (
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
);