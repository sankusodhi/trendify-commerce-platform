import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Category {
  id: number;
  name: string;
  image: string;
  productCount: number;
  slug: string;
}

const CategoriesPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCategories = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with: await fetch(`${API_BASE_URL}/categories`)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const mockCategories: Category[] = [
        { id: 1, name: "Electronics", image: "/83f551e22a77d6c513ea6a61805fd643.jpg", productCount: 245, slug: "electronics" },
        { id: 2, name: "Fashion", image: "/g59pj_512.webp", productCount: 532, slug: "fashion" },
        { id: 3, name: "Home & Kitchen", image: "/ab9bb2bc8736099632a167778fb33226.jpg", productCount: 189, slug: "home-kitchen" },
        { id: 4, name: "Beauty", image: "/beauty-charms-mobile-main-banner-3-66d1dece86451.webp", productCount: 312, slug: "beauty" },
        { id: 5, name: "Toys & Games", image: "/44063263_kxpnaXsvmlq38NHOuwO6A45eq4ueGGN1OXF34W3XTI0.jpg", productCount: 156, slug: "toys-games" },
        { id: 6, name: "Sports", image: "/7236af9487a73ebb646bac7269457feb.webp", productCount: 223, slug: "sports" },
        { id: 7, name: "Books", image: "/download (1).jpeg", productCount: 478, slug: "books" },
        { id: 8, name: "Automotive", image: "/download (2).jpeg", productCount: 167, slug: "automotive" },
      ];
      
      setCategories(mockCategories);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleRefresh = () => {
    fetchCategories();
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                All Categories
              </h1>
              <p className="text-muted-foreground">
                Explore our wide range of product categories
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRefresh}
              disabled={loading}
              className="shrink-0"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={handleRefresh}>Try Again</Button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {Array.from({ length: 8 }).map((_, i) => (
                <Card key={i} className="overflow-hidden">
                  <CardContent className="p-0">
                    <Skeleton className="w-full aspect-square" />
                    <div className="p-4 space-y-2">
                      <Skeleton className="h-4 w-full" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : categories.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">No categories found</p>
              <Button variant="outline" onClick={handleRefresh}>
                Refresh
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
              {categories.map((category) => (
                <Link
                  to={`/products?category=${category.slug}`}
                  key={category.id}
                  className="group"
                >
                  <Card className="overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-0">
                      <div className="flex flex-col items-center p-4">
                        <div className="w-full aspect-square overflow-hidden rounded-lg mb-3 bg-muted">
                          <img
                            src={category.image}
                            alt={category.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                        <h3 className="font-semibold text-center text-foreground text-sm md:text-base mb-1">
                          {category.name}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {category.productCount} products
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CategoriesPage;
