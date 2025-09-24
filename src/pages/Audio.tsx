import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Audio = () => {
  const audioProducts = [
    {
      id: "audio1",
      title: "AirPods Pro 2nd Gen",
      price: 199,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1588423771073-b8903fbb85b5?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 2340,
      discount: 20
    },
    {
      id: "audio2",
      title: "Sony WH-1000XM5 Headphones",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 1876,
      discount: 25
    },
    {
      id: "audio3",
      title: "JBL Portable Speaker",
      price: 89,
      originalPrice: 129,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 1234,
      discount: 31
    },
    {
      id: "audio4",
      title: "Gaming Headset RGB 7.1",
      price: 79,
      originalPrice: 119,
      image: "https://images.unsplash.com/photo-1599669454699-248893623440?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 892,
      discount: 34
    },
    {
      id: "audio5",
      title: "Wireless Earbuds Sport",
      price: 59,
      originalPrice: 89,
      image: "https://images.unsplash.com/photo-1590658165737-15a047b67cd5?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 756,
      discount: 34
    },
    {
      id: "audio6",
      title: "Studio Monitor Speakers",
      price: 299,
      originalPrice: 399,
      image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 432,
      discount: 25
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Audio</h1>
          <p className="text-muted-foreground">Premium sound experience for music lovers</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {audioProducts.map((product) => (
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

export default Audio;