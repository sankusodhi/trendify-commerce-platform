
import { useState, useEffect } from "react";
import { getProductImage } from "@/services/runwareService";
import { Loader2 } from "lucide-react";

interface ProductImageProps {
  product: {
    id: number | string;
    name: string;
    category: string;
    price?: number;
    image?: string;
  };
  className?: string;
}

const ProductImage = ({ product, className = "" }: ProductImageProps) => {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const loadImage = async () => {
      setIsLoading(true);
      try {
        // If product already has an image, use it
        if (product.image && !product.image.includes("placeholder")) {
          setImageUrl(product.image);
        } else {
          // Otherwise generate one
          const url = await getProductImage(product);
          setImageUrl(url);
        }
      } catch (error) {
        console.error("Error loading product image:", error);
        // Fallback to a placeholder
        setImageUrl(`https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 10))}`);
      } finally {
        setIsLoading(false);
      }
    };

    loadImage();
  }, [product]);

  if (isLoading) {
    return (
      <div className={`w-full h-full flex items-center justify-center bg-gray-100 ${className}`}>
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <img
      src={imageUrl || `https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=${encodeURIComponent(product.name.substring(0, 10))}`}
      alt={product.name}
      className={`w-full h-full object-cover ${className}`}
    />
  );
};

export default ProductImage;
