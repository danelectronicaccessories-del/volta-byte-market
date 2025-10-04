import { useState, useMemo } from 'react';
import { SortOption } from '@/components/SearchFilter';

export function useProductSearch<T extends { name: string; brand?: string | null; description?: string | null; price: number; rating?: number | null; is_featured?: boolean | null }>(
  products: T[]
) {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);

  // Get unique brands
  const brands = useMemo(() => {
    return Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[];
  }, [products]);

  // Filter products based on search and brand
  const filteredProducts = useMemo(() => {
    return products.filter(product => {
      const matchesSearch = searchQuery === '' || 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesBrand = selectedBrands.length === 0 || 
        (product.brand && selectedBrands.includes(product.brand));
      
      return matchesSearch && matchesBrand;
    });
  }, [products, searchQuery, selectedBrands]);

  // Sort products
  const sortedProducts = useMemo(() => {
    const sorted = [...filteredProducts];
    switch (sortBy) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => (b.rating || 0) - (a.rating || 0));
      case 'newest':
        return sorted.sort((a, b) => (b.is_featured ? 1 : 0) - (a.is_featured ? 1 : 0));
      default:
        return sorted;
    }
  }, [filteredProducts, sortBy]);

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) 
        ? prev.filter(b => b !== brand)
        : [...prev, brand]
    );
  };

  return {
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    selectedBrands,
    brands,
    handleBrandToggle,
    filteredProducts,
    sortedProducts,
  };
}
