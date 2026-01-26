import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import IntroPage from "../components/IntroPage";
import Technologies from "../components/Technologies";

const Home = () => {
    const location = useLocation();

    useEffect(() => {
        if (location.hash) {
            const sectionId = location.hash.replace("#", "");
            setTimeout(() => {
                const element = document.getElementById(sectionId);
                if (element) {
                    element.scrollIntoView({ behavior: "smooth" });
                }
            }, 100);
        }
    }, [location]);

  return (
    <div className="relative min-h-screen">
      <div className="relative z-10">
        <IntroPage />
        <Technologies />
      </div>
    </div>
  );
};

export default Home;
