import { useCallback, useEffect, useState } from "react";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import ScrollReveal from "../UI/ScrollReveal";
import {
  SiReact,
  SiJavascript,
  SiTypescript,
  SiNodedotjs,
  SiExpress,
  SiMysql,
  SiSqlite,
  SiMongodb,
  SiFirebase,
  SiGit,
  SiGithub,
  SiPostman,
  SiTailwindcss,
  SiMui,
  SiFastapi,
  SiVitest,
  SiJest,
} from "react-icons/si";
import { FaJava } from "react-icons/fa";

const Technologies = () => {
  const technologiesData = common.Portfolio.SkillsPage;
  const techList = technologiesData.skillsData;
  const [radius, setRadius] = useState(1700);
  const [activeTech, setActiveTech] = useState<{
    name: string;
    color: string;
    description: string;
  }>({ name: "", color: "", description: "" });

  const iconMap: Record<string, React.ElementType> = {
    react: SiReact,
    java: FaJava,
    javascript: SiJavascript,
    typescript: SiTypescript,
    nodejs: SiNodedotjs,
    express: SiExpress,
    mysql: SiMysql,
    sqlite: SiSqlite,
    mongodb: SiMongodb,
    firebase: SiFirebase,
    git: SiGit,
    github: SiGithub,
    postman: SiPostman,
    tailwindcss: SiTailwindcss,
    materialui: SiMui,
    fastapi: SiFastapi,
    vitest: SiVitest,
    jest: SiJest,
  };

  // 🧠 Radius calculation logic
  const calculateRadius = useCallback(() => {
    const minWidth = 640;
    const maxWidth = 1670;
    const minRadius = 300;
    const maxRadius = 1700;

    const width = window.innerWidth;
    const screenWidth = window.screen.width;

    if (width > maxWidth) {
      return maxRadius;
    }

    const clampedWidth = Math.max(minWidth, Math.min(width, maxWidth));
    const ratio = (clampedWidth - minWidth) / (maxWidth - minWidth);
    const baseRadius = minRadius + ratio * (maxRadius - minRadius);

    // Adjustment for wider screens
    let adjustment = 0;
    if (screenWidth > 900) {
      const maxAdjustment = 300;
      const maxScreen = 1920;
      const screenRatio = Math.min((screenWidth - 900) / (maxScreen - 900), 1);
      adjustment = screenRatio * maxAdjustment;
    }

    return Math.max(minRadius, baseRadius - adjustment);
  }, []);

  // 📦 Throttled radius updater
  useEffect(() => {
    const handleResize = () => {
      const newRadius = Math.round(calculateRadius());
      setRadius((prev) => (prev !== newRadius ? newRadius : prev));
    };

    handleResize(); // Set on mount
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [calculateRadius]);

  const arcSpan = Math.PI * 0.3;

  return (
    <div
      className="px-4 sm:px-8 md:pb-24 pt-16 relative text-white w-full lg:h-240 sm:h-400 h-200 overflow-hidden z-20"
      id="technologies"
    >
      {/* 🔹 Header */}
      <div className="text-center mb-12 md:mb-20">
        <GradientText
          animationSpeed={3}
          showBorder={false}
          className="text-5xl sm:text-7xl font-black tracking-tight"
        >
          {technologiesData.header.heading}
        </GradientText>
        <div className="mt-2 text-center flex justify-center">
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur
            blurStrength={8}
            textClassName="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto"
          >
            {technologiesData.header.subHeading}
          </ScrollReveal>
        </div>
      </div>

      {/* 🌀 Arc Layout */}
      <div className="relative flex justify-center items-center pt-35">
        <div className="relative w-full md:ml-0 ml-8">
          {techList.map((tech, index) => {
            const angleStep = arcSpan / (techList.length - 1);
            const angle = -arcSpan / 2 + angleStep * index;
            const x = radius * Math.sin(angle);
            const y = radius * Math.cos(angle) - radius * 0.9;

            const isActive = activeTech.name === tech.name;
            const IconComponent = iconMap[tech.icon] || SiReact;

            return (
              <div
                key={tech.name}
                className="absolute group transition-all duration-300 ease-in-out md:right-0 will-change-transform"
                style={{
                  left: isActive ? "68%" : "50%",
                  top: isActive ? "100%" : "50%",
                  transform: isActive
                    ? "translate(-50%, -50%)"
                    : `translate(${x}px, ${y}px)`,
                  marginLeft: "-64px",
                  zIndex: isActive ? 999 : index,
                }}
              >
                <div
                  onClick={() =>
                    setActiveTech(
                      isActive
                        ? { name: "", color: "", description: "" }
                        : {
                          name: tech.name,
                          color: tech.color,
                          description: tech.description,
                        }
                    )
                  }
                  className={`w-24 sm:w-32 h-28 sm:h-40 rounded-2xl cursor-pointer relative overflow-visible ${tech.color
                    }
                    transform transition-transform duration-500 ease-out
                    ${isActive
                      ? "scale-[1.45] shadow-2xl"
                      : "group-hover:scale-[1.35] group-hover:-translate-y-[200px] group-hover:z-[999] shadow-md"
                    }`}
                >
                  <div className="relative z-10 flex flex-col items-center justify-center h-full p-3 sm:p-4 text-white gap-3">
                    <IconComponent className="w-10 sm:w-12 h-10 sm:h-12 drop-shadow-lg" />
                    <p className="text-xs sm:text-sm font-bold text-center leading-tight drop-shadow-md">
                      {tech.name}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* 📌 Conditional Footer Display */}
      <div className="text-center absolute bottom-0 left-0 right-0 px-4 pb-6 md:pt-16">
        {activeTech.name === "" ? (
          <p className="text-sm sm:text-lg text-gray-400 max-w-2xl mx-auto">
            {technologiesData.instruction}
          </p>
        ) : (
          <>
            <h2
              className={`text-3xl py-2 sm:text-5xl font-bold ${["express", "github"].includes(activeTech.name?.toLowerCase())
                ? "bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100"
                : activeTech.color
                } bg-clip-text text-transparent`}
            >
              {activeTech.name}
            </h2>
            <div className="flex justify-center">
              <ScrollReveal
                key={activeTech.name}
                baseOpacity={0.2}
                enableBlur
                blurStrength={8}
                textClassName="text-sm sm:text-lg text-gray-300 max-w-2xl mx-auto mt-2"
              >
                {activeTech.description}
              </ScrollReveal>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Technologies;