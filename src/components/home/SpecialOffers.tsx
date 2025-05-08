
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface Offer {
  id: number;
  title: string;
  description: string;
  discount: string;
  expiry: string;
  badge: string;
  code: string;
}

const SpecialOffers = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Simulate loading delay for animation
    const timer = setTimeout(() => {
      setIsLoaded(true);
    }, 700);

    return () => clearTimeout(timer);
  }, []);

  const offers: Offer[] = [
    {
      id: 1,
      title: "Summer Special",
      description: "Fly to top summer destinations worldwide with our exclusive discount.",
      discount: "15% OFF",
      expiry: "Valid until August 31, 2025",
      badge: "Limited Time",
      code: "SUMMER15",
    },
    {
      id: 2,
      title: "Early Bird Discount",
      description: "Book your flights 60 days in advance and enjoy special savings.",
      discount: "20% OFF",
      expiry: "Always available for early bookings",
      badge: "Popular",
      code: "EARLYBIRD20",
    },
    {
      id: 3,
      title: "Weekend Getaway",
      description: "Special rates for weekend flights to selected destinations.",
      discount: "10% OFF",
      expiry: "Valid for travel on Fri-Sun",
      badge: "Trending",
      code: "WEEKEND10",
    },
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12">
          <div className="max-w-2xl">
            <h2 className="text-navy mb-4">Special Offers & Deals</h2>
            <p className="text-gray-600">
              Take advantage of our limited-time offers and save on your next flight booking.
            </p>
          </div>
          <Button variant="outline" asChild className="mt-4 md:mt-0">
            <Link to="/offers">View All Offers</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <Card 
              key={offer.id} 
              className={`border border-gray-200 overflow-hidden hover-lift transition-all duration-500 ${
                isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-xl font-semibold">{offer.title}</h3>
                  <Badge variant="secondary" className="bg-sky-light text-sky">
                    {offer.badge}
                  </Badge>
                </div>
                <p className="text-gray-600 mb-4">{offer.description}</p>
                <div className="bg-gray-50 p-3 rounded-lg mb-4 text-center">
                  <span className="block text-sm text-gray-500">Use code:</span>
                  <span className="font-mono text-lg font-bold">{offer.code}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-accent font-bold text-xl">{offer.discount}</span>
                  <span className="text-sm text-gray-500">{offer.expiry}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SpecialOffers;
