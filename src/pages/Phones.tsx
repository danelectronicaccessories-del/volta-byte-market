import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SearchFilter from "@/components/SearchFilter";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";
import { useProductSearch } from "@/hooks/useProductSearch";

const Phones = () => {
  const [phones, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadPhones = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'phones');
        
        if (error) throw error;
        setPhones(data || []);
      } catch (error) {
        console.error('Error loading phones:', error);
      } finally {
        setLoading(false);
      }
    };

    loadPhones();
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
  } = useProductSearch(phones);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Phones
            </h1>
            <p className="text-muted-foreground text-lg">
              Discover the latest smartphones with cutting-edge technology
            </p>
          </div>

          {/* Filters & Sort */}
          {!loading && phones.length > 0 && (
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
            <p className="text-center text-muted-foreground py-12">
              {searchQuery || selectedBrands.length > 0 
                ? "No phones found matching your filters" 
                : "No phones available"}
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((phone) => (
                <ProductCard 
                  key={phone.id} 
                  id={phone.id}
                  name={phone.name}
                  image={phone.image_url}
                  price={phone.price}
                  originalPrice={phone.original_price}
                  rating={phone.rating}
                  reviewCount={phone.review_count}
                  discount={phone.discount_percentage}
                  isNew={phone.is_featured}
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

export default Phones;