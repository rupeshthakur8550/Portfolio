import { useState } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import { Link } from "react-router-dom";
import { portfolioContent } from "../../content/portfolio";
import GradientText from "../UI/GradientText";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import { motion } from "framer-motion";

const Blogs = () => {
  const blogs = portfolioContent.blogs;
  const blogsText = portfolioContent.blogsPage;
  const [activeFilter] = useState("all");

  return (
    <div
      id="blogs"
      className="min-h-screen py-16 md:py-24 px-4 md:px-10 max-w-6xl mx-auto relative z-20"
    >
      <div className="text-center mb-5 md:mb-20">
        <div className="mb-6">
          <GradientText
            animationSpeed={3}
            showBorder={false}
            className="text-5xl sm:text-7xl font-black tracking-tight"
          >
            {blogsText.title}
          </GradientText>
        </div>
        <div className="flex justify-center text-center">
          <ScrollReveal
            baseOpacity={0.2}
            enableBlur
            blurStrength={8}
            textClassName="text-theme-text-sec text-lg max-w-2xl mx-auto"
          >
            {blogsText.subtitle}
          </ScrollReveal>
        </div>
      </div>

      <motion.div
        className="relative w-full flex flex-wrap items-start gap-8"
        variants={{
          hidden: { opacity: 0 },
          show: {
            opacity: 1,
            transition: { staggerChildren: 0.15 }
          }
        }}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-50px" }}
      >
        {blogs
          .filter(() => activeFilter === "all")
          .map((blog) => (
            <motion.article
              variants={{
                hidden: { opacity: 0, y: 30 },
                show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
              }}
              key={blog.slug}
              className="group relative block bg-theme-text/90 backdrop-blur-xl border border-theme-bg/10 hover:border-theme-bg/30 rounded-3xl p-6 md:p-8 transition-all duration-500 hover:shadow-lg w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] flex flex-col overflow-hidden hover:bg-theme-text"
            >
              {/* Hover Top Accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-theme-green to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-x-0 group-hover:scale-x-100"></div>
              <Link
                to={`/blogs/${blog.slug}`}
                className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-theme-sky rounded-xl"
                aria-label={`Read ${blog.title}`}
              >
                <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                  <LazyImage
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                  />
                </div>

                {blog.date && (
                  <div className="flex justify-between items-center text-sm text-theme-bg/70 mb-4">
                    <span>{blog.date}</span>
                  </div>
                )}

                <h3 className="text-2xl font-semibold text-theme-bg mb-3 tracking-tight group-hover:text-theme-green transition-colors overflow-hidden text-ellipsis line-clamp-3">
                  {blog.title}
                </h3>

                <div className="mb-6 h-20 overflow-hidden">
                  <ScrollReveal
                    baseOpacity={0.3}
                    enableBlur
                    blurStrength={4}
                    baseRotation={0}
                    textClassName="text-theme-bg/70 font-light text-sm leading-relaxed line-clamp-3"
                  >
                    {blog.summary}
                  </ScrollReveal>
                </div>

                <div className="flex items-center text-theme-green font-medium group-hover:translate-x-2 transition-transform duration-300">
                  {blogsText.readArticle} <MdOutlineArrowForward className="ml-2" />
                </div>
              </Link>
            </motion.article>
          ))}
      </motion.div>
    </div>
  );
};

export default Blogs;
