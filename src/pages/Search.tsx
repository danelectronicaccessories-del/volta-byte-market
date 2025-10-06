import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SearchFilter from "@/components/SearchFilter";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useProductSearch } from "@/hooks/useProductSearch";

const Search = () => {
  const [searchParams] = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAllProducts = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from('products')
          .select('*');
        
        if (error) throw error;
        setProducts(data || []);
      } catch (error) {
        console.error('Error loading products:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAllProducts();
  }, []);

  const {
    sortBy,
    setSortBy,
    searchQuery,
    setSearchQuery,
    selectedBrands,
    brands,
    handleBrandToggle,
    filteredProducts,
    sortedProducts,
  } = useProductSearch(products);

  // Set initial search query from URL
  useEffect(() => {
    if (initialQuery) {
      setSearchQuery(initialQuery);
    }
  }, [initialQuery, setSearchQuery]);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Search Results
            </h1>
            {searchQuery && (
              <p className="text-muted-foreground text-lg">
                Showing results for "{searchQuery}"
              </p>
            )}
          </div>

          {/* Filters & Sort */}
          {!loading && products.length > 0 && (
            <div className="mb-8">
              <SearchFilter 
                currentSort={sortBy}
                onSortChange={setSortBy}
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                brands={brands}
                selectedBrands={selectedBrands}
                onBrandToggle={handleBrandToggle}
                productCount={filteredProducts.length}
              />
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-lg mb-4">
                {searchQuery || selectedBrands.length > 0 
                  ? "No products found matching your search" 
                  : "Start searching to find products"}
              </p>
              <p className="text-muted-foreground text-sm">
                Try different keywords or browse our categories
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  id={product.id}
                  name={product.name}
                  image={product.image_url}
                  price={product.price}
                  originalPrice={product.original_price}
                  rating={product.rating}
                  reviewCount={product.review_count}
                  discount={product.discount_percentage}
                  isNew={product.is_featured}
                />
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Search;
