import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Cameras = () => {
  const cameras = [
    {
      id: "camera1",
      title: "Canon EOS R6 Mark II",
      price: 2399,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 432,
      discount: 14
    },
    {
      id: "camera2",
      title: "Sony A7 IV Mirrorless",
      price: 2199,
      originalPrice: 2499,
      image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 567,
      discount: 12
    },
    {
      id: "camera3",
      title: "GoPro Hero 12 Black",
      price: 349,
      originalPrice: 449,
      image: "https://images.unsplash.com/photo-1540979388789-6cee28a1cdc9?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 1234,
      discount: 22
    },
    {
      id: "camera4",
      title: "DJI Pocket 2 Creator Combo",
      price: 429,
      originalPrice: 529,
      image: "https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 892,
      discount: 19
    },
    {
      id: "camera5",
      title: "Fujifilm X-T5 Body",
      price: 1599,
      originalPrice: 1899,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 345,
      discount: 16
    },
    {
      id: "camera6",
      title: "Ring Light LED 18 inch",
      price: 89,
      originalPrice: 129,
      image: "https://images.unsplash.com/photo-1588421357574-87938a86fa28?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 756,
      discount: 31
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Cameras</h1>
          <p className="text-muted-foreground">Capture life's moments with professional gear</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {cameras.map((camera) => (
            <ProductCard 
              key={camera.id} 
              id={camera.id}
              name={camera.title}
              image={camera.image}
              price={camera.price}
              originalPrice={camera.originalPrice}
              rating={camera.rating}
              reviewCount={camera.reviews}
              discount={camera.discount}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cameras;