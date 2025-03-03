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
    category: category ? category.id : 'uncategorized'
  };
});

// Combine all snippets
const allSnippets = [
  ...categorizedSnippets,
  ...convertNodeToSnippets(actionNode),
  ...convertNodeToSnippets(anchorNode),
  ...convertNodeToSnippets(appNode),
  ...convertNodeToSnippets(audioNode),
  ...convertNodeToSnippets(avatarNode),
  ...convertNodeToSnippets(colliderNode),
  ...convertNodeToSnippets(rigidbodyNode),
  ...convertNodeToSnippets(lodNode),
  ...convertNodeToSnippets(materialNode),
  ...convertNodeToSnippets(meshNode),
  ...convertNodeToSnippets(numMethod),
  ...convertNodeToSnippets(groupNode),
  ...convertNodeToSnippets(baseNode),
  ...convertNodeToSnippets(playerNode),
  ...convertNodeToSnippets(uiNode),
  ...convertNodeToSnippets(uiviewNode),
  ...convertNodeToSnippets(uitextNode),
  ...convertNodeToSnippets(worldNode)
];

// Export combined data
export const nodesData = {
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
};

export const allSnippetsData = allSnippets;