import { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuCheckboxItem } from "@/components/ui/dropdown-menu";

export type SortOption = 'featured' | 'price-low' | 'price-high' | 'rating' | 'newest';

interface SearchFilterProps {
  currentSort: SortOption;
  onSortChange: (sort: SortOption) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  brands: string[];
  selectedBrands: string[];
  onBrandToggle: (brand: string) => void;
  productCount: number;
}

const sortOptions = [
  { value: 'featured' as const, label: 'Sort by: Featured' },
  { value: 'price-low' as const, label: 'Price: Low to High' },
  { value: 'price-high' as const, label: 'Price: High to Low' },
  { value: 'rating' as const, label: 'Customer Rating' },
  { value: 'newest' as const, label: 'Newest First' }
];

const SearchFilter = ({ 
  currentSort, 
  onSortChange, 
  searchQuery, 
  onSearchChange,
  brands,
  selectedBrands,
  onBrandToggle,
  productCount 
}: SearchFilterProps) => {
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  
  const selectedLabel = sortOptions.find(opt => opt.value === currentSort)?.label || 'Sort by: Featured';

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input 
          placeholder="Search products..." 
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="pl-10 bg-background"
        />
      </div>
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4 flex-wrap">
          <span className="text-sm text-muted-foreground">
            {productCount} products found
          </span>
          
          {brands.length > 0 && (
            <DropdownMenu open={isBrandOpen} onOpenChange={setIsBrandOpen}>
              <DropdownMenuTrigger asChild>
                <Button 
                  variant="outline" 
                  className="justify-between bg-background hover:bg-muted/50"
                >
                  <span className="text-sm">
                    Brand {selectedBrands.length > 0 && `(${selectedBrands.length})`}
                  </span>
                  <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-48 bg-background border border-border">
                {brands.map((brand) => (
                  <DropdownMenuCheckboxItem
                    key={brand}
                    checked={selectedBrands.includes(brand)}
                    onCheckedChange={() => onBrandToggle(brand)}
                    className="cursor-pointer"
                  >
                    {brand}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
        
        <DropdownMenu open={isSortOpen} onOpenChange={setIsSortOpen}>
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
                  setIsSortOpen(false);
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

export default SearchFilter;
