import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import SortFilter, { SortOption } from "@/components/SortFilter";

// Mock phone spares products data
const phoneSpareProducts = [
  {
    id: "spare-1",
    name: "iPhone 15 Pro Max Tempered Glass Screen Protector",
    image: "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=400&h=400&fit=crop",
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviewCount: 834,
    discount: 35
  },
  {
    id: "spare-2",
    name: "Samsung Galaxy S24 Ultra Silicone Case - Black",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 567,
    discount: 38
  },
  {
    id: "spare-3",
    name: "USB-C Fast Charging Cable 2M - White",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    price: 8.99,
    originalPrice: 14.99,
    rating: 4.7,
    reviewCount: 1234,
    discount: 40
  },
  {
    id: "spare-4",
    name: "Wireless Charger Pad 15W - Black",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.4,
    reviewCount: 423,
    discount: 33
  },
  {
    id: "spare-5",
    name: "Phone Ring Holder Stand - Rose Gold",
    image: "https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop",
    price: 5.99,
    originalPrice: 9.99,
    rating: 4.3,
    reviewCount: 789,
    discount: 40
  },
  {
    id: "spare-6",
    name: "Car Phone Mount Magnetic Dashboard",
    image: "https://images.unsplash.com/photo-1568702846914-96b305d2aaeb?w=400&h=400&fit=crop",
    price: 15.99,
    originalPrice: 24.99,
    rating: 4.5,
    reviewCount: 345,
    discount: 36,
    isNew: true
  },
  {
    id: "spare-7",
    name: "Bluetooth Earbuds Case Protective Cover",
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7de01?w=400&h=400&fit=crop",
    price: 7.99,
    originalPrice: 12.99,
    rating: 4.2,
    reviewCount: 234,
    discount: 38
  },
  {
    id: "spare-8",
    name: "Phone Camera Lens Protector Set",
    image: "https://images.unsplash.com/photo-1616410011236-7a42121dd981?w=400&h=400&fit=crop",
    price: 9.99,
    originalPrice: 16.99,
    rating: 4.6,
    reviewCount: 456,
    discount: 41
  }
];

const PhoneSpares = () => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const sortProducts = (products: typeof phoneSpareProducts, sortOption: SortOption) => {
    const sorted = [...products];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
      default:
        return sorted;
    }
  };

  const sortedProducts = sortProducts(phoneSpareProducts, sortBy);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Page Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Phone Spares & Accessories
            </h1>
            <p className="text-muted-foreground text-lg">
              Essential accessories and spare parts for your mobile devices
            </p>
          </div>

          {/* Filters & Sort */}
          <div className="mb-8">
            <SortFilter 
              currentSort={sortBy}
              onSortChange={setSortBy}
              productCount={phoneSpareProducts.length}
            />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} {...product} />
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PhoneSpares;