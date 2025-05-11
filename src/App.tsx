
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import NotFound from "./pages/NotFound";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import { LanguageProvider } from "./components/language/LanguageProvider";
import PageTransition from "./components/layout/PageTransition";

// Import Index directly instead of lazy loading it to avoid dynamic import issues
import Index from "./pages/Index";

// Lazy load other pages for better performance
const FlightsPage = lazy(() => import("./pages/FlightsPage"));
const LoginPage = lazy(() => import("./pages/LoginPage"));
const RegisterPage = lazy(() => import("./pages/RegisterPage"));
const ManageBookingsPage = lazy(() => import("./pages/ManageBookingsPage"));
const SupportPage = lazy(() => import("./pages/SupportPage"));
const AdminPage = lazy(() => import("./pages/AdminPage"));
const OffersPage = lazy(() => import("./pages/OffersPage"));

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

// Route component with transition
const TransitionedRoute = ({ element }: { element: React.ReactNode }) => {
  return (
    <PageTransition>
      {element}
    </PageTransition>
  );
};

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
                <Route path="/" element={<TransitionedRoute element={<Index />} />} />
                <Route path="/flights" element={<TransitionedRoute element={<FlightsPage />} />} />
                <Route path="/login" element={<TransitionedRoute element={<LoginPage />} />} />
                <Route path="/register" element={<TransitionedRoute element={<RegisterPage />} />} />
                <Route path="/manage-bookings" element={<TransitionedRoute element={<ManageBookingsPage />} />} />
                <Route path="/support" element={<TransitionedRoute element={<SupportPage />} />} />
                <Route path="/admin" element={<TransitionedRoute element={<AdminPage />} />} />
                <Route path="/offers" element={<TransitionedRoute element={<OffersPage />} />} />
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
