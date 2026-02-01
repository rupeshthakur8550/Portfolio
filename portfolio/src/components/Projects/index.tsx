import { useState } from "react";
import { FiGithub, FiExternalLink, FiFolder } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import ProjectDetails from "./ProjectDetails";
import ScrollReveal from "../UI/ScrollReveal";

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
      className="min-h-screen py-16 md:py-26 px-4 md:px-10 max-w-7xl mx-auto relative z-20 flex flex-col items-center"
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
        <div className="flex justify-center text-center">
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur
            blurStrength={8}
            textClassName="text-theme-text-muted text-lg max-w-2xl mx-auto"
          >
            {selectedProject ? "Project Details" : (isExpanded ? projectsText.subtitleExpanded : projectsText.subtitle)}
          </ScrollReveal>
        </div>
      </div>

      <div className="relative w-full flex justify-center min-h-[200px]">
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
              <div className="absolute top-0 left-0 w-80 h-96 bg-theme-text/50 rounded-xl border border-theme-bg/10 transform -rotate-6 translate-x-4 -translate-y-2 opacity-60 transition-transform duration-300 group-hover:rotate-[-8deg] group-hover:translate-x-6"></div>
              <div className="absolute top-0 left-0 w-80 h-96 bg-theme-text/50 rounded-xl border border-theme-bg/10 transform rotate-6 -translate-x-4 -translate-y-2 opacity-60 transition-transform duration-300 group-hover:rotate-[8deg] group-hover:-translate-x-6"></div>

              {/* Main Folder Card */}
              <div className="relative w-80 h-96 bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-xl shadow-[0_0_50px_rgba(0,0,0,0.1)] flex flex-col items-center justify-center gap-6 p-8 z-10 hover:border-theme-sky transition-colors">
                <FiFolder size={80} className="text-theme-sky group-hover:text-theme-bg/70 transition-colors" />
                <h3 className="text-2xl font-bold text-theme-sky text-center">{projectsText.folderText}</h3>
                <p className="text-theme-bg/70 text-center text-sm leading-relaxed">
                  {projects.length} {projectsText.folderSubtext} <br />
                  <span className="text-theme-sky font-bold">{projectsText.tapToExpand}</span>
                </p>
                <div className="mt-4 px-4 py-2 bg-theme-sky/10 text-theme-sky rounded-full text-sm font-semibold animate-pulse border border-theme-sky/20">
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
                  <div className="absolute -top-3 left-0 w-1/3 h-4 bg-theme-text/80 rounded-t-lg border-t border-l border-r border-theme-bg/10 z-0 transition-colors group-hover:bg-theme-text"></div>

                  {/* Main Folder Body */}
                  <div className="relative bg-theme-text/90 backdrop-blur-md border border-theme-bg/10 rounded-b-xl rounded-tr-xl p-6 transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_0_25px_rgba(0,0,0,0.1)] group-hover:border-theme-sky/50 flex flex-col z-10 min-h-[350px]">

                    <div className="flex justify-between items-start mb-6">
                      <div className="p-3 bg-theme-bg/5 rounded-lg text-theme-sky group-hover:text-theme-bg group-hover:bg-theme-sky/20 transition-colors">
                        <FiFolder size={24} />
                      </div>
                      <div className="flex gap-3">
                        <a href={project.link} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-theme-bg/60 hover:text-theme-bg transition-colors p-2 hover:bg-theme-sky/10 rounded-full">
                          <FiGithub size={20} />
                        </a>
                        {project.livelink && (
                          <a href={project.livelink} onClick={(e) => e.stopPropagation()} target="_blank" rel="noopener noreferrer" className="text-theme-bg/60 hover:text-theme-bg transition-colors p-2 hover:bg-theme-sky/10 rounded-full">
                            <FiExternalLink size={20} />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold text-theme-bg mb-3 group-hover:text-theme-sky transition-colors">
                      {project.title}
                    </h3>

                    <div className="mb-6">
                      <ScrollReveal
                        baseOpacity={0.3}
                        enableBlur
                        blurStrength={4}
                        baseRotation={0}
                        textClassName="text-theme-bg/70 text-sm leading-relaxed"
                      >
                        {project.cardDescription}
                      </ScrollReveal>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-auto">
                      {project.tech.map((tech, i) => (
                        <span key={i} className="text-xs font-mono text-theme-sky bg-theme-sky/10 px-2 py-1 rounded border border-theme-sky/20">
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
