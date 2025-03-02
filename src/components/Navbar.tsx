import React from 'react';
import { Terminal, List } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface NavbarProps {
  onOpenManager: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenManager }) => {
  const { addEditor } = useEditorStore();

  return (
    <div className="fixed top-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-b border-cyan-500/30 z-10">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Terminal className="text-cyan-400" size={24} />
          <span className="text-white font-bold text-xl font-mono">Hyp Deck</span>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={addEditor}
            className="px-3 py-1.5 bg-cyan-600 hover:bg-cyan-700 text-white rounded-md flex items-center space-x-2 transition-colors"
          >
            <Terminal size={16} />
            <span>New Terminal</span>
          </button>
          
          <button
            onClick={onOpenManager}
            className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-white rounded-md flex items-center space-x-2 transition-colors"
          >
            <List size={16} />
            <span>Manage</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;