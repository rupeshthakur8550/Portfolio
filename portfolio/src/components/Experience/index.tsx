import React from "react";
import { portfolioContent, type CompanyExperience } from "../../content/portfolio";
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
        <article className="relative overflow-hidden rounded-[1.9rem] border border-white/12 bg-white/7 backdrop-blur-2xl shadow-[0_24px_90px_rgba(0,0,0,0.16)] mb-10 last:mb-0 before:absolute before:inset-0 before:bg-[linear-gradient(135deg,rgba(255,255,255,0.14),rgba(255,255,255,0.03)_36%,rgba(56,189,248,0.08)_70%,rgba(168,85,247,0.08))] before:pointer-events-none">
            <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-theme-sky via-theme-purple to-theme-pink" />
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-white/40 via-white/20 to-transparent" />
            <div className="px-6 py-7 md:px-10 md:py-10">
            <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-4">
                <h3 className="text-2xl sm:text-4xl font-bold text-theme-sky tracking-tight">
                    {company}
                </h3>
                <span className="text-xs font-mono font-bold text-theme-text-sec tracking-[0.22em] uppercase bg-white/10 px-3 py-1.5 rounded-full border border-white/14 self-baseline backdrop-blur-md">
                    {duration}
                </span>
            </div>

            <div className="flex items-center gap-4 mb-7">
                <span className="inline-flex h-3 w-3 rounded-full bg-theme-purple shadow-[0_0_0_6px_rgba(168,85,247,0.12)]" />
                <h4 className="text-sm md:text-base font-semibold text-theme-text-sec tracking-[0.28em] uppercase">
                    {role}
                </h4>
                <div className="h-px flex-grow bg-gradient-to-r from-theme-purple/30 via-theme-sky/20 to-transparent"></div>
            </div>

            <div className="flex-1 w-full relative mb-8 md:p-8 p-5 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                <ul className="space-y-4 md:max-w-4xl">
                    {bullets.map((point, idx) => (
                        <li
                            key={idx}
                            className="text-theme-text-sec font-semibold text-xs sm:text-base leading-relaxed flex items-start"
                        >
                            <span className="mt-2 mr-3 h-2.5 w-2.5 flex-shrink-0 rounded-full bg-theme-sky" />
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
                    <section className="flex-1 w-full h-full relative md:p-8 p-6 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                        <h5 className="font-bold text-theme-sky text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6 uppercase">
                            {activitiesLabel}
                        </h5>
                        {activities.map((activity, idx) => (
                            <div key={idx} className="mb-4 last:mb-0">
                                <p className="font-semibold text-theme-text text-xs md:text-sm mb-2 md:mb-3">
                                    {activity.title}
                                </p>
                                <ul className="space-y-2 md:space-y-2.5">
                                    {activity.points.map((p, i) => (
                                        <li
                                            key={i}
                                            className="text-[11px] md:text-sm text-theme-text-sec leading-relaxed pl-4 md:pl-5 relative"
                                        >
                                            <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-theme-purple/80" />
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
                    </section>
                )}

                {projects && (
                    <section className="flex-1 w-full h-full relative md:p-8 p-6 rounded-2xl border border-white/10 bg-white/8 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.14)]">
                        <h5 className="font-bold text-theme-sky text-xs md:text-sm tracking-[0.2em] mb-4 md:mb-6 uppercase">
                            {projectsLabel}
                        </h5>
                        <div className="space-y-6 md:space-y-8">
                            {projects.map((project, idx) => (
                                <div key={idx} className="group/project">
                                    <div className="flex justify-between items-start gap-2 mb-2 flex-col md:flex-row">
                                        <p className="font-semibold text-theme-text text-xs md:text-sm transition-colors">
                                            {project.title}
                                        </p>
                                        <p className="text-[9px] md:text-[10px] text-theme-text-sec font-mono whitespace-nowrap mt-0.5 md:mt-1 tracking-tighter uppercase transition-colors">
                                            {project.duration}
                                        </p>
                                    </div>
                                    <ul className="space-y-1.5 md:space-y-2">
                                        {project.points.map((p, i) => (
                                            <li
                                                key={i}
                                                className="text-[11px] md:text-sm text-theme-text-sec leading-relaxed pl-4 md:pl-5 relative"
                                            >
                                                <span className="absolute left-0 top-2 h-2 w-2 rounded-full bg-theme-sky/80" />
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
                    </section>
                )}
            </div>
            </div>
        </article>
    );
};

const Experience: React.FC = () => {
    const experienceData = portfolioContent.experience;

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
                {experienceData.companyDetails.map((company: CompanyExperience, i: number) => (
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
