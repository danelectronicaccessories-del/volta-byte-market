import ProductCard from "./ProductCard";

// Mock product data - in real app this would come from API/database
const products = [
  {
    id: "1",
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
    id: "2", 
    name: "MacBook Air M2 13-inch - Midnight",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
    price: 1099.99,
    originalPrice: 1399.99,
    rating: 4.9,
    reviewCount: 1876,
    discount: 21
  },
  {
    id: "3",
    name: "Sony WH-1000XM5 Wireless Noise Canceling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    price: 279.99,
    originalPrice: 399.99,
    rating: 4.7,
    reviewCount: 3421,
    discount: 30,
    isFavorite: true
  },
  {
    id: "4",
    name: "Samsung Galaxy Tab S9 Ultra 12.4 inch - Graphite",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop",
    price: 899.99,
    rating: 4.6,
    reviewCount: 892
  },
  {
    id: "5",
    name: "Nintendo Switch OLED Model - Neon Red/Blue",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400&h=400&fit=crop",
    price: 299.99,
    originalPrice: 349.99,
    rating: 4.8,
    reviewCount: 5632,
    discount: 14
  },
  {
    id: "6",
    name: "Apple Watch Series 9 GPS 45mm - Midnight Aluminum",
    image: "https://images.unsplash.com/photo-1434494878577-86c23bcb06b9?w=400&h=400&fit=crop",
    price: 399.99,
    rating: 4.5,
    reviewCount: 1234,
    isNew: true
  },
  {
    id: "7",
    name: "Canon EOS R8 Mirrorless Camera Body",
    image: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=400&h=400&fit=crop",
    price: 1299.99,
    originalPrice: 1599.99,
    rating: 4.7,
    reviewCount: 567,
    discount: 19
  },
  {
    id: "8",
    name: "Razer DeathAdder V3 Pro Wireless Gaming Mouse",
    image: "https://images.unsplash.com/photo-1527814050087-3793815479db?w=400&h=400&fit=crop",
    price: 129.99,
    originalPrice: 159.99,
    rating: 4.6,
    reviewCount: 892,
    discount: 19
  }
];

const ProductGrid = () => {
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
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
        
        <div className="text-center mt-8">
          <button className="text-primary hover:text-primary/80 font-medium transition-smooth">
            View All Products →
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;