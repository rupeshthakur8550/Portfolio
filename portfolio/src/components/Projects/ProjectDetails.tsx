import { Link } from "react-router-dom";
import { FiArrowLeft, FiGithub, FiExternalLink } from "react-icons/fi";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../UI/breadcrumb";
import { Badge } from "../UI/badge";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import { type ProjectEntry } from "../../content/portfolio";
import { motion, type Variants } from "framer-motion";

// ─── Animation Variants ──────────────────────────────────────────────

const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.5, ease: "easeOut" } },
  exit: { opacity: 0, transition: { duration: 0.3 } },
};

const slideUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (delay = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: delay as number, ease: [0.22, 1, 0.36, 1] },
  }),
};

const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (delay = 0) => ({
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, delay: delay as number, ease: [0.22, 1, 0.36, 1] },
  }),
};

// ─── Sub-Components ──────────────────────────────────────────────────

const TerminalHeader = ({ slug }: { slug: string }) => (
  <motion.div
    variants={slideUp}
    initial="hidden"
    animate="visible"
    custom={0.1}
    className="mb-10 font-mono text-xs md:text-sm text-theme-bg/70 bg-theme-text/90 p-5 rounded-2xl border border-theme-bg/10 shadow-inner overflow-hidden backdrop-blur-sm"
  >
    <div className="flex gap-2 mb-3 border-b border-theme-bg/10 pb-3">
      <div className="w-3 h-3 rounded-full bg-rose-500/70" />
      <div className="w-3 h-3 rounded-full bg-amber-500/70" />
      <div className="w-3 h-3 rounded-full bg-emerald-500/70" />
    </div>
    <div>
      <span className="text-emerald-400">rupesh@portfolio</span>
      <span className="text-theme-bg/50">:</span>
      <span className="text-blue-400">~/projects/{slug}</span>
      <span className="text-theme-bg/50">$</span>{" "}
      <span className="text-theme-bg/60">cat README.md</span>
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.8 }}
      className="mt-2 text-theme-bg/40 text-xs"
    >
      Loading project details... <span className="text-emerald-400">Done.</span>
    </motion.div>
  </motion.div>
);

const TechBadge = ({ tech }: { tech: string }) => (
  <Badge
    variant="outline"
    className="font-mono text-[11px] text-theme-bg/80 bg-theme-bg/5 border-theme-bg/20 px-3 py-1.5 hover:border-emerald-500/40 hover:bg-emerald-500/5 hover:text-emerald-400 transition-all duration-300 cursor-default rounded-xl"
  >
    {tech}
  </Badge>
);

const ActionButton = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: React.ElementType;
  label: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full border border-theme-text/20 text-theme-text/70 text-sm font-mono hover:border-theme-green hover:text-theme-green transition-all bg-theme-text/5 hover:bg-theme-text/10 group"
    >
      <Icon className="text-lg transition-transform group-hover:scale-110" />
      <span>{label}</span>
    </a>
  );
};

const SectionHeading = ({ title }: { title: string }) => (
  <h2 className="text-xl md:text-2xl font-semibold text-theme-text mt-12 mb-4 block">
    {title}
  </h2>
);

const MetaItem = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <li className="flex justify-between items-center border-b border-theme-bg/10 pb-4 last:border-0 last:pb-0">
    <span className="text-theme-bg/60 text-sm">{label}</span>
    <span className="text-theme-bg/90 text-sm font-medium">{children}</span>
  </li>
);

// ─── Main Component ────────────────────────────────────────────────────

interface ProjectDetailsProps {
  project: ProjectEntry;
}

