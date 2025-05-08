
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
import { MapPin, Calendar, Search, Users } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";
import PassengerSelector from "./PassengerSelector";
import { motion } from "framer-motion";

interface FlightSearchFormProps {
  onSearch: (searchData: any) => void;
  className?: string;
}

const FlightSearchForm = ({ onSearch, className = "" }: FlightSearchFormProps) => {
  const { t } = useLanguage();
  const [tripType, setTripType] = useState("round");
  const [origin, setOrigin] = useState("");
  const [destination, setDestination] = useState("");
  const [departDate, setDepartDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [cabinClass, setCabinClass] = useState("economy");
  const [passengerCounts, setPassengerCounts] = useState({
    adults: 1,
    children: 0,
    infants: 0,
    seniors: 0
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({
      tripType,
      origin,
      destination,
      departDate,
      returnDate,
      passengerCounts,
      cabinClass,
    });
  };

  return (
    <Card className={`bg-white ${className}`}>
      <div className="p-6">
        <Tabs defaultValue={tripType} onValueChange={setTripType}>
          <TabsList className="grid grid-cols-2 mb-6 bg-gray-100">
            <TabsTrigger value="round" className="data-[state=active]:bg-accent data-[state=active]:text-white">
              {t("Round Trip")}
            </TabsTrigger>
            <TabsTrigger value="oneway" className="data-[state=active]:bg-accent data-[state=active]:text-white">
              {t("One Way")}
            </TabsTrigger>
          </TabsList>
          
          <form onSubmit={handleSubmit} className="space-y-6 animate-content-load" style={{animationDelay: "0.2s"}}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="origin" className="text-gray-700 font-medium">{t("from")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="origin"
                    placeholder="City or Airport"
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-accent"
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="destination" className="text-gray-700 font-medium">{t("to")}</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="destination"
                    placeholder="City or Airport"
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-accent"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                    required
                  />
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="departDate" className="text-gray-700 font-medium">{t("departDate")}</Label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                  <Input
                    id="departDate"
                    type="date"
                    className="pl-10 bg-gray-50 border-gray-200 focus:border-accent"
                    value={departDate}
                    onChange={(e) => setDepartDate(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              {tripType === "round" && (
                <div className="space-y-2">
                  <Label htmlFor="returnDate" className="text-gray-700 font-medium">{t("returnDate")}</Label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                    <Input
                      id="returnDate"
                      type="date"
                      className="pl-10 bg-gray-50 border-gray-200 focus:border-accent"
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
                <Label htmlFor="passengers" className="text-gray-700 font-medium">{t("passengers")}</Label>
                <PassengerSelector 
                  value={passengerCounts} 
                  onChange={setPassengerCounts}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="cabinClass" className="text-gray-700 font-medium">{t("cabinClass")}</Label>
                <Select value={cabinClass} onValueChange={setCabinClass}>
                  <SelectTrigger className="bg-gray-50 border-gray-200">
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
            
            <Button type="submit" size="lg" className="w-full bg-accent hover:bg-accent-dark">
              <Search className="mr-2 h-4 w-4" />
              {t("searchFlights")}
            </Button>
          </form>
        </Tabs>
      </div>
    </Card>
  );
};

export default FlightSearchForm;
