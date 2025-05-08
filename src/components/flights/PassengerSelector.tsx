
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Users } from "lucide-react";
import { useLanguage } from "../language/LanguageProvider";

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

  const handleCountChange = (type: keyof PassengerCounts, increment: number) => {
    const newCounts = { ...counts };
    
    // Set minimum and maximum values
    if (type === "adults") {
      // At least 1 adult required
      newCounts[type] = Math.max(1, Math.min(9, newCounts[type] + increment));
    } else {
      newCounts[type] = Math.max(0, Math.min(9, newCounts[type] + increment));
    }
    
    setCounts(newCounts);
  };

  const handleApply = () => {
    onChange(counts);
    setOpen(false);
  };

  const totalPassengers = Object.values(counts).reduce((sum, count) => sum + count, 0);
  
  const passengerTypeLabels = {
    adults: 'Adults (18+)',
    children: 'Children (2-17)',
    infants: 'Infants (0-2)',
    seniors: 'Seniors (65+)'
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="relative w-full">
          <Users className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            readOnly
            className="pl-10 cursor-pointer"
            value={`${totalPassengers} ${totalPassengers === 1 ? 'Passenger' : 'Passengers'}`}
          />
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Select Passengers</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          {(Object.keys(counts) as Array<keyof PassengerCounts>).map((type) => (
            <div key={type} className="flex items-center justify-between">
              <Label htmlFor={type} className="flex-1">
                {passengerTypeLabels[type]}
              </Label>
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCountChange(type, -1)}
                  disabled={(type === "adults" && counts[type] <= 1) || counts[type] <= 0}
                >
                  -
                </Button>
                <span className="w-6 text-center">{counts[type]}</span>
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => handleCountChange(type, 1)}
                  disabled={counts[type] >= 9}
                >
                  +
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Button onClick={handleApply}>Apply</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
