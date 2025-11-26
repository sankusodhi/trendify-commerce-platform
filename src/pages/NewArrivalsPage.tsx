import { useState, useEffect } from "react";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RefreshCw } from "lucide-react";

interface Product {
  id: number;
  name: string;
  price: number;
  rating: number;
  reviewCount: number;
  image: string;
  category: string;
  isNew?: boolean;
  isSale?: boolean;
  originalPrice?: number;
  createdAt: Date;
}

type SortOption = "latest" | "popular" | "price-low" | "price-high";

const NewArrivalsPage = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [displayedProducts, setDisplayedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState<SortOption>("latest");
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  const productsPerPage = 12;

  const fetchNewArrivals = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with: await fetch(`${API_BASE_URL}/products/new`)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const now = new Date();
      const mockProducts: Product[] = Array.from({ length: 30 }, (_, i) => ({
        id: i + 1,
        name: `New Product ${i + 1}`,
        price: Math.floor(Math.random() * 10000) + 500,
        rating: 4 + Math.random(),
        reviewCount: Math.floor(Math.random() * 100) + 10,
        image: `/download (${(i % 8) + 1}).jpeg`,
        category: "Electronics",
        isNew: true,
        createdAt: new Date(now.getTime() - i * 24 * 60 * 60 * 1000),
      }));

      setProducts(mockProducts);
      setDisplayedProducts(mockProducts.slice(0, productsPerPage));
      setHasMore(mockProducts.length > productsPerPage);
    } catch (err) {
      setError("Failed to load new arrivals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNewArrivals();
  }, []);

  useEffect(() => {
    let sorted = [...products];

    switch (sortBy) {
      case "latest":
        sorted.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
        break;
      case "popular":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      case "price-low":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        sorted.sort((a, b) => b.price - a.price);
        break;
    }

    setDisplayedProducts(sorted.slice(0, page * productsPerPage));
    setHasMore(sorted.length > page * productsPerPage);
  }, [sortBy, products, page]);

  const loadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setPage((prev) => prev + 1);
      setLoadingMore(false);
    }, 500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                New Arrivals
              </h1>
              <p className="text-muted-foreground">
                Discover the latest products just for you
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Select value={sortBy} onValueChange={(value: SortOption) => setSortBy(value)}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="latest">Latest First</SelectItem>
                  <SelectItem value="popular">Most Popular</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                </SelectContent>
              </Select>
              <Button
                variant="outline"
                size="icon"
                onClick={fetchNewArrivals}
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </Button>
            </div>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchNewArrivals}>Try Again</Button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {Array.from({ length: 12 }).map((_, i) => (
                <div key={i} className="space-y-3">
                  <Skeleton className="w-full aspect-square rounded-lg" />
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-6 w-1/2" />
                </div>
              ))}
            </div>
          ) : displayedProducts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No new arrivals yet</p>
              <p className="text-sm text-muted-foreground mb-6">
                Check back soon for the latest products!
              </p>
              <Button variant="outline" onClick={fetchNewArrivals}>
                Refresh
              </Button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                {displayedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

              {hasMore && (
                <div className="flex justify-center mt-12">
                  <Button
                    onClick={loadMore}
                    disabled={loadingMore}
                    size="lg"
                    className="min-w-[200px]"
                  >
                    {loadingMore ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      "Load More"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default NewArrivalsPage;
