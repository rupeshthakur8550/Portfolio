import { Suspense, useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/UI/Preloader";
import BlobCursor from "./components/UI/BlobCursor";
import { useTheme } from "./hooks/useTheme";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const location = useLocation();
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowPreloader(false);
      return undefined;
    }

    setShowPreloader(true);
    return undefined;
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.replace("#", "");
      const scrollTimer = window.setTimeout(() => {
        const element = document.getElementById(elementId);
        if (element) {
          element.scrollIntoView({
            behavior: prefersReducedMotion ? "auto" : "smooth",
            block: "start",
          });
        }
      }, 50);

      return () => window.clearTimeout(scrollTimer);
    }

    window.scrollTo({ top: 0, behavior: "auto" });
    return undefined;
  }, [location.hash, location.pathname, prefersReducedMotion]);

  return (
    <>
      {showPreloader && <Preloader onComplete={() => setShowPreloader(false)} />}

      <div className="flex flex-col min-h-screen transition-colors duration-300">
        <div className="hidden md:block">
          <BlobCursor
            blobType="circle"
            fillColor="var(--accent-orange)"
            trailCount={3}
            innerColor={theme === "light" ? "#ffffff" : "#1a1a1a"}
            opacities={[0.6, 0.6, 0.6]}
            shadowColor="var(--accent-orange)"
            shadowBlur={5}
            shadowOffsetX={10}
            shadowOffsetY={10}
            filterStdDeviation={30}
            useFilter
            fastDuration={0.36}
            slowDuration={0.5}
            zIndex={0}
          />
        </div>
        <div className="fixed top-0 left-0 right-0 z-[60]">
          <Header />
        </div>

        <main
          className={`relative z-10 text-theme-text flex-grow ${
            isHomeRoute
              ? "pt-[clamp(4.5rem,8vh,6rem)]"
              : "pt-[clamp(7.5rem,14vh,9.5rem)]"
          }`}
          id="main-content"
        >
          <Suspense fallback={<div className="min-h-[70vh]" aria-hidden="true" />}>
            <Outlet />
          </Suspense>
        </main>

        <div className="relative z-50 pb-20 md:pb-0">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default App;
