import React, { useState } from 'react';
import { Search, X, Code, Copy, Tag, Terminal, ChevronDown } from 'lucide-react';
import { useSnippetStore } from '../store/snippetStore';
import { useEditorStore } from '../store/editorStore';
import type { CodeSnippet } from '../types';

interface SnippetManagerProps {
  onClose: () => void;
}

const CATEGORIES = [
  { id: 'app-configure', name: 'app.configure', tag: 'configure' }
  // We'll add more categories later
];

const SnippetManager: React.FC<SnippetManagerProps> = ({ onClose }) => {
  const { snippets } = useSnippetStore();
  const { editors, appendToEditor, updateEditorContent } = useEditorStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [selectedTerminalId, setSelectedTerminalId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [showActionDialog, setShowActionDialog] = useState<{
    snippetCode: string;
    editorId: string;
  } | null>(null);

  // Get unique tags from all snippets
  const allTags = Array.from(
    new Set(snippets.flatMap(snippet => snippet.tags))
  );

  // Get available editors (non-minimized)
  const availableEditors = editors.filter(editor => !editor.isMinimized);

  // Filter snippets based on category, tags, and search
  const filteredSnippets = snippets.filter(snippet => {
    const matchesSearch =
      snippet.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      snippet.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesTags =
      selectedTags.length === 0 ||
      selectedTags.every(tag => snippet.tags.includes(tag));

    const matchesCategory = selectedCategory
      ? snippet.tags.includes(CATEGORIES.find(c => c.id === selectedCategory)?.tag || '')
      : true;

    return matchesSearch && matchesTags && matchesCategory;
  });

  const handleCopyCode = async (code: string) => {
    try {
      await navigator.clipboard.writeText(code);
    } catch (err) {
      console.error('Failed to copy code:', err);
    }
  };

  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  const handleSendToTerminal = (snippetCode: string, editorId: string, isConfigSnippet: boolean) => {
    const editor = editors.find(e => e.id === editorId);
    if (!editor) return;

    if (isConfigSnippet) {
      // If there's already a configure snippet in the selected terminal
      if (editor.content.includes('app.configure')) {
        setShowActionDialog({ snippetCode, editorId });
        return;
      }

      // If this is the first configure snippet
      const wrapperSnippet = snippets.find(s => s.name === 'App Configure Wrapper');
      if (wrapperSnippet) {
        updateEditorContent(editorId, wrapperSnippet.code.replace(
          '  // Add configuration items here',
          snippetCode
        ));
      }
      setSelectedTerminalId(editorId);
    } else {
      // For non-configure snippets, just append
      appendToEditor(editorId, snippetCode);
    }

    setOpenDropdownId(null);
    if (!isConfigSnippet) {
      onClose();
    }
  };

  const handleAddToExisting = () => {
    if (!showActionDialog) return;

    const { snippetCode, editorId } = showActionDialog;
    const editor = editors.find(e => e.id === editorId);
    if (!editor) return;

    const currentContent = editor.content;
    const newContent = currentContent.replace(
      /\]\)$/,
      `,\n${snippetCode}\n])`
    );
    updateEditorContent(editorId, newContent);
    setShowActionDialog(null);
    setSelectedTerminalId(editorId);
  };

  const handleReplace = () => {
    if (!showActionDialog) return;

    const { snippetCode, editorId } = showActionDialog;
    const wrapperSnippet = snippets.find(s => s.name === 'App Configure Wrapper');
    if (wrapperSnippet) {
      updateEditorContent(editorId, wrapperSnippet.code.replace(
        '  // Add configuration items here',
        snippetCode
      ));
    }
    setShowActionDialog(null);
    setSelectedTerminalId(editorId);
  };

  const isConfigureSnippet = (snippet: CodeSnippet) => {
    return snippet.tags.includes('configure') && snippet.name !== 'App Configure Wrapper';
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-xl font-bold text-cyan-400 font-mono">Code Snippets</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white p-1 rounded-full hover:bg-gray-700"
          >
            <X size={20} />
          </button>
        </div>

        {/* Search, Category Selection, and Tags */}
        <div className="p-4 border-b border-gray-700 space-y-4">
          <div className="flex gap-4">
            {/* Category Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsCategoryDropdownOpen(!isCategoryDropdownOpen)}
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent flex items-center space-x-2 min-w-[200px]"
              >
                <span>{selectedCategory ? CATEGORIES.find(c => c.id === selectedCategory)?.name : 'Select Category'}</span>
                <ChevronDown size={16} className={`ml-2 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryDropdownOpen && (
                <>
                  <div className="absolute top-full mt-1 w-full bg-gray-800 border border-gray-700 rounded-md shadow-lg z-50">
                    <button
                      onClick={() => {
                        setSelectedCategory(null);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                    >
                      All Categories
                    </button>
                    {CATEGORIES.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setIsCategoryDropdownOpen(false);
                        }}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-gray-700 hover:text-white"
                      >
                        {category.name}
                      </button>
                    ))}
                  </div>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setIsCategoryDropdownOpen(false)}
                  />
                </>
              )}
            </div>

            {/* Search Input */}
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={18} className="text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search snippets..."
                className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <button
                key={tag}
                onClick={() => toggleTag(tag)}
                className={`px-3 py-1 rounded-full text-sm font-mono transition-colors ${
                  selectedTags.includes(tag)
                    ? 'bg-cyan-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                <div className="flex items-center space-x-1">
                  <Tag size={14} />
                  <span>{tag}</span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Terminal Indicator */}
        {selectedTerminalId && (
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
        )}

        {/* Snippets List */}
        <div className="overflow-y-auto max-h-[calc(90vh-200px)]">
          {filteredSnippets.length > 0 ? (
            <div className="divide-y divide-gray-700">
              {filteredSnippets.map((snippet) => (
                <div
                  key={snippet.id}
                  className="p-4 hover:bg-gray-800/50"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-lg font-mono text-cyan-400">{snippet.name}</h3>
                      <p className="text-gray-400 text-sm">{snippet.description}</p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleCopyCode(snippet.code)}
                        className="text-gray-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                      >
                        <Copy size={16} />
                        <span>Copy</span>
                      </button>

                      {availableEditors.length > 0 && (
                        <div className="relative">
                          <button
                            onClick={() => setOpenDropdownId(openDropdownId === snippet.id ? null : snippet.id)}
                            className="text-gray-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2"
                          >
                            <Terminal size={16} />
                            <span>Send to Terminal</span>
                          </button>

                          {openDropdownId === snippet.id && (
                            <div
                              className="absolute right-0 mt-2 w-56 bg-gray-800 rounded-md shadow-lg overflow-hidden z-50 border border-gray-700"
                              onClick={(e) => e.stopPropagation()}
                            >
                              {availableEditors.map((editor) => (
                                <button
                                  key={editor.id}
                                  onClick={() => handleSendToTerminal(
                                    snippet.code,
                                    editor.id,
                                    isConfigureSnippet(snippet)
                                  )}
                                  className={`w-full px-4 py-2 text-left text-sm
                                    ${editor.id === selectedTerminalId
                                      ? 'bg-cyan-500/20 text-cyan-300'
                                      : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                                    }
                                    flex items-center space-x-2`}
                                >
                                  <Terminal size={14} />
                                  <span className="truncate">{editor.name}</span>
                                  {editor.id === selectedTerminalId && (
                                    <span className="ml-auto text-xs bg-cyan-500/20 px-2 py-0.5 rounded-full">
                                      Selected
                                    </span>
                                  )}
                                </button>
                              ))}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Code Preview */}
                  <div className="relative">
                    <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
                      <code className={`language-${snippet.language}`}>
                        {snippet.code}
                      </code>
                    </pre>
                  </div>

                  {/* Tags */}
                  <div className="mt-2 flex flex-wrap gap-2">
                    {snippet.tags.map(tag => (
                      <span
                        key={tag}
                        className="px-2 py-1 rounded-full bg-gray-800 text-gray-300 text-xs font-mono"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="p-6 text-center text-gray-400">
              No snippets found matching your search.
            </div>
          )}
        </div>
      </div>

      {/* Action Dialog */}
      {showActionDialog && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-[60]">
          <div className="bg-gray-900 border border-cyan-500/30 rounded-lg shadow-xl p-6 max-w-md w-full">
            <h3 className="text-lg font-bold text-cyan-400 mb-4">
              Configure Options
            </h3>
            <p className="text-gray-300 mb-6">
              There's already a configuration in this terminal. What would you like to do?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setShowActionDialog(null)}
                className="px-4 py-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToExisting}
                className="px-4 py-2 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 rounded-md"
              >
                Add to Existing
              </button>
              <button
                onClick={handleReplace}
                className="px-4 py-2 bg-red-500/10 text-red-400 hover:bg-red-500/20 rounded-md"
              >
                Replace
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Click outside handlers */}
      {(openDropdownId || isCategoryDropdownOpen) && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => {
            setOpenDropdownId(null);
            setIsCategoryDropdownOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default SnippetManager;