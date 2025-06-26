
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import HeroBanner from "@/components/HeroBanner";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import PromoBanner from "@/components/PromoBanner";
import PopularCategories from "@/components/PopularCategories";
import Newsletter from "@/components/Newsletter";
import TestimonialSection from "@/components/TestimonialSection";
import FeaturesList from "@/components/FeaturesList";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <main className="flex-grow">
        <HeroBanner />
        <FeaturesList />
        <CategorySection />
        <FeaturedProducts />
        <PromoBanner />
        <PopularCategories />
        <TestimonialSection />
        <Newsletter />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
