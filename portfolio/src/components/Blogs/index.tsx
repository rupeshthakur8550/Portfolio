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
      className="min-h-screen py-16 pb-32 px-4 md:px-10 max-w-6xl mx-auto relative z-20"
    >
      <div className="text-center mb-12 md:mb-20">
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
            textClassName="text-gray-300 text-lg max-w-2xl mx-auto"
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
              className="flex flex-wrap justify-center items-start gap-8 w-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {blogs.map((blog, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedBlog(blog)}
                  className="group block bg-gray-900/40 backdrop-blur-md border border-gray-700 rounded-xl p-6 hover:bg-gray-800/60 hover:border-purple-500/50 transition-all duration-300 w-full md:w-[calc(50%-16px)] lg:w-[calc(33.33%-22px)] cursor-pointer"
                >
                  {/* Blog Image */}
                  <div className="w-full h-48 mb-6 overflow-hidden rounded-lg">
                    <LazyImage
                      src={blog.image}
                      alt={blog.title}
                      className="w-full h-full transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm text-gray-400 mb-4">
                    <span>{currentDate}</span>
                  </div>

                  <h3 className="text-xl font-bold text-white mb-3 group-hover:text-purple-400 transition-colors">
                    {blog.title}
                  </h3>

                  <div className="mb-6 h-20 overflow-hidden">
                    <ScrollReveal
                      baseOpacity={0.3}
                      enableBlur
                      blurStrength={4}
                      baseRotation={0}
                      textClassName="text-gray-400 text-sm line-clamp-3"
                    >
                      {blog.summary}
                    </ScrollReveal>
                  </div>

                  <div className="flex items-center text-purple-400 font-medium group-hover:translate-x-2 transition-transform duration-300">
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