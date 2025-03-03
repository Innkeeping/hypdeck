import type { DraggableData, DraggableEvent } from 'react-draggable';
import type { EditorInstance } from '../../types';

export interface EditorWindowProps {
  editor: EditorInstance;
}

export interface TitleBarProps {
  editor: EditorInstance;
  isEditing: boolean;
  editName: string;
  isMaximized: boolean;
  onNameSubmit: (e: React.FormEvent) => void;
  onNameEdit: (e: React.MouseEvent) => void;
  onNameChange: (name: string) => void;
  onMinimize: (e: React.MouseEvent) => void;
  onMaximize: (e: React.MouseEvent) => void;
  onClose: (e: React.MouseEvent) => void;
  onTitleDoubleClick: () => void;
}

export interface ResizeHandleProps {
  direction: 'n' | 's' | 'e' | 'w' | 'ne' | 'nw' | 'se' | 'sw';
  onResizeStart: (e: React.MouseEvent, direction: string) => void;
}

export interface Position {
  x: number;
  y: number;
}

export interface DragCallbacks {
  onDrag: (e: DraggableEvent, data: DraggableData) => void;
  onStop: (e: DraggableEvent, data: DraggableData) => void;
}