// Update NodeMethod interface to match your types.ts
interface NodeMethod {
  name: string;
  signature: string;  // Changed from parameters/returns to match your type
  description: string;
}

interface NodeProperty {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  readonly?: boolean;
  default?: any;
}

interface NodeSnippet {
  id: string;
  name: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
  category?: string;
  nodeType?: string;
  properties?: NodeProperty[];
  methods?: NodeMethod[];
}

// Helper function to convert method format
function convertMethodFormat(method: any): NodeMethod {
  return {
    name: method.name,
    description: method.description,
    // Create signature string from parameters and returns
    signature: `${method.name}(${(method.parameters || method.arguments || [])
      .map((p: any) => `${p.name}: ${p.type}`).join(', ')})${
      method.returns ? `: ${typeof method.returns === 'string' ? method.returns : method.returns.type}` : ''
    }`
  };
}

// Convert node documentation into snippets format
const convertNodeToSnippets = (node: any): NodeSnippet[] => {
  const categoryId = getCategoryId(node.title);

  // Convert methods to match your NodeMethod interface
  const convertedMethods = node.methods?.map(convertMethodFormat);

  return node.snippets.map((snippet: any) => {
    const nodeTags = snippet.tags.filter((tag: string) => !isAppCategory(tag));

    return {
      ...snippet,
      category: categoryId,
      nodeType: node.title,
      properties: node.properties || [],
      methods: convertedMethods || [],
      tags: [...new Set([...nodeTags, node.title.toLowerCase()])]
    };
  });
};

// Rest of your code remains the same...

// Type guard to ensure node data conforms to expected format
function isValidNodeData(node: any): boolean {
  return (
    typeof node === 'object' &&
    typeof node.title === 'string' &&
    typeof node.description === 'string' &&
    Array.isArray(node.snippets) &&
    (!node.properties || Array.isArray(node.properties)) &&
    (!node.methods || Array.isArray(node.methods))
  );
}

// Helper to safely convert node data
const safeConvertNode = (node: any): NodeSnippet[] => {
  if (!isValidNodeData(node)) {
    console.warn(`Invalid node data for ${node?.title || 'unknown node'}`);
    return [];
  }
  return convertNodeToSnippets(node);
};

// Export combined data with proper type checking
export const nodesData: Record<string, {
  title: string;
  description: string;
  properties?: NodeProperty[];
  methods?: NodeMethod[];
  snippets: NodeSnippet[];
}> = Object.fromEntries(
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
  }).filter(([_, node]) => isValidNodeData(node))
  .map(([key, node]) => [
    key,
    {
      ...node,
      methods: node.methods?.map(convertMethodFormat)
    }
  ])
);

export const allSnippetsData: NodeSnippet[] = allSnippets;