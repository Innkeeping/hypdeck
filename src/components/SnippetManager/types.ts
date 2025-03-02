

export interface ActionDialogState {
  snippetCode: string;
  editorId: string;
}

export interface CodeSnippet {
  id: string;
  name: string;
  description: string;
  code: string;
  language: string;
  tags: string[];
}

export interface SnippetManagerProps {
  onClose: () => void;
}