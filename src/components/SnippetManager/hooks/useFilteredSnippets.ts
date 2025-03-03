import { useMemo } from 'react';
import { useSnippetStore } from '../../../store/snippetStore';
import { CATEGORIES } from '../../../store/categories';
import type { CodeSnippet } from '../types';

interface FilteredSnippetsProps {
  searchTerm: string;
  selectedTags: string[];
  selectedCategory: string | null;
}

export const useFilteredSnippets = ({ searchTerm, selectedTags, selectedCategory }: FilteredSnippetsProps) => {
  const { snippets } = useSnippetStore();

  return useMemo(() => {
    return snippets.filter(snippet => {
      const categoryTag = selectedCategory
        ? CATEGORIES.find(c => c.id === selectedCategory)?.tag
        : null;
      const matchesCategory = !categoryTag || snippet.tags.includes(categoryTag);

      if (!matchesCategory) return false;

      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchTerm === '' ||
        snippet.name.toLowerCase().includes(searchLower) ||
        snippet.description.toLowerCase().includes(searchLower) ||
        snippet.tags.some(tag => tag.toLowerCase().includes(searchLower));

      const matchesTags = selectedTags.length === 0 ||
        selectedTags.every(tag => snippet.tags.includes(tag));

      return matchesSearch && matchesTags;
    });
  }, [snippets, searchTerm, selectedTags, selectedCategory]);
};