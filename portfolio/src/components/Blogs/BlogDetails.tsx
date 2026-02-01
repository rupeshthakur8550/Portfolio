import { motion } from "framer-motion";
import { FiArrowLeft, FiCalendar } from "react-icons/fi";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import {
    AnimatedSpan,
    Terminal,
} from "@/components/UI/terminal";

interface BlogDetailsProps {
    blog: {
        title: string;
        summary: string;
        fullContent: string;
        date?: string;
        image: string;
        learningOutcomes: string[];
        githubLink?: string;
    };
    onBack: () => void;
}

const BlogDetails = ({ blog, onBack }: BlogDetailsProps) => {
    // Calculate current date
    const currentDate = new Date().toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    // Safeguard for content
    const fullContent = blog.fullContent || "";

    // Split content into segments: text and code blocks
    // This regex matches markdown code blocks and keeps them in the result
    const segments = fullContent.split(/(```(?:\w+)?\s*[\s\S]*?```)/g);

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
                className="flex items-center gap-2 text-theme-text-muted hover:text-theme-text transition-colors mb-8 group cursor-pointer"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
            </button>

            <div className="bg-theme-text/90 backdrop-blur-md border border-theme-bg/10 rounded-xl md:rounded-2xl overflow-hidden shadow-2xl">
                <div className="relative flex flex-col md:block md:h-96">
                    <div className="relative h-48 sm:h-64 md:absolute md:inset-0 md:h-full">
                        <LazyImage src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-t from-theme-bg via-theme-bg/40 to-transparent hidden md:block"></div>
                    </div>
                    <div className="relative p-6 sm:p-8 md:absolute md:bottom-0 md:left-0 md:p-12 md:z-10">
                        <h1 className="text-2xl sm:text-4xl md:text-6xl font-black text-theme-pink mb-2 md:mb-4 tracking-tighter leading-none">
                            {blog.title}
                        </h1>
                        <div className="flex items-center gap-3 md:gap-4 text-theme-bg/70 md:text-theme-text-sec font-medium">
                            <span className="flex items-center gap-1.5 md:gap-2 text-xs md:text-base">
                                <FiCalendar className="text-theme-purple" />
                                {currentDate}
                            </span>
                        </div>
                    </div>
                </div>

                <div className="p-6 sm:p-8 md:p-12 space-y-8 md:space-y-12">
                    {/* Summary Section */}
                    <section>
                        <ScrollReveal
                            baseOpacity={0.2}
                            enableBlur
                            blurStrength={6}
                            baseRotation={0}
                            textClassName="text-theme-bg/80 text-lg md:text-2xl leading-relaxed font-light"
                        >
                            {blog.summary}
                        </ScrollReveal>
                    </section>
                    {/* Dynamic Content Sections */}
                    <div className="space-y-8">
                        {segments.map((segment, index) => {
                            if (segment.startsWith("```")) {
                                // Extract code from block
                                const match = segment.match(/```(?:\w+)?\s*([\s\S]*?)```/);
                                const code = match ? match[1].trim() : "";
                                const codeLines = code.split("\n");

                                return (
                                    <div key={index} className="w-full my-6">
                                        <Terminal
                                            sequence={false}
                                            className="max-w-full bg-terminal-bg border-terminal-border font-mono text-xs md:text-sm overflow-x-auto shadow-xl"
                                        >
                                            {codeLines.map((line, i) => (
                                                <div key={i} className="whitespace-pre min-h-[1.25rem]">
                                                    <AnimatedSpan delay={i * 15}>
                                                        {line || " "}
                                                    </AnimatedSpan>
                                                </div>
                                            ))}
                                        </Terminal>
                                    </div>
                                );
                            } else if (segment.trim()) {
                                return (
                                    <section key={index} className="prose dark:prose-invert max-w-none">
                                        <ScrollReveal
                                            baseOpacity={0.2}
                                            enableBlur
                                            blurStrength={6}
                                            baseRotation={0}
                                            textClassName="text-theme-bg/80 leading-relaxed text-lg whitespace-pre-line"
                                        >
                                            {segment.trim()}
                                        </ScrollReveal>
                                    </section>
                                );
                            }
                            return null;
                        })}
                    </div>

                    {/* Learning Outcomes as UL */}
                    <section className="space-y-6">
                        <h3 className="text-xl font-semibold text-theme-purple tracking-tight">Key Takeaways</h3>
                        <ul className="space-y-4">
                            {blog.learningOutcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-3 text-theme-bg/80">
                                    <span className="text-theme-purple mt-1 md:mt-1.5 flex-shrink-0 text-[10px] md:text-xs">●</span>
                                    <ScrollReveal
                                        baseOpacity={0.4}
                                        enableBlur
                                        blurStrength={2}
                                        baseRotation={0}
                                        textClassName="text-sm md:text-base leading-relaxed"
                                    >
                                        {outcome}
                                    </ScrollReveal>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Github Link / Detailed Explanation Section */}
                    {blog.githubLink && (
                        <section className="mt-4 pt-6 md:pt-10 border-t border-theme-bg/10">
                            <h3 className="text-lg md:text-xl font-semibold text-theme-purple mb-3 md:mb-4 tracking-tight">Detailed Documentation</h3>
                            <div className="bg-theme-bg/5 border border-theme-bg/10 rounded-xl md:rounded-2xl p-5 md:p-8 hover:bg-theme-bg/10 transition-colors shadow-inner group">
                                <p className="text-theme-bg/70 mb-4 md:mb-6 text-sm md:text-lg leading-relaxed font-light">
                                    For a complete, step-by-step technical breakdown including advanced configurations, comprehensive architecture diagrams, and deployment scripts, explore the dedicated guide on GitHub.
                                </p>
                                <a
                                    href={blog.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-theme-purple to-theme-sky hover:from-theme-purple/90 hover:to-theme-sky/90 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-theme-purple/20 active:scale-95 text-sm"
                                >
                                    Read in Detail
                                    <FiArrowLeft className="rotate-180 group-hover:translate-x-1 transition-transform" />
                                </a>
                            </div>
                        </section>
                    )}
                </div>
            </div>
        </motion.div>
    );
};

export default BlogDetails;
