import { useState } from "react";
import { FiGithub, FiExternalLink, FiFolder, FiArchive } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { portfolioContent } from "../../content/portfolio";
import { Badge } from "../UI/badge";
import ScrollReveal from "../UI/ScrollReveal";

const Projects = () => {
  const projects = portfolioContent.projects;
  const projectsText = portfolioContent.projectsPage;
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      id="projects"
      className="min-h-screen py-16 md:py-24 px-6 md:px-12 lg:px-20 max-w-[1440px] mx-auto relative z-20"
    >
      {/* Background Glows (Premium Glass) */}
      <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-purple-500 rounded-full blur-[150px] opacity-[0.03] -z-10 pointer-events-none"></div>

      <div className="mb-12 md:mb-20 relative flex flex-col items-start max-w-3xl">
        <div className="font-mono text-[#00E676] text-sm md:text-base tracking-widest uppercase mb-4 flex items-center gap-3">
            <span className="w-8 h-[1px] bg-[#00E676]/50"></span>
            <span className="text-emerald-600 dark:text-[#00E676]">Featured Work</span>
        </div>
        <h2 className="text-4xl md:text-6xl font-semibold tracking-tight text-foreground mb-6">
          {projectsText.title}
        </h2>
        <div className="text-muted-foreground font-light text-lg md:text-xl leading-relaxed">
          <ScrollReveal
            baseOpacity={1}
            enableBlur={false}
            blurStrength={0}
            textClassName="inline"
          >
            {isExpanded ? projectsText.subtitleExpanded : projectsText.subtitle}
          </ScrollReveal>
        </div>
      </div>

      <div className="relative w-full min-h-[300px]">
        <AnimatePresence mode="wait">
          {!isExpanded ? (
            <motion.button
              type="button"
              key="folder"
              className="relative cursor-pointer group mt-20 w-full max-w-md mx-auto block"
              onClick={() => setIsExpanded(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -20 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              aria-label="Open project archive"
            >
              {/* Stack Effect Cards */}
              <div className="absolute top-0 left-0 w-full h-full bg-card/50 rounded-3xl border border-border transform -rotate-6 translate-x-4 -translate-y-2 opacity-60 transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:translate-x-6 shadow-sm"></div>
              <div className="absolute top-0 left-0 w-full h-full bg-card/50 rounded-3xl border border-border transform rotate-6 -translate-x-4 -translate-y-2 opacity-60 transition-transform duration-500 group-hover:rotate-[8deg] group-hover:-translate-x-6 shadow-sm"></div>
              
              {/* Main Folder Card */}
              <div className="relative w-full bg-card/80 backdrop-blur-xl border border-border hover:border-border/80 rounded-3xl flex flex-col items-center justify-center gap-6 p-10 transition-all duration-500 overflow-hidden z-10 hover:shadow-lg">
                
                {/* Neopop subtle hover gradient */}
                <div className="absolute inset-0 bg-gradient-to-br from-foreground/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="p-4 bg-muted/50 rounded-full text-muted-foreground group-hover:text-[#00E676] group-hover:bg-[#00E676]/10 transition-colors border border-border">
                  <FiArchive size={48} className="transition-colors" />
                </div>
                
                <div className="text-center">
                  <h3 className="text-2xl font-semibold text-foreground tracking-tight mb-2">{projectsText.folderText}</h3>
                  <p className="text-muted-foreground text-sm font-mono">
                    {projects.length} {projectsText.folderSubtext}
                  </p>
                </div>

                <div className="mt-4 px-6 py-2 rounded-full border border-border text-foreground/70 text-sm font-mono group-hover:border-[#00E676] group-hover:text-[#00E676] transition-all bg-background/50">
                  {projectsText.clickToOpen}
                </div>
              </div>
            </motion.button>
          ) : (
            <motion.div
              key="grid"
              className="w-full flex flex-col"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <div className="w-full flex justify-between items-center mb-8 pb-4 border-b border-border">
                <p className="font-mono text-muted-foreground text-sm">
                  {projects.length} PROJECTS EXTRACTED
                </p>
                <button
                  type="button"
                  onClick={() => setIsExpanded(false)}
                  className="font-mono text-sm text-[#00E676] dark:text-[#00E676] text-emerald-600 hover:text-foreground transition-colors flex items-center gap-2"
                >
                  <span className="text-lg leading-none">×</span> Close Archive
                </button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {projects.map((project, index) => (
                  <motion.div
                    key={project.slug}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1, ease: "easeOut" }}
                    className="h-full"
                  >
                    <article className="group relative bg-card/80 backdrop-blur-xl border border-border hover:border-border/80 hover:shadow-lg rounded-3xl p-6 md:p-8 transition-all duration-500 flex flex-col h-full overflow-hidden">
                      {/* Hover Top Accent */}
                      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#00E676] to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>

                      <div className="flex justify-between items-start mb-6">
                        <div className="text-muted-foreground group-hover:text-[#00E676] transition-colors">
                          <FiFolder size={28} />
                        </div>
                        <div className="flex gap-4 items-center">
                          <a href={project.link} aria-label={`View ${project.title} source code`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                            <FiGithub size={20} />
                          </a>
                          {project.livelink && (
                            <a href={project.livelink} aria-label={`Open ${project.title} live demo`} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                              <FiExternalLink size={20} />
                            </a>
                          )}
                        </div>
                      </div>

                      <Link
                        to={`/projects/${project.slug}`}
                        className="block focus:outline-none flex-grow"
                        aria-label={`Read details for ${project.title}`}
                      >
                        <h3 className="text-2xl font-semibold text-foreground mb-3 tracking-tight group-hover:text-[#00E676] transition-colors">
                          {project.title}
                        </h3>

                        <div className="mb-6">
                          <ScrollReveal
                            baseOpacity={1}
                            enableBlur={false}
                            baseRotation={0}
                            textClassName="text-muted-foreground font-light text-sm leading-relaxed line-clamp-3"
                          >
                            {project.cardDescription}
                          </ScrollReveal>
                        </div>
                      </Link>

                      <div className="flex flex-wrap gap-2 mt-auto pt-6">
                        {project.tech.map((tech, i) => (
                          <Badge key={i} variant="outline" className="font-mono text-[11px] text-muted-foreground bg-muted/20 px-2.5 py-1 rounded-md border-border group-hover:border-[#00E676]/30">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </article>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Projects;
