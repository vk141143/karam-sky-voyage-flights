
import { useState, useEffect, useRef } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Check } from "lucide-react";

const WhyChooseUs = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setTimeout(() => {
            setIsLoaded(true);
          }, 300);
          observer.unobserve(entries[0].target);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  const features = [
    {
      title: "Best Price Guarantee",
      description: "We offer the best prices on flights with our price match promise."
    },
    {
      title: "Easy Booking Process",
      description: "Book your tickets in just a few clicks with our user-friendly interface."
    },
    {
      title: "24/7 Customer Support",
      description: "Our customer service team is available round-the-clock to assist you."
    },
    {
      title: "Flexible Cancellation",
      description: "Change or cancel your booking with minimal fees and hassle."
    },
    {
      title: "Verified Reviews",
      description: "Read authentic reviews from real travelers before making your decision."
    },
    {
      title: "Rewards Program",
      description: "Earn points on every booking and redeem them for exciting rewards."
    }
  ];

  return (
    <section ref={sectionRef} className="py-20 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-navy dark:text-white mb-4">Why Choose SkyVoyage?</h2>
          <p className="text-gray-600 dark:text-gray-300">
            We provide an exceptional travel experience with premium features designed for your comfort and convenience.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`border border-gray-200 dark:border-gray-700 overflow-hidden hover-lift dark:bg-gray-800 transition-all duration-700 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    <div className="bg-accent/10 dark:bg-accent/20 p-2 rounded-full">
                      <Check className="h-5 w-5 text-accent" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 dark:text-white">{feature.title}</h3>
                    <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
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

export default WhyChooseUs;
