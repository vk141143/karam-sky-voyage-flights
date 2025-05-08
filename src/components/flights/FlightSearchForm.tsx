
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Users, Search } from "lucide-react";

interface FlightSearchFormProps {
  onSearch: (searchData: any) => void;
  className?: string;
}

const FlightSearchForm = ({ onSearch, className = "" }: FlightSearchFormProps) => {
  const [tripType, setTripType] = useState("round");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [passengers, setPassengers] = useState("1");
  const [cabinClass, setCabinClass] = useState("economy");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      tripType,
      origin,
      destination,
      departDate,
      returnDate,
      passengers,
      cabinClass,
    });
  };

  return (
    <Card className={`bg-white shadow-lg rounded-xl ${className}`}>
      <div className="p-6">
        <Tabs defaultValue={tripType} onValueChange={setTripType}>
          <TabsList className="grid grid-cols-2 mb-6">
            <TabsTrigger value="round">Round Trip</TabsTrigger>
            <TabsTrigger value="oneway">One Way</TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin">From</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="origin"
                    placeholder="City or Airport"
                    className="pl-10"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination">To</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="destination"
                    placeholder="City or Airport"
                    className="pl-10"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departDate">Departure Date</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="departDate"
                    type="date"
                    className="pl-10"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {tripType === "round" && (
                <div className="space-y-2">
                  <Label htmlFor="returnDate">Return Date</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="returnDate"
                      type="date"
                      className="pl-10"
                      value={returnDate}
                      onChange={(e) => setReturnDate(e.target.value)}
                      required={tripType === "round"}
                    />
                  </div>
                </div>
              )}
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="passengers">Passengers</Label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Select value={passengers} onValueChange={setPassengers}>
                    <SelectTrigger className="pl-10">
                      <SelectValue placeholder="Select passengers" />
                    </SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                        <SelectItem key={num} value={num.toString()}>
                          {num} {num === 1 ? 'passenger' : 'passengers'}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cabinClass">Cabin Class</Label>
                <Select value={cabinClass} onValueChange={setCabinClass}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select class" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="economy">Economy</SelectItem>
                    <SelectItem value="premium">Premium Economy</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="first">First Class</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <Button type="submit" size="lg" className="w-full bg-sky hover:bg-sky-dark">
              <Search className="mr-2 h-4 w-4" />
              Search Flights
            </Button>
          </form>
        </Tabs>
      </div>
    </Card>
  );
};

export default FlightSearchForm;
