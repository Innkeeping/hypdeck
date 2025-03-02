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

  // Create a default editor on first load
  useEffect(() => {
    if (editors.length === 0) {
      addEditor();
    }
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white relative overflow-hidden">
      {/* Background elements remain the same */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMyMTIxMjEiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJ2LTRoMnY0em0wLTZoLTJWNmgydjR6bTAgMjRoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi0yNGgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bS02LTQyaC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptMCA2aC0ydi00aDJ2NHptLTYtMzZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0wIDZoLTJ2LTRoMnY0em0tNi0zMGgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6bTAgNmgtMnYtNGgydjR6Ij48L3BhdGg+PC9nPjwvZz48L3N2Zz4=')] opacity-20"></div>
      <div className="absolute inset-0 bg-noise opacity-5"></div>
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-1/3 right-1/3 w-64 h-64 bg-purple-500/20 rounded-full filter blur-3xl"></div>
      <div className="absolute top-2/3 right-1/4 w-72 h-72 bg-cyan-600/15 rounded-full filter blur-3xl"></div>
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800/50 to-gray-900/80 opacity-60"></div>

      <Navbar
        onOpenManager={() => setIsManagerOpen(true)}
        onOpenSnippets={() => setIsSnippetManagerOpen(true)} // Add this prop to Navbar
      />

      <div className="pt-16 relative w-full h-[calc(100vh-4rem)]">
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