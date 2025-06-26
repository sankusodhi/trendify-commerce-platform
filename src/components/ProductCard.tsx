
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardFooter 
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import ProductImage from "@/components/ProductImage";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    rating: number;
    reviewCount: number;
    image: string;
    category: string;
    isNew?: boolean;
    isSale?: boolean;
  };
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const calculateDiscount = () => {
    if (!product.originalPrice) return null;
    const discount = Math.round(
      ((product.originalPrice - product.price) / product.originalPrice) * 100
    );
    return discount;
  };

  const discount = calculateDiscount();

  const toggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    
    if (!isWishlisted) {
      toast.success("Added to your wishlist");
    } else {
      toast.info("Removed from your wishlist");
    }
  };

  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart`);
  };

  return (
    <Card className="overflow-hidden hover:shadow-md transition-all h-full group">
      <Link to={`/product/${product.id}`}>
        <div className="relative">
          {/* Product Badge */}
          {(product.isNew || product.isSale) && (
            <div className="absolute top-2 left-2 z-10">
              {product.isNew && (
                <Badge className="bg-primary text-primary-foreground mr-2">New</Badge>
              )}
              {product.isSale && discount && (
                <Badge className="bg-destructive text-destructive-foreground">
                  {discount}% OFF
                </Badge>
              )}
            </div>
          )}

          {/* Wishlist Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-2 right-2 z-10 bg-white/80 hover:bg-white"
            onClick={toggleWishlist}
          >
            <Heart
              className={`h-5 w-5 ${isWishlisted ? "fill-red-500 text-red-500" : ""}`}
            />
          </Button>

          {/* Product Image - Using our new component */}
          <div className="relative h-48 md:h-56 overflow-hidden">
            <ProductImage 
              product={product} 
              className="transition-transform group-hover:scale-105" 
            />
          </div>

          <CardContent className="p-4">
            {/* Category */}
            <p className="text-xs text-muted-foreground mb-1">{product.category}</p>
            
            {/* Product Name */}
            <h3 className="font-medium line-clamp-2 h-12 mb-1">{product.name}</h3>
            
            {/* Rating */}
            <div className="flex items-center mb-2">
              <div className="flex mr-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-3.5 h-3.5 ${
                      i < product.rating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
            
            {/* Price */}
            <div className="flex items-center">
              <span className="font-bold text-lg">₹{product.price.toFixed(2)}</span>
              {product.originalPrice && (
                <span className="text-sm text-muted-foreground line-through ml-2">
                  ₹{product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
          </CardContent>

          <CardFooter className="p-4 pt-0">
            <Button 
              onClick={addToCart}
              className="w-full gap-2"
            >
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </Button>
          </CardFooter>
        </div>
      </Link>
    </Card>
  );
};

export default ProductCard;
