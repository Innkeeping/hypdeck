import { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from '../../../store/categories';

export const useSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categorySearchTerm, setCategorySearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false); // Added this line

  // Reset snippet search when category changes
  useEffect(() => {
    setSearchTerm('');
  }, [selectedCategory]);

  const filteredCategories = useMemo(() => {
    if (!categorySearchTerm) return CATEGORIES;
    const searchLower = categorySearchTerm.toLowerCase();
    const filtered = CATEGORIES.filter(category =>
      category.name.toLowerCase().includes(searchLower) ||
      category.id.toLowerCase().includes(searchLower) ||
      (category.tag && category.tag.toLowerCase().includes(searchLower))
    );

    // Auto-select category if there's exactly one match
    if (filtered.length === 1 && categorySearchTerm.length > 0) {
      setSelectedCategory(filtered[0].id);
    } else if (categorySearchTerm === '' && filtered.length === CATEGORIES.length) {
      setSelectedCategory(null);
    }

    return filtered;
  }, [categorySearchTerm]);

  const handleClearCategorySearch = () => {
    setCategorySearchTerm('');
    setSelectedCategory(null);
  };

  return {
    searchTerm,
    setSearchTerm,
    categorySearchTerm,
    setCategorySearchTerm,
    selectedCategory,
    setSelectedCategory,
    filteredCategories,
    handleClearCategorySearch,
    isCategoryDropdownOpen,
    setIsCategoryDropdownOpen,
  };
};