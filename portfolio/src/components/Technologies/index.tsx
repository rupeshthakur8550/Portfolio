import { useCallback, useEffect, useState } from "react";
import { portfolioContent } from "../../content/portfolio";
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

import { FaDocker, FaPython } from "react-icons/fa";
import { SiLangchain } from "react-icons/si";
import { VscAzure } from "react-icons/vsc";
import { DiRedis } from "react-icons/di";
import { TbGraph } from "react-icons/tb";


const Technologies = () => {
    const technologiesData = portfolioContent.SkillsPage;
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
        langchain: SiLangchain,
        langgraph: TbGraph,
        azure: VscAzure,
        redis: DiRedis,
        python: FaPython,
        docker: FaDocker,

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
            className="px-4 sm:px-8 md:pb-24 pt-16 relative text-theme-text w-full overflow-hidden z-20"
            id="technologies"
        >
            <div className="text-center mb-12 md:mb-20 h-fit">
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
                        textClassName="text-sm sm:text-lg text-theme-text-sec max-w-2xl mx-auto"
                    >
                        {technologiesData.header.subHeading}
                    </ScrollReveal>
                </div>
            </div>

            <div className="relative mx-auto max-w-7xl px-2 py-4 md:px-6 md:py-8">
                <div className="relative flex min-h-[10rem] justify-center items-start pt-14 md:min-h-[12rem] lg:min-h-[20rem]">
                    <div className="relative w-full">
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
                                    className="absolute group transition-all duration-300 ease-in-out will-change-transform"
                                    style={{
                                        left: "50%",
                                        top: "35%",
                                        transform: isActive
                                            ? "translate(-50%, calc(-50% - 60px))"
                                            : `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
                                        zIndex: isActive ? 999 : index,
                                    }}
                                >
                                    <button
                                        type="button"
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
                                        aria-pressed={isActive}
                                        aria-label={`Toggle details for ${tech.name}`}
                                        className={`w-24 sm:w-32 h-28 sm:h-40 rounded-2xl cursor-pointer relative overflow-visible ${tech.color
                                            }
 transform transition-transform duration-500 ease-out border border-white/18
 ${isActive
                                                ? "scale-[1.18] shadow-2xl"
                                                : "group-hover:scale-[1.2] group-hover:-translate-y-8 group-hover:z-[999] shadow-md"
                                            }`}
                                    >
                                        <div className="relative z-10 flex flex-col items-center justify-center h-full p-3 sm:p-4 text-white gap-3">
                                            <IconComponent className="w-10 sm:w-12 h-10 sm:h-12 drop-shadow-lg" />
                                            <p className="text-xs sm:text-sm font-bold text-center leading-tight drop-shadow-md">
                                                {tech.name}
                                            </p>
                                        </div>
                                    </button>
                                </div>
                            );
                        })}
                    </div>
                </div>

                <div className="relative mt-3 md:mt-5">
                    <div className="mx-auto flex min-h-[9rem] max-w-3xl flex-col items-center justify-center px-4 py-4 text-center md:px-8 md:py-5">
                        {activeTech.name === "" ? (
                            <p className="text-sm sm:text-lg text-theme-text-muted max-w-2xl mx-auto leading-relaxed">
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
                                <p className="max-w-2xl text-sm leading-7 text-theme-text-sec md:text-base">
                                    {activeTech.description}
                                </p>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Technologies;