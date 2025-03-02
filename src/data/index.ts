import snippets from './snippets.json';
import actionNode from './nodes/action.json';
import anchorNode from './nodes/anchor.json';
import appNode from './nodes/app.json';

// Convert node documentation into snippets format
const convertNodeToSnippets = (node: any) => {
  return node.snippets.map((snippet: any) => ({
    ...snippet,
    category: node.title.toLowerCase(),
    nodeType: node.title,
    properties: node.properties || [],
    methods: node.methods || []
  }));
};

// Combine all snippets
const allSnippets = [
  ...snippets.snippets,
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