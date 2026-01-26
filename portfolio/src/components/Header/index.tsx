import React, { useMemo, useState } from "react";
import { MdHome, MdFolder, MdWork, MdBuild, MdOutlineMenuBook, MdContacts, } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";

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
  const location = useLocation();

  const handleNavClick = (href: string) => {
    if (href.startsWith("/#")) {
      const id = href.split("#")[1];
      if (location.pathname === "/" || location.pathname === "/home") {
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
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
            className="flex items-center gap-2 px-3 py-2 hover:bg-theme-text/10 hover:text-theme-text rounded-md cursor-pointer transition-all duration-200 font-semibold group"
            aria-label={item.label}
          >
            <IconComponent className="text-theme-sky group-hover:text-theme-pink transition-colors lg:h-5 h-6" />

            {/* Show label only on hover AND between md and lg screens */}
            <span
              className={`
                hidden lg:block transition duration-300 ease-in-out text-theme-text
                md:${hoveredItem === item.label ? "inline " : "hidden"}
              `}
            >
              {item.label}
            </span>
          </NavLink>
        );
      }),
    [hoveredItem, location.pathname]
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
            className="group"
          >
            <IconComponent
              size={25}
              className="group-hover:scale-110 text-theme-sky transition-transform duration-200"
            />
          </NavLink>
        );
      }),
    [location.pathname]
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
            className="flex gap-2"
            role="navigation"
            aria-label="Main navigation"
          >
            {desktopNavItems}
          </nav>
        </div>
      </header>

      {/* Mobile Bottom Navigation */}
      <div className="md:hidden fixed bottom-5 left-0 right-0 max-w-[100%] sm:mx-8 mx-4 rounded-[16px] bg-theme-card/80 border border-theme-text/10 backdrop-blur-md shadow-2xl z-50">
        <div className="flex justify-around items-center py-3 px-5 max-w-md mx-auto sm:gap-10 gap-8">
          {mobileNavItems}
        </div>
      </div>
    </>
  );
};

export default Header;
