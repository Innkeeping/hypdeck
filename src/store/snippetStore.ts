import { create } from 'zustand';
import { CodeSnippet } from '../types';
import { nanoid } from '../utils/nanoid';
import allSnippets from '../data';
import { nodesData } from '../data';

interface SnippetStore {
  snippets: CodeSnippet[];
  nodes: Record<string, any>;
  addSnippet: (snippet: Omit<CodeSnippet, 'id'>) => void;
  removeSnippet: (id: string) => void;
  updateSnippet: (id: string, updates: Partial<CodeSnippet>) => void;
  getSnippetsByTag: (tag: string) => CodeSnippet[];
  getNodeDocs: (nodeName: string) => any;
}

export const useSnippetStore = create<SnippetStore>((set, get) => ({
  snippets: allSnippets,
  nodes: nodesData,

  addSnippet: (snippetData) => {
    set((state) => ({
      snippets: [...state.snippets, { ...snippetData, id: nanoid() }]
    }));
  },

  removeSnippet: (id) => {
    set((state) => ({
      snippets: state.snippets.filter(snippet => snippet.id !== id)
    }));
  },

  updateSnippet: (id, updates) => {
    set((state) => ({
      snippets: state.snippets.map(snippet =>
        snippet.id === id ? { ...snippet, ...updates } : snippet
      )
    }));
  },

  getSnippetsByTag: (tag) => {
    return get().snippets.filter(snippet => snippet.tags.includes(tag));
  },

  getNodeDocs: (nodeName) => {
    return get().nodes[nodeName.toLowerCase()];
  }
}));