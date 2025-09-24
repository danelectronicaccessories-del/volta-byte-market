import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const Accessories = () => {
  const accessories = [
    {
      id: "acc1",
      title: "Wireless Charging Pad 15W",
      price: 29,
      originalPrice: 39,
      image: "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 892,
      discount: 26
    },
    {
      id: "acc2",
      title: "USB-C Hub 7-in-1",
      price: 49,
      originalPrice: 69,
      image: "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 1205,
      discount: 29
    },
    {
      id: "acc3",
      title: "Bluetooth Mouse RGB",
      price: 25,
      originalPrice: 35,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 645,
      discount: 29
    },
    {
      id: "acc4",
      title: "Mechanical Keyboard RGB",
      price: 89,
      originalPrice: 129,
      image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 743,
      discount: 31
    },
    {
      id: "acc5",
      title: "Phone Stand Adjustable",
      price: 15,
      originalPrice: 25,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      rating: 4.2,
      reviews: 521,
      discount: 40
    },
    {
      id: "acc6",
      title: "Cable Organizer Set",
      price: 12,
      originalPrice: 19,
      image: "https://images.unsplash.com/photo-1572894549-b7b2d2ada9b4?w=400&h=400&fit=crop",
      rating: 4.1,
      reviews: 389,
      discount: 37
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Accessories</h1>
          <p className="text-muted-foreground">Essential tech accessories to enhance your devices</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {accessories.map((accessory) => (
            <ProductCard 
              key={accessory.id} 
              id={accessory.id}
              name={accessory.title}
              image={accessory.image}
              price={accessory.price}
              originalPrice={accessory.originalPrice}
              rating={accessory.rating}
              reviewCount={accessory.reviews}
              discount={accessory.discount}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Accessories;