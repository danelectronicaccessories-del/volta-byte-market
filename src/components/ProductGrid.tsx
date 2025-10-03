import { useState, useEffect } from "react";
import ProductCard from "./ProductCard";
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
}

const ProductGrid = () => {
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
      .eq('is_featured', true)
      .order('discount_percentage', { ascending: false });
    
    if (error) {
      console.error('Error loading featured products:', error);
    } else {
      setProducts(data || []);
    }
    setLoading(false);
  };

  return (
    <section className="py-12 bg-background">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-3xl font-bold text-foreground mb-2">
              Flash Sale
            </h2>
            <p className="text-muted-foreground">
              Limited time offers on electronics
            </p>
          </div>
          
          <div className="text-right">
            <div className="text-sm text-muted-foreground mb-1">Ends in:</div>
            <div className="text-xl font-bold text-sale">
              23:45:12
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map((product) => (
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
            
            <div className="text-center mt-8">
              <button className="text-primary hover:text-primary/80 font-medium transition-smooth">
                View All Products →
              </button>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;