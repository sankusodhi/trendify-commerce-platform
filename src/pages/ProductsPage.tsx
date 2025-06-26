
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Slider } from "@/components/ui/slider";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Filter, SlidersHorizontal, X } from "lucide-react";

const allProducts = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 149.99,
    originalPrice: 199.99,
    rating: 4.5,
    reviewCount: 128,
    image: "https://via.placeholder.com/300x300/3B82F6/FFFFFF?text=Headphones",
    category: "Electronics",
    isSale: true,
    brand: "SoundMaster",
  },
  {
    id: 2,
    name: "Premium Cotton T-shirt",
    price: 24.99,
    rating: 4,
    reviewCount: 85,
    image: "https://via.placeholder.com/300x300/EC4899/FFFFFF?text=T-shirt",
    category: "Fashion",
    brand: "UrbanStyle",
  },
  {
    id: 3,
    name: "Smart Home Hub",
    price: 99.99,
    originalPrice: 129.99,
    rating: 4.7,
    reviewCount: 56,
    image: "https://via.placeholder.com/300x300/8B5CF6/FFFFFF?text=Smart+Hub",
    category: "Electronics",
    isNew: true,
    brand: "TechHome",
  },
  {
    id: 4,
    name: "Non-stick Cookware Set",
    price: 79.99,
    rating: 4.3,
    reviewCount: 42,
    image: "https://via.placeholder.com/300x300/10B981/FFFFFF?text=Cookware",
    category: "Home & Kitchen",
    brand: "CookPro",
  },
  {
    id: 5,
    name: "Skincare Gift Set",
    price: 49.99,
    originalPrice: 69.99,
    rating: 4.9,
    reviewCount: 73,
    image: "https://via.placeholder.com/300x300/F59E0B/FFFFFF?text=Skincare",
    category: "Beauty",
    isSale: true,
    brand: "GlowSkin",
  },
  {
    id: 6,
    name: "Fitness Tracker",
    price: 89.99,
    rating: 4.2,
    reviewCount: 91,
    image: "https://via.placeholder.com/300x300/EF4444/FFFFFF?text=Tracker",
    category: "Sports",
    isNew: true,
    brand: "FitTech",
  },
  {
    id: 7,
    name: "Portable Bluetooth Speaker",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.4,
    reviewCount: 64,
    image: "https://via.placeholder.com/300x300/6366F1/FFFFFF?text=Speaker",
    category: "Electronics",
    isSale: true,
    brand: "SoundMaster",
  },
  {
    id: 8,
    name: "Leather Wallet",
    price: 34.99,
    rating: 4.1,
    reviewCount: 37,
    image: "https://via.placeholder.com/300x300/A855F7/FFFFFF?text=Wallet",
    category: "Fashion",
    brand: "LuxLeather",
  },
  {
    id: 9,
    name: "Stainless Steel Water Bottle",
    price: 19.99,
    rating: 4.8,
    reviewCount: 52,
    image: "https://via.placeholder.com/300x300/059669/FFFFFF?text=Bottle",
    category: "Sports",
    brand: "EcoHydrate",
  },
  {
    id: 10,
    name: "Wireless Ergonomic Mouse",
    price: 39.99,
    originalPrice: 49.99,
    rating: 4.6,
    reviewCount: 29,
    image: "https://via.placeholder.com/300x300/3730A3/FFFFFF?text=Mouse",
    category: "Electronics",
    brand: "TechGear",
  },
  {
    id: 11,
    name: "Natural Face Moisturizer",
    price: 29.99,
    rating: 4.7,
    reviewCount: 88,
    image: "https://via.placeholder.com/300x300/DB2777/FFFFFF?text=Moisturizer",
    category: "Beauty",
    brand: "GlowSkin",
  },
  {
    id: 12,
    name: "Ceramic Dinner Set",
    price: 89.99,
    originalPrice: 119.99,
    rating: 4.4,
    reviewCount: 45,
    image: "https://via.placeholder.com/300x300/065F46/FFFFFF?text=Dinnerware",
    category: "Home & Kitchen",
    isSale: true,
    brand: "HomeLuxe",
  },
];

