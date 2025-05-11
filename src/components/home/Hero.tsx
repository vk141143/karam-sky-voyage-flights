
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import { useTheme } from "@/components/theme/ThemeProvider";

const Hero = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative pt-16 pb-16 md:pt-20 md:pb-20 overflow-hidden">
      {/* Background GIF */}
      <div className="absolute inset-0 w-full h-full overflow-hidden z-0">
        <img
          src="/lovable-uploads/4d48ff10-e05d-4b00-9d50-78006466a550.gif"
          alt="Flight background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>
      
      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Hero Content */}
          <div className="text-center md:text-left md:col-span-5 appear-animated">
            <h1 className="font-bold mb-4 text-white">
              Explore the World <span className="text-accent">With Ease</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Find and book flights to your dream destinations. Hassle-free travel planning starts here.
            </p>
            
            {/* Theme-based image with promotional gif */}
            <div className="hidden md:block rounded-lg overflow-hidden shadow-xl relative">
              <img 
                src="/lovable-uploads/cb77f374-9956-49ad-8ffd-02d98680cb64.png"
                alt="10% off mobile booking promo" 
                className="w-full h-auto rounded-lg"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <Button size="lg" variant="destructive" className="font-bold">
                  10% OFF - Book Now!
                </Button>
              </div>
            </div>
          </div>

          {/* Search Form - MakeMyTrip style with shadow */}
          <Card className="bg-white dark:bg-navy/90 rounded-2xl shadow-xl mx-auto w-full md:col-span-7 border-0 transform transition-all duration-500 hover:shadow-2xl">
            <FlightSearchForm onSearch={(data) => console.log(data)} className="p-0" />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
