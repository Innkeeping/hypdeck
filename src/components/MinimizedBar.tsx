import React from 'react';
import { Terminal, Maximize2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

const MinimizedBar: React.FC = () => {
  const { editors, restoreEditor } = useEditorStore();
  const minimizedEditors = editors.filter(editor => editor.isMinimized);

  if (minimizedEditors.length === 0) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900/90 backdrop-blur-sm border-t border-cyan-500/30 z-10 px-4 py-2">
      <div className="flex items-center space-x-2 overflow-x-auto">
        {minimizedEditors.map((editor) => (
          <button
            key={editor.id}
            onClick={() => restoreEditor(editor.id)}
            className="flex items-center space-x-2 px-3 py-1.5 bg-gray-800 hover:bg-gray-700 rounded-md text-cyan-400 transition-colors"
          >
            <Terminal size={14} />
            <span className="font-mono text-sm truncate max-w-[150px]">{editor.name}</span>
            <Maximize2 size={14} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default MinimizedBar;