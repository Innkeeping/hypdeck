export interface Position {
  x: number;
  y: number;
}

export interface EditorInstance {
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