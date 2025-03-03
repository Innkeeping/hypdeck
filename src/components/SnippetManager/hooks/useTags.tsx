import { useState, useMemo } from 'react';
import { useSnippetStore } from '../../../store/snippetStore';

export const useTags = () => {
  const { snippets } = useSnippetStore();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);

  const allTags = useMemo(() =>
    Array.from(new Set(snippets.flatMap(snippet => snippet.tags)))
  , [snippets]);

  const toggleTag = (tag: string): void => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    );
  };

  return {
    selectedTags,
    isTagDropdownOpen,
    setIsTagDropdownOpen,
    allTags,
    toggleTag,
  };
};