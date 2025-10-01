import { useEffect, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SortFilter, { SortOption } from "@/components/SortFilter";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Phones = () => {
  const [phones, setPhones] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<SortOption>('featured');

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

  const sortedProducts = sortProducts(phones, sortBy);

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
              <SortFilter 
                currentSort={sortBy}
                onSortChange={setSortBy}
                productCount={phones.length}
              />
            </div>
          )}

          {/* Product Grid */}
          {loading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : phones.length === 0 ? (
            <p className="text-center text-muted-foreground py-12">No phones available</p>
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