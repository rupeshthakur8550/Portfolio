import { Link } from "react-router-dom";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../UI/breadcrumb";
import { Badge } from "../UI/badge";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import { type ProjectEntry } from "../../content/portfolio";
import { motion } from "framer-motion";

interface ProjectDetailsProps {
 project: ProjectEntry;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {

 return (
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 exit={{ opacity: 0 }}
 className="min-h-screen bg-background text-foreground font-sans selection:bg-theme-green selection:text-black relative transition-colors duration-300 overflow-x-hidden"
 >
 {/* Background Glows (Premium Glass) */}
 <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-theme-green rounded-full blur-[150px] opacity-10 opacity-10 -z-10 pointer-events-none"></div>
 <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-blue-500 rounded-full blur-[150px] opacity-10 opacity-10 -z-10 pointer-events-none"></div>

 <div className="max-w-7xl mx-auto px-6 py-12 md:py-20 relative z-10">

 {/* Top Navigation */}
 <div className="mb-12">
 <Breadcrumb>
 <BreadcrumbList>
 <BreadcrumbItem>
 <BreadcrumbLink asChild>
 <Link to="/projects" className="text-muted-foreground hover:text-theme-green font-mono text-sm transition-colors flex items-center gap-2">
 <FiArrowLeft /> projects
 </Link>
 </BreadcrumbLink>
 </BreadcrumbItem>
 <BreadcrumbSeparator className="text-muted-foreground/50" />
 <BreadcrumbItem>
 <BreadcrumbPage className="text-theme-green text-theme-green font-mono text-sm">{project.slug}</BreadcrumbPage>
 </BreadcrumbItem>
 </BreadcrumbList>
 </Breadcrumb>
 </div>

 {/* Hero Section */}
 <header className="mb-16">
 <h1 className="text-4xl sm:text-5xl md:text-7xl font-semibold tracking-tight text-foreground mb-6">
 {project.title}
 </h1>

 <p className="text-xl text-muted-foreground font-light leading-relaxed mb-8 max-w-3xl">
 {project.cardDescription}
 </p>

 <div className="flex flex-wrap gap-4">
 <a
 href={project.link}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-6 py-3 bg-foreground text-background font-medium rounded-2xl hover:scale-105 hover:bg-theme-green hover:text-black transition-all duration-300 shadow-sm"
 >
 <FiGithub className="text-lg" />
 <span>Source Code</span>
 </a>
 {project.livelink && (
 <a
 href={project.livelink}
 target="_blank"
 rel="noopener noreferrer"
 className="inline-flex items-center gap-2 px-6 py-3 bg-card/50 text-foreground font-medium border border-border rounded-2xl hover:bg-muted/50 hover:border-theme-green/50 hover:scale-105 transition-all duration-300 shadow-sm"
 >
 <FiExternalLink className="text-lg text-theme-green text-theme-green" />
 <span>Live Demo</span>
 </a>
 )}
 </div>
 </header>

 {/* Hero Image */}
 <div className="w-full h-64 sm:h-80 md:h-[450px] relative rounded-3xl overflow-hidden mb-16 border border-border shadow-lg">
 <LazyImage
 src={project.image}
 alt={project.title}
 className="w-full h-full object-cover opacity-90 hover:opacity-100 transition-opacity duration-700 hover:scale-105"
 />
 <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent pointer-events-none"></div>
 </div>

 <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
 {/* Main Content */}
 <div className="lg:col-span-2 space-y-12">

 {/* Overview */}
 <section className="space-y-6">
 <div className="mb-8 font-mono text-xs md:text-sm text-muted-foreground bg-muted/30 p-4 rounded-2xl border border-border shadow-inner overflow-hidden">
 <div className="flex gap-2 mb-3 border-b border-border/50 pb-2">
 <div className="w-3 h-3 rounded-full bg-rose-500/80"></div>
 <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
 <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
 </div>
 <motion.div
 initial={{ opacity: 0, x: -10 }}
 animate={{ opacity: 1, x: 0 }}
 transition={{ delay: 0.2 }}
 >
 <span className="text-theme-green">rupesh@portfolio</span>:<span className="text-blue-500">~/projects/{project.slug}</span>$ cat README.md
 </motion.div>
 <motion.div
 initial={{ opacity: 0 }}
 animate={{ opacity: 1 }}
 transition={{ delay: 0.6 }}
 className="mt-2 text-foreground/70"
 >
 Loading project details... Done.
 </motion.div>
 </div>

 <h2 className="text-xl font-medium text-foreground flex items-center gap-3">
 <span className="text-theme-green font-mono text-sm">//</span> Overview
 </h2>
 <div className="text-muted-foreground font-light leading-relaxed whitespace-pre-line text-lg">
 <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
 {project.pageDescription}
 </ScrollReveal>
 </div>
 </section>

 {/* Problem & Solution */}
 <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
 <section className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 hover:border-theme-green/50 transition-all shadow-sm hover:shadow-md">
 <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-rose-500/50"></span> The Problem
 </h3>
 <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0} textClassName="text-foreground/80 font-light leading-relaxed text-sm md:text-base">
 {project.problem}
 </ScrollReveal>
 </section>

 <section className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 md:p-8 hover:border-blue-500/50 transition-all shadow-sm hover:shadow-md">
 <h3 className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-4 flex items-center gap-2">
 <span className="w-2 h-2 rounded-full bg-blue-500/50"></span> The Outcome
 </h3>
 <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0} textClassName="text-foreground/80 font-light leading-relaxed text-sm md:text-base">
 {project.outcome}
 </ScrollReveal>
 </section>
 </div>

 </div>

 {/* Sidebar */}
 <div className="lg:col-span-1 space-y-8">
 {/* Tech Stack */}
 <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-sm">
 <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">
 Technology Stack
 </h3>
 <div className="flex flex-wrap gap-2">
 {project.tech.map((tech, index) => (
 <Badge
 key={index}
 variant="outline"
 className="font-mono text-[11px] text-muted-foreground bg-muted/20 border-border px-2.5 py-1 hover:border-theme-green/50 hover:bg-theme-green/10 hover:text-theme-green transition-colors rounded-xl"
 >
 {tech}
 </Badge>
 ))}
 </div>
 </div>

 {/* Project Meta */}
 <div className="bg-card/80 backdrop-blur-xl border border-border rounded-3xl p-6 shadow-sm">
 <h3 className="text-sm font-mono text-muted-foreground uppercase tracking-widest mb-6">
 Project Meta
 </h3>
 <ul className="space-y-4">
 <li className="flex justify-between items-center border-b border-border/50 pb-3">
 <span className="text-muted-foreground text-sm">Status</span>
 <Badge variant="outline" className="font-mono text-xs bg-theme-green/10 text-theme-green dark:text-theme-green border-theme-green/20 rounded-xl">
 Completed
 </Badge>
 </li>
 <li className="flex justify-between items-center border-b border-border/50 pb-3">
 <span className="text-muted-foreground text-sm">Category</span>
 <span className="text-foreground text-sm font-medium">Software Engineering</span>
 </li>
 <li className="flex justify-between items-center pb-1">
 <span className="text-muted-foreground text-sm">Repository</span>
 <a href={project.link} target="_blank" rel="noopener noreferrer" className="font-mono text-xs text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1">
 <FiGithub /> /github
 </a>
 </li>
 </ul>
 </div>
 </div>
 </div>

 </div>
 </motion.div>
 );
};

export default ProjectDetails;
