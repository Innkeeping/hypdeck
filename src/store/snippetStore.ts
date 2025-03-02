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
    // app.configure category
    {
      id: nanoid(),
      name: 'App Configure Wrapper',
      description: 'Base wrapper for app configuration',
      code: `app.configure([
  // Add configuration items here
])`,
      language: 'javascript',
      tags: ['configure', 'wrapper']
    },
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

    // Node.Basic category
    {
      id: nanoid(),
      name: 'Create Node',
      description: 'Create a new node',
      code: `const newNode = app.create('NewNode');`,
      language: 'javascript',
      tags: ['node-basic', 'create']
    },
    {
      id: nanoid(),
      name: 'Add Child Node',
      description: 'Add a node as a child of another node',
      code: `parentNode.add(childNode);`,
      language: 'javascript',
      tags: ['node-basic', 'hierarchy']
    },
    {
      id: nanoid(),
      name: 'Remove Child Node',
      description: 'Remove a child node',
      code: `parentNode.remove(childNode);`,
      language: 'javascript',
      tags: ['node-basic', 'hierarchy']
    },
    {
      id: nanoid(),
      name: 'Get Node By ID',
      description: 'Find a node using its ID',
      code: `const node = app.get('NodeId');`,
      language: 'javascript',
      tags: ['node-basic', 'utility']
    },
    {
      id: nanoid(),
      name: 'Traverse Nodes',
      description: 'Traverse through all child nodes',
      code: `node.traverse((child) => {
  // Do something with each child node
  console.log(child.id);
});`,
      language: 'javascript',
      tags: ['node-basic', 'traverse']
    },

    // Node.Transform category
    {
      id: nanoid(),
      name: 'Set Position',
      description: 'Set node position using Vector3',
      code: `node.position.set(0, 0, 0); // x, y, z`,
      language: 'javascript',
      tags: ['node-transform', 'position']
    },
    {
      id: nanoid(),
      name: 'Set Rotation (Euler)',
      description: 'Set node rotation using Euler angles',
      code: `node.rotation.set(0, 0, 0); // x, y, z in radians`,
      language: 'javascript',
      tags: ['node-transform', 'rotation']
    },
    {
      id: nanoid(),
      name: 'Set Rotation (Quaternion)',
      description: 'Set node rotation using Quaternion',
      code: `node.quaternion.set(0, 0, 0, 1); // x, y, z, w`,
      language: 'javascript',
      tags: ['node-transform', 'rotation']
    },
    {
      id: nanoid(),
      name: 'Set Scale',
      description: 'Set node scale using Vector3',
      code: `node.scale.set(1, 1, 1); // x, y, z`,
      language: 'javascript',
      tags: ['node-transform', 'scale']
    },

    // App.Events category
    {
      id: nanoid(),
      name: 'Update Event',
      description: 'Subscribe to frame update event',
      code: `const onUpdate = () => {
  // Called every frame
};
app.on('update', onUpdate);

// Cleanup when done
// app.off('update', onUpdate);`,
      language: 'javascript',
      tags: ['app-events', 'update']
    },
    {
      id: nanoid(),
      name: 'Fixed Update Event',
      description: 'Subscribe to fixed update event (physics)',
      code: `const onFixedUpdate = () => {
  // Called at fixed time intervals
};
app.on('fixedUpdate', onFixedUpdate);

// Cleanup when done
// app.off('fixedUpdate', onFixedUpdate);`,
      language: 'javascript',
      tags: ['app-events', 'physics']
    },
    {
      id: nanoid(),
      name: 'Network Event',
      description: 'Send and receive network events',
      code: `// Send event
app.send('customEvent', { data: 'someData' });

// Receive event
const onCustomEvent = (data) => {
  console.log('Received:', data);
};
app.on('customEvent', onCustomEvent);

// Cleanup when done
// app.off('customEvent', onCustomEvent);`,
      language: 'javascript',
      tags: ['app-events', 'network']
    },

    // App.State category
    {
      id: nanoid(),
      name: 'Initialize State',
      description: 'Set up initial app state',
      code: `app.state = {
  gameState: 'lobby',
  players: [],
  score: 0
};`,
      language: 'javascript',
      tags: ['app-state', 'initialize']
    },
    {
      id: nanoid(),
      name: 'Update State',
      description: 'Update app state properties',
      code: `// Update simple property
app.state.gameState = 'playing';

// Update array
app.state.players.push({
  id: app.instanceId,
  name: 'Player'
});`,
      language: 'javascript',
      tags: ['app-state', 'update']
    },

    // Node.Animation category
    {
      id: nanoid(),
      name: 'Rotate Animation',
      description: 'Continuously rotate a node',
      code: `const onUpdate = () => {
  node.rotation.y += 0.01;
};
app.on('update', onUpdate);

// Cleanup when done
// app.off('update', onUpdate);`,
      language: 'javascript',
      tags: ['node-animation', 'rotation']
    },
    {
      id: nanoid(),
      name: 'Oscillate Position',
      description: 'Make a node oscillate up and down',
      code: `const onUpdate = () => {
  node.position.y = Math.sin(Date.now() * 0.001) * 0.5;
};
app.on('update', onUpdate);

// Cleanup when done
// app.off('update', onUpdate);`,
      language: 'javascript',
      tags: ['node-animation', 'position']
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