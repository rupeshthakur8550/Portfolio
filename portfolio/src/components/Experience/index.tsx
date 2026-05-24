import React from "react";
import { portfolioContent, type CompanyExperience } from "../../content/portfolio";
import { Badge } from "../UI/badge";

import { motion } from "framer-motion";

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
        <motion.article 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="group relative bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl mb-12 p-6 md:p-10 hover:border-theme-bg/30 transition-all duration-500 overflow-hidden shadow-sm hover:shadow-md"
        >
            {/* Glassmorphic/Neopop Hover Accent */}
            <div className="absolute inset-0 bg-gradient-to-br from-theme-bg/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-theme-green to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>

            <div className="flex flex-col gap-6 relative z-20">
                {/* Header */}
                <div className="border-b border-theme-bg/20 pb-6 flex flex-col md:flex-row justify-between md:items-end gap-4">
                    <div>
                        <h3 className="text-2xl md:text-4xl font-semibold tracking-tight text-theme-bg mb-1">
                            {company}
                        </h3>
                        <h4 className="text-lg md:text-xl font-medium text-theme-bg/90">
                            {role}
                        </h4>
                    </div>
                    {/* Terminal Monospace Date */}
                    <Badge variant="outline" className="px-3 py-1 bg-[#329a58]/10 border-[#329a58]/30 text-[#329a58] font-mono text-xs md:text-sm rounded-md">
                        {duration}
                    </Badge>
                </div>

                {/* Body */}
                <div className="pt-2">
                    <ul className="space-y-4">
                        {bullets.map((point, idx) => (
                            <li
                                key={idx}
                                className="text-theme-bg/90 font-light text-sm md:text-base leading-relaxed flex items-start group/item"
                            >
                                <span className="mr-3 text-theme-bg/70 font-mono text-sm group-hover/item:text-theme-green-strong transition-colors mt-0.5">▹</span>
                                <span>{point}</span>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Projects & Activities */}
                <div className="flex flex-col lg:flex-row gap-6 mt-4">
                    {activities && (
                        <section className="flex-1 bg-theme-bg/5 border border-theme-bg/10 rounded-2xl p-5 hover:bg-theme-bg/10 transition-colors shadow-sm">
                            <h5 className="font-mono text-xs text-theme-bg/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-3 h-[1px] bg-current opacity-50 block" />
                                {activitiesLabel}
                            </h5>
                            <div className="space-y-4">
                                {activities.map((activity, idx) => (
                                    <div key={idx} className="mb-4 last:mb-0">
                                        <p className="text-theme-bg font-medium text-sm mb-2">
                                            {activity.title}
                                        </p>
                                        <ul className="space-y-2">
                                            {activity.points.map((p, i) => (
                                                <li
                                                    key={i}
                                                    className="text-xs md:text-sm font-light text-theme-bg/80 leading-relaxed flex items-start"
                                                >
                                                    <span className="mr-2 text-theme-bg/40 font-mono">→</span>
                                                    <span>{p}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                            </div>
                        </section>
                    )}

                    {projects && (
                        <section className="flex-1 bg-theme-bg/5 border border-theme-bg/10 rounded-2xl p-5 hover:bg-theme-bg/10 transition-colors shadow-sm">
                            <h5 className="font-mono text-xs text-theme-bg/80 uppercase tracking-widest mb-4 flex items-center gap-2">
                                <span className="w-3 h-[1px] bg-current opacity-50 block" />
                                {projectsLabel}
                            </h5>
                            <div className="space-y-5">
                                {projects.map((project, idx) => (
                                    <div key={idx} className="relative pl-4 border-l border-theme-bg/20 hover:border-theme-green transition-colors">
                                        <div className="flex justify-between items-start gap-2 mb-2 flex-col md:flex-row">
                                            <p className="text-theme-bg font-medium text-sm">
                                                {project.title}
                                            </p>
                                            <Badge variant="outline" className="font-mono text-[#329a58] text-[10px] md:text-xs tracking-wider border-[#329a58]/30 bg-[#329a58]/10 rounded-md">
                                                {project.duration}
                                            </Badge>
                                        </div>
                                        <ul className="space-y-2">
                                            {project.points.map((p, i) => (
                                                <li
                                                    key={i}
                                                    className="text-xs md:text-sm font-light text-theme-bg/80 leading-relaxed flex items-start"
                                                >
                                                    <span className="mr-2 text-theme-bg/40 font-mono">→</span>
                                                    <span>{p}</span>
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

            {/* Subtle geometric dots (Memphis influence, but minimal) */}
            <div className="absolute top-4 right-4 flex gap-1 opacity-20 dark:opacity-20 opacity-10">
                <div className="w-1 h-1 rounded-full bg-theme-bg/30"></div>
                <div className="w-1 h-1 rounded-full bg-theme-bg/30"></div>
                <div className="w-1 h-1 rounded-full bg-theme-bg/30"></div>
            </div>
        </motion.article>
    );
};

const Experience: React.FC = () => {
    const experienceData = portfolioContent.experience;

    return (
        <div
            className="py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto relative z-20 w-full overflow-hidden"
            id="experience"
        >
            {/* Background Glows (Premium Glass)
            <div className="absolute top-1/4 -left-1/4 w-[500px] h-[500px] bg-theme-green rounded-full blur-[150px] opacity-10 dark:opacity-[0.03] -z-10 pointer-events-none"></div>
            <div className="absolute bottom-1/4 -right-1/4 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] opacity-10 dark:opacity-[0.03] -z-10 pointer-events-none"></div> */}

            {/* Header Section */}
            <div className="mb-16 md:mb-24 relative flex flex-col items-start max-w-3xl">
                <div className="font-mono text-theme-green text-sm md:text-base tracking-widest uppercase mb-4 flex items-center gap-3">
                    <span className="w-8 h-[1px] bg-theme-green/50"></span>
                    <span>Professional Journey</span>
                </div>
                <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
                    {experienceData.heading}
                </h2>
                <p className="text-muted-foreground font-light text-lg md:text-xl leading-relaxed">
                    A timeline of refining digital landscapes, building scalable architectures, and driving technical excellence.
                </p>
            </div>

            {/* Experience List */}
            <div className="max-w-[1200px]">
                <div className="border-l border-border/50 pl-0 md:pl-8 ml-0 md:ml-4 relative">
                    {/* Timeline Line gradient */}
                    <div className="absolute left-0 top-0 bottom-0 w-[1px] bg-gradient-to-b from-border via-border/50 to-transparent hidden md:block"></div>
                    
                    {experienceData.companyDetails.map((company: CompanyExperience, i: number) => (
                        <div key={i + company.company} className="relative">
                            {/* Timeline dot */}
                            <div className="absolute -left-[37px] top-10 w-3 h-3 rounded-full border-2 border-theme-green bg-background hidden md:block z-10"></div>
                            
                            <ExperienceCard
                                company={company.company}
                                duration={company.duration}
                                role={company.role}
                                bullets={company.bullets}
                                activities={company.activities}
                                projects={company.projects}
                                activitiesLabel={experienceData.activitiesLabel}
                                projectsLabel={experienceData.projectsLabel}
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Experience;

