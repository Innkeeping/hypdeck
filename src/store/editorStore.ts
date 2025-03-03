import create from 'zustand';
import { nanoid } from 'nanoid';
import type { Editor } from '../types';

interface EditorStore {
  editors: Editor[];
  addEditor: () => void;
  removeEditor: (id: string) => void;
  updateEditor: (id: string, updates: Partial<Editor>) => void;
  updateEditorContent: (id: string, content: string) => void;
  appendToEditor: (id: string, content: string) => void;
  updateEditorName: (id: string, name: string) => void;
  minimizeEditor: (id: string) => void;
  restoreEditor: (id: string) => void;
  setActiveEditor: (id: string) => void;
  bringToFront: (id: string) => void;
}

const CASCADE_OFFSET = 30;
const INITIAL_POSITION = { x: 20, y: 20 };

const findNextPosition = (editors: Editor[]) => {
  const nonMinimizedEditors = editors.filter(e => !e.isMinimized);

  if (nonMinimizedEditors.length === 0) {
    return INITIAL_POSITION;
  }

  const existingPositions = nonMinimizedEditors.map(e => e.position);
  let nextPosition = { ...INITIAL_POSITION };

  // Keep cascading until we find an unused position
  while (existingPositions.some(pos =>
    pos.x === nextPosition.x && pos.y === nextPosition.y
  )) {
    nextPosition = {
      x: nextPosition.x + CASCADE_OFFSET,
      y: nextPosition.y + CASCADE_OFFSET
    };
  }

  // Check if we're too far from the initial position, if so, reset to a position near the start
  if (nextPosition.x > window.innerWidth - 200 || nextPosition.y > window.innerHeight - 200) {
    nextPosition = {
      x: INITIAL_POSITION.x + CASCADE_OFFSET,
      y: INITIAL_POSITION.y + CASCADE_OFFSET
    };
  }

  return nextPosition;
};

export const useEditorStore = create<EditorStore>((set) => ({
  editors: [],

  addEditor: () => set((state) => {
    const maxZIndex = Math.max(0, ...state.editors.map(e => e.zIndex));
    const terminalNumber = state.editors.length + 1;
    const position = findNextPosition(state.editors);

    const newEditor: Editor = {
      id: nanoid(),
      name: `Terminal${terminalNumber}`,
      content: '',
      language: 'typescript',
      position,
      width: 600,
      height: 400,
      zIndex: maxZIndex + 1,
      isActive: true,
      isMinimized: false,
      shouldFocus: true
    };
    return {
      editors: state.editors.map(e => ({ ...e, isActive: false })).concat(newEditor)
    };
  }),

  removeEditor: (id: string) => set((state) => ({
    editors: state.editors.filter((editor) => editor.id !== id)
  })),

  updateEditor: (id: string, updates: Partial<Editor>) => set((state) => ({
    editors: state.editors.map((editor) =>
      editor.id === id ? { ...editor, ...updates } : editor
    )
  })),

  updateEditorContent: (id: string, content: string) => set((state) => {
    const editor = state.editors.find(e => e.id === id);
    if (!editor) return state;

    // If content includes both configure and other code, ensure configure is first
    const contentLines = content.trim().split('\n');
    const configureIndex = contentLines.findIndex(line => line.includes('app.configure'));

    let finalContent = content;
    if (configureIndex > 0) {
      // Configure exists but isn't first, reorder it
      const beforeConfig = contentLines.slice(0, configureIndex).join('\n');
      const configBlock = contentLines.slice(configureIndex).join('\n');
      finalContent = `${configBlock}\n\n${beforeConfig}`;
    }

    return {
      editors: state.editors.map((ed) =>
        ed.id === id
          ? {
              ...ed,
              content: finalContent.trim(),
              shouldFocus: true
            }
          : ed
      )
    };
  }),

  updateEditorName: (id: string, name: string) => set((state) => ({
    editors: state.editors.map((editor) =>
      editor.id === id ? { ...editor, name } : editor
    )
  })),

  minimizeEditor: (id: string) => set((state) => ({
    editors: state.editors.map((editor) =>
      editor.id === id ? { ...editor, isMinimized: true, isActive: false } : editor
    )
  })),

  restoreEditor: (id: string) => set((state) => {
    const maxZIndex = Math.max(0, ...state.editors.map(e => e.zIndex));
    const editorToRestore = state.editors.find(e => e.id === id);

    if (!editorToRestore) return state;

    // Check if any non-minimized editor occupies the position
    const isPositionOccupied = state.editors.some(e =>
      !e.isMinimized &&
      e.id !== id &&
      e.position.x === editorToRestore.position.x &&
      e.position.y === editorToRestore.position.y
    );

    const position = isPositionOccupied
      ? findNextPosition(state.editors)
      : editorToRestore.position;

    return {
      editors: state.editors.map((editor) =>
        editor.id === id
          ? {
              ...editor,
              isMinimized: false,
              zIndex: maxZIndex + 1,
              isActive: true,
              shouldFocus: true,
              position
            }
          : { ...editor, isActive: false }
      )
    };
  }),

  appendToEditor: (id: string, content: string) =>
    set((state) => ({
      editors: state.editors.map((editor) =>
        editor.id === id
          ? {
              ...editor,
              content: editor.content
                ? `${editor.content}\n${content}`
                : content,
            }
          : editor
      ),
    })),

  setActiveEditor: (id: string) => set((state) => {
    const maxZIndex = Math.max(0, ...state.editors.map(e => e.zIndex));
    return {
      editors: state.editors.map((editor) =>
        editor.id === id
          ? { ...editor, isActive: true, zIndex: maxZIndex + 1 }
          : { ...editor, isActive: false }
      )
    };
  }),

  bringToFront: (id: string) => set((state) => {
    const maxZIndex = Math.max(0, ...state.editors.map(e => e.zIndex));
    return {
      editors: state.editors.map((editor) =>
        editor.id === id
          ? {
              ...editor,
              zIndex: maxZIndex + 1,
              isActive: true,
              shouldFocus: true
            }
          : { ...editor, isActive: false }
      )
    };
  }),
}));

export default useEditorStore;