import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

interface SortFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  productCount: number;
}

const sortOptions = [
  { value: 'featured' as const, label: 'Sort by: Featured' },
  { value: 'price-low' as const, label: 'Price: Low to High' },
  { value: 'price-high' as const, label: 'Price: High to Low' },
  { value: 'rating' as const, label: 'Customer Rating' },
  { value: 'newest' as const, label: 'Newest First' }
];

const SortFilter = ({ currentSort, onSortChange, productCount }: SortFilterProps) => {
  const [isOpen, setIsOpen] = useState(false);
  
  const selectedLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort by: Featured';

  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
      <div className="flex items-center gap-4">
        <span className="text-sm text-muted-foreground">
          {productCount} products found
        </span>
      </div>
      <div className="flex items-center gap-4">
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="outline" 
              className="w-48 justify-between bg-background hover:bg-muted/50"
            >
              <span className="text-sm">{selectedLabel}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 bg-background border border-border">
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.value}
                onClick={() => {
                  onSortChange(option.value);
                  setIsOpen(false);
                }}
                className={`cursor-pointer hover:bg-muted ${
                  currentSort === option.value 
                    ? 'bg-primary/10 text-primary font-medium' 
                    : 'text-foreground'
                }`}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default SortFilter;