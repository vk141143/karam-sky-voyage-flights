
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Search, Calendar, MapPin } from "lucide-react";
import { Card } from "@/components/ui/card";

const Hero = () => {
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departureDate, setDepartureDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      origin,
      destination,
      departureDate,
      returnDate,
      passengers,
    });
    // Implement search functionality
  };

  return (
    <section className="relative bg-gradient-to-br from-sky-900 to-navy pt-32 pb-20 md:pt-40 md:pb-32">
      {/* Background patterns - circles */}
      <div className="absolute top-10 left-10 w-24 h-24 rounded-full bg-sky/5"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-sky/5"></div>
      <div className="absolute top-40 right-20 w-16 h-16 rounded-full bg-accent/10"></div>
      
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Hero Content */}
          <div className="text-white appear-animated">
            <h1 className="font-bold mb-4">
              Explore the World <span className="text-accent">With Ease</span>
            </h1>
            <p className="text-xl mb-8 text-gray-200 max-w-lg">
              Find and book flights to your dream destinations. Hassle-free travel planning starts here.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-accent hover:bg-accent-dark">
                Search Flights
              </Button>
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10">
                Learn More
              </Button>
            </div>
          </div>

          {/* Search Form */}
          <Card className="bg-white/95 backdrop-blur-sm p-6 rounded-2xl shadow-xl">
            <Tabs defaultValue="flights" className="w-full">
              <TabsList className="w-full mb-6">
                <TabsTrigger value="flights" className="flex-1">Flights</TabsTrigger>
              </TabsList>
              <TabsContent value="flights" className="mt-0">
                <form onSubmit={handleSearch} className="space-y-6">
                  {/* Origin & Destination */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="origin" className="text-gray-700">From</Label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                          id="origin"
                          placeholder="City or Airport"
                          className="pl-9"
                          value={origin}
                          onChange={(e) => setOrigin(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="destination" className="text-gray-700">To</Label>
                      <div className="relative">
                        <MapPin size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                          id="destination"
                          placeholder="City or Airport"
                          className="pl-9"
                          value={destination}
                          onChange={(e) => setDestination(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="departure" className="text-gray-700">Departure</Label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                          id="departure"
                          type="date"
                          className="pl-9"
                          value={departureDate}
                          onChange={(e) => setDepartureDate(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="return" className="text-gray-700">Return</Label>
                      <div className="relative">
                        <Calendar size={16} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
                        <Input
                          id="return"
                          type="date"
                          className="pl-9"
                          value={returnDate}
                          onChange={(e) => setReturnDate(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Passengers */}
                  <div className="space-y-2">
                    <Label htmlFor="passengers" className="text-gray-700">Passengers</Label>
                    <Input
                      id="passengers"
                      type="number"
                      min="1"
                      max="10"
                      value={passengers}
                      onChange={(e) => setPassengers(e.target.value)}
                      required
                    />
                  </div>

                  <Button type="submit" className="w-full bg-sky hover:bg-sky-dark">
                    <Search size={16} className="mr-2" />
                    Search Flights
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Hero;
