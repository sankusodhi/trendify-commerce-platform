
import { Truck, Shield, RotateCcw, Clock, CreditCard, MessageSquare } from "lucide-react";

const features = [
  {
    id: 1,
    icon: Truck,
    title: "Fast Delivery",
    description: "Free shipping on orders over $50",
  },
  {
    id: 2,
    icon: Shield,
    title: "Secure Payments",
    description: "100% secure payment",
  },
  {
    id: 3,
    icon: RotateCcw,
    title: "Easy Returns",
    description: "30-day return policy",
  },
  {
    id: 4,
    icon: Clock,
    title: "24/7 Support",
    description: "Dedicated support",
  },
  {
    id: 5,
    icon: CreditCard,
    title: "Flexible Payment",
    description: "Multiple payment options",
  },
  {
    id: 6,
    icon: MessageSquare,
    title: "Product Updates",
    description: "Regular updates on orders",
  },
];

const FeaturesList = () => {
  return (
    <section className="my-12">
      <div className="container-custom">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {features.map((feature) => (
            <div
              key={feature.id}
              className="flex flex-col items-center text-center p-4 rounded-lg hover:bg-secondary transition-colors"
            >
              <feature.icon className="h-8 w-8 text-primary mb-3" />
              <h3 className="font-medium text-sm md:text-base mb-1">{feature.title}</h3>
              <p className="text-xs md:text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesList;
