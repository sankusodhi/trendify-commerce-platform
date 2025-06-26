
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ShoppingCart, 
  Search, 
  User, 
  Menu, 
  X, 
  Heart 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleSearch = () => setIsSearchOpen(!isSearchOpen);

  return (
    <header className="sticky top-0 z-50 bg-background border-b shadow-sm">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <h1 className="text-2xl font-bold text-primary">TrendifyShop</h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/categories" className="text-foreground hover:text-primary transition-colors">
              Categories
            </Link>
            <Link to="/deals" className="text-foreground hover:text-primary transition-colors">
              Deals
            </Link>
            <Link to="/new-arrivals" className="text-foreground hover:text-primary transition-colors">
              New Arrivals
            </Link>
          </nav>

          {/* Search Bar (Desktop) */}
          <div className="hidden md:flex flex-1 max-w-md mx-6">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10"
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0"
              >
                <Search className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Action Icons */}
          <div className="flex items-center space-x-3">
            {/* Search Icon (Mobile) */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleSearch}
            >
              <Search className="h-5 w-5" />
            </Button>

            {/* Wishlist */}
            <Link to="/wishlist">
              <Button variant="ghost" size="icon">
                <Heart className="h-5 w-5" />
              </Button>
            </Link>

            {/* Cart */}
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary text-white text-xs flex items-center justify-center">3</span>
              </Button>
            </Link>

            {/* Account */}
            <Link to="/account">
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </Link>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={toggleMenu}
            >
              {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Search Bar */}
        {isSearchOpen && (
          <div className="mt-4 md:hidden animate-fade-in">
            <div className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                className="w-full pr-10"
                autoFocus
              />
              <Button
                size="icon"
                variant="ghost"
                className="absolute right-0 top-0"
                onClick={toggleSearch}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMenuOpen && (
          <nav className="mt-4 pb-4 md:hidden animate-fade-in">
            <ul className="flex flex-col space-y-4">
              <li>
                <Link to="/categories" className="block text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  Categories
                </Link>
              </li>
              <li>
                <Link to="/deals" className="block text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  Deals
                </Link>
              </li>
              <li>
                <Link to="/new-arrivals" className="block text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  New Arrivals
                </Link>
              </li>
              <li>
                <Link to="/account" className="block text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  My Account
                </Link>
              </li>
              <li>
                <Link to="/wishlist" className="block text-foreground hover:text-primary transition-colors" onClick={toggleMenu}>
                  Wishlist
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
};

export default NavBar;
