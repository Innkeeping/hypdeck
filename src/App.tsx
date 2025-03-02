import { useState, useEffect } from 'react';
import { useEditorStore } from './store/editorStore';
import EditorWindow from './components/EditorWindow';
import Navbar from './components/Navbar';
import EditorManager from './components/EditorManager';
import MinimizedBar from './components/MinimizedBar';
import SnippetManager from './components/SnippetManager';

function App() {
  const { editors, addEditor } = useEditorStore();
  const [isManagerOpen, setIsManagerOpen] = useState(false);
  const [isSnippetManagerOpen, setIsSnippetManagerOpen] = useState(false);

  useEffect(() => {
    if (editors.length === 0) {
      addEditor();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute inset-0 bg-noise opacity-5" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl" />
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl" />
      <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-cyan-600/15 rounded-full filter blur-3xl" />
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900/80 opacity-60" />

      <Navbar
        onOpenManager={() => setIsManagerOpen(true)}
        onOpenSnippets={() => setIsSnippetManagerOpen(true)}
      />

      <div
        className="editor-container pt-16 relative w-full"
        style={{
          height: 'calc(100vh - 4rem)',
          minHeight: 'calc(100vh - 4rem)',
        }}
      >
        {editors.map((editor) => (
          <EditorWindow key={editor.id} editor={editor} />
        ))}
      </div>

      <MinimizedBar />

      {isManagerOpen && (
        <EditorManager onClose={() => setIsManagerOpen(false)} />
      )}

      {isSnippetManagerOpen && (
        <SnippetManager onClose={() => setIsSnippetManagerOpen(false)} />
      )}
    </div>
  );
}

export default App;