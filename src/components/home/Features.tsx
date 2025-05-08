
import { Card, CardContent } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: "🔍",
      title: "Easy Search",
      description: "Find flights quickly with our intuitive search tools.",
    },
    {
      icon: "💰",
      title: "Best Deals",
      description: "Discover the most competitive prices on flights worldwide.",
    },
    {
      icon: "⚡",
      title: "Fast Booking",
      description: "Book your tickets in just a few clicks without complications.",
    },
    {
      icon: "🔄",
      title: "Easy Changes",
      description: "Modify your bookings without hassle when plans change.",
    },
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16 appear-animated">
          <h2 className="text-navy mb-4">Why Choose SkyVoyage?</h2>
          <p className="text-gray-600">
            We offer an exceptional booking experience with features designed to make your travel planning seamless and stress-free.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border border-gray-200 overflow-hidden hover-lift">
              <CardContent className="p-6 text-center">
                <span className="text-4xl mb-4 inline-block">{feature.icon}</span>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
