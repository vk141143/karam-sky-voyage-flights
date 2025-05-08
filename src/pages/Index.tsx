
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import Features from "@/components/home/Features";
import PopularDestinations from "@/components/home/PopularDestinations";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";
import SpecialOffers from "@/components/home/SpecialOffers";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        <Features />
        <PopularDestinations />
        <SpecialOffers />
        <Testimonials />
        <NewsletterSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
