import React, { useState, useRef, useEffect } from 'react';
import Editor from '@monaco-editor/react';
import Draggable, { DraggableData, DraggableEvent } from 'react-draggable';
import { X, Maximize2, Minus, Edit3 } from 'lucide-react';
import { useEditorStore } from '../../store/editorStore';
import type { EditorInstance } from '../../types';

interface EditorWindowProps {
  editor: EditorInstance;
}

const EditorWindow: React.FC<EditorWindowProps> = ({ editor }) => {
  const { updateEditor, removeEditor, bringToFront, updateEditorContent, updateEditorName, minimizeEditor } = useEditorStore();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(editor.name);
  const [isMaximized, setIsMaximized] = useState(false);
  const [prevDimensions, setPrevDimensions] = useState({
    width: editor.width,
    height: editor.height,
    x: editor.position.x,
    y: editor.position.y
  });
  const [isResizing, setIsResizing] = useState(false);
  const nodeRef = useRef(null);
  const titleInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    // Constrain x position to prevent horizontal overflow
    const containerWidth = window.innerWidth;
    const maxX = containerWidth - editor.width;
    const boundedX = Math.max(0, Math.min(maxX, data.x));

    // Constrain y position to prevent dragging above or below viewport
    const minY = 0;
    const viewportHeight = window.innerHeight - 64; // Account for navbar
    const maxY = viewportHeight - editor.height;
    const boundedY = Math.max(minY, Math.min(maxY, data.y));

    updateEditor(editor.id, {
      position: { x: boundedX, y: boundedY }
    });
  };

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
    // Apply the same constraints as handleDrag
    const containerWidth = window.innerWidth;
    const maxX = containerWidth - editor.width;
    const boundedX = Math.max(0, Math.min(maxX, data.x));

    const viewportHeight = window.innerHeight - 64;
    const maxY = viewportHeight - editor.height;
    const boundedY = Math.max(0, Math.min(maxY, data.y));

    updateEditor(editor.id, {
      position: { x: boundedX, y: boundedY }
    });
    bringToFront(editor.id);
  };

  const handleClick = () => {
    bringToFront(editor.id);
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeEditor(editor.id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!isMaximized) {
      setPrevDimensions({
        width: editor.width,
        height: editor.height,
        x: editor.position.x,
        y: editor.position.y
      });

      updateEditor(editor.id, {
        width: window.innerWidth - 40,
        height: window.innerHeight - 40,
        position: { x: 20, y: 20 }
      });
    } else {
      updateEditor(editor.id, {
        width: prevDimensions.width,
        height: prevDimensions.height,
        position: { x: prevDimensions.x, y: prevDimensions.y }
      });
    }

    setIsMaximized(!isMaximized);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    minimizeEditor(editor.id);
  };

  const handleNameEdit = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsEditing(true);
  };

  const handleTitleDoubleClick = () => {
    setIsEditing(true);
    setTimeout(() => {
      if (titleInputRef.current) {
        titleInputRef.current.select();
      }
    }, 10);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditName(e.target.value);
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    updateEditorName(editor.id, editName);
    setIsEditing(false);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      updateEditorContent(editor.id, value);
    }
  };

  const startResize = (e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);

    const startX = e.clientX;
    const startY = e.clientY;
    const startWidth = editor.width;
    const startHeight = editor.height;
    const startLeft = editor.position.x;
    const startTop = editor.position.y;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!isResizing) return;

      moveEvent.preventDefault();
      moveEvent.stopPropagation();

      const deltaX = moveEvent.clientX - startX;
      const deltaY = moveEvent.clientY - startY;

      let newWidth = startWidth;
      let newHeight = startHeight;
      let newLeft = startLeft;
      let newTop = startTop;

      switch (direction) {
        case 'e':
          newWidth = Math.max(300, startWidth + deltaX);
          break;
        case 's':
          newHeight = Math.max(200, startHeight + deltaY);
          break;
        case 'se':
          newWidth = Math.max(300, startWidth + deltaX);
          newHeight = Math.max(200, startHeight + deltaY);
          break;
        case 'sw':
          newWidth = Math.max(300, startWidth - deltaX);
          newLeft = startLeft + startWidth - newWidth;
          newHeight = Math.max(200, startHeight + deltaY);
          break;
        case 'w':
          newWidth = Math.max(300, startWidth - deltaX);
          newLeft = startLeft + startWidth - newWidth;
          break;
        case 'n':
          newHeight = Math.max(200, startHeight - deltaY);
          newTop = startTop + startHeight - newHeight;
          break;
        case 'ne':
          newWidth = Math.max(300, startWidth + deltaX);
          newHeight = Math.max(200, startHeight - deltaY);
          newTop = startTop + startHeight - newHeight;
          break;
        case 'nw':
          newWidth = Math.max(300, startWidth - deltaX);
          newLeft = startLeft + startWidth - newWidth;
          newHeight = Math.max(200, startHeight - deltaY);
          newTop = startTop + startHeight - newHeight;
          break;
      }

      const containerWidth = window.innerWidth;
      const maxX = containerWidth - newWidth;
      newLeft = Math.max(0, Math.min(maxX, newLeft));

      requestAnimationFrame(() => {
        updateEditor(editor.id, {
          width: newWidth,
          height: newHeight,
          position: { x: newLeft, y: newTop }
        });
      });
    };

    const handleMouseUp = () => {
      setIsResizing(false);
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  useEffect(() => {
    if (editor.isActive) {
      handleClick();
    }
  }, []);

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
        <div
          className="editor-handle flex items-center justify-between px-3 py-2 bg-gray-800/90 text-cyan-400 cursor-move backdrop-blur-sm"
          onDoubleClick={handleTitleDoubleClick}
        >
          {isEditing ? (
            <form onSubmit={handleNameSubmit} className="flex-1">
              <input
                ref={titleInputRef}
                type="text"
                value={editName}
                onChange={handleNameChange}
                className="bg-gray-700 text-cyan-300 px-2 py-1 rounded w-full focus:outline-none focus:ring-1 focus:ring-cyan-500"
                autoFocus
                onBlur={handleNameSubmit}
              />
            </form>
          ) : (
            <div className="flex items-center space-x-2">
              <span className="font-mono text-sm truncate">{editor.name}</span>
              <button
                onClick={handleNameEdit}
                className="p-1 hover:bg-gray-700 rounded"
                title="Edit name"
              >
                <Edit3 size={14} />
              </button>
            </div>
          )}
          <div className="flex space-x-1">
            <button
              onClick={handleMinimize}
              className="p-1 hover:bg-gray-700 rounded"
              title="Minimize"
            >
              <Minus size={16} />
            </button>
            <button
              onClick={handleMaximize}
              className="p-1 hover:bg-gray-700 rounded"
              title={isMaximized ? "Restore" : "Maximize"}
            >
              <Maximize2 size={16} />
            </button>
            <button
              onClick={handleClose}
              className="p-1 hover:bg-red-600 rounded"
              title="Close"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="h-[calc(100%-36px)] relative">
          <Editor
            height="100%"
            language={editor.language}
            value={editor.content}
            onChange={handleEditorChange}
            theme="vs-dark"
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
            }}
          />
        </div>

        <div className="absolute top-0 right-0 bottom-0 w-2 cursor-e-resize"
             onMouseDown={(e) => startResize(e, 'e')} />
        <div className="absolute left-0 right-0 bottom-0 h-2 cursor-s-resize"
             onMouseDown={(e) => startResize(e, 's')} />
        <div className="absolute right-0 bottom-0 w-6 h-6 cursor-se-resize"
             onMouseDown={(e) => startResize(e, 'se')} />
        <div className="absolute left-0 bottom-0 w-6 h-6 cursor-sw-resize"
             onMouseDown={(e) => startResize(e, 'sw')} />
        <div className="absolute top-0 left-0 bottom-0 w-2 cursor-w-resize"
             onMouseDown={(e) => startResize(e, 'w')} />
        <div className="absolute top-0 left-0 right-0 h-2 cursor-n-resize"
             onMouseDown={(e) => startResize(e, 'n')} />
        <div className="absolute top-0 right-0 w-6 h-6 cursor-ne-resize"
             onMouseDown={(e) => startResize(e, 'ne')} />
        <div className="absolute top-0 left-0 w-6 h-6 cursor-nw-resize"
             onMouseDown={(e) => startResize(e, 'nw')} />
      </div>
    </Draggable>
  );
};

export default EditorWindow;