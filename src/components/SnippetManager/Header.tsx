import React from 'react';
import { X } from 'lucide-react';

interface HeaderProps {
  onClose: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onClose }) => (
  <div className="p-4 border-b border-gray-700 flex justify-between items-center">
    <h2 className="text-xl font-bold text-cyan-400 font-mono">Code Snippets</h2>
    <button
      onClick={onClose}
      className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
    >
      <X size={20} />
    </button>
  </div>
);