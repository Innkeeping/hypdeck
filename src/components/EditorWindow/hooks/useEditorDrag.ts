import { DraggableData, DraggableEvent } from 'react-draggable';
import { useEditorStore } from '../../../store/editorStore';
import type { EditorInstance } from '../../../types';

export const useEditorDrag = (editor: EditorInstance) => {
  const { updateEditor, bringToFront } = useEditorStore();

  const handleDrag = (_e: DraggableEvent, data: DraggableData) => {
    const containerWidth = window.innerWidth;
    const maxX = containerWidth - editor.width;
    const boundedX = Math.max(0, Math.min(maxX, data.x));

    const minY = 0;
    const viewportHeight = window.innerHeight - 64;
    const maxY = viewportHeight - editor.height;
    const boundedY = Math.max(minY, Math.min(maxY, data.y));

    updateEditor(editor.id, {
      position: { x: boundedX, y: boundedY }
    });
  };

  const handleDragStop = (_e: DraggableEvent, data: DraggableData) => {
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

  return {
    handleDrag,
    handleDragStop
  };
};