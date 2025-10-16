import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Menu, Search, Heart, ShoppingCart, User, LogOut, Package, ChevronDown, Globe, Smartphone, Laptop, Tv, Camera, Gamepad2, Watch } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/hooks/useAuth";
import { useCart } from "@/hooks/useCart";
import CartDrawer from "./CartDrawer";
import { Badge } from "@/components/ui/badge";

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, signOut } = useAuth();
  const { totalItems: itemCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery, navigate]);

  return (
    <>
      {/* Top Banner Bar - Temu Style */}
      <div className="bg-secondary text-secondary-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-10 text-xs">
            <div className="flex items-center gap-6">
              <span className="flex items-center gap-1">
                <Package className="h-3 w-3" />
                Free shipping
              </span>
              <span className="hidden md:block">Incredible</span>
            </div>
            <div className="flex items-center gap-4">
              <Link to="/auth" className="hover:text-primary transition-colors hidden md:block">
                Start Selling to Millions of Buyers on VoltaByte
              </Link>
              <Button variant="ghost" size="sm" className="h-7 text-xs bg-primary hover:bg-primary/90 text-primary-foreground px-3">
                Join Now →
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-background border-b border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 gap-4">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 flex-shrink-0">
              <div className="bg-gradient-primary p-2 rounded-lg">
                <Package className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground hidden sm:block">
                VoltaByte
              </span>
            </Link>

            {/* Navigation Links - Desktop */}
            <nav className="hidden lg:flex items-center gap-1 flex-1">
              <Link to="/" className="px-3 py-2 text-sm hover:text-primary transition-colors">
                Best-Selling Items
              </Link>
              <Link to="/" className="px-3 py-2 text-sm hover:text-primary transition-colors">
                5-Star Rated
              </Link>
              <Badge className="bg-sale text-sale-foreground px-2 py-1 text-xs">Early Black Friday</Badge>
              <Link to="/" className="px-3 py-2 text-sm hover:text-primary transition-colors">
                New In
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="px-3 py-2 text-sm hover:text-primary transition-colors flex items-center gap-1">
                  Categories <ChevronDown className="h-3 w-3" />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem asChild>
                    <Link to="/phones" className="w-full flex items-center gap-2">
                      <Smartphone className="h-4 w-4" />
                      Phones
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/laptops" className="w-full flex items-center gap-2">
                      <Laptop className="h-4 w-4" />
                      Laptops
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/tvs" className="w-full flex items-center gap-2">
                      <Tv className="h-4 w-4" />
                      TVs
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/cameras" className="w-full flex items-center gap-2">
                      <Camera className="h-4 w-4" />
                      Cameras
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/gaming" className="w-full flex items-center gap-2">
                      <Gamepad2 className="h-4 w-4" />
                      Gaming
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/wearables" className="w-full flex items-center gap-2">
                      <Watch className="h-4 w-4" />
                      Wearables
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </nav>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <div className="relative">
                <Input
                  type="search"
                  placeholder="Search for products..."
                  className="w-full pr-10 bg-muted/50 border-border focus:bg-background transition-colors"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button 
                  size="icon"
                  className="absolute right-0 top-0 h-full rounded-l-none bg-primary hover:bg-primary/90"
                >
                  <Search className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-1 flex-shrink-0">
              <Button 
                variant="ghost" 
                size="sm"
                asChild
                className="hidden lg:flex items-center gap-1 h-9 text-sm"
              >
                <Link to={user ? "/orders" : "/auth"}>
                  <User className="h-4 w-4" />
                  <span className="hidden xl:inline">{user ? "Account" : "Sign in / Register"}</span>
                </Link>
              </Button>

              <Button variant="ghost" size="icon" className="hidden sm:flex h-9 w-9">
                <Heart className="h-5 w-5" />
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9"
                onClick={() => setIsCartOpen(true)}
              >
                <ShoppingCart className="h-5 w-5" />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center font-medium">
                    {itemCount}
                  </span>
                )}
              </Button>

              <Button variant="ghost" size="icon" className="hidden lg:flex h-9 w-9">
                <Globe className="h-5 w-5" />
              </Button>

              {user && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="lg:hidden h-9 w-9">
                      <User className="h-5 w-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to="/orders" className="flex items-center gap-2">
                        <Package className="h-4 w-4" />
                        Orders & Account
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={signOut} className="flex items-center gap-2">
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}

              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden h-9 w-9"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-[120px] bg-background z-40 overflow-y-auto">
          <nav className="container mx-auto px-4 py-4">
            <div className="space-y-1">
              <Link to="/" className="block py-3 text-sm font-medium hover:text-primary border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>
                Best-Selling Items
              </Link>
              <Link to="/" className="block py-3 text-sm font-medium hover:text-primary border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>
                5-Star Rated
              </Link>
              <Link to="/" className="block py-3 text-sm font-medium hover:text-primary border-b border-border" onClick={() => setIsMobileMenuOpen(false)}>
                New In
              </Link>
              <div className="py-3 border-b border-border">
                <div className="font-semibold text-sm mb-2">Categories</div>
                <div className="space-y-2 pl-4">
                  <Link to="/phones" className="block py-2 text-sm hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Phones
                  </Link>
                  <Link to="/laptops" className="block py-2 text-sm hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Laptops
                  </Link>
                  <Link to="/tvs" className="block py-2 text-sm hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    TVs
                  </Link>
                  <Link to="/cameras" className="block py-2 text-sm hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Cameras
                  </Link>
                  <Link to="/gaming" className="block py-2 text-sm hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Gaming
                  </Link>
                  <Link to="/wearables" className="block py-2 text-sm hover:text-primary" onClick={() => setIsMobileMenuOpen(false)}>
                    Wearables
                  </Link>
                </div>
              </div>
            </div>
          </nav>
        </div>
      )}

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
};

export default Header;
