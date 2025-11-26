import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Clock, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Deal {
  id: number;
  productId: number;
  name: string;
  image: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  type: "flash" | "daily" | "clearance";
  endsAt: Date;
}

const DealsPage = () => {
  const [deals, setDeals] = useState<Deal[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<{ [key: number]: string }>({});

  const fetchDeals = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Mock API call - replace with: await fetch(`${API_BASE_URL}/deals`)
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const now = new Date();
      const mockDeals: Deal[] = [
        {
          id: 1,
          productId: 1,
          name: "Wireless Headphones",
          image: "/JBL_Live_660NC_Lifestyle Image_01_Battery_Life_904x560px.webp",
          originalPrice: 4999,
          discountedPrice: 2999,
          discount: 40,
          type: "flash",
          endsAt: new Date(now.getTime() + 2 * 60 * 60 * 1000),
        },
        {
          id: 2,
          productId: 2,
          name: "Smart Watch",
          image: "/download (3).jpeg",
          originalPrice: 12999,
          discountedPrice: 8999,
          discount: 31,
          type: "daily",
          endsAt: new Date(now.getTime() + 24 * 60 * 60 * 1000),
        },
        {
          id: 3,
          productId: 3,
          name: "Laptop Backpack",
          image: "/download (4).jpeg",
          originalPrice: 2499,
          discountedPrice: 1499,
          discount: 40,
          type: "clearance",
          endsAt: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
        },
        {
          id: 4,
          productId: 4,
          name: "Portable Speaker",
          image: "/download (5).jpeg",
          originalPrice: 3999,
          discountedPrice: 2499,
          discount: 38,
          type: "flash",
          endsAt: new Date(now.getTime() + 3 * 60 * 60 * 1000),
        },
      ];
      
      setDeals(mockDeals);
    } catch (err) {
      setError("Failed to load deals. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: number]: string } = {};
      deals.forEach(deal => {
        const now = new Date().getTime();
        const end = new Date(deal.endsAt).getTime();
        const diff = end - now;

        if (diff > 0) {
          const hours = Math.floor(diff / (1000 * 60 * 60));
          const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((diff % (1000 * 60)) / 1000);
          newTimeLeft[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[deal.id] = "Expired";
        }
      });
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [deals]);

  const getDealTypeLabel = (type: Deal["type"]) => {
    switch (type) {
      case "flash":
        return "Flash Sale";
      case "daily":
        return "Deal of The Day";
      case "clearance":
        return "Clearance Sale";
    }
  };

  const getDealTypeVariant = (type: Deal["type"]) => {
    switch (type) {
      case "flash":
        return "destructive";
      case "daily":
        return "default";
      case "clearance":
        return "secondary";
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container-custom">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
                Amazing Deals
              </h1>
              <p className="text-muted-foreground">
                Limited time offers - Grab them before they're gone!
              </p>
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={fetchDeals}
              disabled={loading}
              className="shrink-0"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>

          {error && (
            <div className="text-center py-12">
              <p className="text-destructive mb-4">{error}</p>
              <Button onClick={fetchDeals}>Try Again</Button>
            </div>
          )}

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardContent className="p-0">
                    <Skeleton className="w-full aspect-square" />
                    <div className="p-4 space-y-3">
                      <Skeleton className="h-4 w-3/4" />
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-4 w-full" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : deals.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground text-lg mb-4">
                No deals available right now
              </p>
              <p className="text-sm text-muted-foreground mb-6">
                Check back soon for exciting offers!
              </p>
              <Button variant="outline" onClick={fetchDeals}>
                Refresh
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {deals.map((deal) => (
                <Link to={`/product/${deal.productId}`} key={deal.id}>
                  <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardContent className="p-0">
                      <div className="relative">
                        <div className="absolute top-3 left-3 z-10 space-y-2">
                          <Badge variant={getDealTypeVariant(deal.type)} className="font-semibold">
                            {getDealTypeLabel(deal.type)}
                          </Badge>
                          <Badge variant="destructive" className="block w-fit">
                            {deal.discount}% OFF
                          </Badge>
                        </div>
                        <div className="w-full aspect-square overflow-hidden bg-muted">
                          <img
                            src={deal.image}
                            alt={deal.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                            loading="lazy"
                          />
                        </div>
                      </div>
                      <div className="p-4 space-y-3">
                        <h3 className="font-semibold text-foreground line-clamp-2">
                          {deal.name}
                        </h3>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-foreground">
                              ₹{deal.discountedPrice.toLocaleString()}
                            </span>
                            <span className="text-sm text-muted-foreground line-through">
                              ₹{deal.originalPrice.toLocaleString()}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-destructive" />
                          <span className="font-medium text-destructive">
                            {timeLeft[deal.id] || "Loading..."}
                          </span>
                        </div>
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

export default DealsPage;
