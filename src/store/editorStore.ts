import { create } from 'zustand';
import { EditorInstance } from '../types';
import { nanoid } from '../utils/nanoid';

interface EditorStore {
  editors: EditorInstance[];
  activeEditorId: string | null;
  maxZIndex: number;
  addEditor: () => void;
  removeEditor: (id: string) => void;
  updateEditor: (id: string, updates: Partial<EditorInstance>) => void;
  setActiveEditor: (id: string) => void;
  updateEditorContent: (id: string, content: string) => void;
  updateEditorName: (id: string, name: string) => void;
  bringToFront: (id: string) => void;
  minimizeEditor: (id: string) => void;
  restoreEditor: (id: string) => void;
  getMinimizedEditors: () => EditorInstance[];
}

export const useEditorStore = create<EditorStore>((set, get) => ({
  editors: [],
  activeEditorId: null,
  maxZIndex: 0,
  
  addEditor: () => set((state) => {
    const newZIndex = state.maxZIndex + 1;
    const newEditor: EditorInstance = {
      id: nanoid(),
      name: `Terminal ${state.editors.length + 1}`,
      content: '// Start coding here',
      language: 'javascript',
      position: {
        x: 50 + (state.editors.length * 20),
        y: 50 + (state.editors.length * 20),
      },
      zIndex: newZIndex,
      width: 600,
      height: 400,
      isActive: true,
      isMinimized: false,
    };
    
    return {
      editors: [...state.editors.map(e => ({ ...e, isActive: false })), newEditor],
      activeEditorId: newEditor.id,
      maxZIndex: newZIndex,
    };
  }),
  
  removeEditor: (id) => set((state) => ({
    editors: state.editors.filter((editor) => editor.id !== id),
    activeEditorId: state.activeEditorId === id ? null : state.activeEditorId,
  })),
  
  updateEditor: (id, updates) => set((state) => ({
    editors: state.editors.map((editor) => 
      editor.id === id ? { ...editor, ...updates } : editor
    ),
  })),
  
  setActiveEditor: (id) => set((state) => ({
    editors: state.editors.map((editor) => ({
      ...editor,
      isActive: editor.id === id,
    })),
    activeEditorId: id,
  })),
  
  updateEditorContent: (id, content) => set((state) => ({
    editors: state.editors.map((editor) => 
      editor.id === id ? { ...editor, content } : editor
    ),
  })),
  
  updateEditorName: (id, name) => set((state) => ({
    editors: state.editors.map((editor) => 
      editor.id === id ? { ...editor, name } : editor
    ),
  })),
  
  bringToFront: (id) => set((state) => {
    const newZIndex = state.maxZIndex + 1;
    return {
      editors: state.editors.map((editor) => 
        editor.id === id ? { ...editor, zIndex: newZIndex, isActive: true } : { ...editor, isActive: false }
      ),
      activeEditorId: id,
      maxZIndex: newZIndex,
    };
  }),

  minimizeEditor: (id) => set((state) => ({
    editors: state.editors.map((editor) => 
      editor.id === id ? { ...editor, isMinimized: true } : editor
    ),
  })),

  restoreEditor: (id) => set((state) => ({
    editors: state.editors.map((editor) => 
      editor.id === id ? { ...editor, isMinimized: false } : editor
    ),
  })),

  getMinimizedEditors: () => {
    return get().editors.filter(editor => editor.isMinimized);
  },
}));