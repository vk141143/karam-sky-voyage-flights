
import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "hi" | "ur" | "te";

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
};

const translations: Record<Language, Record<string, string>> = {
  en: {
    home: "Home",
    flights: "Flights",
    manageBookings: "Manage Bookings",
    offers: "Offers",
    support: "Help & Support",
    login: "Login",
    signup: "Sign Up",
    search: "Search",
    from: "From",
    to: "To",
    departDate: "Departure Date",
    returnDate: "Return Date",
    passengers: "Passengers",
    cabinClass: "Cabin Class",
    searchFlights: "Search Flights",
    // Add more translations as needed
  },
  hi: {
    home: "होम",
    flights: "उड़ानें",
    manageBookings: "बुकिंग प्रबंधित करें",
    offers: "ऑफर",
    support: "सहायता",
    login: "लॉगिन",
    signup: "साइन अप",
    search: "खोजें",
    from: "से",
    to: "तक",
    departDate: "प्रस्थान तिथि",
    returnDate: "वापसी तिथि",
    passengers: "यात्री",
    cabinClass: "केबिन श्रेणी",
    searchFlights: "उड़ानें खोजें",
    // Add more translations as needed
  },
  ur: {
    home: "ہوم",
    flights: "پروازیں",
    manageBookings: "بکنگ منیج کریں",
    offers: "آفرز",
    support: "مدد",
    login: "لاگ ان",
    signup: "سائن اپ",
    search: "تلاش",
    from: "سے",
    to: "تک",
    departDate: "روانگی کی تاریخ",
    returnDate: "واپسی کی تاریخ",
    passengers: "مسافر",
    cabinClass: "کیبن کلاس",
    searchFlights: "پروازیں تلاش کریں",
    // Add more translations as needed
  },
  te: {
    home: "హోమ్",
    flights: "విమానాలు",
    manageBookings: "బుకింగ్‌లను నిర్వహించండి",
    offers: "ఆఫర్లు",
    support: "సహాయం",
    login: "లాగిన్",
    signup: "సైన్ అప్",
    search: "శోధించు",
    from: "నుండి",
    to: "వరకు",
    departDate: "నిష్క్రమణ తేదీ",
    returnDate: "తిరిగి వచ్చే తేదీ",
    passengers: "ప్రయాణికులు",
    cabinClass: "కేబిన్ తరగతి",
    searchFlights: "విమానాలను శోధించండి",
    // Add more translations as needed
  },
};

const languageNames: Record<Language, string> = {
  en: "English",
  hi: "हिन्दी",
  ur: "اردو",
  te: "తెలుగు",
};

export const getLanguageName = (code: Language) => languageNames[code];

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language") as Language | null;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }
  }, []);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
