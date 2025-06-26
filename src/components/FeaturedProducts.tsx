
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import ProductCard from "./ProductCard";
import { Button } from "@/components/ui/button";

const featuredProducts = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 10999.99,
    originalPrice: 14999.99,
    rating: 4.5,
    reviewCount: 128,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics",
    isSale: true,
  },
  {
    id: 2,
    name: "Premium Cotton T-shirt",
    price: 1999.99,
    rating: 4,
    reviewCount: 85,
    image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?q=80&w=1000&auto=format&fit=crop",
    category: "Fashion",
  },
  {
    id: 3,
    name: "Smart Home Hub",
    price: 7999.99,
    originalPrice: 9999.99,
    rating: 4.7,
    reviewCount: 56,
    image: "download (6).jpeg",
    category: "Electronics",
    isNew: true,
  },
  {
    id: 4,
    name: "Non-stick Cookware Set",
    price: 5999.99,
    rating: 4.3,
    reviewCount: 42,
    image: "https://images.unsplash.com/photo-1584269600464-37b1b58a9fe7?q=80&w=1000&auto=format&fit=crop",
    category: "Home & Kitchen",
  },
  {
    id: 5,
    name: "Skincare Gift Set",
    price: 3499.99,
    originalPrice: 4999.99,
    rating: 4.9,
    reviewCount: 73,
    image: "https://images.unsplash.com/photo-1567721913486-6585f069b332?q=80&w=1000&auto=format&fit=crop",
    category: "Beauty",
    isSale: true,
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 6999.99,
    rating: 4.2,
    reviewCount: 91,
    image: "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1000&auto=format&fit=crop",
    category: "Sports",
    isNew: true,
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 4499.99,
    originalPrice: 5999.99,
    rating: 4.4,
    reviewCount: 64,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?q=80&w=1000&auto=format&fit=crop",
    category: "Electronics",
    isSale: true,
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 2499.99,
    rating: 4.1,
    reviewCount: 37,
    image: "https://images.unsplash.com/photo-1627123424574-724758594e93?q=80&w=1000&auto=format&fit=crop",
    category: "Fashion",
  },
];

const FeaturedProducts = () => {
  return (
    <section className="my-12">
      <div className="container-custom">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Products</h2>
          <Link to="/products">
            <Button variant="ghost" className="flex items-center gap-1">
              View All <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
