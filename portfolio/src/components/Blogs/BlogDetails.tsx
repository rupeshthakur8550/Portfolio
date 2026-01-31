import { motion } from "framer-motion";
import { FiArrowLeft } from "react-icons/fi";
import GradientText from "../UI/GradientText";
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
            className="w-full max-w-4xl mx-auto text-left pb-20"
            onClick={(e) => e.stopPropagation()}
        >
            <button
                onClick={onBack}
                className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-8 group cursor-pointer"
            >
                <FiArrowLeft className="group-hover:-translate-x-1 transition-transform" />
                Back to Blogs
            </button>

            <div className="bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-2xl overflow-hidden shadow-2xl">
                {/* Header Image */}
                <div className="relative h-64 md:h-80 w-full overflow-hidden">
                    <LazyImage
                        src={blog.image}
                        alt={blog.title}
                        className="w-full h-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/40 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-8">
                        <div className="flex gap-4 text-xs text-gray-400 mb-2">
                            <span className="text-gray-800">{currentDate}</span>
                        </div>
                        <GradientText
                            animationSpeed={6}
                            className="text-2xl md:text-5xl font-bold mb-2"
                        >
                            {blog.title}
                        </GradientText>
                    </div>
                </div>

                <div className="p-8 md:p-10 space-y-12">
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
                                            className="max-w-full bg-black/95 border-purple-500/30 font-mono text-xs md:text-sm overflow-x-auto shadow-xl"
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
                                    <section key={index} className="prose prose-invert max-w-none">
                                        <ScrollReveal
                                            baseOpacity={0.2}
                                            enableBlur
                                            blurStrength={6}
                                            baseRotation={0}
                                            textClassName="text-gray-300 leading-relaxed text-lg whitespace-pre-line"
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
                        <h3 className="text-xl font-semibold text-purple-400 tracking-tight">Key Takeaways</h3>
                        <ul className="space-y-4">
                            {blog.learningOutcomes.map((outcome, i) => (
                                <li key={i} className="flex items-start gap-3 text-gray-300">
                                    <span className="text-purple-500 mt-1.5 flex-shrink-0">●</span>
                                    <ScrollReveal
                                        baseOpacity={0.4}
                                        enableBlur
                                        blurStrength={2}
                                        baseRotation={0}
                                        textClassName="text-base leading-relaxed"
                                    >
                                        {outcome}
                                    </ScrollReveal>
                                </li>
                            ))}
                        </ul>
                    </section>

                    {/* Github Link / Detailed Explanation Section */}
                    {blog.githubLink && (
                        <section className="mt-4 pt-10 border-t border-gray-800">
                            <h3 className="text-xl font-semibold text-purple-400 mb-4 tracking-tight">Detailed Documentation</h3>
                            <div className="bg-gray-800/40 border border-gray-700/50 rounded-2xl p-6 md:p-8 hover:bg-gray-800/60 transition-colors shadow-inner group">
                                <p className="text-gray-300 mb-6 text-lg leading-relaxed font-light">
                                    For a complete, step-by-step technical breakdown including advanced configurations, comprehensive architecture diagrams, and deployment scripts, explore the dedicated guide on GitHub.
                                </p>
                                <a
                                    href={blog.githubLink}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="inline-flex items-center gap-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white px-8 py-3.5 rounded-xl font-semibold transition-all shadow-lg hover:shadow-purple-500/20 active:scale-95 text-base"
                                >
                                    View Full Documentation
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
