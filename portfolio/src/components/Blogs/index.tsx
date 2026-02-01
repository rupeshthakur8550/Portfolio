import { useState } from "react";
import { MdOutlineArrowForward } from "react-icons/md";
import common from "../../assets/json/common.json";
import GradientText from "../UI/GradientText";
import LazyImage from "../UI/LazyImage";
import ScrollReveal from "../UI/ScrollReveal";
import { AnimatePresence, motion } from "framer-motion";
import BlogDetails from "./BlogDetails";

const Blogs = () => {
  const blogs = common.Portfolio.blogs;
  const blogsText = common.Portfolio.blogsPage;
  const [selectedBlog, setSelectedBlog] = useState<typeof blogs[0] | null>(null);

  // Calculate current date
  const currentDate = new Date().toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

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
            {selectedBlog ? "Article Insights" : blogsText.subtitle}
          </ScrollReveal>
        </div>
      </div>

      <div className="relative w-full flex justify-center min-h-[200px]">
        <AnimatePresence mode="wait">
          {selectedBlog ? (
            <motion.div
              key="details"
              className="w-full"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            >
              <BlogDetails
                blog={selectedBlog}
                onBack={() => setSelectedBlog(null)}
              />
            </motion.div>
          ) : (
            <motion.div
              key="grid"
              className="flex flex-wrap items-start gap-8 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedBlog(blog)}
                  className="group block bg-theme-text/80 backdrop-blur-md border border-theme-bg/10 rounded-xl p-6 hover:bg-theme-text/90 hover:border-theme-text/50 transition-all duration-300 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] cursor-pointer"
                >
                  {/* Blog Image */}
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                    <LazyImage
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm text-theme-text-muted mb-4">
                    <span>{currentDate}</span>
                  </div>

                  <h3 className="text-xl font-bold text-theme-bg mb-3 group-hover:text-theme-purple transition-colors overflow-hidden text-ellipsis line-clamp-3">
                    {blog.title}
                  </h3>

                  <div className="mb-6 h-20 overflow-hidden">
                    <ScrollReveal
                      baseOpacity={0.3}
                      enableBlur
                      blurStrength={4}
                      baseRotation={0}
                      textClassName="text-theme-bg/60 text-sm line-clamp-3"
                    >
                      {blog.summary}
                    </ScrollReveal>
                  </div>

                  <div className="flex items-center text-theme-purple font-medium group-hover:translate-x-2 transition-transform duration-300">
                    {blogsText.readArticle} <MdOutlineArrowForward className="ml-2" />
                  </div>
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Blogs;