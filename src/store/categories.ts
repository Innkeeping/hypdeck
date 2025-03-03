export const CATEGORIES = [
  // App related categories
  { id: 'app-configure', name: 'app.configure', tag: 'configure' },
  { id: 'app-events', name: 'App.Events', tag: 'app-events' },
  { id: 'app-state', name: 'App.State', tag: 'app-state' },

  // Base node categories (referencing the base node.json)
  { id: 'node-basic', name: 'Node.Basic', tag: 'node' },  // Changed tag to 'node' to match baseNode
  { id: 'node-transform', name: 'Node.Transform', tag: 'node-transform' },
  { id: 'node-animation', name: 'Node.Animation', tag: 'node-animation' },

  // Node type specific categories
  { id: 'node-action', name: 'Node.Action', tag: 'action' },
  { id: 'node-anchor', name: 'Node.Anchor', tag: 'anchor' },
  { id: 'node-app', name: 'Node.App', tag: 'app' },
  { id: 'node-audio', name: 'Node.Audio', tag: 'audio' },
  { id: 'node-avatar', name: 'Node.Avatar', tag: 'avatar' },
  { id: 'node-collider', name: 'Node.Collider', tag: 'collider' },
  { id: 'node-rigidbody', name: 'Node.Rigidbody', tag: 'rigidbody' },
  { id: 'node-lod', name: 'Node.LOD', tag: 'lod' },
  { id: 'node-material', name: 'Node.Material', tag: 'material' },
  { id: 'node-mesh', name: 'Node.Mesh', tag: 'mesh' },
  { id: 'node-num', name: 'Node.Num', tag: 'num' },
  { id: 'node-group', name: 'Node.Group', tag: 'group' },
  { id: 'node-player', name: 'Node.Player', tag: 'player' },
  { id: 'node-ui', name: 'Node.UI', tag: 'ui' },
  { id: 'node-uiview', name: 'Node.UIView', tag: 'uiview' },
  { id: 'node-uitext', name: 'Node.UIText', tag: 'uitext' },
  { id: 'node-world', name: 'Node.World', tag: 'world' }
];