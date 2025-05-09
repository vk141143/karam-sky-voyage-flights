
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { useLanguage } from "../language/LanguageProvider";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface PassengerCounts {
  adults: number;
  children: number;
  infants: number;
  seniors: number;
}

interface PassengerSelectorProps {
  onChange: (counts: PassengerCounts) => void;
  value: PassengerCounts;
}

export default function PassengerSelector({ onChange, value }: PassengerSelectorProps) {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);
  const [counts, setCounts] = useState<PassengerCounts>(value);
  const [activeTab, setActiveTab] = useState<"adults" | "children" | "infants" | "seniors">("adults");
  
  // Store passenger names
  const [passengerDetails, setPassengerDetails] = useState<Record<string, string[]>>({
    adults: Array(value.adults).fill(""),
    children: Array(value.children).fill(""),
    infants: Array(value.infants).fill(""),
    seniors: Array(value.seniors).fill(""),
  });

  const handleCountChange = (type: keyof PassengerCounts, increment: number) => {
    const newCounts = { ...counts };
    
    // Set minimum and maximum values
    if (type === "adults") {
      // At least 1 adult required
      newCounts[type] = Math.max(1, Math.min(9, newCounts[type] + increment));
    } else {
      newCounts[type] = Math.max(0, Math.min(9, newCounts[type] + increment));
    }
    
    // Update the names array length to match the new count
    const newNames = [...passengerDetails[type]];
    if (increment > 0) {
      // Add empty names if count increased
      while (newNames.length < newCounts[type]) {
        newNames.push("");
      }
    } else if (increment < 0) {
      // Remove names if count decreased
      while (newNames.length > newCounts[type]) {
        newNames.pop();
      }
    }
    
    setPassengerDetails({
      ...passengerDetails,
      [type]: newNames
    });
    
    setCounts(newCounts);
  };

  const handleNameChange = (type: string, index: number, name: string) => {
    const newNames = [...passengerDetails[type]];
    newNames[index] = name;
    
    setPassengerDetails({
      ...passengerDetails,
      [type]: newNames
    });
  };

  const handleApply = () => {
    onChange(counts);
    setOpen(false);
  };

  const totalPassengers = Object.values(counts).reduce((sum, count) => sum + count, 0);
  
  const passengerTypeLabels: Record<string, string> = {
    adults: 'Adults (18+)',
    children: 'Children (2-17)',
    infants: 'Infants (0-2)',
    seniors: 'Seniors (65+)'
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full group">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500 group-hover:text-accent transition-colors duration-200" />
          <Input
            readOnly
            className="pl-10 cursor-pointer bg-gray-50 border-gray-200 hover:border-gray-300 transition-colors duration-200"
            value={`${totalPassengers} ${totalPassengers === 1 ? 'Passenger' : 'Passengers'}`}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-medium">Passenger Information</DialogTitle>
        </DialogHeader>
        
        <div className="mt-4">
          <Tabs defaultValue="adults" value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
            <TabsList className="grid grid-cols-4 mb-4">
              <TabsTrigger value="adults" className="text-xs sm:text-sm transition-all duration-200">Adults</TabsTrigger>
              <TabsTrigger value="children" className="text-xs sm:text-sm transition-all duration-200">Children</TabsTrigger>
              <TabsTrigger value="infants" className="text-xs sm:text-sm transition-all duration-200">Infants</TabsTrigger>
              <TabsTrigger value="seniors" className="text-xs sm:text-sm transition-all duration-200">Seniors</TabsTrigger>
            </TabsList>
            
            {(Object.keys(counts) as Array<keyof PassengerCounts>).map((type) => (
              <TabsContent key={type} value={type} className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label htmlFor={type} className="text-base font-medium">
                    {passengerTypeLabels[type]}
                  </Label>
                  <div className="flex items-center gap-3">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleCountChange(type, -1)}
                      disabled={(type === "adults" && counts[type] <= 1) || counts[type] <= 0}
                    >
                      -
                    </Button>
                    <span className="w-6 text-center font-medium">{counts[type]}</span>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="h-8 w-8 hover:bg-gray-100 transition-colors duration-200"
                      onClick={() => handleCountChange(type, 1)}
                      disabled={counts[type] >= 9}
                    >
                      +
                    </Button>
                  </div>
                </div>

                <div className="space-y-3">
                  {counts[type] > 0 && <p className="text-sm text-gray-500">Enter passenger names</p>}
                  {Array.from({ length: counts[type] }).map((_, index) => (
                    <div key={`${type}-${index}`} className="space-y-1">
                      <Label htmlFor={`${type}-name-${index}`} className="text-sm">
                        {type === "adults" ? "Adult" : type === "children" ? "Child" : type === "infants" ? "Infant" : "Senior"} {index + 1}
                      </Label>
                      <Input
                        id={`${type}-name-${index}`}
                        placeholder="Full Name"
                        value={passengerDetails[type][index] || ""}
                        onChange={(e) => handleNameChange(type, index, e.target.value)}
                        className="hover:border-gray-300 transition-colors duration-200"
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        
        <DialogFooter className="gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="mt-2 sm:mt-0 hover:bg-gray-100 transition-colors duration-200">
            Cancel
          </Button>
          <Button onClick={handleApply} className="bg-accent hover:bg-accent-dark transition-colors duration-200">
            Apply
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
