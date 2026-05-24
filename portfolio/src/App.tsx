import { Suspense, useEffect, useState, useRef } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Lenis from 'lenis';
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/UI/Preloader";
import BlobCursor from "./components/UI/BlobCursor";
import { useTheme } from "./hooks/useTheme";
import { usePrefersReducedMotion } from "./hooks/usePrefersReducedMotion";

const App = () => {
  const [showPreloader, setShowPreloader] = useState(true);
  const hasShownPreloader = useRef(false);
  const location = useLocation();
  const { theme } = useTheme();
  const prefersReducedMotion = usePrefersReducedMotion();
  const isHomeRoute = location.pathname === "/";

  useEffect(() => {
    if (prefersReducedMotion) {
      setShowPreloader(false);
      return undefined;
    }

    if (!hasShownPreloader.current) {
      hasShownPreloader.current = true;
      setShowPreloader(true);
    }
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

  useEffect(() => {
    const lenis = new Lenis({ duration: 1.2, easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    const raf = (time: number) => { lenis.raf(time); requestAnimationFrame(raf); };
    requestAnimationFrame(raf);
    return () => lenis.destroy();
  }, []);

  useEffect(() => {
    const getTitle = (path: string) => {
      if (path === "/") return "Rupesh Thakur | AI Full Stack Engineer";
      if (path === "/projects") return "Projects | Rupesh Thakur";
      if (path === "/blogs") return "Blogs | Rupesh Thakur";
      if (path === "/contact") return "Contact | Rupesh Thakur";
      if (path.startsWith("/projects/")) {
        const slug = path.split('/').pop() || "";
        const titleCase = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `${titleCase} | Rupesh Thakur`;
      }
      if (path.startsWith("/blogs/")) {
        const slug = path.split('/').pop() || "";
        const titleCase = slug.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
        return `${titleCase} | Rupesh Thakur`;
      }
      return "Rupesh Thakur | Portfolio";
    };
    document.title = getTitle(location.pathname);
  }, [location.pathname]);

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
            <AnimatePresence mode="wait">
              <motion.div
                key={location.pathname}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <Outlet />
              </motion.div>
            </AnimatePresence>
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
