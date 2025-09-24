import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";

// Mock phone products data
const phoneProducts = [
  {
    id: "phone-1",
    name: "iPhone 15 Pro Max 256GB - Natural Titanium",
    image: "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=400&h=400&fit=crop",
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: 2341,
    discount: 25,
    isNew: true
  },
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra 512GB - Phantom Black",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 799.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviewCount: 1892,
    discount: 20
  },
  {
    id: "phone-3",
    name: "Google Pixel 8 Pro 128GB - Bay Blue",
    image: "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=400&h=400&fit=crop",
    price: 649.99,
    originalPrice: 799.99,
    rating: 4.6,
    reviewCount: 1456,
    discount: 19
  },
  {
    id: "phone-4",
    name: "OnePlus 12 256GB - Flowy Emerald",
    image: "https://images.unsplash.com/photo-1574944985070-8f3ebc6b79d2?w=400&h=400&fit=crop",
    price: 549.99,
    originalPrice: 699.99,
    rating: 4.5,
    reviewCount: 987,
    discount: 21
  },
  {
    id: "phone-5",
    name: "Xiaomi 14 Ultra 512GB - Black",
    image: "https://images.unsplash.com/photo-1512499617640-c2f999c82a52?w=400&h=400&fit=crop",
    price: 459.99,
    originalPrice: 599.99,
    rating: 4.4,
    reviewCount: 756,
    discount: 23
  },
  {
    id: "phone-6",
    name: "Nothing Phone (2) 256GB - Dark Grey",
    image: "https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?w=400&h=400&fit=crop",
    price: 399.99,
    rating: 4.3,
    reviewCount: 542,
    isNew: true
  }
];

const Phones = () => {
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
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">
                {phoneProducts.length} products found
              </span>
            </div>
            <div className="flex items-center gap-4">
              <select className="px-3 py-2 bg-muted border border-border rounded-md text-sm">
                <option>Sort by: Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Customer Rating</option>
                <option>Newest First</option>
              </select>
            </div>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {phoneProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Phones;