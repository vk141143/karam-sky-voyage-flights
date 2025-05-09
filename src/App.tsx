
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { LanguageProvider } from "./components/language/LanguageProvider";

// Lazy load pages for better performance
const Index = lazy(() => import("./pages/Index"));
const FlightsPage = lazy(() => import("./pages/FlightsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const ManageBookingsPage = lazy(() => import("./pages/ManageBookingsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));

// Create a Query client
const queryClient = new QueryClient();

// Loading component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-navy-dark">
    <div className="text-center">
      <div className="animate-pulse-slow text-4xl font-bold mb-4 text-sky">SkyVoyage</div>
      <p className="text-gray-500 dark:text-gray-400">Loading your adventure...</p>
    </div>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <LanguageProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Suspense fallback={<PageLoading />}>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="/flights" element={<FlightsPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/manage-bookings" element={<ManageBookingsPage />} />
                <Route path="/support" element={<SupportPage />} />
                {/* Catch-all route */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </BrowserRouter>
        </TooltipProvider>
      </LanguageProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
