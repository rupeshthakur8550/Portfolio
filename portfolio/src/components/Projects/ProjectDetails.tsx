import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import GradientText from "../UI/GradientText";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import { type ProjectEntry } from "../../content/portfolio";

interface ProjectDetailsProps {
  project: ProjectEntry;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-4xl mx-auto text-left"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={() => navigate("/projects")}
        className="flex items-center gap-2 text-theme-text-muted hover:text-theme-text transition-colors mb-6 md:mb-8 group cursor-pointer"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm md:text-base">Back to Projects</span>
      </button>

      <div className="bg-theme-text/90 backdrop-blur-md border border-theme-bg/10 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Image */}
        <div className="relative h-48 sm:h-64 md:h-80 w-full overflow-hidden">
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-theme-text via-theme-text/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-5 md:p-8">
            <GradientText
              animationSpeed={6}
              className="text-2xl sm:text-3xl md:text-5xl font-bold mb-2"
            >
              {project.title}
            </GradientText>
          </div>
        </div>

        <div className="p-6 pb-10 md:p-10 md:pb-14 space-y-8">
          {/* Links */}
          <div className="flex flex-wrap gap-4">
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-theme-bg/5 hover:bg-theme-bg/10 text-theme-bg rounded-lg border border-theme-bg/10 hover:border-theme-sky transition-all shadow-lg text-sm md:text-base"
            >
              <FiGithub size={18} className="md:size-5" />
              <span>View Source</span>
            </a>
            {project.livelink && (
              <a
                href={project.livelink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 md:px-5 md:py-2.5 bg-theme-sky hover:bg-theme-sky/90 text-white rounded-lg shadow-lg hover:shadow-theme-sky/25 transition-all text-sm md:text-base"
              >
                <FiExternalLink size={18} className="md:size-5" />
                <span>Live Demo</span>
              </a>
            )}
          </div>

          <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-[10px] md:text-sm font-mono text-theme-sky bg-theme-sky/10 px-2.5 py-1 md:px-3 md:py-1.5 rounded-full border border-theme-sky/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold text-theme-purple mb-3">Overview</h3>
            <ScrollReveal
              baseOpacity={0.2}
              enableBlur
              blurStrength={6}
              baseRotation={0}
              textClassName="text-theme-bg/80 leading-relaxed text-sm md:text-lg whitespace-pre-line"
            >
              {project.pageDescription}
            </ScrollReveal>
          </div>

          {/* Problem & Solution Grid */}
          <div className="flex flex-col md:flex-row gap-4 md:gap-8 pt-4">
            <div className="flex-1 bg-theme-bg/5 p-5 md:p-6 rounded-xl border border-theme-bg/10">
              <h4 className="text-base md:text-lg font-bold text-red-400 mb-2 md:mb-3">The Problem</h4>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur
                blurStrength={4}
                baseRotation={0}
                textClassName="text-theme-bg/80 text-xs md:text-base leading-relaxed"
              >
                {project.problem}
              </ScrollReveal>
            </div>

            <div className="flex-1 bg-theme-bg/5 p-5 md:p-6 rounded-xl border border-theme-bg/10">
              <h4 className="text-base md:text-lg font-bold text-green-400 mb-2 md:mb-3">The Solution</h4>
              <ScrollReveal
                baseOpacity={0.3}
                enableBlur
                blurStrength={4}
                baseRotation={0}
                textClassName="text-theme-bg/80 text-xs md:text-base leading-relaxed"
              >
                {project.solution}
              </ScrollReveal>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;
