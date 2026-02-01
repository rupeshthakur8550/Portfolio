import React from "react";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import ScrollReveal from "../UI/ScrollReveal";

interface Project {
    title: string;
    duration: string;
    points: string[];
}

interface Activity {
    title: string;
    points: string[];
}

interface ExperienceCardProps {
    company: string;
    duration: string;
    role: string;
    bullets: string[];
    projects?: Project[];
    activities?: Activity[];
    activitiesLabel: string;
    projectsLabel: string;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({
    company,
    duration,
    role,
    bullets,
    projects,
    activities,
    activitiesLabel,
    projectsLabel
}) => {
    return (
        <div className="relative border-l border-theme-text/10 sm:pl-10 pl-7 md:ml-6 pb-16 last:pb-0 group">
            {/* Main Timeline Dot */}
            <div className="absolute w-4 h-4 bg-theme-sky rounded-full -left-[8.5px] top-1.5 ring-4 ring-theme-bg z-10 transition-all duration-300 group-hover:scale-125 group-hover:bg-theme-purple"></div>

            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
                <h3 className="text-2xl sm:text-4xl font-bold text-theme-sky tracking-tight group-hover:text-theme-purple transition-colors">
                    {company}
                </h3>
                <span className="text-xs font-mono font-bold text-theme-bg/70 tracking-widest uppercase bg-theme-text/60 px-3 py-1 rounded border border-theme-bg/20 self-baseline">
                    {duration}
                </span>
            </div>

            <div className="flex items-center gap-3 mb-6">
                <h4 className="text-lg font-medium text-theme-sky/80 tracking-wide uppercase">
                    {role}
                </h4>
                <div className="h-px flex-grow bg-gradient-to-r from-theme-sky/20 to-transparent"></div>
            </div>
            <div className="flex-1 w-full relative my-5 bg-theme-text/80 md:p-8 p-5 rounded-xl border border-theme-text/10 shadow-lg transition-transform hover:scale-[1.01] group/activity">
                <ul className="space-y-4 md:max-w-4xl">
                    {bullets.map((point, idx) => (
                        <li
                            key={idx}
                            className="text-theme-bg/60 font-semibold text-xs sm:text-base leading-relaxed flex items-start"
                        >
                            <span className="text-theme-sky mr-3 mt-1 text-[10px] md:text-xs">◆</span>
                            <ScrollReveal
                                baseOpacity={0.4}
                                enableBlur
                                blurStrength={4}
                                baseRotation={0}
                                textClassName="inline"
                            >
                                {point}
                            </ScrollReveal>
                        </li>
                    ))}
                </ul>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-stretch">
                {activities && (
                    <div className="flex-1 w-full h-full relative bg-theme-text/80 md:p-8 p-6 rounded-xl border border-theme-text/10 shadow-md group/activity">
                        <h5 className="font-bold text-theme-sky text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6 uppercase">
                            {activitiesLabel}
                        </h5>
                        {activities.map((activity, idx) => (
                            <div key={idx} className="mb-4 last:mb-0">
                                <p className="font-semibold text-theme-bg/60 text-xs md:text-sm mb-2 md:mb-3">
                                    {activity.title}
                                </p>
                                <ul className="space-y-2 md:space-y-2.5">
                                    {activity.points.map((p, i) => (
                                        <li
                                            key={i}
                                            className="text-[11px] md:text-sm text-theme-bg/90 leading-relaxed border-l border-theme-text/10 pl-3 md:pl-4 ml-1 transition-colors"
                                        >
                                            <ScrollReveal
                                                baseOpacity={0.4}
                                                enableBlur
                                                blurStrength={3}
                                                baseRotation={0}
                                                textClassName="inline"
                                            >
                                                {p}
                                            </ScrollReveal>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>
                )}

                {projects && (
                    <div className="flex-1 w-full h-full relative bg-theme-text/80 md:p-8 p-6 rounded-xl border border-theme-text/10 shadow-md group/projects">
                        <h5 className="font-bold text-theme-sky text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6 uppercase">
                            {projectsLabel}
                        </h5>
                        <div className="space-y-6 md:space-y-8">
                            {projects.map((project, idx) => (
                                <div key={idx} className="group/project">
                                    <div className="flex justify-between items-start gap-2 mb-2 flex-col md:flex-row">
                                        <p className="font-semibold text-theme-bg/90 text-xs md:text-sm transition-colors">
                                            {project.title}
                                        </p>
                                        <p className="text-[9px] md:text-[10px] text-theme-bg/90 font-mono whitespace-nowrap mt-0.5 md:mt-1 tracking-tighter uppercase transition-colors">
                                            {project.duration}
                                        </p>
                                    </div>
                                    <ul className="space-y-1.5 md:space-y-2">
                                        {project.points.map((p, i) => (
                                            <li
                                                key={i}
                                                className="text-[11px] md:text-sm text-theme-bg/90 leading-relaxed border-l border-theme-text/10 pl-3 md:pl-4 ml-1 transition-colors"
                                            >
                                                <ScrollReveal
                                                    baseOpacity={0.4}
                                                    enableBlur
                                                    blurStrength={3}
                                                    baseRotation={0}
                                                    textClassName="inline"
                                                >
                                                    {p}
                                                </ScrollReveal>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

const Experience: React.FC = () => {
    const experienceData = common.Portfolio.experience;

    return (
        <div
            className="py-16 md:py-26 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto relative z-20 w-full"
            id="experience"
        >
            {/* Header Section */}
            <div className="text-center mb-12 md:mb-20">
                <div className="text-center mb-10 md:mb-20 px-4">
                    <GradientText
                        animationSpeed={3}
                        showBorder={false}
                        className="text-3xl sm:text-7xl font-black tracking-tight"
                    >
                        {experienceData.heading}
                    </GradientText>
                    <div className="flex justify-center mt-3 md:mt-4">
                        Refining the digital landscape through professional excellence and scalable engineering.
                    </div>
                </div>
            </div>

            {/* Experience List */}
            <div className="max-w-[1200px] mx-auto">
                {experienceData.companyDetails.map((company: any, i: number) => (
                    <ExperienceCard
                        key={i + company.company}
                        company={company.company}
                        duration={company.duration}
                        role={company.role}
                        bullets={company.bullets}
                        activities={company.activities}
                        projects={company.projects}
                        activitiesLabel={experienceData.activitiesLabel}
                        projectsLabel={experienceData.projectsLabel}
                    />
                ))}
            </div>
        </div>
    );
};

export default Experience;
