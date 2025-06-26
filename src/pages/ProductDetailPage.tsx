
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { 
  Star, 
  Truck, 
  ShieldCheck, 
  RotateCcw, 
  Heart, 
  Share2, 
  ShoppingCart, 
  ChevronLeft, 
  ChevronRight, 
  Minus, 
  Plus 
} from "lucide-react";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const products = [
  {
    id: "1",
    name: "Wireless Noise Cancelling Headphones",
    price: 10999.99,
    originalPrice: 14999.99,
    discount: 25,
    rating: 4.5,
    reviewCount: 128,
    description:
      "Experience immersive sound and comfort with our premium wireless headphones. Featuring active noise cancellation, these over-ear headphones deliver exceptional sound quality for up to 20 hours on a single charge. The ergonomic design ensures comfort during extended listening sessions.",
    features: [
      "Active Noise Cancellation",
      "20 Hours Battery Life",
      "Bluetooth 5.0 Connectivity",
      "Comfortable Over-ear Design",
      "Built-in Microphone for Calls",
      "Quick Charge (10 min = 2 hours playback)",
    ],
    specifications: {
      "Brand": "SoundMaster",
      "Model": "WNC-500",
      "Color": "Matte Black",
      "Connectivity": "Bluetooth 5.0, 3.5mm Audio Cable",
      "Battery": "500mAh Lithium-ion",
      "Charging Time": "2 Hours",
      "Weight": "250g",
      "Dimensions": "17.5 x 15.5 x 8.5 cm",
      "Warranty": "1 Year",
    },
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?q=80&w=1000&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1563087368-7e592e3e3e1b?q=80&w=1000&auto=format&fit=crop",
    ],
    category: "Electronics",
    subcategory: "Audio",
    stock: 15,
    sku: "WNC500-BLK",
    tags: ["headphones", "wireless", "audio", "noise-cancelling"],
    related: [3, 7, 10],
  },
];

const ProductDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [mainImage, setMainImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find product by ID
  const product = products.find((p) => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        <main className="flex-grow container-custom py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
            <p className="text-muted-foreground mb-6">
              The product you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/products">
              <Button>Browse Products</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    } else {
      toast.error(`Sorry, only ${product.stock} items in stock`);
    }
  };

  const addToCart = () => {
    toast.success(`${quantity} ${quantity > 1 ? "items" : "item"} added to cart`);
  };

  const buyNow = () => {
    addToCart();
    // Navigate to checkout
    // history.push("/checkout");
  };

  const toggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    if (!isWishlisted) {
      toast.success("Added to your wishlist");
    } else {
      toast.info("Removed from your wishlist");
    }
  };

  const shareProduct = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard");
  };

  const nextImage = () => {
    setMainImage((prev) => (prev === product.images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setMainImage((prev) => (prev === 0 ? product.images.length - 1 : prev - 1));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          {/* Breadcrumbs */}
          <Breadcrumb className="mb-8">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="/">Home</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="/products">Products</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href={`/category/${product.category.toLowerCase()}`}>
                  {product.category}
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>{product.name}</BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {/* Product Images */}
            <div>
              <div className="relative mb-4 rounded-lg overflow-hidden border">
                <img
                  src={product.images[mainImage]}
                  alt={product.name}
                  className="w-full h-auto object-cover aspect-square"
                />
                
                {/* Image Navigation Buttons */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90"
                  onClick={prevImage}
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 hover:bg-white/90"
                  onClick={nextImage}
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>

                {/* Discount Badge */}
                {product.discount && (
                  <Badge className="absolute top-4 left-4 bg-destructive">
                    {product.discount}% OFF
                  </Badge>
                )}
              </div>

              {/* Thumbnail Images */}
              <div className="grid grid-cols-4 gap-2">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    className={`border rounded-md overflow-hidden ${
                      mainImage === index ? "ring-2 ring-primary" : ""
                    }`}
                    onClick={() => setMainImage(index)}
                  >
                    <img
                      src={image}
                      alt={`${product.name} thumbnail ${index + 1}`}
                      className="w-full h-auto aspect-square object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div>
              <h1 className="text-2xl md:text-3xl font-bold mb-2">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center mb-4">
                <div className="flex mr-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`w-4 h-4 ${
                        star <= Math.round(product.rating)
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-sm text-muted-foreground">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-center">
                  <span className="text-2xl font-bold mr-3">
                    ₹{product.price.toFixed(2)}
                  </span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-muted-foreground line-through">
                        ₹{product.originalPrice.toFixed(2)}
                      </span>
                      <Badge className="ml-2 bg-destructive text-destructive-foreground">
                        Save ₹{(product.originalPrice - product.price).toFixed(2)}
                      </Badge>
                    </>
                  )}
                </div>
                <p className="text-sm text-muted-foreground mt-1">
                  Includes taxes and free shipping
                </p>
              </div>

              {/* Short Description */}
              <p className="text-foreground mb-6">{product.description}</p>

              {/* Stock Status */}
              <div className="mb-6">
                <p className="text-sm">
                  <span className="font-medium">Availability:</span>{" "}
                  {product.stock > 0 ? (
                    <span className="text-green-600">In Stock ({product.stock} available)</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                </p>
                <p className="text-sm mt-1">
                  <span className="font-medium">SKU:</span> {product.sku}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center mb-6">
                <span className="text-sm font-medium mr-4">Quantity:</span>
                <div className="flex items-center border rounded-md">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={decreaseQuantity}
                    disabled={quantity <= 1}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center">{quantity}</span>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-9 w-9 rounded-none"
                    onClick={increaseQuantity}
                    disabled={quantity >= product.stock}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-8">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={addToCart}
                  disabled={product.stock <= 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
                </Button>
                <Button
                  className="flex-1"
                  onClick={buyNow}
                  disabled={product.stock <= 0}
                >
                  Buy Now
                </Button>
              </div>

              {/* Secondary Actions */}
              <div className="flex gap-4 mb-8">
                <Button variant="ghost" size="sm" onClick={toggleWishlist}>
                  <Heart
                    className={`mr-2 h-4 w-4 ${
                      isWishlisted ? "fill-red-500 text-red-500" : ""
                    }`}
                  />{" "}
                  {isWishlisted ? "Wishlisted" : "Add to Wishlist"}
                </Button>
                <Button variant="ghost" size="sm" onClick={shareProduct}>
                  <Share2 className="mr-2 h-4 w-4" /> Share
                </Button>
              </div>

              {/* Shipping & Returns */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                <div className="flex flex-col items-center text-center p-3 border rounded-lg">
                  <Truck className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Free Shipping</span>
                  <span className="text-xs text-muted-foreground">Orders over $50</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 border rounded-lg">
                  <ShieldCheck className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Secure Payment</span>
                  <span className="text-xs text-muted-foreground">100% secure checkout</span>
                </div>
                <div className="flex flex-col items-center text-center p-3 border rounded-lg">
                  <RotateCcw className="h-5 w-5 text-primary mb-2" />
                  <span className="text-sm font-medium">Easy Returns</span>
                  <span className="text-xs text-muted-foreground">30-day returns</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs: Details, Features, Reviews */}
          <div className="mt-12">
            <Tabs defaultValue="details">
              <TabsList className="w-full justify-start border-b rounded-none mb-6">
                <TabsTrigger value="details" className="flex-1 sm:flex-initial">Details</TabsTrigger>
                <TabsTrigger value="features" className="flex-1 sm:flex-initial">Features</TabsTrigger>
                <TabsTrigger value="specifications" className="flex-1 sm:flex-initial">Specifications</TabsTrigger>
                <TabsTrigger value="reviews" className="flex-1 sm:flex-initial">Reviews</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="p-4">
                <div className="prose max-w-none">
                  <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                  <p>{product.description}</p>
                  <p className="mt-4">
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla quam velit, vulputate eu pharetra nec, mattis ac neque. Duis vulputate commodo lectus, ac blandit elit tincidunt id. Sed rhoncus, tortor sed eleifend tristique, tortor mauris molestie elit, et lacinia ipsum quam nec dui.
                  </p>
                  <p className="mt-4">
                    Quisque nec nisi tortor. Etiam at mauris sit amet magna suscipit ornare non elementum magna. Pellentesque in ipsum ut nibh elementum faucibus eget nec libero. Vestibulum scelerisque, nulla in iaculis scelerisque, ipsum dolor feugiat sem, non eleifend risus dui vitae ex.
                  </p>
                </div>
              </TabsContent>
              <TabsContent value="features" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Key Features</h3>
                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {product.features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <div className="mr-2 mt-1 bg-primary rounded-full p-1">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="14"
                          height="14"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="3"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="text-primary-foreground"
                        >
                          <path d="M20 6 9 17l-5-5" />
                        </svg>
                      </div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </TabsContent>
              <TabsContent value="specifications" className="p-4">
                <h3 className="text-xl font-semibold mb-4">Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b pb-2">
                      <span className="font-medium">{key}</span>
                      <span className="text-muted-foreground">{value}</span>
                    </div>
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="reviews" className="p-4">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  <div className="md:w-1/3">
                    <h3 className="text-xl font-semibold mb-4">Customer Reviews</h3>
                    <div className="bg-secondary p-4 rounded-lg text-center">
                      <div className="text-5xl font-bold mb-2">{product.rating}</div>
                      <div className="flex justify-center mb-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`w-5 h-5 ${
                              star <= Math.round(product.rating)
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-muted-foreground">
                        Based on {product.reviewCount} reviews
                      </p>
                    </div>
                    <Button className="w-full mt-4">Write a Review</Button>
                  </div>
                  <div className="md:w-2/3">
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-medium">
                        {product.reviewCount} reviews
                      </h4>
                      <Select defaultValue="recent">
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Sort by" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="recent">Most Recent</SelectItem>
                          <SelectItem value="highest">Highest Rated</SelectItem>
                          <SelectItem value="lowest">Lowest Rated</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-6">
                      {/* Sample Reviews */}
                      <div className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">Michael T.</h5>
                            <p className="text-xs text-muted-foreground">
                              Verified Purchase - Jan 15, 2025
                            </p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= 5
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h6 className="font-medium mb-1">Amazing quality!</h6>
                        <p className="text-sm">
                          These headphones exceeded my expectations. The sound quality is top-notch and the noise cancellation works really well, even in noisy environments. Battery life is also impressive.
                        </p>
                      </div>
                      <div className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">Sarah L.</h5>
                            <p className="text-xs text-muted-foreground">
                              Verified Purchase - Dec 28, 2024
                            </p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= 4
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h6 className="font-medium mb-1">Comfortable but a bit heavy</h6>
                        <p className="text-sm">
                          I love the sound quality and the noise cancellation is fantastic. The only downside is that they get a bit uncomfortable during long listening sessions. Battery life is great though!
                        </p>
                      </div>
                      <div className="border-b pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h5 className="font-medium">David W.</h5>
                            <p className="text-xs text-muted-foreground">
                              Verified Purchase - Dec 10, 2024
                            </p>
                          </div>
                          <div className="flex">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Star
                                key={star}
                                className={`w-4 h-4 ${
                                  star <= 5
                                    ? "text-yellow-400 fill-yellow-400"
                                    : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <h6 className="font-medium mb-1">Perfect for travel</h6>
                        <p className="text-sm">
                          I bought these for a long flight and they were a lifesaver. The noise cancellation blocked out the airplane noise completely. Comfortable to wear and great battery life.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" className="mt-6 w-full">
                      Load More Reviews
                    </Button>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
