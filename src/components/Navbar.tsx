import React from 'react';
import { useEditorStore } from '../store/editorStore';
import { Terminal, FolderOpen, Code } from 'lucide-react';

interface NavbarProps {
  onOpenManager: () => void;
  onOpenSnippets: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onOpenManager, onOpenSnippets }) => {
  const { addEditor } = useEditorStore();

  return (
    <div className="fixed top-0 left-0 right-0 h-16 bg-gray-800/90 backdrop-blur-sm border-b border-cyan-500/30 z-50">
      <div className="h-full px-4 flex items-center justify-between">
        <div className="text-xl font-bold text-cyan-400">
          HypDeck
        </div>

        <div className="flex items-center space-x-4">
          <button
            onClick={() => addEditor()}
            className="px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 flex items-center gap-2 transition-colors"
            title="New Terminal (Alt+T)"
          >
            <Terminal size={18} />
            <span>New Terminal</span>
          </button>
          <button
            onClick={onOpenManager}
            className="px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 flex items-center gap-2 transition-colors"
            title="Terminal Manager (Alt+M)"
          >
            <FolderOpen size={18} />
            <span>Manager</span>
          </button>
          <button
            onClick={onOpenSnippets}
            className="px-3 py-1.5 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 flex items-center gap-2 transition-colors"
            title="Snippets (Alt+S)"
          >
            <Code size={18} />
            <span>Snippets</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;