
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "/83f551e22a77d6c513ea6a61805fd643.jpg",
    link: "/products?category=electronics",
  },
  {
    id: 2,
    name: "Fashion",
    image: "/g59pj_512.webp",
    link: "/products?category=fashion",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "/ab9bb2bc8736099632a167778fb33226.jpg",
    link: "/products?category=home-kitchen",
  },
  {
    id: 4,
    name: "Beauty",
    image: "/beauty-charms-mobile-main-banner-3-66d1dece86451.webp",
    link: "/products?category=beauty",
  },
  {
    id: 5,
    name: "Toys & Games",
    image: "/44063263_kxpnaXsvmlq38NHOuwO6A45eq4ueGGN1OXF34W3XTI0.jpg",
    link: "/products?category=toys-games",
  },
  {
    id: 6,
    name: "Sports",
    image: "/7236af9487a73ebb646bac7269457feb.webp",
    link: "/products?category=sports",
  },
];

const CategorySection = () => {
  return (
    <section className="my-12 py-8">
      <div className="container-custom">
        <h2 className="text-3xl font-bold mb-8 text-foreground">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
          {categories.map((category) => (
            <Link to={category.link} key={category.id} className="group">
              <Card className="overflow-hidden border-border bg-card hover:shadow-lg transition-all duration-300 hover:-translate-y-1 h-full">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center p-4">
                    <div className="w-full aspect-square overflow-hidden rounded-lg mb-3 bg-muted">
                      <img
                        src={category.image}
                        alt={`Shop ${category.name}`}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        loading="lazy"
                      />
                    </div>
                    <h3 className="font-semibold text-center text-foreground text-sm md:text-base">
                      {category.name}
                    </h3>
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

export default CategorySection;
