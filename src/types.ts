export interface EditorInstance {
  id: string;
  name: string;
  content: string;
  language: string;
  position: {
    x: number;
    y: number;
  };
  zIndex: number;
  width: number;
  height: number;
  isActive: boolean;
  isMinimized: boolean;
}