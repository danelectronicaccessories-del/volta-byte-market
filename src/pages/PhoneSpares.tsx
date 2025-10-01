import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SortFilter, { SortOption } from "@/components/SortFilter";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const PhoneSpares = () => {
  const [spares, setSpares] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  useEffect(() => {
    const loadSpares = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'phone_spares');
        
        if (error) throw error;
        setSpares(data || []);
      } catch (error) {
        console.error('Error loading phone spares:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSpares();
  }, []);

  const sortProducts = (products: any[], sortOption: SortOption) => {
    const sorted = [...products];
    switch (sortOption) {
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
  };

  const sortedProducts = sortProducts(spares, sortBy);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Phone Spares & Accessories
            </h1>
            <p className="text-muted-foreground text-lg">
              Essential accessories and spare parts for your mobile devices
            </p>
          </div>

          {/* Filters & Sort */}
          {!loading && spares.length > 0 && (
            <div className="mb-8">
              <SortFilter 
                currentSort={sortBy}
                onSortChange={setSortBy}
                productCount={spares.length}
              />
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : spares.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No phone spares available</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.map((spare) => (
                <ProductCard 
                  key={spare.id} 
                  id={spare.id}
                  name={spare.name}
                  image={spare.image_url}
                  price={spare.price}
                  originalPrice={spare.original_price}
                  rating={spare.rating}
                  reviewCount={spare.review_count}
                  discount={spare.discount_percentage}
                  isNew={spare.is_featured}
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

export default PhoneSpares;