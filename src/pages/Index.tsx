
import { useEffect, useRef } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import PopularDestinations from "@/components/home/PopularDestinations";
import Testimonials from "@/components/home/Testimonials";
import NewsletterSection from "@/components/home/NewsletterSection";
import SpecialOffers from "@/components/home/SpecialOffers";

const Index = () => {
  // Scroll to top on page load
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // References to sections
  const whyChooseUsRef = useRef<HTMLDivElement>(null);
  const destinationsRef = useRef<HTMLDivElement>(null);
  const offersRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);
  const newsletterRef = useRef<HTMLDivElement>(null);

  // Function to check if element is in viewport
  const useIntersectionObserver = (refs: React.RefObject<HTMLElement>[]) => {
    useEffect(() => {
      const observers: IntersectionObserver[] = [];

      refs.forEach((ref) => {
        if (ref.current) {
          const observer = new IntersectionObserver(
            (entries) => {
              entries.forEach((entry) => {
                if (entry.isIntersecting) {
                  entry.target.classList.add("animate-content-load");
                  // Once animated, no need to observe anymore
                  observer.unobserve(entry.target);
                }
              });
            },
            {
              root: null,
              rootMargin: "0px",
              threshold: 0.15, // Increased threshold for more visible entry
            }
          );

          observer.observe(ref.current);
          observers.push(observer);
        }
      });

      // Cleanup
      return () => {
        observers.forEach((observer) => observer.disconnect());
      };
    }, [refs]);
  };

  // Apply the observer
  useIntersectionObserver([
    whyChooseUsRef,
    destinationsRef,
    offersRef,
    testimonialsRef,
    newsletterRef,
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Hero />
        
        <div ref={whyChooseUsRef} className="opacity-0 transition-opacity duration-700">
          <WhyChooseUs />
        </div>
        
        <div ref={destinationsRef} className="opacity-0 transition-opacity duration-700">
          <PopularDestinations />
        </div>
        
        <div ref={offersRef} className="opacity-0 transition-opacity duration-700" id="offers">
          <SpecialOffers />
        </div>
        
        <div ref={testimonialsRef} className="opacity-0 transition-opacity duration-700">
          <Testimonials />
        </div>
        
        <div ref={newsletterRef} className="opacity-0 transition-opacity duration-700">
          <NewsletterSection />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Index;
