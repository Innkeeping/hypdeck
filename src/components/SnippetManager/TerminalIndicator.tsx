import React from 'react';
import { Terminal, X } from 'lucide-react';
import type { Editor } from '../../types';

interface TerminalIndicatorProps {
  selectedTerminalId: string | null;
  setSelectedTerminalId: (id: string | null) => void;
  editors: Editor[];
}

export const TerminalIndicator: React.FC<TerminalIndicatorProps> = ({
  selectedTerminalId,
  setSelectedTerminalId,
  editors,
}) => {
  if (!selectedTerminalId) return null;

  return (
    <div className="p-4 bg-cyan-500/10 border-b border-cyan-500/30 flex justify-between items-center">
      <div className="flex items-center space-x-2">
        <Terminal size={16} className="text-cyan-400" />
        <p className="text-cyan-400 text-sm">
          Adding configuration to: {editors.find(e => e.id === selectedTerminalId)?.name}
        </p>
      </div>
      <button
        onClick={() => setSelectedTerminalId(null)}
        className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
      >
        <X size={14} />
      </button>
    </div>
  );
};