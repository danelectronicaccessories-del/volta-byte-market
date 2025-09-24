import { Star, Heart, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

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
  return (
    <div className="group bg-card rounded-lg border border-border shadow-card hover:shadow-product transition-all duration-300 hover:-translate-y-1 overflow-hidden">
      {/* Image container */}
      <Link to={`/product/${id}`} className="block">
        <div className="relative aspect-square bg-muted/20 overflow-hidden">
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
        
        {/* Badges */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {isNew && (
            <Badge className="bg-success text-success-foreground">New</Badge>
          )}
          {discount && (
            <Badge className="bg-sale text-sale-foreground">-{discount}%</Badge>
          )}
        </div>
        
        {/* Favorite button */}
        <Button
          size="icon"
          variant="ghost"
          className={`absolute top-2 right-2 bg-background/80 backdrop-blur-sm hover:bg-background transition-smooth ${
            isFavorite ? "text-red-500" : "text-muted-foreground"
          }`}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
        </Button>
        
        {/* Quick add to cart */}
        <div className="absolute bottom-2 left-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground" size="sm">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
        </div>
        </div>
      </Link>
      
      {/* Product info */}
      <div className="p-4">
        <Link to={`/product/${id}`}>
          <h3 className="font-medium text-card-foreground line-clamp-2 mb-2 group-hover:text-primary transition-smooth">
            {name}
          </h3>
        </Link>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mb-2">
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`h-3 w-3 ${
                  i < Math.floor(rating)
                    ? "text-yellow-400 fill-current"
                    : "text-muted-foreground"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-muted-foreground">({reviewCount})</span>
        </div>
        
        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-card-foreground">
            ${price.toFixed(2)}
          </span>
          {originalPrice && (
            <span className="text-sm text-muted-foreground line-through">
              ${originalPrice.toFixed(2)}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;