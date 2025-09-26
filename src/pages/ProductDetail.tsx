import { useState } from "react";
import { useParams } from "react-router-dom";
import { Star, Heart, ShoppingCart, Minus, Plus, Shield, Truck, RotateCcw } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/useCart";
import { useAuth } from "@/hooks/useAuth";

// Mock product data - in real app this would come from API
const mockProducts = {
  "phone-1": {
    id: "phone-1",
    name: "iPhone 15 Pro Max 256GB - Natural Titanium",
    images: [
      "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=600&h=600&fit=crop",
      "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?w=600&h=600&fit=crop"
    ],
    price: 899.99,
    originalPrice: 1199.99,
    rating: 4.8,
    reviewCount: 2341,
    discount: 25,
    isNew: true,
    description: "Experience the power of Apple's most advanced iPhone with the A17 Pro chip, titanium design, and revolutionary camera system.",
    specs: [
      "6.7-inch Super Retina XDR display",
      "A17 Pro chip with 6-core GPU",
      "256GB storage capacity",
      "Triple-camera system with 48MP main",
      "Natural Titanium finish",
      "Face ID for secure authentication"
    ],
    inStock: true,
    stockCount: 15
  },
  "spare-1": {
    id: "spare-1",
    name: "iPhone 15 Pro Max Tempered Glass Screen Protector",
    images: [
      "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=600&h=600&fit=crop"
    ],
    price: 12.99,
    originalPrice: 19.99,
    rating: 4.6,
    reviewCount: 834,
    discount: 35,
    description: "Premium tempered glass screen protector with 9H hardness for ultimate protection against scratches and impacts.",
    specs: [
      "9H hardness tempered glass",
      "99% transparency",
      "Oleophobic coating",
      "Easy bubble-free installation",
      "Perfect fit for iPhone 15 Pro Max",
      "Case-friendly design"
    ],
    inStock: true,
    stockCount: 50
  }
};

// Related products
const relatedProducts = [
  {
    id: "phone-2",
    name: "Samsung Galaxy S24 Ultra 512GB",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400&h=400&fit=crop",
    price: 799.99,
    originalPrice: 999.99,
    rating: 4.7,
    reviewCount: 1892,
    discount: 20
  },
  {
    id: "spare-2",
    name: "Samsung Galaxy Case - Black",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=400&fit=crop",
    price: 24.99,
    originalPrice: 39.99,
    rating: 4.5,
    reviewCount: 567,
    discount: 38
  },
  {
    id: "spare-3",
    name: "USB-C Fast Charging Cable",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    price: 8.99,
    originalPrice: 14.99,
    rating: 4.7,
    reviewCount: 1234,
    discount: 40
  },
  {
    id: "spare-4",
    name: "Wireless Charger Pad 15W",
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=400&h=400&fit=crop",
    price: 19.99,
    originalPrice: 29.99,
    rating: 4.4,
    reviewCount: 423,
    discount: 33
  }
];

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorite, setIsFavorite] = useState(false);
  const { addToCart, loading } = useCart();
  const { user } = useAuth();

  const product = mockProducts[id as keyof typeof mockProducts];

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Product Not Found</h1>
          <p className="text-muted-foreground">The product you're looking for doesn't exist.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleQuantityChange = (change: number) => {
    setQuantity(Math.max(1, Math.min(quantity + change, product.stockCount)));
  };

  const handleAddToCart = async () => {
    if (user) {
      await addToCart(id!, quantity);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="py-8">
        <div className="container mx-auto px-4">
          {/* Product Details Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="aspect-square bg-muted/20 rounded-lg overflow-hidden">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
              </div>
              {product.images.length > 1 && (
                <div className="flex gap-2 overflow-x-auto">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`aspect-square w-20 rounded-md overflow-hidden border-2 transition-smooth ${
                        selectedImage === index ? "border-primary" : "border-border"
                      }`}
                    >
                      <img
                        src={image}
                        alt={`${product.name} ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  {"isNew" in product && product.isNew && (
                    <Badge className="bg-success text-success-foreground">New</Badge>
                  )}
                  {product.discount && (
                    <Badge className="bg-sale text-sale-foreground">-{product.discount}%</Badge>
                  )}
                </div>
                <h1 className="text-3xl font-bold text-foreground mb-4">{product.name}</h1>
                
                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-muted-foreground"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-3xl font-bold text-foreground">
                    ${product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      ${product.originalPrice.toFixed(2)}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="text-muted-foreground mb-6">{product.description}</p>

                {/* Quantity & Actions */}
                <div className="space-y-4">
                  <div className="flex items-center gap-4">
                    <span className="text-sm font-medium">Quantity:</span>
                    <div className="flex items-center border border-border rounded-md">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(-1)}
                        disabled={quantity <= 1}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="px-4 py-2 text-center min-w-12">{quantity}</span>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleQuantityChange(1)}
                        disabled={quantity >= product.stockCount}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <span className="text-sm text-muted-foreground">
                      {product.stockCount} in stock
                    </span>
                  </div>

                  <div className="flex gap-3">
                    <Button 
                      className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground"
                      onClick={handleAddToCart}
                      disabled={loading || !user}
                    >
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {!user ? 'Sign in to Add' : 'Add to Cart'}
                    </Button>
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => setIsFavorite(!isFavorite)}
                      className={isFavorite ? "text-red-500" : ""}
                    >
                      <Heart className="h-4 w-4" fill={isFavorite ? "currentColor" : "none"} />
                    </Button>
                  </div>

                  <Button variant="outline" className="w-full">
                    Buy Now
                  </Button>
                </div>

                {/* Benefits */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-success" />
                    <span className="text-xs">Free Shipping</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <RotateCcw className="h-4 w-4 text-success" />
                    <span className="text-xs">30-Day Returns</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-success" />
                    <span className="text-xs">1-Year Warranty</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Specifications */}
          <div className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Key Specifications</h2>
            <div className="bg-card rounded-lg border border-border p-6">
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {product.specs.map((spec, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <span className="text-card-foreground">{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-6">People Also Bought</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;