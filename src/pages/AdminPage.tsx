
import { useState, useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, Tooltip, Legend, Cell, ResponsiveContainer } from "recharts";
import { useToast } from "@/hooks/use-toast";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";
import { Label } from "@/components/ui/label"; // Added import for the Label component
import { Settings, User, Users, Plus } from "lucide-react";

const COLORS = ["#0E86D4", "#055C9D", "#2C3E50", "#FF5722", "#E64A19"];

const AdminPage = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("dashboard");

  // Simulated data
  const [users, setUsers] = useState<{ id: number; name: string; email: string; dateJoined: string; status: string }[]>([]);
  const [bookings, setBookings] = useState<{ id: number; user: string; destination: string; date: string; amount: number }[]>([]);
  const [salesData, setSalesData] = useState<{ name: string; value: number }[]>([]);
  const [destinationData, setDestinationData] = useState<{ name: string; visits: number }[]>([]);

  // Mock data loading
  useEffect(() => {
    const timer = setTimeout(() => {
      setUsers([
        { id: 1, name: "John Doe", email: "john@example.com", dateJoined: "2025-04-18", status: "Active" },
        { id: 2, name: "Jane Smith", email: "jane@example.com", dateJoined: "2025-04-17", status: "Active" },
        { id: 3, name: "Robert Johnson", email: "robert@example.com", dateJoined: "2025-04-15", status: "Inactive" },
        { id: 4, name: "Emily Davis", email: "emily@example.com", dateJoined: "2025-04-10", status: "Active" },
        { id: 5, name: "Michael Wilson", email: "michael@example.com", dateJoined: "2025-04-05", status: "Active" },
      ]);
      
      setBookings([
        { id: 101, user: "John Doe", destination: "Paris", date: "2025-06-15", amount: 450 },
        { id: 102, user: "Jane Smith", destination: "Tokyo", date: "2025-07-23", amount: 780 },
        { id: 103, user: "Robert Johnson", destination: "New York", date: "2025-05-10", amount: 380 },
        { id: 104, user: "Emily Davis", destination: "Dubai", date: "2025-08-05", amount: 520 },
        { id: 105, user: "Michael Wilson", destination: "London", date: "2025-09-12", amount: 410 },
      ]);
      
      setSalesData([
        { name: "Flights", value: 4500 },
        { name: "Hotels", value: 2300 },
        { name: "Packages", value: 1800 },
        { name: "Insurance", value: 900 },
        { name: "Car Rentals", value: 600 }
      ]);
      
      setDestinationData([
        { name: "Paris", visits: 120 },
        { name: "Tokyo", visits: 98 },
        { name: "New York", visits: 86 },
        { name: "Dubai", visits: 99 },
        { name: "London", visits: 85 }
      ]);
      
      setIsLoading(false);
    }, 1200);
    
    return () => clearTimeout(timer);
  }, []);

  const handleOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Offer Created",
      description: "The special offer has been published successfully.",
    });
  };

  const handleDestinationSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Destination Added",
      description: "The new destination has been added to popular destinations.",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 py-8 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-navy dark:text-white mb-2">Admin Dashboard</h1>
            <p className="text-gray-600 dark:text-gray-300">Manage your travel platform in one place</p>
          </div>

          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
            <TabsList className="grid grid-cols-4 gap-4 bg-transparent">
              <TabsTrigger 
                value="dashboard" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Dashboard
              </TabsTrigger>
              <TabsTrigger 
                value="users" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Users
              </TabsTrigger>
              <TabsTrigger 
                value="offers" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Manage Offers
              </TabsTrigger>
              <TabsTrigger 
                value="destinations" 
                className="data-[state=active]:bg-white dark:data-[state=active]:bg-gray-800 data-[state=active]:shadow"
              >
                Destinations
              </TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard" className="space-y-4 animate-content-load">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-accent"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">$45,231.89</div>
                    <p className="text-xs text-muted-foreground">+20.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Bookings</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-accent"
                    >
                      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                      <circle cx="9" cy="7" r="4" />
                      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+2350</div>
                    <p className="text-xs text-muted-foreground">+180.1% from last month</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Users</CardTitle>
                    <Users className="h-4 w-4 text-accent" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">+573</div>
                    <p className="text-xs text-muted-foreground">+201 since last week</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      className="h-4 w-4 text-accent"
                    >
                      <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                    </svg>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">32.5%</div>
                    <p className="text-xs text-muted-foreground">+7% from last month</p>
                  </CardContent>
                </Card>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Revenue by Category</CardTitle>
                    <CardDescription>Distribution of sales across different categories</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {isLoading ? (
                      <div className="w-full h-[300px] flex items-center justify-center">
                        <Skeleton className="w-[300px] h-[300px] rounded-full" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                          <Pie
                            data={salesData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {salesData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
                
                <Card className="col-span-1">
                  <CardHeader>
                    <CardTitle>Popular Destinations</CardTitle>
                    <CardDescription>Most visited destinations this month</CardDescription>
                  </CardHeader>
                  <CardContent className="pl-2">
                    {isLoading ? (
                      <div className="space-y-3">
                        <Skeleton className="h-[250px] w-full" />
                      </div>
                    ) : (
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart
                          data={destinationData}
                          margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                          }}
                        >
                          <XAxis dataKey="name" />
                          <YAxis />
                          <Tooltip />
                          <Legend />
                          <Bar dataKey="visits" fill="#0E86D4" name="Visits" />
                        </BarChart>
                      </ResponsiveContainer>
                    )}
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Bookings</CardTitle>
                  <CardDescription>Latest travel bookings on your platform</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>User</TableHead>
                          <TableHead>Destination</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {bookings.map((booking) => (
                          <TableRow key={booking.id}>
                            <TableCell className="font-medium">{booking.id}</TableCell>
                            <TableCell>{booking.user}</TableCell>
                            <TableCell>{booking.destination}</TableCell>
                            <TableCell>{booking.date}</TableCell>
                            <TableCell className="text-right">${booking.amount}</TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users" className="animate-content-load">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>View and manage registered users</CardDescription>
                </CardHeader>
                <CardContent>
                  {isLoading ? (
                    <div className="space-y-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <div key={i} className="flex items-center space-x-4">
                          <Skeleton className="h-12 w-12 rounded-full" />
                          <div className="space-y-2">
                            <Skeleton className="h-4 w-[250px]" />
                            <Skeleton className="h-4 w-[200px]" />
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Name</TableHead>
                          <TableHead>Email</TableHead>
                          <TableHead>Date Joined</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {users.map((user) => (
                          <TableRow key={user.id}>
                            <TableCell className="font-medium">{user.id}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.dateJoined}</TableCell>
                            <TableCell>
                              <span className={`px-2 py-1 rounded-full text-xs ${
                                user.status === "Active" 
                                  ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200" 
                                  : "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              }`}>
                                {user.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">
                              <Button variant="outline" size="sm">
                                <Settings className="h-4 w-4 mr-1" />
                                Manage
                              </Button>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="offers" className="animate-content-load">
              <Card>
                <CardHeader>
                  <CardTitle>Create Special Offer</CardTitle>
                  <CardDescription>Add new limited-time offers for flights</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleOfferSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="offerTitle">Offer Title</Label>
                        <Input id="offerTitle" placeholder="e.g. Summer Special" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="offerCode">Promo Code</Label>
                        <Input id="offerCode" placeholder="e.g. SUMMER25" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="discountAmount">Discount Amount (%)</Label>
                        <Input id="discountAmount" type="number" min="1" max="100" placeholder="25" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input id="expiryDate" type="date" required />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offerDescription">Description</Label>
                      <Input id="offerDescription" placeholder="Brief description of the offer" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="offerBadge">Badge Text</Label>
                      <Input id="offerBadge" placeholder="e.g. Limited Time, Popular" />
                    </div>
                    <Button type="submit" className="bg-accent hover:bg-accent-dark">
                      <Plus className="mr-2 h-4 w-4" /> Create Offer
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="destinations" className="animate-content-load">
              <Card>
                <CardHeader>
                  <CardTitle>Add Popular Destination</CardTitle>
                  <CardDescription>Add new destinations to the popular section</CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDestinationSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="destinationName">Destination Name</Label>
                        <Input id="destinationName" placeholder="e.g. Barcelona" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="destinationCountry">Country</Label>
                        <Input id="destinationCountry" placeholder="e.g. Spain" required />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="startingPrice">Starting Price ($)</Label>
                        <Input id="startingPrice" type="number" placeholder="299" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="imageUrl">Image URL</Label>
                        <Input id="imageUrl" type="url" placeholder="https://example.com/image.jpg" required />
                      </div>
                    </div>
                    <Button type="submit" className="bg-accent hover:bg-accent-dark">
                      <Plus className="mr-2 h-4 w-4" /> Add Destination
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AdminPage;
