import { useEffect, useState, lazy, Suspense } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Preloader from "./components/UI/Preloader";
import BlobCursor from "./components/UI/BlobCursor";
import heroImage from "./assets/images/hero.jpg";

import { useTheme } from "./hooks/useTheme";

const Home = lazy(() => import("./pages/Home"));
const ExperiencePage = lazy(() => import("./pages/Experience"));
const ProjectsPage = lazy(() => import("./pages/Projects"));
const BlogsPage = lazy(() => import("./pages/Blogs"));
const ContactPage = lazy(() => import("./pages/Contact"));

const App = () => {
  const [loading, setLoading] = useState(true);
  const [assetsLoaded, setAssetsLoaded] = useState(false);
  const location = useLocation();
  const { theme } = useTheme();

  useEffect(() => {
    // Preload critical assets
    const criticalImages = [heroImage];
    let loadedCount = 0;

    criticalImages.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loadedCount++;
        if (loadedCount === criticalImages.length) {
          setAssetsLoaded(true);
        }
      };
      img.onerror = () => {
        // Continue even if an image fails
        loadedCount++;
        if (loadedCount === criticalImages.length) {
          setAssetsLoaded(true);
        }
      };
    });
  }, []);

  useEffect(() => {
    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <>
      <AnimatePresence mode="wait">
        {loading && (
          <Preloader
            onComplete={() => setLoading(false)}
            assetsLoaded={assetsLoaded}
          />
        )}
      </AnimatePresence>

      {!loading && (
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
              useFilter={true}
              fastDuration={0.36}
              slowDuration={0.5}
              zIndex={0}
            />
          </div>
          <div className="fixed top-0 left-0 right-0 z-[60]">
            <Header />
          </div>

          {/* Main content area with higher z-index */}
          <main className="relative z-10 text-theme-text flex-grow">
            <Suspense fallback={<div className="min-h-screen bg-transparent" />}>
              <Routes location={location} key={location.pathname}>
                <Route index element={<Home />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<Home />} />
                <Route path="/experience" element={<ExperiencePage />} />
                <Route path="/work" element={<ExperiencePage />} />
                <Route path="/projects" element={<ProjectsPage />} />
                <Route path="/blogs" element={<BlogsPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<Home />} />
              </Routes>
            </Suspense>
          </main>

          {/* Footer */}
          <div className="relative z-50 pb-20 md:pb-0">
            <Footer />
          </div>
        </div>
      )}
    </>
  );
};

export default App;
