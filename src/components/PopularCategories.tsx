
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const popularCategories = [
  {
    id: 1,
    name: "Smartphones",
    image: "public/shopping.webp",
    link: "/category/smartphones",
    count: 245,
  },
  {
    id: 2,
    name: "Laptops",
    image: "download.jpeg",
    link: "/category/laptops",
    count: 187,
  },
  {
    id: 3,
    name: "Watches",
    image: "images (2).jpeg",
    link: "/category/watches",
    count: 152,
  },
  {
    id: 4,
    name: "Headphones",
    image: "images (4).jpeg",
    link: "/category/headphones",
    count: 124,
  },
];

const PopularCategories = () => {
  return (
    <section className="my-12">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6">Popular Categories</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCategories.map((category) => (
            <Link to={category.link} key={category.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full group">
                <CardContent className="p-0">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-30"></div>
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-bold text-xl">{category.name}</h3>
                      <p className="text-sm">{category.count} products</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularCategories;