const ProductsPage = () => {
  const location = useLocation();
  const [products, setProducts] = useState(allProducts);
  const [filters, setFilters] = useState({
    category: "",
    priceRange: [0, 200],
    rating: 0,
    brands: [] as string[],
    onSale: false,
    inStock: false,
  });
  const [sortOption, setSortOption] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Get all available brands
  const brands = [...new Set(allProducts.map((product) => product.brand))];
  
  // Get all available categories
  const categories = [...new Set(allProducts.map((product) => product.category))];

  // Parse query parameters for category
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const categoryParam = searchParams.get("category");
    
    if (categoryParam) {
      setFilters((prev) => ({ ...prev, category: categoryParam }));
    }
  }, [location.search]);

  // Apply filters and sorting
  useEffect(() => {
    let filteredProducts = [...allProducts];

    // Apply category filter (updated to handle "all" value)
    if (filters.category && filters.category !== "all") {
      filteredProducts = filteredProducts.filter(
        (product) => product.category === filters.category
      );
    }

    // Apply price range filter
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Apply rating filter (updated to handle "any" value)
    if (filters.rating > 0) {
      filteredProducts = filteredProducts.filter(
        (product) => product.rating >= filters.rating
      );
    }

    // Apply brand filter
    if (filters.brands.length > 0) {
      filteredProducts = filteredProducts.filter((product) =>
        filters.brands.includes(product.brand)
      );
    }

    // Apply sale filter
    if (filters.onSale) {
      filteredProducts = filteredProducts.filter((product) => product.isSale);
    }

    // Apply search term
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filteredProducts = filteredProducts.filter(
        (product) =>
          product.name.toLowerCase().includes(term) ||
          product.category.toLowerCase().includes(term) ||
          product.brand.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    switch (sortOption) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        filteredProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filteredProducts.sort((a, b) => (a.isNew ? -1 : 1));
        break;
      default:
        // Featured sorting (default)
        break;
    }

    setProducts(filteredProducts);
  }, [filters, sortOption, searchTerm]);

  const resetFilters = () => {
    setFilters({
      category: "",
      priceRange: [0, 200],
      rating: 0,
      brands: [],
      onSale: false,
      inStock: false,
    });
    setSearchTerm("");
    setSortOption("featured");
  };

  const toggleBrandFilter = (brand: string) => {
    if (filters.brands.includes(brand)) {
      setFilters({
        ...filters,
        brands: filters.brands.filter((b) => b !== brand),
      });
    } else {
      setFilters({
        ...filters,
        brands: [...filters.brands, brand],
      });
    }
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          <div className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:justify-between md:items-center mb-8">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                All Products
                {filters.category && filters.category !== "all" && ` - ${filters.category}`}
              </h1>
              <p className="text-muted-foreground">
                Showing {products.length} results
              </p>
            </div>

            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
              {/* Mobile Filter Button */}
              <Button
                variant="outline"
                className="flex items-center gap-2 md:hidden"
                onClick={toggleFilterSidebar}
              >
                <Filter className="h-4 w-4" /> Filter
              </Button>

              {/* Search Input */}
              <div className="w-full sm:w-auto sm:min-w-[200px]">
                <Input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>

              {/* Sort Dropdown */}
              <Select value={sortOption} onValueChange={setSortOption}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Sort by" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="featured">Featured</SelectItem>
                  <SelectItem value="newest">Newest</SelectItem>
                  <SelectItem value="price-low">Price: Low to High</SelectItem>
                  <SelectItem value="price-high">Price: High to Low</SelectItem>
                  <SelectItem value="rating">Top Rated</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="flex flex-col md:flex-row">
            {/* Filters Sidebar */}
            <aside
              className={`md:w-64 lg:w-72 mr-0 md:mr-8 transition-all duration-300 ${
                isFilterOpen
                  ? "max-h-[2000px] opacity-100"
                  : "max-h-0 md:max-h-[2000px] opacity-0 md:opacity-100 overflow-hidden md:overflow-visible"
              }`}
            >
              <div className="bg-white p-4 rounded-lg shadow-sm border">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={resetFilters}
                    className="text-sm text-muted-foreground hover:text-primary"
                  >
                    Reset
                  </Button>
                </div>

                {/* Category Filter - Fixed empty string value */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Category</h3>
                  <Select
                    value={filters.category}
                    onValueChange={(value) =>
                      setFilters({ ...filters, category: value })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All Categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Price Range Filter */}
                <div className="mb-6">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-sm font-medium">Price Range</h3>
                    <span className="text-xs text-muted-foreground">
                      ${filters.priceRange[0]} - ${filters.priceRange[1]}
                    </span>
                  </div>
                  <Slider
                    min={0}
                    max={200}
                    step={10}
                    value={filters.priceRange}
                    onValueChange={(value) =>
                      setFilters({ ...filters, priceRange: value as [number, number] })
                    }
                    className="my-4"
                  />
                </div>

                {/* Brand Filter */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Brand</h3>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {brands.map((brand) => (
                      <div key={brand} className="flex items-center space-x-2">
                        <Checkbox
                          id={`brand-${brand}`}
                          checked={filters.brands.includes(brand)}
                          onCheckedChange={() => toggleBrandFilter(brand)}
                        />
                        <label
                          htmlFor={`brand-${brand}`}
                          className="text-sm cursor-pointer"
                        >
                          {brand}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Rating Filter - Fixed empty string value */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Rating</h3>
                  <Select
                    value={filters.rating.toString()}
                    onValueChange={(value) =>
                      setFilters({ ...filters, rating: Number(value) })
                    }
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0">Any Rating</SelectItem>
                      <SelectItem value="4">4+ Stars</SelectItem>
                      <SelectItem value="3">3+ Stars</SelectItem>
                      <SelectItem value="2">2+ Stars</SelectItem>
                      <SelectItem value="1">1+ Stars</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Other Filters */}
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="on-sale"
                      checked={filters.onSale}
                      onCheckedChange={(checked) =>
                        setFilters({
                          ...filters,
                          onSale: checked === true,
                        })
                      }
                    />
                    <label
                      htmlFor="on-sale"
                      className="text-sm cursor-pointer"
                    >
                      On Sale
                    </label>
                  </div>
                </div>
              </div>
            </aside>

            {/* Products Grid */}
            <div className="flex-1">
              {products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <SlidersHorizontal className="h-12 w-12 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium mb-2">No products found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your filters or search term
                  </p>
                  <Button onClick={resetFilters}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductsPage;
