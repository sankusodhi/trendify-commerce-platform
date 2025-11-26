import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Heart, ShoppingCart, Trash2, RefreshCw } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface WishlistItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  image: string;
  inStock: boolean;
  originalPrice?: number;
}

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const fetchWishlist = async () => {
    setLoading(true);
    setError(null);

    try {
      // Mock API call - replace with: await fetch(`${API_BASE_URL}/wishlist`)
      await new Promise((resolve) => setTimeout(resolve, 800));

      const mockWishlist: WishlistItem[] = [
        {
          id: 1,
          productId: 1,
          name: "Premium Wireless Headphones",
          price: 2999,
          image: "/JBL_Live_660NC_Lifestyle Image_01_Battery_Life_904x560px.webp",
          inStock: true,
          originalPrice: 4999,
        },
        {
          id: 2,
          productId: 2,
          name: "Smart Watch Pro",
          price: 8999,
          image: "/download (3).jpeg",
          inStock: true,
        },
        {
          id: 3,
          productId: 3,
          name: "Laptop Backpack",
          price: 1499,
          image: "/download (4).jpeg",
          inStock: false,
        },
      ];

      setWishlist(mockWishlist);
    } catch (err) {
      setError("Failed to load wishlist. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const removeFromWishlist = async (id: number, name: string) => {
    try {
      // Mock API call - replace with: await fetch(`${API_BASE_URL}/wishlist/remove`, { method: 'DELETE', body: JSON.stringify({ id }) })
      await new Promise((resolve) => setTimeout(resolve, 300));

      setWishlist((prev) => prev.filter((item) => item.id !== id));
      toast({
        title: "Removed from wishlist",
        description: `${name} has been removed from your wishlist`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to remove item from wishlist",
        variant: "destructive",
      });
    }
  };

  const moveToCart = async (item: WishlistItem) => {
    try {
      // Mock API calls
      // await fetch(`${API_BASE_URL}/cart/add`, { method: 'POST', body: JSON.stringify({ productId: item.productId }) })
      // await fetch(`${API_BASE_URL}/wishlist/remove`, { method: 'DELETE', body: JSON.stringify({ id: item.id }) })
      await new Promise((resolve) => setTimeout(resolve, 300));

      setWishlist((prev) => prev.filter((i) => i.id !== item.id));
      toast({
        title: "Added to cart",
        description: `${item.name} has been moved to your cart`,
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to move item to cart",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <Heart className="h-8 w-8 text-destructive fill-destructive" />
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground">
                  My Wishlist
                </h1>
                <p className="text-muted-foreground">
                  {wishlist.length} {wishlist.length === 1 ? "item" : "items"}
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchWishlist}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </Button>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchWishlist}>Try Again</Button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 3 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="w-full aspect-square" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-6 w-1/2" />
                      <div className="flex gap-2">
                        <Skeleton className="h-10 flex-1" />
                        <Skeleton className="h-10 w-10" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : wishlist.length === 0 ? (
            <div className="text-center py-20">
              <Heart className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h2 className="text-2xl font-semibold text-foreground mb-2">
                Your wishlist is empty
              </h2>
              <p className="text-muted-foreground mb-6">
                Add items you love to your wishlist and save them for later
              </p>
              <Button asChild>
                <Link to="/products">Browse Products</Link>
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {wishlist.map((item) => (
                <Card key={item.id} className="group overflow-hidden">
                  <CardContent className="p-0">
                    <Link to={`/product/${item.productId}`}>
                      <div className="relative w-full aspect-square overflow-hidden bg-muted">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
                            <span className="text-lg font-semibold text-muted-foreground">
                              Out of Stock
                            </span>
                          </div>
                        )}
                      </div>
                    </Link>
                    <div className="p-4 space-y-3">
                      <Link to={`/product/${item.productId}`}>
                        <h3 className="font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                          {item.name}
                        </h3>
                      </Link>
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold text-foreground">
                          ₹{item.price.toLocaleString()}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            ₹{item.originalPrice.toLocaleString()}
                          </span>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          className="flex-1"
                          onClick={() => moveToCart(item)}
                          disabled={!item.inStock}
                        >
                          <ShoppingCart className="mr-2 h-4 w-4" />
                          Move to Cart
                        </Button>
                        <Button
                          variant="outline"
                          size="icon"
                          onClick={() => removeFromWishlist(item.id, item.name)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WishlistPage;
