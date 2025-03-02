import { create } from 'zustand';
import { CodeSnippet } from '../types';
import { nanoid } from '../utils/nanoid';

interface SnippetStore {
  snippets: CodeSnippet[];
  addSnippet: (snippet: Omit<CodeSnippet, 'id'>) => void;
  removeSnippet: (id: string) => void;
  updateSnippet: (id: string, updates: Partial<CodeSnippet>) => void;
  getSnippetsByTag: (tag: string) => CodeSnippet[];
}

export const useSnippetStore = create<SnippetStore>((set, get) => ({
  snippets: [
    {
      id: nanoid(),
      name: 'Text Input Configuration',
      description: 'Configure a text input field',
      code: `  {
    key: 'textField',
    type: 'text',
    label: 'Text Input',
    placeholder: 'Enter text here',
    initial: 'Default text'
  }`,
      language: 'javascript',
      tags: ['configure', 'text', 'input']
    },
    {
      id: nanoid(),
      name: 'Textarea Configuration',
      description: 'Configure a multi-line textarea input',
      code: `  {
    key: 'textareaField',
    type: 'textarea',
    label: 'Textarea Input',
    placeholder: 'Enter multiple lines here',
    initial: 'Default text'
  }`,
      language: 'javascript',
      tags: ['configure', 'textarea', 'input']
    },
    {
      id: nanoid(),
      name: 'Number Input Configuration',
      description: 'Configure a number input with math entry and stepping',
      code: `  {
    key: 'numberField',
    type: 'number',
    label: 'Number Input',
    dp: 2,
    min: 0,
    max: 100,
    step: 0.5,
    initial: 50
  }`,
      language: 'javascript',
      tags: ['configure', 'number', 'input']
    },
    {
      id: nanoid(),
      name: 'Range Slider Configuration',
      description: 'Configure a range slider input',
      code: `  {
    key: 'rangeField',
    type: 'range',
    label: 'Range Slider',
    min: 0,
    max: 100,
    step: 5,
    initial: 50
  }`,
      language: 'javascript',
      tags: ['configure', 'range', 'slider']
    },
    {
      id: nanoid(),
      name: 'Switch Configuration',
      description: 'Configure a switch input with multiple options',
      code: `  {
    key: 'switchField',
    type: 'switch',
    label: 'Switch Input',
    options: [
      {
        label: 'Option 1',
        value: 'opt1'
      },
      {
        label: 'Option 2',
        value: 'opt2'
      },
      {
        label: 'Option 3',
        value: 'opt3'
      }
    ],
    initial: 'opt1'
  }`,
      language: 'javascript',
      tags: ['configure', 'switch', 'input']
    },
    {
      id: nanoid(),
      name: 'Dropdown Configuration',
      description: 'Configure a dropdown menu with options',
      code: `  {
    key: 'dropdownField',
    type: 'dropdown',
    label: 'Dropdown Menu',
    options: [
      {
        label: 'Option 1',
        value: 'opt1'
      },
      {
        label: 'Option 2',
        value: 'opt2'
      },
      {
        label: 'Option 3',
        value: 'opt3'
      }
    ],
    initial: 'opt1'
  }`,
      language: 'javascript',
      tags: ['configure', 'dropdown', 'input']
    },
    {
      id: nanoid(),
      name: 'File Upload Configuration',
      description: 'Configure a file upload field',
      code: `  {
    key: 'fileField',
    type: 'file',
    label: 'File Upload',
    kind: 'avatar' // can be: avatar, emote, model, texture, hdr, audio
  }`,
      language: 'javascript',
      tags: ['configure', 'file', 'upload']
    },
    {
      id: nanoid(),
      name: 'Section Configuration',
      description: 'Configure a section header to group fields',
      code: `  {
    type: 'section',
    key: 'sectionName',
    label: 'Section Header'
  }`,
      language: 'javascript',
      tags: ['configure', 'section', 'layout']
    },
    {
      id: nanoid(),
      name: 'App Configure Wrapper',
      description: 'Base wrapper for app configuration',
      code: `app.configure([
  // Add configuration items here
])`,
      language: 'javascript',
      tags: ['configure', 'wrapper']
    }
  ],

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
  }
}));