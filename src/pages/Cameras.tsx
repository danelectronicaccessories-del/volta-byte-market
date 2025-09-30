import { useEffect, useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Loader2 } from "lucide-react";

const Cameras = () => {
  const [cameras, setCameras] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadCameras = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('category', 'cameras');
        
        if (error) throw error;
        setCameras(data || []);
      } catch (error) {
        console.error('Error loading cameras:', error);
      } finally {
        setLoading(false);
      }
    };

    loadCameras();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cameras</h1>
          <p className="text-muted-foreground">Capture life's moments with professional gear</p>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
          </div>
        ) : cameras.length === 0 ? (
          <p className="text-center text-muted-foreground py-12">No cameras available</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {cameras.map((camera) => (
              <ProductCard 
                key={camera.id} 
                id={camera.id}
                name={camera.name}
                image={camera.image_url}
                price={camera.price}
                originalPrice={camera.original_price}
                rating={camera.rating}
                reviewCount={camera.review_count}
                discount={camera.discount_percentage}
              />
            ))}
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Cameras;