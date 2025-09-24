import { useState } from "react";
import { Search, ShoppingCart, User, Menu, Heart, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Phones", href: "/phones" },
    { name: "Phone Spares", href: "/phone-spares" },
    { name: "Laptops", href: "#" },
    { name: "Accessories", href: "#" },
    { name: "Smart Devices", href: "#" },
    { name: "Audio", href: "#" },
    { name: "Gaming", href: "#" },
    { name: "Cameras", href: "#" },
    { name: "Wearables", href: "#" }
  ];

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      {/* Top banner */}
      <div className="bg-gradient-sale py-2">
        <div className="container mx-auto px-4">
          <p className="text-center text-sale-foreground text-sm font-medium">
            🔥 Flash Sale: Up to 70% OFF Electronics | Free Shipping on orders over $50
          </p>
        </div>
      </div>
      
      {/* Main header */}
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Button 
              variant="ghost" 
              size="icon" 
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            <Link to="/">
              <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                TechStore
              </h1>
            </Link>
          </div>
          
          {/* Search bar */}
          <div className="flex-1 max-w-2xl relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input 
              placeholder="Search for electronics..." 
              className="pl-10 bg-muted/50 border-0 focus:bg-background transition-smooth"
            />
          </div>
          
          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <Heart className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 bg-sale text-sale-foreground text-xs rounded-full w-5 h-5 flex items-center justify-center">
                3
              </span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Desktop Category navigation */}
      <nav className="border-t border-border bg-secondary/30 hidden md:block">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-8 py-3 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.href}
                className="text-sm font-medium whitespace-nowrap hover:text-primary transition-smooth"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-background border-t border-border">
          <nav className="container mx-auto px-4 py-4">
            <div className="flex flex-col gap-4">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.href}
                  className="text-sm font-medium py-2 hover:text-primary transition-smooth"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;