const ProjectDetails = ({ project }: ProjectDetailsProps) => {
  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen text-foreground font-sans selection:bg-emerald-500/30 selection:text-emerald-100 relative overflow-x-hidden"
    >


      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20 relative z-10">
        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <motion.nav
          variants={slideUp}
          initial="hidden"
          animate="visible"
          custom={0}
          className="mb-14"
        >
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/projects"
                    className="text-muted-foreground/60 hover:text-emerald-400 font-mono text-xs transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                    projects
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-muted-foreground/20" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-emerald-400 font-mono text-xs">
                  {project.slug}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.nav>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <motion.header
          variants={slideUp}
          initial="hidden"
          animate="visible"
          custom={0.15}
          className="mb-16 md:mb-20"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 leading-[1.1]">
            {project.title}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground/70 font-light leading-relaxed mb-10 max-w-3xl">
            {project.cardDescription}
          </p>

          <div className="flex flex-wrap gap-4">
            <ActionButton
              href={project.link}
              icon={FiGithub}
              label="Source Code"
            />
            {project.livelink && (
              <ActionButton
                href={project.livelink}
                icon={FiExternalLink}
                label="Live Demo"
              />
            )}
          </div>
        </motion.header>

        {/* ── Hero Image ────────────────────────────────────────────── */}
        <motion.div
          variants={scaleIn}
          initial="hidden"
          animate="visible"
          custom={0.25}
          className="w-full h-64 sm:h-80 md:h-[480px] relative rounded-[2rem] overflow-hidden mb-20 border border-border/30 shadow-2xl shadow-black/5 group"
        >
          <LazyImage
            src={project.image}
            alt={project.title}
            className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
        </motion.div>

        {/* ── Overview + Sidebar Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Main Content */}
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-4">
            <TerminalHeader slug={project.slug} />

            <motion.div
              variants={slideUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0}
            >
              <div className="text-theme-text/80 font-light leading-[1.85] whitespace-pre-line text-base md:text-[17px]">
                <ScrollReveal
                  baseOpacity={1}
                  enableBlur={false}
                  baseRotation={0}
                >
                  {project.pageDescription}
                </ScrollReveal>
              </div>
            </motion.div>

            {project.problem && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="The Problem" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.problem}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}

            {project.architecture && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="Architecture" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.architecture}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}

            {project.tradeoff && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="Key Tradeoff" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.tradeoff}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}

            {project.security && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="Security Considerations" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.security}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}

            {project.outcome && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="The Outcome" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.outcome}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}

            {project.metric && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="Impact" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.metric}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}

            {project.whatIdChange && (
              <motion.div variants={slideUp} initial="hidden" whileInView="visible" viewport={{ once: true }}>
                <SectionHeading title="Retrospective" />
                <div className="text-theme-text/80 font-light leading-[1.85] text-base md:text-[17px]">
                  <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0}>
                    {project.whatIdChange}
                  </ScrollReveal>
                </div>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 space-y-6 order-1 lg:order-2">
            {/* Tech Stack */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl p-7 shadow-sm sticky top-8"
            >
              <h3 className="text-[11px] font-mono text-theme-bg/60 uppercase tracking-[0.2em] mb-6">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2.5">
                {project.tech.map((tech, index) => (
                  <TechBadge key={index} tech={tech} />
                ))}
              </div>
            </motion.div>

            {/* Project Meta */}
            <motion.div
              variants={scaleIn}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.1}
              className="bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl p-7 shadow-sm"
            >
              <h3 className="text-[11px] font-mono text-theme-bg/60 uppercase tracking-[0.2em] mb-6">
                Project Meta
              </h3>
              <ul className="space-y-4">
                <MetaItem label="Status">
                  <Badge
                    variant="outline"
                    className="font-mono text-[11px] bg-emerald-500/10 text-emerald-400 border-emerald-500/20 rounded-xl px-3 py-1"
                  >
                    Completed
                  </Badge>
                </MetaItem>
                <MetaItem label="Category">
                  <span className="text-theme-bg/80">Software Engineering</span>
                </MetaItem>
                <MetaItem label="Repository">
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-xs text-theme-bg/50 hover:text-theme-bg transition-colors duration-300 flex items-center gap-1.5 group"
                  >
                    <FiGithub className="group-hover:text-emerald-400 transition-colors" />
                    /github
                  </a>
                </MetaItem>
              </ul>
            </motion.div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default ProjectDetails;