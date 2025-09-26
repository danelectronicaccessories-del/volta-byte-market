import { useState } from "react";
import Header from "@/components/Header";
import ProductCard from "@/components/ProductCard";
import Footer from "@/components/Footer";
import SortFilter, { SortOption } from "@/components/SortFilter";

const Laptops = () => {
  const [sortBy, setSortBy] = useState<SortOption>('featured');

  const laptops = [
    {
      id: "laptop1",
      title: "MacBook Pro 16-inch M3 Max",
      price: 2499,
      originalPrice: 2799,
      image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 1250,
      discount: 11
    },
    {
      id: "laptop2", 
      title: "Dell XPS 13 Plus Intel i7",
      price: 1299,
      originalPrice: 1599,
      image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 892,
      discount: 19
    },
    {
      id: "laptop3",
      title: "ASUS ROG Strix Gaming Laptop",
      price: 1899,
      originalPrice: 2199,
      image: "https://images.unsplash.com/photo-1603302576837-37561b2e2302?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 654,
      discount: 14
    },
    {
      id: "laptop4",
      title: "HP Spectre x360 2-in-1",
      price: 1199,
      originalPrice: 1399,
      image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 743,
      discount: 14
    },
    {
      id: "laptop5",
      title: "Lenovo ThinkPad X1 Carbon",
      price: 1799,
      originalPrice: 1999,
      image: "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 521,
      discount: 10
    },
    {
      id: "laptop6",
      title: "Surface Laptop Studio",
      price: 1599,
      originalPrice: 1799,
      image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 389,
      discount: 11
    }
  ];

  const sortProducts = (products: typeof laptops, sortOption: SortOption) => {
    const sorted = [...products];
    switch (sortOption) {
      case 'price-low':
        return sorted.sort((a, b) => a.price - b.price);
      case 'price-high':
        return sorted.sort((a, b) => b.price - a.price);
      case 'rating':
        return sorted.sort((a, b) => b.rating - a.rating);
      case 'newest':
        return sorted.sort((a, b) => (b.discount || 0) - (a.discount || 0));
      default:
        return sorted;
    }
  };

  const sortedLaptops = sortProducts(laptops, sortBy);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Laptops</h1>
          <p className="text-muted-foreground">Discover powerful laptops for work, gaming, and creativity</p>
        </div>

        <div className="mb-8">
          <SortFilter 
            currentSort={sortBy}
            onSortChange={setSortBy}
            productCount={laptops.length}
          />
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {sortedLaptops.map((laptop) => (
            <ProductCard 
              key={laptop.id} 
              id={laptop.id}
              name={laptop.title}
              image={laptop.image}
              price={laptop.price}
              originalPrice={laptop.originalPrice}
              rating={laptop.rating}
              reviewCount={laptop.reviews}
              discount={laptop.discount}
            />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Laptops;