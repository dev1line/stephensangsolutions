import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiMenu, FiX } from "react-icons/fi";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useLanguage } from "../../contexts/LanguageContext";
import { translations } from "../../locales";
import { useActiveSection } from "../../hooks/useActiveSection";
import { scrollToSection } from "../../hooks/useScrollToSection";
import Logo from "../atoms/Logo";
import LanguageSwitcher from "../molecules/LanguageSwitcher";
import DarkModeToggle from "../molecules/DarkModeToggle";

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const t = translations[language];
  const { activeSection, setActiveSection } = useActiveSection();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { name: t.nav.home, href: "/", sectionId: "home" },
    { name: t.nav.about, href: "/#about", sectionId: "about" },
    { name: t.nav.skills, href: "/#skills", sectionId: "skills" },
    { name: t.nav.experience, href: "/#experience", sectionId: "experience" },
    { name: t.nav.certifications, href: "/#certifications", sectionId: "certifications" },
    { name: t.nav.projects, href: "/#projects", sectionId: "projects" },
    { name: t.nav.blog, href: "/blog", sectionId: null },
    { name: t.nav.contact, href: "/#contact", sectionId: "contact" },
  ];

  const handleNavClick = (e, item) => {
    e.preventDefault();

    if (item.sectionId) {
      setActiveSection(item.sectionId);
      if (location.pathname !== "/") {
        navigate("/");
        setTimeout(() => {
          scrollToSection(item.sectionId);
        }, 100);
      } else {
        scrollToSection(item.sectionId);
      }
    } else {
      navigate(item.href);
    }

    setIsMobileMenuOpen(false);
  };

  const isActive = (item) => {
    if (item.sectionId) {
      return location.pathname === "/" && activeSection === item.sectionId;
    }
    return location.pathname === item.href;
  };

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 dark:bg-slate-900/95 backdrop-blur-md shadow-md dark:shadow-indigo-950/50"
          : "bg-transparent"
      }`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex-shrink-0">
            <Logo size="md" />
          </div>

          {/* Desktop menu (xl+: đủ chỗ cho nav ngang) */}
          <div className="hidden xl:block">
            <div className="ml-10 flex items-center space-x-4">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    isActive(item)
                      ? "text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-500/20"
                      : "text-gray-700 dark:text-gray-200 hover:text-primary-600 dark:hover:text-primary-300"
                  }`}>
                  {item.name}
                </a>
              ))}
              <div className="flex items-center gap-2">
                <LanguageSwitcher />
                <DarkModeToggle />
              </div>
            </div>
          </div>

          {/* Tablet (md–xl) & Mobile: hamburger menu */}
          <div className="xl:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300 focus:outline-none p-2"
              aria-expanded={isMobileMenuOpen}
              aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}>
              {isMobileMenuOpen ? (
                <FiX className="h-6 w-6" />
              ) : (
                <FiMenu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile & Tablet Menu (md–xl) */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="xl:hidden bg-white dark:bg-slate-900/95 border-t dark:border-slate-700/50">
            <div className="px-4 pt-3 pb-4 space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`block px-3 py-2 rounded-md text-base font-medium cursor-pointer ${
                    isActive(item)
                      ? "text-primary-600 dark:text-primary-300 bg-primary-50 dark:bg-primary-500/20"
                      : "text-gray-700 dark:text-slate-200 hover:text-primary-600 dark:hover:text-primary-300"
                  }`}>
                  {item.name}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </nav>
    </motion.header>
  );
};

export default Header;
