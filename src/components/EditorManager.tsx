import React, { useState, useRef, useEffect } from 'react';
import { Search, X, Terminal, Maximize2 } from 'lucide-react';
import { useEditorStore } from '../store/editorStore';

interface EditorManagerProps {
  onClose: () => void;
}

const EditorManager: React.FC<EditorManagerProps> = ({ onClose }) => {
  const { editors, setActiveEditor, removeEditor, restoreEditor } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const modalRef = useRef<HTMLDivElement>(null);

  const filteredEditors = editors.filter(editor =>
    editor.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscape);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [onClose]);

  const handleEditorClick = (id: string) => {
    const editor = editors.find(e => e.id === id);
    if (editor && editor.isMinimized) {
      restoreEditor(id);
    }
    setActiveEditor(id);
    onClose();
  };

  const handleRemove = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    removeEditor(id);
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div
        ref={modalRef}
        className="bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-hidden"
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-cyan-400 font-mono">Terminal Manager</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-gray-700">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search size={18} className="text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search terminals..."
              className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-y-auto max-h-[calc(80vh-140px)]">
          {filteredEditors.length > 0 ? (
            <ul className="divide-y divide-gray-700">
              {filteredEditors.map((editor) => (
                <li
                  key={editor.id}
                  onClick={() => handleEditorClick(editor.id)}
                  className="p-3 hover:bg-gray-800 cursor-pointer flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Terminal size={18} className="text-cyan-400" />
                    <span className="text-white font-mono">{editor.name}</span>
                    {editor.isMinimized && (
                      <span className="text-xs bg-gray-700 text-cyan-300 px-2 py-0.5 rounded-full">Minimized</span>
                    )}
                  </div>
                  <div className="flex items-center space-x-2">
                    {editor.isMinimized && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreEditor(editor.id);
                        }}
                        className="text-gray-400 hover:text-cyan-400 p-1 rounded-full hover:bg-gray-700"
                        title="Restore"
                      >
                        <Maximize2 size={16} />
                      </button>
                    )}
                    <button
                      onClick={(e) => handleRemove(e, editor.id)}
                      className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-gray-700"
                    >
                      <X size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-6 text-center text-gray-400">
              No terminals found matching your search.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EditorManager;