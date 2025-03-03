import { useState, useCallback, useRef } from 'react';
import { useEditorStore } from '../../../store/editorStore';
import type { EditorInstance } from '../../../types';

export const useEditorResize = (editor: EditorInstance) => {
  const { updateEditor } = useEditorStore();
  const [isResizing, setIsResizing] = useState(false);
  const resizeInfoRef = useRef<{
    startX: number;
    startY: number;
    startWidth: number;
    startHeight: number;
    startLeft: number;
    startTop: number;
    direction: string;
  } | null>(null);

  const handleMouseMove = useCallback((moveEvent: MouseEvent) => {
    if (!resizeInfoRef.current) return;

    moveEvent.preventDefault();
    moveEvent.stopPropagation();

    const {
      startX,
      startY,
      startWidth,
      startHeight,
      startLeft,
      startTop,
      direction
    } = resizeInfoRef.current;

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
    const containerHeight = window.innerHeight;
    const maxX = containerWidth - newWidth;
    const maxY = containerHeight - newHeight;

    newLeft = Math.max(0, Math.min(maxX, newLeft));
    newTop = Math.max(0, Math.min(maxY, newTop));

    requestAnimationFrame(() => {
      updateEditor(editor.id, {
        width: newWidth,
        height: newHeight,
        position: { x: newLeft, y: newTop }
      });
    });
  }, [editor.id, updateEditor]);

  const handleMouseUp = useCallback(() => {
    setIsResizing(false);
    resizeInfoRef.current = null;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  const startResize = useCallback((e: React.MouseEvent, direction: string) => {
    e.preventDefault();
    e.stopPropagation();

    setIsResizing(true);

    resizeInfoRef.current = {
      startX: e.clientX,
      startY: e.clientY,
      startWidth: editor.width,
      startHeight: editor.height,
      startLeft: editor.position.x,
      startTop: editor.position.y,
      direction
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  }, [editor, handleMouseMove, handleMouseUp]);

  return {
    isResizing,
    startResize
  };
};