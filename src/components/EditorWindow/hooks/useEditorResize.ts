import { useState } from 'react';
import { useEditorStore } from '../../../store/editorStore';
import type { EditorInstance } from '../../../types';

export const useEditorResize = (editor: EditorInstance) => {
  const { updateEditor } = useEditorStore();
  const [isResizing, setIsResizing] = useState(false);

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

  return {
    isResizing,
    startResize
  };
};