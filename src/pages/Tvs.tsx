import { useState, useEffect } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import SearchFilter, { SortOption } from "@/components/SearchFilter";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

interface Product {
  id: string;
  name: string;
  price: number;
  original_price: number | null;
  image_url: string | null;
  rating: number;
  review_count: number;
  discount_percentage: number;
  brand: string | null;
}

const Tvs = () => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('category', 'tvs');
    
    if (error) {
      console.error('Error loading TVs:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  const brands = Array.from(new Set(products.map(p => p.brand).filter(Boolean))) as string[];

  const handleBrandToggle = (brand: string) => {
    setSelectedBrands(prev => 
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
    );
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesBrand = selectedBrands.length === 0 || (product.brand && selectedBrands.includes(product.brand));
    return matchesSearch && matchesBrand;
  });

  const sortProducts = (products: Product[], sortOption: SortOption) => {
    const sorted = [...products];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.discount_percentage || 0) - (a.discount_percentage || 0));
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(filteredProducts, sortBy);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">TVs & Displays</h1>
          <p className="text-muted-foreground">Smart TVs, monitors, and display solutions</p>
        </div>

        <div className="mb-8">
          <SearchFilter 
            currentSort={sortBy}
            onSortChange={setSortBy}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            brands={brands}
            selectedBrands={selectedBrands}
            onBrandToggle={handleBrandToggle}
            productCount={sortedProducts.length}
          />
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No TVs available</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {sortedProducts.map((product) => (
              <ProductCard 
                key={product.id} 
                id={product.id}
                name={product.name}
                image={product.image_url || ""}
                price={product.price}
                originalPrice={product.original_price || undefined}
                rating={product.rating}
                reviewCount={product.review_count}
                discount={product.discount_percentage}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Tvs;
