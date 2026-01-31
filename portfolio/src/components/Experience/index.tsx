import React from "react";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";

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
    <div className="relative border-l border-cosmic-muted/20 pl-10 ml-6 pb-16 last:pb-0 group">
      {/* Main Timeline Dot */}
      <div className="absolute w-4 h-4 bg-cosmic-accent rounded-full -left-[8.5px] top-1.5 ring-4 ring-cosmic-bg z-10 transition-all duration-300 group-hover:scale-125 group-hover:bg-cosmic-accent-hover"></div>

      <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 mb-2">
        <h3 className="text-2xl sm:text-4xl font-bold text-cosmic-accent tracking-tight group-hover:text-cosmic-accent-hover transition-colors">
          {company}
        </h3>
        <span className="text-xs font-mono font-medium text-cosmic-muted tracking-widest uppercase bg-cosmic-card/50 px-3 py-1 rounded border border-cosmic-muted/20 self-baseline">
          {duration}
        </span>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <h4 className="text-lg font-medium text-cosmic-accent/80 tracking-wide uppercase">
          {role}
        </h4>
        <div className="h-px flex-grow bg-gradient-to-r from-cosmic-accent/20 to-transparent"></div>
      </div>
      <div className="flex-1 w-full relative my-5 bg-cosmic-card/30 p-8 rounded-xl border border-cosmic-muted/10 transition-colors hover:bg-cosmic-card/50 group/activity hover:border-cosmic-accent group-hover/activity:text-cosmic-text">
        <ul className="space-y-4 mb-10 max-w-4xl">
          {bullets.map((point, idx) => (
            <li
              key={idx}
              className="text-cosmic-text-muted text-sm sm:text-base leading-relaxed flex items-start group-hover/activity:text-cosmic-text transition-colors"
            >
              <span className="text-cosmic-accent mr-3 mt-1.5 text-xs">◆</span>
              {point}
            </li>
          ))}
        </ul>
      </div>

      <div className="flex flex-col xl:flex-row gap-10 items-start">
        {activities && (
          <div className="flex-1 w-full relative pl-8 bg-cosmic-card/30 p-8 rounded-xl border border-cosmic-muted/10 transition-colors hover:bg-cosmic-card/50 group/activity hover:border-cosmic-accent">
            <h5 className="font-bold text-cosmic-accent text-sm tracking-[0.2em] mb-6 uppercase group-hover/activity:text-cosmic-accent-hover transition-colors">
              {activitiesLabel}
            </h5>
            {activities.map((activity, idx) => (
              <div key={idx} className="mb-4 last:mb-0">
                <p className="font-semibold text-cosmic-accent text-sm mb-3 group-hover/activity:text-cosmic-text transition-colors">
                  {activity.title}
                </p>
                <ul className="space-y-2.5">
                  {activity.points.map((p, i) => (
                    <li
                      key={i}
                      className="text-sm text-cosmic-text-muted group-hover/activity:text-cosmic-text leading-relaxed border-l border-cosmic-muted/20 pl-4 ml-1 transition-colors"
                    >
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        )}

        {projects && (
          <div className="flex-1 w-full relative pl-8 bg-cosmic-card/30 p-8 rounded-xl border border-cosmic-muted/10 transition-colors hover:bg-cosmic-card/50 group/projects hover:border-cosmic-accent">
            <h5 className="font-bold text-cosmic-accent text-sm tracking-[0.2em] mb-6 uppercase group-hover/projects:text-cosmic-accent-hover transition-colors">
              {projectsLabel}
            </h5>
            <div className="space-y-8">
              {projects.map((project, idx) => (
                <div key={idx} className="group/project">
                  <div className="flex justify-between items-start gap-4 mb-2 flex-col md:flex-row">
                    <p className="font-semibold text-cosmic-accent text-sm transition-colors group-hover/project:text-cosmic-text">
                      {project.title}
                    </p>
                    <p className="text-[10px] text-cosmic-muted font-mono whitespace-nowrap mt-1 tracking-tighter uppercase group-hover/projects:text-cosmic-text-muted transition-colors">
                      {project.duration}
                    </p>
                  </div>
                  <ul className="space-y-2">
                    {project.points.map((p, i) => (
                      <li
                        key={i}
                        className="text-xs sm:text-sm text-cosmic-text-muted leading-relaxed border-l border-cosmic-muted/20 pl-4 ml-1 group-hover/projects:text-cosmic-text transition-colors"
                      >
                        {p}
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
      className="py-16 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto relative z-20 w-full"
      id="experience"
    >
      {/* Header Section */}
      <div className="text-center mb-12 md:mb-20">
        <div className="mb-6">
          <GradientText
            animationSpeed={3}
            showBorder={false}
            className="text-5xl sm:text-7xl font-black tracking-tight"
          >
            {experienceData.heading}
          </GradientText>
        </div>
        <p className="text-cosmic-text-muted text-lg sm:text-xl max-w-3xl mx-auto font-medium tracking-tight">
          Refining the digital landscape through professional excellence and scalable engineering.
        </p>
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