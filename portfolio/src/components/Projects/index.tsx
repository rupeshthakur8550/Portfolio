import { useState } from "react";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import ProjectDetails from "./ProjectDetails";

const Projects = () => {
  const projects = common.Portfolio.projects;
  const projectsText = common.Portfolio.projectsPage;
  const [isExpanded, setIsExpanded] = useState(false);
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const handleBackgroundClick = () => {
    if (selectedProject) {
      setSelectedProject(null);
    } else {
      setIsExpanded(false);
    }
  };

  return (
    <div
      id="projects"
      className="min-h-screen pt-16  px-4 md:px-10 max-w-7xl mx-auto relative z-20 flex flex-col items-center"
      onClick={handleBackgroundClick}
    >
      <div className="text-center sm:mb-12 md:mb-20 mb-10">
        <div className="mb-6">
          <GradientText
            animationSpeed={3}
            className="text-5xl sm:text-7xl font-black tracking-tight"
          >
            {projectsText.title}
          </GradientText>
        </div>
        <p className="text-cosmic-muted text-lg max-w-2xl mx-auto">
          {selectedProject ? "Project Details" : (isExpanded ? projectsText.subtitleExpanded : projectsText.subtitle)}
        </p>
      </div>

      <div className="relative w-full flex justify-center min-h-[200px] pb-20">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.div
              key="folder"
              className="relative cursor-pointer group mt-20"
              onClick={(e) => { e.stopPropagation(); setIsExpanded(true); }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              {/* Stack Effect Cards */}
              <div className="absolute top-0 left-0 w-80 h-96 bg-cosmic-card/50 rounded-xl border border-cosmic-muted/30 transform -rotate-6 translate-x-4 -translate-y-2 opacity-60 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:translate-x-6"></div>
              <div className="absolute top-0 left-0 w-80 h-96 bg-cosmic-card/50 rounded-xl border border-cosmic-muted/30 transform rotate-6 -translate-x-4 -translate-y-2 opacity-60 transition-transform duration-300 group-hover:rotate-[8deg] group-hover:-translate-x-6"></div>

              {/* Main Folder Card */}
              <div className="relative w-80 h-96 bg-cosmic-card backdrop-blur-xl border border-cosmic-muted/50 rounded-xl shadow-[0_0_50px_rgba(18,78,102,0.2)] flex flex-col items-center justify-center gap-6 p-8 z-10 hover:border-cosmic-accent transition-colors">
                <FiFolder size={80} className="text-cosmic-accent group-hover:text-cosmic-muted transition-colors" />
                <h3 className="text-2xl font-bold text-cosmic-accent text-center">{projectsText.folderText}</h3>
                <p className="text-cosmic-muted text-center text-sm leading-relaxed">
                  {projects.length} {projectsText.folderSubtext} <br />
                  <span className="text-cosmic-accent">{projectsText.tapToExpand}</span>
                </p>
                <div className="mt-4 px-4 py-2 bg-cosmic-accent/20 text-cosmic-accent rounded-full text-sm font-semibold animate-pulse border border-cosmic-accent/30">
                  {projectsText.clickToOpen}
                </div>
              </div>
            </motion.div>
          ) : selectedProject ? (
            <motion.div
              key="details"
              className="w-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4 }}
            >
              <ProjectDetails
                project={selectedProject}
                onBack={() => setSelectedProject(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="w-full flex flex-wrap justify-center items-start gap-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              onClick={(e) => e.stopPropagation()}
            >
              {projects.map((project, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedProject(project);
                  }}
                  className="cursor-pointer group relative w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)]"
                >
                  {/* Folder Tab Effect */}
                  <div className="absolute -top-3 left-0 w-1/3 h-4 bg-cosmic-card/80 rounded-t-lg border-t border-l border-r border-cosmic-muted/30 z-0 transition-colors group-hover:bg-cosmic-card"></div>

                  {/* Main Folder Body */}
                  <div className="relative bg-cosmic-card backdrop-blur-md border border-cosmic-muted/30 rounded-b-xl rounded-tr-xl p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_25px_rgba(18,78,102,0.15)] group-hover:border-cosmic-accent/50 flex flex-col z-10 min-h-[350px]">

                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-cosmic-bg rounded-lg text-cosmic-accent group-hover:text-cosmic-text group-hover:bg-cosmic-accent/20 transition-colors">
                        <FiFolder size={24} />
                      </div>
                      <div className="flex gap-3">
                        <a href={project.link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-cosmic-muted hover:text-cosmic-text transition-colors p-2 hover:bg-cosmic-accent/10 rounded-full">
                          <FiGithub size={20} />
                        </a>
                        {project.livelink && (
                          <a href={project.livelink} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-cosmic-muted hover:text-cosmic-text transition-colors p-2 hover:bg-cosmic-accent/10 rounded-full">
                            <FiExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-cosmic-accent mb-3 group-hover:text-cosmic-accent-hover transition-colors">
                      {project.title}
                    </h3>

                    <p className="text-cosmic-muted text-sm mb-6 leading-relaxed">
                      {project.cardDescription}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-xs font-mono text-cosmic-text-muted bg-cosmic-accent/10 px-2 py-1 rounded border border-cosmic-accent/20">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
