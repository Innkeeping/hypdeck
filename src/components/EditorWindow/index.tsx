import React, { useRef } from 'react';
import Draggable from 'react-draggable';
import Editor from '@monaco-editor/react';
import { useEditorDrag } from './hooks/useEditorDrag';
import { useEditorResize } from './hooks/useEditorResize';
import { useEditorState } from './hooks/useEditorState';
import { ResizeHandles } from './ResizeHandles';
import { TitleBar } from './TitleBar';
import type { EditorWindowProps } from './types';

const EditorWindow: React.FC<EditorWindowProps> = ({ editor }) => {
  const nodeRef = useRef(null);
  const { handleDrag, handleDragStop } = useEditorDrag(editor);
  const { isResizing, startResize } = useEditorResize(editor);
  const {
    isMaximized,
    editorRef,
    handleEditorDidMount,
    handleClick,
    handleEditorChange,
    titleBarProps,
    wordWrap
  } = useEditorState(editor);

  if (editor.isMinimized) {
    return null;
  }

  return (
    <Draggable
      nodeRef={nodeRef}
      handle=".editor-handle"
      position={editor.position}
      onDrag={handleDrag}
      onStop={handleDragStop}
      grid={[1, 1]}
      disabled={isResizing}
    >
      <div
        ref={nodeRef}
        className={`absolute rounded-md overflow-hidden shadow-lg border border-cyan-400/30 bg-gray-900/90 backdrop-blur-sm ${
          editor.isActive ? 'ring-2 ring-cyan-500' : ''
        }`}
        style={{
          width: `${editor.width}px`,
          height: `${editor.height}px`,
          zIndex: editor.zIndex,
          touchAction: 'none',
        }}
        onClick={handleClick}
      >
        <TitleBar {...titleBarProps} />

        <div className="h-[calc(100%-36px)] relative">
          <Editor
            height="100%"
            language={editor.language}
            value={editor.content}
            onChange={handleEditorChange}
            theme="vs-dark"
            onMount={handleEditorDidMount}
            options={{
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 14,
              lineNumbers: 'on',
              glyphMargin: false,
              folding: true,
              lineDecorationsWidth: 10,
              lineNumbersMinChars: 3,
              wordWrap: wordWrap ? 'on' : 'off',
            }}
          />
        </div>

        <ResizeHandles onResize={startResize} />
      </div>
    </Draggable>
  );
};

export default EditorWindow;