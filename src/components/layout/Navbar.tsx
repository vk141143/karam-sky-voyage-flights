
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, User } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import { ThemeToggle } from "@/components/theme/ThemeToggle";
import LanguageSelector from "@/components/language/LanguageSelector";
import { useLanguage } from "@/components/language/LanguageProvider";

const Navbar = () => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { title: t("home"), href: "/" },
    { title: t("flights"), href: "/flights" },
    { title: t("manageBookings"), href: "/manage-bookings" },
    { title: t("offers"), href: "/offers" },
    { title: t("support"), href: "/support" },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white dark:bg-navy shadow-md py-2"
          : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <span className="font-bold text-2xl text-navy dark:text-white">
            Sky<span className="text-accent">Voyage</span>
          </span>
        </Link>

        {/* Desktop Navigation */}
        {!isMobile && (
          <nav className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent transition-colors duration-200 text-base font-medium"
              >
                {item.title}
              </Link>
            ))}
          </nav>
        )}

        {/* CTA Buttons & Theme/Language */}
        <div className="hidden md:flex items-center gap-2">
          <ThemeToggle />
          <LanguageSelector />
          
          <Button variant="outline" size="sm" asChild className="border-gray-200 hover:border-gray-300 transition-all duration-200">
            <Link to="/login">
              <User size={16} className="mr-1" /> {t("login")}
            </Link>
          </Button>
          <Button size="sm" asChild className="bg-accent hover:bg-accent-dark text-white transition-all duration-200">
            <Link to="/signup">{t("signup")}</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center">
          <ThemeToggle />
          <LanguageSelector />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && isMobile && (
        <div className="md:hidden bg-white dark:bg-navy-dark border-t dark:border-gray-700 animate-fade-in">
          <div className="container py-4 px-4 flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link
                key={item.title}
                to={item.href}
                className="text-gray-700 dark:text-gray-200 hover:text-accent dark:hover:text-accent py-2 font-medium transition-colors duration-200"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.title}
              </Link>
            ))}
            <div className="flex flex-col gap-2 pt-4 border-t dark:border-gray-700">
              <Button variant="outline" size="sm" asChild className="border-gray-200 hover:border-gray-300 transition-all duration-200">
                <Link to="/login">
                  <User size={16} className="mr-1" /> {t("login")}
                </Link>
              </Button>
              <Button size="sm" asChild className="bg-accent hover:bg-accent-dark text-white transition-all duration-200">
                <Link to="/signup">{t("signup")}</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
