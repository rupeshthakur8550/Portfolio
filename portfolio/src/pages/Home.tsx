import IntroPage from "../components/IntroPage";
import Technologies from "../components/Technologies";

const Home = () => {
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
