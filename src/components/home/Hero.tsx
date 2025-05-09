
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FlightSearchForm from "@/components/flights/FlightSearchForm";

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-b from-white to-gray-50 pt-28 pb-16 md:pt-32 md:pb-20">
      {/* Background patterns - subtle and professional */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-gray-100 opacity-70"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-gray-100 opacity-70"></div>
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-gray-100 opacity-70"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8">
          {/* Hero Content */}
          <div className="text-center mx-auto max-w-2xl appear-animated">
            <h1 className="font-bold mb-4 text-navy">
              Explore the World <span className="text-accent">With Ease</span>
            </h1>
            <p className="text-xl mb-8 text-gray-600 max-w-lg mx-auto">
              Find and book flights to your dream destinations. Hassle-free travel planning starts here.
            </p>
          </div>

          {/* Search Form - MakeMyTrip style with shadow */}
          <Card className="bg-white rounded-2xl shadow-xl mx-auto w-full max-w-4xl border-0 transform transition-all duration-500 hover:shadow-2xl">
            <FlightSearchForm onSearch={(data) => console.log(data)} className="p-0" />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
