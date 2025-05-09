
import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, FileText, AlertCircle } from "lucide-react";
import { useLanguage } from "@/components/language/LanguageProvider";

const ManageBookingsPage = () => {
  const { t } = useLanguage();
  const [bookingReference, setBookingReference] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [searchMethod, setSearchMethod] = useState("reference");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log({
      method: searchMethod,
      bookingReference,
      lastName,
      email
    });
    // In a real app, this would call an API to look up the booking
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-900">
      <Navbar />
      <main className="flex-1 py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-navy dark:text-white mb-4">Manage Your Bookings</h1>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Access your flight details, make changes to your reservation, check in online, or cancel your booking.
              </p>
            </div>
            
            <Card className="shadow-md dark:bg-gray-800">
              <CardHeader>
                <CardTitle className="dark:text-white">Find Your Booking</CardTitle>
                <CardDescription className="dark:text-gray-300">
                  Enter your booking details to retrieve your reservation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs 
                  defaultValue="reference" 
                  onValueChange={setSearchMethod} 
                  className="w-full"
                >
                  <TabsList className="grid grid-cols-2 mb-6">
                    <TabsTrigger value="reference">Booking Reference</TabsTrigger>
                    <TabsTrigger value="email">Email Address</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="reference" className="space-y-4">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <label htmlFor="reference" className="text-sm font-medium dark:text-gray-200">
                            Booking Reference
                          </label>
                          <Input 
                            id="reference"
                            value={bookingReference}
                            onChange={(e) => setBookingReference(e.target.value)}
                            placeholder="e.g. FGHT76" 
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                        <div className="space-y-2">
                          <label htmlFor="lastName" className="text-sm font-medium dark:text-gray-200">
                            Last Name
                          </label>
                          <Input 
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            placeholder="Last name as shown on ID" 
                            className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                            required
                          />
                        </div>
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <Search className="mr-2 h-4 w-4" />
                        Search Booking
                      </Button>
                    </form>
                  </TabsContent>
                  
                  <TabsContent value="email" className="space-y-4">
                    <form onSubmit={handleSearch} className="space-y-4">
                      <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium dark:text-gray-200">
                          Email Address
                        </label>
                        <Input 
                          id="email"
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="Email used during booking" 
                          className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="w-full">
                        <Search className="mr-2 h-4 w-4" />
                        Search Booking
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <FileText className="h-10 w-10 text-accent mr-4" />
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Check-in Online</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Check in for your flight 24-48 hours before departure to secure your seat.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2 dark:border-gray-600 dark:text-white">
                    Go to Online Check-in
                  </Button>
                </CardContent>
              </Card>

              <Card className="dark:bg-gray-800">
                <CardContent className="pt-6">
                  <div className="flex items-start mb-4">
                    <AlertCircle className="h-10 w-10 text-accent mr-4" />
                    <div>
                      <h3 className="font-semibold mb-2 dark:text-white">Flight Status</h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        Check the current status of any flight to see if it's on time.
                      </p>
                    </div>
                  </div>
                  <Button variant="outline" className="w-full mt-2 dark:border-gray-600 dark:text-white">
                    Check Flight Status
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ManageBookingsPage;
