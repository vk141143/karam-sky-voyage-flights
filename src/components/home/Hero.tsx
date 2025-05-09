
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FlightSearchForm from "@/components/flights/FlightSearchForm";

const Hero = () => {
  return (
    <section className="relative pt-28 pb-16 md:pt-32 md:pb-20 overflow-hidden">
      {/* Background Video */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <video
          autoPlay
          muted
          loop
          className="object-cover w-full h-full"
          poster="/placeholder.svg"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-traveling-through-the-clouds-4069-large.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 gap-8">
          {/* Hero Content */}
          <div className="text-center mx-auto max-w-2xl appear-animated">
            <h1 className="font-bold mb-4 text-white">
              Explore the World <span className="text-accent">With Ease</span>
            </h1>
            <p className="text-xl mb-8 text-white/90 max-w-lg mx-auto">
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
