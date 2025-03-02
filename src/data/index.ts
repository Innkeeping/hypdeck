import { CATEGORIES } from '../store/categories';
import snippets from './snippets.json';
import actionNode from './nodes/action.json';
import anchorNode from './nodes/anchor.json';
import appNode from './nodes/app.json';

// Helper to get category ID from node type
const getCategoryId = (nodeType: string): string => {
  return `node-${nodeType.toLowerCase()}`;
};

// Convert node documentation into snippets format
const convertNodeToSnippets = (node: any) => {
  const categoryId = getCategoryId(node.title);

  return node.snippets.map((snippet: any) => ({
    ...snippet,
    category: categoryId,
    nodeType: node.title,
    properties: node.properties || [],
    methods: node.methods || [],
    // Ensure tags include both original tags and the node type tag
    tags: [...new Set([...snippet.tags, node.title.toLowerCase()])]
  }));
};

// Add category information to original snippets
const categorizedSnippets = snippets.snippets.map((snippet: any) => {
  const category = CATEGORIES.find(cat => snippet.tags.includes(cat.tag));
  return {
    ...snippet,
    category: category?.id || 'uncategorized'
  };
});

// Combine all snippets
const allSnippets = [
  ...categorizedSnippets,
  ...convertNodeToSnippets(actionNode),
  ...convertNodeToSnippets(anchorNode),
  ...convertNodeToSnippets(appNode)
];

// Export combined data
export const nodesData = {
  action: actionNode,
  anchor: anchorNode,
  app: appNode
};

export default allSnippets;