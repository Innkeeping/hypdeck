export interface Position {
  x: number;
  y: number;
}

export interface Editor {
  id: string;
  name: string;
  content: string;
  language: string;
  position: Position;
  zIndex: number;
  width: number;
  height: number;
  isActive: boolean;
  isMinimized: boolean;
  shouldFocus: boolean;
}

export interface CodeSnippet {
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

export interface NodeProperty {
  name: string;
  type: string;
  description: string;
  required?: boolean;
  readonly?: boolean;
  default?: any;
}

export interface NodeMethod {
  name: string;
  signature: string;
  description: string;
}

// This is needed if your EditorWindow component uses EditorInstance
export type EditorInstance = Editor;