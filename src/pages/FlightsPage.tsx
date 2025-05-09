
import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import FlightSearchForm from "@/components/flights/FlightSearchForm";
import FlightFilter from "@/components/flights/FlightFilter";
import FlightCard from "@/components/flights/FlightCard";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

const FlightsPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [flights, setFlights] = useState<any[]>([]);
  const [filteredFlights, setFilteredFlights] = useState<any[]>([]);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);

    // Simulate API call to get flight data with progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 5;
      });
    }, 100);

    // Simulate API call to get flight data
    const timer = setTimeout(() => {
      const mockFlights = [
        {
          id: "fl-001",
          airline: {
            name: "Delta Airlines",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQeRgMUNl9HwagMLlf_DQl2b_cgzJG-yWbyLdqFDhJDz2pZmHG0qSjPPFQEqHMevpQD6o&usqp=CAU",
          },
          departureTime: "08:30",
          departureAirport: "New York (JFK)",
          departureCode: "JFK",
          arrivalTime: "11:45",
          arrivalAirport: "Los Angeles (LAX)",
          arrivalCode: "LAX",
          duration: "5h 15m",
          stops: 0,
          price: "$320",
          discount: "-15%",
          seatsLeft: 5,
        },
        {
          id: "fl-002",
          airline: {
            name: "United Airlines",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOl7mXUMKEqn0or9Ia-KSolfSDHGgQNs8B7Q&usqp=CAU",
          },
          departureTime: "10:15",
          departureAirport: "New York (JFK)",
          departureCode: "JFK",
          arrivalTime: "14:30",
          arrivalAirport: "Los Angeles (LAX)",
          arrivalCode: "LAX",
          duration: "6h 15m",
          stops: 1,
          stopDetails: [
            { airport: "Chicago (ORD)", duration: "1h 20m" },
          ],
          price: "$280",
        },
        {
          id: "fl-003",
          airline: {
            name: "American Airlines",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRSmLLX9wgwOXE1KwQ4ZMCt_OXwGpbiIosMJg&usqp=CAU",
          },
          departureTime: "14:20",
          departureAirport: "New York (JFK)",
          departureCode: "JFK",
          arrivalTime: "17:35",
          arrivalAirport: "Los Angeles (LAX)",
          arrivalCode: "LAX",
          duration: "5h 15m",
          stops: 0,
          price: "$350",
          seatsLeft: 2,
        },
        {
          id: "fl-004",
          airline: {
            name: "Emirates",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL-R_dJBCUzLYQF2LBXp9oZrMY-0M6tGEuAQ&usqp=CAU",
          },
          departureTime: "19:45",
          departureAirport: "New York (JFK)",
          departureCode: "JFK",
          arrivalTime: "23:15",
          arrivalAirport: "Los Angeles (LAX)",
          arrivalCode: "LAX",
          duration: "5h 30m",
          stops: 0,
          price: "$410",
        },
        {
          id: "fl-005",
          airline: {
            name: "Lufthansa",
            logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRx8kk7RHgdFGqXe-rrZwXwaMJ5hbOoEeT_vQ&usqp=CAU",
          },
          departureTime: "07:30",
          departureAirport: "New York (JFK)",
          departureCode: "JFK",
          arrivalTime: "13:20",
          arrivalAirport: "Los Angeles (LAX)",
          arrivalCode: "LAX",
          duration: "7h 50m",
          stops: 2,
          stopDetails: [
            { airport: "Chicago (ORD)", duration: "1h 20m" },
            { airport: "Denver (DEN)", duration: "1h 05m" },
          ],
          price: "$260",
          discount: "-25%",
        },
      ];

      setFlights(mockFlights);
      setFilteredFlights(mockFlights);
      setIsLoading(false);
      clearInterval(progressInterval);
      setLoadingProgress(100);
    }, 1500);

    return () => {
      clearTimeout(timer);
      clearInterval(progressInterval);
    };
  }, []);

  const handleSearch = (searchData: any) => {
    setIsLoading(true);
    setLoadingProgress(0);
    
    // Reset progress
    const progressInterval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 8;
      });
    }, 100);
    
    // Simulate search API call
    setTimeout(() => {
      toast.success("Flight search completed!");
      setIsLoading(false);
      clearInterval(progressInterval);
      setLoadingProgress(100);
    }, 1000);
  };

  const handleFilter = (filterData: any) => {
    // Apply filters to the flights
    console.log("Applying filters:", filterData);
    
    // Simulate filtering - in a real app, this would be more complex
    let filtered = [...flights];
    
    // Filter by price range
    filtered = filtered.filter(flight => {
      const price = parseInt(flight.price.replace('$', ''));
      return price >= filterData.priceRange[0] && price <= filterData.priceRange[1];
    });
    
    // Filter by airlines if any are selected
    if (filterData.airlines.length > 0) {
      filtered = filtered.filter(flight => {
        const airlineId = flight.airline.name.toLowerCase().replace(' ', '');
        return filterData.airlines.includes(airlineId);
      });
    }
    
    // Filter by stops if any are selected
    if (filterData.stops.length > 0) {
      filtered = filtered.filter(flight => {
        if (filterData.stops.includes('nonstop') && flight.stops === 0) return true;
        if (filterData.stops.includes('1stop') && flight.stops === 1) return true;
        if (filterData.stops.includes('2stops') && flight.stops >= 2) return true;
        return false;
      });
    }
    
    setFilteredFlights(filtered);
  };

  const handleFlightSelect = (flightId: string) => {
    console.log(`Selected flight: ${flightId}`);
    toast.success("Flight selected! Proceeding to booking details.");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 bg-gray-50 pt-20">
        {/* Search Form */}
        <div className="bg-gray-100 py-12">
          <div className="container mx-auto px-4">
            <h1 className="text-3xl font-bold text-navy mb-6">Find Your Flight</h1>
            <FlightSearchForm onSearch={handleSearch} />
          </div>
        </div>
        
        {/* Results section */}
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Filters */}
            <div className="md:col-span-1">
              <FlightFilter onApplyFilters={handleFilter} />
            </div>
            
            {/* Flight results */}
            <div className="md:col-span-3">
              <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
                <h2 className="text-xl font-semibold">Flight Results</h2>
                <p className="text-gray-500 mb-3">
                  {!isLoading && `${filteredFlights.length} flights found`}
                </p>
                
                {/* Progress bar */}
                {isLoading && (
                  <Progress
                    value={loadingProgress}
                    className="h-1.5 transition-all duration-300"
                  />
                )}
              </div>
              
              {isLoading ? (
                <div className="flex flex-col items-center justify-center py-12 bg-white rounded-lg shadow-sm">
                  <Loader2 className="h-8 w-8 animate-spin text-accent mb-4" />
                  <p className="text-gray-500">Searching for the best flights...</p>
                  <p className="text-gray-400 text-sm mt-1">This might take a moment</p>
                </div>
              ) : filteredFlights.length > 0 ? (
                <div className="space-y-4">
                  {filteredFlights.map((flight) => (
                    <FlightCard 
                      key={flight.id} 
                      flight={flight} 
                      onSelect={handleFlightSelect} 
                    />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 bg-white rounded-lg shadow-sm">
                  <h3 className="text-xl font-medium mb-2">No flights found</h3>
                  <p className="text-gray-500 mb-6">Try adjusting your filters or search criteria.</p>
                  <Button onClick={() => setFilteredFlights(flights)}>Reset Filters</Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default FlightsPage;
