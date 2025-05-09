
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import { useTheme } from "@/components/theme/ThemeProvider";

const Hero = () => {
  const { theme } = useTheme();
  
  return (
    <section className="relative pt-16 pb-16 md:pt-20 md:pb-20 overflow-hidden">
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
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Hero Content */}
          <div className="text-center md:text-left md:col-span-5 appear-animated">
            <h1 className="font-bold mb-4 text-white">
              Explore the World <span className="text-accent">With Ease</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Find and book flights to your dream destinations. Hassle-free travel planning starts here.
            </p>
            
            {/* Theme-based image */}
            <div className="hidden md:block rounded-lg overflow-hidden shadow-xl">
              {theme === 'dark' ? (
                <img 
                  src="https://images.unsplash.com/photo-1470813740244-df37b8c1edcb"
                  alt="Travel inspiration - night view" 
                  className="w-full h-auto rounded-lg"
                />
              ) : (
                <img 
                  src="https://images.unsplash.com/photo-1500673922987-e212871fec22"
                  alt="Travel inspiration - day view" 
                  className="w-full h-auto rounded-lg"
                />
              )}
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
