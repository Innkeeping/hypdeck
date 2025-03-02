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
}

export interface CodeSnippet {
  id: string;
  name: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
}

// This is needed if your EditorWindow component uses EditorInstance
export type EditorInstance = Editor;