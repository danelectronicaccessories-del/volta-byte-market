import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Gaming = () => {
  const gamingProducts = [
    {
      id: "gaming1",
      title: "PlayStation 5 Console",
      price: 499,
      originalPrice: 599,
      image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 3240,
      discount: 17
    },
    {
      id: "gaming2",
      title: "Xbox Series X Controller",
      price: 59,
      originalPrice: 79,
      image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1876,
      discount: 25
    },
    {
      id: "gaming3",
      title: "Gaming Mechanical Keyboard",
      price: 129,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 1234,
      discount: 28
    },
    {
      id: "gaming4",
      title: "Gaming Mouse 16000 DPI",
      price: 69,
      originalPrice: 99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 892,
      discount: 30
    },
    {
      id: "gaming5",
      title: "Gaming Chair RGB Pro",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 756,
      discount: 25
    },
    {
      id: "gaming6",
      title: "VR Headset Meta Quest 3",
      price: 399,
      originalPrice: 499,
      image: "https://images.unsplash.com/photo-1593508512255-86ab42a8e620?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 1032,
      discount: 20
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Gaming</h1>
          <p className="text-muted-foreground">Level up your gaming experience</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {gamingProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              id={product.id}
              name={product.title}
              image={product.image}
              price={product.price}
              originalPrice={product.originalPrice}
              rating={product.rating}
              reviewCount={product.reviews}
              discount={product.discount}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Gaming;