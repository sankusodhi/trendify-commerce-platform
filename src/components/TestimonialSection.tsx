
import { Star } from "lucide-react";
import { 
  Card, 
  CardContent 
} from "@/components/ui/card";

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Fashion Enthusiast",
    comment:
      "I've been shopping on TrendifyShop for the past year and I'm always impressed by their curated collection. The quality is outstanding and shipping is always fast!",
    rating: 5,
    image: "WhatsApp Image 2025-04-10 at 12.16.55 PM.jpeg",
  },
  {
    id: 2,
    name: "Michael Rodriguez",
    role: "Tech Geek",
    comment:
      "As someone who's always looking for the latest gadgets, TrendifyShop is my go-to place. Their prices are competitive and the customer service is exceptional.",
    rating: 4,
    image: "WhatsApp Image 2025-04-10 at 12.16.55 PM.jpeg",
  },
  {
    id: 3,
    name: "Emily Chen",
    role: "Homemaker",
    comment:
      "I renovated my entire kitchen with products from TrendifyShop. The quality of kitchenware is fantastic, and they arrived safely packaged. Will definitely order again!",
    rating: 5,
    image: "WhatsApp Image 2025-04-10 at 12.16.55 PM.jpeg",
  },
];

const TestimonialSection = () => {
  return (
    <section className="my-12">
      <div className="container-custom">
        <div className="text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-3">
            What Our Customers Say
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Don't just take our word for it — here's what our happy customers have to say about their shopping experience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="h-full">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="flex mr-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < testimonial.rating
                            ? "text-yellow-400 fill-yellow-400"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-foreground mb-4 italic">
                  "{testimonial.comment}"
                </p>
                <div className="flex items-center">
                  <div className="mr-3">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full"
                    />
                  </div>
                  <div>
                    <h4 className="font-semibold">{testimonial.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
