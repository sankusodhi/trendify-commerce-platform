
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const categories = [
  {
    id: 1,
    name: "Electronics",
    image: "83f551e22a77d6c513ea6a61805fd643.jpg",
    link: "https://www.indiamart.com/?back=1",
  },
  {
    id: 2,
    name: "Fashion",
    image: "g59pj_512.webp",
    link: "https://www.meesho.com/western-dress-western-dress-party-wear-dresses-for-women/p/81krjx",
  },
  {
    id: 3,
    name: "Home & Kitchen",
    image: "ab9bb2bc8736099632a167778fb33226.jpg",
    link: "/category/home-kitchen",
  },
  {
    id: 4,
    name: "Beauty",
    image: "beauty-charms-mobile-main-banner-3-66d1dece86451.webp",
    link: "/category/beauty",
  },
  {
    id: 5,
    name: "Toys & Games",
    image: "44063263_kxpnaXsvmlq38NHOuwO6A45eq4ueGGN1OXF34W3XTI0.jpg",
    link: "/category/toys-games",
  },
  {
    id: 6,
    name: "Sports",
    image: "7236af9487a73ebb646bac7269457feb.webp",
    link: "/category/sports",
  },
];

const CategorySection = () => {
  return (
    <section className="my-12">
      <div className="container-custom">
        <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {categories.map((category) => (
            <Link to={category.link} key={category.id}>
              <Card className="overflow-hidden hover:shadow-md transition-shadow h-full">
                <CardContent className="p-0">
                  <div className="flex flex-col items-center p-4">
                    <div className=" overflow-hidden mb-3">
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="font-medium text-center">{category.name}</h3>
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
