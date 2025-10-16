import { Star, Heart, ShoppingCart, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

interface ProductCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  discount?: number;
  isNew?: boolean;
  isFavorite?: boolean;
}

const ProductCard = ({
  id,
  name,
  image,
  price,
  originalPrice,
  rating,
  reviewCount,
  discount,
  isNew,
  isFavorite = false
}: ProductCardProps) => {
  const { addToCart, loading } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (user) {
      await addToCart(id);
    }
  };

  // Simulate sales count (in production, this would come from backend)
  const salesCount = Math.floor(Math.random() * 10000) + 100;

  return (
    <div className="group bg-card rounded-lg border border-border hover:shadow-lg transition-all duration-300 overflow-hidden">
      <Link to={`/product/${id}`} className="block">
        {/* Image container */}
        <div className="relative aspect-square bg-muted overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
          />
        
          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            <Badge className="bg-secondary text-secondary-foreground text-[10px] px-1.5 py-0.5 font-semibold">
              Local
            </Badge>
            {discount && (
              <Badge className="bg-sale text-sale-foreground text-[10px] px-1.5 py-0.5">
                Early Black Friday
              </Badge>
            )}
          </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-3">
        <Link to={`/product/${id}`}>
          <h3 className="text-sm text-card-foreground line-clamp-2 mb-2 min-h-[2.5rem]">
            {name}
          </h3>
        </Link>
        
        {/* Price */}
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg font-bold text-sale">
            KES {price.toLocaleString()}
          </span>
          {originalPrice && (
            <span className="text-xs text-muted-foreground line-through">
              KES {originalPrice.toLocaleString()}
            </span>
          )}
          {discount && (
            <Badge className="bg-muted text-muted-foreground text-[10px] px-1 py-0">
              {discount}% off
            </Badge>
          )}
        </div>

        {/* Sales count & RRP */}
        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <span>{salesCount.toLocaleString()} sold</span>
          {originalPrice && (
            <span>RRP KES {originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        {/* Add to cart button */}
        <Button
          size="sm"
          className="w-full bg-card border border-primary text-primary hover:bg-primary hover:text-primary-foreground transition-colors rounded-full h-8 text-xs"
          onClick={handleAddToCart}
          disabled={loading || !user}
        >
          <ShoppingCart className="h-3 w-3 mr-1" />
          {!user ? 'Sign in to buy' : 'Add to cart'}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;