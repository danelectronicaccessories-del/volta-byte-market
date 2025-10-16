import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const categories = [
  "Phones & Accessories",
  "Laptops & Computers",
  "TVs & Audio",
  "Cameras",
  "Gaming",
  "Smart Devices",
  "Wearables",
  "Fridges & Appliances",
  "Phone Spares",
  "Accessories",
];

const CategoryCarousel = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="bg-background border-b border-border">
      <div className="container mx-auto px-4 py-4">
        <div className="relative flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('left')}
            className="flex-shrink-0 h-8 w-8 rounded-full bg-card shadow-sm hover:shadow-md"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <div 
            ref={scrollContainerRef}
            className="flex gap-2 overflow-x-auto scrollbar-hide scroll-smooth"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {categories.map((category) => (
              <button
                key={category}
                className="flex-shrink-0 px-5 py-2 rounded-full border border-border bg-card hover:border-primary hover:text-primary transition-colors text-sm font-medium whitespace-nowrap"
              >
                {category}
              </button>
            ))}
          </div>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll('right')}
            className="flex-shrink-0 h-8 w-8 rounded-full bg-card shadow-sm hover:shadow-md"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCarousel;