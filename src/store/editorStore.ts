import { create } from 'zustand';
import { v4 as uuidv4 } from 'uuid';
import { persist } from 'zustand/middleware';
import type { Editor, Position } from '../types';

type EditorUpdates = Partial<Editor>;

export const useEditorStore = create<{
  editors: Editor[];
  addEditor: () => void;
  removeEditor: (id: string) => void;
  updateEditor: (id: string, updates: EditorUpdates) => void;
  updateEditorContent: (id: string, content: string) => void;
  updateEditorName: (id: string, name: string) => void;
  appendToEditor: (id: string, content: string) => void;
  minimizeEditor: (id: string) => void;
  maximizeEditor: (id: string) => void;
  bringToFront: (id: string) => void;
  restoreEditor: (id: string) => void;
  setActiveEditor: (id: string) => void;
}>()(
  persist(
    (set) => ({
      editors: [{
        id: uuidv4(),
        name: 'Terminal 1',
        content: '',
        language: 'typescript',
        position: { x: 0, y: 0 },
        zIndex: 1,
        width: 600,
        height: 400,
        isActive: true,
        isMinimized: false
      }],

      addEditor: () =>
        set((state) => {
          const newEditorNumber = state.editors.length + 1;
          return {
            editors: [
              ...state.editors,
              {
                id: uuidv4(),
                name: `Terminal ${newEditorNumber}`,
                content: '',
                language: 'typescript',
                position: { x: 20 * newEditorNumber, y: 20 * newEditorNumber },
                zIndex: state.editors.length + 1,
                width: 600,
                height: 400,
                isActive: true,
                isMinimized: false
              },
            ],
          };
        }),

      removeEditor: (id: string) =>
        set((state) => ({
          editors: state.editors.filter((editor) => editor.id !== id),
        })),

      updateEditor: (id: string, updates: EditorUpdates) =>
        set((state) => ({
          editors: state.editors.map((editor) =>
            editor.id === id
              ? { ...editor, ...updates, isActive: true }
              : { ...editor, isActive: false }
          ),
        })),

      updateEditorContent: (id: string, content: string) =>
        set((state) => ({
          editors: state.editors.map((editor) =>
            editor.id === id ? { ...editor, content } : editor
          ),
        })),

      updateEditorName: (id: string, name: string) =>
        set((state) => ({
          editors: state.editors.map((editor) =>
            editor.id === id ? { ...editor, name } : editor
          ),
        })),

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

      minimizeEditor: (id: string) =>
        set((state) => ({
          editors: state.editors.map((editor) =>
            editor.id === id ? { ...editor, isMinimized: true } : editor
          ),
        })),

      maximizeEditor: (id: string) =>
        set((state) => ({
          editors: state.editors.map((editor) =>
            editor.id === id ? { ...editor, isMinimized: false } : editor
          ),
        })),

      bringToFront: (id: string) =>
        set((state) => {
          const maxZIndex = Math.max(...state.editors.map(e => e.zIndex));
          return {
            editors: state.editors.map((editor) =>
              editor.id === id
                ? { ...editor, zIndex: maxZIndex + 1, isActive: true }
                : { ...editor, isActive: false }
            ),
          };
        }),
        restoreEditor: (id) => set((state) => ({
          editors: state.editors.map((editor) =>
            editor.id === id ? { ...editor, isMinimized: false } : editor
          )
        })),
        setActiveEditor: (id) => set((state) => {
          const maxZIndex = Math.max(...state.editors.map(e => e.zIndex));
          return {
            editors: state.editors.map((editor) =>
              editor.id === id
                ? { ...editor, isActive: true, zIndex: maxZIndex + 1 }
                : { ...editor, isActive: false }
            )
          };
        }),
    }),
    {
      name: 'editor-storage',
      partialize: (state) => ({
        editors: state.editors,
      }),
    }
  )
);