import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  User,
  MapPin,
  Phone,
  Mail,
  Package,
  CreditCard,
  Settings,
  Bell,
  Moon,
  Globe,
  FileText,
  LogOut,
  ChevronRight,
  Edit,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserProfile {
  name: string;
  email: string;
  phone: string;
  addresses: number;
  recentOrders: number;
}

const ProfilePage = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // Mock API call - replace with: await fetch(`${API_BASE_URL}/user/profile`)
        await new Promise((resolve) => setTimeout(resolve, 800));

        setProfile({
          name: "John Doe",
          email: "john.doe@example.com",
          phone: "+91 98765 43210",
          addresses: 2,
          recentOrders: 5,
        });
      } catch (err) {
        toast({
          title: "Error",
          description: "Failed to load profile",
          variant: "destructive",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [toast]);

  const handleLogout = () => {
    toast({
      title: "Logged out",
      description: "You have been successfully logged out",
    });
    // Implement logout logic here
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <NavBar />
        <main className="flex-grow py-8">
          <div className="container-custom max-w-4xl">
            <Skeleton className="h-10 w-48 mb-8" />
            <div className="space-y-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <Card key={i}>
                  <CardHeader>
                    <Skeleton className="h-6 w-32" />
                  </CardHeader>
                  <CardContent>
                    <Skeleton className="h-20 w-full" />
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-grow py-8">
        <div className="container-custom max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-8">
            My Profile
          </h1>

          {/* Profile Info */}
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Profile Information
                </CardTitle>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4 mr-2" />
                  Edit
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4">
                <div className="flex items-center gap-3">
                  <User className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Name</p>
                    <p className="font-medium text-foreground">{profile?.name}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Mail className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <p className="font-medium text-foreground">{profile?.email}</p>
                  </div>
                </div>
                <Separator />
                <div className="flex items-center gap-3">
                  <Phone className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <p className="font-medium text-foreground">{profile?.phone}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Addresses */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="h-5 w-5" />
                Manage Addresses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/addresses">
                  <span>
                    {profile?.addresses} saved {profile?.addresses === 1 ? "address" : "addresses"}
                  </span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Orders */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="h-5 w-5" />
                My Orders
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full justify-between" asChild>
                <Link to="/orders">
                  <span>{profile?.recentOrders} recent orders</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Payment Methods */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="h-5 w-5" />
                Payment Methods
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">Saved Cards</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-foreground">UPI IDs</span>
                  <Badge variant="secondary">0</Badge>
                </div>
                <Button variant="ghost" size="sm">
                  Manage
                </Button>
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <span className="text-sm text-foreground">Cash on Delivery</span>
                <Badge variant="default">Available</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Settings */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Settings className="h-5 w-5" />
                Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Bell className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive order updates and offers
                    </p>
                  </div>
                </div>
                <Switch checked={notifications} onCheckedChange={setNotifications} />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Moon className="h-5 w-5 text-muted-foreground" />
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Switch to dark theme
                    </p>
                  </div>
                </div>
                <Switch checked={darkMode} onCheckedChange={setDarkMode} />
              </div>
              <Separator />
              <Button variant="outline" className="w-full justify-between">
                <div className="flex items-center gap-3">
                  <Globe className="h-5 w-5 text-muted-foreground" />
                  <span>Language</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-muted-foreground">English</span>
                  <ChevronRight className="h-4 w-4" />
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Legal */}
          <Card className="mb-6">
            <CardContent className="pt-6 space-y-3">
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link to="/privacy">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>Privacy Policy</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button variant="ghost" className="w-full justify-between" asChild>
                <Link to="/terms">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-muted-foreground" />
                    <span>Terms & Conditions</span>
                  </div>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
            </CardContent>
          </Card>

          {/* Logout */}
          <Button
            variant="destructive"
            className="w-full"
            size="lg"
            onClick={handleLogout}
          >
            <LogOut className="mr-2 h-5 w-5" />
            Logout
          </Button>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProfilePage;
