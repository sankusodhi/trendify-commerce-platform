
import { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const banners = [
  {
    id: 1,
    title: "Summer Collection 2025",
    subtitle: "Up to 50% off on selected items",
    buttonText: "Shop Now",
    buttonLink: "/summer-collection",
    image: "WEB_bannersun_sun_1.webp",
    bgColor: "bg-blue-500",
  },
  {
    id: 2,
    title: "New Arrivals",
    subtitle: "Check out the latest fashion trends",
    buttonText: "Explore",
    buttonLink: "/new-arrivals",
    image: "Shop-Products-Social-Media-Banner-Design-Template-1180x664.jpg",
    bgColor: "bg-emerald-500",
  },
  {
    id: 3,
    title: "Tech Gadgets",
    subtitle: "Discover innovative products",
    buttonText: "View Products",
    buttonLink: "/tech-gadgets",
    image: "360_F_691179587_QSctAaNAIbYMjexjEV3w8clmvzcXmJuU.jpg",
    bgColor: "bg-indigo-500",
  },
];

const HeroBanner = () => {
  const [currentBanner, setCurrentBanner] = useState(0);

  const nextBanner = () => {
    setCurrentBanner((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevBanner = () => {
    setCurrentBanner((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  useEffect(() => {
    const interval = setInterval(() => {
      nextBanner();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const banner = banners[currentBanner];

  return (
    <div className="relative overflow-hidden rounded-lg shadow-md my-6">
      <div
        className={`relative ${banner.bgColor} h-64 md:h-80 lg:h-96 w-full flex items-center`}
      >
        <img
          src={banner.image}
          alt={banner.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="relative z-10 text-white container-custom flex flex-col items-start justify-center h-full">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-2 animate-slide-in">
            {banner.title}
          </h2>
          <p className="text-lg md:text-xl mb-6 max-w-lg animate-slide-in animation-delay-100">
            {banner.subtitle}
          </p>
          <Link to={banner.buttonLink}>
            <Button className="bg-white text-primary hover:bg-white/90 animate-slide-in animation-delay-200">
              {banner.buttonText}
            </Button>
          </Link>
        </div>

        {/* Navigation Buttons */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/40 z-20"
          onClick={prevBanner}
        >
          <ArrowLeft className="h-6 w-6" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 text-white hover:bg-black/40 z-20"
          onClick={nextBanner}
        >
          <ArrowRight className="h-6 w-6" />
        </Button>

        {/* Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 z-20">
          {banners.map((_, index) => (
            <button
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === currentBanner ? "bg-white" : "bg-white/50"
              }`}
              onClick={() => setCurrentBanner(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
