
import { useState, useEffect } from "react";

interface PageTransitionProps {
  children: React.ReactNode;
}

const PageTransition = ({ children }: PageTransitionProps) => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1200);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <img 
            src="/lovable-uploads/0733a505-b58e-4f92-9d69-cd7810d4487f.png" 
            alt="Loading" 
            className="w-32 h-32 mb-4 animate-pulse"
          />
          <p className="text-foreground animate-pulse">Loading...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

export default PageTransition;
