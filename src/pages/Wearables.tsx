import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Wearables = () => {
  const wearables = [
    {
      id: "wearable1",
      title: "Apple Watch Series 9 GPS",
      price: 329,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1579586337278-3f436f25d4d6?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 2340,
      discount: 18
    },
    {
      id: "wearable2",
      title: "Samsung Galaxy Watch 6",
      price: 279,
      originalPrice: 329,
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 1876,
      discount: 15
    },
    {
      id: "wearable3",
      title: "Fitbit Charge 6",
      price: 159,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 1234,
      discount: 20
    },
    {
      id: "wearable4",
      title: "Meta Ray-Ban Smart Glasses",
      price: 299,
      originalPrice: 379,
      image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 456,
      discount: 21
    },
    {
      id: "wearable5",
      title: "Oura Ring Gen 3",
      price: 249,
      originalPrice: 299,
      image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 789,
      discount: 17
    },
    {
      id: "wearable6",
      title: "Garmin Vivosmart 5",
      price: 129,
      originalPrice: 169,
      image: "https://images.unsplash.com/photo-1551698618-1dfe5d97d256?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 623,
      discount: 24
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Wearables</h1>
          <p className="text-muted-foreground">Stay connected with smart wearable technology</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {wearables.map((wearable) => (
            <ProductCard 
              key={wearable.id} 
              id={wearable.id}
              name={wearable.title}
              image={wearable.image}
              price={wearable.price}
              originalPrice={wearable.originalPrice}
              rating={wearable.rating}
              reviewCount={wearable.reviews}
              discount={wearable.discount}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Wearables;