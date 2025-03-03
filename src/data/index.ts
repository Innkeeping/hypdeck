import { NodeMethod, NodeProperty, CodeSnippet } from '../types';
import { CATEGORIES } from '../store/categories';
import snippets from './snippets.json';
import actionNode from './nodes/action.json';
import anchorNode from './nodes/anchor.json';
import appNode from './nodes/app.json';
import audioNode from './nodes/audio.json';
import avatarNode from './nodes/avatar.json';
import colliderNode from './nodes/collider.json';
import rigidbodyNode from './nodes/rigidbody.json';
import lodNode from './nodes/lod.json';
import materialNode from './nodes/material.json';
import meshNode from './nodes/mesh.json';
import numMethod from './nodes/num.json';
import groupNode from './nodes/group.json';
import playerNode from './nodes/player.json';
import uiNode from './nodes/ui.json';
import uiviewNode from './nodes/uiview.json';
import uitextNode from './nodes/uitext.json';
import worldNode from './nodes/world.json';
import baseNode from './nodes/node.json';

// Define interfaces for raw data
interface RawMethod {
  name: string;
  description: string;
  parameters?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  arguments?: Array<{
    name: string;
    type: string;
    description: string;
  }>;
  returns?: string | {
    type: string;
    description: string;
  };
}

interface RawNodeData {
  title: string;
  description: string;
  properties?: NodeProperty[];
  methods?: RawMethod[];
  snippets: Array<{
    id: string;
    name: string;
    description: string;
    code: string;
    language: string;
    tags: string[];
  }>;
}

// Helper functions
const getCategoryId = (nodeType: string): string => {
  if (nodeType === 'Node') {
    return 'node-basic';
  }
  return `node-${nodeType.toLowerCase()}`;
};

const isAppCategory = (tag: string): boolean => {
  return tag.startsWith('app-') || tag === 'configure';
};

// Helper function to convert method format
function convertMethodFormat(method: RawMethod): NodeMethod {
  const params = method.parameters || method.arguments || [];
  const paramString = params.map(p => `${p.name}: ${p.type}`).join(', ');
  const returnType = method.returns
    ? `: ${typeof method.returns === 'string' ? method.returns : method.returns.type}`
    : '';

  return {
    name: method.name,
    description: method.description,
    signature: `${method.name}(${paramString})${returnType}`
  };
}

// Type guard to ensure node data conforms to expected format
function isValidNodeData(node: any): node is RawNodeData {
  return (
    typeof node === 'object' &&
    typeof node.title === 'string' &&
    typeof node.description === 'string' &&
    Array.isArray(node.snippets) &&
    (!node.properties || Array.isArray(node.properties)) &&
    (!node.methods || Array.isArray(node.methods))
  );
}

// Convert node documentation into snippets format
const convertNodeToSnippets = (node: RawNodeData): CodeSnippet[] => {
  const categoryId = getCategoryId(node.title);
  const convertedMethods = node.methods ? node.methods.map(convertMethodFormat) : [];

  return node.snippets.map((snippet) => ({
    ...snippet,
    category: categoryId,
    nodeType: node.title,
    properties: node.properties || [],
    methods: convertedMethods,
    tags: [...new Set([...snippet.tags, node.title.toLowerCase()])]
  }));
};

// Helper to safely convert node data
const safeConvertNode = (node: any): CodeSnippet[] => {
  if (!isValidNodeData(node)) {
    console.warn(`Invalid node data for ${node?.title || 'unknown node'}`);
    return [];
  }
  return convertNodeToSnippets(node);
};

// Add category information to original snippets
const categorizedSnippets = snippets.snippets.map((snippet: any) => {
  if (snippet.tags.includes('configure')) {
    return {
      ...snippet,
      category: 'app-configure',
      tags: snippet.tags.filter((tag: string) => !tag.startsWith('node-'))
    };
  }

  const category = CATEGORIES.find(cat =>
    snippet.tags.includes(cat.tag) &&
    (cat.id.startsWith('app-') === snippet.tags.some(isAppCategory))
  );

  return {
    ...snippet,
    category: category ? category.id : 'uncategorized',
    tags: snippet.tags
  };
});

// Combine all snippets
const allSnippets = [
  ...categorizedSnippets,
  ...safeConvertNode(baseNode),
  ...safeConvertNode(actionNode),
  ...safeConvertNode(anchorNode),
  ...safeConvertNode(appNode),
  ...safeConvertNode(audioNode),
  ...safeConvertNode(avatarNode),
  ...safeConvertNode(colliderNode),
  ...safeConvertNode(rigidbodyNode),
  ...safeConvertNode(lodNode),
  ...safeConvertNode(materialNode),
  ...safeConvertNode(meshNode),
  ...safeConvertNode(numMethod),
  ...safeConvertNode(groupNode),
  ...safeConvertNode(playerNode),
  ...safeConvertNode(uiNode),
  ...safeConvertNode(uiviewNode),
  ...safeConvertNode(uitextNode),
  ...safeConvertNode(worldNode)
];

// Export interface for processed node data
interface NodeData {
  title: string;
  description: string;
  properties?: NodeProperty[];
  methods?: NodeMethod[];
  snippets: CodeSnippet[];
}

// Export combined data with proper type checking
export const nodesData: Record<string, NodeData> = Object.fromEntries(
  Object.entries({
    action: actionNode,
    anchor: anchorNode,
    app: appNode,
    audio: audioNode,
    avatar: avatarNode,
    collider: colliderNode,
    rigidbody: rigidbodyNode,
    lod: lodNode,
    material: materialNode,
    mesh: meshNode,
    num: numMethod,
    group: groupNode,
    node: baseNode,
    player: playerNode,
    ui: uiNode,
    uiview: uiviewNode,
    uitext: uitextNode,
    world: worldNode
  } as Record<string, RawNodeData>)
  .filter(([_, node]) => isValidNodeData(node))
  .map(([key, node]) => [
    key,
    {
      ...node,
      methods: node.methods?.map(convertMethodFormat)
    }
  ])
);

export const allSnippetsData: CodeSnippet[] = allSnippets;