
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { 
  Trash2, 
  Plus, 
  Minus, 
  ArrowRight, 
  ShoppingBag, 
  ShieldCheck, 
  TruckIcon 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { toast } from "sonner";

// Sample cart data
const initialCartItems = [
  {
    id: 1,
    name: "Wireless Noise Cancelling Headphones",
    price: 149.99,
    image: "https://via.placeholder.com/100x100/3B82F6/FFFFFF?text=Headphones",
    quantity: 1,
    maxQuantity: 10,
  },
  {
    id: 2,
    name: "Premium Cotton T-shirt",
    price: 24.99,
    image: "https://via.placeholder.com/100x100/EC4899/FFFFFF?text=T-shirt",
    quantity: 2,
    maxQuantity: 20,
  },
];

const CartPage = () => {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Calculate totals
  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shippingCost = subtotal > 50 ? 0 : 5.99;
  const tax = subtotal * 0.08; // 8% tax rate
  const total = subtotal + shippingCost + tax - discountAmount;

  const updateQuantity = (id: number, newQuantity: number) => {
    const item = cartItems.find((item) => item.id === id);
    
    if (!item) return;
    
    if (newQuantity < 1) {
      toast.error("Quantity cannot be less than 1");
      return;
    }
    
    if (newQuantity > item.maxQuantity) {
      toast.error(`Sorry, only ${item.maxQuantity} items in stock`);
      return;
    }
    
    setCartItems(
      cartItems.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
    toast.success("Item removed from cart");
  };

  const applyCoupon = () => {
    if (!couponCode.trim()) {
      toast.error("Please enter a coupon code");
      return;
    }
    
    setIsApplyingCoupon(true);
    
    // Simulate API call to validate coupon
    setTimeout(() => {
      if (couponCode.toUpperCase() === "SAVE10") {
        const discount = subtotal * 0.1; // 10% discount
        setDiscountAmount(discount);
        toast.success("Coupon applied successfully!");
      } else {
        toast.error("Invalid coupon code");
      }
      setIsApplyingCoupon(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <div className="container-custom py-8">
          <h1 className="text-2xl md:text-3xl font-bold mb-8">Shopping Cart</h1>

          {cartItems.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2">
                <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[100px]">Product</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead>Price</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead>Total</TableHead>
                        <TableHead className="w-[50px]"></TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cartItems.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>
                            <Link to={`/product/${item.id}`}>
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-16 h-16 object-cover rounded-md"
                              />
                            </Link>
                          </TableCell>
                          <TableCell>
                            <Link
                              to={`/product/${item.id}`}
                              className="font-medium hover:text-primary transition-colors"
                            >
                              {item.name}
                            </Link>
                          </TableCell>
                          <TableCell>${item.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex items-center border rounded-md w-24">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              >
                                <Minus className="h-3 w-3" />
                              </Button>
                              <span className="w-8 text-center">{item.quantity}</span>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-8 w-8 rounded-none"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-3 w-3" />
                              </Button>
                            </div>
                          </TableCell>
                          <TableCell className="font-medium">
                            ${(item.price * item.quantity).toFixed(2)}
                          </TableCell>
                          <TableCell>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => removeItem(item.id)}
                            >
                              <Trash2 className="h-4 w-4 text-muted-foreground" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                {/* Continue Shopping & Update Cart */}
                <div className="flex flex-col sm:flex-row justify-between mt-4 gap-3">
                  <Link to="/products">
                    <Button variant="outline" className="w-full sm:w-auto">
                      Continue Shopping
                    </Button>
                  </Link>
                </div>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white rounded-lg border shadow-sm p-6">
                  <h2 className="text-xl font-bold mb-4">Order Summary</h2>
                  
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    {discountAmount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${discountAmount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Shipping</span>
                      <span>
                        {shippingCost === 0
                          ? "Free"
                          : `$${shippingCost.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Tax (8%)</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>

                  {/* Coupon Code */}
                  <div className="mb-6">
                    <h3 className="font-medium mb-2">Apply Coupon Code</h3>
                    <div className="flex gap-2">
                      <Input
                        placeholder="Enter coupon code"
                        value={couponCode}
                        onChange={(e) => setCouponCode(e.target.value)}
                        className="flex-1"
                      />
                      <Button 
                        onClick={applyCoupon}
                        disabled={isApplyingCoupon}
                      >
                        {isApplyingCoupon ? "Applying..." : "Apply"}
                      </Button>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <Button className="w-full mb-4">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>

                  {/* Extra Info */}
                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <ShieldCheck className="h-4 w-4 text-primary" />
                      <span>Secure checkout</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <TruckIcon className="h-4 w-4 text-primary" />
                      <span>Free shipping on orders over $50</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="flex justify-center mb-4">
                <ShoppingBag className="w-16 h-16 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-muted-foreground mb-6">
                Looks like you haven't added any products to your cart yet.
              </p>
              <Link to="/products">
                <Button>Start Shopping</Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
