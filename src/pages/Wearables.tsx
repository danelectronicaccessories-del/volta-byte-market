import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Wearables = () => {
  const [wearables, setWearables] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadWearables = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'wearables');
        
        if (error) throw error;
        setWearables(data || []);
      } catch (error) {
        console.error('Error loading wearables:', error);
      } finally {
        setLoading(false);
      }
    };

    loadWearables();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wearables</h1>
          <p className="text-muted-foreground">Stay connected with smart wearable technology</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : wearables.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No wearables available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {wearables.map((wearable) => (
              <ProductCard 
                key={wearable.id} 
                id={wearable.id}
                name={wearable.name}
                image={wearable.image_url}
                price={wearable.price}
                originalPrice={wearable.original_price}
                rating={wearable.rating}
                reviewCount={wearable.review_count}
                discount={wearable.discount_percentage}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Wearables;