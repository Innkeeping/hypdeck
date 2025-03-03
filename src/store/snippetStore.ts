import { create } from 'zustand';
import { CodeSnippet, NodeProperty, NodeMethod } from '../types';
import { nanoid } from '../utils/nanoid';
import { allSnippetsData, nodesData } from '../data';
import { CATEGORIES } from './categories';

interface SnippetStore {
  snippets: CodeSnippet[];
  nodes: Record<string, {
    title: string;
    description: string;
    properties?: NodeProperty[];
    methods?: NodeMethod[];
    snippets: CodeSnippet[];
  }>;
  categories: typeof CATEGORIES;
  addSnippet: (snippet: Omit<CodeSnippet, 'id'>) => void;
  removeSnippet: (id: string) => void;
  updateSnippet: (id: string, updates: Partial<CodeSnippet>) => void;
  getSnippetsByTag: (tag: string) => CodeSnippet[];
  getSnippetsByCategory: (categoryId: string) => CodeSnippet[];
  getNodeDocs: (nodeName: string) => any;
}

export const useSnippetStore = create<SnippetStore>()((set, get) => ({
  snippets: allSnippetsData,
  nodes: nodesData,
  categories: CATEGORIES,

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

  getSnippetsByCategory: (categoryId) => {
    return get().snippets.filter(snippet => snippet.category === categoryId);
  },

  getNodeDocs: (nodeName) => {
    return get().nodes[nodeName.toLowerCase()];
  }
}));