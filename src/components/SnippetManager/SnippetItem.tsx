import React from 'react';
import { Copy, Terminal } from 'lucide-react';
import type { CodeSnippet } from './types';
import type { EditorInstance } from '../../types';

interface SnippetItemProps {
  snippet: CodeSnippet;
  availableEditors: EditorInstance[];
  selectedTerminalId: string | null;
  openDropdownId: string | null;
  setOpenDropdownId: (id: string | null) => void;
  handleCopyCode: (code: string) => Promise<void>;
  handleSendToTerminal: (code: string, editorId: string, isConfig: boolean) => void;
  isConfigureSnippet: (snippet: CodeSnippet) => boolean;
}

export const SnippetItem: React.FC<SnippetItemProps> = ({
  snippet,
  availableEditors,
  selectedTerminalId,
  openDropdownId,
  setOpenDropdownId,
  handleCopyCode,
  handleSendToTerminal,
  isConfigureSnippet,
}) => {
  const isConfig = isConfigureSnippet(snippet);

  return (
    <div className="p-4 hover:bg-gray-800/50">
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
                className={`text-gray-400 hover:text-cyan-400 p-2 rounded-lg hover:bg-gray-700 flex items-center space-x-2 ${
                  isConfig ? 'bg-cyan-500/10' : ''
                }`}
              >
                <Terminal size={16} />
                <span>Send to Terminal</span>
              </button>

              {openDropdownId === snippet.id && (
                <>
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
                          isConfig
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
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setOpenDropdownId(null)}
                  />
                </>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Code Preview */}
      <div className="relative">
        <pre className="bg-gray-800 rounded-lg p-4 overflow-x-auto">
          <code className={`language-${snippet.language} text-sm font-mono`}>
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
  );
};