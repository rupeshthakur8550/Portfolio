import { MdHome, MdFolder, MdWork, MdBuild, MdOutlineMenuBook, MdContacts, } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import ThemeToggle from "../ThemeToggle";

interface NavItem {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  href?: string;
}

// Map icon string names from JSON to actual icon components
const iconMap: Record<
  string,
  React.ComponentType<{ size?: number; className?: string }>
> = {
  MdHome,
  MdFolder,
  MdWork,
  MdBuild,
  MdOutlineMenuBook,
  MdContacts,
};

const menuItems: NavItem[] = common.Portfolio.Header.navigation.map(
  (item: any) => ({
    ...item,
    icon: iconMap[item.icon] || MdHome, // fallback to MdHome if icon not found
  })
);

const Header = () => {
  const [hoveredItem, setHoveredItem] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("");
  const location = useLocation();

  // Handle hash scrolling across page transitions
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.substring(1);
      const element = document.getElementById(id);
      if (element) {
        // Delay slightly for any page transitions/loading
        const timeoutId = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 300);
        return () => clearTimeout(timeoutId);
      }
    }
  }, [location.pathname, location.hash]);

  // Section Tracking for Highlighting
  useEffect(() => {
    // Reset active section when navigating away from Home page
    if (location.pathname !== "/" && location.pathname !== "/home" && location.pathname !== "/about") {
      setActiveSection("");
      return;
    }

    const sections = ["about", "technologies"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -20% 0px",
      threshold: 0.1, // Lower threshold for better sensitivity
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    // Special case for scrolling to the very top - ensure "about" is active
    const handleScroll = () => {
      if (window.scrollY < 100 && (location.pathname === "/" || location.pathname === "/home" || location.pathname === "/about")) {
        setActiveSection("about");
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [location.pathname]); // Removed activeSection from dependencies

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      if (location.pathname === "/" || location.pathname === "/home") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else if (href.startsWith("/")) {
      // Regular page navigation - ensure we start at top
      if (location.pathname !== href) {
        window.scrollTo(0, 0);
      }
    }
  };

  const desktopNavItems = useMemo(
    () =>
      menuItems.map((item) => {
        const IconComponent = item.icon;
        return (
          <NavLink
            to={item.href || "/"}
            key={item.label}
            onClick={() => handleNavClick(item.href || "/")}
            onMouseEnter={() => setHoveredItem(item.label)}
            onMouseLeave={() => setHoveredItem("")}
            className={({ isActive }) => {
              const isHashLink = item.href?.includes("#");
              const targetId = item.href?.split("#")[1];
              const isSectionActive = isHashLink && activeSection === targetId;
              const isCurrentPageActive = isActive && !isHashLink;

              const activeClasses = (isSectionActive || isCurrentPageActive)
                ? 'bg-cosmic-accent/10 text-cosmic-accent'
                : 'hover:bg-cosmic-accent/5 hover:text-cosmic-accent text-cosmic-text-muted';

              return `flex items-center gap-2 px-4 py-2 rounded-xl cursor-pointer transition-all duration-300 font-semibold group ${activeClasses}`;
            }}
            aria-label={item.label}
          >
            <IconComponent className="group-hover:text-cosmic-accent transition-colors lg:h-5 h-6" />

            <span className={`hidden lg:block transition duration-300 ease-in-out`}>
              {item.label}
            </span>
          </NavLink>
        );
      }),
    [hoveredItem, location.pathname, activeSection]
  );

  const mobileNavItems = useMemo(
    () =>
      menuItems.map((item) => {
        const IconComponent = item.icon;

        return (
          <NavLink
            to={item.href || "/"}
            key={item.label}
            onClick={() => handleNavClick(item.href || "/")}
            aria-label={item.label}
            className="relative flex flex-col items-center justify-center p-2 pt-3"
          >
            {({ isActive }) => {
              const isHashLink = item.href?.includes("#");
              const targetId = item.href?.split("#")[1];
              const isSectionActive = isHashLink && activeSection === targetId;
              const isCurrentPageActive = isActive && !isHashLink;
              const effectiveActive = isSectionActive || isCurrentPageActive;

              return (
                <>
                  <IconComponent
                    size={24}
                    className={`relative z-10 transition-all duration-300 ${effectiveActive ? "text-cosmic-accent scale-110" : "text-cosmic-text-muted opacity-70"
                      }`}
                  />
                  {effectiveActive && (
                    <motion.div
                      layoutId="mobileNavIndicator"
                      className="absolute inset-0 bg-cosmic-accent/10 rounded-xl"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}
                </>
              );
            }}
          </NavLink>
        );
      }),
    [location.pathname, activeSection]
  );

  return (
    <>
      {/* Desktop Header */}
      <header className="hidden md:block bg-theme-card/70 backdrop-blur-md border border-theme-text/10 shadow-lg px-6 py-3 rounded-2xl m-4">
        <div className="flex justify-between items-center mx-auto text-theme-text-sec">
          <NavLink
            to="/"
            onClick={() => window.scrollTo(0, 0)}
          >
            <GradientText
              animationSpeed={3}
              showBorder={false}
              className="text-3xl font-extrabold tracking-wide cursor-pointer hover:opacity-80 transition-opacity"
            >
              Portfolio
            </GradientText>
          </NavLink>

          {/* Desktop Navigation */}

          <nav
            className="flex gap-2 items-center"
            role="navigation"
            aria-label="Main navigation"
          >
            {desktopNavItems}
            <div className="ml-2 border-l border-theme-text/10 pl-4">
              <ThemeToggle />
            </div>
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-lg z-[100]">
        <div className="bg-cosmic-card/80 backdrop-blur-lg border border-cosmic-text/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.5)] px-4 py-1 w-full">
          <div className="flex justify-between items-center h-16">
            {mobileNavItems}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
