
import { useState, useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Shorter timeout for better user experience
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, [children]); // Re-run effect when children change

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/3139cbd8-2f40-4c8c-a807-d7d007e89dba.gif" 
            alt="Loading" 
            className="w-32 h-32 mb-4"
          />
          <p className="text-foreground animate-pulse">Loading your adventure...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageTransition;
