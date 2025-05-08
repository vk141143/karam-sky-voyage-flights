
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ChevronDown, ChevronUp } from "lucide-react";

interface FlightCardProps {
  flight: {
    id: string;
    airline: {
      name: string;
      logo: string;
    };
    departureTime: string;
    departureAirport: string;
    departureCode: string;
    arrivalTime: string;
    arrivalAirport: string;
    arrivalCode: string;
    duration: string;
    stops: number;
    stopDetails?: { airport: string; duration: string }[];
    price: string;
    discount?: string;
    seatsLeft?: number;
  };
  onSelect: (flightId: string) => void;
}

const FlightCard = ({ flight, onSelect }: FlightCardProps) => {
  const [showDetails, setShowDetails] = useState(false);

  return (
    <Card className="mb-4 overflow-hidden hover-lift transition-all duration-300 animate-fade-in">
      <CardContent className="p-0">
        {/* Main flight info row */}
        <div className="p-4 grid grid-cols-12 gap-2 items-center">
          {/* Airline */}
          <div className="col-span-12 sm:col-span-2 flex items-center gap-2 mb-2 sm:mb-0">
            <img
              src={flight.airline.logo}
              alt={flight.airline.name}
              className="w-8 h-8 object-contain"
              loading="lazy"
            />
            <span className="text-sm font-medium">{flight.airline.name}</span>
          </div>

          {/* Flight times */}
          <div className="col-span-12 sm:col-span-6 flex items-center justify-between">
            <div className="text-center">
              <div className="text-lg font-bold">{flight.departureTime}</div>
              <div className="text-xs text-gray-500">{flight.departureCode}</div>
            </div>

            <div className="flex-1 mx-2 flex flex-col items-center">
              <div className="text-xs text-gray-500 mb-1">{flight.duration}</div>
              <div className="w-full flex items-center">
                <div className="h-0.5 flex-1 bg-gray-300"></div>
                <div className="mx-2 text-xs text-gray-500">
                  {flight.stops === 0
                    ? "Direct"
                    : flight.stops === 1
                    ? "1 Stop"
                    : `${flight.stops} Stops`}
                </div>
                <div className="h-0.5 flex-1 bg-gray-300"></div>
              </div>
            </div>

            <div className="text-center">
              <div className="text-lg font-bold">{flight.arrivalTime}</div>
              <div className="text-xs text-gray-500">{flight.arrivalCode}</div>
            </div>
          </div>

          {/* Price */}
          <div className="col-span-12 sm:col-span-4 flex flex-col sm:items-end gap-1 mt-2 sm:mt-0">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-bold text-navy">{flight.price}</span>
              {flight.discount && (
                <Badge variant="secondary" className="text-accent bg-accent/10">
                  {flight.discount}
                </Badge>
              )}
            </div>
            {flight.seatsLeft && flight.seatsLeft < 10 && (
              <span className="text-xs text-red-500">Only {flight.seatsLeft} seats left!</span>
            )}
            <Button className="w-full sm:w-auto mt-2" onClick={() => onSelect(flight.id)}>
              Select
            </Button>
          </div>
        </div>

        {/* Flight details section */}
        <div className="border-t border-gray-100">
          <button
            className="w-full py-2 px-4 text-sm font-medium text-gray-600 flex items-center justify-center gap-1 hover:bg-gray-50 transition-colors"
            onClick={() => setShowDetails(!showDetails)}
          >
            {showDetails ? (
              <>
                Hide details <ChevronUp className="h-4 w-4" />
              </>
            ) : (
              <>
                View details <ChevronDown className="h-4 w-4" />
              </>
            )}
          </button>

          {showDetails && (
            <div className="p-4 bg-gray-50 space-y-4 animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-sm font-medium mb-2">Departure</h4>
                  <div className="flex items-start gap-3">
                    <div className="bg-sky rounded-full w-6 h-6 flex items-center justify-center text-white text-xs mt-0.5">
                      1
                    </div>
                    <div>
                      <p className="font-medium">{flight.departureAirport}</p>
                      <p className="text-sm text-gray-600">Terminal 2</p>
                      <p className="text-sm text-gray-600">Departs at {flight.departureTime}</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-2">Arrival</h4>
                  <div className="flex items-start gap-3">
                    <div className="bg-accent rounded-full w-6 h-6 flex items-center justify-center text-white text-xs mt-0.5">
                      2
                    </div>
                    <div>
                      <p className="font-medium">{flight.arrivalAirport}</p>
                      <p className="text-sm text-gray-600">Terminal 1</p>
                      <p className="text-sm text-gray-600">Arrives at {flight.arrivalTime}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Stopovers */}
              {flight.stopDetails && flight.stopDetails.length > 0 && (
                <div>
                  <h4 className="text-sm font-medium mb-2">Stopover Details</h4>
                  <div className="space-y-3">
                    {flight.stopDetails.map((stop, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="bg-gray-400 rounded-full w-6 h-6 flex items-center justify-center text-white text-xs mt-0.5">
                          {index + 1}
                        </div>
                        <div>
                          <p className="font-medium">{stop.airport}</p>
                          <p className="text-sm text-gray-600">Layover: {stop.duration}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Flight amenities */}
              <div>
                <h4 className="text-sm font-medium mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline" className="bg-gray-100">
                    Wi-Fi
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    Power Outlets
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    In-flight Entertainment
                  </Badge>
                  <Badge variant="outline" className="bg-gray-100">
                    Meals Included
                  </Badge>
                </div>
              </div>

              {/* Baggage info */}
              <div>
                <h4 className="text-sm font-medium mb-2">Baggage Information</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                  <div className="p-2 bg-white rounded border border-gray-200">
                    <span className="text-xs text-gray-500 block">Cabin</span>
                    <span className="font-medium">1 × 7kg</span>
                  </div>
                  <div className="p-2 bg-white rounded border border-gray-200">
                    <span className="text-xs text-gray-500 block">Check-in</span>
                    <span className="font-medium">1 × 23kg</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default FlightCard;
