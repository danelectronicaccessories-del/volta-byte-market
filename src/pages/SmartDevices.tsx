import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";

const SmartDevices = () => {
  const smartDevices = [
    {
      id: "smart1",
      title: "Smart Home Hub Assistant",
      price: 99,
      originalPrice: 149,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 1120,
      discount: 34
    },
    {
      id: "smart2",
      title: "Smart Security Camera 4K",
      price: 79,
      originalPrice: 119,
      image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 856,
      discount: 34
    },
    {
      id: "smart3",
      title: "Smart Door Lock Fingerprint",
      price: 189,
      originalPrice: 249,
      image: "https://images.unsplash.com/photo-1586953983027-d7508edec0c5?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 432,
      discount: 24
    },
    {
      id: "smart4",
      title: "Smart Light Bulbs RGB Set",
      price: 45,
      originalPrice: 65,
      image: "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 923,
      discount: 31
    },
    {
      id: "smart5",
      title: "Smart Thermostat WiFi",
      price: 129,
      originalPrice: 179,
      image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa1?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 654,
      discount: 28
    },
    {
      id: "smart6",
      title: "Smart Doorbell HD Video",
      price: 159,
      originalPrice: 199,
      image: "https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 378,
      discount: 20
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Smart Devices</h1>
          <p className="text-muted-foreground">Transform your home with intelligent automation</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {smartDevices.map((device) => (
            <ProductCard 
              key={device.id} 
              id={device.id}
              name={device.title}
              image={device.image}
              price={device.price}
              originalPrice={device.originalPrice}
              rating={device.rating}
              reviewCount={device.reviews}
              discount={device.discount}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SmartDevices;