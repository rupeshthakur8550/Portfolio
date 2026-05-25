import { motion, type Variants } from "framer-motion";
import { FiArrowLeft, FiCalendar, FiGithub } from "react-icons/fi";
import { Link } from "react-router-dom";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import { AnimatedSpan, Terminal } from "@/components/UI/terminal";
import { type BlogEntry, slugify } from "../../content/portfolio";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "../UI/breadcrumb";
import { Badge } from "../UI/badge";

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

const MetaItem = ({ label, children }: { label: string; children: React.ReactNode }) => (
  <li className="flex justify-between items-center border-b border-theme-bg/10 pb-4 last:border-0 last:pb-0">
    <span className="text-theme-bg/60 text-sm">{label}</span>
    <span className="text-theme-bg/90 text-sm font-medium">{children}</span>
  </li>
);

// ─── Main Component ────────────────────────────────────────────────────

interface BlogDetailsProps {
  blog: BlogEntry;
}

const BlogDetails = ({ blog }: BlogDetailsProps) => {
  const fullContent = blog.fullContent || "";

  // Extract TOC dynamically
  const toc: { id: string; title: string }[] = [];
  const headingRegex = /^##\s+(.+)$/gm;
  let match;
  while ((match = headingRegex.exec(fullContent)) !== null) {
    toc.push({
      id: slugify(match[1]),
      title: match[1],
    });
  }

  const segments = fullContent.split(/(```(?:\w+)?\s*[\s\S]*?```)/g);

  return (
    <motion.div
      variants={fadeIn}
      initial="hidden"
      animate="visible"
      exit="exit"
      className="min-h-screen text-foreground font-sans selection:bg-theme-purple/30 selection:text-theme-purple relative overflow-x-hidden"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="max-w-6xl mx-auto px-6 md:px-8 py-12 md:py-20 relative z-10">
        {/* ── Breadcrumb ────────────────────────────────────────────── */}
        <motion.nav variants={slideUp} initial="hidden" animate="visible" custom={0} className="mb-14">
          <Breadcrumb>
            <BreadcrumbList className="text-sm">
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/blogs" className="text-theme-text/60 hover:text-theme-purple font-mono text-xs transition-colors duration-300 flex items-center gap-2 group">
                    <FiArrowLeft className="transition-transform group-hover:-translate-x-1" />
                    blogs
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-theme-text/20" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-theme-purple font-mono text-xs">
                  {blog.slug}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </motion.nav>

        {/* ── Hero ──────────────────────────────────────────────────── */}
        <motion.header variants={slideUp} initial="hidden" animate="visible" custom={0.15} className="mb-16 md:mb-20">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-foreground mb-6 leading-[1.1]">
            {blog.title}
          </h1>
          <p className="text-lg md:text-xl text-theme-text/70 font-light leading-relaxed max-w-3xl">
            {blog.summary}
          </p>
        </motion.header>

        {/* ── Hero Image ────────────────────────────────────────────── */}
        <motion.div variants={scaleIn} initial="hidden" animate="visible" custom={0.25} className="w-full h-64 sm:h-80 md:h-[480px] relative rounded-[2rem] overflow-hidden mb-20 border border-border/30 shadow-2xl shadow-black/5 group">
          <LazyImage src={blog.image} alt={blog.title} className="w-full h-full object-cover opacity-85 group-hover:opacity-100 group-hover:scale-[1.02] transition-all duration-700 ease-out" />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/30 via-transparent to-background/30 pointer-events-none" />
        </motion.div>

        {/* ── Overview + Sidebar Grid ───────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">

          {/* Main Content */}
          <div className="lg:col-span-8 order-2 lg:order-1 space-y-12">

            <div className="space-y-8">
              {segments.map((segment, index) => {
                if (segment.startsWith("```")) {
                  const match = segment.match(/```(?:\w+)?\s*([\s\S]*?)```/);
                  const code = match ? match[1].trim() : "";
                  const codeLines = code.split("\n");
                  return (
                    <div key={index} className="w-full my-6">
                      <Terminal sequence={false} className="max-w-full bg-terminal-bg border-terminal-border font-mono text-xs md:text-sm overflow-x-auto shadow-xl">
                        {codeLines.map((line, i) => (
                          <div key={i} className="whitespace-pre min-h-[1.25rem]">
                            <AnimatedSpan delay={Math.min(i * 15, 1500)}>{line || " "}</AnimatedSpan>
                          </div>
                        ))}
                      </Terminal>
                    </div>
                  );
                } else if (segment.trim()) {
                  const parts = segment.split(/(^##\s+.+$)/m);
                  return (
                    <section key={index} className="prose prose-invert max-w-none">
                      <ScrollReveal baseOpacity={1} enableBlur={false} baseRotation={0} textClassName="text-theme-text/80 leading-[1.85] text-base md:text-[17px] font-light">
                        {parts.map((part, i) => {
                          if (part.startsWith("## ")) {
                            const text = part.replace("## ", "").trim();
                            const id = slugify(text);
                            return (
                              <h2 key={i} id={id} className="text-xl md:text-2xl font-semibold text-theme-text mt-12 mb-4 scroll-m-24 block">
                                {text}
                              </h2>
                            );
                          } else if (part.trim()) {
                            return (
                              <div key={i} className="whitespace-pre-line">
                                {part}
                              </div>
                            );
                          }
                          return null;
                        })}
                      </ScrollReveal>
                    </section>
                  );
                }
                return null;
              })}
            </div>

            {blog.githubLink && (
              <section className="mt-14 pt-10 border-t border-border/30">
                <h3 className="text-xl font-medium text-foreground flex items-center gap-3 mb-6">
                  <span className="w-5 h-[1px] bg-theme-purple/50 block"></span>
                  Detailed Documentation
                </h3>
                <div className="bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl p-7 md:p-8 hover:bg-theme-text/100 transition-colors">
                  <p className="text-theme-bg/90 mb-6 text-base leading-[1.85] font-light">
                    For a complete, step-by-step technical breakdown including advanced configurations, comprehensive architecture diagrams, and deployment scripts, explore the dedicated guide on GitHub.
                  </p>
                  <a href={blog.githubLink} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2.5 px-7 py-3.5 font-medium rounded-2xl bg-theme-bg text-theme-text border border-theme-text/20 hover:bg-theme-green hover:text-black hover:shadow-lg hover:shadow-theme-green/20 transition-all duration-300">
                    <FiGithub className="text-lg" />
                    <span>View on GitHub</span>
                  </a>
                </div>
              </section>
            )}
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-4 order-1 lg:order-2">
            <div className="sticky top-8 space-y-6">
              {/* Table of Contents */}
              {toc.length > 0 && (
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl p-7 shadow-sm">
                  <h3 className="text-[11px] font-mono text-theme-bg/80 uppercase tracking-[0.2em] mb-6">Table of Contents</h3>
                  <nav className="space-y-3">
                    {toc.map((item, i) => (
                      <a
                        key={i}
                        href={`#${item.id}`}
                        className="block text-[13px] text-theme-bg/90 hover:text-theme-green-strong transition-colors font-medium border-l-2 border-theme-bg/10 pl-3 hover:border-theme-green-strong/50 leading-snug"
                        onClick={(e) => {
                          e.preventDefault();
                          const el = document.getElementById(item.id);
                          if (el) {
                            el.scrollIntoView({ behavior: "smooth", block: "start" });
                          }
                        }}
                      >
                        {item.title}
                      </a>
                    ))}
                  </nav>
                </motion.div>
              )}

              {/* Article Meta */}
              <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} className="bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl p-7 shadow-sm">
                <h3 className="text-[11px] font-mono text-theme-bg/80 uppercase tracking-[0.2em] mb-6">Article Meta</h3>
                <ul className="space-y-4">
                  {blog.date && (
                    <MetaItem label="Published">
                      <span className="text-theme-bg/90 flex items-center gap-2"><FiCalendar className="text-theme-green-strong" /> {blog.date}</span>
                    </MetaItem>
                  )}
                  <MetaItem label="Category">
                    <Badge variant="outline" className="font-mono text-[11px] bg-theme-green/10 text-theme-green border-theme-green/20 rounded-xl px-3 py-1">Technical Writing</Badge>
                  </MetaItem>
                </ul>
              </motion.div>

              {/* Key Takeaways */}
              {blog.learningOutcomes && blog.learningOutcomes.length > 0 && (
                <motion.div variants={scaleIn} initial="hidden" whileInView="visible" viewport={{ once: true }} custom={0.1} className="bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 rounded-3xl p-7 shadow-sm">
                  <h3 className="text-[11px] font-mono text-theme-bg/80 uppercase tracking-[0.2em] mb-6">Key Takeaways</h3>
                  <ul className="space-y-4">
                    {blog.learningOutcomes.map((outcome, i) => (
                      <li key={i} className="flex items-start gap-3 text-theme-bg/90 font-light text-[14px] leading-relaxed">
                        <span className="text-theme-green-strong mt-1.5 flex-shrink-0 text-[10px]">●</span>
                        <span>{outcome}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </motion.div>
  );
};

export default BlogDetails;
