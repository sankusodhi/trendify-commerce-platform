
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const PromoBanner = () => {
  return (
    <section className="my-12">
      <div className="container-custom">
        <div className="bg-gradient-to-r from-primary/90 to-primary rounded-lg overflow-hidden shadow-lg">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 p-8">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                Free Shipping on Orders Over $50
              </h2>
              <p className="text-white/90 mb-6 text-lg">
                Shop now and enjoy free shipping on thousands of products. Limited time offer!
              </p>
              <Link to="/products">
                <Button className="bg-white text-primary hover:bg-white/90">
                  Shop Now
                </Button>
              </Link>
            </div>
            <div className="md:w-1/2 p-4 flex justify-center">
              <img
                src="download (8).jpeg"
                alt="Free Shipping Promotion"
                className="max-h-60 w-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoBanner;
