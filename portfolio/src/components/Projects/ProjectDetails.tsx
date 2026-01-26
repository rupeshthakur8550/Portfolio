import { motion } from "framer-motion";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import GradientText from "../UI/GradientText";

interface ProjectDetailsProps {
  project: {
    title: string;
    cardDescription: string;
    pageDescription: string;
    tech: string[];
    link: string;
    livelink: string | null;
    image: string;
    problem: string;
    solution: string;
  };
  onBack: () => void;
}

const ProjectDetails = ({ project, onBack }: ProjectDetailsProps) => {
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
        onClick={onBack}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group cursor-pointer"
      >
        <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
        Back to Projects
      </button>

      <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
        {/* Header Image */}
        <div className="relative h-64 md:h-80 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
          <div className="absolute bottom-0 left-0 p-8">
            <GradientText
              animationSpeed={6}
              className="text-4xl md:text-5xl font-bold mb-2"
            >
              {project.title}
            </GradientText>
          </div>
        </div>

        <div className="p-8 md:p-10 space-y-8">
          {/* Links */}
          <div className="flex gap-4">
             <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 bg-cosmic-card hover:bg-cosmic-accent/20 text-cosmic-text rounded-lg border border-cosmic-muted/30 hover:border-cosmic-accent transition-all shadow-lg"
            >
              <FiGithub size={20} />
              <span>View Source</span>
            </a>
            {project.livelink && (
              <a
                href={project.livelink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-5 py-2.5 bg-cosmic-accent hover:bg-cosmic-accent-hover text-white rounded-lg shadow-lg hover:shadow-cosmic-accent/25 transition-all"
              >
                <FiExternalLink size={20} />
                <span>Live Demo</span>
              </a>
            )}
          </div>

           {/* Tech Stack */}
           <div className="flex flex-wrap gap-2">
            {project.tech.map((tech, i) => (
              <span
                key={i}
                className="text-sm font-mono text-cosmic-accent bg-cosmic-accent/10 px-3 py-1.5 rounded-full border border-cosmic-accent/30"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Description */}
          <div>
            <h3 className="text-xl font-semibold text-cosmic-accent mb-3">Overview</h3>
            <p className="text-cosmic-text-muted leading-relaxed text-lg whitespace-pre-line">
              {project.pageDescription}
            </p>
          </div>

          {/* Problem & Solution Grid */}
          <div className="grid md:grid-cols-2 gap-8 pt-4">
            <div className="bg-cosmic-card/50 p-6 rounded-xl border border-cosmic-muted/20 hover:border-cosmic-muted/40 transition-colors">
              <h4 className="text-lg font-bold text-cosmic-accent mb-3 flex items-center gap-2">
                The Problem
              </h4>
              <p className="text-cosmic-text-muted leading-relaxed">
                {project.problem}
              </p>
            </div>

            <div className="bg-cosmic-card/50 p-6 rounded-xl border border-cosmic-muted/20 hover:border-cosmic-muted/40 transition-colors">
              <h4 className="text-lg font-bold text-cosmic-accent mb-3 flex items-center gap-2">
                The Solution
              </h4>
              <p className="text-cosmic-text-muted leading-relaxed">
                {project.solution}
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;